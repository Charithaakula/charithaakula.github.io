#!/usr/bin/env python3
"""Exact finite-model opportunity coverage. Install scipy for this optional maintainer tool.
Models must come from the runtime buildProblem API; private device data is not
exported by this tool. Certificates should use only a reviewed public baseline.
"""
import json,math,argparse
from pathlib import Path
import numpy as np
from scipy.optimize import milp,Bounds,LinearConstraint
from scipy.sparse import lil_matrix
def solve_problem(p, maximum=False):
 routes=p['routes']; locals_=p['locals']; goals=p['goals']; groups=p['groups']; opts=p['options']
 nr,nl,ng=len(routes),len(locals_),len(goals); n=nr+nl+ng
 goalpos={g['id']:i for i,g in enumerate(goals)}
 weights=np.array([g['weight'] for g in goals],dtype=float)
 rows=[];lower=[];upper=[]
 def add(row,lo=-np.inf,hi=np.inf):rows.append(row);lower.append(lo);upper.append(hi)
 for gi,g in enumerate(goals):
  row={nr+nl+gi:1}
  for ri,r in enumerate(routes):
   if g['id'] in r['goalIds']:row[ri]=-1
  for li,l in enumerate(locals_):
   if g['id'] in l['goalIds']:row[nr+li]=-1
  add(row,hi=0)
 add({nr+i:float(l['hours']) for i,l in enumerate(locals_)},hi=float(opts['localHoursBudget']))
 for name,coefficients in [('maxTrips',{i:1 for i in range(nr)}),('maxPto',{i:r['ptoDays'] for i,r in enumerate(routes)}),('maxDays',{i:r['days'] for i,r in enumerate(routes)})]:
  if opts.get(name) is not None:add(coefficients,hi=float(opts[name]))
 # At most one length variant per itinerary family, when supplied.
 families={}
 for i,r in enumerate(routes):families.setdefault(r.get('familyId',r['id']),[]).append(i)
 for f,idx in families.items():
  if len(idx)>1:add({i:1 for i in idx},hi=1)
 if not maximum:
  add({nr+nl+i:float(weights[i]) for i in range(ng)},lo=math.ceil(float(opts['target'])*weights.sum()*1e6)/1e6)
  for group in groups:
   ids=[goalpos[x] for x in group['goalIds'] if x in goalpos]
   add({nr+nl+i:1 for i in ids},lo=math.ceil(float(group.get('floor',0))*len(ids)-1e-9))
 def matrix(rs):
  a=lil_matrix((len(rs),n))
  for i,row in enumerate(rs):
   for k,v in row.items():a[i,k]=v
  return a.tocsr()
 constraints=LinearConstraint(matrix(rows),lower,upper)
 # Coefficients make each objective dominate the maximum possible lower-level cost.
 local_max=sum(float(l['hours']) for l in locals_)*0.001
 day_unit=math.ceil(local_max)+1
 day_max=sum(r['days'] for r in routes)*day_unit
 pto_unit=math.ceil(day_max+local_max)+1
 trip_unit=math.ceil(sum(r['ptoDays'] for r in routes)*pto_unit+day_max+local_max)+1
 costs=np.array([trip_unit+pto_unit*r['ptoDays']+day_unit*r['days'] for r in routes]+[float(l['hours'])*0.001 for l in locals_]+[0]*ng,dtype=float)
 if maximum:
  max_cost=np.array([0]*(nr+nl)+[-float(w) for w in weights])
  first=milp(max_cost,integrality=np.ones(n),bounds=Bounds(np.zeros(n),np.ones(n)),constraints=constraints,options={'time_limit':90,'mip_rel_gap':0})
  if first.x is None or first.status!=0:return {'status':first.status,'message':first.message,'mode':'maximum-coverage'}
  maximum_weight=sum(weights[i] for i in range(ng) if first.x[nr+nl+i]>.5)
  add({nr+nl+i:float(weights[i]) for i in range(ng)},lo=float(maximum_weight)-1e-7)
  constraints=LinearConstraint(matrix(rows),lower,upper)
 res=milp(costs,integrality=np.ones(n),bounds=Bounds(np.zeros(n),np.ones(n)),constraints=constraints,options={'time_limit':90,'mip_rel_gap':0})
 if res.x is None and res.status==2 and not maximum:
  answer=solve_problem(p,True);answer['originalCoverStatus']='infeasible';return answer
 if res.x is None:return {'status':res.status,'message':res.message,'routes':nr,'locals':nl,'goals':ng,'target':opts['target']}
 x=res.x
 selected=[r['id'] for i,r in enumerate(routes) if x[i]>.5]
 localids=[l['id'] for i,l in enumerate(locals_) if x[nr+i]>.5]
 covered={gid for r in routes if r['id'] in selected for gid in r['goalIds']}|{gid for l in locals_ if l['id'] in localids for gid in l['goalIds']}
 return {'status':res.status,'mode':'maximum-coverage' if maximum else 'minimum-cover','solver':{'algorithm':'SciPy/HiGHS mixed integer programming','optimal':res.status==0,'mipGap':float(res.mip_gap),'objective':'maximum weighted coverage, then trips, leave, calendar days, local hours' if maximum else 'minimum trips, weekday leave, calendar days, local hours'},'message':res.message,'signature':p['signature'],'routeIds':selected,'localIds':localids,'tripCount':len(selected),'calendarDays':sum(r['days'] for r in routes if r['id'] in selected),'ptoDays':sum(r['ptoDays'] for r in routes if r['id'] in selected),'localHours':sum(l['hours'] for l in locals_ if l['id'] in localids),'rawCovered':len(covered),'rawTotal':ng,'weightedPercent':sum(g['weight'] for g in goals if g['id'] in covered)/sum(g['weight'] for g in goals),'mipGap':float(res.mip_gap),'dualBound':float(res.mip_dual_bound),'objective':float(res.fun),'method':('Maximum weighted coverage, then minimum trips, weekday leave, calendar days and local hours. The original target/floors remain infeasible.' if maximum else 'Mixed integer set cover: minimum trips, then weekday leave, then calendar days and local hours within the curated candidate pool. Certified only for this exact model signature.')}
if __name__=='__main__':
 parser=argparse.ArgumentParser(description='Certify finite Life Atlas coverage models with SciPy/HiGHS. Runtime app needs no Python or backend.')
 parser.add_argument('model',type=Path,help='JSON array of LifeCoverageOptimizer.buildProblem outputs')
 parser.add_argument('output',type=Path,help='JSON results, including infeasible model reports')
 args=parser.parse_args()
 problems=json.loads(args.model.read_text())
 if isinstance(problems,dict):problems=[problems]
 answers=[]
 for problem in problems:
  answer=solve_problem(problem);answers.append(answer)
  print(json.dumps({k:v for k,v in answer.items() if k not in ['signature','routeIds','localIds']},ensure_ascii=False),flush=True)
 args.output.write_text(json.dumps(answers,ensure_ascii=False,indent=2)+'\n')

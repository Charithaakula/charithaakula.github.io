"""Regenerate the public CSV from the same catalog used by the website."""
from pathlib import Path
import csv
import json
import re

ROOT = Path(__file__).resolve().parents[1]

def read_assignment(path, name):
    text = path.read_text(encoding='utf-8')
    match = re.search(r'window\.' + re.escape(name) + r'\s*=\s*', text)
    if not match:
        raise ValueError(f'Missing {name} in {path.name}')
    return json.JSONDecoder().raw_decode(text[match.end():])[0]

catalog = read_assignment(ROOT / 'data/catalog.js', 'LIFE_CATALOG')
clusters = {}
region_path = ROOT / 'data/trip-regions.js'
if region_path.exists():
    for region in read_assignment(region_path, 'LIFE_TRIP_REGIONS'):
        for item_id in region['itemIds']:
            clusters[item_id] = region['name']
headers = ['ID', 'Experience', 'Category', 'Place', 'Country', 'Region', 'Scope',
           'Theme', 'Tags', 'Effort', 'Solo / support', 'Why', 'Origin', 'Reference', 'Trip cluster']

def spreadsheet_text(value):
    value = str(value or '')
    # Prevent text goals from becoming executable formulas when opened in a spreadsheet.
    return "'" + value if value.lstrip().startswith(('=', '+', '-', '@')) else value

path = ROOT / 'data/catalog.csv'
with path.open('w', encoding='utf-8-sig', newline='') as handle:
    writer = csv.writer(handle, lineterminator='\n')
    writer.writerow(headers)
    for item in catalog:
        row = [item['id'], item['title'], item['category'], item['location'], item['country'],
               item['region'], item['scope'], item['theme'], '; '.join(item['tags']),
               item['effort'], item['solo'], item['why'], item['origin'], item['reference'],
               clusters.get(item['id'], '')]
        writer.writerow([spreadsheet_text(value) for value in row])
print(f'Wrote {len(catalog):,} public catalog rows to {path.relative_to(ROOT.parent)}')

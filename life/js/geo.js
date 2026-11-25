/* Projection companion for the offline us-atlas state outlines in data/us-map.js.
   See that file for geometry attribution and the ISC license.
   No network access or external geometry/projection library is used at runtime. */
(function (global) {
  'use strict';
  var RAD = Math.PI / 180;
  var N = (Math.sin(29.5 * RAD) + Math.sin(45.5 * RAD)) / 2;
  var C = Math.pow(Math.cos(29.5 * RAD), 2) + 2 * N * Math.sin(29.5 * RAD);
  var RHO0 = Math.sqrt(C - 2 * N * Math.sin(38 * RAD)) / N;
  var FITS = {"lower48":{"scale":1252.6853176688835,"tx":609.8788997371926,"ty":318.8871422092924},"AK":{"scale":8.249073006399813,"tx":827.8331773754803,"ty":1168.5924848825962},"HI":{"scale":35.89623019543575,"tx":5806.598398513604,"ty":1422.058879800003}};
  var outlines = null;

  function preparedOutlines() {
    if (outlines) return outlines;
    var data = global.LIFE_US_MAP;
    if (!data || !Array.isArray(data.states)) return [];
    outlines = data.states.map(function (state) {
      var rings = (state.path.match(/M[^Z]+Z/g) || []).map(function (part) {
        var numbers = (part.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
        var points = [];
        for (var i = 0; i < numbers.length; i += 2) points.push([numbers[i], numbers[i + 1]]);
        return points;
      });
      var points = [].concat.apply([], rings);
      return {
        code: state.code,
        kind: state.code === 'AK' || state.code === 'HI' ? state.code : 'lower48',
        rings: rings,
        minX: Math.min.apply(null, points.map(function (p) { return p[0]; })),
        maxX: Math.max.apply(null, points.map(function (p) { return p[0]; })),
        minY: Math.min.apply(null, points.map(function (p) { return p[1]; })),
        maxY: Math.max.apply(null, points.map(function (p) { return p[1]; }))
      };
    });
    return outlines;
  }
  function onSegment(point, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var length = dx * dx + dy * dy;
    if (!length) return Math.abs(point.x - a[0]) < 0.025 && Math.abs(point.y - a[1]) < 0.025;
    var t = ((point.x - a[0]) * dx + (point.y - a[1]) * dy) / length;
    if (t < 0 || t > 1) return false;
    var px = a[0] + t * dx, py = a[1] + t * dy;
    return (point.x - px) * (point.x - px) + (point.y - py) * (point.y - py) <= 0.000625;
  }
  function inOutline(point, shape) {
    if (point.x < shape.minX - 0.025 || point.x > shape.maxX + 0.025 || point.y < shape.minY - 0.025 || point.y > shape.maxY + 0.025) return false;
    var inside = false;
    for (var r = 0; r < shape.rings.length; r += 1) {
      var ring = shape.rings[r];
      for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var a = ring[i], b = ring[j];
        if (onSegment(point, a, b)) return true;
        if (((a[1] > point.y) !== (b[1] > point.y)) && point.x < (b[0] - a[0]) * (point.y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
      }
    }
    return inside;
  }
  function rawProject(lon, lat, kind) {
    if (kind === 'AK') return [(lon > 0 ? lon - 360 : lon) * Math.cos(62 * RAD), -lat];
    if (kind === 'HI') return [lon * Math.cos(20.5 * RAD), -lat];
    var theta = N * (lon + 96) * RAD;
    var rho = Math.sqrt(C - 2 * N * Math.sin(lat * RAD)) / N;
    return [rho * Math.sin(theta), rho * Math.cos(theta) - RHO0];
  }
  function project(lon, lat) {
    if (typeof lon !== 'number' || typeof lat !== 'number' || !isFinite(lon) || !isFinite(lat) || lon < -180 || lon > 180 || lat < -90 || lat > 90) return null;
    var kind;
    if (lat >= 50 && lat <= 72 && (lon <= -129 || lon >= 170)) kind = 'AK';
    else if (lat >= 18 && lat <= 23 && lon >= -161 && lon <= -154) kind = 'HI';
    else if (lat >= 24 && lat <= 50 && lon >= -126 && lon <= -66) kind = 'lower48';
    else return null;
    var raw = rawProject(lon, lat, kind), fit = FITS[kind];
    var point = {x: raw[0] * fit.scale + fit.tx, y: raw[1] * fit.scale + fit.ty};
    var shapes = preparedOutlines();
    for (var i = 0; i < shapes.length; i += 1) if (shapes[i].kind === kind && inOutline(point, shapes[i])) return point;
    return null;
  }
  global.LifeGeo = {project: project};
})(window);

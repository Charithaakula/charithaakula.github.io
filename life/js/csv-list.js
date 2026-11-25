/* The full-list view reads the published CSV directly. Journal details stay out of exports. */
(function (global) {
  'use strict';
  var HEADERS = ['ID', 'Experience', 'Category', 'Place', 'Country', 'Region', 'Scope', 'Theme', 'Tags', 'Effort', 'Solo / support', 'Why', 'Origin', 'Reference', 'Trip cluster'];
  var CSV_URL = 'data/catalog.csv';
  var hooks = { openItem: function () {}, requestRender: function () {} };
  var source = 'loading';
  var sourceRows = [];
  var sourceMessage = '';
  var started = false;
  var query = '';
  var category = '';
  var scope = '';
  var cluster = '';
  var page = 1;
  var pageSize = 100;
  var sortIndex = 0;
  var sortDirection = 1;
  var showStatus = true;
  var focusPending = null;
  var searchTimer = null;
  var renderedRows = [];
  var STATUS_LABELS = { curious: 'Curious', want: 'Want to try', done: 'Done', revisit: 'Revisit', pass: 'Pass for now' };

  function escape(value) {
    return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function safeUrl(value) {
    var result = String(value || '').trim();
    if (!/^https?:\/\/[^\s<>'"]+$/i.test(result)) return '';
    try { var parsed = new URL(result); return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : ''; }
    catch (error) { return ''; }
  }
  function parseCsv(input) {
    if (typeof input !== 'string' || input.length > 10 * 1024 * 1024) throw new Error('The CSV file is empty or too large to display.');
    var value = input.replace(/^\uFEFF/, '');
    var rows = [], row = [], field = '', quoted = false, closed = false;
    function endField() { row.push(field); field = ''; closed = false; }
    function endRow() {
      endField();
      if (row.some(function (cell) { return cell !== ''; })) rows.push(row);
      row = [];
      if (rows.length > 20000) throw new Error('The CSV file has too many rows to display.');
    }
    for (var i = 0; i < value.length; i += 1) {
      var char = value.charAt(i);
      if (quoted) {
        if (char === '"') {
          if (value.charAt(i + 1) === '"') { field += '"'; i += 1; }
          else { quoted = false; closed = true; }
        } else field += char;
      } else if (char === ',') endField();
      else if (char === '\r' || char === '\n') {
        if (char === '\r' && value.charAt(i + 1) === '\n') i += 1;
        endRow();
      } else if (char === '"') {
        if (field !== '' || closed) throw new Error('The CSV contains a misplaced quote.');
        quoted = true;
      } else {
        if (closed) {
          if (char === ' ' || char === '\t') continue;
          throw new Error('The CSV contains text after a closed quoted field.');
        }
        field += char;
      }
    }
    if (quoted) throw new Error('The CSV contains an unfinished quoted field.');
    if (field !== '' || row.length || closed) endRow();
    if (!rows.length) throw new Error('The CSV has no rows.');
    var headers = rows.shift();
    var positions = HEADERS.map(function (header) { return headers.indexOf(header); });
    if (positions.some(function (index) { return index < 0; })) throw new Error('The published CSV does not have the expected full-list columns.');
    return rows.map(function (cells, index) {
      if (cells.length !== headers.length) throw new Error('CSV row ' + (index + 2) + ' has a different number of columns.');
      var mapped = positions.map(function (position) { return cells[position]; });
      if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,89}$/.test(mapped[0])) throw new Error('A CSV row has an invalid experience ID.');
      return mapped;
    });
  }
  function builtinRows() {
    return (global.LIFE_CATALOG || []).map(function (r) {
      return [r.id, r.title, r.category, r.location, r.country, r.region, r.scope, r.theme, Array.isArray(r.tags) ? r.tags.join('; ') : '', r.effort, r.solo, r.why, r.origin, r.reference, ''];
    });
  }
  function redraw(focusElement) {
    if (focusElement) {
      focusPending = { filter: focusElement.getAttribute('data-csv-filter'), sort: focusElement.getAttribute('data-csv-sort'), action: focusElement.getAttribute('data-csv-action'), start: focusElement.selectionStart, end: focusElement.selectionEnd };
    }
    hooks.requestRender();
  }
  function fallback(message) {
    source = 'fallback'; sourceRows = builtinRows(); sourceMessage = message;
    redraw();
  }
  function startLoad() {
    if (started) return;
    started = true;
    if (global.location && global.location.protocol === 'file:') {
      source = 'fallback'; sourceRows = builtinRows();
      sourceMessage = 'This file preview uses the built-in idea library. Open the served website to read catalog.csv directly.';
      return;
    }
    if (typeof global.fetch !== 'function') {
      source = 'fallback'; sourceRows = builtinRows(); sourceMessage = 'CSV loading is unavailable in this browser. The table uses the built-in idea library.';
      return;
    }
    var request;
    try { request = global.fetch(CSV_URL, { cache: 'no-store' }); }
    catch (error) {
      source = 'fallback'; sourceRows = builtinRows(); sourceMessage = 'CSV loading is unavailable here. This table uses the built-in idea library.';
      return;
    }
    request.then(function (response) {
      if (!response.ok) throw new Error('The CSV file could not be loaded (HTTP ' + response.status + ').');
      return response.text();
    }).then(function (text) {
      sourceRows = parseCsv(text);
      source = 'csv'; sourceMessage = 'Loaded directly from life/data/catalog.csv. Device-only custom ideas and progress are shown alongside it.';
      redraw();
    }).catch(function () {
      fallback('The CSV file could not be read. This table uses the built-in idea library; the direct CSV download is still available.');
    });
  }
  function allRows() {
    var state = global.LifeStore ? global.LifeStore.getState() : { items: {}, customItems: [] };
    var existing = new Set(sourceRows.map(function (r) { return r[0]; }));
    var rows = sourceRows.slice();
    (state.customItems || []).forEach(function (r) {
      if (existing.has(r.id)) return;
      // Custom titles and locations are publishable. Their descriptions, references, notes, photos, and dates stay out.
      rows.push([r.id, r.title, r.category, r.location, r.country, r.region, r.scope, r.theme, Array.isArray(r.tags) ? r.tags.join('; ') : '', r.effort, r.solo, '', 'My idea', '', '']);
    });
    return rows.map(function (r) {
      var result = r.map(function (cell) { return String(cell === undefined || cell === null ? '' : cell); });
      var tracker = state.items && state.items[r[0]] || {};
      result.push(STATUS_LABELS[tracker.status] || 'Curious');
      return result;
    });
  }
  function choices(rows, column) {
    return Array.from(new Set(rows.map(function (r) { return r[column]; }).filter(Boolean))).sort(function (a, b) { return a.localeCompare(b); });
  }
  function select(label, key, value, values, allLabel) {
    return '<label class="form-field"><span>' + escape(label) + '</span><select data-csv-filter="' + key + '"><option value="">' + escape(allLabel) + '</option>' + values.map(function (v) { return '<option value="' + escape(v) + '"' + (v === value ? ' selected' : '') + '>' + escape(v) + '</option>'; }).join('') + '</select></label>';
  }
  function filtered(rows) {
    var terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    return rows.filter(function (r) {
      if (category && r[2] !== category || scope && r[6] !== scope || cluster && r[14] !== cluster) return false;
      var haystack = r.slice(0, showStatus ? 16 : 15).join(' ').toLocaleLowerCase();
      return terms.every(function (term) { return haystack.indexOf(term) >= 0; });
    }).sort(function (a, b) {
      var result = a[sortIndex].localeCompare(b[sortIndex], undefined, { numeric: true, sensitivity: 'base' });
      return (result || a[0].localeCompare(b[0], undefined, { numeric: true })) * sortDirection;
    });
  }
  function csvCell(input) {
    var value = String(input === undefined || input === null ? '' : input);
    // Spreadsheet applications may interpret leading operators or control characters as formulas.
    if (/^[\s\uFEFF]*[=+\-@]/.test(value) || /^[ \uFEFF]*[\t\r\n]/.test(value)) value = "'" + value;
    return /[",\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
  }
  function downloadFiltered() {
    var headers = HEADERS.concat(showStatus ? ['My status'] : []);
    var output = [headers].concat(renderedRows.map(function (r) { return r.slice(0, showStatus ? 16 : 15); }));
    var csv = '\uFEFF' + output.map(function (row) { return row.map(csvCell).join(','); }).join('\r\n') + '\r\n';
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url; link.download = 'life-atlas-filtered.csv';
    document.body.appendChild(link); link.click(); link.remove();
    global.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function tableCell(row, index) {
    if (index === 1) return '<button type="button" class="csv-experience-link" data-csv-item="' + escape(row[0]) + '">' + escape(row[index]) + '</button>';
    if (index === 13 && safeUrl(row[index])) return '<a href="' + escape(safeUrl(row[index])) + '" target="_blank" rel="noopener noreferrer">Reference ↗</a>';
    return escape(row[index]);
  }
  function render() {
    startLoad();
    var rows = allRows();
    var categories = choices(rows, 2), scopes = choices(rows, 6), clusters = choices(rows, 14);
    if (category && categories.indexOf(category) < 0) category = '';
    if (scope && scopes.indexOf(scope) < 0) scope = '';
    if (cluster && clusters.indexOf(cluster) < 0) cluster = '';
    renderedRows = filtered(rows);
    var size = pageSize === 'all' ? Math.max(1, renderedRows.length) : pageSize;
    var pages = Math.max(1, Math.ceil(renderedRows.length / size));
    page = Math.min(Math.max(1, page), pages);
    var start = (page - 1) * size;
    var visible = renderedRows.slice(start, start + size);
    var headers = HEADERS.concat(showStatus ? ['My status'] : []);
    var statusText = source === 'loading' ? 'Loading the full CSV file…' : sourceMessage;
    var result = '<section id="life-csv-view" class="csv-view" aria-label="Full experience list"><div class="view-heading"><div><span class="eyebrow">Every idea, in one place</span><h2>The full list.</h2><p class="muted">Read, search, and sort the complete catalog. Open any experience to keep its progress.</p></div><div class="csv-actions"><a class="button" href="' + CSV_URL + '" download="catalog.csv">Download CSV</a><button type="button" class="button button-secondary" data-csv-action="download"' + (source === 'loading' ? ' disabled' : '') + '>Download filtered CSV</button></div></div>';
    result += '<p class="form-help" role="status">' + escape(statusText) + '</p><p class="form-help">Downloads include public idea fields only. Your private journal notes, settings, photos, and dates stay out. Filtered downloads can include the visible progress column.</p>';
    result += '<div class="csv-toolbar"><label class="form-field csv-search"><span>Search the full list</span><input type="search" data-csv-filter="query" value="' + escape(query) + '" placeholder="An experience, place, food, or tag…" maxlength="300"></label>';
    result += select('Category', 'category', category, categories, 'All categories') + select('Scope', 'scope', scope, scopes, 'All scopes') + select('Trip cluster', 'cluster', cluster, clusters, 'All trip clusters');
    result += '<label class="form-field"><span>Rows per page</span><select data-csv-filter="pageSize"><option value="100"' + (pageSize === 100 ? ' selected' : '') + '>100</option><option value="250"' + (pageSize === 250 ? ' selected' : '') + '>250</option><option value="all"' + (pageSize === 'all' ? ' selected' : '') + '>All</option></select></label><label class="csv-status-toggle"><input type="checkbox" data-csv-filter="showStatus"' + (showStatus ? ' checked' : '') + '> Show my progress</label><button type="button" class="button button-secondary" data-csv-action="clear">Clear filters</button></div>';
    result += '<p class="csv-count" aria-live="polite">' + renderedRows.length.toLocaleString() + ' of ' + rows.length.toLocaleString() + ' ideas' + (visible.length ? ' · showing ' + (start + 1).toLocaleString() + '–' + (start + visible.length).toLocaleString() : '') + (source === 'fallback' ? ' · built-in data' : source === 'csv' ? ' · CSV loaded' : '') + '</p>';
    if (source === 'loading') return result + '<div class="csv-empty">The full file is loading. The table will appear here.</div></section>';
    if (!visible.length) return result + '<div class="csv-empty"><h3>No ideas match those filters.</h3><p>Try a broader search or clear the filters.</p></div></section>';
    result += '<div class="csv-table-wrap" tabindex="0" role="region" aria-label="Scrollable full catalog table"><table class="csv-table"><caption class="sr-only">Full experience catalog with sortable columns</caption><thead><tr>';
    result += headers.map(function (header, index) {
      return '<th scope="col"' + (index === sortIndex ? ' aria-sort="' + (sortDirection === 1 ? 'ascending' : 'descending') + '"' : '') + '><button type="button" data-csv-sort="' + index + '" aria-label="Sort by ' + escape(header) + '">' + escape(header) + (index === sortIndex ? sortDirection === 1 ? ' ↑' : ' ↓' : '') + '</button></th>';
    }).join('') + '</tr></thead><tbody>';
    result += visible.map(function (row) { return '<tr>' + headers.map(function (header, index) { return '<td>' + tableCell(row, index) + '</td>'; }).join('') + '</tr>'; }).join('');
    result += '</tbody></table></div><div class="csv-pagination"><button type="button" class="button button-secondary" data-csv-action="previous"' + (page <= 1 ? ' disabled' : '') + '>Previous</button><span>Page ' + page + ' of ' + pages + '</span><button type="button" class="button button-secondary" data-csv-action="next"' + (page >= pages ? ' disabled' : '') + '>Next</button></div></section>';
    return result;
  }
  function mount() {
    var root = document.getElementById('life-csv-view');
    if (!root || root.__lifeCsvMounted) return;
    root.__lifeCsvMounted = true;
    root.addEventListener('input', function (event) {
      if (event.target.getAttribute('data-csv-filter') !== 'query') return;
      query = event.target.value.slice(0, 300); page = 1;
      global.clearTimeout(searchTimer);
      var input = event.target;
      searchTimer = global.setTimeout(function () { redraw(input); }, 180);
    });
    root.addEventListener('change', function (event) {
      var field = event.target.getAttribute('data-csv-filter');
      if (!field || field === 'query') return;
      if (field === 'category') category = event.target.value;
      else if (field === 'scope') scope = event.target.value;
      else if (field === 'cluster') cluster = event.target.value;
      else if (field === 'pageSize') pageSize = event.target.value === 'all' ? 'all' : event.target.value === '250' ? 250 : 100;
      else if (field === 'showStatus') { showStatus = event.target.checked; if (!showStatus && sortIndex === 15) sortIndex = 0; }
      page = 1; redraw(event.target);
    });
    root.addEventListener('click', function (event) {
      var item = event.target.closest('[data-csv-item]');
      if (item && root.contains(item)) { hooks.openItem(item.getAttribute('data-csv-item')); return; }
      var sort = event.target.closest('[data-csv-sort]');
      if (sort && root.contains(sort)) {
        var index = Number(sort.getAttribute('data-csv-sort'));
        if (index >= 0 && index < (showStatus ? 16 : 15)) { sortDirection = sortIndex === index ? -sortDirection : 1; sortIndex = index; page = 1; redraw(sort); }
        return;
      }
      var action = event.target.closest('[data-csv-action]');
      if (!action || !root.contains(action)) return;
      var name = action.getAttribute('data-csv-action');
      if (name === 'download') downloadFiltered();
      else if (name === 'clear') { query = ''; category = ''; scope = ''; cluster = ''; page = 1; redraw(action); }
      else if (name === 'previous' && page > 1) { page -= 1; redraw(action); }
      else if (name === 'next') { page += 1; redraw(action); }
    });
    if (focusPending) {
      var selector = focusPending.filter ? '[data-csv-filter="' + focusPending.filter + '"]' : focusPending.sort !== null ? '[data-csv-sort="' + focusPending.sort + '"]' : focusPending.action ? '[data-csv-action="' + focusPending.action + '"]' : '';
      var node = selector && root.querySelector(selector);
      if (node) {
        node.focus();
        if (typeof node.setSelectionRange === 'function' && typeof focusPending.start === 'number') {
          try { node.setSelectionRange(focusPending.start, focusPending.end); } catch (ignored) { /* Selects and number inputs do not have a text selection. */ }
        }
      }
      focusPending = null;
    }
  }
  global.LifeCsvList = {
    configure: function (input) {
      input = input || {};
      if (typeof input.openItem === 'function') hooks.openItem = input.openItem;
      if (typeof input.requestRender === 'function') hooks.requestRender = input.requestRender;
    },
    render: render,
    mount: mount
  };
})(window);

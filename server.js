const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');
const PORT = 3000;

function readDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function generateId() {
  return Math.random().toString(16).slice(2, 6);
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch (e) { resolve({}); }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const parts = url.pathname.split('/').filter(Boolean);
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const collection = parts[0];
  const id = parts[1];

  if (!collection) {
    return sendJson(res, 200, readDb());
  }

  const db = readDb();

  if (!db[collection]) {
    return sendJson(res, 404, { error: 'Collection not found' });
  }

  if (method === 'GET') {
    if (id) {
      const item = db[collection].find(r => String(r.id) === id);
      if (!item) return sendJson(res, 404, { error: 'Not found' });
      return sendJson(res, 200, item);
    }
    const queryParams = {};
    url.searchParams.forEach((v, k) => { queryParams[k] = v; });
    let results = db[collection];
    for (const [k, v] of Object.entries(queryParams)) {
      results = results.filter(r => String(r[k]) === v);
    }
    return sendJson(res, 200, results);
  }

  if (method === 'POST') {
    const body = await getBody(req);
    const newItem = { ...body, id: body.id || generateId() };
    db[collection].push(newItem);
    writeDb(db);
    return sendJson(res, 201, newItem);
  }

  if (method === 'PUT' || method === 'PATCH') {
    if (!id) return sendJson(res, 400, { error: 'ID required' });
    const idx = db[collection].findIndex(r => String(r.id) === id);
    if (idx === -1) return sendJson(res, 404, { error: 'Not found' });
    const body = await getBody(req);
    if (method === 'PUT') {
      db[collection][idx] = { ...body, id };
    } else {
      db[collection][idx] = { ...db[collection][idx], ...body };
    }
    writeDb(db);
    return sendJson(res, 200, db[collection][idx]);
  }

  if (method === 'DELETE') {
    if (!id) return sendJson(res, 400, { error: 'ID required' });
    const idx = db[collection].findIndex(r => String(r.id) === id);
    if (idx === -1) return sendJson(res, 404, { error: 'Not found' });
    const deleted = db[collection].splice(idx, 1)[0];
    writeDb(db);
    return sendJson(res, 200, deleted);
  }

  sendJson(res, 405, { error: 'Method not allowed' });
});

server.listen(PORT, 'localhost', () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

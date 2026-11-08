import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const codePath = new URL('../src/Code.gs', import.meta.url);
const htmlPath = new URL('../src/Index.html', import.meta.url);
const backend = fs.readFileSync(codePath, 'utf8');
const frontend = fs.readFileSync(htmlPath, 'utf8');

assert.ok(frontend.includes('<html') && frontend.includes('</html>'), 'HTML document structure missing');
assert.ok(frontend.includes('google.script.run'), 'Apps Script client integration missing');
for (const name of ['doGet', 'createReservation', 'updateReservation', 'requestCancellation', 'cancelReservation', 'procesarRecordatoriosSala13']) {
  assert.ok(backend.includes('function ' + name + '('), 'Missing backend function: ' + name);
}
assert.ok(!/AKfycby[A-Za-z0-9_-]{20,}/.test(backend), 'Production deployment URL marker detected');
assert.ok(!/sk-proj-|ghp_[A-Za-z0-9]{20,}|-----BEGIN PRIVATE KEY-----/.test(backend + frontend), 'Potential secret in sources');
const dir = fs.mkdtempSync('/tmp/sala13-static-');
try {
  const temporary = dir + '/Code.js';
  fs.writeFileSync(temporary, backend);
  execFileSync('node', ['--check', temporary], { stdio: 'pipe' });
} finally { fs.rmSync(dir, { recursive: true, force: true }); }
console.log('PASS: backend JavaScript parses, primary handlers exist, HTML has Apps Script entry point, basic secret checks passed.');
console.log('NOT TESTED: live Google services, browser rendering, booking conflicts, permissions, quotas or reliable emails.');

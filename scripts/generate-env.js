const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'env.js');

function parseEnv(src) {
  const vars = {};
  src.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) {
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      vars[m[1]] = val;
    }
  });
  return vars;
}

const src = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const vars = parseEnv(src);

// Expose only non-secret/public variables to the browser
const publicVars = {
  PLAIN_VAR: vars.PLAIN_VAR || ''
};

const out = 'window.__ENV__ = ' + JSON.stringify(publicVars, null, 2) + ' ;\n';
fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath);

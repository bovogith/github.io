import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const local = args.includes('--local');
const [daysArg = '7', ...extra] = args.filter(arg => arg !== '--local');
const days = Number(daysArg);
if (extra.length || !Number.isInteger(days) || days < 1 || days > 365) {
  console.error('사용법: node scripts/create-invite.mjs [1~365일] [--local]');
  process.exit(1);
}

const token = randomBytes(16).toString('base64url');
const expiresAt = Math.floor(Date.now() / 1000) + days * 86400;
const wrangler = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
const result = spawnSync(process.execPath, [
  wrangler, 'kv', 'key', 'put', token, String(expiresAt),
  '--binding', 'INVITES', '--preview=false', '--expiration', String(expiresAt), local ? '--local' : '--remote',
], { cwd: new URL('../', import.meta.url), encoding: 'utf8' });

if (result.status !== 0) {
  const details = result.error?.message ?? result.stderr?.trim();
  console.error('링크 발급 실패. Wrangler 설치, 로그인 및 INVITES 설정을 확인해 주세요.');
  if (details) console.error(details.replaceAll(token, '[코드 숨김]'));
  process.exit(1);
}

const origin = local ? 'http://localhost:8787' : 'https://profile.pionman.com';
console.log(`${origin}/s/${token}`);
console.log(`만료: ${new Date(expiresAt * 1000).toISOString()} (UTC)`);

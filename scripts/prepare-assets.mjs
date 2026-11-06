import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await mkdir(output, { recursive: true });
await rm(new URL('images', output), { recursive: true, force: true });

for (const entry of ['index.html', 'style.css', 'images']) {
  await cp(new URL(entry, root), new URL(entry, output), { recursive: true });
}

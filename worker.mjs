const sessionCookie = '__Host-profile-invite';
const tokenPattern = '[A-Za-z0-9_-]{22}';
const invitePath = new RegExp(`^/s/(${tokenPattern})$`);
const sessionPattern = new RegExp(`(?:^|;\\s*)${sessionCookie}=(${tokenPattern})(?:;|$)`);
const privateHeaders = {
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow',
};

function accessMessage(message, status) {
  return new Response(message, {
    status,
    headers: { ...privateHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

async function remainingSeconds(invites, token) {
  const expiresAt = Number(await invites.get(token));
  if (!Number.isSafeInteger(expiresAt)) return 0;
  return Math.max(0, expiresAt - Math.floor(Date.now() / 1000));
}

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { ...privateHeaders, Allow: 'GET, HEAD' } });
    }

    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/s/')) {
      const token = invitePath.exec(pathname)?.[1];
      const seconds = token ? await remainingSeconds(env.INVITES, token) : 0;
      if (!seconds) return accessMessage('유효기간이 지났거나 사용할 수 없는 링크입니다. 새 링크를 요청해 주세요.', 403);

      const headers = new Headers({ ...privateHeaders, Location: '/' });
      headers.set('Set-Cookie', `${sessionCookie}=${token}; Max-Age=${seconds}; Path=/; Secure; HttpOnly; SameSite=Lax`);
      return new Response(null, { status: 302, headers });
    }

    const token = sessionPattern.exec(request.headers.get('Cookie') ?? '')?.[1];
    if (!token || !(await remainingSeconds(env.INVITES, token))) {
      return accessMessage('공유받은 링크로 접속해 주세요.', 403);
    }

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [name, value] of Object.entries(privateHeaders)) response.headers.set(name, value);
    return response;
  },
};

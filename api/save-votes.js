export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { votes } = req.body;
  if (!votes || typeof votes !== 'object') {
    return res.status(400).json({ error: 'Missing votes object' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = 'Lam30ne/santa-monica-stays';
  const path = 'index.html';
  const branch = 'main';

  if (!token) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    // 1. Get current file from GitHub
    const getRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (!getRes.ok) throw new Error('Failed to fetch file from GitHub');
    const fileData = await getRes.json();

    // 2. Decode content (base64 -> bytes -> UTF-8)
    const raw = atob(fileData.content.replace(/\n/g, ''));
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    let content = new TextDecoder('utf-8').decode(bytes);

    // 3. Build new votes JS object string
    const votesEntries = Object.entries(votes)
      .map(([k, v]) => `    '${k}': '${v}'`)
      .join(',\n');
    const newVotesBlock = `var votes = {\n${votesEntries}\n  };`;

    // 4. Replace the votes object in the HTML
    content = content.replace(
      /var votes = \{[\s\S]*?\};/,
      newVotesBlock
    );

    // 5. Encode back to base64
    const encoder = new TextEncoder();
    const encoded = encoder.encode(content);
    let binary = '';
    for (let i = 0; i < encoded.length; i++) {
      binary += String.fromCharCode(encoded[i]);
    }
    const newBase64 = btoa(binary);

    // 6. Commit to GitHub
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update vote selections',
          content: newBase64,
          sha: fileData.sha,
          branch: branch,
        }),
      }
    );

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || 'GitHub commit failed');
    }

    const result = await putRes.json();
    return res.status(200).json({
      success: true,
      commit: result.commit.sha.substring(0, 7),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

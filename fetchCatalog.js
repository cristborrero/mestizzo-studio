const https = require('https');
https.get('https://en.studios-ax.com/post/designers-price-list-2026-updated', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find content matching the post
    const text = data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    // Extract any segment containing 'USD' or '$'
    const matches = text.match(/.{0,50}(\$|USD).{0,50}/gi) || [];
    console.log(matches.slice(0, 50).join('\n'));
  });
});

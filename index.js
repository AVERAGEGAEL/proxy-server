const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', (req, res) => {
    let site = req.query.url;
    if (!site.startsWith("http")) {
        return res.status(400).send("Invalid URL");
    }

    request(
        {
            url: site,
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': site
            }
        }
    ).on('error', () => res.status(500).send('Error loading site'))
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

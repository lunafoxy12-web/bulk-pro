const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/proxy/textbelt', async (req, res) => {
  try {
    const { phone, message, key } = req.body;
    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ phone, message, key })
    });
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/proxy/quota/:key', async (req, res) => {
  try {
    const response = await fetch(`https://textbelt.com/quota/${req.params.key}`);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/proxy/status/:id', async (req, res) => {
  try {
    const response = await fetch(`https://textbelt.com/status/${req.params.id}`);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
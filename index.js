const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Variabel penyimpanan sementara untuk API key terakhir yang dibuat
let MyAPIKey = null;

// Fungsi untuk generate API key dengan format "sk-sm-v1-<angka>"
function generateApiKey() {
  const randomBytes = crypto.randomBytes(8).toString('hex'); // 16 karakter hex
  return sk-sm-v1-${randomBytes};
}

// Endpoint untuk generate API key
app.post('/create', (req, res) => {
  const apiKey = generateApiKey();
  MyAPIKey = apiKey; // Simpan API key yang baru dibuat
  console.log(API Key baru dibuat: ${apiKey});
  res.json({ apiKey });
});

// ✅ Endpoint untuk mengecek validasi API key
app.post('/cekapi', (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'API key tidak boleh kosong!' });
  }

  // Cek apakah cocok dengan yang tersimpan
  if (apiKey === MyAPIKey) {
    res.json({ success: true, message: 'API key valid ✅' });
  } else {
    res.status(401).json({ success: false, message: 'API key tidak valid ❌' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(Server berjalan di http://localhost:${PORT});
});
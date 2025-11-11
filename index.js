const express = require('express');
const crypto = require('crypto');
const path = require('path');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🔗 Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'apiuser',              // ✅ gunakan user baru
  password: 'Oranggabut712!',    // ✅ password MySQL baru kamu
  database: 'apikeydb'
});

// ✅ Cek koneksi database
db.connect(err => {
  if (err) {
    console.error('❌ Gagal terhubung ke database MySQL:', err.message);
    process.exit(1); // hentikan program kalau koneksi gagal
  }
  console.log('✅ Terhubung ke database MySQL');
});

// 🔑 Fungsi untuk generate API key
function generateApiKey() {
  const randomBytes = crypto.randomBytes(8).toString('hex'); // 16 karakter hex
  return sk-sm-v1-${randomBytes};
}

// 📦 Endpoint untuk generate API key
app.post('/create', (req, res) => {
  const apiKey = generateApiKey();

  // Simpan ke database
  const sql = 'INSERT INTO api_keys (api_key, created_at) VALUES (?, NOW())';
  db.query(sql, [apiKey], (err, result) => {
    if (err) {
      console.error('❌ Gagal menyimpan API key ke database:', err);
      return res.status(500).json({ success: false, message: 'Gagal menyimpan API key' });
    }

    console.log(✅ API Key berhasil disimpan: ${apiKey});
    res.json({ success: true, apiKey });
  });
});

// 🔍 Endpoint untuk validasi API key
app.post('/cekapi', (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'API key tidak boleh kosong!' });
  }

  const sql = 'SELECT * FROM api_keys WHERE api_key = ?';
  db.query(sql, [apiKey], (err, results) => {
    if (err) {
      console.error('❌ Kesalahan saat memeriksa API key:', err);
      return res.status(500).json({ success: false, message: 'Kesalahan server saat cek API key' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'API key valid ✅' });
    } else {
      res.status(401).json({ success: false, message: 'API key tidak valid ❌' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(🚀 Server berjalan di http://localhost:${PORT}));

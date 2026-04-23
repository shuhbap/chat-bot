const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('QR route working');
});

module.exports = router; // ✅ MUST

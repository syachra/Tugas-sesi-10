const express = require('express');
const router = express.Router();
const db =  require('../models/db.js');

// GET /mahasiswa
router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (erorr, results) => {
        if (erorr) {
            console.error('Erorr fetching mahasiswa:', erorr);
            res.status(500).json({massage: 'Internal Server Erorr'});
        } else {
            res.json(results);
        }
    });
});

// GET /mahasiswa/:nim
router.get('/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaId], (erorr, results) => {
        if (erorr) {
            console.error('Erorr fetching mahasiswa:', erorr);
            res.status(500).json({massage: 'Internal Server Erorr'});
        } else if (results.length === 0) {
            res.status(404).json({massage: 'Mahasiswa not found'});
        } else {
            res.json(results[0]);
        }
    });
});

// PUT /mahasiswa/:nim
router.put('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    const {nama, gender, prodi, alamat} = req.body;
    
    db.query('UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?', [nama, gender, prodi, alamat, mahasiswaNim], (erorr) => {
        if (erorr) {
            console.error('Erorr updating mahasiswa:', erorr);
            res.status(500).json({massage: 'Internal Server Erorr'});
        } else {
            res.json("Updating mahasiswa Successfullys");
        }
    });
});

// POST /mahasiswa
router.post('/', (req, res) => {
    db.query('INSERT INTO mahasiswa SET ?', (error, results) => {
        if (error) {
            console.error('Error inserting mahasiswa:', error);
            res.status(500).json({message: 'Internal Server Error'});
        } else {
            res.json({message: 'Success', data: results});
        }
    });
});

// DELETE /mahasiswa/:nim
router.delete('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    
    db.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error) => {
        if (error) {
            console.error('Error deleting mahasiswa:', error);
            res.status(500).json({message: 'Internal Server Error'});
        } else {
            res.json("Deleting mahasiswa Successfully");
        }
    });
});

module.exports = router;
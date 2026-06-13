const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {

    const [rows] = await db.execute(
        'SELECT * FROM directores ORDER BY nombre'
    );

    res.json({
        status: 'success',
        data: rows,
        count: rows.length
    });

});

router.get('/:id', async (req, res) => {

    const [rows] = await db.execute(
        'SELECT * FROM directores WHERE id=?',
        [req.params.id]
    );

    res.json({
        status: 'success',
        data: rows[0]
    });

});

router.post('/', async (req, res) => {

    const {
        nombre,
        fecha_nacimiento
    } = req.body;

    const [result] = await db.execute(
        `
        INSERT INTO directores
        (
            nombre,
            fecha_nacimiento
        )
        VALUES (?,?)
    `,
        [
            nombre,
            fecha_nacimiento
        ]
    );

    res.status(201).json({
        status: 'success',
        insertId: result.insertId
    });

});

router.put('/:id', async (req, res) => {

    const {
        nombre,
        fecha_nacimiento
    } = req.body;

    await db.execute(
        `
        UPDATE directores
        SET
            nombre=?,
            fecha_nacimiento=?
        WHERE id=?
    `,
        [
            nombre,
            fecha_nacimiento,
            req.params.id
        ]
    );

    res.json({
        status: 'success'
    });

});

router.delete('/:id', async (req, res) => {

    await db.execute(
        'DELETE FROM directores WHERE id=?',
        [req.params.id]
    );

    res.json({
        status: 'success'
    });

});

module.exports = router;
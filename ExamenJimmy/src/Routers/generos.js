const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {

    const [rows] = await db.execute(
        'SELECT * FROM generos ORDER BY nombre'
    );

    res.json({
        status: 'success',
        data: rows,
        count: rows.length
    });

});

router.get('/:id', async (req, res) => {

    const [rows] = await db.execute(
        'SELECT * FROM generos WHERE id=?',
        [req.params.id]
    );

    res.json({
        status: 'success',
        data: rows[0]
    });

});

router.post('/', async (req, res) => {

    const { nombre, descripcion } = req.body;

    const [result] = await db.execute(
        `
        INSERT INTO generos
        (nombre,descripcion)
        VALUES (?,?)
    `,
        [nombre, descripcion]
    );

    res.status(201).json({
        status: 'success',
        insertId: result.insertId
    });

});

router.put('/:id', async (req, res) => {

    const { nombre, descripcion } = req.body;

    await db.execute(
        `
        UPDATE generos
        SET nombre=?, descripcion=?
        WHERE id=?
    `,
        [nombre, descripcion, req.params.id]
    );

    res.json({
        status: 'success'
    });

});

router.delete('/:id', async (req, res) => {

    await db.execute(
        'DELETE FROM generos WHERE id=?',
        [req.params.id]
    );

    res.json({
        status: 'success'
    });

});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {

    const [rows] = await db.execute(`
        SELECT
            r.id,
            p.titulo AS pelicula,
            g.nombre AS genero,
            r.calificacion,
            r.comentario,
            r.fecha_resena
        FROM resenas r
        INNER JOIN peliculas p
            ON r.pelicula_id = p.id
        INNER JOIN generos g
            ON r.genero_id = g.id
        ORDER BY r.fecha_resena DESC
    `);

    res.json({
        status: 'success',
        data: rows,
        count: rows.length
    });

});

router.post('/', async (req, res) => {

    const {
        pelicula_id,
        genero_id,
        calificacion,
        comentario
    } = req.body;

    const [result] = await db.execute(
        `
        INSERT INTO resenas
        (
            pelicula_id,
            genero_id,
            calificacion,
            comentario
        )
        VALUES (?,?,?,?)
    `,
        [
            pelicula_id,
            genero_id,
            calificacion,
            comentario
        ]
    );

    res.status(201).json({
        status: 'success',
        insertId: result.insertId
    });

});

router.delete('/:id', async (req, res) => {

    await db.execute(
        'DELETE FROM resenas WHERE id=?',
        [req.params.id]
    );

    res.json({
        status: 'success'
    });

});

module.exports = router;
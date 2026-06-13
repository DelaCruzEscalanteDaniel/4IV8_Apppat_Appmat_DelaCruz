const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarPelicula(datos) {
    const errores = [];

    if (!datos.titulo || datos.titulo.trim().length < 2) {
        errores.push('El título es obligatorio');
    }

    if (!datos.director_id) {
        errores.push('Debes seleccionar un director');
    }

    return errores;
}

router.get('/', async (req, res) => {
    try {

        const [rows] = await db.execute(`
            SELECT
                p.id,
                p.titulo,
                p.anio_lanzamiento,
                p.duracion,
                p.sinopsis,
                d.nombre AS director
            FROM peliculas p
            LEFT JOIN directores d
            ON p.director_id = d.id
            ORDER BY p.id ASC
        `);

        res.json({
            status: 'success',
            data: rows,
            count: rows.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });
    }
});

router.get('/:id', async (req, res) => {

    try {

        const [rows] = await db.execute(
            'SELECT * FROM peliculas WHERE id = ?',
            [req.params.id]
        );

        if (!rows.length) {
            return res.status(404).json({
                status: 'error',
                message: 'Película no encontrada'
            });
        }

        res.json({
            status: 'success',
            data: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });

    }
});

router.post('/', async (req, res) => {

    try {

        const errores = validarPelicula(req.body);

        if (errores.length) {
            return res.status(400).json({
                status: 'error',
                message: errores.join('; ')
            });
        }

        const {
            titulo,
            director_id,
            anio_lanzamiento,
            duracion,
            sinopsis
        } = req.body;

        const [result] = await db.execute(
            `
            INSERT INTO peliculas
            (
                titulo,
                director_id,
                anio_lanzamiento,
                duracion,
                sinopsis
            )
            VALUES(?,?,?,?,?)
        `,
            [
                titulo,
                director_id,
                anio_lanzamiento,
                duracion,
                sinopsis
            ]
        );

        res.status(201).json({
            status: 'success',
            insertId: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });

    }
});

router.put('/:id', async (req, res) => {

    try {

        const {
            titulo,
            director_id,
            anio_lanzamiento,
            duracion,
            sinopsis
        } = req.body;

        await db.execute(
            `
            UPDATE peliculas
            SET
                titulo=?,
                director_id=?,
                anio_lanzamiento=?,
                duracion=?,
                sinopsis=?
            WHERE id=?
        `,
            [
                titulo,
                director_id,
                anio_lanzamiento,
                duracion,
                sinopsis,
                req.params.id
            ]
        );

        res.json({
            status: 'success'
        });

    } catch (err) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });

    }
});

router.delete('/:id', async (req, res) => {

    try {

        await db.execute(
            'DELETE FROM peliculas WHERE id=?',
            [req.params.id]
        );

        res.json({
            status: 'success'
        });

    } catch (err) {

        res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });

    }
});

module.exports = router;
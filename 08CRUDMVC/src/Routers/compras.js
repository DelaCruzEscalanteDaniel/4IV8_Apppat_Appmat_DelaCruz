const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarCompra(datos) {
    const errores = [];

    if (!datos.usuario_id) {
        errores.push('El ID del usuario es obligatorio');
    } else if (!Number.isInteger(Number(datos.usuario_id)) || Number(datos.usuario_id) <= 0) {
        errores.push('El ID del usuario debe ser un número entero positivo');
    }

    if (!datos.producto_id) {
        errores.push('El ID del producto es obligatorio');
    } else if (!Number.isInteger(Number(datos.producto_id)) || Number(datos.producto_id) <= 0) {
        errores.push('El ID del producto debe ser un número entero positivo');
    }

    if (datos.cantidad !== undefined) {
        const cant = Number(datos.cantidad);
        if (!Number.isInteger(cant) || cant <= 0) {
            errores.push('La cantidad debe ser un número entero mayor que 0');
        }
    }

    return errores;
}

router.get('/', async (req, res) => {
    try {
        const [compras] = await db.execute(`
            SELECT
                c.id,
                c.usuario_id,
                u.nombre AS usuario_nombre,
                u.email AS usuario_email,
                c.producto_id,
                p.nombre AS producto_nombre,
                p.precio AS producto_precio,
                c.cantidad,
                (p.precio * c.cantidad) AS total,
                c.fecha_compra
            FROM compras c
            INNER JOIN usuarios u ON c.usuario_id = u.id
            INNER JOIN productos p ON c.producto_id = p.id
            ORDER BY c.fecha_compra DESC
        `);

        res.json({
            status: 'success',
            data: compras,
            count: compras.length
        });

    } catch (error) {
        console.error('Error al listar compras:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (req.params.id === 'usuario') {
            return res.status(400).json({
                status: 'error',
                message: 'Usa /api/compras/usuario/:usuario_id para buscar por usuario'
            });
        }

        const { id } = req.params;

        const [compras] = await db.execute(`
            SELECT
                c.id,
                c.usuario_id,
                u.nombre AS usuario_nombre,
                c.producto_id,
                p.nombre AS producto_nombre,
                p.precio AS producto_precio,
                c.cantidad,
                (p.precio * c.cantidad) AS total,
                c.fecha_compra
            FROM compras c
            INNER JOIN usuarios u ON c.usuario_id = u.id
            INNER JOIN productos p ON c.producto_id = p.id
            WHERE c.id = ?
        `, [id]);

        if (compras.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Compra con ID ${id} no encontrada`
            });
        }

        res.json({ status: 'success', data: compras[0] });

    } catch (error) {
        console.error('Error al obtener compra:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/usuario/:usuario_id', async (req, res) => {
    try {
        const { usuario_id } = req.params;

        const [usuario] = await db.execute(
            'SELECT id, nombre, email FROM usuarios WHERE id = ?',
            [usuario_id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con ID ${usuario_id} no encontrado`
            });
        }

        const [compras] = await db.execute(`
            SELECT
                c.id,
                p.nombre AS producto,
                p.precio,
                c.cantidad,
                (p.precio * c.cantidad) AS total,
                c.fecha_compra
            FROM compras c
            INNER JOIN productos p ON c.producto_id = p.id
            WHERE c.usuario_id = ?
            ORDER BY c.fecha_compra DESC
        `, [usuario_id]);

        const totalGastado = compras.reduce((sum, c) => sum + parseFloat(c.total), 0);

        res.json({
            status: 'success',
            data: {
                usuario: usuario[0],
                compras: compras,
                total_compras: compras.length,
                total_gastado: totalGastado.toFixed(2)
            }
        });

    } catch (error) {
        console.error('Error al obtener compras del usuario:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const errores = validarCompra(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join('; ') });
        }

        const { usuario_id, producto_id, cantidad = 1 } = req.body;

        const [usuario] = await db.execute(
            'SELECT id, nombre FROM usuarios WHERE id = ?', [usuario_id]
        );
        if (usuario.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con ID ${usuario_id} no encontrado`
            });
        }

        const [producto] = await db.execute(
            'SELECT id, nombre, precio FROM productos WHERE id = ?', [producto_id]
        );
        if (producto.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Producto con ID ${producto_id} no encontrado`
            });
        }

        const [resultado] = await db.execute(
            'INSERT INTO compras (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
            [usuario_id, producto_id, parseInt(cantidad)]
        );

        const total = (producto[0].precio * parseInt(cantidad)).toFixed(2);

        res.status(201).json({
            status: 'success',
            data: {
                id: resultado.insertId,
                usuario: usuario[0].nombre,
                producto: producto[0].nombre,
                precio_unitario: producto[0].precio,
                cantidad: parseInt(cantidad),
                total: parseFloat(total)
            }
        });

    } catch (error) {
        console.error('Error al crear compra:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [compra] = await db.execute(
            'SELECT id FROM compras WHERE id = ?', [id]
        );

        if (compra.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Compra con ID ${id} no encontrada`
            });
        }

        await db.execute('DELETE FROM compras WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: { mensaje: `Compra con ID ${id} eliminada` }
        });

    } catch (error) {
        console.error('Error al eliminar compra:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;
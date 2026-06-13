const express = require('express');
const router = express.Router();
const bd = require('../DB/database');

function validarUsuarios(datos){
    const errores = [];
    if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2){
        errores.push('El nombre es obligatorio y debe tener al menos dos carateres');
    }
    if(!datos.email || typeof datos.email !== 'string' ){
        errores.push('El email es obligatorio, verificalo');
    } else{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(datos.email)){
            errores.push('El formato del email no es valido');
        }
    }
    return errores;
}

router.get('/', async (req, res)=>{
    try{
        const [usuarios] = await bd.execute(
            'Select id, nombre, email, created_at, updated_at FROM usuarios order by id ASC'
        );
        res.json({
            status: 'success',
            data: usuarios,
            count: usuarios.length
        });
    }catch(error){
        console.log('Error al listar los usuarios', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [usuarios] = await db.execute(
            'SELECT id, nombre, email, created_at, updated_at FROM usuarios WHERE id = ?',
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con ID ${id} no encontrado`
            });
        }

        res.json({ status: 'success', data: usuarios[0] });

    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const errores = validarUsuario(req.body);
        if (errores.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: errores.join('; ')
            });
        }

        const { nombre, email } = req.body;

        const [resultado] = await db.execute(
            'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
            [nombre.trim(), email.trim().toLowerCase()]
        );

        const [nuevoUsuario] = await db.execute(
            'SELECT id, nombre, email, created_at FROM usuarios WHERE id = ?',
            [resultado.insertId]
        );

        res.status(201).json({
            status: 'success',
            data: nuevoUsuario[0]
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un usuario con ese email'
            });
        }
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [existente] = await db.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con ID ${id} no encontrado`
            });
        }

        const errores = validarUsuario(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join('; ') });
        }

        const { nombre, email } = req.body;

        await db.execute(
            'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
            [nombre.trim(), email.trim().toLowerCase(), id]
        );

        const [actualizado] = await db.execute(
            'SELECT id, nombre, email, created_at, updated_at FROM usuarios WHERE id = ?',
            [id]
        );

        res.json({ status: 'success', data: actualizado[0] });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe otro usuario con ese email'
            });
        }
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [usuario] = await db.execute(
            'SELECT id, nombre FROM usuarios WHERE id = ?', [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Usuario con ID ${id} no encontrado`
            });
        }

        await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: {
                eliminado: usuario[0],
                mensaje: `Usuario "${usuario[0].nombre}" y sus compras eliminados`
            }
        });

    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;
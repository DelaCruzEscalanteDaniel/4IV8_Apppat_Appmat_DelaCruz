const express = require('express');
const cors = require('cors'); //4.5k (gzipped: 1.9k)
const path = require('path');

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next)=> {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
});

app.use(express.static(path.join(__dirname, '--', 'public')));

//router.get('/')
//router.get('/usuarios')
//router.post('/')
//router.get('/:id')

const usuariosRouter = require('./router/usuarios')
const productosRouter = require('./router/productos')
const comprasRouter = require('./router/compras')

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/compras', comprasRouter);

app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'API REST ',
        endpoint: {
            usuarios: {
                listar: 'GET /api/usuarios',
                obtener: 'GET /api/usuarios/:id',
                crear: 'POST /api/usuarios',
                actualizar: 'PUT /api/usuarios/:id',
                eliminar: 'DELETE /api/usuarios/:id'
            },
            productos: {
                listar: 'GET /api/productos',
                obtener: 'GET /api/productos/:id',
                crear: 'POST /api/productos',
                actualizar: 'PUT /api/productos/:id',
                eliminar: 'DELETE /api/productos/:id'
            },
            compras: {
                listar: 'GET /api/compras',
                obtener: 'GET /api/compras/:id',
                crear: 'POST /api/compras',
                actualizar: 'PUT /api/compras/:id',
                eliminar: 'DELETE /api/compras/:id'
            }
        }
    });
});

app.use('/api/*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
    res.send('Errores.html');
});

app.use((err, req, res, next)=> {
    console.log('error no manejado: ', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
});

app.listen(PORT, () => {
    console.log('Servidor inicializado');
});
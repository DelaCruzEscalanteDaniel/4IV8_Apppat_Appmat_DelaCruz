const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{ console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`); next(); });

app.use(express.static(path.join(__dirname, '..', 'public')));

const peliculasRouter = require('./Routers/peliculas');
const generosRouter = require('./Routers/generos');
const directoresRouter = require('./Routers/directores');
const resenasRouter = require('./Routers/resenas');

app.use('/api/peliculas', peliculasRouter);
app.use('/api/generos', generosRouter);
app.use('/api/directores', directoresRouter);
app.use('/api/resenas', resenasRouter);

app.get('/', (req,res)=> res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.use((err, req, res, next) => { console.error('Unhandled error:', err); res.status(500).json({status:'error', message:'Error interno'}); });

app.listen(3001,'0.0.0.0', ()=> console.log('pelis server listening on'));

module.exports = app;

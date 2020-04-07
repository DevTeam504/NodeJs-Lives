var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// Middleware para poder entender los datos urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

// Aplicación escuchando
app.listen(8001, function() {
    console.log('Escuchando en puerto 8001');
})

// Conexión
mongoose.connect('mongodb+srv://agabrielc:2jLpKHoWuUV8F3Cg@agabrielc-jhe0c.mongodb.net/taller?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Conectado a Mongo Atlas')
})

// Forma que tiene nuestro objeto
var personaSchema = mongoose.Schema({
    _id: Number, 
    nombre: String, 
    edad: Number
});

// Colección
var Persona =  mongoose.model('personas', personaSchema)


// RUTAS Y METODOS //

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido a nuestro servidor API REST')
})

app.get('/api/usuarios',(req, res) => {
    Persona.find(function(err, respuesta){
        if(err){
            res.status(500).send('Error')
        } else {
            res.send(respuesta);
        }
    })
})

app.get('/api/usuarios/:id',(req, res) => {
    Persona.findById(req.params.id, (err, respuesta) => {
        if(err){
            res.status(500).send('Error')
        } else {
            res.send(respuesta);
        }
    })
})

// Agregar
app.post('/api/usuarios',(req, res) => {
    var _persona = new Persona({
        _id: req.body.id,
        nombre: req.body.nombre,
        edad: req.body.edad
    })
    _persona.save(function(err, respuesta){
        if(err){
            res.status(500).send('Error')
        } else {
            res.send('Persona agregada exitosamente!')
        }
    })
})

// Eliminar
app.delete('/api/usuarios/:id',(req, res) => {
   Persona.remove({_id: req.params.id}, (err, respuesta) => {
    if(err){
        res.status(500).send('Error')
    } else {
        res.send('Persona eliminada exitosamente!')
    }
   })
})

//Actualizar
app.patch('/api/usuarios/:id',(req, res) => {
    Persona.updateOne(
        { _id: req.params.id },
        { $set: { nombre: req.body.nombre }},
        (err, respuesta) => {
            if(err){
                res.status(500).send('Error')
            } else {
                res.send('Persona editada exitosamente!')
            }
        }
    )
})





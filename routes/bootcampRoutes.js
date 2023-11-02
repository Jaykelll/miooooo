const express = require('express')
const bootcampModel = require('../models/bootcampsModel')

//Definir ruteador
const router = express.Router()

//Definir rutas de bootcamps con el ruteador
//Esta ruta va a traer rodos los bootcamps
router.get('/', async (req, res) => {
    //Seleccionar todos los cootcamps en la collection
    const bootcamps = await bootcampModel.find()
    res.json({
        success: true,
        result : bootcamps
    })    
})

//selecionar bootcamp por id
router.get('/:id', async (req, res) => {
    //Recoger el parametro id de la url
    bootcampid = req.params.id
    //seleccionar el bootcamp por id
    selected_bootcamp = await bootcampModel.findById(bootcampid)
    //enviar la respuecta
    res.json({
        sucess : true,
        results : selected_bootcamp
    })
})

//Crear bootcamp
router.post('/', async (req, res) => {
    const newBootcamp = await bootcampModel.create(req.body)
    res.json({
        sucess : true,
        results : newBootcamp
    })
})

//exportar ruteador
module.exports = router
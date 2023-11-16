const express = require('express')
const bootcampModel = require('../models/bootcampsModel')
const mongoose = require('mongoose')

//Definir ruteador
const router = express.Router()

//Definir rutas de bootcamps con el ruteador
//Esta ruta va a traer rodos los bootcamps
router.get('/', async (req, res) => {
    //Seleccionar todos los cootcamps en la collection
    try {
        const bootcamps = await bootcampModel.find()
        if(bootcamps.length > 0){
            res.
            status(400).json({
                sucess: false,
                msg: "nohay bootcamps en la colección"
            })
        }else{
            res.status(200).json({
                success : true,
                data : bootcamps
            })
        }
    } catch (error) {
        res.status(error.status).json({
            sucess : false,
            msg : error.message
        })
    }
    
    res.json({
        success: true,
        result : bootcamps
    })    
})

//selecionar bootcamp por id
router.get('/:id', async (req, res) => {
    try {
        //Recoger el parametro id de la url
        bootcampid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(bootcampid)) {
            res.status(400).json({
                sucess:true,
                msg: `el id no es valido`
            })
        }else{
            //seleccionar el bootcamp por id
            selected_bootcamp = await bootcampModel.findById(bootcampid)
        if (selected_bootcamp) {
            //se encontro el bootcamp
            res.status(200).json({
            sucess : true,
            results : selected_bootcamp
        })
        }else{
            //no se encontro el bootcamp
            res.status(400).json({
                sucess : false,
                msg: `no se encontro el bootcamp ${bootcampid}`
            }) 
        }
        //enviar la respuesta
        }
    } catch (error) {
        res.status(error.status).json({
            success: false,
            msg: error.message
        })
    }
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
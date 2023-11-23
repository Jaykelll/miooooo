const express = require('express')
const bootcampModel = require('../models/bootcampsModel')
const mongoose = require('mongoose')

//Definir ruteador
const router = express.Router()

//Definir rutas de bootcamps con el ruteador
//Esta ruta va a traer rodos los bootcamps
router.get('/', async (req, res) => {
    //Seleccionar todos los bootcamps en la collection
    try {
        const bootcamps = await bootcampModel.find()
        if(bootcamps.length === 0){
            res.
            status(400).json({
                sucess: false,
                msg: "no hay bootcamps en la colección"
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
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
})

//Crear bootcamp
router.post('/', async (req, res) => {

    try {

        const newBootcamp = await bootcampModel.create(req.body)
        res.status(201).json({
            sucess : true,
            results : newBootcamp
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: error.message
        })
        
    }

})

router.put('/:id' , async(req, res) =>{
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
            selected_bootcamp = await bootcampModel.findByIdAndUpdate(bootcampid , req.body , { new: true})
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
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
})
//delete
router.delete('/:id' , async(req, res) =>{
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
            selected_bootcamp = await bootcampModel.findByIdAndDelete(bootcampid , req.body , { new: true})
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
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
})

//exportar ruteador
module.exports = router
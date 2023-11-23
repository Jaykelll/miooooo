const express = require('express')
const mongoose = require('mongoose')
const courseModel = require('../models/coursesModel')

//Definir ruteador
const router = express.Router()

//Definir rutas de courses con el ruteador
//Esta ruta va a traer rodos los courses
router.get('/', async (req, res) => {
    //Seleccionar todos los courses en la collection
    try {
        const courses = await courseModel.find()
        if(courses.length === 0){
            res.
            status(400).json({
                sucess: false,
                msg: "no hay courses en la colección"
            })
        }else{
            res.status(200).json({
                success : true,
                data : courses
            })
        }
    } catch (error) {
        res.status(error.status).json({
            sucess : false,
            msg : error.message
        })
    }  
})

//selecionar course por id
router.get('/:id', async (req, res) => {
    try {
        //Recoger el parametro id de la url
        courseid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(courseid)) {
            res.status(400).json({
                sucess:true,
                msg: `el id no es valido`
            })
        }else{
            //seleccionar el course por id
            selected_course = await courseModel.findById(courseid)
        if (selected_course) {
            //se encontro el course
            res.status(200).json({
            sucess : true,
            results : selected_course
        })
        }else{
            //no se encontro el course
            res.status(400).json({
                sucess : false,
                msg: `no se encontro el bootcamp ${courseid}`
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

//Crear course
router.post('/', async (req, res) => {

    try {

        const newCourse = await courseModel.create(req.body)
        res.status(201).json({
            sucess : true,
            results : newCourse
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
        courseid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(courseid)) {
            res.status(400).json({
                sucess:true,
                msg: `el id no es valido`
            })
        }else{
            //seleccionar el course por id
            selected_course = await courseModel.findByIdAndUpdate(courseid , req.body , { new: true})
        if (selected_course) {
            //se encontro el course
            res.status(200).json({
            sucess : true,
            results : selected_course
        })
        }else{
            //no se encontro el course
            res.status(400).json({
                sucess : false,
                msg: `no se encontro el course ${courseid}`
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
        courseid = req.params.id
        if (!mongoose.Types.ObjectId.isValid(courseid)) {
            res.status(400).json({
                sucess:true,
                msg: `el id no es valido`
            })
        }else{
            //seleccionar el course por id
            selected_course = await courseModel.findByIdAndDelete(courseid , req.body , { new: true})
        if (selected_course) {
            //se encontro el course
            res.status(200).json({
            sucess : true,
            results : selected_course
        })
        }else{
            //no se encontro el course
            res.status(400).json({
                sucess : false,
                msg: `no se encontro el bootcamp ${courseid}`
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
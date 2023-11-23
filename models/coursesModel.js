const mongoose = require('mongoose')

//Definir el esquema plano de todos los course
const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "titulo requerido"],
        maxlength : [30, "titulo muy largo"],
        minlength : [10, "titulo muy corto"]
    },
    description : {
        type : String,
        required : [true,"descripcion requerida"],
        minlength : [10, "descripcion muy corta"]
    },
    weeks : {
        type : Number,
        required : [true, "semanas requeridas"],
        max : [999999999, "demasiadas semanas"]
    },
    enroll_cost : {
        type : Number,
        required : [true, "costo requerido"],

    },
    minimum_skill:{
        type: String,
        required : [true, "habilidades requeridas"],
        enum:[
            "Beginer",
            "Intermediate",
            "Avanced",
            "Expert"
        ]  
    }

})

//Exportar el modelo
const courseModel = mongoose.model("Course", courseSchema)

module.exports = courseModel
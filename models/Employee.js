const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Gender', 'Other']
    },
    salary: {
        type: Number,
        required: true
    }
})

const employeeModel = mongoose.model('Employees', employeeSchema)

module.exports = employeeModel
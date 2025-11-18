//-------------------------
// mongoose
// -------------------------

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength:[3, 'Name must be at least 3 characters long'],
    required:[true, 'Name is required']
  },
  phoneNumber:{
    type:String,
    minLength:8,
    validate:{
      validator:function(v) {
        // ^ - начало строки
        // [\w\d]{2,3} - 2-3 символа (буквы или цифры)
        // - - дефис
        // .+ - один или больше любых символов
        // $ - конец строки
        return /^\d{2,3}-\d{2,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required:[true, 'User phone number required!']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
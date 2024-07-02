const { Schema} =require('mongoose');
const { model} =require('mongoose');

const quizSchema = new Schema({
   creator: { type: String, required: true },
   questions: { type: Object, required: true },
   category: { type: String, required: true },
   isPrivate: { type: Boolean, required: true },
   joinid: { type: String, required: false },
   quizTitle:{type:String,required:false},
   thumbnail:{type:String,required:false},
   active:{type:Boolean,required:true}

});

const quizes = model('quizes', quizSchema);

module.exports = quizes;
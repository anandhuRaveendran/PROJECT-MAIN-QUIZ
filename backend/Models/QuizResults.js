const { Schema} =require('mongoose');
const { model} =require('mongoose');

const resultSchema = new Schema({
   username: { type: String, required: true },
   quizTitle:{type:String,required:true},
   marksObtained:{type:String,required:true},
   quizid: { type: String, required: true },
   result: { type: String, required: true },
   qna: { type: String, required: true }
});

const results = model('results', resultSchema);

module.exports = results;
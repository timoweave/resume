const config = require('../../config');
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise; // NOTE: original mongoose.mpromise is deprecated
var Schema = mongoose.Schema;

var UserSchema = Schema({
  "firstname" : { type : String, required : false },
  "lastname" : { type : String, required : false },
  "nickname" : { type : String, required : false },
  "email" : { type : String, required : false },
  "passwor" : { type : String, required : false },
  "hashword" : { type : String, required : false },
  "userid" : { type : String, required : false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var ContactSchema = Schema({
  "method" : {type : String, required: false },
  "detail" : {type : String, required: false },
  "userid" : { type : String, required : false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var EducationSchema = Schema({
  "school" : { type : String, required : false },
  "state" : { type : String, required : false },
  "degree" : { type : String, required : false }, 
  "begin" : { type : String, required : false },
  "end" : { type : String, required : false },
  "userid" : { type : String, required : false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var TechnicalSchema = Schema({
  "category" : { type : String, required : false },
  "areas" : [ { type : String, required : false } ],
  "userid" : { type : String, required : false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var ExperienceSchema = Schema({
  "company" : { type : String, required : false },
  "city" : { type : String, required : false },
  "role": { type : String, required : false },
  "begin" : { type : String, required : false },
  "end" : { type : String, required : false },
  "projects" : [ { type : String, required : false } ],
  "userid" : { type : String, required : false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var models = {
  User: mongoose.model('User', UserSchema),
  Contact: mongoose.model('Contact', ContactSchema),
  Education: mongoose.model('Education', EducationSchema),
  Technical: mongoose.model('Technical', TechnicalSchema),
  Experience: mongoose.model('Experience', ExperienceSchema)
};

function crudify_models(url) {

  mongoose.connection.on('connected', connected);
  mongoose.connection.on('disconnected', disconnected);
  mongoose.connection.on('error', error);
  mongoose.connection.once('open', ready);
  var db = mongoose.connect(url);

  // functions

  function ready() {
    console.log("OK", "ready", "mongoose", url);
  }

  function connected() {
    console.log('OK', 'connected', 'mongoose', url);
  }

  function disconnected() {
    console.log('OK', 'disconnected', 'mongoose', url);
  }

  function error() {
    console.log('NO', 'error', 'mongoose', url);
  }
}

var crudified = false;
if (!crudified) {
  const url = config.isDeveloping ? config.mlocal : config.mlab;
  crudify_models(url);
  crudified = true;
}

module.exports = models;
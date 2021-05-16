const mongoos = require('mongoose');

mongoos.connect('mongodb://localhost:27017/learning',{ useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    if(!err){
        console.log("Database connected");
    }else{
        console.log("Error ", err);
    }
})

require('./employee.model')
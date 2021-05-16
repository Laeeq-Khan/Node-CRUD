const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/', (req, res)=>{
    res.render('employee/AddOrEditEmpoyee', {viewTitle: 'Add New Employee'})
});
router.post('/', (req, res)=>{
    addEmployee(req, res);
});

function addEmployee(req, res){
        var newEmployee = new Employee();
        newEmployee.fullName = req.body.fullName;
        newEmployee.email  = req.body.email;
        newEmployee.phone = req.body.phone;
        newEmployee.address = req.body.address;
        newEmployee.save((err, doc)=>{
            if(!err){
                res.render('employee/AddorEditEmpoyee');
            }else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req);
                    res.render('employee/AddOrEditEmpoyee', {
                        employee: req.body,
                        viewTitle: 'Add New Employee'
                    })
                }else{
                    console.log("Error while inserting employee record ", err)
                }
               
            }
        });
       
}

function handleValidationError(err, req){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                req.body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                req.body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;
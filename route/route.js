const route = require('express').Router();
const {write}  = require('../models/write')
const {Users} = require('../models/db');
const {updateAccess} = require('../models/update');
const bcrypt = require('bcrypt');


// SignUp Handler


route.post('/signup' , async(req,res)=>{

    let any = await Users.findOne({
        where: {email: req.body.email}
    })
    if(any){
        res.send('Email address already exists');
    }
    else{
        const hashedPassword  = await bcrypt.hash(req.body.password, 10)
        write(req.body.privilage , req.body.email , hashedPassword )
        res.send('success')
    }
    
})

// Login Handler

route.post('/login' ,  async(req,res)=>{
    let user = await Users.findOne({
        where: {email: req.body.email}
    })
    console.log(user)

    if(!user){
        res.send({status: 'error', message: 'No user found with this email id'})
    }else{
        const pass = await bcrypt.compare(req.body.password, user.password)
        if(pass){
            res.send({status: 'success' , data: {id: user.id , privilage: user.privilage} })
        }else{
            res.send({status: 'error' , message:"Wrong Password"})
        }
    }
})

// AccessRedButton Handler

route.post('/access' , async(req,res) =>{
    let user = await Users.findOne({
        where: {id: req.body.id}
    })

    if(user){
        res.send({status: 'success' , data: user.accessRed})
    }else{
        res.send({status: 'error' , message: 'Invalid Req'})
    }
})


// All users list handler

route.post('/allusers' , async(req,res)=>{
    let user = await Users.findOne({
        where: {id: req.body.id}
    })
    if(user){
        if(user.privilage === 'Admin'){
            const rawData = await Users.findAll({
                where:{privilage: 'Customer'}
            })

            const data = rawData.map(item =>{
                return(
                    {
                        email: item.email,
                        accessRed: item.accessRed,
                    }
                )
            })

            res.send({status: 'success' , data: data})
        }else{
            res.send({status: 'error' , message: "Not enough privilage to access database"})
        }
    }else{
        res.send({status: 'error' , message: "Invalid req"})
    }
})


// AccessRedButton Handler

route.post('/update' , async(req,res)=>{

    let user = await Users.findOne({
        where: {email: req.body.target}
    })

    if(user){
        if(user.id === req.body.id){
            res.send({status: 'error' , message: "You can't modify your own access"})
        }else{
            if(user.privilage === 'Admin'){
                res.send({status: 'error' , message: "You can't change the privilage of Admin"})
            }else{
                await updateAccess(user.email)
                res.send({status: 'success'})
            }
            
        }
    }else{
        res.send({status: 'error' , message: "Invalid req"})
    }
    


})

route.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
})


module.exports = {
    route,
}
const {db,Users} = require('./db');
const uniqid = require('uniqid');

async function write(privilage  , email , password){
 
    await db.sync();

    let accessRed = false;

    if(privilage === 'Admin'){
        accessRed = true;
    }

    let id = uniqid();

    Users.create({
        
        id: id,
        privilage: privilage,
        accessRed: accessRed,
        email: email,
        password: password,
    })
}

// write('Admin' , 'admin@1.com' , 'test')

module.exports = {
    write,
}
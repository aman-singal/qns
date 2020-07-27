const {db,Users} = require('./db');

async function read(){
 
    await db.sync();

    const user  = await Users.findAll();
    for(let u of user){
        console.log(`id:${u.id}  privilage: ${u.privilage} redAccess: ${u.accessRed} email: ${u.email} password: ${u.password}`)
    }

}

read();
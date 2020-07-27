const {db, Users} = require('./db');


async function updateAccess(email){
   await db.sync();

   const user = await Users.findOne({
       where:{email: email}
   })

   console.log(user.accessRed)

   await Users.update(
        {accessRed: !user.accessRed},
        {
            where:{email: email},
        }
    ).then(()=>{
        console.log("Red Button Access Updated !!!");
    }).catch((err)=>{
        console.error(err);
    })
}

// updateAccess("cust@1.com");

module.exports = {
    updateAccess,
}
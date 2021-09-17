const bcrypt = require('bcrypt');
class Helper {
    hashing = (password,callback) =>{
        bcrypt.hash(password, 10 , function(err, hash) {
            if(err){
                throw err
            }else{
                return callback(null,hash);
            }
          });
        }
    }
module.exports= new Helper();


const redis = require("redis");
const client = redis.createClient();
class Redis {
 redis = (req, res, next) => {
   client.get("data", (err, redisdata) => {
     if (err) {
       throw err;
     } else if (redisdata) {
       res.send({ redisData: JSON.parse(redisdata) });
     } else {
       next();
     }
   });
 };

 //  redisDataByID = (req, res, next) => {
 //    client.get("data", (err, redisdata) => {
 //      if (err) {
 //        throw err;
 //      } else if (redisdata) {
 //        res.send({ redisData: JSON.parse(redisdata) });
 //      } else {
 //        next();
 //      }
 //    });
 //  };

 clearCache = () => {
   client.flushall();
   console.log("Cache is cleared!");
 }
}
module.exports = new Redis();

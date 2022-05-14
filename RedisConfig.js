require('dotenv').config();
var Redis = require('redis');

//-------------Redis----------------------------
//---------------CLOUD REDIS------------------------------------
const redisClient = Redis.createClient({
    //When commented data will be saved on local Redis instance (there should be much faster response)
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true, //Need this 1 -this is connected
});
//--------------------------------------------------------

//---------------LOCAL REDIS------------------------------
// const redisClient = Redis.createClient({
//     legacyMode: true,
// });
//--------------------------------------------------------

redisClient.on('error', (err) => {
    console.log(err);
});

redisClient.on('connect', () => {
    console.log('Connected!');
});

redisClient.connect();

const key = 'klucz2';
const value = 'Hello world, React Dev here !!!!';
const returnData = true;
redisClient.get(key, (err, replay) => {
    if (replay != null) {
        console.log('Given key: "' + key + '" ,exist in DB');
        if (returnData) {
            console.log(replay);
        }
    } else {
        redisClient.set(key, value, (err, replay) => {
            if (replay) {
                console.log('Added new data');
            } else {
                console.log(err);
            }
        });
    }
});

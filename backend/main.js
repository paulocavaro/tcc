const app = require('express')()
const consign = require('consign')
const db = require('./config/db.js')
const mqtt = require('./api/mqtt.js')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

// mqtt.init().then(async _ => {
//     mqtt.client.on('message',(topic,data) => {
//             console.log('aqui esta ' + topic + ' ' + data)
//         })  
// }).catch(err => { console.log(err)})

app.listen(3000, () => {
    console.log('Backend executado na porta 3000')
})
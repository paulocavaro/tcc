const mqtt = require('mqtt')

class MQTT{
    
    init(){
        return new Promise((resolve,reject) => {
            this.client = mqtt.connect('mqtt://localhost')            
            this.client.on("connect",() => {
                console.log("MQTT iniciado")
            })            
            this.client.once('connect', () => {
                this.client.subscribe('#') // subscribe to everything
                return resolve()
            })
            this.client.once('error',reject)
        })
    }
    
    publish(topic,message){
        return new Promise ((resolve,reject) => {
            this.client.subscribe(topic)
            this.client.publish(topic,message)            
            resolve()
        })
    }
}

module.exports = new MQTT()

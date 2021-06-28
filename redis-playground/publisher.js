const redis = require('redis')

const publisher = redis.createClient()

publisher.on('connect', err => {
  console.log("Berhasil connect gan!")
})

let counter = 0
let c1 = 0
setInterval(() => {
  counter++
  if (counter % 7 == 0) {
    publisher.set('key1', "Kelipatan 7 ke " + ++c1, 'EX', 100, redis.print)
  }
  publisher.get('key1', redis.print)
  publisher.publish('TOPIC', "Hei " + Date.now())
}, 500);
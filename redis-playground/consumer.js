const redis = require('redis')

const client = redis.createClient()

client.on('connect', err => {
  console.log("Berhasil connect gan!")
})

client.subscribe('TOPIC')

client.get('key1', redis.print)
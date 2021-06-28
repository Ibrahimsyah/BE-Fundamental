const redis = require('redis')

const client = redis.createClient({
  host: '127.0.0.1'
})

client.on('connect', err => {
  console.log("Berhasil connect gan!")
})

// Require external modules
const mongoose = require('mongoose')

const fastify = require('fastify')({
  logger: true
})
const routes = require('./routes')

// Connect to DB
mongoose.connect('mongodb://mongo:27017/tidydb')
 .then(() => console.log('MongoDB connected ✅'))
 .catch(err => console.log(err))

routes.forEach((route, index) => {
  fastify.route(route)
 })
 
// Declare a route
fastify.get('/', async (request, reply) => {
  await reply.redirect([302], 'https://mourraille.site/404')
  return //404
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000,'0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()






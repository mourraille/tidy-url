// Import our Controllers
const urlEntry = require('../controllers/urlEntry')

const routes = [
//   {
//     method: 'GET',
//     url: '/',
//     handler: urlEntry.getUrlEntries
//   },
  {
    method: 'GET',
    url: '/get/:id',
    handler: urlEntry.getUrlEntry
  },
  {
    method: 'GET',
    url: '/:id',
    handler: urlEntry.getRedirect
  },
  {
    method: 'POST',
    url: '/',
    handler: urlEntry.addUrlEntry//,
   // schema: documentation.addUrlEntrySchema
  },
  {
    method: 'PUT',
    url: '/:id',
    handler: urlEntry.updateUrlEntry
  },
  {
    method: 'DELETE',
    url: '/:id',
    handler: urlEntry.deleteUrlEntry
  }
]

module.exports = routes
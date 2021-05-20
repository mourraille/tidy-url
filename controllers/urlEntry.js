// External Dependancies
const boom = require('boom')
const nanoid = require('nanoid');

// Get Data Models
const urlEntry = require('../models/urlEntry')

// Get all entries
exports.getUrlEntries = async (req, reply) => {
  try {
    const urlEntries = await urlEntry.find()
    return urlEntries
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get entry by ID
exports.getUrlEntry = async (req, reply) => {
  try {
    const id = req.params.id
    const urlentry = await urlEntry.findById(id)
    return urlentry
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get redirection
exports.getRedirect = async (req, reply) => {
    try {
      const id = req.params.id
      const urlentry = await urlEntry.find({$or:[{"url_id":id},{"human_id":id}]})
      console.log(urlentry.length)
      if ( urlentry.length != 0) {
          var clicks = Number(urlentry[0].clicks) + 1
          const update = await urlEntry.findByIdAndUpdate(urlentry[0].id, {"clicks": clicks}, { new: true })
          await reply.redirect([302], 'https://' + urlentry[0].real_url)
          return 
    } else {
        await reply.redirect([302], 'https://mourraille.site/404')
        return //404
    } 
    } catch (err) {
      throw boom.boomify(err)
    }
  }

// POST an Entry
exports.addUrlEntry = async (req, reply, next) => {
  try {
    
    let human_id = req.body.human_id
    let real_url = req.body.real_url
    let url_id = nanoid.nanoid(7)
    let clicks = 0
    console.log(human_id)
    if (!human_id) {
      human_id = url_id
    } 

    const urlentry = new urlEntry({human_id,real_url,url_id,clicks})
    return urlentry.save()
    next()
  } catch (err) {
    throw boom.boomify(err.msg)
  }
}


// Update an Entry
exports.updateUrlEntry = async (req, reply) => {
  try {
    const id = req.params.id
    const urlentry = req.body
    const { ...updateData } = urlentry
    const update = await urlEntry.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    if (err.code == "11000") {
        
    }  
    throw boom.boomify(err)
  }
}

// Delete an Entry
exports.deleteUrlEntry = async (req, reply) => {
  try {
    const id = req.params.id
    const urlentry = await urlEntry.findByIdAndRemove(id)
    return urlentry
  } catch (err) {
    throw boom.boomify(err)
  }
}
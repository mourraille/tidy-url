// External Dependancies
const mongoose = require('mongoose')
const nanoid = require('nanoid');

const urlEntrySchema = new mongoose.Schema({
  real_url: String,
  clicks: Number,
  human_id: {
      type: String, 
      unique: true
  },
  url_id: {
    type: String,
    unique: true,
    default: () => nanoid.nanoid(7)
}
})
urlEntrySchema.set('timestamps',true);

module.exports = mongoose.model('urlEntry', urlEntrySchema)
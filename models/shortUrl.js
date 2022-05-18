const mongoose = require("mongoose")
const nanoid = require("nanoid")

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: nanoid.nanoid(7)
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, { versionKey: false, collection: "shortenedUrls" })

module.exports = mongoose.model("shortUrlModel", shortUrlSchema)
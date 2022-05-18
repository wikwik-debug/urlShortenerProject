require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl")

const app = express()

const mongoPass = process.env.PASS
mongoose.connect(`mongodb+srv://admin:${mongoPass}@mycluster.bcadx.mongodb.net/urlShortenerDatabase?retryWrites=true&w=majority`)

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render("index", { shortUrls: shortUrls})
})

app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ fullUrl: req.body.fullUrl })
    res.redirect("/")
})

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
    if (shortUrl === null) {
        res.status(404)
    } else {
        shortUrl.clicks++
        shortUrl.save()
        res.redirect(shortUrl.fullUrl)
    }
})

const PORT = 2006
app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))

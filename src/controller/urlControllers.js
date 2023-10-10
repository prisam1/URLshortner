
const shortid = require('shortid')
const urlModel = require("../models/urlModel")

const urlShorter = async function (req, res) {
    try {
        if(Object.keys(req.body).length==0){
            return res.status(400).send({ status: false, message: "Invalid request:Please provide longUrl in the Body" })
        }
        let longUrl = req.body.longUrl


        if (!longUrl) {
            return res.status(400).send({ status: false, message: "Please Provide longUrl" })
        }
        if (typeof longUrl !== "string") {
            return res.status(400).send({ status: false, message: "longUrl Must be in String" })
        }
        let urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/



        longUrl = longUrl.trim()
          if (!longUrl.match(urlRegex)) {
            return res.status(400).send({ status: false, message: "Invalid Url" })
            
        } 
     
        let url = await urlModel.findOne({ longUrl: longUrl }).select({ _id: 0, __v: 0 })
        if (url) {

            return res.status(200).send({ status: true, message: "ShortUrl is already created for this URL", data: url })
        }
             
     
        let urlCode = (shortid.generate()).toLowerCase();
        let baseUrl = "https://tiny.url/"
        let shortUrl = baseUrl + urlCode;

        let savedData = await urlModel.create({ urlCode: urlCode, longUrl: longUrl, shortUrl: shortUrl })
     
        return res.status(201).send({
            status: true, message: "ShortUrl Generated Successfully", data: {
                urlCode: savedData.urlCode,
                longUrl: savedData.longUrl,
                shortUrl: savedData.shortUrl
            }
        })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const geturl = async function (req, res) {
    try {

        const urlCode = req.params.urlCode

        if (!shortid.isValid(req.query.urlCode.trim()))
         {
            return res.status(400).send({ status: false, message: "Invalid Short URL" })
        }
              
        const url = await urlModel.findOne({ urlCode: urlCode })
        if (url) {
             return res.status(302).redirect(url.longUrl)
        } else {
            return res.status(404).send({ status: false, message: "No URL Found" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err })
    }
}

module.exports = { urlShorter, geturl }

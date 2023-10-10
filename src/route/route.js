const express = require ('express')
const router = express.Router()
const {urlShorter, geturl} = require("../controller/urlControllers")


router.post("/url/shorten", urlShorter)
router.get("/get", geturl)

router.all("/*", (req,res)=> {
    return res.status(400).send({ status: false, Message: "Invalid URL"})

}); 

module.exports = router
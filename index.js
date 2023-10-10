const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const route=require('./src/route/route')
const cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://pritamsam1:Pritamsam1@project.383arvg.mongodb.net/url",{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB Connected..")
}).catch(err=>{
    console.log(err.message);
})

app.use('/',route)

app.listen(process.env.PORT || 5001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5001))})

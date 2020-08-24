require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser= require('cookie-parser')
const mongoose = require('mongoose')

app.set('port', process.env.PORT || 7000)

app.use(cookieParser())
app.use(express.json())

const URI = process.env.MONGODB_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err)=> {
    if (err) return console.log(err)
    console.log('The server is conncected to MongoDB database')
})

/*const User = require('./models/User')

const userInput = {
    username: "lizzeth",
    password: "1234567",
    role: "admin"
}

const user = new User(userInput)
user.save((err,document)=>{
    if(err)
        console.log(err)
    console.log(document)
}
)*/
const userRouter = require('./routes/User')
app.use('/user',userRouter)

async function main() {
    await app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
}

main()
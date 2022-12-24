const express = require("express")
const bodyParser = require("body-parser")
const usersRouter = require("./routers/usersRouter")
const carsRouter = require("./routers/carsRouter")
const app = express()
const corc = require("cors")

app.use(corc())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/users", (req, res, next) => {
    next()
})

app.use("/users", usersRouter)
app.use("/cars", carsRouter)

app.listen(8080, () => {
    console.log('Server start')
})
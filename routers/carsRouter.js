const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/", (req,res) => {
    res.send(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }))
})
router.post("/", (req,res) => {
    const carsArr = JSON.parse(fs.readFileSync("./routers/cars.json"))
    carsArr.push({id: carsArr.length+1, model: req.body.model})
    fs.writeFileSync("./routers/cars.json", JSON.stringify(carsArr))
    res.send("car added")
})

module.exports = router
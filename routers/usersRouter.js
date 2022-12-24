const express = require("express")
const router = express.Router()
const fs = require("fs")


router.get("/", (req,res) => {
    res.send(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }))
})
router.get("/:id", (req,res) => {
    const id = +req.params.id
    const usersArr = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }))
    const user = usersArr.find(user => user.id === id)
    res.send(user)
})
// router.get("/count", (req,res) => {
//     const id = +req.params.id
//     usersArr = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }))
//     const user = usersArr.find(user => user.id === id)
//     res.send(user)
// })

router.delete("/:id", (req,res) => {
    const id = +req.params.id
    const usersArr = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }))
    fs.writeFileSync("./routers/users.json", JSON.stringify(usersArr.filter(user => user.id !== id)))
    res.send("User delete")
})

router.post("/", (req,res) => {
    const usersArr = JSON.parse(fs.readFileSync("./routers/users.json")) || [];
    usersArr.push({id: usersArr[usersArr.length-1]?.id + 1 || 1, name: req.body.name})
    fs.writeFileSync("./routers/users.json", JSON.stringify(usersArr))
    res.send("user added")
})



module.exports = router
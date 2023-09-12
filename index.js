// fruit api
const fruits = require("./fruits.json")
const express = require("express")
const app = express()
const port = process.env.PORT

app.use(express.json())


// returns main page
app.get("/", (req, res) => {
res.send("Hello Fruit API")
})
// returns all the fruits
app.get("/fruits", (req, res) => {
    res.send(fruits)
})

const getFruitIndex = (name) => {
    // returns the index of the fruit or -1
    return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
} 
    

// POST request. 
app.post("/fruits", (req, res) => {
    const fi = getFruitIndex(req.body.name.toLowerCase())
    if (fi > -1) {
        res.status(409).send("the fruit already exists")
    } else {
        const ids = fruits.map((fruit) => fruit.id)
        let maxId = Math.max(...ids)
        maxId++
        req.body.id = maxId
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete("/fruits/:name", (req, res) => {
    const fi = getFruitIndex(req.param.name.toLowerCase())
    if ( fi == -1) {
        res.status(404).send("Fruit can not be found")
    } else {
        fruits.splice(fi, 1)
        res.sendStatus(200)
    }
})

app.get("/fruits/:name", (req, res) => {
    // res.send(`Return a fruit with ${req.params.name} name`)
    const name = req.params.name.toLowerCase()
    // Search fruits.json to return fruit if there is a match
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
    // if theres is no match then send a error message with status code else send the fruit data.
    if (fruit == undefined) {
        res.status(404).send("The fruit doesn't exist")
    } else {
        res.send(fruit)
    }
})

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})
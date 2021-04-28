const { app } = require('./core');
const { db, sse, update } = require('./db');

let devices = db.get('devices');
let categories = db.get('categories');
//let key = db.get('key')

/* app.use('/devices', (req, res, next) => {
    
}) */

app.get('/devices', (req, res) => {
    console.log(req.query)
    let q = req.query;
    let device = devices.find(device => device.id === q.id)
        .assign(
            {
                on: q.on,
                //brightness: q.brightness * 1,
                temperature: q.temperature,
                state: q.state,
                locked: q.locked
                // color: q.color
            }).value()

    update();

    res.send(`${device.type} in ${device.name} is ${device.on}`)
})

app.get('/categories', (req, res) => {
    let q = req.query;
    let category = categories.find({ type: q.type })
        .assign(
            {
                on: q.on,
                type: q.type,
                brightness: q.brightness * 1,
                temperature: q.temperature,
                state: q.state
            }).value()
    res.send(`${category.type} in ${category.name} is ${category.on}`)
})



app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

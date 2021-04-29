const { app } = require('./core');
const { db, sse, update } = require('./db');

let devices = db.get('devices');


/* app.get('/devices/:type/:id/:on', (req, res) => {
    let device = devices.find(device => device.id === req.params.id)
    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()
        update()
        if(req.params.on === 'off'){
            res.send(`${device.name} är av`)
        } else {
            res.send(`Please enter a valid function for ${device.name}`)
        }
    }
    else if (req.params.on === 'on') {
        device.assign(
            {
                on : true,
                state : 'on',
            }).value()
            update()
        if(JSON.stringify(req.query) == '{}'){
            console.log('req.query', req.query)
            res.send(`${device.name} is ${device.state}`)
        } else {
            device.assign(
                {
                    temperature : req.query.temperature,
                    // brightness : req.query.brightness,
                    // color: req.query.color
                }).value()
                update()
            res.send('req queeery')
        }
    } else {
        res.send('Please enter a valid function')
    }

}) */

app.get('/lights/:id/:on', (req, res) => {
    let device = devices.find(device => device.id === req.params.id)
    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()
        update()
        if(req.params.on === 'off'){
            res.send(`${device.name} är av`)
        } else {
            res.send(`Please enter a valid function for ${device.name}`)
        }
    }
    else if (req.params.on === 'on') {
        device.assign(
            {
                on : true,
                state : 'on',
            }).value()
            update()
        if(JSON.stringify(req.query) == '{}'){
            console.log('req.query', req.query)
            res.send(`${device.name} is ${device.state}`)
        } else {
            device.assign(
                {
                    brightness : req.query.brightness
                }).value()
                update()
            res.send('req queeery')
        } 
    } else {
        res.send('Please enter a valid function - on or off')
    }

})

/* app.use('/', (res, req, next) => {
    if (req.body){

        device.assign(
                {   on: true,
                    temperature: q.temperature,
                    // color: q.color
                    //brightness: q.brightness * 1,
                }).value()
    
    
            update();
            res.send(`Device: ${device.type} with ID: ${device.id} \n Location: ${device.name} \n is ${device.on}`)
        }
}) */



/* app.get('/devices', (req, res) => {
    console.log(req.query)
    let q = req.query;
    let device = devices.find(device => device.id === q.id) 
    .assign(
            {
                on: q.on,
                temperature: q.temperature,
                state: q.state,
                locked: q.locked
                // color: q.color
                //brightness: q.brightness * 1,
            }).value()


        update();
        res.send(`Device: ${device.type} with ID: ${device.id} \n Location: ${device.name} \n is ${device.on}`)
}) */



app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

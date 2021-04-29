const { app } = require('./core');
const { db, update } = require('./db');


let devices = db.get('devices')

// AIR CONDITION
// IDs: AC1
app.get('/AC/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
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
            res.send(`${device.temperature} hej`)
        } else {
            device.assign(
                {
                    temperature : req.query.temperature
                }).value()
                update()
            res.send(`Temperature is ${device.temperature}`)
        } 
    } else {
        res.send('Please enter a valid function - on or off')
    }
})

// BLINDS
// IDs: BLI1
// Up / Down
app.get('/blinds/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'up',
            }).value()
        update()
        if(req.params.on === 'off'){
            res.send(`${device.name} is up`)
        } else {
            res.send(`Please enter a valid function for ${device.name}`)
        }
    } else if (req.params.on === 'on') {
        device.assign(
            {
                on : true,
                state : 'down',
            }).value()
            update()
/* ************* */
            console.log('undefined?', typeof(device))
            res.send(`${device.name} is down`)
    } else {
        res.send('Please enter a valid function - on or off')
    }
})

// LIGHTS
// IDs: LIG1, LIG2, LIG3
app.get('/lights/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
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
            res.send(`Please enter a valid function for ${device.name}, on or off`)
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
        } else if (req.query !== '{}'){
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

// Vacuum
// IDs: VAC1
app.get('/vacuum/:id/:state', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
    if (req.params.on !== 'on' || 'charge') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()
        update()
        if(req.params.state === 'off'){
            res.send(`${device.name} är av`)
        } else {
            res.send(`Please enter a valid function for ${device.name}`)
        }
    }
    else if (req.params.state === 'on') {
        device.assign(
            {
                on : true,
                state : 'cleaning',
            }).value()
            update()
        res.send(`${device.name} is ${device.state}/cleaning`)
    } else if (req.params.state === 'charging') {
        device.assign(
            {
                on : true,
                state : 'charging',
            }).value()
            update()
        res.send(`${device.name} is /charging`)
    } else {
        res.send('Please enter a valid function - on or off')
    }
})

// Lock
// IDs: LOC1
app.get('/lock/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
    if (req.params.on !== 'on') {
        device.assign(
            {
                locked: false,
                state: 'locked',
            }).value()
        update()
        if(req.params.on === 'off'){
            res.send(`${device.name} is locked`)
        } else {
            res.send(`Please enter a valid function for ${device.name}`)
        }
    }
    else if (req.params.on === 'on') {
        device.assign(
            {
                locked: true,
                state : 'open',
                secret: '19d493b3-9a2e-495e-9dc2-44b7836dae9a'
            }).value()
            update()
        res.send(`${device.name} is open`)
    } else {
        res.send('Please enter a valid function - on or off')
    }
})

// Camera
// IDs: CAM1
app.get('/camera/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
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
                state : 'filming',
                secret : 'a5e337f5-a391-4fda-894e-d14aba719c9e'
            }).value()
            update()
        res.send(`${device.name} is filming`)
    } else {
        res.send('Please enter a valid function - on or off')
    }
})

// Speaker
// IDs: SPE1
app.get('/speaker/:id/:on', (req, res) => {
    let device = devices.filter(device => device.id === req.params.id)
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
                state : 'playing music',
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

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

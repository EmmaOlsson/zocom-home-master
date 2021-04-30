const { app } = require('./core');
const { db, sse, update } = require('./db');

// Hämtar devices från db.json i mappen ./db
let devices = db.get('devices')


// AIR CONDITION
// IDs: AC1
// Inställningar tillgängliga via querys: temperature

app.put('/AC/:id/:on', (req, res) => {

    // Skapar en device-variabel där objektets id i devices stämmer överens med samma req.params.id som användaren skriver i url:en
    let device = devices.find(device => device.id === req.params.id)

    // Skapar en variabel för device.value()
    let devValue = device.value()

    // Följande kodstycke körs om användare skriver in något annat än 'on' för req.params.id (/:id) i url:en 
    // Detta innebär att device:n stängs av om användaren skriver 'off' eller råkar skriva fel
    if (req.params.on !== 'on') {

        // Assignar nya värden till key:s som innebär att device:n stängs av
        device.assign(
            {
                on: false,
                state: 'off.',
            }).value()

        // Kör update-funktionen från ./db/index.js som returnerar ett promise
        update()

        // Om användaren har skrivit in 'off' som /:id-parameter skickas följande response
        if (req.params.on === 'off') {
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}`)

            // Om användaren har skrivit in något annat än on eller off som /:id-parameter skickas följande response som uppmanar användaren att ange antingen 'on' eller 'off'
        } else {
            res.send(`Please enter a valid function (on/off) for ${devValue.id} in ${devValue.name}`)
        }
    }

    // När användaren skrivit 'on' som /:id-parameter körs följande kodstycke
    else {

        // Assignar nya värden till key:s som innebär att device:n stängs av
        device.assign(
            {
                on: true,
                state: 'on',
            }).value()

        // Kör update-funktionen från ./db/index.js som returnerar ett promise
        update()

        // Om användaren inte har skrivit in några querys (alltså att req.query == '{}' är tom) skickas följande response som informerar användaren status för devicen
        if (JSON.stringify(req.query) == '{}') {
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}. The temperature is ${devValue.temperature}`)

            // Om användaren har skrivit in en parameter assignas nya värden till key som innebär att device:n (i detta fall) ändrar temperaturen
        } else {
            device.assign(
                {
                    temperature: req.query.temperature
                }).value()
            
            // Innan update-funktionen körs if-statementet om query-parametern är undefined, i så fall uppmanas användaren skriva in en giltig inställning för device:n
            if(device.value().temperature === undefined) {
                res.send(`Please enter a valid setting for ${devValue.id} - try temperature`)

            // Om temperature (alltså värdet är inte undefined) skrivs in som query så körs följande kodstycke och temperaturen ändras och status för device:n skrivs ut.
            } else {
            update()
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}. The temperature is ${devValue.temperature}`)
            }
        } 
    }
})

// BLINDS
// IDs: BLI1
app.put('/blinds/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'up',
            }).value()
        update()

        if (req.params.on === 'off') {
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}`)
        } else {
            res.send(`Please enter a valid function (on/off) for ${devValue.id} in ${devValue.name}`)
        }

    } else {
        device.assign(
            {
                on: true,
                state: 'down',
            }).value()

        update()

        res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}`)
    } 
})

// LIGHTS
// IDs: LIG1, LIG2, LIG3
// Inställningar tillgängliga via querys: temperature

app.put('/lights/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()

        update()

        if (req.params.on === 'off') {
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}`)

        } else {
            res.send(`Please enter a valid function (on/off) for ${devValue.id} in ${devValue.name}`)
        }
    } 

    else {
        device.assign(
            {
                on: true,
                state: 'on',
            }).value()

        update()

        if (JSON.stringify(req.query) == '{}') {
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}. The brightness is ${devValue.brightness*100}%`)

        } else {
            device.assign(
                {
                    brightness: req.query.brightness
                }).value()
            
            if(device.value().brightness === undefined) {
                res.send(`Please enter a valid setting for ${devValue.id} - try brightness and a value from 0 to 1`)

            } else {
            update()
            res.send(`${devValue.type} (${devValue.id}) in ${devValue.name} is ${devValue.state}. The brightness is ${devValue.brightness*100}%`)
            }
        } 
    }
})

// Vacuum
// IDs: VAC1
app.put('/vacuum/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()
        update()
        if (req.params.on === 'off') {
            res.send(`${devValue.name} is ${devValue.state}`)
        } else {
            res.send(`Please enter a valid function (on/off) for ${devValue.name}`)
        }
    } else {
        device.assign(
            {
                on: true,
                state: 'cleaning',
            }).value()
        update()
        res.send(`${devValue.name} is ${devValue.state}`)
    } 
})

// Lock
// IDs: LOC1
app.put('/lock/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'open') {
        device.assign(
            {
                locked: false,
                state: 'locked',
            }).value()

        update()

        if (req.params.on === 'lock') {
            res.send(`${devValue.name} is ${devValue.state}`)
        } else {
            res.send(`Please enter a valid function for ${devValue.name} - open or lock`)
        }
    }
    else {
        device.assign(
            {
                locked: true,
                state: 'open',
                secret: '19d493b3-9a2e-495e-9dc2-44b7836dae9a'
            }).value()

        update()

        res.send(`${devValue.name} is ${devValue.state}`)
    } 
})

// Camera
// IDs: CAM1
app.put('/camera/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()

        update()

        if (req.params.on === 'off') {
            res.send(`${devValue.type} at ${devValue.name} is ${devValue.state}`)
        } else {
            res.send(`Please enter a valid function for ${devValue.type} at ${devValue.name} - on or off`)
        }
    }
    else {
        device.assign(
            {
                on: true,
                state: 'filming',
                secret: 'a5e337f5-a391-4fda-894e-d14aba719c9e'
            }).value()

        update()

        res.send(`${devValue.type} at ${devValue.name} is ${devValue.state}`)
    } 
})

// Speaker
// IDs: SPE1
app.put('/speaker/:id/:on', (req, res) => {

    let device = devices.find(device => device.id === req.params.id)

    let devValue = device.value()

    if (req.params.on !== 'on') {
        device.assign(
            {
                on: false,
                state: 'off',
            }).value()

        update()

        if (req.params.on === 'off') {
            res.send(`${devValue.type} in ${devValue.name} is ${devValue.state}`)
        } else {
            res.send(`Please enter a valid function for ${devValue.type} in ${devValue.name}`)
        }
    }
    else {
        device.assign(
            {
                on: true,
                state: 'playing music',
            }).value()

        update()

        res.send(`${devValue.type} in ${devValue.name} is ${devValue.state}`)
    } 
})

// Skapar en server på port 3000 och console.log:ar för att se när den körs
app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})



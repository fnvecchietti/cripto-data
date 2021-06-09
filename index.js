const express = require('express')
const path = require('path')
const app = express()
const so = require('fs')
var colors = require('colors');
const cypress = require('cypress')

let isRunning

async function run() {
    isRunning = true
    await cypress.run({
        browser: 'chrome',
        config: {
            video: false
        },
        headless: true
    }).then(() => {
        isRunning = false
    })
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    if (!isRunning) {
        let rawdata = await so.readFileSync('./data.json')
        let data = await JSON.parse(rawdata)
        res.render('index', data)
    } else {
        res.render('shitloading')
    }

})

app.listen(3000, () => {
    console.log('server running on: ', 3000);
})
setInterval(() => {
    run()
}, 180000)
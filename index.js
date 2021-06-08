const express = require('express')
const path = require('path')
const app = express()
const so = require('fs')
var colors = require('colors');
const cypress = require('cypress')

async function run() {
    await cypress.run({
        browser: 'chrome',
        config: {
            video: false
        },
        headless: true
    })
    let rawdata = await so.readFileSync('./data.json')
    let data = await JSON.parse(rawdata)
    return data
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    run().then(data => {
        res.render('index', data)
    })
})

app.listen(3000, () => {
    console.log('server running on: ', 3000);
})
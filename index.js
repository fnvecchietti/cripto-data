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

run().then(res => {
    res.data.forEach(coin => {
        coin.status > 0 ? console.log(colors.green(coin)) : console.log(colors.red(coin))
    })
})



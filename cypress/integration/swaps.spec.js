
/*

PARA CONFIGURAR VAS A LOS ARRAY DE LOS TOKENS SEGUN EL SWAP

AGREGAS UN NUEVO OBJETO COMO ESTE 

{
    name: 'El nombre del token'
    contract: 'El contrato del token',
    quantity: 'la cantidad de tokens que tenes',
    base: 'la cantidad de USDT/BUSD/USDC que invertiste'
}

dejo ejemplos abajo con algunos tokens.

*/


const DATA = { data: [] }

describe('Go to pancakeSwap', () => {
    let tokens = [
        {
            name: 'Neko',
            contract: '0x22f020a4cbe06a965fce624f62232fdab6c7e627',
            quantity: 2190366207,
            base: 60
        },
        {
            name: 'Wex',
            contract: '0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90',
            quantity: 3460,
            base: 100
        },
        {
            name: 'Predator',
            contract: '0x2BC3b2d426c3cEC0914912F97524722b401f1D84',
            quantity: 300,
            base: 415
        }
    ]
    tokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValueFromPancake(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.writeFile('./data.json', DATA)
    })

})

describe('Go to Quickswap', () => {
    let polygonTokens = [
        {
            name: 'PolyDoge',
            contract: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
            quantity: 3545328175,
            base: 46
        },
        {
            name: 'Polymoon',
            contract: '0xeFb3009DdAc87E8144803d78E235E7fb4cd36e61',
            quantity: 25653,
            base: 0
        },
        {
            name: 'Lion',
            contract: '0x1DA554D34027ca8dE74C5b1cd2FA53A8a1492C94',
            quantity: 328,
            base: 28
        }, {
            name: 'Kogecoin',
            contract: '0x13748d548D95D78a3c83fe3F32604B4796CFfa23',
            quantity: 1164,
            base: 0
        }

    ]
    polygonTokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValueFromQuickSwap(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.readFile('./data.json').then(obj => {
            const result = DATA.data.concat(obj.data)
            cy.writeFile('./data.json', result)
        })
    })
})

describe('Go to Heco Swap', () => {
    let hecoTokens = [
        {
            name: 'SHIB',
            contract: '0xC38072AA3F8E049De541223A9c9772132bB48634',
            quantity: 8416062,
            base: 139
        },
        {
            name: 'NUT',
            contract: '0x4f0A338DFa1C9369F62109C9022042e1F0aE479b',
            quantity: 231,
            base: 30
        },
        {
            name: 'MSP',
            contract: '0x3587b2f70d5eaaa26a7b6520b9f286b6538d621f',
            quantity: 2014869095,
            base: 0
        },
        {
            name: 'PGO',
            contract: '0xcecc272583c4ea6167f832cf14e9522c605dd631',
            quantity: 6726,
            base: 53
        }
    ]
    hecoTokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValuesFromHtSwap(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.readFile('./data.json').then(obj => {
            const result = obj.concat(DATA.data)
            cy.writeFile('./data.json', { data: result })
        })
    })
})

function getBuyValueFromPancake(contract, name, quantity, base) {
    return new Promise((resolve, reject) => {
        cy.visit(`https://exchange.pancakeswap.finance/#/swap?inputCurrency=${contract}&outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56`)
        cy.wait(2000)
        if (cy.get('reach-portal')) {
            cy.wait(500)
            cy.get('input[name="confirmed"').click()
            cy.wait(500)
            cy.get('button').contains('Import').click()
            cy.wait(500)
        }
        // cy.get('#swap-currency-output').find('#pair').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('busd')
        // cy.wait(2000)
        // cy.get('[title="BUSD Token"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}

function getBuyValueFromQuickSwap(contract, name, quantity, base) {

    return new Promise((resolve, reject) => {
        cy.visit(`https://quickswap.exchange/#/swap?inputCurrency=${contract}&outputCurrency=0xc2132D05D31c914a87C6611C10748AEb04B58e8F`)
        cy.wait(2500)
        if (cy.get('.token-warning-container')) {
            cy.wait(1500)
            cy.get('.understand-checkbox').click()
            cy.wait(1500)
            cy.get('.token-dismiss-button').click()
            cy.wait(1500)
        }
        // cy.get('#swap-currency-output').find('.open-currency-select-button').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('usdt')
        // cy.wait(2000)
        // cy.get('[title="Tether USD"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}

function getBuyValuesFromHtSwap(contract, name, quantity, base) {
    return new Promise((resolve, reject) => {
        cy.visit(`https://ht.mdex.com/#/swap?inputCurrency=${contract}&outputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a`)
        cy.wait(2500)
        if (cy.get('.token-warning-container')) {
            cy.wait(1500)
            cy.get('.understand-checkbox').click()
            cy.wait(1500)
            cy.get('.token-dismiss-button').click()
            cy.wait(1500)
        }
        // cy.get('#swap-currency-output').find('.open-currency-select-button').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('usdt')
        // cy.wait(2000)
        // cy.get('[title="Tether USD"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            console.log(status);
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}

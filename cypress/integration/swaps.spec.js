
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
            name: 'Banana',
            contract: '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95',
            quantity: 62.66,
            base: 136
        },
        {
            name: 'SafeMoon',
            contract: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3',
            quantity: 12909391,
            base: 50
        },
        {
            name: 'Wex',
            contract: '0xa9c41a46a6b3531d28d5c32f6633dd2ff05dfb90',
            quantity: 3380,
            base: 100
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
            quantity: 345,
            base: 28
        }
        , {
            name: 'KogeCoin',
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
            contract: '0xc38072aa3f8e049de541223a9c9772132bb48634',
            quantity: 8416062,
            base: 139
        }, {
            name: 'MSP',
            contract: '0x3587b2f70d5eaaa26a7b6520b9f286b6538d621f',
            quantity: 2002872652,
            base: 0
        }, {
            name: 'PGO',
            contract: '0xceCc272583C4Ea6167f832Cf14E9522C605dD631',
            quantity: 10331,
            base: 53
        }, {
            name: 'NUT',
            contract: '0x4f0A338DFa1C9369F62109C9022042e1F0aE479b',
            quantity: 82,
            base: 30
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
        if (name != 'Cake' && name != 'SafeMoon') {
            cy.get('reach-portal').then(() => {
                cy.wait(500)
                cy.get('input[name="confirmed"').click()
                cy.wait(500)
                cy.get('button').contains('Import').click()
                cy.wait(500)
            })
        }
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
        cy.wait(1500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2000)
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

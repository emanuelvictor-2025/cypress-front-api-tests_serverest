
import faker from 'faker';

const postProducts = require('./request/productRegistration')
const postLogin = require('../login/request/login')
const postUsers = require('../users/request/userRegistration')

let email, password, jwt

beforeEach('Register user and perform login', function () {
    const name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password()
    const adm = 'true'

    cy.api_postUsers(name, email, password, adm).then((response) => {
        expect(response.status).to.eq(201)
    })

    cy.api_postLogin(email, password).then((response) => {
        expect(response.status).to.eq(200)
        jwt = response.body.authorization
    })
})

describe('POST Products', () => {
    it('able to register a product with success', () => {
        const product_name = faker.commerce.productName()
        const price = faker.datatype.number({ min: 1000, max: 9999 })
        const description = faker.commerce.productDescription()
        const qtd = faker.datatype.number({ min: 1, max: 9999 })

        cy.api_postProducts(product_name, price, description, qtd, jwt).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })
    })
})

context('Erros', () => {
    it('not able to register product with already choosen name', () => {
        const product_name = faker.commerce.productName()
        const price = faker.datatype.number({ min: 1000, max: 9999 })
        const description = faker.commerce.productDescription()
        const qtd = faker.datatype.number({ min: 1, max: 9999 })

        cy.api_postProducts(product_name, price, description, qtd, jwt).then((response) => {
            expect(response.status).to.eq(201)

            cy.api_postProducts(product_name, price, description, qtd, jwt).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.contain('Já existe produto com esse nome')
            })
        })
    })

    it('not able to register products with mandatory fields empty', () => {
        const product_name = ''
        const price = ''
        const description = ''
        const qtd = ''

        cy.api_postProducts(product_name, price, description, qtd, jwt).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.all.keys('nome', 'preco', 'descricao', 'quantidade');
            expect(response.body).to.deep.include({
                nome: 'nome não pode ficar em branco',
                preco: 'preco deve ser um número',
                descricao: 'descricao não pode ficar em branco',
                quantidade: 'quantidade deve ser um número'
            })
        })
    })
})

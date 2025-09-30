import '../../support/commands'
import faker from 'faker';

const baseUrl = Cypress.config('baseUrl')
const postUsers = require('../../api/users/request/userRegistration')
const postProducts = require('../../api/products/request/productRegistration')

beforeEach(() => {
    cy.visit('/')

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const adm = 'true'

    cy.api_postUsers(name, email, password, adm).then((response) => {
        expect(response.status).to.eq(201)
    })

    cy.intercept('POST', '/login').as('loginRequest')

    cy.login(email, password)

    cy.wait('@loginRequest').then((retorno) => {
        const jwt = retorno.response.body.authorization
        Cypress.env('jwt', jwt)
    })
})

describe('Product Registration', () => {
    it('able to register a product with success', () => {
        const product_name = faker.commerce.productName()
        const price = faker.datatype.number({ min: 1000, max: 9999 })
        const description = faker.commerce.productDescription()
        const qtd = faker.datatype.number({ min: 1, max: 9999 })

        cy.registerProduct(product_name, price, description, qtd)

        cy.url().should('be.equal', `${baseUrl}/admin/listarprodutos`)
        cy.get('table tbody').contains('td', product_name).should('be.visible')
        cy.get('table tbody').contains('td', price).should('be.visible')
        cy.get('table tbody').contains('td', description).should('be.visible')
        cy.get('table tbody').contains('td', qtd).should('be.visible')
    })
})

context('Erros', () => {
    it('not able to register products with mandatory fields empty', () => {
        cy.registerProductWithEmptyFields()

        cy.contains('.jumbotron form', 'Nome é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Preco é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Descricao é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Quantidade é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/cadastrarprodutos`)
    })

    it('not able to register product with already choosen name', () => {
        // products registered are reset after X hours...
        // Need to perform a registration before, possibly via API
        const product_name = faker.commerce.productName()
        const price = faker.datatype.number({ min: 1000, max: 9999 })
        const description = faker.commerce.productDescription()
        const qtd = faker.datatype.number({ min: 1, max: 9999 })
        const jwt = Cypress.env('jwt')

        cy.api_postProducts(product_name, price, description, qtd, jwt).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.registerProduct(product_name, price, description, qtd)
        cy.contains('.jumbotron form', 'Já existe produto com esse nome').should('be.visible')
    })
})
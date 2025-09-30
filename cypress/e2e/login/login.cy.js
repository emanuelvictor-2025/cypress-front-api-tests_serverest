import '../../support/commands'
import faker from 'faker';

const baseUrl = Cypress.config('baseUrl')
const postUsers = require('../../api/users/request/userRegistration')

beforeEach(() => {
    cy.visit('/')

})


describe('Login', () => {
    it('Perform a Successful admin Login', () => {

        // users registered are reset after X hours...
        // Need to perform a registration before, possibly via API
        // const email = "emanuelvictor21@gmail.com"
        // const password = "Batata123"

        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
        })

        // Act
        cy.login(email, password)
        
        // Assert
        cy.url().should('be.equal', `${baseUrl}/admin/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
        cy.contains('.lead', 'Este é seu sistema para administrar seu ecommerce.').should('be.visible')
    })

    it('Perform a Successful Login', () => {

        // users registered are reset after X hours...
        // Need to perform a registration before, possibly via API
        // const email = "teste_123@gmail.com"
        // const password = "Batata123"

        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm = 'false'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
        })

        // Act
        cy.login(email, password)
        
        // Assert
        cy.url().should('be.equal', `${baseUrl}/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
    })

})

context('Erros', () => {
    it('not able to login with inexistent user', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.login(email, password)
        cy.contains('.alert', 'Email e/ou senha inválidos').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)

    })

    it('not able to login with invalid email', () => {
        const email = 'batata@batata'
        const password = faker.internet.password()

        cy.login(email, password)
        cy.contains('.alert', 'Email deve ser um email válido').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)
    })

    it('not able to login with mandatory fields empty', () => {
        cy.loginWithEmptyFields()

        cy.contains('.form', 'Email é obrigatório').should('be.visible')
        cy.contains('.form', 'Password é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)
    })
})
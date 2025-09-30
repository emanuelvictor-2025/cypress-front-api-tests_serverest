import '../../support/commands'
import faker from 'faker';

const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.visit('/cadastrarusuarios')
})

const usuario = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

describe('User Register', () => {
    it('able to register users with success', () => {
        cy.registerUser(usuario.name, usuario.email, usuario.password)

        cy.get('.alert').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
    })

    it('able to register admin user with success', () => {
        const email = faker.internet.email()
        cy.registerAdminUser(usuario.name, email, usuario.password)
        cy.get('.alert').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
    })
})

context('Erros', () => {
    it('not able to register with invalid email', () => {
        const email = 'batata@batata'
        cy.registerUser(usuario.name, email, usuario.password)

        cy.contains('.alert', 'Email deve ser um email válido').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/cadastrarusuarios`)
    })

    it('not able to register with user already registered', () => {
        cy.registerUser(usuario.name, usuario.email, usuario.password)
        cy.contains('.alert', 'Este email já está sendo usado').should('be.visible')
    })

    it('not able to register with mandatory fields empty', () => {
        cy.registerUserWithEmptyFields()

        cy.contains('.form', 'Nome é obrigatório').should('be.visible')
        cy.contains('.form', 'Email é obrigatório').should('be.visible')
        cy.contains('.form', 'Password é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/cadastrarusuarios`)
    })
})
// Register of Users
Cypress.Commands.add('registerUser', (nome, email, password) => {
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('registerAdminUser', (nome, email, password) => {
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('registerUserWithEmptyFields', () => {
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
})

// Login of Users
Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('loginWithEmptyFields', () => {
    cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="logout"]').click()
})

// Register of Products
Cypress.Commands.add('registerProduct', (product_name, price, description, qtd) => {
    cy.get('[data-testid="cadastrarProdutos"]').click()
    cy.get('[data-testid="nome"]').type(product_name)
    cy.get('[data-testid="preco"]').type(price)
    cy.get('[data-testid="descricao"]').type(description)
    cy.get('[data-testid="quantity"]').type(qtd)
    cy.get('[data-testid="imagem"]').selectFile('cypress/downloads/batata.jpg')
    cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('registerProductWithEmptyFields', () => {
    cy.get('[data-testid="cadastrarProdutos"]').click()
    cy.get('[data-testid="cadastarProdutos"]').click()
})

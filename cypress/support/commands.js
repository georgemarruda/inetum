Cypress.Commands.add('login', (credential) => {
    cy.visit('/index.php?controller=authentication&back=my-account')
    cy.get('#email').clear().type(credential.email)
    cy.get('#passwd').clear().type(credential.password)
    cy.get('#SubmitLogin > span').click()
    cy.get('.account > span').should('be.visible').and('contain', credential.user)
    cy.get('.icon-home').click()
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/index.php`)
})

Cypress.Commands.add('cadastraNovoUsuario', (usuario) => {
    cy.get('.login').should('be.visible').click()
    cy.get('#email_create').should('be.enabled').clear().type(usuario.email)
    cy.get('#SubmitCreate > span').should('be.visible').click()
    cy.get('#id_gender1').click()
    cy.get('#customer_firstname').should('be.visible').clear().type(usuario.nome)
    cy.get('#customer_lastname').should('be.visible').clear().type(usuario.ultimoNome)
    cy.get('#passwd').type(usuario.senha)
    cy.get('#days').select('2')
    cy.get('#months').select('July')
    cy.get('#years').select('1991')
    cy.get('#address1').clear().type(usuario.endereco)
    cy.get('#city').clear().type(usuario.cidade)
    cy.get('#id_state').select(usuario.estado)
    cy.get('#postcode').clear().type(usuario.zipCode)
    cy.get('#phone_mobile').clear().type(usuario.mobile)
    cy.get('#alias').clear().type(usuario.obs)
    cy.get('#submitAccount > span').click()
})

Cypress.Commands.add('adicionaProduto', (produto) => {
    cy.contains(produto).trigger('mouseouver')
    cy.contains(produto)
        .parent()
        .siblings('div.button-container')
        .children('a')
        .first()
        .click({ force: true })
    cy.contains('Product successfully added to your shopping cart')
})

Cypress.Commands.add('checkout', () => {
    cy.get('[title="View my shopping cart"]').click()
    cy.get('.cart_navigation > .button > span').click()
    cy.get('#addressesAreEquals').should('be.checked')
    cy.get('.cart_navigation > .button > span').click()

    cy.get('#cgv').click().and('be.checked')
    cy.get('.cart_navigation > .button > span').click()
})

Cypress.Commands.add('pesquisa', (produto) => {
    cy.get('#search_query_top').should('be.enabled').clear().type(produto.t_shirt)
    cy.get('#searchbox > .btn').click()
    cy.get('.product-container').within(($produto) => {
        cy.contains(produto.t_shirt)
    })
})

Cypress.Commands.add('efetuaPagamento', (tipo) => {
    if (tipo === 'cheque') {
        cy.get('.cheque').click()
    } else {
        cy.get('.bankwire').click()
    }
    cy.get('#cart_navigation > .button > span').click()
})

Cypress.Commands.add('continuarComprando', () => {
    cy.get('.continue > span').click()
})
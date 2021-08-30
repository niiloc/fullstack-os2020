describe('Blog app ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Loma Lomainen',
      username: 'testi',
      password: 'salainen'    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login').click()
    cy.contains('username')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('testi')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('logged')
  })

  describe('Login', function() {
    it('successful login', function() {
      cy.contains('login').click()
      cy.get('input:first').type('testi')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.get('#logout').click()
    })

    it('failed login', function() {
      cy.contains('login').click()
      cy.get('input:first').type('testi')
      cy.get('input:last').type('vaarin')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('testi')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('blogging 101')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.contains('create').click()
      cy.contains('blogging 101')
      cy.contains('view')
    })

  })
  describe('manipulating posts', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('testi')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains('new note').click()
      cy.get('#title').type('blogging 101')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.contains('create').click()
      cy.get('#viewbtn').click()
    })
    it('blog can be liked', function() {
      cy.contains('like')
    })

    it('blog can be removed', function() {
      cy.contains('remove')
    })
  })
  describe('check the sorting', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('testi')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains('new note').click()
      cy.get('#title').type('blogging 101')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.contains('create').click()
      cy.get('#viewbtn').click()
      cy.get('#likebtn:last')
        .click()
        .then(() => {
          cy.contains('1')
        })
      cy.contains('new note').click()
      cy.get('#title').type('Im better than u')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#createblog').click().wait(1000)
      cy.get(':nth-child(4) > :nth-child(1) > .Visible > :nth-child(1) > #viewbtn')
        .click()
        .then(() => {
          cy.get('#likebtn')
            .last()
            .click()
            .then(($button) => {
              cy.contains('1')
              $button.click()
              cy.contains('2')
            })
        })
      cy.get(':nth-child(4) > :nth-child(1) > .notVisible > :nth-child(4) > #likebtn').click().wait(500)
      cy.get(':nth-child(4) > :nth-child(1) > .notVisible > :nth-child(4) > #likebtn').click().wait(500)
      cy.get(':nth-child(4) > :nth-child(1) > .notVisible > :nth-child(4) > #likebtn').click().wait(500)

    })

    it('blog sorted properly', function() {
      cy.get(':nth-child(3) > :nth-child(1) > .notVisible > :nth-child(4)').should('have.text', '3  like ')
      cy.get(':nth-child(4) > :nth-child(1) > .notVisible > :nth-child(4)').should('have.text', '2  like ')

    })
  })
})
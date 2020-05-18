// ======================================================================================================================
describe('Login', () => {
	beforeEach(() => {
    cy.visit('/')

  	});

	xit('Clear cookies', function () {
		cy.clearCookies()
		// cy.clearLocalStorage()
		//todo clearCookies sometimes does not work, Fluke or issue????? TUNE IN TOMORROW NIGHT TO SEE WHY

	});

	it('Greets with Admin Login', function () {
		cy.contains('h2', 'Administrator Login')

	});


	it('Requires Username/Password', function () {
		cy.get('#login-form').contains('Login').click()
		cy.get('.validation-message')
			.should('contain', 'Invalid Username/Password')
	});

	it('Requires password', function () {
		cy.get('#j_username').type('admin{enter}')
		cy.get('.validation-message')
			.should('contain', 'Invalid Username/Password')
	});

	it('requires valid username and password', function () {
		cy.get('#j_username').type('admin')
		cy.get('#j_password').type('invalid{enter}')
		cy.get('.validation-message')
			.should('contain', 'Invalid Username/Password')
	});

	it('navigates to admin homepage on successful login and Logout', function () {
		cy.get('#j_username').type('admin')
		cy.get('#j_password').type('admin{enter}')
		cy.location().should((loc) => {
			expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
			expect(loc.search).to.eq('')
		})
		cy.wait(1)
		
		cy.get('.user-name > .fa').click()
		cy.get('#log-out').click()

		
		cy.location().should((loc) => {
			expect(loc.pathname).to.eq('/libs/kestros/login.html')
			expect(loc.search).to.eq('?/libs/kestros/site-admin.html')
		})
	});

});


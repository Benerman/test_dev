// ======================================================================================================================
describe('Tests for around Logging and being logged in', function() {
	beforeEach(() => {
    	// cy.login()
    	// cy.visit('/')

  	});


	describe('Verify Cookies and logout redirect', function() {

		it('Verify Cookies do not exist', function () {

			cy.getCookies()
				.should('have.length', 0)
		});

		it('Verify Cookies exist after login', function () {
			cy.login()
			cy.visit('/')
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
				expect(loc.search).to.eq('')
				})
			cy.getCookies()
				.should('have.length', 1).then((cookies) => {
					expect(cookies[0]).to.have.property('name', 'sling.formauth')
					//expect(cookies[0]).to.have.property('value', '123ABC')
					expect(cookies[0]).to.have.property('domain')
					expect(cookies[0]).to.have.property('httpOnly')
					expect(cookies[0]).to.have.property('path')
				 	expect(cookies[0]).to.have.property('secure')
			 		})
		});

		it('Check logout redirect', function () {

			cy.login()
			cy.visit('/')
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
				expect(loc.search).to.eq('')
				})
			cy.get('.user-name > .fa').click()
			cy.get('#log-out').click()
	    	cy.clearCookie("sling.formauth")

	    	cy.logout()

	    	cy.visit('/libs/kestros/site-admin/user-management.html')
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/login.html')
				expect(loc.search).to.eq('?/libs/kestros/site-admin/user-management.html')
				})

			cy.getCookie('sling.formauth')
				.should('eq', 'null')

		});

		it('Check redirect from valid internal link to login page when logged out', function () {
			cy.visit('/libs/kestros/site-admin/user-management.html')

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/login.html')
				expect(loc.search).to.eq('?/libs/kestros/site-admin/user-management.html')
				})
		});

	});







	// ======================================================================================================================
	describe('Login when initial request is for child page', function () {

		xit('Clear cookies', function () {
			cy.clearCookies()
			// cy.clearLocalStorage()
			//todo clearCookies sometimes does not work, Fluke or issue????? TUNE IN TOMORROW NIGHT TO SEE WHY

		});

		it('Call for child page while logged out', function () {
			
			cy.visit('/libs/kestros/site-admin/user-management.html')
				
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/login.html')
				expect(loc.search).to.eq('?/libs/kestros/site-admin/user-management.html')
				})
		});

		it('Login and visiting user-management', function () {

			cy.login()

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin/user-management.html')
				expect(loc.search).to.eq('')
				})
		});

		it('From Homepage Goto User Management', function () {

			cy.visit('/')

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
				expect(loc.search).to.eq('')
				})

			cy.get('[data-resource-path="/libs/kestros/site-admin/user-management"] > .sidebar-item-link')
				.click()

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin/user-management.html')
				expect(loc.search).to.eq('')
				})

		});
	});


// ======================================================================================================================
	describe('Cookies Cleared and Attempt Login', function () {

		it('Cookies should be cleared - Clear cookies', function () {
			cy.clearCookies()
			// cy.clearLocalStorage()
			//todo clearCookies sometimes does not work, Fluke or issue????? TUNE IN TOMORROW NIGHT TO SEE WHY

		});

		it('Verify Cookies exist', function () {

			cy.getCookie('sling.formauth').should('exist')
				.should('eq', 'null')

		});

		it('Try to visit User management but should be logged out, returning to Login', function () {

			cy.visit('/libs/kestros/site-admin/user-management.html')

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/login.html')
				expect(loc.search).to.eq('?/libs/kestros/site-admin/user-management.html')
				})

		});

		it('Login', function () {

			cy.login()

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
				expect(loc.search).to.eq('')
				})

		});

	});


	// ======================================================================================================================
	describe('Session Time out while logged in', function () {

		it('Goto login page', function () {

			cy.login()
			cy.visit('/')
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin.html')
				expect(loc.search).to.eq('')
				})

		});


		it('Clear Cookies', function () {

			cy.clearCookies()

		});

		it('After cookies cleared navigate to child page', function () {
			

			cy.visit('/libs/kestros/site-admin/assets.html')
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/login.html')
				expect(loc.search).to.eq('?/libs/kestros/site-admin/assets.html')
				})

			
			// cy.url()
			// 	.should('include', '/libs/kestros/login.html?/libs/kestros/site-admin.html')


		});
		 

	});
});
// ======================================================================================================================
describe('Sidebar Testing', function() {
// Sidebar Tests
// Icons visible when selected




beforeEach(function () {

	cy.login()
	cy.visit('/')

});


// ======================================================================================================================
describe('Login to Backend and Logout', function () {
	

	it('Redirect to login page from root when not logged in', function () {

		cy.logout()
		cy.wait(5000)
		cy.clearCookie("sling.formauth")


		cy.visit('/')

		cy.location().should((loc) => {
			expect(loc.pathname).to.eq('/libs/kestros/login.html')
			expect(loc.search).to.eq('?/libs/kestros/site-admin.html')
		})

	});

	it('Verify Cookies exist', function () {

		// cy.getCookie('sling.formauth')
		// 	.should('not.exist')
		//assert.notExists('sling.formauth', 'Cookie does not exist')

		cy.getCookies()
			.should('have.length', 1).then((cookies) => {
			expect(cookies[0]).to.have.property('name', 'sling.formauth')
			//expect(cookies[0]).to.have.property('value', '123ABC')
			expect(cookies[0]).to.have.property('domain')
			expect(cookies[0]).to.have.property('httpOnly')
			expect(cookies[0]).to.have.property('path')
		 	expect(cookies[0]).to.have.property('secure')
		 
		 });
	});

});

describe('Logo Testing', function() {


	it('Click Logo', function () {

		cy.get('h1')
			.click()

		cy.get('.component-favorite-pages-panel > .panel')	
			.contains('Favorite Pages')
		
		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.component-recent-activity-panel > .panel')
			.contains('Recent Activity')

		cy.get('h1 > a')
			.click()

		cy.get('.component-favorite-pages-panel > .panel')	
			.contains('Favorite Pages')
		
		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		// get 1st favorite page??
		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

	});


	it('Click Dashboard + ^^^', function () {

		cy.get('nav > :nth-child(2) > .sidebar-item')
			.click()

		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('h1')
			.click()

		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('nav > :nth-child(2) > .sidebar-item')
			.click()

		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('h1 > a')
			.click()

		cy.get('.component-favorite-pages-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

		cy.get('.sidebar-context-link > :nth-child(1)')
			.should('exist')

		cy.get('.component-recent-activity-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > thead > tr > :nth-child(1)')
			.should('contain', 'Title')
			.next().should('contain', 'Created')
			.next().should('contain', 'Last Modified')
			.next().should('contain', 'Last Modified By')
			.next().should('contain', 'Validation')

	});	

	it('Click Site Management + ^^^', function () {

		cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"]')
			.click()
			
		cy.get('.active > .validation-badges > .errors')


		cy.get('nav > :nth-child(2) > .sidebar-item')
			.click()

		cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"]')
			.click()
		
		cy.get('h1')
			.click()

		cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"]')
			.click()

		cy.get('h1 > a')
			.click()

		cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"]')
			.click()

	});

});

});
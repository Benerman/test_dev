// USER FUNCTIONS ====================================================================


// BUILT IN FUNCTIONS ================================================================
// beforeEach(function() {
// 	cy.clearCookies()
// });

// afterEach(function() {
// 	cy.get('#log-out')
// });


beforeEach(function () {
    // before each test, we can automatically preserve the
    // 'session_id' and 'remember_token' cookies. this means they
    // will not be cleared before the NEXT test starts.
    //
    // the name of your cookies will likely be different
    // this is just a simple example
    Cypress.Cookies.preserveOnce('sling.formauth', 'remember_token')
  });


// GLOBAL VARIABLES ==================================================================
let baseUrl = 'http://192.168.2.47:8080'


describe('Login to site-admin', function() {

	it('Clear cookies', function () {
		cy.clearCookies()
		// cy.clearLocalStorage()
		//todo clearCookies sometimes does not work, Fluke or issue????? TUNE IN TOMORROW NIGHT TO SEE WHY

	});

	it('Goto Login Page', function() {

		cy.visit(baseUrl)
    
		cy.url()
			.should('eq', baseUrl + '/libs/kestros/login.html?/libs/kestros/site-admin.html')

	});
		
	it('Enter Credentials', function() {

		cy.get('#j_username')
			.type('admin')
			.should('have.value', 'admin')

		cy.get('#j_password')
			.type('admin')
			.should('have.value', 'admin')

		cy.get('button')
			.click()
		//todo Get a class on button

		cy.getCookie('sling.formauth')
			.should('exist')

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

	it('Go to UI Management page', function () {

		cy.get('[data-resource-path="/libs/kestros/site-admin/ui-management"]')
			.click()

		cy.url()
			.should('eq', baseUrl + '/libs/kestros/site-admin/ui-management.html')

	});

});

describe('First UI Frameworks', function() {

	it('Go to UI Management page', function () {

		cy.get('[data-title="Kestros Site Admin Framework"] > :nth-child(1)')
			.click()

	});

	it('Check Title for "Kestros Site Admin Framework"', function () {
		
		cy.get('.title')
			.should('contain', 'Kestros Site Admin Framework')

	});


	// it('Check Title for "Kestros Site Admin Framework"', function () {

	// 	cy.get('.\#')
	// 		.should('contains', 'View Full Documentation')
	// 		.click()

	// });
});
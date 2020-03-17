

let baseUrl = 'http://192.168.2.47:8080'
let userId		= 'cypress'
let password	= 'password'
let firstName	= 'Ben'
let lastName	= 'Larson'
let email		= 'test@test.com'
let fullName	= firstName+' '+lastName

beforeEach(function () {
    // before each test, we can automatically preserve the
    // 'session_id' and 'remember_token' cookies. this means they
    // will not be cleared before the NEXT test starts.
    //
    // the name of your cookies will likely be different
    // this is just a simple example
    Cypress.Cookies.preserveOnce('sling.formauth', 'remember_token')
  });

describe('Login to site-admin', function() {

	it('Clear cookies', function () {
		cy.clearCookies()
		// cy.clearLocalStorage()
		//todo clearCookies sometimes does not work, Fluke or issue????? TUNE IN TOMORROW NIGHT TO SEE WHY

	});

	it('Goto Login Page', function() {

	    cy.visit("/")
	    // cy.location()

		cy.location().should((loc) => {
		expect(loc.pathname).to.eq('/libs/kestros/login.html')
		expect(loc.search).to.eq('?/libs/kestros/site-admin.html')
		expect(loc.port).to.eq('8080')
		})

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

	});

	it('Go to user-management page', function () {

		cy.get('[data-resource-path="/libs/kestros/site-admin/user-management.html"]')
			.click()

		cy.location().should((loc) => {
		expect(loc.pathname).to.eq('/libs/kestros/site-admin/user-management.html')
		expect(loc.search).to.eq('')
		expect(loc.port).to.eq('8080')
		})

	});

});

describe('Delete user: cypress', function() {


	beforeEach()

	it('Check Ben Larson User', function() {
		//cy.get('[data-title="Ben Larson"] > .unclickable > input')
		//cy.contains('Ben Larson').contains(".unclickable").check()
		// cy.get('.dataTable-top')
			// .contains('Ben Larson')
			cy.contains(fullName)

	});

	it('Click User Icon and Delete', function() {
	
		cy.get('[data-title="'+fullName+'"] > .unclickable > input')
			.check()
		
		cy.get(':nth-child(2) > .action > .fa')
			.click()
				
	});
	
	
	xit('Check for Ben Larson User in confirmation Pop up', function() {
		
		cy.get('[data-title="'+fullName+'"] > :nth-child(2)')
			.click()

	});
	
	xit('Check for Ben Larson User in confirmation Pop up', function() {
	
		// cy.contains(fullName)
			// .should('eq', '.dialog > ul > li')

		cy.get('#modal > section > div.content-area > div > form > ul > li')
			.should('contain', fullName)



	});
	
	xit('Click/Confirm Delete', function() {
		cy.get('button.submit')
			.click()

	});

});



describe('Recreate user: cypress', function() {

	xit('Create Test User: cypress', function() {

		cy.get('[data-resource-path="/libs/kestros/site-admin/user-management"]')
			.click()

		cy.get('#actionbar > .content-area > .component-actionbar > .component-modal-action > .action > .fa')
			.click()

		// get fields
		cy.get('#id')
			.type(userId)
			.should('have.value', userId)

		cy.get('#password')
			.type(password)
			.should('have.value', password)

		cy.get('#firstName')
			.type(firstName)
			.should('have.value', firstName)

		cy.get('#lastName')
			.type(lastName)
			.should('have.value', lastName)

		cy.get('#emailAddress')
			.type(email)
			.should('have.value', email)

		//Create
		cy.get('.submit')
			.click()
		//todo Get a class on button
		
		// cy.contains(userId)
			// .should('eq', '[data-top="259.59375"]')

		// Failed test
		// cy.get('[data-title="Ben Larson"] > :nth-child(2)')
		// 	.contains(fullName)
		// 	.next().contains(userId)
		// 	.next().contains(email)

	});


	xit('Verify Information of newly created User ID', function() {
		cy.contains(fullName)
			.should('contain', fullName)
			.next().contains(userId)
			.next().contains(email)

		// cy.contains('cypress')
		// 	.should('eq', '#site-admin-content > div.content-area > div > div > div.content > div.content-area > table > tbody > tr:nth-child(3) > td:nth-child(3)')

	});
});
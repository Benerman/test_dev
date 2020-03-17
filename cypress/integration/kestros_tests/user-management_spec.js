//=============================================================================
after(function () {
	

	cy.get('[data-title="Ben Larson"] > .unclickable > input').check()
	cy.get('.delete-user').click()
	cy.get('.submit').click()
	cy.get('.refresh > .fas').click()
	cy.get('[data-title="Daniel Moulton"] > .unclickable > input').check()
	cy.get('.delete-user').click()
	cy.get('.submit').click()
	cy.get('.refresh > .fas').click()
	cy.get('[data-title="Test User"] > .unclickable > input').check()
	cy.get('.delete-user').click()
	cy.get('.submit').click()
	cy.get('.refresh > .fas').click()

});

// before(function () {
	
// 	cy.login()
// 	cy.visit('/libs/kestros/site-admin/user-management.html')
// 	cy.get('[data-title="Ben Larson"] > .unclickable > input').check()
// 	cy.get('.delete-user').click()
// 	cy.get('.submit').click()
// 	cy.get('.refresh > .fas').click()
// 	cy.get('[data-title="Daniel Moulton"] > .unclickable > input').check()
// 	cy.get('.delete-user').click()
// 	cy.get('.submit').click()
// 	cy.get('.refresh > .fas').click()
// 	cy.get('[data-title="Test User"] > .unclickable > input').check()
// 	cy.get('.delete-user').click()
// 	cy.get('.submit').click()
// 	cy.get('.refresh > .fas').click()

// });

describe('User Management Tests', function() {


beforeEach(function () {
	cy.login()
	cy.visit('/libs/kestros/site-admin/user-management.html')
	cy.get('.refresh > .fas').click() //TODO Take out panel refreshes

    // Cypress.Cookies.preserveOnce('sling.formauth', 'remember_token')
  });



	it('Go to user-management page', function () {

		cy.get('[data-resource-path="/libs/kestros/site-admin/user-management.html"]')
			.click()

		cy.location().should((loc) => {
			expect(loc.pathname).to.eq('/libs/kestros/site-admin/user-management.html')
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




	//add user verify the details now exist on page
	describe('Create user: benerman', function() {

		let userId		= 'benerman'
		let password	= 'password'
		let firstName	= 'Ben'
		let lastName	= 'Larson'
		let email		= 'test@test.com'
		let fullName	= firstName+' '+lastName


		it('Create Test User: ' + fullName, function() {

			// cy.get('[data-resource-path="/libs/kestros/site-admin/user-management"]')
			// 	.click()

			cy.get('#actionbar > .content-area > .component-actionbar > ul > .action')
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
			//TODO Get a class on button
			
			// cy.contains(userId)
				// .should('eq', '[data-top="259.59375"]')

			// Failed test
			// cy.get('[data-title="Ben Larson"] > :nth-child(2)')
			// 	.contains(fullName)
			// 	.next().contains(userId)
			// 	.next().contains(email)

		});


		it('Verify Information of newly created User ID', function() {
			cy.contains(fullName)
				.should('contain', fullName)
				.next().contains(userId)
				.next().contains(email)
				.next().should('not.contain', '.errors')
		});

		it('Verify info via Clicked Pop up', function () {

			cy.get('[data-title="' + fullName + '"] > :nth-child(3)')
				.click()

			cy.get('.title').contains(fullName)

			cy.get('#modal').contains(userId)
			cy.get('#modal').find('a').contains(email)
			cy.get('#modal').contains(firstName)
			cy.get('#modal').contains(lastName)

			cy.get('.close > .fas')



		});

		// Delete user
		// Deleting Multiple users does not work
		// Once you delete a user, you have to refresh Panel to edit or delete again

		it('Verify '+fullName+' User exists', function() {
			//cy.get('[data-title="Ben Larson"] > .unclickable > input')
			//cy.contains('Ben Larson').contains(".unclickable").check()
			cy.get('.refresh > .fas').click()

			cy.get('.panel')
				.contains(fullName)
				// .click()
		});

		it('Click Delete User Icon', function() {
		
			cy.get('[data-title="'+fullName+'"] > .unclickable > input')
				.check()
			
			cy.get('.delete-user')
				.click()
					
		});
		
		it('Check for ' + fullName + ' User in confirmation Pop up and Delete', function() {
		
			// cy.contains(fullName)
				// .should('eq', '.dialog > ul > li')

			cy.get('.dialog > ul > li')
				.should('contain', fullName)

			cy.get('button.submit')
				.should('be.visible')
				.click()

		});

		it('Try to find Name on page and Fail(expected to be false)', function() {

			cy.contains(fullName).and('not.be.visible')
				// expect(false).to.be.false

				// This test should Fail, but does not due to needing refresh of panel.
		});

		it('Refresh Panel and Try to find Name on page and Fail(expected to be false)', function() {

			cy.get('.refresh > .fas').click()

			cy.contains(fullName).should('be.hidden')
				// expect(false).to.be.false
		});

		it('Verify Information of recently deleted User ID', function() {
			cy.contains(fullName)
				.should('not.exist')


		});


		it("Refresh page and search for deleted user's Information", function() {
			
			cy.reload()

		});


		it('Verify ' + fullName + ' was deleted', function() {
			cy.contains(fullName)
				.should('not.exist')
				// .should('contain', fullName)
				// .next().contains(userId)
				// .next().contains(email)
		});

});



	//Create another existing User and verify it fails
	// User 1: danny moulton
	describe('Create user: dmoulton', function() {

		let userId		= 'dmoulton'
		let password	= 'password'
		let firstName	= 'Daniel'
		let lastName	= 'Moulton'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Create Test User: '+fullName, function() {

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


	// User 2: danny moulton
	describe('Create user: dmoulton again', function() {

		let userId		= 'dmoulton'
		let password	= 'password'
		let firstName	= 'Daniel'
		let lastName	= 'Moulton'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Create Test User: '+fullName+' again, will fail', function() {

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

			cy.get('.validation-message')
				.should('contain', 'undefined')

			// Close the dialog box
			cy.get('.button-group > .close')
				.click()


		});


	});


	describe('Delete user: dmoulton', function() {
	// Deleting Multiple users does not work
	// Once you delete a user, you have to refresh Panel to edit or delete again

		let userId		= 'dmoulton'
		let password	= 'password'
		let firstName	= 'Daniel'
		let lastName	= 'Moulton'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Check '+fullName+' User', function() {
			//cy.get('[data-title="Ben Larson"] > .unclickable > input')
			//cy.contains('Ben Larson').contains(".unclickable").check()
			cy.get('.panel')
				.contains(fullName)
				// .click()
		});

		xit('Click Delete User Icon', function() {
		
			cy.get('[data-title="'+fullName+'"] > .unclickable > input')
				.check()
			
			cy.get(':nth-child(2) > .action > .fa')
				.click()
					
		});
		
		xit('Check for '+fullName+' User in confirmation Pop up', function() {
		
			cy.get('#modal > section > div.content-area > div > form > ul > li')
				.should('contain', fullName)


		});
		
		xit('Click/Confirm Delete', function() {

			cy.wait(200)

			cy.get('button.submit')
				.should('be.visible')
				.click()

		});

		xit('Try to find Name on page and Fail(expected to be false)', function() {

			cy.contains(fullName)
				.should('not.exist')

		});

		xit('Refresh Panel and Try to find Name on page and Fail(expected to be false)', function() {

			cy.get('.refresh > .fas')

		});

		xit('Verify Information of newly created User ID', function() {
			cy.contains(fullName)
				.should('not.exist')


		});


	});


	//try adding user but hit "X" to cancel before end, verify the details do not exist on page
	describe('Start to create user: test1 but click X and cancel it', function() {

		let userId		= 'test1'
		let password	= 'password'
		let firstName	= 'Test'
		let lastName	= 'User'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Create Test User: '+fullName+', and cancel before submitting', function() {

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

			//Close
			cy.get('.close > .fas')
				.click()

		});


		xit('Try to find '+fullName+' on page', function() {

			cy.contains(fullName)
				.should('not.exist')

		});


	});



	//try adding user but hit "Close" to cancel before end, verify the details do not exist on page
	describe('Start to create user: test1, then hit close button', function() {

		let userId		= 'test1'
		let password	= 'password'
		let firstName	= 'Test'
		let lastName	= 'User'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Create Test User: '+fullName+', and cancel before submitting', function() {

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

			//Close
			cy.get('.button-group > .close')
				.click()

		});


		xit('Try to find '+fullName+' on page', function() {

			cy.contains(fullName)
				.should('not.exist')

		});


	});



	// edit first user
	describe('Edit a user in list', function() {

		let userId		= 'test1'
		let password	= 'password'
		let firstName	= 'Test'
		let lastName	= 'User'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Create Test User: '+fullName+', and cancel before submitting', function() {

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

		});
		
		xit('Verify Information of newly created User ID', function() {
			
			cy.contains(fullName)
				.should('contain', fullName)
				.next().contains(userId)
				.next().contains(email)

		});

		xit('Click Edit User Icon', function() {
		
			cy.get('[data-title="'+fullName+'"] > .unclickable > input')
				.check()
			
			cy.get('.actionbar > .content-area > .component-actionbar > :nth-child(1) > .action > .fa')
				.click()
					
		});

		xit('Verify Information of user currently being edited', function() {
			
			cy.get('#firstName')
				.should('contain', firstName)

			cy.get('#lastName')
				.should('contain', lastName)

			cy.get('#emailAddress')
				.should('contain', email)

		});

		xit('Change First Name to "changed"', function() {
			
			let firstName = 'changed'

			cy.get('#firstName')
				.type(firstName)
				.should('contain', firstName)

			cy.get('#lastName')
				.should('contain', lastName)

			cy.get('#emailAddress')
				.should('contain', email)

			cy.get('.submit')
				.click()

		});

		xit('Verify Information of newly edited User ID', function() {
			
			let firstName = 'changed'

			cy.contains(fullName)
				.should('contain', fullName)
				.next().contains(userId)
				.next().contains(email)

		});

	});

/*
// add user without complete details
describe('add user with incomplete details', function() {


});

// delete all users
describe('Delete all users', function() {


});

// delete user with none selected
describe('Click delete user button without selection', function() {


});

// verify
describe('Delete user: cypress', function() {


});

// hit refresh button
describe('Refresh User button', function() {
	//Get list of users

	referesh

	//See if list has changed

	//Open new window and delete a user

	//in first window, hit refresh and see if there is change

});

// open up guide(?)
describe('Open Guide for User', function() {


});

// while creating user navigate away from page
describe('With Creating user pop up open, navigate away from page', function() {
	//verify no user was created

});

// while editing user navigate away
describe('With Editing user pop up open, navigate away from page', function() {


});

// while deleting navigate away
describe('With Delete Pop up open, navigate away from page', function() {


});

// click on name
describe('Click on name of first user', function() {


});

// click on id 
describe('Click on Id of first user', function() {


});

// click on email
describe('Click on email of first user', function() {


});

// click on validation
describe('Click on Validation of first user', function() {


});


*/


	// Delete Test user
	describe('Delete user: test1', function() {
	// Deleting Multiple users does not work
	// Once you delete a user, you have to refresh Panel to edit or delete again

		let userId		= 'test1'
		let password	= 'password'
		let firstName	= 'Test'
		let lastName	= 'User'
		let email		= 'test123@test.com'
		let fullName	= firstName+' '+lastName


		xit('Check '+fullName+' User', function() {
			//cy.get('[data-title="Ben Larson"] > .unclickable > input')
			//cy.contains('Ben Larson').contains(".unclickable").check()
			cy.get('.panel')
				.contains(fullName)
				// .click()
		});

		xit('Click Delete User Icon', function() {
		
			cy.get('[data-title="'+fullName+'"] > .unclickable > input')
				.check()
			
			cy.get(':nth-child(2) > .action > .fa')
				.click()
					
		});
		
		xit('Check for '+fullName+' User in confirmation Pop up', function() {
		
			cy.get('#modal > section > div.content-area > div > form > ul > li')
				.should('contain', fullName)


		});
		
		xit('Click/Confirm Delete', function() {

			cy.wait(200)

			cy.get('button.submit')
				.should('be.visible')
				.click()

		});

		xit('Try to find Name on page and Fail(expected to be false)', function() {

			cy.contains(fullName)
				.should('not.exist')

		});

		xit('Refresh Panel and Try to find Name on page and Fail(expected to be false)', function() {

			cy.get('.refresh > .fas')
				.click()

		});

		xit('Verify Information of newly created User ID', function() {
			cy.contains(fullName)
				.should('not.exist')


		});


	});
});
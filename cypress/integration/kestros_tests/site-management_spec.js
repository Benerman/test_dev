// GLOBAL VARIABLES ==================================================================


 // let baseUrl = "http://192.168.2.47:8080"
 // let baseUrl = "http://localhost:8080"
 // let baseUrl = "http://127.0.0.1:8080"




// USER FUNCTIONS ====================================================================

// BUILT IN FUNCTIONS ================================================================


// afterEach(function() {
// 	cy.get('#log-out')
// });


describe('Site Management Tests', function() {
	// let baseUrl

	// before(function() {
	// 		cy.fixture('config').as("config");
	// 		baseUrl = this.config.baseUrl
	// });



	describe('Check Proper Link and Cookies', function() {

		it('Go to Site Management page', function () {

			cy.login()
			cy.visit('/libs/kestros/site-admin/sites.html')

			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/libs/kestros/site-admin/sites.html')
				expect(loc.search).to.eq('')
				expect(loc.port).to.eq('8080')

				})
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
    				})

		});


	});

	describe('Go to Kestros Sample Site', function () {

		it('Click Kestros Sample Site', function () {

			cy.login()
			cy.visit('/libs/kestros/site-admin/sites.html')

			cy.get('.component-site-list-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > tbody > [data-context-path="/content/sites/sample-site"] > :nth-child(2)')
				.click()

		});
	});

	describe('Left Sidebar Tests', function () {

		beforeEach(function () {
			cy.login()
			cy.visit('/libs/kestros/site-admin/sites/management.html/content/sites/sample-site')

		});


		describe('Click Left sidebar options', function () {

			it('Check for .errors and .validations', function () {

				cy.visit('/')

				cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"]').click()
				
				cy.get('.active > .validation-badges > .errors').contains('2')
				cy.get('.active > .validation-badges > .warnings').contains('5')

				cy.get('nav > :nth-child(2) > .sidebar-item').click()
//TODO Get Validations and Errors checking resolved
				cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"] > .validation-badges > .errors').should('exist')
				cy.get('[data-resource-path="/libs/kestros/site-admin/sites.html"] > .validation-badges > .warnings').should('exist')
			});

		 	it('Collapse menu on left, and click on "Kestros Sample Site"', function () {

				cy.get('.vtree-has-children > :nth-child(1)')
				.click()

				cy.get('.vtree-has-children > :nth-child(2)')
				.click()

				cy.get('.vtree-has-children > :nth-child(1)')
				.click()

			});

			it('Click on all subpages', function () {

				cy.get(
				    '[data-vtree-id="/content/sites/sample-site/about"] > .vtree-leaf-label')
				.click()

				cy.get(
				    '[data-vtree-id="/content/sites/sample-site/contact"] > .vtree-leaf-label')
				.click()

				cy.get(
				    '[data-vtree-id="/content/sites/sample-site/sample"] > .vtree-leaf-label')
				.click()

			});

			it('Back to Main "Kestros Sample Site', function () {

				cy.get('.vtree-has-children > :nth-child(2)')
					.click()

			});

		});

		describe('Go to home page, and back.', function () {


			it('Click <== Site Mangement', function () {

				cy.get('.sidebar-item')
					.click()

				cy.get(	'.component-site-list-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > tbody > [data-context-path="/content/sites/sample-site"] > :nth-child(2)')
		    		.click()

				cy.get('h1')
					.scrollIntoView()
					.click()

				cy.get(	'.component-site-list-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > tbody > [data-context-path="/content/sites/sample-site"] > :nth-child(2)')
		    		.click()

				cy.get('.sidebar-context-link > :nth-child(1)')
					.click()

				cy.get(	'.component-site-list-panel > .panel > .content > .content-area > .dataTable-wrapper > .dataTable-container > .data-table > tbody > [data-context-path="/content/sites/sample-site"] > :nth-child(2)')
					.click()
	  		});

		});
	});


		describe('Check Add Content Section test', function() {


			it('Find Add Content', function () {

				// cy.contains('Add Content')
				// 	.click()

				// cy.get('selected-page').find('content-area-new-component')

				cy.get(".selected-page").then(function($iframe){
					// query into the iframe
					var b = $iframe.contents().find("body")
						// .contains('body')

				})


			});

			it('Add Content Function', function () {

				cy.get('.selected-page').then(($el) => {
		  			Cypress.dom.isVisible($el)
				})

			});


		});


	describe('Add Content Tests', function () {

		describe('Check Add Content Section test', function () {
		 	let page;
			let allContentAreas;
			let contentArea;

			function setPageData() {
				console.log('set page data')
				
				cy.get(".selected-page").then(element => {
				page = element[0].contentDocument.querySelector("html")
				allContentAreas = page.querySelectorAll(
					'.content-area-new-component')
				contentArea = page.querySelector('.content-area-new-component')
		    	});
			}

			beforeEach(function () {
				page = null;
				contentArea = null;
				cy.wait(500)
				setPageData()

			});

			afterEach(function () {
				cy.get('#modal').then(modal => {
					if (modal[0].hasAttribute("style") && modal[0].getAttribute(
						"style").includes("display: block")) {
							cy.get('#modal .button-group > .close').click();
						}
		    		});
				cy.get("#modal").should('not.be.visible');
			});

			it('Find Add Content', function () {
				assert.equal(allContentAreas.length, 1, "Has One Content Area")

				});

			it('Open and close Modal using close button', function () {
				assert.equal(allContentAreas.length, 1, "Has One Content Area")
				contentArea.click()
				cy.wait(500)
				cy.get('#modal .button-group > .close').click()
				cy.get("#modal").should('not.be.visible')
			});

			it('Open and close Modal using `X` button', function () {
				assert.equal(allContentAreas.length, 1, "Has One Content Area")
				contentArea.click()
				cy.wait(500)
				cy.get('#modal .close > .fas').click()
				cy.get("#modal").should('not.be.visible')

			});

			it('Open and close Modal using `ESCAPE` key', function () {
				assert.equal(allContentAreas.length, 1, "Has One Content Area")
				contentArea.click()
				cy.wait(500)
				cy.get("body").type('{esc}')
				cy.get("#modal").should('be.visible')

			});

			it('Open and close Modal clicking off of modal', function () {
				assert.equal(allContentAreas.length, 1, "Has One Content Area")
				contentArea.click()
				cy.get('body').click(10, 10);
				cy.get("#modal").should('be.visible')
			});

			xit('submit empty form', function () {

			});

			it('add button to page', function () {
				cy.get("#modal").should('not.be.visible')

				cy.get('.selected-page').then(function () {
					contentArea.click()
	 			})

				cy.wait(500)

				cy.get("#modal").should('be.visible')
				cy.get("#modal").find('form.dialog.create')

				// Add button;
				cy.get('li')
					.contains('Button')
					// .scrollIntoView()
					.click()

				cy.get('#modal .submit').click()
				cy.wait(500)
				cy.get("#modal").should('not.be.visible')
				cy.wait(500)

				cy.get(".selected-page").then(element => {
				let page = element[0].contentDocument.querySelector("html")
				let allContentAreas = page.querySelectorAll(
					'.content-area-new-component')
					assert.equal(page.querySelectorAll('.component-button').length, 1,
						"Has 1 Button Component")
					assert.equal(allContentAreas.length, 1, "Has One Content Area")
				});

			});
		});
		
		describe('edit button', function () {
			
			xit('change text', function () {

	    	});

		});

    	describe('variations', function () {
			
			xit('add variation', function () {

			});

			xit('retain variation value', function () {

			});

			xit('change variation', function () {

			});

		});

		describe('move button component', function () {

		});


		describe('Delete button component', function () {

			it('delete button from page', function () {
				cy.get(".selected-page").then(element => {
				let page = element[0].contentDocument.querySelector("html")
				let allContentAreas = page.querySelectorAll(
					'.content-area-new-component')

				assert.equal(page.querySelectorAll('.component-button').length, 1,
					"Has 1 Button Component")
				assert.equal(allContentAreas.length, 1, "Has One Content Area")

				page.querySelector('li.delete-button').click()

				})

				cy.get('#modal .submit').click()
				cy.wait(500)
				cy.get(".selected-page").then(element => {
				let page = element[0].contentDocument.querySelector("html")
				let allContentAreas = page.querySelectorAll(
					'.content-area-new-component')

				assert.equal(page.querySelectorAll('.component-button').length, 0,
					"Has no Button Component")
				assert.equal(allContentAreas.length, 1, "Has One Content Area")
			    	})
			});
		});
	});
});
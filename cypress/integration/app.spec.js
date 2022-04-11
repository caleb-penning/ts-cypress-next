describe("Home Page Navigation", () => {
    // cy is not imported, but rather a global object that Cypress places on the window object
    it("should be able to navigate to the about page", () => {
        // cypress.json has baseUrl set to "http://localhost:3000"
        // so we can navigate "localhost:3000/" by just putting "/"

        // arrange
        cy.visit("/")

        // act
        cy.get(`a[href*="about"]`).click()

        // assert
        cy.url().should("include", "/about")

        cy.get("h1").contains("About Us")
    })
})

describe("About Page Navigation", () => {
    it("Should be able to navigate back to home page", () => {
        // arrange
        cy.visit("/about")

        // act
        cy.get(`a[href*="/"]`).click()

        // assert
        cy.url().should("include", "/")

        cy.get(`a[href*="https://nextjs.org"]`).contains("Next.js!")
    })
})

describe("Form submission", () => {
    it("Should have an input that accepts text for feedback, as well as an input for the users email", () => {
        // arrange
        cy.visit("/feedback")

        // act
        cy.get(`input[type*="email"]`).as("email").type("testing@test.com")
        cy.get(`input[type*="text"]`).as("feedback").type("Hello")

        // assert
        cy.get("@email").should("have.value", "testing@test.com")
        cy.get("@feedback").should("have.value", "Hello")
    })

    it("Should render a thanks upon successful submission", () => {
        // arrange
        cy.visit("/feedback")

        // act
        cy.get(`input[type*="email"]`).as("email")
        cy.get(`input[type*="text"]`).as("feedback")
        cy.get(`input[type*="submit"]`).as("submit")

        cy.get("@email").type("testing@testing.com")
        cy.get("@feedback").type("I love this app!")
        cy.get("@submit").click()
        cy.wait(1000)

        // assert
        cy.get("h3").contains("Thank you for your feedback!")
    })

    it("Should use local storage to prevent a user who has already submitted from submitting again",
    () => {
        // arrange
        cy.visit("/")
        cy.get(`a[href*="/feedback"]`).click()

        // act
        cy.get(`input[type*="email"]`).as("email")
        cy.get(`input[type*="text"]`).as("feedback")
        cy.get(`input[type*="submit"]`).as("submit")

        cy.get("@email").type("testing@testing.com")
        cy.get("@feedback").type("I love this app!")
        cy.get("@submit").click()

        // assert
        cy.get("h3").contains("Thank you for your feedback!")
        cy.visit("/")

        cy.visit("/feedback")
        cy.get("h3").contains("Thank you for your feedback!")
    })
})
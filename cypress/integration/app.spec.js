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
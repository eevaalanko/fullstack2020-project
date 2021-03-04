import {ALL_CHALLENGES} from "../../src/graphql/queries";





describe('Challenge app', function() {
    beforeEach(function() {
        const query = ALL_CHALLENGES

        cy.request(
            {
                url: 'http://localhost:4000/graphql/',  // graphql endpoint
                body: { query },  // or { query: query } depending if you are writing with es6
                failOnStatusCode: false  // not a must but in case the fail code is not 200 / 400
            }
        ).then((res) => {
            cy.log(res);
        })
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Your Challenge App')
        cy.contains('This app is for keeping score of your monthly sport challenges and sharing your accomplishments with your friends.')
    })

})
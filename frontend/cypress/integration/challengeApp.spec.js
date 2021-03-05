
describe("Challenge app", function () {
  beforeEach(function() {
    const addUser = `
    mutation {
     createUser(username: "user", password: "secret") {
       id
       username
        password
     }
   }`;

    const createChallenge = `
    mutation {
     createChallenge(name: "test challenge", description: "test description" link: "test link", duration: 1) {
        name,
        description,
        link,
        duration,
        id
     }
   }`;
    cy.request({
      method: "POST",
      url: "http://localhost:4000/graphql/",
      body: { query: addUser },
    }).then((res) => {
      cy.log( res);
    });

    cy.request(
        {
          method: "POST",
          url: "http://localhost:4000/graphql/",
          body: { query: createChallenge },
        }
    ).then((res) => {
      cy.log(res);
    })
  })
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Your Challenge App");
    cy.contains(
      "This app is for keeping score of your monthly sport challenges and sharing your accomplishments with your friends."
    );
  });
  it("contains login page", function () {
    cy.findByRole("button").click();
    cy.findByRole("link", { name: /Login/i }).click();
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });
  it("unregistered user cannot log in", function () {
    cy.get("#username").type("lorem");
    cy.get("#password").type("ipsum");
    cy.get("#login-button").click();
    cy.contains("wrong credentials");
  });
  it("registered user can log in", function () {
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type("user");
    cy.get("#password").type("secret");
    cy.get("#login-button").click();
    cy.contains("Logged in as user");
  });
  it("contains All Challenges list", function () {
    cy.contains("All Challenges");
    cy.contains("test challenge");
    cy.findByText("Ongoing Challenges").should('not.exist');
  });
  it("contains Challenges page", function () {
    cy.findByRole("link", { name: /test challenge/i }).click();
    cy.contains("test challenge");
    cy.contains("test description");
    cy.contains("test link");
    cy.contains("Challenge duration: 1 days");
  });
  it("challenge can be started", function () {
    cy.findByRole("button", { name: /START THE CHALLENGE!/i }).click();  // TODO: add bearer token
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getGreeting } from '../support/app.po';

describe('web-app', () => {
  beforeEach(() => cy.visit('/'));

  it('Example test', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');
    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome web-app');
  });
});

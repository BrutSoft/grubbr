const Nodal = require('nodal');

const AccessToken = Nodal.require('app/models/access_token.js');
const User = Nodal.require('app/models/user.js');

class V1AccessTokensController extends Nodal.Controller {

  create() {
    User.create(this.params.body, (err, model) => {
      console.log(err);
      AccessToken.login(this.params, (err2, accessToken) => {
        this.respond(err2 || accessToken);
      });
    });
  }
}

module.exports = V1AccessTokensController;

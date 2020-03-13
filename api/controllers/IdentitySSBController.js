/**
 * IdentitySSBController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: function createIdentitySSb(req, res) {
      IdentitySSB.create({
        name: req.param('name'),
        adress: req.param('adress'),
        phoneNumber: req.param('phone'),
        facebook: req.param('facebook'),
        twitter: req.param('twitter'),
        instagram: req.param('instagram'),
        email: req.param('email'),
      })
      .then(IdentitySSB => {
        return res.ok(IdentitySSB);
      })
      .catch(err => res.serverError(err));    
  },

  find: function findIdentitySSB(req, res) {
    IdentitySSB.find()
    .then(IdentitySSB => {
      return res.ok(IdentitySSB);
    })
    .catch(err => res.notFound(err));
  },

  update: function updateIdentitySSb(req, res) {
    let atributes= {};
    if (req.param('name')) {
      atributes.name = req.param('name');
    }
    if (req.param('adress')) {
      atributes.adress = req.param('adress');
    }    
    if (req.param('phone_number')) {
      atributes.phoneNumber = req.param('phone_number');
    }
    if (req.param('facebook')) {
      atributes.facebook = req.param('facebook');
    }
    if (req.param('twitter')) {
      atributes.twitter = req.param('twitter');
    }
    if (req.param('instagram')) {
      atributes.instagram = req.param('instagram');
    }
    if (req.param('email')) {
      atributes.email = req.param('email');
    }

    IdentitySSB.update({
      id: req.params.id
    }).set(atributes)
    .then(IdentitySSB => {
      return res.ok(IdentitySSB);
    })
    .catch(err => res.notFound(err));

  },

};


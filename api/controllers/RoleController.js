/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: function createRole(req,res){
    Role.create({
      name: req.param('name'),
    })
    .then(Role => {
      return res.ok(Role);
    })
    .catch(err => res.serverError(err));
  },

  find: function findRoleAll(req,res){
    if(req.header('coach') == 3) {
      Role.find({
        id: { 'nin': [3,4] }
      })
      .then(Role => {
        return res.ok(Role);
      })
      .catch(err => res.notFound(err));
    }else {
      return res.send('500 Intenal Server Error');
    }
  },

  getRole: function findRoleById(req,res){
    Role.find({
      id: req.params.id
    })
    .then(Role => {
      return res.ok(Role);
    })
    .catch(err => res.notFound(err));
  }
};


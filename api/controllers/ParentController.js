/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: function createparent(req,res) {
        Parent.create({
            father: req.param('nameFather'),
            mother: req.param('nameMother'),
            phoneFather: req.param('phoneFather'),
            phoneMother: req.param('phoneMother'),
        })
        .then(Parent => {
            return res.ok(Parent);
        })
        .catch(err => res.serverError(err));
    },

    find: function findParent(req,res){
        Parent.find()
        .then(Parent => {
        return res.send(Parent);
        })
        .catch(err => res.notFound(err));
    },

    getParent: function getParentById(req,res){
        Parent.find(
            {id: req.params.id}
        )
        .then(Parent => {
        return res.send(Parent);
        })
        .catch(err => res.notFound(err));
    },

};


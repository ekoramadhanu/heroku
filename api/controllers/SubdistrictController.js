/**
 * SubdistrictController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create : function createSubdistrict(req,res){
    Subdistrict.create({
      name: req.param('name'),
      cityId: req.param('cityId'),
    })
    .then(Subdistrict => {
      return res.ok(Subdistrict);
    })
    .catch(err => res.serverError(err));
  },

  find: function findSubdistrictAll(req,res){
    Subdistrict.find()
    .then(Subdistrict => {
      return res.ok(Subdistrict);
    })
    .catch(err => res.notFound(err));
  },

  getSubDisctrict: function findSubdistrictById(req,res){
    Subdistrict.find(
      {id: req.params.id}
    )
    .then(Subdistrict => {
      return res.ok(Subdistrict);
    })
    .catch(err => res.notFound(err));
  },

  getSubDisctrictByCity : function findSubdistrictByCitu(req,res){
    Subdistrict.find(
      {cityId: req.params.id}
    )
    .then(Subdistrict => {
      return res.ok(Subdistrict);
    })
    .catch(err => res.notFound(err));
  },
};


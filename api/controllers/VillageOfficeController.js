/**
 * VillageOfficeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create : function createVillageOffice(req,res){
    VillageOffice.create({
      name: req.param('name'),
      villageId: req.param('district'),
    })
    .then(VillageOffice => {
      return res.ok(VillageOffice);
    })
    .catch(err => res.serverError(err));
  },

  find: function findVillageOfficeAll(req,res){
    VillageOffice.find()
    .then(VillageOffice => {
      return res.ok(VillageOffice);
    })
    .catch(err => res.notFound(err));
  },

  getVillageOffice: function findVillageOfficeById(req,res){
    VillageOffice.find(
      {id: req.params.id}
    )
    .then(VillageOffice => {
      return res.ok(VillageOffice);
    })
    .catch(err => res.notFound(err));
  },

  getSubVillageByCity : function findVillageByCity(req,res){
    VillageOffice.find(
      {villageId: req.params.id}
    )
    .then(VillageOffice => {
      return res.ok(VillageOffice);
    })
    .catch(err => res.notFound(err));
  },

};


/**
 * CityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create : function createCity(req,res){
    City.create({
      name: req.param('name'),
    })
    .then(City => {
      return res.ok(City);
    })
    .catch(err => res.serverError(err));
  },

  find: function findCityAll(req,res){
    City.find()
    .then(City => {
      return res.ok(City);
    })
    .catch(err => res.notFound(err));
  },

  getCity: function findCityById(req,res) {
    City.find(
      {id: req.params.id}
    )
    .then(City => {
      return res.ok(City);
    })
    .catch(err => res.notFound(err));
  },
  
};


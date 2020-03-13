/**
 * PlayerPosisionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create : function createPlayerPosision(req,res){
    PlayerPosision.create({
      name: req.param('name'),
      code: req.param('code'),
    })
    .then(PlayerPosisition => {
      return res.ok(PlayerPosisition);
    })
    .catch(err => res.serverError(err));
  },

  find : function findPlayerPosisionAll(req,res){
    PlayerPosision.find()
    .then(PlayerPosision => {
      return res.ok(PlayerPosision);
    })
    .catch(err => res.notFound(err));
  },

  getPlayerPosition: function findPlayerPostionById(req,res){
    PlayerPosision.find(
      {id: req.params.id}
    )
    .then(PlayerPosision => {
      return res.ok(PlayerPosision);
    })
    .catch(err => res.notFound(err));
  },
};


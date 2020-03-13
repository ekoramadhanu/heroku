/**
 * PracticeSoccerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create : function createPracticeSoccer(req,res){
    PracticeSoccer.create({ 
      date: req.param('date'),
      time: req.param('time'),
      groupId: req.param('group'),
    })
    .then(PracticeSoccer => {
      return res.ok(PracticeSoccer);
    })
    .catch(err => res.serverError(err));
  },

  find : async function findPracticeSoccer(req,res){
    if (!req.header('limit')) {      
      if(req.header('group')){
        PracticeSoccer.find({
          groupId: req.header('group')
        }).then((result) => {
          if (!result) { 
            return res.notFound(); 
          }
          return res.send(result);
        }).catch((err) => { 
          return res.serverError(err); 
        });
      } else {
        PracticeSoccer.find().then((result) => {
          if (!result) { 
            return res.notFound(); 
          }
          return res.send(result);
        }).catch((err) => { 
          return res.serverError(err); 
        });
      }
    } else {
      var max = await PracticeSoccer.find(
        { sort: 'id DESC',
          limit: req.header('limit'),
        }
      );
      return res.send(max);
    }
  },

  getStatus: async function findStatusPracticeById(req,res) {
    var data = await PracticeSoccer.find(
      { id: req.params.id}
    );
    if (data) {
      return res.send(data);
    } else {
      return res.send('Not Found');
    }
  },

  update: function updatePracticeSoccer(req,res) {
    let atribute= {};
    if(req.param('status')){
        atribute.status = req.param('status');
    }
    PracticeSoccer.updateOne({ id: req.params.id })
        .set(atribute).then((result) => {
        if (!result) { 
            return res.notFound(); 
        }
         return res.send('Data Has Been Update');
        })
        .catch((err) => { 
         return res.serverError(err); 
        });
  },
};


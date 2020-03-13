/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function createGroup(req, res) {
    var name = await Group.findOne(
      {name: req.param('name')}
    );
    if (name){
      return res.send('Group Alredy Exist');
    } else {      
      Group.create({
        name: req.param('name'),
        coachId: req.param('coach'),
        ageCriteria: req.param('criteria'),
      })
      .then(Group => {
        return res.send(Group);
      })
      .catch(err => res.serverError(err));
    }
  },

  find: function findGroupAll(req,res) {
    if(req.header('coach')){
      Group.find({
        coachId: req.header('coach')
      }).then((result) => {
        if (!result) { 
          return res.notFound(); 
        }
        return res.send(result);
      }).catch((err) => { 
        return res.serverError(err); 
      });
    }else {
      Group.find().then((result) => {
        if (!result) { 
          return res.notFound(); 
        }
        return res.send(result);
      }).catch((err) => { 
        return res.serverError(err); 
      });
    }
  },

  getMaxId: async function getMaxId(req,res){
    var max = await Group.find(
      { sort: 'id DESC',
        limit: 1,
      }
    );
    return res.send(max);
  },

  update: function updateGroupById(req, res) {
    Group.updateOne({ id: req.params.id })
    .set({
      name: req.param('name'),
      coachId: req.param('coach'),
    }).then((result) => {
      if (!result) { 
        return res.notFound(); 
      }
      return res.send('Data Has Been Update');
    })
    .catch((err) => { 
      return res.serverError(err); 
    });
  },

  delete: function deleteGroupById(req,res){
    Group.destroyOne({ id: req.params.id })
    .then((result) => {
      if (!result) { 
        return res.notFound(); 
      }
      return res.send('Data Has Been Delete');
    })
    .catch((err) => { 
      return res.serverError(err); 
    });
  },

  getGroup: function findGroupById(req,res){
    Group.find(
      {id: req.params.id}
    )
    .then((result) => {
      if (!result) { 
        return res.notFound(); 
      }
      return res.send(result);
    }).catch((err) => { 
      return res.serverError(err); 
    });
  },

  chekedGroup:  async function chekedGroupByAge(req,res){
    var data = await Group.findOne(
      {ageCriteria: req.header('age')}
    );
    if (data) {
      return res.send(data);
    } else {
      return res.send('You Not Qualified');
    }
  }

  
};


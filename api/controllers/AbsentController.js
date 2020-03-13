/**
 * AbsentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function createAbsent(req,res) {
        Absent.create({
            praciceId: req.param('pratice'),
            registrationId: req.param('student'),
          })
          .then(Absent => {
            return res.ok(Absent);
          })
          .catch(err => res.serverError(err));
    },
    find : function findAbsent(req,res) {
        Absent.find({
          praciceId: req.header('practice'),
        }).populate('registrationId')
          .then(Absent => {
            return res.send(Absent);
          })
          .catch(err => res.serverError(err));
    },
    update: function updateAbsent(req,res){
      let atribute = {};
      if (req.param('absent')) {
        atribute.absent = req.param('absent');
      }
      Absent.update({
        id: req.params.id
      }).set(atribute).then(Absent => {
        return res.ok(Absent);
      })
      .catch(err => res.notFound(err));
    }
};


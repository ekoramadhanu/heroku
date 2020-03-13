/**
 * ReportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create : function createReport (req,res){
        Report.create({
            owner: req.param('student'),
            description: req.param('description'),
            month: req.param('month'),
            year: req.param('year'),
          })
          .then(Report => {
            return res.ok(Report);
          })
          .catch(err => res.serverError(err));
    },
    delete : function deleteReport (req,res){
        Report.destroyOne({ id: req.params.id })
            .then((result) => {
            if (!result) { 
                return res.notFound(); 
            }
                return res.json({data:'Data Has Been Delete'});
            })
            .catch((err) => { 
                return res.serverError(err); 
            });
    },
    find : async function findReport (req,res) {
        if(req.header('limit')){
            var max = await Report.find(
                { sort: 'id DESC',
                  limit: req.header('limit'),
                }
              );
              return res.send(max);
        } else {
            Report.find().populate('owner')
                .then(Report => {
                    return res.send(Report);
                })
                .catch(err => res.notFound(err));
        }
    },

};


/**
 * FileuploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: function  createUploadFile (req,res) {       
        var dirname= '../../assets/'+req.header('directory');        
        req.file('file').upload({
            dirname: dirname,
        },function (err, files) {
        if (err) return res.serverError(err);
            // fileDirectory = files;
            // return res.send(files); 
            Fileupload.create({
                pathPhoto: files[0].fd,
                mimeType: files[0].type,
                registrationId: req.header('idRegitration')
              })
              .then(Fileupload => {
                return res.send(Fileupload);
              })
              .catch(err => res.serverError(err));
        });        
    },

    update: function updateFileUpload(req,res) {
        var reference = {};
        if(req.param('identity')){
            reference.identityId = req.param('identity');
        } 
        if (req.param('registration')) {
            reference.registrationId = req.param('registration');
        }
        Fileupload.updateOne({ id:req.param.id })
        .set(reference).then((result) => {
        if (!result) { 
            return res.notFound(); 
        }
        return res.send('Data Has Been Update');
        })
        .catch((err) => { 
        return res.serverError(err); 
        });
        
    },

    find: function findFile(req,res){
        Fileupload.find(
            {registrationId: req.params.id}
        ).then((result) => {
            if (!result) { 
              return res.notFound(); 
            }
            return res.send(result);
          })
          .catch((err) => { 
            return res.serverError(err); 
          });
    },

};


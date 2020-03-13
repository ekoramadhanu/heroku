/**
 * ReistrationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: function registration(req,res){
        Registration.create({
            id: req.param('idRegistration'),
            fullname: req.param('fullname'),
            nik: req.param('nik'),
            gender: req.param('gender'),
            placeOfBirth: req.param('placeOfBirth'),
            dateOfBirth: req.param('dateOfBirth'),
            adress: req.param('address'),
            postalCode: req.param('postalCode'),
            religi: req.param('religi'),
            nasionality: req.param('nasionality'),
            phoneNumber: req.param('phoneNumber'),
            weight: req.param('weight'),
            height: req.param('height'),
            school: req.param('school'),
            status: 'menunggu',
            villageOfficeId: req.param('villageOffice'),
            subdistrictId: req.param('subdistrict'),
            cityId: req.param('city'),
            parentId: req.param('parent'),
            playerPosisionId: req.param('playerPosision'),
            groupId: req.param('group'),
        }).then(Registration => {
            return res.ok(Registration);
        })
        .catch(err => res.serverError(err));
    },
    find: function findregistration(req,res){
        if(req.params.id){
            Registration.findOne(
                { id: req.params.id }
            )
            .then(Registration => {
            return res.send(Registration);
            })
            .catch(err => res.notFound(err));
        } else if(req.header('group')) {
            Registration.find({
                groupId: req.header('group')
            })
            .then(Registration => {
            return res.send(Registration);
            })
            .catch(err => res.notFound(err));
        } else {
            Registration.find()
            .then(Registration => {
            return res.send(Registration);
            })
            .catch(err => res.notFound(err));
        }
    },
    getstatus: function findregistrationByStatus(req,res){
        Registration.find({
            status: req.header('status'),
        })
            .then(Registration => {
            return res.send(Registration);
            })
            .catch(err => res.notFound(err));
    },
    update: function changeDataRegistration(req,res){
        let atribute= {};
        if(req.param('status')){
            atribute.status = req.param('status');
        }
        Registration.updateOne({ id: req.params.id })
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
    findByNIK: async function FindAccountByNIK(req,res){
        var data = await Registration.findOne(
            {nik: req.params.nik}
        );
        if (data) {
            return res.send('NIK Has Been Registered');
        } else {
            return res.ok();
        }
    },
    findByGroup: async function findAccountByGroup(req,res){
        Registration.find({
            where: { 
                groupId: req.header('group'), 
                status: req.header('status') 
            },
        })
        .then(Registration => {
        return res.send(Registration);
        })
        .catch(err => res.notFound(err));
    }
};


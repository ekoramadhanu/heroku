/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  create: async function createAccount (req,res){
     var username = await Account.findOne(
        {where : {username: req.param('username')}}
      ); 
      var email = await Account.findOne(
        { where : {email: req.param('email')}});
     if(username){
      return res.send('Username Has Been Used');      
     } else {
        if (email) {
         return res.send('E-mail Has Been Used');      
        } else {          
          var Emailaddresses = require('machinepack-emailaddresses');
          // Determine whether or not the provided string is an email address.
          Emailaddresses.validate({
            string: req.param('email'),
          })
          .exec({
            // An unexpected error occurred.
            error: function (err) {
              return res.serveErr(err);
            },
            // The provided string is not an email address.
            invalid: function () {
              return res.badRequest('Email not matched');
            },
            // OK.
            success: function () {
              var Passwords = require('machinepack-passwords');
              // Encrypt a string using the BCrypt algorithm.
              Passwords.encryptPassword({
                password: req.param('password'),
              }).exec({
                // An unexpected error occurred.
                error: function (err) {
                  return res.serveErr(err);
                },
                // OK.
                success: function (result) {
                  if(req.param('fullname')){
                    var account = {
                      username: req.param('username'),
                      password: result,
                      fullname : req.param('fullname'),
                      email: req.param('email'),
                      roleId: req.param('role_id'),              
                    };
                    Account.create(account, (err,createResult) =>{
                      if(err) {
                        return res.serveErr(err);
                      }
                      //   req.session.account = createResult.id;
                      return res.ok(createResult);
                    });
                  } else {
                    var account = {
                      username: req.param('username'),
                      password: result,                
                      email: req.param('email'),
                      roleId: req.param('role_id'),              
                    };
                    Account.create(account, (err,createResult) =>{
                      if(err) {
                        return res.serveErr(err);
                      }
                      //   req.session.account = createResult.id;
                      return res.ok(createResult);
                    });
                  }
                  const nodemailer = require('nodemailer');
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'ekorama989@gmail.com',
                      pass: 'fg098fg098'
                    }
                  });
                  
                  const data = req.param('email');
                  let buff = new Buffer(data);
                  let base64data = buff.toString('base64');
                  const mailOptions = {
                    from: 'ekorama989@gmail.com',
                    to: req.param('email'),
                    subject: 'Aktivasi Akun',
                    html: 'Hallo Adik-Adik'+
                    ' <br> Terimakasih sudah mendaftar di SSB Sumbersari <br> '
                    +'Silahkan klik link dibawah ini untuk aktivasi akunmu'+
                    ' <br>  http://localhost:8080/active-account/'+ base64data,
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    sails.log(error);
                    } else {
                      sails.log('Email sent: ' + info.response);
                      return res.send('ok');
                    }
                  });
                },
              });
            },
          });
        }    
     }
  },

  find: async function findGroupAll(req,res){
    if(req.header('coach') == 1) {
      Account.find({
        roleId : 2
      }).then((result) => {
        if (!result) { 
          return res.notFound(); 
        }
        return res.send(result);
      })
      .catch((err) => { 
        return res.serverError(err); 
      });
    } else if(req.header('coach') == 3) {
      Account.find({
        roleId : { nin: [3,4] }
      })
      .then((result) => {
        if (!result) { 
          return res.notFound(); 
        }
        return res.send(result);
      })
      .catch((err) => { 
        return res.serverError(err); 
      });      
    }else{
      return res.status(500);
    }
  },

  login: async function login(req,res){
    const jwt = require('jsonwebtoken');
    var data = await Account.findOne(
      {username: req.param('username')}
    ).decrypt() ;
    if( !data ){
      return res.send('Account Not Registered');
    } else if(data.isActive === 0) {
      return res.send('Account Not Actived');
    }else {
      var Passwords = require('machinepack-passwords');
      // Compare a plaintext password attempt against an already-encrypted version.
      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: data.password,
      }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return res.status(err);
      },
      // Password attempt does not match already-encrypted version
      incorrect: function () {
        return res.send('Password Not Match');
      },
      // OK.
      success: function () {
        var account = data;
        var token = jwt.sign({
          data: account
        }, 'secret', { expiresIn: '1H' });;
        sails.log(token);
        return res.send(token);
      },
      
      });
    }
  },

  forgetPassword: async function forgetPassword(req,res){
    const nodemailer = require('nodemailer');
    var account = await Account.findOne({
      email : req.param('email')
    });
    if (!account) {
      return res.send('Email Not Registered');
    }

    const data = req.param('email');
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ekorama989@gmail.com',
        pass: 'fg098fg098' // naturally, replace both with your real credentials or an application-specific password
      }
    });
    
    const mailOptions = {
      from: 'ekorama989@gmail.com',
      to: req.param('email'),
      subject: 'Coba',
      html: 'Hallo Adik-Adik'+
      ' <br>  <br> '
      +'Silahkan klik link dibawah ini untuk lupa kata sandi'+
      ' <br> http://localhost:8080/recover-password/'+ req.param('email'),
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      sails.log(error);
      } else {
        sails.log('Email sent: ' + info.response);
        return res.send('ok');
      }
    });
  },

  activeAccount: async function activeAccount(req, res){
    const data = req.param('email');
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii');
    // sails.log(text);
    var account = await Account.findOne({
      email : text
    });
    if (!account) {
      return res.send('Data Not Valid');
    } else {
      // sails.log(data);
      Account.update({
        id: account.id
      }).set({
        isActive: 1
      })
      .then(Account => {
        return res.ok(Account);
      })
      .catch(err => res.notFound(err));
    }
  },

  resetPassword : async function resetPassword(req, res){
    const data = req.param('email');
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii');
    var account = await Account.findOne(
      {email: text}
    ).decrypt();    
    let atribute= {};
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return res.serveErr(err);
      },
      // OK.
      success: function (result) {            
        atribute.password = result;        
        // return res.send(result);
        Account.update({
          id: account.id
        }).set(atribute)
        .then(Account => {
          return res.ok(Account);
        })
        .catch(err => res.notFound(err));
      },
    });      
  },

  updateToken: async function updateToken(req,res){
    const jwt = require('jsonwebtoken');
    token = jwt.verify(req.header('token'),'secret');
    var data = await Account.findOne(
      {id: token.data.id}
    );
    var newToken = jwt.sign({
      data: data
    }, 'secret', { expiresIn: '1H' });;
    return res.send(newToken);

  },

  getIdentity: async function getidentity(req,res){
    const jwt = require('jsonwebtoken');
    token = jwt.verify(req.header('token'),'secret');
    return res.send(token);
  },

  update: async function updateAccount(req,res){
    let atribute= {};
    if (req.param('idregistration')) {
      atribute.registrationId = req.param('idregistration');
      Account.update({
        id: req.params.id
      }).set(atribute)
      .then(Account => {
        return res.ok(Account);
      })
      .catch(err => res.notFound(err));
    }
    if (req.param('role')) {
      atribute.roleId = req.param('role');
      Account.update({
        id: req.params.id
      }).set(atribute)
      .then(Account => {
        return res.ok(Account);
      })
      .catch(err => res.notFound(err));
    }

    if(req.param('fullname') && req.param('password') && req.param('newPassword')){
      var data = await Account.findOne(
        {id: req.params.id}
      ).decrypt() ;      
      var Passwords = require('machinepack-passwords');
        // Compare a plaintext password attempt against an already-encrypted version.
        Passwords.checkPassword({
          passwordAttempt: req.param('password') ,
          encryptedPassword: data.password,
        }).exec({
          // An unexpected error occurred.
          error: function (err) {
            return res.status(err);
          },
          // Password attempt does not match already-encrypted version
          incorrect: function () {
            return res.send('Kata Sandi Anda Salah');
          },
          // OK.
          success: function () {
            var Passwords = require('machinepack-passwords');
            // Encrypt a string using the BCrypt algorithm.
            Passwords.encryptPassword({
              password: req.param('newPassword'),
            }).exec({
              // An unexpected error occurred.
              error: function (err) {
                return res.serveErr(err);
              },
              // OK.
              success: function (result) {            
                atribute.password = result;
                atribute.fullname = req.param('fullname');
                // return res.send(result);
                Account.update({
                  id: req.params.id
                }).set(atribute)
                .then(Account => {
                  return res.ok(Account);
                })
                .catch(err => res.notFound(err));
              },
            });      
          },
        });
    }

    if (req.param('password') && req.param('newPassword')) {
      var data = await Account.findOne(
        {id: req.params.id}
      ).decrypt() ;      
      var Passwords = require('machinepack-passwords');
        // Compare a plaintext password attempt against an already-encrypted version.
        Passwords.checkPassword({
          passwordAttempt: req.param('password') ,
          encryptedPassword: data.password,
        }).exec({
          // An unexpected error occurred.
          error: function (err) {
            return res.status(err);
          },
          // Password attempt does not match already-encrypted version
          incorrect: function () {
            return res.send('Kata Sandi Anda Salah');
          },
          // OK.
          success: function () {
            var Passwords = require('machinepack-passwords');
            // Encrypt a string using the BCrypt algorithm.
            Passwords.encryptPassword({
              password: req.param('newPassword'),
            }).exec({
              // An unexpected error occurred.
              error: function (err) {
                return res.serveErr(err);
              },
              // OK.
              success: function (result) {            
                atribute.password = result;        
                // return res.send(result);
                Account.update({
                  id: req.params.id
                }).set(atribute)
                .then(Account => {
                  return res.ok(Account);
                })
                .catch(err => res.notFound(err));
              },
            });      
          },
        });
    }
  },

  delete: function deleteAccount(req,res){
    Account.destroyOne({ id: req.params.id })
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

  getAccount: function getAccountById(req,res){
    Account.find({
      id : req.params.id
    })
    .then((result) => {
      if (!result) { 
        return res.notFound(); 
      }
      return res.send(result);
    })
    .catch((err) => { 
      return res.serverError(err); 
    });     
  },

  getMaxId: async function getMaxIdAccount(req,res) {
    var data = await Account.find({
      where: {roleId:{ in: [ 1, 2 ] }},
      sort: 'id DESC',
      limit: 1,
    });
    return res.send(data);
  },
};

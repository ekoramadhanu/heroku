/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // api in group controller
  'POST /group': 'GroupController.create',
  'GET /group/:id': 'GroupController.getGroup',
  'GET /group': 'GroupController.find',
  'GET /group/limit': 'GroupController.getMaxId',
  'GET /group/age': 'GroupController.chekedGroup',
  'PATCH /group/:id': 'GroupController.update',
  'DELETE /group/:id': 'GroupController.delete',

  // api in role controller
  'POST /role': 'RoleController.create',
  'GET /role': 'RoleController.find',
  'GET /role/:id': 'RoleController.getRole',

  //api in player posisition controller
  'POST /playerposision': 'PlayerPosisionController.create',
  'GET /playerposision': 'PlayerPosisionController.find',
  'GET /playerposision/:id': 'PlayerPosisionController.getPlayerPosition',

  //api in villageoffice controller
  'POST /villageoffice': 'VillageOfficeController.create',
  'GET /villageoffice': 'VillageOfficeController.find',
  'GET /villageoffice/subdistrict/:id': 'VillageOfficeController.getSubVillageByCity',
  'GET /villageoffice/:id': 'VillageOfficeController.getVillageOffice',

  // api in subdistrict controller
  'POST /subdistrict': 'SubdistrictController.create',
  'GET /subdistrict': 'SubdistrictController.find',
  'GET /subdistrict/city/:id': 'SubdistrictController.getSubDisctrictByCity',
  'GET /subdistrict/:id': 'SubdistrictController.getSubDisctrict',

  // api in account controller
  'POST /register': 'AccountController.create',
  'GET /account': 'AccountController.find',
  'GET /account/:id': 'AccountController.getAccount',
  'PATCH /account/:id': 'AccountController.update',
  'DELETE /account/:id': 'AccountController.delete',
  'GET /account/limit': 'AccountController.getMaxId',
  'POST /login': 'AccountController.login',
  'POST /forgot-password': 'AccountController.forgetPassword',
  'PATCH /active-account': 'AccountController.activeAccount',
  'PATCH /reset-password': 'AccountController.resetPassword',
  'GET /get-identity': 'AccountController.getIdentity',
  'GET /update-identity': 'AccountController.updateToken',

  // api in identitySSB controller
  'POST /identityssb': 'IdentitySSBController.create',
  'GET /identityssb': 'IdentitySSBController.find',
  'PATCH /identityssb/:id': 'IdentitySSBController.update',

  // api in city controller
  'POST /city': 'CityController.create',
  'GET /city': 'CityController.find',
  'GET /city/:id': 'CityController.getCity',

  // api in practiceSoccer controller
  'POST /practicesoccer': 'PracticeSoccerController.create',
  'GET /practicesoccer': 'PracticeSoccerController.find',
  'GET /practicesoccer/:id': 'PracticeSoccerController.getStatus',
  'PATCH /practicesoccer/:id': 'PracticeSoccerController.update',

  // api in upload controller
  'POST /file-upload': 'FileuploadController.create',
  'PATCH /file-upload/:id': 'FileuploadController.update',  
  'GET /file-upload/:id': 'FileuploadController.find',

  // api in parent controller
  'POST /parent': 'ParentController.create',
  'GET /parent': 'ParentController.find',
  'GET /parent/:id': 'ParentController.getParent',

  // api in registration controller
  'POST /registration': 'RegistrationController.create',
  'GET /registration/:id': 'RegistrationController.find',
  'GET /registration/nik/:nik': 'RegistrationController.findByNIK',
  'GET /registration/status': 'RegistrationController.getstatus',
  'GET /registration/group': 'RegistrationController.findByGroup',
  'PATCH /registration/:id': 'RegistrationController.update',
  
  //  api in absent controller
  'POST /absent': 'AbsentController.create',
  'GET /absent': 'AbsentController.find',
  'PATCH /absent/:id': 'AbsentController.update',

  // api in report controller,
  'POST /report': 'ReportController.create',
  'GET /report': 'ReportController.find',
  'DELETE /report/:id': 'ReportController.delete',

  // api get file
  'GET /file/:id': { action: 'download'},


};

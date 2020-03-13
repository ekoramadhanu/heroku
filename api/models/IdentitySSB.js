/**
 * IdentitySSB.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'identity_ssb',
  attributes: {
    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      columnType: 'tinyint',
    },
    name: {
      type:'string',
      required : true,
      columnType: 'varchar(15)',
      columnName: 'name',
    },
    adress: {
      type: 'string',
    },    
    phoneNumber: {
      type: 'number',
      columnName: 'phone_number',
      columnType: 'double',
    },
    facebook : {
      type: 'string',
      columnType: 'varchar(25)',
    },
    twitter: {
      type: 'string',
      columnType: 'varchar(25)',
    },
    instagram: {
      type: 'string',
      columnType: 'varchar(25)',
    },
    email: {
      type: 'string',
      columnType: 'varchar(50)',
      isEmail: true,
    },
    createdAt: {
      type: 'string',
      columnType: 'datetime',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'string',
      columnType: 'datetime',
      autoUpdatedAt: true,
    },
    fileUploads: {
      collection: 'fileupload',
      via: 'identityId'
    },
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  customToJSON: function() {
    return _.omit(this, ['createdAt','updatedAt']);
  },
};


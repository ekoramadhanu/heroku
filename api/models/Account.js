/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },
    username: {
      type: 'string',
      unique: true,
      columnType: 'varchar(50)',            
    },
    fullname: {
      type: 'string',
      columnType: 'varchar(50)',
      allowNull: true,      
    },
    password: {
      type: 'string',
      encrypt: true,
    },
    isActive: {
      type: 'number',
      columnType: 'tinyint(1)',
      columnName:'is_active',
      defaultsTo: 0,
    },
    email: {
      type: 'string',
      columnType: 'varchar(50)',
      isEmail: true,
      unique: true,
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
    roleId: {
      columnName: 'role_id',
      model: 'role',
    },
    registrationId: {
      columnName: 'registration_id',
      model: 'registration',
      unique: true,
    },
    group: {
      collection:'group',
      via: 'coachId'
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
    return _.omit(this, ['createdAt','updatedAt','isDelete','password']);
  },

};


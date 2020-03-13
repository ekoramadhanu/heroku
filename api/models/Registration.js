/**
 * Reistration.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'registration_ssb',
  attributes: {
    id: {
      type: 'number',
      unique: true,
      required: true,   
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
    fullname: {
      type: 'string',
      columnType:'varchar(30)',
    },
    nik: {
      type: 'string',
      columnType: 'varchar(20)',
      unique: true,
    },
    gender: {
      type: 'string',
      isIn: ['L','P'],
      columnType: 'char(1)',
    },
    placeOfBirth: {
      type: 'string',
      columnType: 'varchar(40)',
      columnName: 'place_of_birth',
    },
    dateOfBirth: {
      type: 'number',
      columnType: 'int(8)',
      columnName: 'date_of_birth',
    },
    adress: {
      type: 'string',
    },
    postalCode: {
      type: 'number',
      columnName: 'postal_code',
      columnType: 'smallint',
    },
    religi: {
      type:'string',
      columnType: 'varchar(15)',
    },
    nasionality: {
      type: 'String',
      columnType: 'varchar(15)',
    },
    phoneNumber: {
      type: 'number',
      columnName: 'phone_number',
      columnType: 'double',
    },
    weight: {
      type: 'number',
      columnType: 'tinyint(3)'
    },
    height: {
      type: 'number',
      columnType: 'tinyint(3)'
    },
    school: {
      type: 'string',
    },    
    status: {
      type: 'string',
      isIn: ['diterima','ditolak','menunggu','aktif'],
      columnType: 'varchar(10)',
    },
    account: {
      collection:'account',
      via: 'registrationId'
    },
    villageOfficeId: {
      columnName: 'village_office_id',
      model: 'villageoffice',
    },
    subdistrictId: {
      columnName: 'sub_district_id',
      model: 'subdistrict',
    },
    cityId: {
      columnName: 'city_id',
      model: 'city',
    },
    parentId: {
      columnName: 'parent_id',
      model: 'parent',      
    },
    playerPosisionId: {
      columnName: 'player_posision_id',
      model: 'playerposision',
    },
    groupId: {
      columnName: 'group_id',
      model: 'group',
    },
    fileUploads: {
      collection: 'fileupload',
      via: 'registrationId'
    },
    absents: {
      collection: 'absent',
      via: 'registrationId'
    },
    reports: {
      collection: 'report',
      via: 'owner'
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


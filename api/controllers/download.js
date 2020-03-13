module.exports = {


  friendlyName: 'Download',


  description: 'Download  file (returning a stream).',


  inputs: {
    id:{
      description: 'id file',
      type: 'number',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'stream file',
      outputType: 'ref',
    },
    notfound: {
      responType: 'File Not Found',
    }
  },


  fn: async function (inputs,exits) {
    var data = await Fileupload.findOne({id: inputs.id});
    if(!data){
      return exits.notfound;
    }
    this.res.type(data.mimeType);
    var downloading = await sails.startDownload(data.pathPhoto);
    // res.attachment('file');
    // All done.
    return exits.success(downloading);

  }


};

module.exports.cron = {
    // myJob: {
    //   schedule: '* * * 31 * *',
    //   onTick: async function() {
    //     var data = await Group.find();
    //     var date = new Date();
    //     var day = date.getDay();
    //     var month = date.getMonth() + 1;
    //     var year = date.getFullYear();
    //     var counterDay = 0;
    //     if (day === 0) {
    //         counterDay = date.getDate() + 2;
    //     } else if (day === 1) {
    //         counterDay = date.getDate() + 1;
    //     } else if (day === 2) {
    //         counterDay = date.getDate();
    //     } else if (day === 3) {
    //         counterDay = date.getDate() + 6;
    //     } else if (day === 4) {
    //         counterDay = date.getDate() + 5;
    //     } else if (day === 5) {
    //         counterDay = date.getDate() + 4;
    //     } else {
    //         counterDay = date.getDate() + 3;
    //     }
    //     data.forEach((item) => {
    //         if (counterDay < 31) {

    //         }
    //         PracticeSoccer.create({ 
    //             date: 12121122,
    //             time: 1111,
    //             groupId: item.id,
    //           })
    //           .catch(err => res.serverError(err));
    //     });
    //     sails.hooks.cron.jobs.myJob.stop();
    //   },
    // }
  };
let logger = require('../logger/logger');
let controllerUsers = require('../controllers/controller.users');
module.exports = (app) =>{
    // user normal
    app.get('/api/user' , controllerUsers.getMyProfile);
    app.put('/api/user/password' , controllerUsers.updateMyPassword);
    app.get('/api/user/listBasic/:groupId' , controllerUsers.getListMemberBasic);
    app.get('/api/user/AllBasic' , controllerUsers.getAllMemberBasic);
    app.delete('/api/user/outGroup' , controllerUsers.outGroup);
    app.get('/api/member/:userId' , controllerUsers.getMember);
    //advance

    app.post('/api/member' , controllerUsers.createMember);
    app.put('/api/member' , controllerUsers.updateMember);
    // app.delete('/api/member' , controllerUsers.deleteMember);
    app.get('/api/member/listAdvance/:groupId' , controllerUsers.getListMemberAdvance);
    app.get('/api/member/AllAdvance' , controllerUsers.getAllMemberAdvance);
    app.put('/api/member/updateGroupRole' , controllerUsers.updateUserToGroupRole);
    // app.get('/api/user/profile/:userId' , controllerUsers.getProfileMember);
    // app.get('/api/user/getGroupRoleFromUser/:id' , controllerUsers.getGroupRoleFromUser);

};

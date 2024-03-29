let logger = require('../logger/logger');
let controllerUsers = require('../controllers/controller.users');
let authorizeUser = require('../middleware/authorize/authorize');
let validate = require('../validate/validateUser');
module.exports = (app) =>{
    // user normal
    app.get('/api/user/profile' , controllerUsers.getMyProfile);
    app.put('/api/user/password' , controllerUsers.updateMyPassword);
    app.get('/api/user/listBasic/:groupId' , controllerUsers.getListMemberBasic);
    app.get('/api/user/allBasic' , controllerUsers.getAllMemberBasic);
    app.delete('/api/user/outGroup' , controllerUsers.outGroup);
    app.get('/api/member/profile/:userId' , controllerUsers.getMember);
    //advance
    app.get('/api/member/unActive' , authorizeUser('createMember') , controllerUsers.getUnActiveMember);
    app.post('/api/member' , validate.createUser , authorizeUser('createMember') , controllerUsers.createMember);
    app.put('/api/member' , authorizeUser('updateMember'), controllerUsers.updateMember);
    app.get('/api/member/listAdvance/:groupId' , authorizeUser('getListAdvanceProfileMember') , controllerUsers.getListMemberAdvance);
    app.get('/api/member/allAdvance' , authorizeUser('getAllAdvanceProfileMember') ,  controllerUsers.getAllMemberAdvance);
    app.put('/api/member/updateGroupRole',authorizeUser('updateMemberToGroupRole') , controllerUsers.updateUserToGroupRole);
    // app.get('/api/user/getGroupRoleFromUser/:id' , controllerUsers.getGroupRoleFromUser);
    // app.delete('/api/member' , controllerUsers.deleteMember);
};

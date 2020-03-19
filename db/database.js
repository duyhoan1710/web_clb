module.exports = {
    groups : [
        {groupName: 'manageGroup' , description : ''},
        {groupName: 'mediaGroup' , description: ''},
        {groupName: 'logistiventGroup' , description : ''},
        {groupName: 'humanGroup' , description : ''},
        {groupName: 'developerGroup' , description : ''},
    ],
    roles : [
        {roleName: 'leader' , description : ''},
        {roleName: 'viceLeader' , description: ''},
        {roleName: 'member' , description : ''}
    ],
    permissions : [
        // quyền cơ bản
        {permissionName: 'getUser' , description : ''},
        {permissionName: 'updateUser' , description : ''},
        {permissionName: 'getAllBasicProfileMember' , description : ''},
        {permissionName: 'getListBasicProfileMember' , description : ''},
        {permissionName: 'getNotify' , description : ''},
        {permissionName:  'joinGroup' , description : ''},
        {permissionName:  'outGroup' , description : ''},
        
        // 
        {permissionName: 'createNotify' , description : ''},
        {permissionName: 'createMember' , description : ''},
        {permissionName: 'updateMember' , description : ''},
        {permissionName: 'deleteMember' , description : ''},
        {permissionName: 'updateMemberToGroupRole' , description : ''},
        {permissionName: 'getAllAdvanceProfileMember' , description : ''},
        {permissionName: 'getListAdvanceProfileMember' , description : ''},
        {permissionName: 'confirmInviteJoinGroup' , description : ''},
        //
        {permissionName: 'createNews' , description : ''},
        {permissionName: 'updateNews' , description : ''},
        {permissionName: 'deleteNews' , description : ''},
        {permissionName: 'getCallStackNews' , description : ''},
        {permissionName: 'confirmNews' , description : ''},


        //
    ],
    groupRole : {
        manageGroup : {
            leader : [
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getAllAdvanceProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'deleteNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'createMember' , description : ''},
                {permissionName: 'updateMember' , description : ''},
                {permissionName: 'deleteMember' , description : ''},
                {permissionName: 'updateMemberToGroupRole' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ]
        },
        mediaGroup : {
            leader: [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'deleteNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ],
            member : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ]
        },
        logistiventGroup : {
            leader : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader: [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},

            ],
            member : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},

            ]
        },
        humanGroup : {
            leader : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'createMember' , description : ''},
                {permissionName: 'updateMember' , description : ''},
                {permissionName: 'deleteMember' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'getAllAdvanceProfileMember' , description : ''},
                {permissionName: 'updateMemberToGroupRole' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},

            ],
            viceLeader: [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},

            ],
            member : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},

            ]
        },
        developerGroup : {
            leader : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader: [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'postNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'confirmInviteJoinGroup' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},


            ],
            member : [
                {permissionName: 'getNotify' , description : ''},
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'getAllBasicProfileMember' , description : ''},
                {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName:  'joinGroup' , description : ''},
                {permissionName:  'outGroup' , description : ''},
            ]
        },
        homelessGroup : {
            member : [
                {permissionName: 'getUser' , description : ''},
                {permissionName: 'updateUser' , description : ''},
                {permissionName: 'joinGroup' , description : ''}
            ]
        }
    }
};
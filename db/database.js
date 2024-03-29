module.exports = {
    groups : [
        {groupName: 'manageGroup' , description : ''},
        {groupName: 'mediaGroup' , description: ''},
        {groupName: 'logistiventGroup' , description : ''},
        {groupName: 'humanGroup' , description : ''},
        {groupName: 'developerGroup' , description : ''},
        {groupName: 'homelessGroup' , description : ''}
    ],
    roles : [
        {roleName: 'leader' , description : ''},
        {roleName: 'viceLeader' , description: ''},
        {roleName: 'member' , description : ''}
    ],
    permissions : [
        // quyền cơ bản
        // {permissionName: 'getMyProfile' , description : ''},// xong
        // {permissionName: 'updateMyProfile' , description : ''}, // xong
        // {permissionName: 'getAllBasicProfileMember' , description : ''}, //xong
        // {permissionName: 'getListBasicProfileMember' , description : ''}, // xong
        // {permissionName: 'getNotify' , description : ''}, // xong
        // {permissionName: 'getListNotify' , description : ''}, // xong
        // {permissionName:  'joinGroup' , description : ''}, // tạm thời bỏ
        // {permissionName:  'outGroup' , description : ''},  //

        //
        {permissionName: 'createNotify' , description : ''}, // xong
        {permissionName: 'updateNotify' , description : ''}, // xong
        {permissionName: 'deleteNotify' , description : ''}, // xong
        {permissionName: 'createMember' , description : ''}, // xong
        {permissionName: 'updateMember' , description : ''}, // xong
        {permissionName: 'deleteMember' , description : ''}, // xong
        {permissionName: 'updateMemberToGroupRole' , description : ''}, // xong
        {permissionName: 'getAllAdvanceProfileMember' , description : ''}, // xong
        {permissionName: 'getListAdvanceProfileMember' , description : ''}, // xong
        // {permissionName: 'confirmInviteJoinGroup' , description : ''}, // tạm thời bỏ
        //
        {permissionName: 'createNews' , description : ''},
        {permissionName: 'updateNews' , description : ''},
        {permissionName: 'deleteNews' , description : ''},
        {permissionName: 'getCallStackNews' , description : ''},
        {permissionName: 'confirmNews' , description : ''},


        // only admin
        // {permissionName: 'getAllNotify' , description : ''},

        //
    ],
    groupRole : {
        manageGroup : {
            leader : [
                {permissionName: 'getAllAdvanceProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getMember' , description : ''},
                {permissionName: 'createMember' , description : ''},
                {permissionName: 'updateMember' , description : ''},
                {permissionName: 'deleteMember' , description : ''},
                {permissionName: 'updateMemberToGroupRole' , description : ''},
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'deleteNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
            ]
        },
        mediaGroup : {
            leader: [
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'deleteNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader : [
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'confirmNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            member : [
                {permissionName: 'createNews' , description : ''},
                {permissionName: 'updateNews' , description : ''},
                {permissionName: 'getCallStackNews' , description : ''},
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ]
        },
        logistiventGroup : {
            leader : [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader: [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            member : [
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ]
        },
        humanGroup : {
            leader : [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                {permissionName: 'createMember' , description : ''},
                {permissionName: 'updateMember' , description : ''},
                {permissionName: 'deleteMember' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                {permissionName: 'getAllAdvanceProfileMember' , description : ''},
                {permissionName: 'updateMemberToGroupRole' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader: [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getUser' , description : ''},
                {permissionName: 'createMember' , description : ''},
                {permissionName: 'updateMember' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getAllAdvanceProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},

            ],
            member : [
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},

            ]
        },
        developerGroup : {
            leader : [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            viceLeader: [
                // {permissionName: 'getNotify' , description : ''},
                {permissionName: 'createNotify' , description : ''},
                {permissionName: 'updateNotify' , description : ''}, // xong
                {permissionName: 'deleteNotify' , description : ''}, // xong
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                {permissionName: 'getListAdvanceProfileMember' , description : ''},
                // {permissionName: 'confirmInviteJoinGroup' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ],
            member : [
                // {permissionName: 'getNotify' , description : ''},
                // {permissionName: 'getUser' , description : ''},
                // {permissionName: 'updateUser' , description : ''},
                // {permissionName: 'getAllBasicProfileMember' , description : ''},
                // {permissionName: 'getListBasicProfileMember' , description : ''},
                // {permissionName:  'joinGroup' , description : ''},
                // {permissionName:  'outGroup' , description : ''},
            ]
        },
        homelessGroup : {
            member : [
                // {permissionName: 'getMyProfile' , description : ''},
                // {permissionName: 'updateMyPassword' , description : ''},
                // {permissionName: 'joinGroup' , description : ''}
            ]
        }
    }
};

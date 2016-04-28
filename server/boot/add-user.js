module.exports = function (app) {
  'use strict';

  var dataSource = app.datasources.mysql;

  dataSource.automigrate('ACL', function () {
    app.models.ACL.create([
      {
        'model'         : 'AccessToken',
        'accessType'    : '*',
        'principalType' : 'ROLE',
        'principalId'   : 'superadmin',
        'permission'    : 'ALLOW',
        'property'      : '*'
      },
      {
        'model'         : 'ACL',
        'accessType'    : '*',
        'principalType' : 'ROLE',
        'principalId'   : 'superadmin',
        'permission'    : 'ALLOW',
        'property'      : '*'
      },
      {
        'model'         : 'Role',
        'accessType'    : '*',
        'principalType' : 'ROLE',
        'principalId'   : 'superadmin',
        'permission'    : 'ALLOW',
        'property'      : '*'
      },
      {
        'model'         : 'RoleMapping',
        'accessType'    : '*',
        'principalType' : 'ROLE',
        'principalId'   : 'superadmin',
        'permission'    : 'ALLOW',
        'property'      : '*'
      },
      {
        'model'         : 'user',
        'accessType'    : '*',
        'principalType' : 'ROLE',
        'principalId'   : 'superadmin',
        'permission'    : 'ALLOW',
        'property'      : '*'
      }
    ]);
  });
  dataSource.automigrate('Role', function () {
    app.models.Role.create([
      {name : 'superadmin', description : 'Administrative user with global access'},
      {name : 'administrator', description : 'Administrative user with elevated access'},
      {name : 'moderator', description : 'Administrative user with selected elevated access'},
      {name : 'user', description : 'Normal user'}
    ]);
  });
  dataSource.automigrate('user', function () {
    app.models.user.create([
      {
        id            : 1,
        username      : 'SuperAdmin',
        email         : 'superadmin@doublebinary.eu',
        password      : 'superadmin',
        emailVerified : true,
        created       : new Date(),
        lastUpdated   : new Date()
      },
      {
        id            : 2,
        username      : 'Admin',
        email         : 'admin@doublebinary.eu',
        password      : 'admin',
        emailVerified : true,
        created       : new Date(),
        lastUpdated   : new Date()
      },
      {
        id            : 3,
        username      : 'Moderator',
        email         : 'moderator@doublebinary.eu',
        password      : 'moderator',
        emailVerified : true,
        created       : new Date(),
        lastUpdated   : new Date()
      },
      {
        id            : 4,
        username      : 'User',
        email         : 'user@doublebinary.eu',
        password      : 'user',
        emailVerified : true,
        created       : new Date(),
        lastUpdated   : new Date()
      }
    ]);
  });
  dataSource.automigrate('AccessToken', function () {
    app.models.AccessToken.create([
      {id : 'superadmin', ttl : 31622400, userId : 1},
      {id : 'admin', ttl : 31622400, userId : 2},
      {id : 'moderator', ttl : 31622400, userId : 3},
      {id : 'user', ttl : 31622400, userId : 4}
    ]);
  });
  dataSource.automigrate('RoleMapping', function () {
    app.models.RoleMapping.create([
      {principalType : 'USER', principalId : 1, roleId : 1},
      {principalType : 'USER', principalId : 2, roleId : 2},
      {principalType : 'USER', principalId : 3, roleId : 3},
      {principalType : 'USER', principalId : 4, roleId : 4}
    ]);
  });
};

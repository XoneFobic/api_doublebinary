'use strict';

var boot = require('loopback-boot');
var bunyan = require('bunyan');
var loopback = require('loopback');

var log = bunyan.createLogger({name : 'DoubleBinary'});
var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    log.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      log.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (error) {
  if (error) {
    throw error;
  }

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    var Authenticate = function (socket, data, callback) {

      // console.log(data);
      //
      // if ((data.username || data.email) && data.password) {
      //   var credentials = {
      //     password : data.password
      //   };
      //   if (data.username) {
      //     credentials.username = data.username;
      //   }
      //
      //   app.models.user.login(credentials, 'user', function (error, token) {
      //     if (error) {
      //       log.error(error);
      //     }
      //     console.log(token);
      //   });
      // }
      //
      // callback(null, true);

      app.models.AccessToken.find({
        where : {
          and : [{userId : data.userId}, {id : data.id}]
        }
      }, function (error, tokenDetail) {
        if (error) {
          throw error;
        }

        if (tokenDetail.length) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      });
    };

    require('socketio-auth')(app.io, {authenticate : Authenticate});

    app.io.on('connection', function (socket) {
      log.info('a user connected');
      socket.on('disconnect', function () {
        log.info('user disconnected');
      });
    });
  }
});

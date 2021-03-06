#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./src/app');
const debug = require('debug')('beautyandthemix-backend:server');
const http = require('http');
const cron = require('node-cron')
const User = require('./src/models/user')
const Subscription = require('./src/models/subscription')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


cron.schedule('* * 1 * *', function() {
   User.find({}).exec()
      .then(userList => {
        for(let i = 0; i < userList.length; i++){
          let user = userList[i];
          Subscription.findById(user.subscription).exec()
              .then(sub => {
                let upd = {
                  monthly_pay : [
                    {
                      items : [
                        {
                          name : 'Subscription' + sub.size,
                          price: sub.price
                        }
                      ],
                      month : new Date()
                    }
                  ]
                }
                upd.monthly_pay = Array.prototype.concat(upd.monthly_pay, user.monthly_pay);
                User.findByIdAndUpdate(user._id, upd, {
                  new: true,
                  runValidators: true
                }).exec();
              });
        }
      })

});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

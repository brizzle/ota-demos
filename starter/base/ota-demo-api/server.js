// const fs = require("fs");
const dotenv = require('dotenv');

// This needs to be placed before any code
process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
  // console.log(err);
  console.log(err.name, err.message);

  // The server should be shutdown because it is in an 'unclean' state
  process.exit(1);
  // Generally in production, there needs to be a way to restart the server
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

const port = process.env.PORT || 3000;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${server.address().port}...\n`);
});

process.on('unhandledRejection', err => {
  console.log(`UNHANDLED REJECTION! Shutting down...`);
  // console.log(err);
  console.log(err.name, err.message);
  // 0 - means successfully
  // 1 - uncaught exception
  //
  // Very abrupt way to end
  // process.exit(1);
  //
  // Shuts down gracefully
  // This allows the server to finish all the requests that are pending
  // or being handled, then kills the server...
  server.close(() => {
    // This is optional to shut down the server...
    process.exit(1);
  });
  // Generally in production, there needs to be a way
  // to restart the server...
});

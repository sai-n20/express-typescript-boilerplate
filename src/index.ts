//import './env';

import './di';

import express from 'express';
import { Server } from 'http';

import { init, closeApp } from './core/server';

import eventHandler from './event';

import securityRouter from './middleware/security';

const app = express();

app.use(securityRouter);

let server: Server;

init(app, (error) => {
  if (error) { throw error; }
  else {
    server = app.listen((process.env['NODE_PORT'] || process.env['PORT']), () => {
      eventHandler.emit('sys-info', `Express app started at ${process.env['NODE_PORT'] || process.env['PORT']}.`);
    });
  }
});

process.on('SIGINT', () => { closeApp(server); });
process.on('SIGTERM', () => { closeApp(server); });

export default app;

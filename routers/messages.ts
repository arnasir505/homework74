import express from 'express';
import fs from 'fs';
import { Message } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', (_req, res) => {
  return res.send('[]');
});

messagesRouter.post('/create', (req, res) => {
  const date = new Date().toISOString();
  const messageData: Message = {
    message: req.body.message,
    datetime: date,
  };
  fs.writeFileSync(
    `./messages/${'date'}.txt`,
    JSON.stringify(messageData, null, 2)
  );
  return res.send(messageData);
});

export default messagesRouter;

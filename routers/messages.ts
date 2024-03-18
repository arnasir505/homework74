import express from 'express';

const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
  res.send(`[]`);
});

messagesRouter.post('/create', (req, res) => {
  res.send(req.body);
});

export default messagesRouter;

import express from 'express';
import messagesRouter from './routers/messages';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

app.get('/', (_req, res) => {
  return res.send('Home');
});

app.listen(port, () => {
  console.log(`Server started at http://127.0.0.1:${port}`);
});

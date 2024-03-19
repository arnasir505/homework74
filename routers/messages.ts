import express from 'express';
import fs from 'fs';
import { Message } from '../types';

const messagesRouter = express.Router();
const path = './messages';
let messagesArr: Message[] = [];

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const readFiles = async () => {
  messagesArr = [];
  const files = await fs.promises.readdir(path);
  files.forEach((file) => {
    const filePath = path + '/' + file;
    const contents = fs.readFileSync(filePath, { encoding: 'utf-8' });
    messagesArr.push(JSON.parse(contents));
  });
};

readFiles().catch(console.error);

messagesRouter.get('/', async (_req, res) => {
  if (messagesArr.length < 5) {
    return res.send(messagesArr);
  }
  const last5Messages = messagesArr.slice(
    messagesArr.length - 5,
    messagesArr.length
  );
  return res.send(last5Messages);
});

messagesRouter.post('/create', async (req, res) => {
  const date = new Date().toISOString();
  const messageData: Message = {
    message: req.body.message,
    datetime: date,
  };
  await fs.promises.writeFile(
    `./messages/${date}.txt`,
    JSON.stringify(messageData, null, 2)
  );
  readFiles().catch(console.error);
  return res.send(messageData);
});

export default messagesRouter;

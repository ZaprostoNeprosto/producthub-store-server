import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import data from './data/supermarket.js'
import descriptions from './data/descriptions.js'

const app = express();
const PORT = process.env.PORT || 3000;
const regex = /^id([A-Za-z0-9]+)\.json$/;

app.use(cors());

app.get('/supermarket.json', (req, res) => {
  res.json(data);
});

app.get(`/productinfo/*`, (req, res) => {

  if (req.url.length > 13 && req.url.slice(13).match(regex)) {
    const id = req.url.slice(13).match(regex)[1]
    const dataRes = descriptions[id] ?? 'null'
    res.json(dataRes);
  } else {
    res.json('null')
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

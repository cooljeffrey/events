import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', function (req, res, next) {
  res.json({ hello: 'world' });
});

export default apiRouter;

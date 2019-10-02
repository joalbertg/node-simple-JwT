const { Router } = require('express');
const router = Router();

const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = await req.body;
  const user = new User({ username, email });
  user.password = await user.encryptPassword(password);
  await user.save();

  res.json({ message: 'User created'});
});

router.post('/signin', (req, res, next) => {
  res.json('signin')
});

router.get('/me', (req, res, next) => {
  res.json('me')
});

module.exports = router;

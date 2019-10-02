const { Router } = require('express');

const jwt = require('jsonwebtoken');

const router = Router();
const User = require('../models/User');
const config = require('../config');

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = await req.body;
  const user = new User({ username, email });
  user.password = await user.encryptPassword(password);
  await user.save();

  const token = jwt.sign({id: user._id}, config.secret, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ auth: true, token });
});

router.get('/me', async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  }

  const decode = jwt.verify(token, config.secret);
  const user = await User.findById(decode.id, { password: 0 });

  if(!user) {
    return res.status(404).send('No user found');
  }

  res.json(user);
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email: email});

  if(!user) {
    return res.status(404).send("The email doesn't exists");
  }

  const validPassword = await user.validatePassword(password);

  if(!validPassword) {
    return res.status(401).send({auth: false, token: null});
  }

  const token = jwt.sign({id: user._id}, config.secret, {
    expiresIn: 60 * 60 * 24
  });

  res.json({auth: true, token})
});

module.exports = router;

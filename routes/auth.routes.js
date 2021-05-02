const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost, googleAuth } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validation.middleware');

const router = Router();

router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  
  validateFields
], loginPost);


router.post('/googleLogin', [
  check('id_token', 'El ID Token es obligatorio').not().isEmpty(),
  validateFields
], googleAuth);

module.exports = router;
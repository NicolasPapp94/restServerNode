const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validation.middleware');

const router = Router();

router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  
  validateFields
],loginPost);

module.exports = router;
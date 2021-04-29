const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validation.middleware');
const { roleValidate,emailExist, idExist } = require('../helpers/validators.helper');

const router = Router();

router.get('/', userGet);

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La password es obligatoria y de mas de 6 letras').isLength({ min: 6 }),
  check('email', 'El email no es valido').isEmail(),
  check('email').custom(emailExist),
  check('role').custom(roleValidate),
  validateFields
] ,userPost);

router.put('/:userID', [
  check('userID', 'No es un ID valido').isMongoId(),
  check('userID').custom(idExist),
  check('role').custom(roleValidate),
  validateFields
],userPut);

router.patch('/', userPatch);

router.delete('/:userID', [
  check('userID', 'No es un ID valido').isMongoId(),
  check('userID').custom(idExist),
  validateFields
], userDelete);


module.exports = router;
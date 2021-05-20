const { Router } = require('express');
const { check } = require('express-validator');

const { categoriesGet, categoriesPost, categoriesGetByID, categoriesPut, categoriesDelete } = require('../controllers/categories.controller');

const { idCategoryExist } = require('../helpers/validators.helper');
const { validateJWT } = require('../middlewares/jwt-validation.middleware');
const { tieneRol } = require('../middlewares/role-validation.middleware');
const { validateFields } = require('../middlewares/validation.middleware');


const router = Router();

router.post('/', [
  validateJWT,
  check('name','El nombre es obligatorio').not().isEmpty(),
  validateFields
], categoriesPost);

router.get('/', categoriesGet);

router.get('/:CategoryID', [
  check('CategoryID', 'No es un ID valido').isMongoId(),
  check('CategoryID').custom(idCategoryExist),
  validateFields
], categoriesGetByID);

// ACTUALIZAR - PRIVADO CON TOKEN VALIDO
router.put('/:CategoryID', [
  validateJWT,
  check('CategoryID', 'No es un ID valido').isMongoId(),
  check('CategoryID').custom(idCategoryExist),
  check('name').not().isEmpty(),
  validateFields
], categoriesPut);


// BORRAR - SOLO ADMIN
router.delete('/:CategoryID', [
  validateJWT,
  check('CategoryID', 'No es un ID valido').isMongoId(),
  check('CategoryID').custom(idCategoryExist),
  tieneRol('ADMIN'),
  validateFields
], categoriesDelete);
 


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { productsPost, productsGet, productsGetByID, productsPut, productsDelete } = require('../controllers/products.controller');

const { idCategoryExist, idProductExist } = require('../helpers/validators.helper');
const { validateJWT } = require('../middlewares/jwt-validation.middleware');
const { tieneRol } = require('../middlewares/role-validation.middleware');
const { validateFields } = require('../middlewares/validation.middleware');

const router = Router();

router.post('/', [
  validateJWT,
  check('categoryID', 'No es un ID valido').isMongoId(),
  check('categoryID').custom(idCategoryExist),
  check('name').not().isEmpty(),
  validateFields
], productsPost);

router.get('/', productsGet);

router.get('/:ProductID', [
  check('ProductID', 'No es un ID valido').isMongoId(),
  check('ProductID').custom(idProductExist),
  validateFields
], productsGetByID);

// ACTUALIZAR - PRIVADO CON TOKEN VALIDO
router.put('/:productID', [
  validateJWT,
  check('productID').custom(idProductExist),
  validateFields
], productsPut);

// BORRAR - SOLO ADMIN
router.delete('/:productID', [
  validateJWT,
  check('productID', 'No es un ID valido').isMongoId(),
  check('productID').custom(idProductExist),
  tieneRol('ADMIN'),
  validateFields
], productsDelete);


module.exports = router;
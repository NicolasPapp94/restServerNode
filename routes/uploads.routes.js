const { Router } = require('express');
const { check } = require('express-validator');

const { updateImageCloud, getFile } = require('../controllers/uploads.controller');
const { allowedColections } = require('../helpers/validators.helper');
const { validateFields, fileValidation } = require('../middlewares/index.middlewares');

const router = Router();


router.put('/:colection/:ID', [
  fileValidation,
  check('ID', 'Debe ser un ID de Mongo').isMongoId(),
  check('colection').custom(c => allowedColections(c, ['users', 'products'])),
  validateFields
], updateImageCloud);

router.get('/:colection/:ID',
  [check('ID', 'Debe ser un ID de Mongo').isMongoId(),
  check('colection').custom(c => allowedColections(c, ['users', 'products'])),
  validateFields], getFile)


module.exports = router;
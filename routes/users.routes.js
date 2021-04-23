const { Router } = require('express');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/users.controller');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:userID', userPut);

router.patch('/', userPatch);

router.delete('/', userDelete);


module.exports = router;
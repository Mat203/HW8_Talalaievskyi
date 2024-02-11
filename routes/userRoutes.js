const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUserListController);
router.get('/new', userController.createUser);
router.get('/:id', userController.getUserByIdController);
router.get('/:id/update', userController.getUserUpdateFormController);

router.post('/', userController.postUserController);
router.put('/:id', userController.putUserController);
router.patch('/:id', userController.patchUser);
router.delete('/:id', userController.deleteUserController);

module.exports = router;
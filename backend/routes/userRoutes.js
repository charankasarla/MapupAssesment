const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', userController.login);

const adminRoutes = express.Router();
adminRoutes.use(authMiddleware(['admin']));
adminRoutes.get('/getData', userController.getTaxiData);
adminRoutes.post('/ingest', userController.ingestData);

const managerRoutes = express.Router();
managerRoutes.use(authMiddleware(['manager']));
managerRoutes.get('/getData', userController.getTaxiData);
managerRoutes.post('/ingest', userController.ingestData);

const userRoutes = express.Router();
userRoutes.use(authMiddleware(['user']));
userRoutes.get('/getData', userController.getTaxiData);

router.use('/admin', adminRoutes);
router.use('/manager', managerRoutes);
router.use('/user', userRoutes);

module.exports = router;

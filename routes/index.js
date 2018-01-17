const express = require('express');
const weatherController = require('../controllers/weatherController');
const router = express.Router();


router.get('/', weatherController.forecast);
router.post('/', weatherController.search);




module.exports = router;

const express = require('express');
const router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlDetail = require('../controllers/detail');

/* Home */
router.get('/', ctrlHome.home);

/* Detail */
router.get('/:movieid', ctrlDetail.detail);

module.exports = router;
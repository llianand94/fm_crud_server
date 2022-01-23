const express = require('express');
const ThingController = require('../controllers/thing.controller.js');

const router = express.Router();


router
  .post('/thing', ThingController.createThing)
  .get('/thing', ThingController.getAllThings);

router.route('/thing/:id')
  .get(ThingController.getThing)
  .patch(ThingController.updateThing)
  .delete(ThingController.deleteThing);


module.exports = router;  
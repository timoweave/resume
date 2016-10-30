const models = require('./models');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;

router.route('/').get(get_index);
router.route('/users').get(get_restful(models.User));
router.route('/contacts').get(get_restful(models.Contact));
router.route('/educations').get(get_restful(models.Education));
router.route('/technicals').get(get_restful(models.Technical));
router.route('/experiences').get(get_restful(models.Experience));

// functions

function get_index(req, res) {
  models.About.findOne({}, {}).then((result) => {
    res.status(200).json(result);
  });
}

function add_route(router, route_name, mongoose_model) {
  router
  .route(route_name)
  .get(get_restful(mongoose_model));
}

function get_restful(model) {
  return (req, res) => {
    model.find({}).then((data) => {
      res.status(200).json(data);
    }).catch((error) => {
      res.status(400).json({error});
    });
  }
}
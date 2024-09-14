const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonceController');
const ressourceController = require('../controllers/ressourceController');
const Annance = require("../models/annonce");
const Ressource = require("../models/ressource");
const multer = require('multer');
const path = require("path");

/*******************store in file uploads***********************/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    if (path.extname(file.originalname) === ".jpg"  || path.extname(file.originalname) === ".png")
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    else
      cb("Erreur")
  }
})
const upload = multer({ storage: storage });

router.get('/', annonceController.getAllWithRessources);

router.get('/annonce', annonceController.getAllWithRessources);

router.get('/annonce/add', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  res.render('annances/create', { currentDate: currentDate });
});
router.get('/annonce/edite/:id', async (req, res) => {
  try {
    const annonce = await Annance.getById(req.params.id);
    const dateDepot = annonce.dateDepot.toISOString().split('T')[0];
    res.render('annances/edite', { dateDepot: dateDepot, annonce: annonce });
  } catch (error) {
    console.error(`Error fetching annonce: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/annonce', annonceController.add);
router.get('/annonce/:id', annonceController.getById);
router.get('/annonce/:id/ressources', annonceController.getOneWithRessources);
router.post('/annonce/:id/update', annonceController.update);
router.post('/annonce/:id', annonceController.delete);

router.get('/ressource', ressourceController.getAll);
router.get('/ressource/add', (req, res) => {
  res.render('ressources/create');
});
router.get('/ressource/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const ressource = await Ressource.getById(id);
    res.render('ressources/edite', { ressource: ressource });
  } catch (error) {
    console.error(`Error fetching ressource: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/ressource/add', upload.single('url_image'), ressourceController.add);
router.get('/ressource/:id', ressourceController.getById);
router.post('/ressource/:id', upload.single('url_image'), ressourceController.update);
router.post('/ressource/:id', ressourceController.delete);

module.exports = router;

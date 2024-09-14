const Ressource = require('../models/ressource');
const fs = require('fs');
const path = require('path');

class RessourceController {
  static async getAll(req, res) {
    try {
      const ressources = await Ressource.getAll();
      res.status(200).json(ressources);
    } catch (error) {
      console.error('Error fetching ressources:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;
    try {
      const ressource = await Ressource.getById(id);
      if (!ressource) {
        res.status(404).json({ message: 'Ressource not found' });
      } else {
        res.status(200).json(ressource);
      }
    } catch (error) {
      console.error('Error fetching ressource:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async add(req, res) {
    const { type, est_principale, code_ref } = req.body;
    const url = req.file.filename;

    try {
      await Ressource.add(url, type, est_principale, code_ref);
      res.status(201).json({ message: 'Ressource added successfully' });
    } catch (error) {
      console.error('Error adding ressource:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  /*static async update(req, res) {
    const id = req.params.id;
    const { type, est_principale, code_ref } = req.body;
    let url = req.body.url; 
    if (req.file) {
      url = req.file.filename; 
    }
    try {
      await Ressource.update(id, url, type, est_principale, code_ref);
      res.status(200).json({ message: 'Ressource updated successfully' });
    } catch (error) {
      console.error('Error updating ressource:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }*/

  static async update(req, res) {
    const id = req.params.id;
    const { type, est_principale, code_ref } = req.body;
    let url = req.body.url; 
    try {
      await Ressource.update(id, url, type, est_principale, code_ref);
      if (req.file) {
        const uploadDir = './uploads'; 
        fs.renameSync(req.file.path, path.join(uploadDir, url));
      }
      res.status(200).json({ message: 'Ressource updated successfully' });
    } catch (error) {
      console.error('Error updating ressource:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      await Ressource.delete(id);
      res.status(200).json({ message: 'Ressource deleted successfully' });
    } catch (error) {
      console.error('Error deleting ressource:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = RessourceController;

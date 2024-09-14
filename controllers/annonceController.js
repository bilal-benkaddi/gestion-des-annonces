const Annonce = require("../models/annonce");

class AnnanceController {
  static async getAllWithRessources(req, res) {
    const page = parseInt(req.query.page) || 1;
    try {
      const { annonces, totalPages } = await Aannonce.getAllWithRessources(page);
      if (totalPages < page) {
        return res.status(404).json({ message: "Page introuvable" });
      }

      res
        .status(200)
        .render("annonces/index", {
          annonces: annonces,
          totalPages: totalPages,
          currentPage: page,
        });
    } catch (error) {
      console.error("Error fetching annonces:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;
    try {
      const annonce = await Annonce.getById(id);
      if (!annonce) {
        res.status(404).json({ message: "Annonce not found" });
      } else {
        res.status(200).json(annonce);
      }
    } catch (error) {
      console.error("Error fetching annonce:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOneWithRessources(req, res) {
    const id = req.params.id;
    try {
      const annonce = await Annonce.getOneWithRessources(id);
      if (!annonce) {
        res.status(404).json({ message: "Annonce not found" });
      } else {
        res.status(200).render("annonces/show",{annonce:annonce});
      }
    } catch (error) {
      console.error("Error fetching annonce with ressources:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async add(req, res) {
    const { titre, dateDepot, descr, prix } = req.body;
    try {
      await Annonce.add(titre, dateDepot, descr, prix);
      res.status(201).json({ message: "Annonce added successfully" });
    } catch (error) {
      console.error("Error adding annonce:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const { titre, dateDepot, descr, prix } = req.body;
    try {
      await Annonce.update(id, titre, dateDepot, descr, prix);
      res.status(200).json({ message: "Annonce updated successfully" });
    } catch (error) {
      console.error("Error updating annonce:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      await Annonce.delete(id);
      res.status(200).json({ message: "Annonce deleted successfully" });
    } catch (error) {
      console.error("Error deleting annonce:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = AnnanceController;

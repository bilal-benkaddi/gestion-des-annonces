const db = require("../config/db");
const Ressource = require("./ressource");

class Annonce {
  static async getAllWithRessources(page) {
    const limit = 3;
    const offset = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS total FROM annonce", async (err, result) => {
        if (err) {
          console.error(`Error counting annances: ${err}`);
          reject(err);
        } else {
          const total = result[0].total;
          const totalPages = Math.ceil(total / limit);
          if (page < 0) {
            resolve({ annances: "Page introuvable" });
            return;
          }
          db.query(
            "SELECT * FROM annonce LIMIT ? OFFSET ?",
            [limit, offset],
            async (err, annances) => {
              if (err) {
                console.error(`Error fetching annances: ${err}`);
                reject(err);
              } else {
                for (let i = 0; i < annances.length; i++) {
                  try {
                    const ressources = await Ressource.getByCodeRef(
                      annances[i].code
                    );
                    annances[i].ressources = ressources;
                  } catch (error) {
                    console.error(
                      "Error fetching ressources for annonce:",
                      error
                    );
                    reject(error);
                  }
                }
                resolve({ annances, totalPages });
              }
            }
          );
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM annonce WHERE code = ?", [id], (err, result) => {
        if (err) {
          console.error(`Error fetching annonce: ${err}`);
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static async getOneWithRessources(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const annonce = await this.getById(id);
        const ressources = await Ressource.getByCodeRef(annonce.code);
        annonce.ressources = ressources;
        resolve(annonce);
      } catch (error) {
        console.error(`Error fetching annonce with ressources: ${error}`);
        reject(error);
      }
    });
  }

  static add(titre, dateDepot, descr, prix) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO annonce (titre, dateDepot, descr, prix) VALUES (?, ?, ?, ?)",
        [titre, dateDepot, descr, prix],
        (err, result) => {
          if (err) {
            console.error(`Error adding annonce: ${err}`);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static update(id, titre, dateDepot, descr, prix) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE annonce SET titre = ?, dateDepot = ?, descr = ?, prix = ? WHERE code = ?",
        [titre, dateDepot, descr, prix, id],
        (err, result) => {
          if (err) {
            console.error(`Error updating annonce: ${err}`);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM annonce WHERE code = ?", [id], (err, result) => {
        if (err) {
          console.error(`Error deleting annonce: ${err}`);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Annonce;

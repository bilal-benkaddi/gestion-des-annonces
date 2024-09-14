const db = require('../config/db');

class Ressource {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ressource', (err, ressources) => {
        if (err) {
          console.error(`Error fetching ressources: ${err}`);
          reject(err);
        } else {
          resolve(ressources);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ressource WHERE num = ?', [id], (err, result) => {
        if (err) {
          console.error(`Error fetching ressource: ${err}`);
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static add(url, type, est_principale, code_ref) {
    return new Promise((resolve, reject) => {
      
      db.query('INSERT INTO ressource (url, type, est_principale, code_ref) VALUES (?, ?, ?, ?)', [url, type, est_principale, code_ref], (err, result) => {
        if (err) {
          console.error(`Error adding ressource: ${err}`);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static update(id, url, type, est_principale, code_ref) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ressource SET url = ?, type = ?, est_principale = ?, code_ref = ? WHERE num = ?', [url, type, est_principale, code_ref, id], (err, result) => {
        if (err) {
          console.error(`Error updating ressource: ${err}`);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ressource WHERE num = ?', [id], (err, result) => {
        if (err) {
          console.error(`Error deleting ressource: ${err}`);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getByCodeRef(code) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ressource WHERE code_ref = ?', [code], (err, ressources) => {
        if (err) {
          console.error(`Error fetching ressources for code ${code}: ${err}`);
          reject(err);
        } else {
          resolve(ressources);
        }
      });
    });
  }
}

module.exports = Ressource;

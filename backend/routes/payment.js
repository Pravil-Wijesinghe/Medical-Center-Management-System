const express = require('express');
const router = express.Router();
const db = require('../DBConnect');

router.get('/payments', (req, res) => {
  const query = `
    SELECT p.Doctor_NIC, p.Patients, p.Payment, p.Issue_Date, d.First_Name, d.Last_Name
    FROM payment p
    JOIN doctor d ON p.Doctor_NIC = d.NIC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;

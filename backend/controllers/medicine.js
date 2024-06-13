// controllers/medicine.js

const connection = require('../DBConnect');

// Utility function to format dates
const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

const getAllMedicines = (req, res) => {
    const query = 'SELECT * FROM medicine';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching medicines:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        results = results.map(result => {
            result.mgf_date = formatDate(result.mgf_date);
            result.exp_date = formatDate(result.exp_date);
            return result;
        });
        res.status(200).json(results);
    });
};

const getMedicineById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM medicine WHERE Medicine_ID = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching medicine:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Medicine not found' });
            return;
        }
        let result = results[0];
        result.mgf_date = formatDate(result.mgf_date);
        result.exp_date = formatDate(result.exp_date);
        res.status(200).json(result);
    });
};

const updateMedicine = (req, res) => {
    const { id } = req.params;
    const { name, description, supplying_price, selling_price, exp_date, mgf_date, quantity } = req.body;

    const query = `UPDATE medicine SET name = ?, description = ?, supplying_price = ?, selling_price = ?, exp_date = ?, mgf_date = ?, quantity = ?
                   WHERE Medicine_ID = ?`;
    const values = [name, description || null, supplying_price, selling_price, exp_date, mgf_date || null, quantity, id];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Error updating medicine:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Medicine updated successfully' });
    });
};

const addMedicine = (req, res) => {
    const { name, description, supplying_price, selling_price, exp_date, mgf_date, quantity } = req.body;

    const query = `INSERT INTO medicine (name, description, supplying_price, selling_price, exp_date, mgf_date, quantity)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, description || null, supplying_price, selling_price, exp_date, mgf_date || null, quantity];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting medicine:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Medicine added successfully', id: result.insertId });
    });
};

module.exports = { getAllMedicines, getMedicineById, updateMedicine, addMedicine };

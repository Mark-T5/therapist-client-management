const db = require('../db');

exports.getAllClients = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClient = async (req, res) => {
  const { name, email, phone_number, regularity } = req.body;
  try {
    await db.query(
      'INSERT INTO clients (name, email, phone_number, regularity) VALUES (?, ?, ?, ?)',
      [name, email, phone_number, regularity]
    );
    res.status(201).json({ message: 'Client created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  const { name, email, phone_number, regularity } = req.body;
  try {
    await db.query(
      'UPDATE clients SET name=?, email=?, phone_number=?, regularity=? WHERE id=?',
      [name, email, phone_number, regularity, req.params.id]
    );
    res.json({ message: 'Client updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await db.query('DELETE FROM clients WHERE id=?', [req.params.id]);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

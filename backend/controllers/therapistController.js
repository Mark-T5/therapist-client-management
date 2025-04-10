const db = require('../db');

exports.getAllTherapists = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM therapists');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTherapist = async (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  try {
    await db.query(
      'INSERT INTO therapists (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)',
      [title, name, email, location, years_of_practice, availability]
    );
    res.status(201).json({ message: 'Therapist created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTherapist = async (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  try {
    await db.query(
      'UPDATE therapists SET title=?, name=?, email=?, location=?, years_of_practice=?, availability=? WHERE id=?',
      [title, name, email, location, years_of_practice, availability, req.params.id]
    );
    res.json({ message: 'Therapist updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTherapist = async (req, res) => {
  try {
    await db.query('DELETE FROM therapists WHERE id=?', [req.params.id]);
    res.json({ message: 'Therapist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

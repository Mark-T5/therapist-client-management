const db = require('../db');

exports.getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sessions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSession = async (req, res) => {
  const { therapist_id, client_id, notes, date, length } = req.body;
  try {
    await db.query(
      'INSERT INTO sessions (therapist_id, client_id, notes, date, length) VALUES (?, ?, ?, ?, ?)',
      [therapist_id, client_id, notes, date, length]
    );
    res.status(201).json({ message: 'Session created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSession = async (req, res) => {
  const { therapist_id, client_id, notes, date, length } = req.body;
  try {
    await db.query(
      'UPDATE sessions SET therapist_id=?, client_id=?, notes=?, date=?, length=? WHERE id=?',
      [therapist_id, client_id, notes, date, length, req.params.id]
    );
    res.json({ message: 'Session updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await db.query('DELETE FROM sessions WHERE id=?', [req.params.id]);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

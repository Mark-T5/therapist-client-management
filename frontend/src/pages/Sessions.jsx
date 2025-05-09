import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { mockSessions, mockTherapists, mockClients } from "../Data/mockData";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    therapist_id: "",
    client_id: "",
    notes: "",
    date: "",
    length: 60,
  });

  const [editMode, setEditMode] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    try {
      const storedSessions = JSON.parse(localStorage.getItem("sessions"));
      const storedTherapists = JSON.parse(localStorage.getItem("therapists"));
      const storedClients = JSON.parse(localStorage.getItem("clients"));

      setSessions(storedSessions || mockSessions);
      setTherapists(storedTherapists || mockTherapists);
      setClients(storedClients || mockClients);

      if (!storedSessions) localStorage.setItem("sessions", JSON.stringify(mockSessions));
      setLoading(false);
    } catch (err) {
      setError("Failed to load session data");
      setLoading(false);
    }
  }, []);

  const saveSessions = (updatedList) => {
    setSessions(updatedList);
    localStorage.setItem("sessions", JSON.stringify(updatedList));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "length" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...sessions];

    if (editMode) {
      const index = updatedList.findIndex((s) => s.id === currentSessionId);
      updatedList[index] = { ...formData, id: currentSessionId };
    } else {
      const newSession = { ...formData, id: Date.now() };
      updatedList.push(newSession);
    }

    saveSessions(updatedList);
    resetForm();
  };

  const handleEdit = (session) => {
    setFormData({
      therapist_id: session.therapist_id,
      client_id: session.client_id,
      notes: session.notes,
      date: new Date(session.date).toISOString().split("T")[0],
      length: session.length,
    });
    setEditMode(true);
    setCurrentSessionId(session.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      const updatedList = sessions.filter((s) => s.id !== id);
      saveSessions(updatedList);
    }
  };

  const resetForm = () => {
    setFormData({
      therapist_id: "",
      client_id: "",
      notes: "",
      date: "",
      length: 60,
    });
    setEditMode(false);
    setCurrentSessionId(null);
  };

  const getTherapistName = (id) => {
    const t = therapists.find((t) => t.id === parseInt(id));
    return t ? t.name : "Unknown";
  };

  const getClientName = (id) => {
    const c = clients.find((c) => c.id === parseInt(id));
    return c ? c.name : "Unknown";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) return <div className="container">Loading sessions...</div>;

  return (
    <div className="container page-wrapper">
      <Navbar />
      <h1 className="page-title">Session Management</h1>
      {error && <div className="alert">{error}</div>}

      <div className="form-section">
        <h2 className="page-title">{editMode ? "Edit Session" : "Add New Session"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label>Therapist</label>
              <select
                name="therapist_id"
                value={formData.therapist_id}
                onChange={handleInputChange}
                className="select"
                required
              >
                <option value="">Select Therapist</option>
                {therapists
                  .filter((t) => t.availability === "TAKING CLIENTS")
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-field">
              <label>Client</label>
              <select
                name="client_id"
                value={formData.client_id}
                onChange={handleInputChange}
                className="select"
                required
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-field">
              <label>Length (minutes)</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                className="input"
                min="15"
                step="15"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "1rem" }}>
            <div className="form-field">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="textarea"
                rows="2"
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="button button-blue">
              {editMode ? "Update Session" : "Add Session"}
            </button>
            {editMode && (
              <button type="button" onClick={resetForm} className="button button-gray">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>Date</th>
              <th>Therapist</th>
              <th>Client</th>
              <th>Length</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan="6">No sessions found</td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr key={s.id}>
                  <td>{formatDate(s.date)}</td>
                  <td>{getTherapistName(s.therapist_id)}</td>
                  <td>{getClientName(s.client_id)}</td>
                  <td>{s.length}</td>
                  <td>{s.notes}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(s)} className="button button-yellow">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="button button-red">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sessions;

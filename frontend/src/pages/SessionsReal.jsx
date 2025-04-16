import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

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
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sRes, tRes, cRes] = await Promise.all([
          axios.get("http://localhost:5000/api/sessions"),
          axios.get("http://localhost:5000/api/therapists"),
          axios.get("http://localhost:5000/api/clients"),
        ]);
        setSessions(sRes.data);
        setTherapists(tRes.data);
        setClients(cRes.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "length" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/sessions/${currentSessionId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/sessions", formData);
      }
      resetForm();
      fetchSessions();
    } catch (err) {
      setError(
        editMode ? "Failed to update session" : "Failed to create session"
      );
      console.error(err);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sessions");
      setSessions(response.data);
    } catch (err) {
      setError("Failed to fetch sessions");
      console.error(err);
    }
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sessions/${id}`);
        fetchSessions();
      } catch (err) {
        setError("Failed to delete session");
        console.error(err);
      }
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
    const t = therapists.find((t) => t.id === id);
    return t ? t.name : "Unknown";
  };

  const getClientName = (id) => {
    const c = clients.find((c) => c.id === id);
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
              sessions.map((session) => (
                <tr key={session.id}>
                  <td>{formatDate(session.date)}</td>
                  <td>{getTherapistName(session.therapist_id)}</td>
                  <td>{getClientName(session.client_id)}</td>
                  <td>{session.length}</td>
                  <td>{session.notes}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(session)} className="button button-yellow">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(session.id)} className="button button-red">
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
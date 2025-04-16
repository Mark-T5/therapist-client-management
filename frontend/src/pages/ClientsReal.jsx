import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    regularity: "WEEKLY",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/clients/${currentClientId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/clients", formData);
      }
      resetForm();
      fetchClients();
    } catch (err) {
      setError("Error saving client");
    }
  };

  const handleEdit = (client) => {
    setFormData({ ...client });
    setEditMode(true);
    setCurrentClientId(client.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this client?")) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        fetchClients();
      } catch (err) {
        setError("Failed to delete client");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      regularity: "WEEKLY",
    });
    setEditMode(false);
    setCurrentClientId(null);
  };

  if (loading) return <div className="container">Loading clients...</div>;

  return (
    <div className="container page-wrapper">
      <Navbar />
      <h1 className="page-title">Client Management</h1>
      {error && <div className="alert">{error}</div>}

      <div className="form-section">
        <h2 className="page-title">{editMode ? "Edit Client" : "Add New Client"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {["name", "email", "phone_number"].map((field) => (
              <div className="form-field" key={field}>
                <label>{field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
                <input
                  type={field === "phone_number" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            ))}
            <div className="form-field">
              <label>Appointment Regularity</label>
              <select
                name="regularity"
                value={formData.regularity}
                onChange={handleInputChange}
                className="select"
              >
                <option value="WEEKLY">WEEKLY</option>
                <option value="MONTHLY">MONTHLY</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="button button-blue">
              {editMode ? "Update Client" : "Add Client"}
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Regularity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="5">No clients found</td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone_number}</td>
                  <td>{c.regularity}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(c)} className="button button-yellow">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="button button-red">
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

export default Clients;

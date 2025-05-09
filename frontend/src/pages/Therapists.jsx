import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { mockTherapists } from "../Data/mockData";

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    location: "",
    years_of_practice: 0,
    availability: "TAKING CLIENTS",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentTherapistId, setCurrentTherapistId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("therapists");
    if (stored) {
      setTherapists(JSON.parse(stored));
    } else {
      localStorage.setItem("therapists", JSON.stringify(mockTherapists));
      setTherapists(mockTherapists);
    }
    setLoading(false);
  }, []);

  const saveTherapists = (updatedList) => {
    setTherapists(updatedList);
    localStorage.setItem("therapists", JSON.stringify(updatedList));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_of_practice" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...therapists];

    if (editMode) {
      const index = updatedList.findIndex((t) => t.id === currentTherapistId);
      updatedList[index] = { ...formData, id: currentTherapistId };
    } else {
      const newTherapist = { ...formData, id: Date.now() };
      updatedList.push(newTherapist);
    }

    saveTherapists(updatedList);
    resetForm();
  };

  const handleEdit = (therapist) => {
    setFormData({ ...therapist });
    setEditMode(true);
    setCurrentTherapistId(therapist.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this therapist?")) {
      const updatedList = therapists.filter((t) => t.id !== id);
      saveTherapists(updatedList);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      email: "",
      location: "",
      years_of_practice: 0,
      availability: "TAKING CLIENTS",
    });
    setEditMode(false);
    setCurrentTherapistId(null);
  };

  if (loading) return <div className="container">Loading therapists...</div>;

  return (
    <div className="container page-wrapper">
      <Navbar />
      <h1 className="page-title">Therapist Management</h1>
      {error && <div className="alert">{error}</div>}

      <div className="form-section">
        <h2 className="page-title">{editMode ? "Edit Therapist" : "Add New Therapist"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {["title", "name", "email", "location", "years_of_practice"].map((field) => (
              <div className="form-field" key={field}>
                <label>{field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
                <input
                  type={field === "years_of_practice" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            ))}
            <div className="form-field">
              <label>Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="select"
              >
                <option value="TAKING CLIENTS">TAKING CLIENTS</option>
                <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="button button-blue">
              {editMode ? "Update Therapist" : "Add Therapist"}
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
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Years</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapists.length === 0 ? (
              <tr>
                <td colSpan="7">No therapists found</td>
              </tr>
            ) : (
              therapists.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.location}</td>
                  <td>{t.years_of_practice}</td>
                  <td>{t.availability}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(t)} className="button button-yellow">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="button button-red">
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

export default Therapists;

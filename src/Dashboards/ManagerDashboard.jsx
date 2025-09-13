import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [showAssigned, setShowAssigned] = useState(false);

  const token = localStorage.getItem("token"); // JWT token

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const res = await axios.get(
        "https://task-manager-server-5.onrender.com/ticket/getAllEmployeeList",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployees(res.data.data || []);
    } catch (err) {
      console.error("Fetch Employees Error:", err);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const res = await axios.get(
        "https://task-manager-server-5.onrender.com/ticket/allTickets",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(res.data.data || []);
    } catch (err) {
      console.error("Fetch Tickets Error:", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.assignedTo) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const res = await axios.post(
        "https://task-manager-server-5.onrender.com/ticket/create",
        {
          title: form.title,
          description: form.description,
          assignTo: form.assignedTo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Ticket created successfully");
      setForm({ title: "", description: "", assignedTo: "" });
      fetchTickets(); // Refresh tickets
    } catch (err) {
      console.error("Create Ticket Error:", err);
      alert("Error creating ticket");
    }
  };

  return (
    <div className="manager-dashboard" style={{ padding: "20px" }}>
      <h1>Manager Dashboard</h1>

      {/* Create Ticket Form */}
      <div className="create-ticket" style={{ marginBottom: "40px" }}>
        <h2>Create New Ticket</h2>
        <form
          onSubmit={handleCreateTicket}
          style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={{ marginBottom: "10px", padding: "8px" }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ marginBottom: "10px", padding: "8px" }}
          />
          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            style={{ marginBottom: "10px", padding: "8px" }}
          >
            <option value="">Select Employee</option>
            {loadingEmployees ? (
              <option>Loading...</option>
            ) : (
              employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.email})
                </option>
              ))
            )}
          </select>
          <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
            Create Ticket
          </button>
        </form>
      </div>

      {/* Tickets List */}
      <div className="tickets-list">
        <h2>All Tickets</h2>
        {loadingTickets ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="ticket-card"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p>Status: {ticket.status}</p>
              <p>
                Assigned To: {ticket.assignTo?.name} ({ticket.assignTo?.email})
              </p>
              <p>
                Created By: {ticket.createdBy?.name} ({ticket.createdBy?.email})
              </p>
            </div>
          ))
        )}
      </div>

      {/* Show Assigned Tickets */}
      <button
        className="show-btn"
        onClick={() => setShowAssigned(!showAssigned)}
        style={{ padding: "10px", marginTop: "20px", cursor: "pointer" }}
      >
        {showAssigned ? "Hide Assigned Tickets" : "Show Assigned Tickets"}
      </button>

      {showAssigned && (
        <div className="employees-list" style={{ marginTop: "20px" }}>
          {employees.length === 0 ? (
            <p>No employees found</p>
          ) : (
            employees.map((employee) => (
              <div
                key={employee._id}
                className="employee-card"
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>

                <ul>
                  {tickets
                    .filter((ticket) => ticket.assignTo._id === employee._id)
                    .map((ticket) => (
                      <li key={ticket._id}>
                        <strong>{ticket.title}</strong> - {ticket.status}
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;















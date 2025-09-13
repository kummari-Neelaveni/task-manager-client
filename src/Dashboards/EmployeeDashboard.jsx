// EmployeeDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // stored after login
  const API = "https://task-manager-server-5.onrender.com/employee";
 // change if deployed

  // Fetch assigned tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/viewTickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update ticket status
  const updateStatus = async (ticketId, newStatus) => {
    try {
      const res = await axios.put(
        `${API}/updateTicketStatus/${ticketId}`,
        { taskStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments for a ticket
  const fetchComments = async (ticketId) => {
    setSelectedTicket(ticketId);
    try {
      const res = await axios.get(`${API}/viewCommentsTicket/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add comment
  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${API}/addCommentsTiTicket/${selectedTicket}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments(selectedTicket);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket._id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </p>
              <p>
                <strong>Created By:</strong> {ticket.createdBy?.name} (
                {ticket.createdBy?.username})
              </p>

              {/* Status Update Dropdown */}
              <select
                value={ticket.status}
                onChange={(e) => updateStatus(ticket._id, e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              {/* Comments */}
              <button onClick={() => fetchComments(ticket._id)}>
                View Comments
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Comments Modal */}
      {selectedTicket && (
        <div className="comments-section">
          <h2>Comments</h2>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((c, i) => (
                <p key={i}>
                  <strong>{c.commentedBy}</strong>: {c.text}
                </p>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
          <button onClick={() => setSelectedTicket(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;


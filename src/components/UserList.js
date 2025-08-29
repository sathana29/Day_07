import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteDoc(doc(db, "users", userToDelete.id));
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("All fields are required!");
      return;
    }
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, name, email, phone } : u
        )
      );
      setEditingUser(null);
      setName("");
      setEmail("");
      setPhone("");
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user");
    }
  };

  const sortBy = (key) => {
    let newOrder = "asc";
    if (sortKey === key) {
      newOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortKey(key);
    setSortOrder(newOrder);

    const sorted = [...users].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase() || "";
      const valB = b[key]?.toString().toLowerCase() || "";
      if (valA < valB) return newOrder === "asc" ? -1 : 1;
      if (valA > valB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSortArrow = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Registered Users
      </h2>

    
      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <i
          className="bi bi-search"
          style={{
            position: "absolute",
            top: "50%",
            left: "12px",
            transform: "translateY(-50%)",
            color: "#999",
          }}
        ></i>
        <input
          type="search"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px 12px 38px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      
      {editingUser && (
        <form
          onSubmit={handleUpdate}
          style={{
            marginBottom: "2rem",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#4a3f6b" }}>
            <i className="bi bi-pencil-square me-2"></i>Update User
          </h3>

          <label htmlFor="name" style={{ fontWeight: "600" }}>
            <i className="bi bi-person-fill me-1"></i>Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <label htmlFor="email" style={{ fontWeight: "600" }}>
            <i className="bi bi-envelope-fill me-1"></i>Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <label htmlFor="phone" style={{ fontWeight: "600" }}>
            <i className="bi bi-telephone-fill me-1"></i>Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#5a2a83",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
              }}
            >
              <i className="bi bi-check-lg me-1"></i>Update
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              style={{
                backgroundColor: "#ccc",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
              }}
            >
              <i className="bi bi-x-circle me-1"></i>Cancel
            </button>
          </div>
        </form>
      )}

    
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {filteredUsers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No users found.</p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                padding: "10px 15px",
                fontWeight: "700",
                borderBottom: "2px solid #ccc",
                color: "#4a3f6b",
                cursor: "pointer",
              }}
            >
              <div onClick={() => sortBy("name")} style={{ flex: "1 1 200px" }}>
                Name{renderSortArrow("name")}
              </div>
              <div onClick={() => sortBy("email")} style={{ flex: "1 1 250px" }}>
                Email{renderSortArrow("email")}
              </div>
              <div onClick={() => sortBy("phone")} style={{ flex: "1 1 150px" }}>
                Phone{renderSortArrow("phone")}
              </div>
              <div style={{ flexShrink: 0 }}>Actions</div>
            </div>

            {filteredUsers.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ flex: "1 1 200px", fontWeight: "600", color: "#4a3f6b" }}>
                  {user.name}
                </div>
                <div style={{ flex: "1 1 250px", color: "#555" }}>{user.email}</div>
                <div style={{ flex: "1 1 150px", color: "#555" }}>{user.phone}</div>
                <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      backgroundColor: "#4a90e2",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  >
                    <i className="bi bi-pencil-fill me-1"></i>Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    style={{
                      backgroundColor: "#e04a4a",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  >
                    <i className="bi bi-trash-fill me-1"></i>Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      <div className="row">
        {filteredUsers.map((user) => (
          <div className="col-md-4" key={user.id}>
            <div className="card mb-3" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.1)" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#4a3f6b" }}>{user.name}</h5>
                <p className="card-text"><i className="bi bi-envelope me-1"></i>{user.email}</p>
                <p className="card-text"><i className="bi bi-telephone me-1"></i>{user.phone}</p>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>
                  <i className="bi bi-pencil me-1"></i>Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user)}>
                  <i className="bi bi-trash me-1"></i>Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            <h4 className="mb-3"><i className="bi bi-exclamation-triangle me-2 text-danger"></i>Confirm Delete</h4>
            <p>
              Are you sure you want to delete{" "}
              <strong>{userToDelete?.name}</strong>?
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#aaa",
                  color: "#fff",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "8px 20px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#e04a4a",
                  color: "#fff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;

// import React, { useState } from "react";

// function IssueList() {
//   const [issues, setIssues] = useState([
//     {
//       id: 1,
//       title: "Login Bug",
//       description: "Login fails even with correct credentials.",
//       status: "Open",
//     },
//     {
//       id: 2,
//       title: "Broken UI on Mobile",
//       description: "UI elements overflow on small screens.",
//       status: "Closed",
//     },
//   ]);

//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");

//   const addIssue = () => {
//     if (newTitle.trim() === "" || newDescription.trim() === "") return;

//     const newIssue = {
//       id: Date.now(),
//       title: newTitle,
//       description: newDescription,
//       status: "Open",
//     };
//     setIssues([...issues, newIssue]);
//     setNewTitle("");
//     setNewDescription("");
//   };

//   const deleteIssue = (id) => {
//     setIssues(issues.filter((issue) => issue.id !== id));
//   };

//   const toggleStatus = (id) => {
//     setIssues(
//       issues.map((issue) =>
//         issue.id === id
//           ? { ...issue, status: issue.status === "Open" ? "Closed" : "Open" }
//           : issue
//       )
//     );
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ marginBottom: "20px" }}>
//         <h2>Add New Issue</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//           style={{ marginRight: "10px" }}
//         />
//         <button onClick={addIssue}>Add</button>
//       </div>

//       {issues.map((issue) => (
//         <div
//           key={issue.id}
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             marginBottom: "10px",
//             borderRadius: "8px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h2>{issue.title}</h2>
//           <p>{issue.description}</p>
//           <p>
//             <strong>Status:</strong> {issue.status}
//           </p>
//           <button onClick={() => toggleStatus(issue.id)}>Toggle Status</button>
//           <button
//             onClick={() => deleteIssue(issue.id)}
//             style={{ marginLeft: "10px", color: "red" }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState } from 'react';

export default function IssueList() {
  const [issues, setIssues] = useState([
    { id: 1, title: 'Login Bug', description: 'Login fails.', status: 'Open' },
    { id: 2, title: 'Mobile UI Bug', description: 'UI overflows.', status: 'Closed' },
  ]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addIssue = () => {
    if (!title || !desc) return;
    const newIssue = { id: Date.now(), title, description: desc, status: 'Open' };
    setIssues([...issues, newIssue]);
    setTitle('');
    setDesc('');
  };

  const deleteIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const toggleStatus = (id) => {
    setIssues(issues.map(issue =>
      issue.id === id
        ? { ...issue, status: issue.status === 'Open' ? 'Closed' : 'Open' }
        : issue
    ));
  };

  return (
    <div>
      <h3>Add Issue</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <button onClick={addIssue}>Add</button>

      {issues.map(issue => (
        <div key={issue.id}>
          <h4>{issue.title}</h4>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
          <button onClick={() => toggleStatus(issue.id)}>Toggle Status</button>
          <button onClick={() => deleteIssue(issue.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
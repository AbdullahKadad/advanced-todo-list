import { useEffect, useState } from "react";
import "./List.css";

function List() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/task");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete request failed");
      fetchTasks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditStart = (id, currentDescription) => {
    setEditingTaskId(id);
    setUpdatedDescription(currentDescription);
  };

  const handleEditConfirm = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: updatedDescription }),
      });
      if (!res.ok) throw new Error("Edit request failed");
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setUpdatedDescription("");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h2>Description</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="input"
              />
              <button
                className="del"
                onClick={() => handleEditConfirm(task.id)}
              >
                ✓
              </button>
              <button className="edit" onClick={handleEditCancel}>
                ✘
              </button>
            </>
          ) : (
            <>
              <p>{task.description}</p>
              <div>
                <button
                  className="edit"
                  onClick={() => handleEditStart(task.id, task.description)}
                >
                  ✎
                </button>
                <button className="del" onClick={() => handleDelete(task.id)}>
                  🗑
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default List;

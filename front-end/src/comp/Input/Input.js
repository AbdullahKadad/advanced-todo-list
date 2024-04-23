import "./Input.css";
import { useState } from "react";

function Input() {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      console.log("Description is empty. No action taken.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.reload();

      const data = await response.json();
      console.log("Data received:", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}

export default Input;

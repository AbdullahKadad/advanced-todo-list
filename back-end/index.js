const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// create task

app.post("/task", async (req, res) => {
  try {
    const { description } = req.body;
    const query = "INSERT INTO task (description) VALUES ($1) RETURNING *";
    const newTask = await pool.query(query, [description]);
    res.json(newTask.rows);
  } catch (err) {
    console.error(err.massage);
  }
});

// get all tasks

app.get("/task", async (req, res) => {
  try {
    const query = "SELECT * FROM task";
    const tasks = await pool.query(query);
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.massage);
  }
});

// get a task

app.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM task WHERE id = $1";
    const task = await pool.query(query, [id]);
    res.json(task.rows);
  } catch (err) {
    console.error(err.massage);
  }
});

// update a task

app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const query = "UPDATE task SET description = $1 WHERE id = $2 RETURNING *";
    const updatedTask = await pool.query(query, [description, id]);
    res.json(updatedTask.rows);
  } catch (err) {
    console.error(err.massage);
  }
});

// delete a task

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM task WHERE id = $1";
    const row = await pool.query(query, [id]);
    res.json("Task was deleted!");
  } catch (err) {
    console.error(err.massage);
  }
});

// Internal server error //

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 500,
      responseText: "Sorry, something went wrong",
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log("PORT: " + PORT);
});

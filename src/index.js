const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const PORT = 3333 || process.env.PORT;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const app = express();

app.use(express.json());

app.get("/users", async (request, response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    return response.status(200).send(rows);
  } catch (error) {
    return response.status(400).send(error);
  }
});

app.post("/session", async (request, response) => {
  const { username } = request.body;
  let user = "";
  try {
    user = await pool.query("SELECT * FROM users WHERE user_name = ($1)", [
      [username],
    ]);

    if (!user.rows[0]) {
      user = await pool.query(
        "INSERT INTO users(user_name) VALUES ($1) RETURNING *",
        [username]
      );
    }

    return response.status(200).send(user.rows);
  } catch (error) {
    return response.status(400).send(error);
  }
});

app.post("/todo/:user_id", async (request, response) => {
  const { description, done } = request.body;
  const { user_id } = request.params;

  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (todo_description, todo_done, user_id) VALUES ($1, $2, $3) RETURNING *",
      [description, done, user_id]
    );
    return response.status(200).send(newTodo.rows);
  } catch (error) {
    return response.send(error);
  }
});

app.get("/todo/:user_id", async (request, response) => {
  const { user_id } = request.params;
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todos WHERE user_id = ($1)",
      [user_id]
    );

    return response.status(200).send(allTodos.rows);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.patch("/todo/:user_id/:todo_id", async (request, response) => {
  const { todo_id, user_id } = request.params;
  const data = request.body;

  try {
    const belongsToUser = await pool.query(
      "SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)",
      [user_id, todo_id]
    );

    if (!belongsToUser.rows[0])
      return response.status(400).send("operation not allowed");

    const updatedTodo = await pool.query(
      "UPDATE todos SET todo_description = ($1), todo_done = ($2) WHERE todo_id = ($3) RETURNING *",
      [data.description, data.done, todo_id]
    );
    return response.status(200).send(updatedTodo.rows);
  } catch (error) {
    return response.status(400).send(error);
  }
});

app.delete("/todo/:user_id/:todo_id", async (request, response) => {
  const { user_id, todo_id } = request.params;
  try {
    const belongsToUser = await pool.query(
      "SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)",
      [user_id, todo_id]
    );
    if (!belongsToUser.rows[0])
      return response.status(400).send("operation not allowed");

    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = ($1) RETURNING *",
      [todo_id]
    );
    console.log(deletedTodo);
    return response.status(200).send({
      Message: "Todo sucessfully deleted",
      deletedTodo: deletedTodo.rows,
    });
  } catch (error) {
    return response.status(400).send(error);
  }
});

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

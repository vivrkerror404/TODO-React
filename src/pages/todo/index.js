import TaskBox from "pages/todo/components/taskBox";
import { useState } from "react";
import { TODOS } from "./constant";
import CreateTODO from "./components/createTodo";
import Search from "./components/search";

export default function TODO() {
  const [todos, setTodos] = useState(TODOS);
  const [searchTodo, setSearchTodo] = useState("");

  const active = [],
    inactive = [];
  todos.forEach((task) => {
    if (task?.status === "progress") {
      searchTodo
        ? task?.name?.toLowerCase()?.includes(searchTodo) && active.push(task)
        : active.push(task);
    } else {
      searchTodo
        ? task?.name?.toLowerCase()?.includes(searchTodo) && inactive.push(task)
        : inactive.push(task);
    }
  });
  return (
    <div className="p-3 min-vh-100 bg-light" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center">
        <Search setSearchTodo={setSearchTodo} />
        <CreateTODO setTodos={setTodos} />
      </div>
      <div className="row py-3 m-0">
        <div className="col-md-6 py-4 py-md-0">
          <TaskBox type="active" tasks={active} setTodos={setTodos} />
        </div>
        <div className="col-md-6">
          <TaskBox type="inactive" tasks={inactive} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}

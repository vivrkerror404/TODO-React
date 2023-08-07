import TaskCard from "./taskCards";
import "../styles/index.css";
import { useCallback, useRef } from "react";
import { getAttributeByType, handleDragOver } from "../constant";
var dragItemData = null;
export default function TaskBox({ type = "active", tasks = [1, 2], setTodos }) {
  const handleDragStart = useCallback((e) => {
    const draggedContainer = getAttributeByType(e.target.parentNode);
    const sourceId = getAttributeByType(e.target, "data-todo-id");
    dragItemData = { source: { draggedContainer, sourceId } };
  }, []);
  const handleDrop = useCallback(
    (e) => {
      const droppedContainer = getAttributeByType(e.target);
      const { source } = dragItemData || {};
      if (droppedContainer === source?.draggedContainer) {
        return;
      }
      const { draggedContainer, sourceId } = source || {};
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo.id === +sourceId
            ? {
                ...todo,
                status: draggedContainer === "active" ? "done" : "progress",
              }
            : todo
        );
        return updatedTodos;
      });
    },
    [setTodos]
  );

  return (
    <div
      container-id={type}
      className={`todo-container todo-container-${type} p-4 rounded`}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h5 className={type === "active" ? "text-success": "text-danger"}>{type === "active" ? "Active" : "Completed"} Tasks</h5>
      <hr/>
      {tasks.map((task, ind) => (
        <TaskCard key={ind} ind={ind} setTodos={setTodos} {...task} />
      ))}
    </div>
  );
}

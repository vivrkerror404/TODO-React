import { useCallback, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getAttributeByType } from "../constant";
import CreateTODO from "./createTodo";
const getTodoAttribute = (e, attr = "data-todo-id") => {
  return (
    getAttributeByType(e.target, attr) ||
    getAttributeByType(e.target.parentNode, attr)
  );
};
export default function TaskCard({ name, id, ind, setTodos }) {
  const [editTodoData, setEditTodo] = useState({});
  const editTaskCard = useCallback((e) => {
    const editTodoId = getTodoAttribute(e);
    const editTodoName = getTodoAttribute(e, "data-todo-name");
    setEditTodo({ editTodoName, editTodoId });
  }, []);

  const deleteTaskCard = useCallback(
    (e) => {
      let text = "Are your sure to delete this todo item!";
      if (window.confirm(text) === true) {
        const deleteTodoId = getTodoAttribute(e);
        setTodos((prev) => {
          const todos = [...prev];
          const filteredTodo = todos.filter(
            (todo) => todo?.id !== +deleteTodoId
          );
          return filteredTodo;
        });
      }
    },
    [setTodos]
  );
  return (
    <>
      <li
        data-key={ind}
        data-todo-id={id}
        draggable
        style={{ cursor: "pointer", maxHeight: "70px", overflowY: "auto",border:"1px solid #989898" }}
        className="rounded list-group-item my-1 d-flex justify-content-between align-items-center"
      >
        {name}
        <span>
          <AiFillEdit
            data-toggle="modal"
            data-target="#UpdateTODO"
            data-todo-id={id}
            data-todo-name={name}
            className="mr-2 text-success"
            onClick={editTaskCard}
          />
          <AiFillDelete
          className="text-danger"
            data-todo-id={id}
            data-todo-name={name}
            onClick={deleteTaskCard}
          />
        </span>
      </li>
      {editTodoData?.editTodoName && (
        <CreateTODO
          id="UpdateTODO"
          editTodoData={editTodoData}
          setEditTodo={setEditTodo}
          showBtn={false}
          setTodos={setTodos}
          title="Update TODO"
        />
      )}
    </>
  );
}

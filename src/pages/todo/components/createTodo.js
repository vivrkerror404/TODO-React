import { useCallback, useEffect, useState } from "react";
function Input({ todoName, handleInput }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={"Enter task name"}
      value={todoName}
      onChange={handleInput}
    ></input>
  );
}

export default function CreateTODO({
  setTodos,
  setEditTodo,
  editTodoData,
  showBtn = true,
  id = "exampleModal",
  title = "Create TODO",
}) {
  const { editTodoName, editTodoId } = editTodoData || {};
  const [todoName, setTodoName] = useState("");
  useEffect(() => {
    if (editTodoName) {
      setTodoName(editTodoName);
    }
  }, [editTodoName]);
  const pushNewTodo = useCallback(() => {
    setTodos((prev) => {
      const todoExist = prev.findIndex((todo) => todo?.id === +editTodoId);
      if (todoExist > -1) {
        prev[todoExist]["name"] = todoName;
        return [...prev];
      } else {
        const lastInd = prev.at(-1)?.id;
        const newTodo = {
          id: lastInd + 1,
          name: todoName,
          status: "progress",
        };
        return [newTodo, ...prev];
      }
    });
    setTimeout(() => {
      if (setEditTodo) setEditTodo(""); //to unmount on save
    }, 1000);
  }, [setTodos, todoName, editTodoId, setEditTodo]);

  const handleInput = useCallback((e) => {
    const name = e.target.value;
    setTodoName(name);
  }, []);
  return (
    <div className="bg-light m-0 p-0 text-right">
      {showBtn && (
        <button
          type="button"
          className="btn btn-sm btn-outline-success"
          data-toggle="modal"
          data-target={`#${id}`}
        >
          Create TODO
        </button>
      )}
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={id}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={id}>
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group text-left">
                <label htmlFor="task-name">Task Name</label>
                <Input
                  todoName={todoName}
                  setTodoName={setTodoName}
                  handleInput={handleInput}
                ></Input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => {
                  if (setEditTodo) setEditTodo("");
                }}
              >
                Close
              </button>
              <button
                type="button"
                data-dismiss="modal"
                onClick={pushNewTodo}
                className="btn btn-success"
              >
                {title?.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

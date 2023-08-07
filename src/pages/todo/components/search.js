import { useCallback } from "react";
import { ImSearch } from "react-icons/im";
import { debounce } from "../constant";
export default function Search({ setSearchTodo }) {
  const handleSearch = useCallback(
    (e) => {
      setSearchTodo(e.target.value?.toLowerCase());
    },
    [setSearchTodo]
  );
  return (
    <>
      <div className="input-group mr-5">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <ImSearch />
          </span>
        </div>
        <input
          type="search"
          className="form-control"
          onChange={debounce(handleSearch, 700)}
        />
      </div>
    </>
  );
}

import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import MovieContext from "../context/MovieContext";

function Form() {
  const { states, setStates } = useContext(MovieContext);

  const handleChange = (e) => {
    setStates((prev) => {
      return {
        ...prev,
        text: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(states.text);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search a movie with title"
          type="text"
          onChange={handleChange}
          required
        />
        <button>
          <FaSearch size={18} />
        </button>
      </form>
    </div>
  );
}

export default Form;

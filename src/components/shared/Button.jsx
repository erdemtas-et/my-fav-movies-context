import React from "react";

function Button({ btnStyle, text, handleDetails, id }) {
  return (
    <button onClick={() => handleDetails(id)} className={`btn btn-${btnStyle}`}>
      {text}
    </button>
  );
}

export default Button;

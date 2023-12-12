import React, { useState } from "react";

const EditInput = ({ userData }) => {
  const [state, setState] = useState({ ...userData, editing: false });

  const handleEditButton = (key) => {
    setState({
      ...state,
      editing: { ...state.editing, [key]: !state.editing[key] },
    });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div>
      {Object.keys(userData).map((key) => (
        <div key={key}>
          {state.editing[key] ? (
            <input
              type="text"
              name={key}
              value={state[key]}
              onChange={(event) => handleChange(event)}
            />
          ) : (
            <span>{state[key]}</span>
          )}
          <button onClick={() => handleEditButton(key)}>
            {state.editing[key] ? "Save" : "Edit"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditInput;

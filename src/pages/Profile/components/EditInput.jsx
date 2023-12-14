import React, { useState } from "react";
import { editUser } from "../../../utils/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditInput = ({ userData }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    ...userData,
    editing: false,
  });

  const allowedKeys = ["email", "username"];

  const handleEditButton = (key, e) => {
    setState({
      ...state,
      editing: { ...state.editing, [key]: !state.editing[key] },
    });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    // console.dir(e.target[2].value)

    // Method 1
    const email = e.target[0].value;
    const username = e.target[1].value;
    const data = { email, username };

    // Method 2
    // const form = e.target;
    // console.log(form)
    // const formData = new FormData(form);
    // const data = Object.fromEntries(formData);

    try {
      const res = await editUser(data);
      console.log(res);
      toast.success(res.data.message, {
        icon: "🚀",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/secured/profile");
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error(error.response.data.message);

      // alert(error.response.data.message);
    }
  };

  return (
    <div className="ml-3 w-screen">
      {Object.keys(userData).map(
        (key) =>
          allowedKeys.includes(key) && (
            <div className="gap-3 my-3" key={key}>
              <span className=" text-lg font-medium">{key}</span>
              <div className="flex">
                <form className="flex" onSubmit={handleSubmit}>
                  {state.editing[key] ? (
                    <input
                      className="pl-3 px-1 w-1/3 bg-indigo-200 rounded-sm"
                      type={key === "name" ? "text" : key}
                      name={key}
                      value={state[key]}
                      onChange={(event) => handleChange(event)}
                    />
                  ) : (
                    <span className="pl-3 px-1 w-1/3 rounded-sm text-gray-600 ">
                      {state[key]}
                    </span>
                  )}
                  {!state.editing[key] ? (
                    <button
                      className=" bg-indigo-500 py-1 px-3 rounded-md mx-3 text-white"
                      onClick={(event) => {
                        event.preventDefault();
                        handleEditButton(key);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" bg-indigo-500 py-1 px-3 rounded-md mx-3 text-white"
                      onClick={() => {
                        handleEditButton(key);
                      }}
                    >
                      Save
                    </button>
                  )}
                </form>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default EditInput;

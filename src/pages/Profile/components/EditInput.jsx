import React, { useEffect, useState } from "react";
import { editUser } from "../../../utils/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditInput = ({ userData, OnFetch }) => {
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

  const handleSubmit = async (e, key) => {
    e.preventDefault();

    // console.dir(e.target[2].value)

    // Method 1
    // const data = e.target;
    // console.log(">>>>>>>>>", data);

    // Method 2
    const form = e.target;
    // console.log(form);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await editUser(data);
      // console.log(res);
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
    } finally {
      handleEditButton(key);
      OnFetch();
    }
  };

  return (
    <div className="ml-3 w-2/3">
      {Object.keys(userData).map(
        (key) =>
          allowedKeys.includes(key) && (
            <div className="gap-3 mt-3" key={key}>
              <span className=" text-lg font-medium">{key}</span>
              <form className="flex" onSubmit={(e) => handleSubmit(e, key)}>
                <div className="flex flex-row">
                  {state.editing[key] ? (
                    <input
                      className="pl-3 px-1 bg-indigo-200 rounded-sm"
                      type={key === "name" ? "text" : key}
                      name={key}
                      value={state[key]}
                      onChange={(event) => handleChange(event)}
                    />
                  ) : (
                    <span className="pl-3 px-1 rounded-sm text-gray-600 ">
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
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          )
      )}
    </div>
  );
};

export default EditInput;

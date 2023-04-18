import React, { useState } from "react";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useNavigate } from "react-router-dom";
export function AccountDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    confirm: "",
    error: "",
  });
  const { changeUserDetails } = usePhotoStore();
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { error, confirm, ...data } = formData;
      const user = await changeUserDetails(data);
      Navigate("/account");
    } catch (error) {
      console.log("sign-up error:", error);
      setFormData({ ...formData, error: "Sign Up Failed" });
    }
  };

  const disable = formData.password !== formData.confirm;
  return (
    <form
      className="flex justify-center align-middle flex-col w-1/4 mx-auto"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label>Old Password</label>
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirm"
        value={formData.confirm}
        onChange={handleChange}
        required
      />
      <button
        className="border-green-600 bg-green-900 justify-center mx-auto m-4"
        type="submit"
        disabled={disable}
      >
        Save
      </button>
    </form>
  );
}

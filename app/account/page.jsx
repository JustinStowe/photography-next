"use client";
import React, { useState } from "react";
import { SignUpForm, LoginForm } from "../../components";
import { useRouter } from "next/router";
import { usePhotoStore } from "../../stores/usePhotoStore";
import Head from "next/head";

export default function AccountPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    confirm: "",
    error: "",
  });
  const { userLogout, user, changeUserDetails } = usePhotoStore();
  const router = useRouter();

  const handleLogout = (evt) => {
    evt.preventDefault();
    try {
      userLogout();
      router.push("/home/public");
    } catch (error) {
      console.error("logOut error:", error);
    }
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { error, confirm, ...data } = formData;
      await changeUserDetails(data);
      router.push("/account");
    } catch (error) {
      console.log("sign-up error:", error);
      setFormData({ ...formData, error: "Sign Up Failed" });
    }
  };
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <main>
        <div className="m-12">
          {user ? (
            <div>
              <button className="" onClick={handleLogout}>
                Log Out
              </button>
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
            </div>
          ) : (
            <div className="m-8">
              {showLogin ? <LoginForm /> : <SignUpForm />}
              <button className="" onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "CLICK HERE TO SIGN UP" : "CLICK HERE TO LOG IN"}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

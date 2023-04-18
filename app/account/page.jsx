import React, { useState } from "react";
import { SignUpForm, LoginForm, AccountDetails } from "../components";
import { useRouter } from "next/router";
import { usePhotoStore } from "../stores/usePhotoStore";
import Head from "next/head";

export default function AccountPage() {
  const [showLogin, setShowLogin] = useState(true);
  const { userLogout, user } = usePhotoStore();
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
              <AccountDetails />
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

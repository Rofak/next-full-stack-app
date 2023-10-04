"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onLogin = (event: any) => {
    event.preventDefault();
    signIn("credentials", login);
  };
  const handleChanged = (event: any) => {
    const { name, value } = event.target;
    setLogin((state) => ({ ...state, [name]: value }));
  };
  return (
    <>
    <h1>Error</h1>
      <div
        style={{ width: "70%" }}
        className="mx-auto card card-compact bg-base-100 mt-60 shadow-x border  p-5"
      >
        <div className="card-body">
        <div>
              <label>Email</label>
              <input
                value={login.email}
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChanged}
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div className="mt-5">
              <label>Password</label>
              <input
                value={login.password}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChanged}
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <button className="btn btn-primary " onClick={onLogin}>
                Login
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

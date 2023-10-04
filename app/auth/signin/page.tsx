"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(<></>);

  const onLogin = (event: any) => {
    event.preventDefault();
    signIn("credentials", { ...login, redirect: false }).then((res) => {
      if (!res?.error) {
        router.push("/book");
      } else {
        setError(
          <>
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Password or Email is Incorrect!</span>
            </div>
          </>
        );
      }
    });
  };
  const handleChanged = (event: any) => {
    const { name, value } = event.target;
    setLogin((state) => ({ ...state, [name]: value }));
  };
  return (
    <>
      <div
        style={{ width: "70%" }}
        className="mx-auto card card-compact bg-base-100 mt-60 shadow-x border  p-5"
      >
        <div className="card-body">
          <div>{error}</div>
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

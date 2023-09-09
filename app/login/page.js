"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { login } from "../auth/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const data = await login({ email, password });
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/books");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: 'Invalid email or password',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg p-9 rounded-lg">
          <h1 className="text-5xl font-bold mb-5">Login</h1>
          <div>
            <label className="block">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="yourname@mail.com"
              className="input input-accent input-md mb-3 mt-2"
            />
            <label className="block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="*******"
              className="input input-accent input-md mb-4 mt-2"
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-accent btn-sm w-full block mt-3 text-neutral-200"
            >
              Log in
            </button>
            <p className="text-xs mt-4 text-center -mb-2">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="underline decoration-sky-600 hover:text-blue-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

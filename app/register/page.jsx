"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      Swal.fire({
        icon: "success",
        title: "Registration Success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg p-9 rounded-lg">
          <h1 className="text-5xl font-bold mb-5">Sign Up</h1>
          <div>
            <label className="block">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="yourname"
              className="input input-accent input-md mb-3 mt-2"
            />
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
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline decoration-sky-600 hover:text-blue-400"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

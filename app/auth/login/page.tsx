"use client";
import { useState } from "react";
import { Login } from "@/lib/hooks/login";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function () {
  const router = useRouter();
  const setRoles = useAuthStore((state) => state.setRoles);
  const setUserName = useAuthStore((state) => state.setUserName);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const data = await Login(email, password);
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const refreshToken = data.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      console.log(accessToken, "login");
      const roles = data.roles;
      setRoles(roles);
      setUserName(data.email)
      if (Array.isArray(data.roles) && data.roles.includes("SUPER_ADMIN")) {
        router.replace("/administrator-dashboard");
      } else {
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error(err);
      router.refresh();
      alert("Invalid Email or Password.");
    }
  };

  return (
    <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center items-center ">
      <div
        className="flex flex-col justify-center items-center py-[50px] h-[546px] w-[448px] rounded-[8px] border-[1px] border-[#E0F2F7]  "
        style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
      >
        <div className="text-[#0F4C81] mb-[40px] text-[24px] font-extrabold">
          Login to IMS
        </div>
        <div className="max-w-[336px] mb-[40px] text-[#343A40] font-normal text-[16px] flex items-center flex-col justify-center">
          Enter your credentials to access the Inventory
          <div className="max-w-[336px] text-[#343A40] font-normal text-[16px] flex items-center justify-center">
            Management System.
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center "
          action=""
        >
          <div className="mb-[30px] flex flex-col">
            <label
              className="mb-[5px] text-[#343A40] text-[14px] font-medium"
              htmlFor="username"
            >
              Username or Email
            </label>
            <input
              required
              name="username"
              style={{ boxShadow: "0px 2px 4px 0px #0000000D" }}
              className="border-1 border-[#E5E7EB] rounded-[6px] h-[42px] w-[366px] px-4 font-normal text-[16px]"
              placeholder="Enter your username or email"
              type="email"
            />
          </div>
          <div className=" mb-[40px] flex flex-col">
            <label
              className="mb-[5px] text-[#343A40] text-[14px] font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              name="password"
              style={{ boxShadow: "0px 2px 4px 0px #0000000D" }}
              className="border-1 border-[#E5E7EB] rounded-[6px] h-[42px] w-[366px] px-4 font-normal text-[16px]"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <button className="bg-[#0F4C81] hover:cursor-pointer text-[#ffffff] rounded-[6px] w-[366px] h-[52px] text-[18px] flex items-center justify-center font-semibold">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

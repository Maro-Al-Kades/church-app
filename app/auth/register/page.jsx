"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/api/authApiCall";
import Swal from "sweetalert2";

const Register = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { registerMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //~ Form Submission
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (username.trim() === "") return toast.error("الاسم مطلوب");
    if (email.trim() === "") return toast.error("الايميل مطلوب");
    if (password.trim() === "") return toast.error("كلمة السر مطلوبة");

    dispatch(registerUser({ username, email, password }));
  };

  if (registerMessage) {
    Swal.fire({
      text: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        router.push("/auth/login");
      }
    });
  }

  return (
    <section className="flex flex-col lg:flex-row justify-between items-center">
      <ToastContainer theme="colored" position="bottom-right" />
      <div
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <h1 className="text-3xl font-bold text-primary mb-20">
          تسجيل حساب جديد
        </h1>

        <form className="flex flex-col gap-10">
          <Input
            variant="faded"
            color="primary"
            isRequired
            type="text"
            label="الاسم"
            placeholder="اكتب هنا الاسم"
            className="min-w-[400px] md:min-w-[500px] lg:w-[600px]"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            variant="faded"
            color="primary"
            isRequired
            type="email"
            label="الايميل"
            placeholder="اكتب هنا الايميل الخاص بك"
            className="min-w-[400px] md:min-w-[500px] lg:w-[600px]"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            variant="faded"
            color="primary"
            isRequired
            type="password"
            label="كلمة المرور"
            placeholder="اكتب هنا كلمة المرور"
            className="min-w-[400px] md:min-w-[500px] lg:w-[600px]"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            color="primary"
            variant="shadow"
            className="text-md"
            onClick={formSubmitHandler}
          >
            تسجيل حساب جديد
          </Button>
        </form>
      </div>
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <Image
          src="/register.svg"
          alt="register-image"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default Register;

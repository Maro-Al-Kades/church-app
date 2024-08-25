"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/api/authApiCall";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //~ FORM Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("الايميل الشخصي مطلوب");
    if (password.trim() === "") return toast.error("كلمة المرور مطلوبة");

    dispatch(loginUser({ email, password }));

    // router.push(`/`);
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="flex flex-col lg:flex-row justify-between items-center">
      <ToastContainer theme="dark" position="bottom-right" />
      <div
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <h1 className="text-3xl font-bold text-primary mb-20">تسجيل الدخول</h1>

        <form className="flex flex-col gap-10">
          <Input
            variant="faded"
            color="primary"
            isRequired
            type="email"
            label="الايميل"
            placeholder="اكتب هنا الايميل الخاص بك"
            className="min-w-[400px] md:min-w-[500px] lg:w-[600px]"
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
            type="submit"
            onClick={formSubmitHandler}
          >
            تسجيل الدخول
          </Button>
          <div className="text-center">
            <p>
              هل نسيت كلمة المرور ؟{" "}
              <span className="text-primary">اعادة التعيين</span>
            </p>
          </div>
        </form>
      </div>
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <Image src="/login.svg" alt="Login-image" width={600} height={600} />
      </div>
    </section>
  );
};

export default Login;

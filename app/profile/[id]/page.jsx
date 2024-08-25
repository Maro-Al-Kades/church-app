"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileComments from "@/components/profile/ProfileComments";
import ProfileProjects from "@/components/profile/ProfileProjects";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/redux/api/profileApiCall";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";

import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const params = useParams();
  const { id } = params || {};

  useEffect(() => {
    dispatch(getUserProfile(id));
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);
  }, [id]);

  if (!profile) {
    return (
      <div className="text-primary text-3xl font-bold flex items-center justify-center">
        <Spinner label="جاري تحميل البيانات..." color="primary" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>الصفحة الشخصية</title>
      </Head>

      <section className="flex flex-col">
        <ToastContainer position="top-center" theme="dark" />

        <ProfileHeader
          profile={profile}
          loading={loading}
          isProfileDeleted={isProfileDeleted}
        />

        <ProfileComments profile={profile} />

        <ProfileProjects profile={profile} />
      </section>
    </>
  );
};

export default Profile;

import { logoutUser } from "@/redux/api/authApiCall";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import Link from "next/link";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

const UserProfileIcon = ({ user }) => {
  const dispatch = useDispatch();

  const photoSrc = user?.profilePhoto.url;

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: photoSrc,
              color: "primary",
            }}
            className="transition-transform"
            name={user?.username}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2 font-bold text-primary"
            as={Link}
            href={`/profile/${user?._id}`}
          >
            الصفحة الشخصية
          </DropdownItem>
          <DropdownItem
            key="settings"
            color="warning"
            as={Link}
            href="/projects/create"
            endContent={<FaPlusCircle />}
          >
            تسجيل المشروع
          </DropdownItem>

          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => dispatch(logoutUser())}
          >
            تسجيل الخروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserProfileIcon;

"use client";

import { useEffect, useState } from "react";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateProfile,
  uploadProfilePhoto,
} from "@/redux/api/profileApiCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfileHeader = ({ profile }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile) {
      setUsername(profile?.username || "");
      setBio(profile?.bio || "");
    }
  }, [profile]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const updatedProfile = { username, bio };

    // Only include the password if it's not empty
    if (password.trim() !== "") {
      updatedProfile.password = password;
    }

    try {
      await dispatch(updateProfile(profile?._id, updatedProfile));
      dispatch(getUserProfile(profile?._id)); // Fetch updated profile data
      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث الملف الشخصي");
    }
  };

  return (
    <>
      <div
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
        className="flex flex-col gap-5 lg:flex-row items-center justify-between light:bg-black/50 dark:bg-gray-400/30 p-6 rounded-xl"
      >
        <div className="flex flex-row items-center lg:justify-normal justify-between w-full gap-8">
          <Avatar
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            size="lg"
            className="w-[100px] h-[100px]"
            isBordered
            color="primary"
          />
          <div>
            <h2 className="text-primary text-2xl font-bold">
              {profile?.username}
            </h2>
            <p>
              تاريخ الانضمام :{" "}
              <span className="text-primary">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div>
          <Button
            color="warning"
            variant="bordered"
            endContent={<MdEdit />}
            onPress={onEditOpen}
          >
            تعديل الملف الشخصي
          </Button>

          <Modal
            isOpen={isEditOpen}
            onOpenChange={onEditClose}
            placement="top-center"
            size="4xl"
            shadow="lg"
            backdrop="blur"
            className="p-3"
          >
            <ModalContent>
              <ModalHeader className="flex flex-row justify-between items-center">
                تعديل الملف الشخصي
                <Button
                  className="ml-10"
                  color="danger"
                  variant="shadow"
                  endContent={<MdDelete size={20} />}
                  onPress={onDeleteOpen}
                >
                  حذف الحساب
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className="my-4 flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <Avatar
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : profile?.profilePhoto?.url
                      }
                      size="lg"
                      className="w-[70px] h-[70px] mt-2"
                      isBordered
                      color="primary"
                    />
                  </div>
                  <form>
                    <Button
                      color="primary"
                      variant="bordered"
                      className="mr-2 w-[250px]"
                      onPress={() =>
                        document.getElementById("image-upload").click()
                      }
                    >
                      تغيير صورة الملف الشخصي
                    </Button>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        const formData = new FormData();
                        formData.append("image", e.target.files[0]);
                        dispatch(uploadProfilePhoto(formData));
                      }}
                      style={{ display: "none" }}
                    />
                  </form>
                </div>
                <form
                  onSubmit={formSubmitHandler}
                  className="flex flex-col items-center justify-between gap-y-4"
                >
                  <Input
                    label="الاسم"
                    placeholder="اكتب الاسم الصحيح"
                    variant="flat"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <Textarea
                    label="النبذة الشخصية"
                    placeholder="اكتب النبذة الشخصية عنك"
                    type="text"
                    variant="flat"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />

                  <Input
                    label="كلمة المرور"
                    placeholder="تغيير كلمة المرور"
                    variant="flat"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pb-6"
                  />

                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <Button
                      fullWidth
                      color="primary"
                      variant="flat"
                      type="submit"
                      onPress={onEditClose}
                    >
                      تأكيد البيانات
                    </Button>
                    <Button
                      fullWidth
                      color="primary"
                      variant="flat"
                      onPress={onEditClose}
                    >
                      الغاء
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteClose}
        placement="top-center"
        size="sm"
        shadow="lg"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>تأكيد حذف الحساب</ModalHeader>
          <ModalBody>
            هل أنت متأكد أنك تريد حذف الحساب؟ هذه العملية لا يمكن التراجع عنها.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onDeleteClose}>
              إلغاء
            </Button>
            <Button
              color="danger"
              onPress={() => {
                // إضافة منطق الحذف هنا
                // تأكد من التعامل مع العملية بشكل صحيح
                // وبعد الانتهاء من الحذف أغلق الـ Modal
                onDeleteClose();
              }}
            >
              حذف الحساب
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileHeader;

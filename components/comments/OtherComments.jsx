"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";
import { FaStar } from "react-icons/fa";

const OtherComments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Card className="comments p-2 px-6" radius="lg" key={comment._id}>
          <CardHeader className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center justify-start gap-4">
              <Avatar />
              <div>
                <h3 className="text-primary font-semibold">
                  {comment.username}
                </h3>
                <p className="text-gray-500">{comment.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <FaStar size={30} className="cursor-pointer text-primary" />
            </div>
          </CardHeader>

          <CardBody className="p-6">
            <p className="dark:text-gray-200 text-right max-w-screen-xl">
              {comment.content}
            </p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default OtherComments;

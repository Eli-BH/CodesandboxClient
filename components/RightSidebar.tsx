import React, { JSXElementConstructor } from "react";
import { JsxElement } from "typescript";

type NotificationType = {
  text: string;
  variant: string;
};

enum StatusEnum {
  error = "red",
  info = "yellow",
  success = "green",
}

const NotificationItem = ({ text, variant }: NotificationType) => {
  return (
    <div
      className={`
  border-2 
  border-${variant}-500 
  p-1
  w-[80%]
  mt-2
  text-${variant}-500
  rounded-md
  flex
  flex-col
  items-center
  justify-center
  hover:text-${variant}-700
  hover:bg-${variant}-200
  font-semibold
  cursor-pointer
  mx-auto
  `}
    >
      {text}
    </div>
  );
};

const RightSidebar = () => {
  const notifs = [
    {
      text: "Form Error",
      variant: StatusEnum.error,
    },
    {
      text: "New Patient Added",
      variant: StatusEnum.success,
    },
    {
      text: "Date reminder",
      variant: StatusEnum.info,
    },
  ];

  return (
    <div
      className="
        border-l-2
        h-full
        w-[30%]
        items-center
        flex
        flex-col
        hidden
        lg:block
        "
    >
      <div
        className="
      items-center 
      flex 
      flex-col 
      h-[30%]
      border-b-2
      border-gray-200
      "
      >
        <p className="text-2xl">Notifications</p>

        <div className="w-full">
          {notifs.map((item, index) => {
            console.log(item);
            return (
              <NotificationItem
                text={item.text}
                key={index}
                variant={item.variant}
              />
            );
          })}
        </div>
      </div>
      <div
        className="
      items-center 
      flex 
      flex-col
      h-[30%]
      border-b-2
      border-gray-200
      
      "
      >
        <p className="text-2xl">F.A.Q</p>
      </div>
      <div className="h-[40%]">
        <iframe
          src="https://freedomcare.com/blog/"
          title="freedom care blog"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default RightSidebar;

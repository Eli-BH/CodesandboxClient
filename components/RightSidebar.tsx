import React, { JSXElementConstructor } from "react";
import { JsxElement } from "typescript";

type NotificationType = {
  text: string;
  color: string;
};

const RightSidebar = () => {
  const notifs = [
    {
      text: "Form Error",

      color: "red",
    },
    {
      text: "New Patient Added",

      color: "green",
    },
    {
      text: "Date reminder",

      color: "yellow",
    },
  ];

  return (
    <div
      className="
        border-l-2
        h-full
        w-[20%]
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
          {notifs.map((item, index) => (
            <NotificationItem text={item.text} key={index} color={item.color} />
          ))}
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

const NotificationItem = ({ text, color }: NotificationType) => {
  return (
    <div
      className={`
  border-2 
  border-${color}-500 
  p-1
  w-[80%]
  mt-2
  text-${color}-500
  rounded-md
  flex
  flex-col
  items-center
  justify-center
  hover:text-${color}-700
  hover:bg-${color}-200
  font-semibold
  cursor-pointer
  mx-auto
  `}
    >
      {text}
    </div>
  );
};

export default RightSidebar;

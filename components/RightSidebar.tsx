import React, { JSXElementConstructor } from "react";
import { JsxElement } from "typescript";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

import Swal from 'sweetalert2';
import { Views } from "@react-next-calendar/core";

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

  const eventsList = [
    {
      allDay: false,
      start: new Date('November 25, 2022 11:00:00'),
      end: new Date('November 25, 2022 12:00:00'),
      title: 'Hiya!',
      desc: "Test"
    },
    {
      allDay: true,
      start: new Date('November 24, 2022 11:00:00'),
      end: new Date('November 24, 2022 12:00:00'),
      title: 'Thanksgiving',
      desc: "Test2"
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
      h-[40%]
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
      <div className="h-[60%]  flex
        flex-col content-center justify-center">
          <Calendar
            localizer={localizer}
            events={eventsList}
            onSelectEvent = {(info) => {
              Swal.fire(
                  info.title,
                  "Description: " + info.desc,
                  'info',
                  console.log(info)
                )            
          }}
            startAccessor="start"
            endAccessor="end"
            toolbar = {false}
            style={{ display: "contents"}}
          />
        </div>
    </div>
  );
};

export default RightSidebar;

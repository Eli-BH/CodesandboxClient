import { Tab } from "@headlessui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

import Swal from "sweetalert2";

const CalendarPage = () => {
  const resolutions = {
    homeTab100: "h-[95%]",
    homeTab150: "h-[100%]",
  };

  const eventsList = [
    {
      allDay: false,
      start: new Date("December 2, 2022 11:00:00"),
      end: new Date("December 2, 2022 12:00:00"),
      title: "Hiya!",
      desc: "Test",
    },
    {
      allDay: true,
      start: new Date("December 4, 2022 11:00:00"),
      end: new Date("December 5, 2022 12:00:00"),
      title: "Multi-Hiya",
      desc: "Test2",
    },
  ];

  return (
    <div
      className={
        window.devicePixelRatio >= 1.5
          ? resolutions.homeTab150
          : resolutions.homeTab100
      }
    >
      <Tab.Group>
        <Tab.Panel
          className="
            bg-white
            h-full
            border-x-2
            border-b-2
            border-t-2
            border-gray-400
            rounded-b-lg
            rounded-t-lg
            flex
            flex-col
            justify-center
          "
        >
          <Calendar
            localizer={localizer}
            events={eventsList}
            onSelectEvent={(info) => {
              Swal.fire(info.title, "Description: " + info.desc, "info");

              console.log(info);
            }}
            startAccessor="start"
            endAccessor="end"
            style={{ display: "contents" }}
          />
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default CalendarPage;

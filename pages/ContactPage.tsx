import { contactItems } from "../utils/constants";

const ContactPage = (): JSX.Element => {
  return (
    <div
      className="
        w-full
        h-full
        bg-white
        rounded-lg
        border-2
        border-gray-400

        "
    >
      <div className="pl-5 h-[18%] flex flex-col justify-evenly">
        <p className="text-[1.8em] lg:text-[2em] font-bold">
          Our New York Locations
        </p>
        <p className="text-sm w-[280px] md:w-full lg:w-full xl:w-full lg:text-xl font-semibold">
          All office visits are by appointment only. Call{" "}
          <a href="tel:877-771-5875">(877) 771-5875</a> to schedule.
        </p>
      </div>

      <div
        className="
          h-[85%]
          bg-white
          overflow-auto
          gap-5
          flex
          w-full
          items-start
          justify-around
          p-5
          flex-wrap
          rounded-lg
      "
      >
        {contactItems.newYork.map((item, index) => (
          <a
            href={`tel:${
              item.number &&
              item.number.replace(" ", "-").replace("(", "").replace(")", "")
            }`}
          >
            <div
              key={index}
              className="
          flex
          flex-col
          border-2
          border-gray-600
          rounded-lg
          p-3
          w-[210px]
          h-[210px]
          shadow-lg
          opacity-75
          shadow-black
          bg-gray-50
          z-0
        "
            >
              <p className="font-bold">{item.title}</p>
              <p>{item.address}</p>
              <p>{item?.address2}</p>
              <p>{item.local}</p>
              <p>{item?.number}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;

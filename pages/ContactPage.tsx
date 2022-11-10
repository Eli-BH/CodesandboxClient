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
      <div className="pl-5">
        <p className="text-[3em] font-bold">Our New York Locations</p>
        <p className="text-xl font-semibold">
          All office visits are by appointment only. Call (877) 771-5875 to
          schedule.
        </p>
      </div>

      <div
        className="
          h-[75vh]
          overflow-y-scroll
          gap-5
          flex
          flex-wrap
          bg-white
          items-start
          p-5
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
          p-5
          w-[200px]
          h-[250px]
          shadow-lg
          opacity-75
          shadow-black
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

import React from "react";

const RightSidebar = () => {
  return (
    <div
      className="
        border-l-2
        h-full
        w-[20%]
        bg-white
        items-center
        flex
        flex-col
        hidden
        lg:block
        "
    >
      <div>
        <iframe
          src="https://freedomcare.com/blog/"
          title="freedom care blog"
          className="w-full h-[400px]"
        ></iframe>
      </div>
    </div>
  );
};

export default RightSidebar;

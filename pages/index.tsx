import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div
      className="
        md:w-[100%]
        lg:w-[60%]
        h-[87%]
        p-2
        rounded-b-lg
      "
    >
      <h1>Hello World!</h1>
    </div>
  );
}

import Image from "next/image";
import logo from "../utils/Logo-Orange.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";
const LoginPage = ({ children }: any): JSX.Element => {
  const router = useRouter();

  // useEffect(()=>{
  //    router.push('https')
  // }, [])
  return (
    <div className="relative w-[100vw] h-[100vh] flex">
      <div className="w-full lg:w-[50%] h-[100%] bg-no-repeat bg-cover bg-center bg-[url('../utils/background.png')] flex justify-center items-center ">
        <div className="w-[450px] md:h-[550px] lg:h-[550px] xl:h-[550px] h-full bg-white  lg:rounded-md shadow-lg opacity-100 shadow-black ">
          <div className="h-[20%]  flex justify-center items-center  ">
            <Image
              src={logo}
              alt="Freedom care logo"
              className="w-[300px] h-auto"
              priority
              onClick={() => router.push("/auth/signin")}
            />
          </div>

          {children}
        </div>
      </div>
      <div className="lg:block shadow-2xl  shadow-black hidden lg:w-[50%] h-full bg-[url('../utils/caregiver.jpg')] bg-cover bg-no-repeat bg-right"></div>
    </div>
  );
};

export default LoginPage;

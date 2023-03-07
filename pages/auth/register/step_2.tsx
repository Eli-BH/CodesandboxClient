import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../../utils/Logo-Orange.svg";
import { nextButtonStyle, statesArr } from "../../../utils/constants";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const step_2 = () => {
  const [scrollAnim, setScrollAnim] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    birthdate: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    formState,
    reset,
  } = useForm<IFormInput>({});

  const router: NextRouter = useRouter();
  const errorStyle = "border-red-600 bg-red-100";

  console.log({
    watch,
    register,
    control,
    formState,
  });

  for (var key in router.query) {
    router.query[key.toLowerCase()] = router.query[key];
  }

  let { email, ID } = router.query;

  // let email = router.query.email ||router.query.EMAIL || router.query.Email
  // let ID =  router.query.ID || router.query.Id || router.query.id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.post(
          `https://mysteps.freedomcare.com/api/auth/check_user`,
          {
            //@ts-ignore
            email: email.toLowerCase(),
            id: ID,
          }
        );

        if (result.data.redirect) {
          router.push("https://mysteps.freedomcare.com/auth/signin");
        }

        if (result.data.user) {
          const {
            firstname,
            lastname,
            email,
            mobilephone,
            mailingstate,
            mailingcity,
            mailingpostalcode,
            mailingstreet,
            birthdate,
          } = result.data.user;

          setUserInfo({
            ...userInfo,
            firstName: firstname || "",
            lastName: lastname || "",
            email: email.toLowerCase() || "",
            phone: mobilephone || "",
            state: mailingstate || "",
            city: mailingcity || "",
            zip: mailingpostalcode || "",
            address: mailingstreet || "",
            birthdate: (birthdate && birthdate?.split("T")[0]) || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [email]);

  console.log({
    email: email,
    ID: ID,
  });

  useEffect(() => {
    reset({
      ...userInfo,
      phone: (userInfo.phone && userInfo?.phone.slice(2)) || "",
      password: "",
      confirmPassword: "",
    });
  }, [userInfo]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const registerResponse = await axios.post(
        `https://mysteps.freedomcare.com/api/auth/register`,
        {
          role: "Caregiver",
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          address: data.address,
          state: data.state,
          zip: data.zip,
          city: data.city,
          dateOfBirth: data.birthdate,
          phone: data.phone,
          password: data.password,
        }
      );

      console.log(registerResponse.data);

      if (registerResponse.data.success === false) {
        console.log(registerResponse.data.message);
      }

      if (registerResponse.data.success === true) {
        console.log(registerResponse.data);
      }

      if (registerResponse.data.success === true) {
        const authResponse = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        authResponse?.status === 200
          ? router.push("/")
          : setError(authResponse?.error);
      }
    } catch (error: any) {
      console.log(error);

      setError(error?.response?.data?.message);
      // console.log(error.response.data.message);
    }
  };

  let emailRegex =
    /(?:[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9A-Z](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    <div className="w-full h-full  bg-[url('../utils/background.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        className="w-full h-full lg:w-[60%] lg:h-[85%]   bg-white md:rounded-md lg:rounded-md shadow-black shadow-xl overflow-y-auto "
        onScroll={() => setScrollAnim(true)}
      >
        <div className="w-full h-[10%] justify-center flex">
          <Image
            src={logo}
            className="py-2 w-[250px] lg:w-[400px] h-auto"
            alt="freedom care logo"
            priority
          />
        </div>
        <hr />

        <div className="w-full h-[90%] flex ">
          <form
            className="w-full h-full flex flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*  */}
            <div className="w-[100%] md:w-[50%]  lg:w-[50%]  h-[80%]  flex flex-col justify-evenly items-center">
              <div className="w-[100%] md:w-[85%] lg:w-[70%] h-full flex flex-col items-center justify-evenly">
                <div className=" flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[45%] lg:w-[45%] relative">
                    First Name:
                    <input
                      type="text"
                      disabled
                      placeholder="First Name"
                      value={userInfo.firstName}
                      className={`w-full border border-black rounded-sm bg-gray-300 ${
                        errors.firstName && errorStyle
                      }`}
                      required
                      {...register("firstName", {
                        // pattern: {
                        //   value: /^[A-Za-z]+$/,
                        //   message: "Letters only",
                        // },
                        required: {
                          value: true,
                          message: "First name required",
                        },
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 ${
                        errors.firstName ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.firstName && errors.firstName.message}
                      </p>
                    </div>
                  </label>

                  <label className="w-[46%]  md:w-[45%] lg:w-[45%] relative">
                    Last Name:
                    <input
                      type="text"
                      disabled
                      placeholder="Last Name"
                      value={userInfo.lastName}
                      className={`w-full border border-black bg-gray-300 rounded-sm ${
                        errors.lastName && errorStyle
                      }`}
                      {...register("lastName", {
                        // pattern: {
                        //   value: /^[A-Za-z]+(?:[-]\S[A-Za-z]*)?$/,
                        //   message: "Letters only",
                        // },
                        required: {
                          value: true,
                          message: "Last name required",
                        },
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.lastName ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.lastName && errors.lastName.message}
                      </p>
                    </div>
                  </label>
                </div>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Email Address:
                  <input
                    type="email"
                    value={email}
                    disabled
                    placeholder="Email"
                    className={`w-full border bg-gray-300 border-black rounded-sm ${
                      errors.email && errorStyle
                    }`}
                    autoComplete="on"
                    {...register("email", {
                      pattern: { value: emailRegex, message: "Invalid email" },
                      required: { value: true, message: "Email required" },
                    })}
                  />
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Mobile Number:
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PatternFormat
                        className={`w-[100%] border  border-black rounded-sm ${
                          errors.phone && errorStyle
                        }`}
                        format="1 (###) ###-####"
                        value={value}
                        allowEmptyFormatting
                        mask="_"
                        onChange={onChange}
                        required
                      />
                    )}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.phone ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.phone && errors.phone.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  Date of Birth:
                  <input
                    type="date"
                    className={`w-full border border-black  rounded-sm`}
                    {...register("birthdate", {
                      required: {
                        value: true,
                        message: "Date of birth required",
                      },
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.birthdate ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.birthdate && errors.birthdate.message}
                    </p>
                  </div>
                </label>

                <div className="flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[%] lg:w-[45%] relative">
                    Password:
                    <input
                      type="text"
                      placeholder="Password"
                      className={`w-full border border-black rounded-sm ${
                        errors.password && errorStyle
                      }`}
                      {...register("password", {
                        required: { value: true, message: "Password required" },
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.password ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.password && errors.password.message}
                      </p>
                    </div>
                  </label>

                  <label className="w-[46%] md:w-[50%] lg:w-[51%] relative">
                    Confirm Password:
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className={`w-full border border-black rounded-sm ${
                        errors.confirmPassword && errorStyle
                      }`}
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: { value: true, message: "Password required" },
                        validate: (val: string) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.confirmPassword ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.confirmPassword &&
                          errors.confirmPassword.message}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/*  */}
            <div
              className={`w-full md:hidden lg:hidden flex justify-center flex-col items-center ${
                scrollAnim ? "hidden" : ""
              }`}
            >
              <p className="text-2xl font-sans font-semibold">Scroll down</p>
              <div className=" mt-3  flex items-center justify-center  self-center animate-bounce">
                <HiOutlineChevronDoubleDown className="text-[34px] text-orange-700" />
              </div>
            </div>

            <div className="w-[100%]  md:w-[50%]  lg:w-[50%] h-[80%] flex flex-col items-center">
              <div className="w-[100%] md:w-[85%] lg:w-[70%] h-full flex flex-col items-center justify-evenly">
                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Physical Address:
                  <input
                    className={`w-full border border-black  rounded-sm  ${
                      errors.address && errorStyle
                    }`}
                    type="text"
                    placeholder="Address"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Street addr. required",
                      },
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.address ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.address && errors.address.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Address2:
                  <input
                    className={`w-full border border-black  rounded-sm  ${
                      errors.address2 && errorStyle
                    }`}
                    type="text"
                    placeholder="Apartment, suite, etc."
                    {...register("address2")}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.address2 ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.address2 && errors.address2.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  City/Town:
                  <input
                    className={`w-full border border-black  rounded-sm  ${
                      errors.city && errorStyle
                    }`}
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: { value: true, message: "City name required" },
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.city ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.city && errors.city.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  State:
                  <select
                    placeholder="State"
                    className={`w-full border border-black rounded-sm  ${
                      errors.state && errorStyle
                    }`}
                    {...register("state", {
                      required: {
                        value: true,
                        message: "Please select your state",
                      },
                    })}
                  >
                    {statesArr.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.state ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.state && errors.state.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  Zip:
                  <input
                    className={`w-full border border-black  rounded-sm  ${
                      errors.zip && errorStyle
                    }`}
                    type="text"
                    placeholder="eg: 11209"
                    {...register("zip", {
                      required: {
                        value: true,
                        message: "Postal code required",
                      },

                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: "invalid zip code format",
                      },
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 ${
                      errors.zip ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.zip && errors.zip.message}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <hr />
            <div className="h-[10%] flex justify-around items-center w-full py-[50px] md:py-0">
              <button className={nextButtonStyle} onClick={() => router.back()}>
                Back
              </button>
              <button type="submit" className={nextButtonStyle}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step_2;

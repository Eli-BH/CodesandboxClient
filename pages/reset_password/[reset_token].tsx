import { useRouter, NextRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import LoginPage from "../LoginPage";
import axios from "axios";

interface IForm {
  password: string;
  confirmPassword: string;
}

const resetPasswordPage = (): JSX.Element => {
  const [passwordViz, setPasswordViz] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const { reset_token } = router.query;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      await axios.post(
        `https://fc-iss-server.herokuap.com/api/reset_password/${reset_token}`,
        {
          newPassword: data.password,
        }
      );

      setSuccess(true);

      setTimeout(() => {}, 3000);

      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginPage>
      <form
        autoComplete="off"
        className="h-[80%] flex flex-col p-5 justify-evenly items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.confirmPassword ? (
          <div className="w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200">
            {errors?.confirmPassword?.message}
          </div>
        ) : (
          <p className="font-semibold w-3/4">
            Enter your new password in the fields below.
          </p>
        )}

        {success ? (
          <div className="w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200">
            Success you will now be redirected to login
          </div>
        ) : (
          <>
            <label className="w-3/4 md:w-3/4 lg:w-3/4  flex flex-col">
              Password:
              <input
                className="w-full"
                type={passwordViz ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                {...register("password")}
              />
            </label>
            <label className="w-3/4 md:w-3/4 lg:w-3/4  flex flex-col">
              Confirm Password:
              <input
                className="w-full"
                type={passwordViz ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete="off"
                {...register("confirmPassword", {
                  required: true,
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
            </label>

            <div className="w-3/4 md:w-3/4 lg:w-3/4  flex items-center justify-start">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                className="mr-2"
                onChange={() => setPasswordViz((prev) => !prev)}
              />
              Show passwords
            </div>
          </>
        )}

        <button
          className="
  bg-[#12385a] 
  rounded-sm 
  font-semibold 
  text-white 
  border-2 
  border-orange-500 
  px-3 
  py-2 
  text-xl 
  w-[10em] 
  cursor-pointer 
  hover:scale-95 
  transition-all 
  outline-none 
  focus:border-green-500"
        >
          Submit
        </button>
      </form>
    </LoginPage>
  );
};

export default resetPasswordPage;

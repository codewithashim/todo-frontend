import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "axios";
import { signupUrl } from "../../../Utils/Urls/SignupUrl";

const upload_preset = "Codewithashim";
const cloud_name = "codewithashim";
const cloud_api = "https://api.cloudinary.com/v1_1/codewithashim/image/upload";
const cloud_folder = "Codewithashim";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  const passwordVisible = () => {
    setShowPassword(showPassword ? false : true);
  };
  const cPasswordVisible = () => {
    setShowCPassword(showCPassword ? false : true);
  };

  const signUpHandler = async (dataValue) => {
    ///////////////////////////////////////////////
    //               Photo Upload               //
    /////////////////////////////////////////////*/
    setLoading(true);
    const imageUploadData = new FormData();
    imageUploadData.append("file", imageFile);
    imageUploadData.append(
      "public_id",
      `${cloud_folder}/Profile/${imageFile.name}`
    );
    imageUploadData.append("upload_preset", `${upload_preset}`);
    imageUploadData.append("cloud_name", `${cloud_name}`);
    const imgRes = await fetch(`${cloud_api}`, {
      method: "POST",
      body: imageUploadData,
    });
    const imgdata = await imgRes.json();
    const imgurl = imgdata?.secure_url;
    console.log(imgurl, "Upload Image ++++");

    ///////     End of Photo Upload     ////////

    const role = "user";
    const { fullName, bio, email, password, username } = dataValue;
    const response = await axios.post(signupUrl, {
      email: email,
      role: role,
      password: password,
      name: fullName,
      username: username,
      bio: bio,
      profilePicture: imgurl,
    });

    const responseData = await response?.data;

    console.log(responseData, "response data");

    if (responseData) {
      console.log(response?.data);
      router("/login");
      if (responseData) {
        Swal.fire({
          position: "top-end",
          timerProgressBar: true,
          title: "Successfully Sign Up Done !",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#ED1C24",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <section className="container">
      <div className="md:px-16 my-[2rem] lg:w-[80%] mx-auto p-4">
        <div className="flex flex-col gap-4 ">
          <div className="xxs:px-[25px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[28px] xl:px-[40px] py-10  bg-[#f7f7f7] shadow-md rounded-lg">
            <h4 className="xs:text-2xl xxs:text-md sm:text-3xl md:text-3xl">
              Account details
            </h4>
            <p className="mt-4 text-[15px] text-[#676767] font-[400]">
              You only need to answer a few straightforward questions.
            </p>
            <form onSubmit={handleSubmit(signUpHandler)}>
              <div className="flex flex-col gap-4 my-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className="text-[15px] font-[500] shadow-md rounded-lg px-2.5 py-4 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("fullName")}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="text-[15px] font-[500] shadow-md rounded-lg px-2.5 py-4 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("username")}
                />
                <input
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  className="text-[15px] font-[500] shadow-md rounded-lg px-2.5 py-4 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("bio")}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="text-[15px] font-[500] rounded-lg px-2.5 py-4 bg-white leading-tight focus:outline-none shadow-md focus:shadow-outline w-full"
                  {...register("email")}
                  required
                />
              </div>
              <div className="relative my-6">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="text-[15px] font-[500] bg-white outline-none w-full rounded-lg shadow-md px-2.5 py-4 "
                  {...register("password")}
                />
                <span
                  className="text-[#6b7280] text-[20px] absolute  top-[18px] inset-y-0 right-0 pr-3 flex "
                  onClick={passwordVisible}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>

              <div className="relative mb-6">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="text-[15px] font-[500] bg-white outline-none w-full rounded-lg shadow-md px-2.5 py-4 "
                  {...register("confirmPassword")}
                />
                <span
                  className="text-[#6b7280] text-[20px] absolute   top-[18px] inset-y-0 right-0 pr-3 flex "
                  onClick={cPasswordVisible}
                >
                  {showCPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  className="text-[15px] font-[500] bg-white outline-none w-full rounded-lg shadow-md px-2.5 py-4 border-2 border-gray-300"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 my-6 md:flex-row">
                <div className="flex items-center sm:col-span-6 xxs:col-span-12 sm:justify-start xxs:justify-center">
                  <p className="text-base text-normal">
                    Have already an account?{" "}
                    <Link to="/login">
                      <b className="text-blue-500 text-red-10">Login here</b>
                    </Link>
                  </p>
                </div>
                <div className="flex sm:col-span-6 xxs:col-span-12 md:justify-end xxs:justify-center">
                  <button className="uppercase common-btn">
                    {loading ? "Loading..." : "Signup"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

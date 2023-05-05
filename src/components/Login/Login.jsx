import React, { useContext, useState } from "react";
import "./Login.css";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../Providers/AuthProviders";
import { toast } from "react-toastify";
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [control, setControl] = useState(false);
  const { signInUser, signInWithGoogle,signInWithGitHub } = useContext(AuthContext);
  const Navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";
  console.log(from);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(toast.success("SignIn With Google Successful"));
        Navigate(from, { replace: true });
      })
      .catch(() => {
        setError(
          toast.error("SignIn with google unsuccessful. Please try again!!")
        );
      });
  };

  const handleGitHubSignIn = () => {
    signInWithGitHub()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(toast.success("SignIn With GitHub Successful"));
        Navigate(from, { replace: true });
      })
      .catch(() => {
        setError(
          toast.error("SignIn with GitHub unsuccessful. Please try again!!")
        );
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        Navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="formLogin">
      <h1 className="titleFont">Login</h1>
      <form onSubmit={handleLogin} className="formDetails">
        <h2 className="mb-3">Email</h2>
        <input
          type="email"
          name="email"
          className="inputField w-full"
          id="email"
          required
        />
        <h2 className="mt-5 mb-3">Password</h2>
        {control ? (
          <>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              name="password"
              className="inputField w-full"
            />
            <span
              onClick={() => setControl(!control)}
              className="relative left-96 bottom-7"
            >
              <FontAwesomeIcon icon={faEye} />
            </span>
          </>
        ) : (
          <>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="inputField w-full"
            />
            <span
              onClick={() => setControl(!control)}
              className="relative left-96 bottom-7"
            >
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </>
        )}
        <button className="button w-full mt-10 font-semibold">Login</button>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register">
            <button className="text-yellow-800 font-semibold">
              Create an account
            </button>
          </Link>
        </p>
        <div className="flex justify-center items-center gap-4 mt-5">
          <hr className="hr w-1/2"></hr>
          <span>Or</span>
          <hr className="hr w-1/2"></hr>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="googleBtn flex justify-center items-center mx-auto w-full p-2 mt-8"
        >
          <img
            className="w-[32px] h-[32px] mr-2"
            src="https://i.ibb.co/ngm3bhN/google-logo-9808.png"
            alt=""
          />
          <span>Continue With Google</span>
        </button>
        <button
          onClick={handleGitHubSignIn}
          className="googleBtn flex justify-center items-center mx-auto w-full p-2 mt-8"
        >
          <img
            className="w-[32px] h-[32px] mr-2"
            src="https://i.ibb.co/GtNwXBL/Git-Hub-Mark-removebg-preview.png"
            alt=""
          />
          <span>Continue With GitHub</span>
        </button>
      </form>
    </div>
  );
};

export default Login;

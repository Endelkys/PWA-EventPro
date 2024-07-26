import React from "react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import AnimatedPage from "../components/Animation/AnimatedPage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../components/Animation/ScrollToTopButton";

const Login = () => {
  const { login, user, isAuthenticated, errors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.success("Iniciando sesión...");

    setTimeout(async () => {
      await login(email, password);
      if (errors) {
        console.log(errors);
        toast.error(errors);
      } else {
        toast.dismiss(toastId);
      }
    }, 2000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        if (user.role === "promotor") {
          navigate("/promotor");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [isAuthenticated, navigate, user]);

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <AnimatedPage>
        <ToastContainer />
        <div className="flex justify-center items-center py-8">
            <div
              className="max-w-md w-11/12 bg-gradient-to-r from-complement-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 md:w-4/5"
              style={{ animation: "slideInFromLeft 1s ease-out" }}
            >
              <h2
                className="text-center text-4xl font-extrabold text-secondary-50 -mb-5"
                style={{ animation: "appear 2s ease-out" }}
              >
                Bienvenido
              </h2>
              <p
                className="text-center text-secondary-200"
                style={{ animation: "appear 3s ease-out" }}
              >
                Ingresa en tu cuenta
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                <input
                placeholder="juan@example.com"
                className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                required=""
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label
                className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm"
                htmlFor="email"
                >
                Email
                </label>
                </div>
                <div className="relative">
                <input
                placeholder="Password"
                className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                required=""
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label
                className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm"
                htmlFor="password"
                >
                Contraseña
                </label>
                </div>
                {errors && <p className="text-red-500 text-center">{errors}</p>}
                <button
                className="w-full py-2 px-4 bg-primary-500 rounded-md shadow-lg text-secondary-50 font-semibold transition hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-primary-600 hover:cursor-pointer"
                type="submit"
                >
                Iniciar Sesion
                </button>
                </form>
              <div className="text-center text-secondary-300">
                No tienes una cuenta?{" "}
                <a
                  className="text-primary-300 hover:underline cursor-pointer"
                  onClick={redirectToRegister}
                >
                  Registrate
                </a>
              </div>
            </div>
          </div>

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Login;

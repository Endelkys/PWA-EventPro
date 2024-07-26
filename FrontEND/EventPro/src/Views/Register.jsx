import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import AnimatedPage from "../components/Animation/AnimatedPage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from "../components/Animation/ScrollToTopButton.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPromotor, setIsPromotor] = useState(false); 
  const navigate = useNavigate();
  const { register, user, isAuthenticated, errors } = useAuth();
  const [registerAttempt, setRegisterAttempt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Las Contraseñas no coinciden");
    }
    register(name, email, password, isPromotor);
    setRegisterAttempt(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        if (user.role === 'user') {
          navigate("/dashboard")
        } else if (user.role === "admin") {
          navigate("/adminDashboard")
        } else if (user.role === "promotor") {
          navigate("/promotor")
        } else {
          throw new Error("Ocurrio un error en la respuesta del servidor")
        }
      }
    }
  }, [isAuthenticated, navigate, user])

  useEffect(() => {
    if (registerAttempt && !error) {
      redirectToLoginWithDelay();
    }
  }, [error, registerAttempt]);

  //Si hubo error al registrar que me lo almacene en la estado local de error
  useEffect(() => {
    if (errors) {
      setError(errors)
    }
  }, [errors])

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToLoginWithDelay = () => {
    toast.success("Registrado...");
    setTimeout(() => {
      redirectToLogin();
      toast.dismiss(); 
    }, 2000); 
  };

  return (
    <>
      <Header />
      <AnimatedPage>
      <ToastContainer />

        <div className="flex justify-center items-center py-5">
          <div
            className="max-w-md w-11/12 bg-gradient-to-r from-complement-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 "
            style={{ animation: "slideInFromLeft 1s ease-out" }}
          >
            <h2
              className="text-center text-4xl font-extrabold text-secondary-50"
              style={{ animation: "appear 2s ease-out" }}
            >
              Registro
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  placeholder="Nombre y Apellido"
                  type="text"
                  id="name"
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                />
                <label className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm">
                  Nombre y Apellido
                </label>
              </div>

              <div className="relative">
                <input
                  placeholder="juan@example.com"
                  className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                  type="email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm">
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  placeholder="Contraseña"
                  type="password"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                />
                <label className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm">
                  Contraseña
                </label>
              </div>

              <div className="relative">
                <input
                  placeholder="Confirmar Contraseña"
                  type="password"
                  required=""
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError('');
                  }}
                  className="peer h-10 w-full border-b-2 border-secondary-300 text-secondary-50 bg-transparent placeholder-transparent focus:outline-none focus:border-primary-500"
                />
                <label className="absolute left-0 -top-3.5 text-secondary-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary-500 peer-focus:text-sm">
                  Comfirmar Contraseña
                </label>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                className="w-full py-2 px-4 bg-primary-500 rounded-md shadow-lg text-secondary-50 font-semibold transition hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-primary-600 hover:cursor-pointer"
                type="submit"
              >
                Registrarse
              </button>
            </form>
            <div className="text-center ring-offset-background focus:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-8 border-0 rounded-full text-sm font-medium text-secondary-50 bg-gradient-to-l from-complement-400 to-primary-400 shadow-lg hover:from-primary-400 hover:to-blue-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <label htmlFor="toggle" className="">
                Quieres ser un promotor y promocinar eventos? Haz click Aqui
              </label>
              <input
                type="checkbox"
                id="toggle"
                checked={isPromotor}
                onChange={() => setIsPromotor(!isPromotor)}
              />
            </div>

            <div className="text-center text-secondary-300">
              Ya tienes una cuenta?{" "}
              <a
                className="text-primary-300 hover:underline cursor-pointer"
                onClick={redirectToLogin}
              >
                Inicia Sesión
              </a>
            </div>
          </div>
        </div>

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default Register;

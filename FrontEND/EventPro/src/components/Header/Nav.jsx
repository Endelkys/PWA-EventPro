import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const cd = "/cd.png";

const NavLinks = ({ categories, handleLogout, setCategories }) => {
  const handleClick = (category) => {
    setCategories(
      categories.map((cat) =>
        cat === category ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  return (
    <>
      {categories.map((category, index) => (
        <NavLink
          key={index}
          to={category.to}
          onClick={() => {
            if (category.name === "LogOut") {
              handleLogout();
            } else {
              handleClick(category);
            }
          }}
          className={`${
            category.active ? "text-red-500" : ""
          } hover:bg-primary-700 text-center hover:text-secondary-50 text-secondary-100 hover:shadow-lg hover:rounded-2xl rounded-2xl p-5 transition duration-500 ease-in-out`} 
          activeclassname="text-red-500"
        >
          {category.name}
        </NavLink>
      ))}
    </>
  );
};

const Switch = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : ""
  );
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      setTheme("dark");
    }
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
    if (localStorage.getItem("theme") === "light") {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.querySelector("html")?.classList.remove("light");
    }
    if (theme === "light") {
      document.querySelector("html")?.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.querySelector("html")?.classList.add("light");
    }
  }, [theme]);

  function toggleDarkMode() {
    setTheme(theme === "light" ? "dark" : "light");
    const root = document.querySelector("body");
    if (root) {
      root.classList.toggle("dark-mode");
    }
  }

  return (
    <>
      <input
        type="checkbox"
        id="mode-switch"
        className="hidden"
        onChange={toggleDarkMode}
        checked={theme === "dark" ? true : false}
      />
      <label
        htmlFor="mode-switch"
        className={
          "dark:bg-secondary-700 border-4 border-primary-700 dark:border-primary-300 -mt-2 bg-secondary-200 bg-opacity-50 inline-flex relative rounded-full p-2 transition-colors duration-300 ease-in-out "
        }
      >
        <i
          className={
            "dark:text-transparent dark:translate-x-4 text-gray-200 dark:opacity-0 fas fa-sun mr-2 transition-all duration-300 ease-in-out"
          }
        />
        <i
          className={
            "dark:text-primary-500 dark:translate-x-0 dark:opacity-100 opacity-0 translate-x-[-1rem] text-transparent fas fa-moon ml-2 transition-all duration-300 ease-in-out"
          }
        />
      </label>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { logout, user, isAuthenticated } = useAuth();

  const getCategories = () => {
    if (isAuthenticated) {
      switch (user.role) {
        case "admin":
          return [
            { name: "Home", to: "/dashboard", active: false },
            { name: "Solicitudes", to: "/solicitud", active: false },
            { name: "Boletos", to: "/boletos", active: false },
            { name: "Pagos", to: "/pagos", active: false },
            { name: "Usuarios", to: "/adminUsers", active: false },
            { name: "LogOut", to: "", active: false },
          ];
        case "promotor":
          return [
            { name: "Home", to: "/promotor", active: false },
            { name: "Solicitud", to: "/solicitud", active: false },
            { name: "Perfil", to: "/profile", active: false },
            { name: "AboutUs", to: "/aboutUs", active: false },
            { name: "LogOut", to: "", active: false },
          ];
        default:
          return [
            { name: "Home", to: "/dashboard", active: false },
            { name: "Eventos", to: "/eventos", active: false },
            { name: "Boletos", to: "/boletos", active: false },
            { name: "Perfil", to: "/profile", active: false },
            { name: "AboutUs", to: "/aboutUs", active: false },
            { name: "LogOut", to: "", active: false },
          ];
      }
    } else {
      return [
        { name: "Home", to: "/", active: false },
        { name: "Login", to: "/login", active: false },
        { name: "Registro", to: "/register", active: false },
        { name: "AboutUs", to: "/aboutUs", active: false },
      ];
    }
  };

  const [categories, setCategories] = useState(getCategories());

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <nav className="flex w-1/3 justify-end">
        <div className="inline-flex md:hidden mx-3 items-center cursor-pointer">
          <Switch />
        </div>

        <div className="hidden w-full justify-end md:flex text-xl">
          <Switch />

          <div className="lg:text-xl md:text-md sm:text-sm">
            <NavLinks
              categories={categories}
              handleLogout={openModal}
              setCategories={setCategories}
            />
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex basis-full ml-10 flex-col items-center text-center space-y-1 mb-5 p-2 ">
          <NavLinks categories={categories} handleLogout={openModal} />
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Logout Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <div className="text-center bg-primary-00 dark:bg-primary-700 w-fit p-8 rounded-2xl mx-auto">
          <img
            src={cd}
            className="animate-spin w-40 h-auto object-cover mx-auto mb-5"
          />
          <h1 className="text-2xl text-white font-bold">
            ¿Estás seguro de que quieres cerrar sesión?
          </h1>
          <h2 className="text-xl text-secondary-700 dark:text-secondary-200  font-bold">
            Luego tendras que ingresar tus datos de nuevo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-5 md:gap-3 items-center">
            <button
              onClick={() => {
                closeModal();
                logout();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 lg:text-xl md:text-lg sm:text-lg"
            >
              Confirmar Logout
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 lg:text-xl md:text-lg sm:text-lg"
            >
              Cancelar Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Nav;

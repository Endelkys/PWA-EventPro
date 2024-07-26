import { Component } from "react";
import mision from "/mision.jpg";
import servicios from "/servicios.jpg";
import brain from "/brain.png";
import service from "/service.png";
import partners from "/partners.png";
import integrity from "/trust.png";

function About() {
  return (
    <>
      <div className="dark:bg-primary-700 bg-primary-400  py-16 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="poppins text-4xl text-secondary-900 sm:text-4xl animate-bounce">
              About Us
            </h1>
            <p className="mt-4 text-2xl text-secondary-50">
              ¡Bienvenido a EventPro! Nos apasiona crear experiencias de eventos
              inolvidables.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-4">
              <img
                className="h-40 w-40 rounded-full shadow-xl shadow-gray-300 hover:animate-pulse"
                src="https://i.ibb.co/GV7GxCZ/avatar1105266211.jpg"
                alt="Team member 1"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-secondary-50">
                Juan González
              </h2>
              <p className="dark:text-secondary-200 text-secondary-600 font-bold">CEO & Fundador</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <img
                className="h-40 w-40 rounded-full shadow-xl shadow-gray-300 hover:animate-pulse"
                src="https://i.ibb.co/t29p6jp/avatar1473660530.jpg"
                alt="Team member 2"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-secondary-50">
                Juan Sarmiento
              </h2>
              <p className="dark:text-secondary-200 text-secondary-600 font-bold">CEO & Fundador</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <img
                className="h-40 w-40 rounded-full shadow-xl shadow-gray-300 hover:animate-pulse"
                src="https://i.ibb.co/s3F1qsr/avatar1045924273.jpg"
                alt="Team member 3"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-secondary-50">
                Leonardo Méndez
              </h2>
              <p className="dark:text-secondary-200 text-secondary-600 font-bold">CEO & Fundador</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dark:bg-primary-900 bg-primary-700 py-16 px-4 sm:px-6 lg:px-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="w-11/12 mx-auto">
          <img
            src={mision}
            alt="Mision"
            className="max-w-full rounded-full w-2/5 mx-auto animate-ping"
          />
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-secondary-50 mb-8 mt-6">
            Nuestra Misión
          </h2>
          <p className="text-center text-lg lg:text-xl text-secondary-50">
            En EventPro, nuestra misión es conectar a las personas a través de
            experiencias emocionantes y memorables. Nos esforzamos por crear
            eventos que inspiren, deleiten y unan a comunidades de todo el
            mundo.
          </p>
        </div>

        <div className="w-11/12 mx-auto">
          <img
            src={servicios}
            alt="Servicios"
            className="max-w-full rounded-full w-2/5 mx-auto animate-ping"
          />
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-secondary-50 mb-8 mt-6">
            Nuestros Servicios
          </h2>
          <p className="text-center text-lg lg:text-xl text-secondary-50">
            En EventPro, ofrecemos una variedad de servicios para satisfacer
            todas sus necesidades de eventos. Ya sea que esté planeando una
            reunión pequeña o una conferencia a gran escala, ¡nosotros lo
            tenemos cubierto!
          </p>
        </div>
      </div>

      <div className="dark:bg-primary-700 bg-primary-400 py-16 px-4 sm:px-6 lg:px-8 -mb-8">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-center text-3xl font-bold text-secondary-50 mb-8 -mt-9 md:-mt-5 animate-bounce">
              Nuestros Valores
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <section className="w-4/5 mx-auto text-center mb-8 space-y-11">
                <div className="grid items-center">
                  <span className="text-secondary-50 text-xl lg:text-2xl font-bold mb-2 mt-8">
                    Creatividad
                  </span>
                  <p className="dark:text-secondary-300 text-secondary-600 text-lg lg:text-xl font-bold">
                    Fomentamos una cultura de creatividad, alentando ideas y
                    soluciones innovadoras en todo lo que hacemos.
                  </p>
                  <img
                    src={brain}
                    alt="creatividad"
                    className="w-4/12 mx-auto mt-2"
                  />
                </div>

                <div className="grid items-center">
                  <span className="text-secondary-50 text-xl lg:text-2xl font-bold mb-2 mt-8">
                    Excelencia
                  </span>
                  <p className="dark:text-secondary-300 text-secondary-600  text-lg lg:text-xl font-bold">
                    Nos esforzamos por la excelencia en cada aspecto de nuestro
                    trabajo, brindando eventos y servicios de alta calidad a
                    nuestros clientes.
                  </p>
                  <img
                    src={service}
                    alt="creatividad"
                    className="w-4/12 mx-auto mt-2"
                  />
                </div>
              </section>

              <section className="w-4/5 mx-auto text-center space-y-11">
                <div className="grid items-center">
                  <span className="text-secondary-50 text-xl lg:text-2xl font-bold mb-2 mt-8">
                    Comunidad
                  </span>
                  <p className="dark:text-secondary-300 text-secondary-600  text-lg lg:text-xl font-bold">
                    Creemos en el poder de la comunidad y buscamos crear eventos
                    inclusivos que reúnan a las personas fomentando asi en
                    esparcimiento social.
                  </p>
                  <img
                    src={partners}
                    alt="creatividad"
                    className="w-4/12 mx-auto mt-2"
                  />
                </div>

                <div className="grid mx-auto ">
                  <span className="text-secondary-50 text-xl lg:text-2xl font-bold mb-2 mt-8">
                    Integridad
                  </span>
                  <p className="dark:text-secondary-300 text-secondary-600  text-lg lg:text-xl font-bold">
                    Nos comportamos con integridad, honestidad y transparencia
                    en todas nuestras interacciones e intentamos promover las
                    mismas acciones.
                  </p>
                  <img
                    src={integrity}
                    alt="creatividad"
                    className="w-4/12 mx-auto mt-2"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

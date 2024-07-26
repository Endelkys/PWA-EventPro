import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import cd from '/cd.png';
import AnimatedPage from '../components/Animation/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import ScrollToTopButton from '../components/Animation/ScrollToTopButton';

const Profile = () => {
  const { user, editUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    setEditedUser(user);
    setEditing(false)
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editUser(user._id, editedUser);
  }

  return (
    <>
      <Header />
      <AnimatedPage>

        <img src={cd} className="animate-spin w-40 h-auto object-cover mx-auto mb-5" />
        <section className="w-11/12 mx-auto mt-5">
          <h1 className='dark:text-white text-primary-900 text-3xl text-center poppins font-bold mb-4'>Perfil de Usuario</h1>
          <div className="bg-[#9984D4] rounded-lg shadow-md p-8 mx-auto max-w-md w-11/12">
            <div className="flex flex-col items-center">
              {editing ? (
                <>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="mb-2 px-2 py-2 border rounded-lg w-full"
                    placeholder="Nombre"
                    style={{ minHeight: '40px' }}
                  />
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="mb-2 px-2 py-2 border rounded-lg w-full"
                    placeholder="Correo electrónico"
                    style={{ minHeight: '40px' }}
                  />
                  <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-secondary-50 font-bold py-2 px-4 rounded mt-2">
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  {user && (
                    <>
                      <div className='text-center'>
                        <h3 className="text-white text-3xl font-bold mb-2">Hola! {user.name}</h3>
                        <p className="poppins font-bold text-2xl mb-1 dark:text-[#230C33] text-primary-800">Email: {user.email}</p>
                        <p className="poppins font-bold text-2xl mb-1 dark:text-[#230C33] text-primary-800">Rol: {user.role}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="bg-blue-500 animate-bounce hover:bg-blue-700 text-secondary-50 font-bold py-2 px-4 rounded mt-2"
                      >
                        Editar Perfil
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default Profile;

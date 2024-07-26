import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Animation/Loading'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', role: '' });
  const [filterRole, setFilterRole] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el loader

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`);
        setTimeout(() => { // Simula un retraso de 3 segundos antes de mostrar los datos
          setUsers(res.data.users);
          setIsLoading(false); // Después de 3 segundos, se cambia isLoading a false
        }, 3000);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id, user) => {
    setEditingUserId(id);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/users/${editingUserId}`, editedUser);
      console.log('User updated:', res.data);
      setUsers(users.map(user =>
        user._id === editingUserId ? { ...user, ...editedUser } : user
      ));
      setEditingUserId(null);
      setEditedUser({ name: '', email: '', role: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async id => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/auth/users/${id}`);
      console.log('User deleted:', res.data);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;

  return (
    <section alt="Lista de usuarios" className="w-11/12 mx-auto mt-5">
      <div className="flex justify-center mb-4">
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="animate-pulse p-2 border rounded-lg text-white">
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="user">Usuario</option>
          <option value="promotor">Promotor</option>
        </select>
      </div>
      {isLoading ? ( // Mostrar el loader mientras isLoading es true
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredUsers.map(user => (
            <div key={user._id} className="p-5 rounded-xl mb-3 flex flex-col items-center justify-center transform transition hover:scale-110 duration-300" style={{ background: '#9984D4', minWidth: 0 }}>
              {editingUserId === user._id ? (
                <div className="flex flex-col items-center">
                  <h1 className='bg-[#592E83] text-secondary-50 font-bold py-2 px-4 rounded mr-2 mb-2'>Editando</h1>
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
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={e => setEditedUser({ ...editedUser, role: e.target.value })}
                    className="mb-2 px-2 py-2 border rounded-lg w-full"
                    placeholder="Rol"
                    style={{ minHeight: '40px' }}
                  />
                  <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-secondary-50 font-bold py-2 px-4 rounded mt-2">
                    Guardar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className='text-center'>
                    <h3 className="amatic-sc-bold text-3xl font-bold mb-2">{user.name}</h3>
                    <p className="text-xl mb-1">Email: {user.email}</p>
                    <p className="text-xl mb-1">Rol: {user.role}</p>
                  </div>
                  <div className="flex flex-wrap mt-4">
                    <button
                      onClick={() => handleEdit(user._id, user)}
                      className="bg-blue-500 hover:bg-blue-700 text-secondary-50 font-bold py-2 px-4 rounded mr-2 mb-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-secondary-50 font-bold py-2 px-4 rounded mb-2"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UsersList;

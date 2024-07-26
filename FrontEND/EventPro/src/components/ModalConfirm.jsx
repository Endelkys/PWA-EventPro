import React from 'react';

const ModalConfirm = ({ isOpen, onCancel, onConfirm, id }) => {
  const handleConfirm = () =>{
    onConfirm(id);
    const timer = setTimeout(()=> {
      onCancel();
    }, 1000)
    return () => clearTimeout(timer)
  }

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'
        } fixed inset-0 bg-black bg-opacity-25 flex flex-col items-center justify-center`}
    >
      <div>
        <div className="bg-primary-750 p-7 rounded-t-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">¿Estás seguro que deseas eliminar este elemento?</p>
        </div>
        <div className="bg-primary-250 p-3 rounded-b-lg">
          <div className="flex justify-between mx-auto w-2/3 gap-6">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm

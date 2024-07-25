import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext';
import Register from '../src/Views/Register';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => {
  const actualToast = jest.requireActual('react-toastify');
  return {
    ...actualToast,
    toast: {
      ...actualToast.toast,
      success: jest.fn(() => 'mock-toast-id'),
      dismiss: jest.fn()
    }
  };
});

describe('Componente de Register', () => {
  test('El toast de éxito se muestra después de registrarse', async () => {

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Nombre y Apellido'), { target: { value: 'Juan Sarmiento' } });
    fireEvent.change(getByPlaceholderText('juan@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: 'password' } });
    fireEvent.change(getByPlaceholderText('Confirmar Contraseña'), { target: { value: 'password' } });

    fireEvent.click(getByText(/Registrarse/i));

    // Espera a que se muestre el toast de éxito
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Registrado...");
    });

  });
});

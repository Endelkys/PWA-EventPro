import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext';
import Login from '../src/Views/Login';
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

describe('Login Component', () => {
  test('El toast de éxito se muestra después de iniciar sesión', async () => {

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(getByPlaceholderText('juan@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByText(/Iniciar Sesion/i));

    // Espera a que se muestre el toast de éxito
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Iniciando sesión...");
    });

  });
});

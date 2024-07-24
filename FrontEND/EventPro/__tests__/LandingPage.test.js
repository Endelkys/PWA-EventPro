import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from '../src/Views/LandingPage';
import { AuthProvider } from "../src/contexts/AuthContext";
import 'jest-localstorage-mock';

describe('LandingPage components', () => {
  test('Pagina de inicio con la que comienza el programa', () => {
    localStorage.setItem('token', 'miToken');
    const { container } = render(
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    );
    expect(container).toBeDefined();
  });
});
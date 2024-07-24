import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import EventCard from '../src/components/Eventos/EventCard';

// Mock para useNavigate
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Componente EventCard', () => {
  const events = [
    {
      _id: '1',
      name: 'Evento de Prueba',
      image: 'url-de-la-imagen',
      place: 'Lugar del Evento',
      date: new Date('2024-04-13T12:00:00'),
      status: 'Disponible'
    },
  ];
  const userRole = 'admin';

  it('debe mostrar la información del evento y los botones de administrador si el rol es admin', () => {
    const { getByText } = render(
      <Router>
        <EventCard events={events} userRole={userRole} />
      </Router>
    );

    // Verifica que se muestre la información del evento
    expect(getByText('Evento de Prueba')).toBeInTheDocument();
    expect(getByText((content) => content.includes('Lugar del Evento'))).toBeInTheDocument();
    expect(getByText(/Fecha:/)).toBeInTheDocument();
    expect(getByText(/Hora:/)).toBeInTheDocument();
    expect(getByText('Disponible')).toBeInTheDocument();

    expect(getByText('Editar')).toBeInTheDocument();
    expect(getByText('Eliminar')).toBeInTheDocument();
  });

  it('debe navegar a la página de boletos cuando se hace clic en Comprar Boleto', () => {
    const { getByText } = render(
      <Router>
        <EventCard events={events} userRole="user" />
      </Router>
    );

    fireEvent.click(getByText('Comprar Boleto'));
    expect(mockedNavigate).toHaveBeenCalledWith('/boletos', { state: { boleto: events[0] } });
  });
});

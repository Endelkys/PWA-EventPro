import Footer from '../components/Footer'
import Header from '../components/Header/Header';

import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AnimatedPage from '../components/Animation/AnimatedPage';
import FormRequest from '../components/Solicitudes/FormRequest'
import Solicitudes from '../components/Solicitudes/Solicitudes';
import ScrollToTopButton from '../components/Animation/ScrollToTopButton';
import { useLocation } from 'react-router-dom';

function Solicitud() {
  const { user } = useAuth();
  const location = useLocation();
  const editingEvent = location.state?.event;
  const isEditing = location.state?.isEditing;
  const [editing, setEditing] = useState(false);
  const [updateEvents, setUpdateEvents] = useState(false);
  const [accepted, setAccepted] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //verifcar si se va a editar el evento
    if (!isEditing) {
      return setEditing(false);
    }
    setEditing(true);
  }, [isEditing, location])


  useEffect(() => {
    if (user.role !== 'promotor' && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate])

  return (
    <>
      <Header />
      <AnimatedPage>
        <div className='flex justify-center items-center flex-col w-full'>
          <FormRequest
            accepted={accepted}
            editingEvent={editingEvent}
            editing={editing}
            setEditing={setEditing}
            setUpdateEvents={setUpdateEvents}
          />
          {!editing && (
            <Solicitudes
              setAccepted={setAccepted}
              updateEvents={updateEvents}
              setUpdateEvents={setUpdateEvents}
            />
          )}
        </div>
      </AnimatedPage>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default Solicitud

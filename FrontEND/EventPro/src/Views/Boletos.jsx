import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import ScrollToTopButton from '../components/Animation/ScrollToTopButton';
import AnimatedPage from '../components/Animation/AnimatedPage';
import { getPaymentRecordsUser } from '../utils/paymentRequest';
import { getEventsSold } from '../utils/eventRequest';
import { useEffect, useState } from 'react';
import TicketCard from '../components/Boletos/TicketCard';
import Loading from '../components/Animation/Loading';
import EventCard from '../components/Eventos/EventCard';

function Boletos() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true); 
  const [loadingEvents, setLoadingEvents] = useState(true); 

  const fetchPaymentsUser = async () => {
    try {
      const res = await getPaymentRecordsUser();
      console.log(res);
      setPayments(res.data.paymentRecords);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPayments(false);
    }
  };

  const fetchEventsSold = async () => {
    try {
      const res = await getEventsSold();
      console.log(res.data.events);
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    if (user.role === 'admin') {
      fetchEventsSold();
    } else {
      fetchPaymentsUser();
    }
  }, [user]);

  return (
    <>
      <AnimatedPage>
        <Header />
        {user.role === 'admin' ? (
          <>
            <h2 className='text-3xl text-center poppins font-bold mb-4 bg-gradient-to-r w-fit p-3 mx-auto from-complement-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden'>Boletos Comprados</h2>
            {loadingEvents ? ( 
              <Loading />
            ) : (
              <>
                {events.length > 0 ? (
                  <div className='grid grid-cols-1 gap-5 p-5'>
                    <EventCard events={events} userRole={user.role} />
                  </div>
                ) : (
                  <h2 className='text-center font-bold text-3xl py-52'>No se encontraron Boletos Vendidos</h2>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h2 className='text-3xl text-center poppins font-bold mb-4 bg-gradient-to-r w-fit p-3 mx-auto from-complement-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden text-white'>Tus Boletos</h2>
            {loadingPayments ? ( 
              <Loading />
            ) : (
              <>
                {payments.length > 0 ? (
                  <div className='grid grid-cols-1 gap-5 p-5'>
                    {payments.map(payment => (
                      <TicketCard key={payment._id} payment={payment} />
                    ))}
                  </div>
                ) : (
                  <h2 className='text-center py-52'>Boletos comprados por evento</h2>
                )}
              </>
            )}
          </>
        )}
        <Footer />
        <ScrollToTopButton />
      </AnimatedPage>
    </>
  );
}

export default Boletos;

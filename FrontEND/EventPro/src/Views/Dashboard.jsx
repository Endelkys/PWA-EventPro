import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import DashboardCards from '../components/Dashboard/DashboardCards';
import AnimatedPage from '../components/Animation/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import UserContent from '../components/Dashboard/UserContent';
import ScrollToTopButton from '../components/Animation/ScrollToTopButton';
import EventCard from '../components/Eventos/EventCard';
import { getEventsStatus } from '../utils/eventRequest';
import { useState, useEffect } from 'react';
import Loading from '../components/Animation/Loading'

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await getEventsStatus('Disponible');
      setEvents(res.data.events);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.role === 'admin') {
      fetchEvents()
    }
  }, [])

  return (
    <>
      <Header />
      <AnimatedPage>
        {user.role === 'admin' ? (
          <>
            <div className='flex flex-col justify-center p-4 items-center mx-auto'>
              <h2 className='bg-gradient-to-r from-complement-800 to-primary-600 montserrat text-3xl w-lg font-black text-center p-3 mb-8 rounded-xl text-white'>Eventos Disponbiles</h2>
              {loading ? (
                <Loading />
              ) : (
                <EventCard
                  events={events}
                  userRole={user.role}
                />
              )}
            </div>
          </>
        ) : (

          <>
            <DashboardCards />
            <UserContent />

          </>
        )}

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default Dashboard

import { useEffect } from 'react'
import Trail from '../components/LandingPage/Trail'
import Header from '../components/Header/Header'
import LandingCard from '../components/LandingPage/LandingCard'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'
import AnimatedPage from '../components/Animation/AnimatedPage'
import ScrollToTopButton from '../components/Animation/ScrollToTopButton'

function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'promotor') {
        navigate("/promotor")
      } else {
        navigate("/dashboard")
      }
    }
  }, [user, navigate])

  return (
    <>
      <Header />
      <AnimatedPage>

      <section className="w-11/12 mx-auto mt-10 text-center py-12">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 justify-center items-baseline cursor-pointer">
          <Trail />
          <LandingCard />
        </div>
      </section>

      </AnimatedPage>
      <Footer />
      <ScrollToTopButton/>
    </>
  )
}

export default LandingPage

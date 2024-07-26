import AnimatedPage from '../components/Animation/AnimatedPage'
import ScrollToTopButton from '../components/Animation/ScrollToTopButton'
import DashboardCards from '../components/Dashboard/DashboardCards'
import UserContent from '../components/Dashboard/UserContent'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'

function PromotorPage() {
  return (
    <>
    <AnimatedPage>
      <Header />

      <DashboardCards/>
      <UserContent/>

      <Footer />
      <ScrollToTopButton/>
      </AnimatedPage>
    </>
  )
}

export default PromotorPage

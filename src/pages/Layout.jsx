import { Outlet } from 'react-router-dom'
import Wrapper from './Wrapper/Wrapper'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between sm:min-w-[780px]">
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </div>
  )
}

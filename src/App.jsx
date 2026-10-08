import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

import Home from './pages/Home'
import Community from './pages/Community.jsx'
import CommunityWrite from './pages/CommunityWrite.jsx'
import Header from './Header'
import Footer from './Footer'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductList from './pages/ProductList.jsx'
import BestNew from './pages/BestNew.jsx'
import Mypage from './pages/Mypage.jsx'
import Cart from './pages/cart.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import CommunityDetail from './pages/CommunityDetail.jsx'
import BrandStory from './pages/BrandStory.jsx'
import CustomerCenter from './pages/CustomerCenter.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import ScrollToTopButton from './components/ScrollToTopButton'

import './App.css'

// 다른 페이지로 이동할 때만 맨 위로
// 같은 페이지 안에서 query string만 바뀌는 경우에는 스크롤 유지
function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter basename="/shop-community-server">
      <ScrollManager />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<BrandStory />} />
        <Route path="/customer-center" element={<CustomerCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/:id" element={<CommunityDetail />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/best-new" element={<BestNew />} />
        <Route path="/shop/products" element={<ProductList />} />
        <Route path="/shop/:id" element={<ProductDetail />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </BrowserRouter>
  )
}

export default App
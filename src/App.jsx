import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Workshops from './pages/Workshops'
import Gallery from './pages/Gallery'
import ArtworkDetail from './pages/ArtworkDetail'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Gypsum from './pages/Gypsum'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOverview from './pages/admin/AdminOverview'
import AdminArtworks from './pages/admin/AdminArtworks'
import AdminWorkshops from './pages/admin/AdminWorkshops'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import AdminGypsum from './pages/admin/AdminGypsum'
import AdminActivityLog from './pages/admin/AdminActivityLog'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<ArtworkDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gypsum" element={<Gypsum />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="artworks" element={<AdminArtworks />} />
              <Route path="workshops" element={<AdminWorkshops />} />
              <Route path="registrations" element={<AdminRegistrations />} />
              <Route path="gypsum" element={<AdminGypsum />} />
              <Route path="activity" element={<AdminActivityLog />} />
            </Route>
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

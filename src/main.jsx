import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripID]'
import SavedTrips from './components/SavedTrips'
import About from './pages/About'
import Contact from './pages/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <App />
      </>
    ),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/create-trip',
    element: (
      <>
        <CreateTrip />
      </>
    ),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/view-trip/:tripID',
    element: (
      <>
        <ViewTrip />
      </>
    ),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/saved-trips',
    element: (
      <>
        <SavedTrips />
      </>
    ),
    errorElement: <ErrorBoundary />
  },
  {
    path: '/about',
    element: (
      <>
        <About />
      </>
    ),
    errorElement: <ErrorBoundary /> 
  },
  {
    path: '/contact',
    element: (
      <>
        <Contact />
      </>
    ),
    errorElement: <ErrorBoundary />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)

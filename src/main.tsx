import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import './index.css'
import App from './App.tsx'

const convexUrl = import.meta.env.VITE_CONVEX_URL
const root = createRoot(document.getElementById('root')!)

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

root.render(
  convexUrl
    ? <ConvexProvider client={new ConvexReactClient(convexUrl)}>{app}</ConvexProvider>
    : app,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin, Flip, ScrambleTextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip, ScrambleTextPlugin);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

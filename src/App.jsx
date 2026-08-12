import { Routes, Route } from 'react-router-dom'
import RefinedHome from './components/RefinedHome.jsx'
import TechHubRoadmaps from './components/TechHubRoadmaps.jsx'
import Cursor from './components/Cursor.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import TechHubStory from './components/TechHubStory.jsx'

export default function App() {
  return (
    <>
      <SplashScreen />
      <Cursor />
      <Routes>
        <Route path="/" element={<RefinedHome />} />
        <Route path="/roadmaps" element={<TechHubRoadmaps />} />
        <Route path="/story" element={<TechHubStory />} />
      </Routes>
      <WhatsAppFloat />
    </>
  )
}
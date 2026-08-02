import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './Pages/Home.jsx';
import Properties from './Pages/Properties.jsx';
import Location from './Pages/Location.jsx';
import About from './Pages/About.jsx';
import Blogs from './Pages/Blogs.jsx';
import ConsultationPage from './Pages/ConsultationPage.jsx';
import PropertyShow from './Pages/PropertyShow.jsx';

export default function App() {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Properties" element={<Properties />} />
            <Route path="/Location" element={<Location />} />
            <Route path="/About" element={<About />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/ConsultationPage" element={<ConsultationPage />} />
            <Route path="/property-show" element={<PropertyShow />} />
        </Routes>
    );
}

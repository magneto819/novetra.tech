import './App.css';
import { useEffect, useState } from 'react';
import AdminApp from './admin/AdminApp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { defaultSiteContent } from './content/siteContent';
import { fetchSiteContent } from './lib/siteContentApi';

function App() {
  const isAdminRoute = window.location.pathname.replace(/\/+$/, '') === '/admin';

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return <PublicSite />;
}

function PublicSite() {
  const [content, setContent] = useState(defaultSiteContent);

  useEffect(() => {
    let isMounted = true;

    fetchSiteContent()
      .then((nextContent) => {
        if (isMounted) setContent(nextContent);
      })
      .catch(() => {
        if (isMounted) setContent(defaultSiteContent);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar brand={content.brand} nav={content.nav} />
      <Hero content={content.hero} />
      <About content={content.about} />
      <Services content={content.services} />
      <WhyUs content={content.whyUs} />
      <Contact content={content.contact} />
      <Footer brand={content.brand} content={content.footer} />
    </>
  );
}

export default App;

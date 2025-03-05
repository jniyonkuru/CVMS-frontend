import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import KeyFeatures from '../components/KeyFeatures';
import Footer from "../components/Footer";
import TestimonialSection from '../components/TestimonialSection';


const Home: React.FC = () => {
  return (
    <div>
      
      <Header />
      <HeroSection />
      <KeyFeatures />
      <TestimonialSection/>
      <Footer />
    </div>
  );
};

export default Home;
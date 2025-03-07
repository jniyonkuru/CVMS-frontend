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
      <div id="heroSection">
        <HeroSection />
      </div>
      <div id="keyFeatures">
        <KeyFeatures />
      </div>
      <div id="testimonialSection">
        <TestimonialSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

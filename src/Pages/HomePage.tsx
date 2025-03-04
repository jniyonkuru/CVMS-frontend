import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import KeyFeatures from '../components/KeyFeatures';
import Footer from "../components/Footer";
import TestimonialSection from '../components/TestimonialSection';
import PagerWrapper from '../components/PagerWrapper';

const Home: React.FC = () => {
  return (
    <div>
      <PagerWrapper>
      <Header />
      <HeroSection />
      <KeyFeatures />
      <TestimonialSection/>
      <Footer />
      </PagerWrapper>
    </div>
  );
};

export default Home;
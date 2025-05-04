import React from 'react';
import Hero from '../components/Hero';
import FeaturedBreeds from '../components/FeaturedBreeds';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedBreeds />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
};

export default Home; 
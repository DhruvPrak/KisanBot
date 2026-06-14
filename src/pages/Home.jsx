import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';

function Home() {
  const features = [
    {
      icon: '🌱',
      title: 'Crop Disease Help',
      description: 'Describe your crop problem and get instant AI-powered advice specific to Uttarakhand mountain crops.',
    },
    {
      icon: '🐛',
      title: 'Pest Identification',
      description: 'Tell us what you see on your crops and we will help you identify the pest and suggest treatment.',
    },
    {
      icon: '💧',
      title: 'Irrigation Advice',
      description: 'Get guidance on watering schedules and irrigation methods suited for high-altitude farming.',
    },
    {
      icon: '🌤️',
      title: 'Season Planning',
      description: 'Plan your crop cycles better with advice tailored to the Kedarnath Valley climate and seasons.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="px-6 py-12 bg-white">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-8">
          What KisanBot Can Help You With
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
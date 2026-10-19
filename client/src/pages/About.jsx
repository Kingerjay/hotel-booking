import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 mt-10 text-center max-w-3xl mx-auto py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
        About QuickerStay
      </h1>
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
        Welcome to QuickerStay, the ultimate gateway to premium hotel experiences. 
        We specialize in connecting sophisticated travelers with a carefully curated selection 
        of the world’s most exclusive hotels, luxury resorts, and custom stays. 
      </p>
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Our platform is built to provide zero-friction room discovery, seamless secure checkouts, 
        and real-time booking confirmation insights, ensuring your next absolute luxury retreat is only a click away.
      </p>
    </div>
  );
};

export default About;
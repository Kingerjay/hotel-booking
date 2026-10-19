import React from 'react';

const Experience = () => {
  const values = [
    { title: 'Premium Comfort', desc: 'Handpicked properties offering unmatched high-end amenities.' },
    { title: 'Seamless Booking', desc: 'Blazing fast room scheduling with instantaneous availability validation.' },
    { title: 'Secure Checkouts', desc: 'Industry-standard encryption systems keeping your reservation details safe.' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 mt-10 py-20 bg-slate-50">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
          The QuickerStay Experience
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-16">
          We believe traveling should be effortless. From the instant you explore a destination to the moment you step foot in your resort suite, we redefine luxury workflows.
        </p>

        {/* Feature List Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left mt-8">
          {values.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
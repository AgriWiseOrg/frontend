import React from 'react';                                       // Importing React library to create component
import { useNavigate } from 'react-router-dom';                   // Hook used to programmatically navigate between routes
import { Award, Sprout, Landmark, Bell, ArrowLeft, ChevronRight } from 'lucide-react'; // Importing icon components

const GovtSchemes = () => {                                       // Functional component starts here

  const navigate = useNavigate();                                 // Initialize navigate function for routing

  const hubs = [                                                  // Array storing all card details
    {
      id: 'schemes',                                              // Unique identifier for this card
      title: 'Schemes for Me',                                    // Title shown on card
      description: 'Unlock government subsidies and financial aid tailored for your farm.', // Small text below title
      icon: <Award size={32} />,                                  // Icon element with size 32px
      gradient: 'from-emerald-500 to-teal-600',                   // Tailwind gradient classes
      shadow: 'shadow-emerald-200',                               // Shadow color class
      path: '/schemes/list'                                       // Route path when clicked
    },
    {
      id: 'tips',
      title: 'Smart Farming Tips',
      description: 'Modern advisory for sustainable growth and pest management.',
      icon: <Sprout size={32} />,
      gradient: 'from-green-400 to-emerald-500',
      shadow: 'shadow-green-200',
      path: '/schemes/tips'
    },
    {
      id: 'finance',
      title: 'Loans & Finance',
      description: 'Low-interest credit options and micro-finance for equipment.',
      icon: <Landmark size={32} />,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-200',
      path: '/schemes/finance'
    },
    {
      id: 'updates',
      title: 'Latest Updates',
      description: 'Never miss a deadline. News and notifications from agri-departments.',
      icon: <Bell size={32} />,
      gradient: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-200',
      path: '/schemes/updates'
    }
  ];

  return (                                                        // JSX rendering starts
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans"> {/* Full screen wrapper with padding */}

      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"> {/* Header container */}

        <div>                                                     {/* Left header section */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"> {/* Main heading */}
            AgriWise <span className="text-emerald-600">Support</span> {/* Highlighted word */}
          </h1>
          <p className="text-lg text-gray-500 mt-3 max-w-lg">     {/* Subtitle paragraph */}
            Your digital partner for navigating government schemes, financial growth, and expert farming advice.
          </p>
        </div>

        <button 
          onClick={() => navigate('/')}                           // On click go back to home route
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 w-fit" // Styling classes
        >
          <ArrowLeft size={20} />                                  {/* Left arrow icon */}
          Back to Home                                             {/* Button text */}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Grid layout for cards */}

        {hubs.map((hub) => (                                       // Loop through hubs array dynamically
          <div
            key={hub.id}                                            // Unique key for React rendering
            onClick={() => navigate(hub.path)}                     // Navigate to specific path when clicked
            className="group relative bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 active:scale-95" // Card styling
          >

            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.gradient} opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-500`} /> {/* Decorative gradient circle */}

            <div className="flex items-start justify-between">     {/* Top section inside card */}

              <div className={`p-4 rounded-2xl bg-gradient-to-br ${hub.gradient} text-white shadow-lg ${hub.shadow} group-hover:scale-110 transition-transform`}> {/* Icon wrapper */}
                {hub.icon}                                          {/* Render the icon */}
              </div>

              <div className="text-gray-300 group-hover:text-emerald-500 transition-colors"> {/* Arrow color change on hover */}
                <ChevronRight size={28} />                          {/* Right arrow icon */}
              </div>
            </div>

            <div className="mt-8">                                  {/* Text section below icon */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors"> {/* Card title */}
                {hub.title}                                         {/* Render title dynamically */}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base"> {/* Description text */}
                {hub.description}                                   {/* Render description dynamically */}
              </p>
            </div>

            <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${hub.gradient} transition-all duration-300 w-0 group-hover:w-full`} /> {/* Animated bottom border */}

          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16 p-8 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"> {/* Bottom CTA section */}

        <div className="text-center md:text-left">                 {/* Left text area */}
          <h3 className="text-xl font-bold">Stay ahead of the season</h3> {/* CTA heading */}
          <p className="text-emerald-100 opacity-80">We've tracked 45+ new schemes this month.</p> {/* CTA description */}
        </div>

        <button 
          onClick={() => navigate('/schemes/updates')}              // Navigate to updates page
          className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all active:scale-95" // Styling
        >
          View All Alerts                                           {/* Button text */}
        </button>
      </div>

    </div>
  );
};

export default GovtSchemes;                                         // Export component so it can be used elsewhere
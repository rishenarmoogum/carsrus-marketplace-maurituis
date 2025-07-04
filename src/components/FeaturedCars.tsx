
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fuel, Settings, Users } from 'lucide-react';

const FeaturedCars = () => {
  const featuredCars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry Hybrid',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 2023,
      fuel: 'Hybrid',
      transmission: 'Automatic',
      seats: 5,
      featured: true
    },
    {
      id: 2,
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      price: 2850000,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 2022,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      featured: true
    },
    {
      id: 3,
      brand: 'BMW',
      model: 'X3',
      price: 3200000,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 2023,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 7,
      featured: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Premium Cars</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of the finest vehicles available in Mauritius
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="group glass-effect rounded-3xl overflow-hidden shadow-lg car-card-hover"
            >
              {/* Car Image */}
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {car.year}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    Rs {car.price.toLocaleString()}
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Fuel className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                    <span className="text-sm text-gray-600">{car.fuel}</span>
                  </div>
                  <div className="text-center">
                    <Settings className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                    <span className="text-sm text-gray-600">{car.transmission}</span>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                    <span className="text-sm text-gray-600">{car.seats} Seats</span>
                  </div>
                </div>

                {/* Contact Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/buy-car"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group"
          >
            Browse All Cars
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;

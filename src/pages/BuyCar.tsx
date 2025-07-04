
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Fuel, Settings, Users, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BuyCar = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    transmission: '',
    fuel: '',
    minPrice: 0,
    maxPrice: 5000000,
    year: ''
  });

  // Enhanced car data with more realistic pricing for Mauritius
  const carsData = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      price: 750000,
      year: 2020,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '45,000 km',
      seats: 5,
      location: 'Port Louis',
      images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      features: ['Air Conditioning', 'Bluetooth', 'Reverse Camera']
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Civic',
      price: 850000,
      year: 2019,
      transmission: 'Manual',
      fuel: 'Petrol',
      mileage: '52,000 km',
      seats: 5,
      location: 'Quatre Bornes',
      images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      features: ['Sunroof', 'Leather Seats', 'Navigation']
    },
    {
      id: '3',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      price: 2850000,
      year: 2022,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '15,000 km',
      seats: 5,
      location: 'Grand Baie',
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      features: ['Premium Sound', 'Heated Seats', 'Panoramic Roof']
    },
    {
      id: '4',
      brand: 'BMW',
      model: 'X3',
      price: 3200000,
      year: 2023,
      transmission: 'Automatic',
      fuel: 'Petrol',
      mileage: '8,000 km',
      seats: 7,
      location: 'Curepipe',
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      features: ['All-Wheel Drive', 'Third Row Seating', 'Digital Dashboard']
    }
  ];

  const filteredCars = carsData.filter(car => {
    return (
      (filters.make === '' || car.brand === filters.make) &&
      (filters.model === '' || car.model === filters.model) &&
      (filters.transmission === '' || car.transmission === filters.transmission) &&
      (filters.fuel === '' || car.fuel === filters.fuel) &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.year === '' || car.year.toString() === filters.year)
    );
  });

  const brands = [...new Set(carsData.map(car => car.brand))];
  const models = [...new Set(carsData.map(car => car.model))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Browse <span className="gradient-text">Premium Cars</span>
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect vehicle from our curated collection
          </p>
        </div>

        {/* Filters Section */}
        <div className="glass-effect rounded-3xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <select
              value={filters.make}
              onChange={(e) => setFilters({...filters, make: e.target.value})}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={filters.model}
              onChange={(e) => setFilters({...filters, model: e.target.value})}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Models</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            <select
              value={filters.transmission}
              onChange={(e) => setFilters({...filters, transmission: e.target.value})}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <select
              value={filters.fuel}
              onChange={(e) => setFilters({...filters, fuel: e.target.value})}
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Max Price: Rs {filters.maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min={0}
                max={5000000}
                step={50000}
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredCars.length} of {carsData.length} cars
          </div>
        </div>

        {/* Cars Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredCars.map(car => (
            <div key={car.id} className={`group glass-effect rounded-3xl overflow-hidden shadow-lg car-card-hover ${viewMode === 'list' ? 'md:flex' : ''}`}>
              {/* Car Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className={`object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === 'list' ? 'w-full h-64 md:h-full' : 'w-full h-64'}`}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {car.year}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className={`p-6 ${viewMode === 'list' ? 'md:w-2/3 flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      Rs {car.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Fuel className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600 block">{car.fuel}</span>
                    </div>
                    <div className="text-center">
                      <Settings className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600 block">{car.transmission}</span>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600 block">{car.seats} Seats</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    View Details
                  </button>
                  <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BuyCar;

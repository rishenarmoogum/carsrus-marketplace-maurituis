
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Fuel, Settings, Users, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarDetailsModal from '../components/CarDetailsModal';
import ContactModal from '../components/ContactModal';
import { supabase } from '../integrations/supabase/client';

const BuyCar = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [allCars, setAllCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    transmission: '',
    fuel: '',
    minPrice: 0,
    maxPrice: 5000000,
    year: ''
  });

  // Load cars from Supabase
  useEffect(() => {
    const loadCars = async () => {
      try {
        // First get cars
        const { data: cars, error: carsError } = await supabase
          .from('cars')
          .select('*');

        if (carsError) {
          console.error('Error fetching cars:', carsError);
          return;
        }

        // Then get profiles for each car
        const carsWithProfiles = await Promise.all(
          cars.map(async (car) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, email')
              .eq('id', car.user_id)
              .single();

            return {
              id: car.id,
              brand: car.make,
              model: car.model,
              price: car.price,
              year: car.year,
              transmission: car.transmission || 'Automatic',
              fuel: car.fuel || 'Petrol',
              mileage: car.mileage ? `${car.mileage} km` : 'N/A',
              seats: car.seats || 5,
              location: 'Mauritius',
              images: car.images && car.images.length > 0 ? car.images : ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
              features: ['Contact Seller'],
              description: car.description || '',
              color: car.color || '',
              telephone: car.telephone || '',
              seller_name: profile?.full_name || 'Unknown Seller',
              seller_email: profile?.email || ''
            };
          })
        );

        setAllCars(carsWithProfiles);
      } catch (error) {
        console.error('Error loading cars:', error);
      }
    };

    loadCars();
  }, []);

  const filteredCars = allCars.filter(car => {
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

  const brands = [...new Set(allCars.map(car => car.brand))];
  const models = [...new Set(allCars.map(car => car.model))];

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setIsDetailsModalOpen(true);
  };

  const handleContactSeller = (car) => {
    setSelectedCar(car);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Browse <span className="text-red-600">Premium Cars</span>
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect vehicle from our curated collection
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-md border border-red-100 rounded-3xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <select
              value={filters.make}
              onChange={(e) => setFilters({...filters, make: e.target.value})}
              className="p-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={filters.model}
              onChange={(e) => setFilters({...filters, model: e.target.value})}
              className="p-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Models</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            <select
              value={filters.transmission}
              onChange={(e) => setFilters({...filters, transmission: e.target.value})}
              className="p-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <select
              value={filters.fuel}
              onChange={(e) => setFilters({...filters, fuel: e.target.value})}
              className="p-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                className="w-full accent-red-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredCars.length} of {allCars.length} cars
          </div>
        </div>

        {/* Cars Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredCars.map(car => (
            <div key={car.id} className={`group bg-white/80 backdrop-blur-md border border-red-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'md:flex' : ''}`}>
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
                    <p className="text-3xl font-bold text-red-600">
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
                        <span key={index} className="bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <button 
                    onClick={() => handleViewDetails(car)}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleContactSeller(car)}
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
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

      {/* Modals */}
      <CarDetailsModal 
        car={selectedCar}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      
      <ContactModal 
        car={selectedCar}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default BuyCar;

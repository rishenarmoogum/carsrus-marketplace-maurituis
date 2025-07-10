
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fuel, Settings, Users } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import CarDetailsModal from './CarDetailsModal';
import { Car } from '../hooks/useCars';

const FeaturedCars = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        // Load cars from Supabase, ordering by featured first, then by creation date
        const { data: supabaseCars, error } = await supabase
          .from('cars')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching cars from Supabase:', error);
        }

        // Get profiles for each car
        const carsWithProfiles = await Promise.all(
          (supabaseCars || []).map(async (car) => {
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
              image: car.images && car.images.length > 0 ? car.images[0] : 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              year: car.year,
              fuel: car.fuel || 'Petrol',
              transmission: car.transmission || 'Automatic',
              seats: car.seats || 5,
              featured: car.featured,
              images: car.images && car.images.length > 0 ? car.images : ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
              features: ['Contact Seller'],
              description: car.description || '',
              color: car.color || '',
              telephone: car.telephone || '',
              seller_name: profile?.full_name || 'Unknown Seller',
              seller_email: profile?.email || '',
              mileage: car.mileage ? `${car.mileage} km` : 'N/A',
              location: 'Mauritius'
            };
          })
        );

        // If we have less than 6 cars from database, fill with static cars
        if (carsWithProfiles.length < 6) {
          const staticFeaturedCars = [
            {
              id: 'static-1',
              brand: 'Toyota',
              model: 'Camry Hybrid',
              price: 1250000,
              image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              year: 2023,
              fuel: 'Hybrid',
              transmission: 'Automatic',
              seats: 5,
              featured: false,
              images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
              features: ['Contact Seller'],
              description: 'Excellent condition hybrid vehicle with great fuel economy.',
              color: 'Silver',
              telephone: '+230 5xxx xxxx',
              seller_name: 'CarDealer MU',
              seller_email: 'dealer@example.com',
              mileage: '25,000 km',
              location: 'Mauritius'
            },
            {
              id: 'static-2',
              brand: 'Mercedes-Benz',
              model: 'C-Class',
              price: 2850000,
              image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              year: 2022,
              fuel: 'Petrol',
              transmission: 'Automatic',
              seats: 5,
              featured: false,
              images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
              features: ['Contact Seller'],
              description: 'Luxury sedan with premium features and comfort.',
              color: 'Black',
              telephone: '+230 5xxx xxxx',
              seller_name: 'Mercedes Dealer',
              seller_email: 'mercedes@example.com',
              mileage: '15,000 km',
              location: 'Mauritius'
            },
            {
              id: 'static-3',
              brand: 'BMW',
              model: 'X3',
              price: 3200000,
              image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              year: 2023,
              fuel: 'Petrol',
              transmission: 'Automatic',
              seats: 7,
              featured: false,
              images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
              features: ['Contact Seller'],
              description: 'Spacious SUV perfect for families.',
              color: 'White',
              telephone: '+230 5xxx xxxx',
              seller_name: 'BMW Dealer',
              seller_email: 'bmw@example.com',
              mileage: '10,000 km',
              location: 'Mauritius'
            }
          ];

          const remainingSlots = 6 - carsWithProfiles.length;
          const staticCarsToAdd = staticFeaturedCars.slice(0, remainingSlots);
          setAllCars([...carsWithProfiles, ...staticCarsToAdd]);
        } else {
          setAllCars(carsWithProfiles);
        }
      } catch (error) {
        console.error('Error loading cars:', error);
        // Fallback to static cars if there's an error
        const staticFeaturedCars = [
          {
            id: 'static-1',
            brand: 'Toyota',
            model: 'Camry Hybrid',
            price: 1250000,
            image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            year: 2023,
            fuel: 'Hybrid',
            transmission: 'Automatic',
            seats: 5,
            featured: false,
            images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            features: ['Contact Seller'],
            description: 'Excellent condition hybrid vehicle.',
            color: 'Silver',
            telephone: '+230 5xxx xxxx',
            seller_name: 'CarDealer MU',
            seller_email: 'dealer@example.com',
            mileage: '25,000 km',
            location: 'Mauritius'
          }
        ];
        setAllCars(staticFeaturedCars);
      }
    };

    loadCars();
  }, []);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Featured <span className="text-red-600">Premium Cars</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of the finest vehicles available in Mauritius
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allCars.slice(0, 6).map((car) => (
              <div
                key={car.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-100"
              >
                {/* Car Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {car.featured ? 'Featured' : 'Available'}
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
                    <p className="text-3xl font-bold text-red-600">
                      Rs {car.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Fuel className="w-5 h-5 text-red-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600">{car.fuel}</span>
                    </div>
                    <div className="text-center">
                      <Settings className="w-5 h-5 text-red-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600">{car.transmission}</span>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-red-500 mx-auto mb-1" />
                      <span className="text-sm text-gray-600">{car.seats} Seats</span>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button 
                    onClick={() => handleViewDetails(car)}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
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
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 group"
            >
              Browse All Cars
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Car Details Modal */}
      <CarDetailsModal 
        car={selectedCar}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </>
  );
};

export default FeaturedCars;

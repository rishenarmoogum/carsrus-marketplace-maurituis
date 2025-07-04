
import React, { useState } from 'react';
import { Upload, X, CheckCircle, Car, ImageIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SellCar = () => {
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    type: '',
    fuel: '',
    engine: '',
    transmission: '',
    seats: '',
    mileage: '',
    price: '',
    description: '',
    location: '',
    phone: '',
    email: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).slice(0, 8);
      setImages(selected);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Thank you! Your car listing has been submitted for review. We will contact you within 24 hours.');
    console.log('Form submitted:', form);
    console.log('Images:', images);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Sell Your <span className="gradient-text">Car</span>
          </h1>
          <p className="text-xl text-gray-600">
            List your vehicle on Mauritius' most trusted marketplace
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ImageIcon className="w-6 h-6 mr-2 text-blue-600" />
                Car Photos
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  max="8"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Car Photos
                  </p>
                  <p className="text-gray-500">
                    Click to select up to 8 high-quality photos of your car
                  </p>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details Section */}
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Car className="w-6 h-6 mr-2 text-blue-600" />
                Car Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Make *
                  </label>
                  <select
                    name="make"
                    value={form.make}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Make</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Mazda">Mazda</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Kia">Kia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Corolla, Civic, Golf"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year *
                  </label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Color</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Silver">Silver</option>
                    <option value="Gray">Gray</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Van">Van</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuel"
                    value={form.fuel}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Engine Capacity (cc)
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={form.engine}
                    onChange={handleChange}
                    placeholder="e.g., 1500, 2000, 3000"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seating Capacity
                  </label>
                  <select
                    name="seats"
                    value={form.seats}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Seats</option>
                    <option value="2">2 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="7">7 Seats</option>
                    <option value="8">8+ Seats</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mileage (km)
                  </label>
                  <input
                    type="text"
                    name="mileage"
                    value={form.mileage}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (Rs) *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 750000"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    <option value="Port Louis">Port Louis</option>
                    <option value="Curepipe">Curepipe</option>
                    <option value="Quatre Bornes">Quatre Bornes</option>
                    <option value="Rose Hill">Rose Hill</option>
                    <option value="Grand Baie">Grand Baie</option>
                    <option value="Flic en Flac">Flic en Flac</option>
                    <option value="Mahebourg">Mahebourg</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your car's condition, features, service history, etc."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g., +230 5123 4567"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <CheckCircle className="inline w-6 h-6 mr-2" />
                List My Car
              </button>
              <p className="text-sm text-gray-500 mt-4">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellCar;

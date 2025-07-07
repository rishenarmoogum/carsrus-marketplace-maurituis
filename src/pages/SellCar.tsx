import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellCar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    color: '',
    type: '',
    fuel: '',
    engine: '',
    transmission: '',
    seats: '',
    description: ''
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalImages = images.length + selectedFiles.length;
      
      if (totalImages > 10) {
        alert('Maximum 10 images allowed');
        return;
      }
      
      setImages(prev => [...prev, ...selectedFiles]);
      
      // Create URLs for preview
      selectedFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        setImageUrls(prev => [...prev, url]);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new car object
      const newCar = {
        id: Date.now().toString(),
        make: form.make,
        model: form.model,
        year: parseInt(form.year),
        price: parseInt(form.price),
        mileage: form.mileage,
        color: form.color,
        fuel: form.fuel,
        transmission: form.transmission,
        seats: parseInt(form.seats) || 5,
        description: form.description,
        images: imageUrls,
        dateAdded: new Date().toISOString()
      };
      
      // Get existing cars from localStorage
      const existingCars = JSON.parse(localStorage.getItem('userCars') || '[]');
      
      // Add new car to the array
      const updatedCars = [...existingCars, newCar];
      
      // Save back to localStorage
      localStorage.setItem('userCars', JSON.stringify(updatedCars));
      
      setSubmitSuccess(true);
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting car:', error);
      alert('Error submitting car listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center bg-white border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to sell your car. Please sign in or create an account to continue.
          </p>
          <Button 
            onClick={() => window.location.href = '/login'}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center bg-white border-red-200">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 mb-6">
            Your car has been listed successfully! Redirecting to home page...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-8 shadow-2xl border-red-200 bg-white/90 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Sell Your Car</h1>
            <p className="text-gray-600">List your vehicle on Mauritius' most trusted marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-800">Car Images (Max 10)</Label>
              <div className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload car images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                </label>
              </div>

              {/* Image Preview */}
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Car image ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-red-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <select
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Select Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Kia">Kia</option>
                  <option value="Hyundai">Hyundai</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="e.g., Corolla, Civic"
                  required
                  className="border-red-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  min="1990"
                  max="2024"
                  required
                  className="border-red-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs) *</Label>
                <Input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g., 750000"
                  required
                  className="border-red-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  name="mileage"
                  type="number"
                  value={form.mileage}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  className="border-red-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <select
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Select Color</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Silver">Silver</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Gray">Gray</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={handleChange}
                  className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your car's condition, features, and any additional information..."
                rows={4}
                className="border-red-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
            >
              {isSubmitting ? 'Listing Your Car...' : 'List My Car'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SellCar;

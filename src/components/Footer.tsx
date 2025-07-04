
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">CarsRus</span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Mauritius' premier automotive marketplace, connecting buyers and sellers with trust and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/buy-car" className="block text-gray-300 hover:text-white transition-colors">
                Buy Car
              </Link>
              <Link to="/sell-car" className="block text-gray-300 hover:text-white transition-colors">
                Sell Car
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <div className="space-y-3 text-gray-300">
              <div>Car Financing</div>
              <div>Insurance</div>
              <div>Vehicle Inspection</div>
              <div>Trade-In Service</div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Royal Road St Pierre, Mauritius</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+230 5503 3736</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">carsrus88@outlook.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 CarsRus Mauritius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

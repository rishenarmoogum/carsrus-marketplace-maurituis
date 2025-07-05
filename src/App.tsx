// src/App.tsx
import React from 'react';
import './index.css'; // assuming Tailwind is set up here

function App() {
  return (
    <div className="bg-dark min-h-screen text-accent flex flex-col items-center justify-center p-6">
      <img src="/Logo Car.jpg" alt="CarsRus Logo" className="h-32 mb-4" />
      <h1 className="text-4xl font-bold text-primary">CarsRus</h1>
      <p className="mt-2 text-lg">Expert in Cars, Vans & Trucks</p>
    </div>
  );
}

export default App;

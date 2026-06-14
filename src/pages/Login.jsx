import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow px-6 py-12 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Login</h2>
        <p className="text-green-600 max-w-xl mx-auto text-lg">
          Login functionality will be available soon. This page will allow
          farmers and field supervisors to securely access their KisanBot
          account and chat history.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
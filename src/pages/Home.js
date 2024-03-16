import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="bg-pink-100 py-20 px-4 lg:px-0">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 lg:pr-10">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
              Welcome to LaborEase
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Where Laborers, Employers, and Contractors Connect
            </p>
            <div className="space-x-4 flex flex-wrap">
              <Link
                to="/mazdoor"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Mazdoor
              </Link>
              <Link
                to="/employer"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Employer
              </Link>
              <Link
                to="/contractor"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Contractor
              </Link>
            </div>
          </div>
          {/* Right side: Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section>
            
      </section>
    </div>
  );
}

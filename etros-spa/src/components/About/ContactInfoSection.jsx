import React from "react";

const ContactInfoSection = () => (
  <section className="py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Contact Us</h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-4">Phone</h3>
          <p className="text-gray-600 mb-2">Main Office</p>
          <p className="text-gray-900 font-medium">+359 123 456 789</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-4">Email</h3>
          <p className="text-gray-600 mb-2">General Inquiries</p>
          <p className="text-gray-900 font-medium">info@etrosbasketball.com</p>
          <p className="text-gray-600 mt-4 mb-2">Media Relations</p>
          <p className="text-gray-900 font-medium">media@etrosbasketball.com</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-4">Address</h3>
          <p className="text-gray-600 mb-2">Etros Arena</p>
          <p className="text-gray-900 font-medium">
            123 Main Street
            <br />
            Veliko Tarnovo
            <br />
            Bulgaria
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactInfoSection;

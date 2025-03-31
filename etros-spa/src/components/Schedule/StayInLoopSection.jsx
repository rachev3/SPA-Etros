import React from "react";

const CalendarDownloadSection = () => (
  <section className="py-16 px-4 bg-gradient-to-br from-purple-900 to-black text-white">
    <div className="max-w-5xl mx-auto rounded-lg bg-black bg-opacity-50 p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-8">
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-gray-300">
            Want to be the first to know about upcoming games, news, and team
            events? Join our mailing list and never miss a beat.
          </p>
        </div>
        <form className="w-full md:w-auto flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-lg transition-colors duration-200 font-bold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default CalendarDownloadSection;

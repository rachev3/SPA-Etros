import React from "react";

const AboutPage = () => {
  // Timeline items for history section
  const historyTimeline = [
    {
      year: "2010",
      title: "Foundation",
      description:
        "Etros Basketball was founded by a group of passionate basketball enthusiasts with the vision of creating a team that would represent Veliko Tarnovo on the national stage.",
    },
    {
      year: "2012",
      title: "First Championship",
      description:
        "After just two seasons, Etros captured its first regional championship, establishing itself as a rising power in Bulgarian basketball.",
    },
    {
      year: "2015",
      title: "National League Promotion",
      description:
        "The team earned promotion to the top-tier Bulgarian National Basketball League after three consecutive successful seasons.",
    },
    {
      year: "2018",
      title: "European Competition",
      description:
        "Etros made its first appearance in European competition, participating in the FIBA Europe Cup.",
    },
    {
      year: "2020",
      title: "New Arena",
      description:
        "The opening of the state-of-the-art Etros Arena marked a new era for the team, providing a world-class facility for players and fans.",
    },
    {
      year: "2023",
      title: "National Champions",
      description:
        "Etros claimed its first Bulgarian National Championship, defeating the long-time champions in a thrilling final series.",
    },
  ];

  // Core values
  const coreValues = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from our performance on the court to our interactions with fans and community.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Teamwork",
      description:
        "We believe in the power of teamwork, knowing that success comes when we work together toward a common goal.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Integrity",
      description:
        "We act with integrity and honesty, both on and off the court, setting an example for our community and fans.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "We embrace innovation and creativity, constantly seeking new ways to improve our game and enhance the fan experience.",
    },
  ];

  // Team management
  const managementTeam = [
    {
      name: "Alexander Petrov",
      title: "Chief Executive Officer",
      image: "https://placehold.co/300x300/111/333?text=AP",
      bio: "Alexander brings over 20 years of sports management experience to Etros Basketball. Under his leadership, the team has grown from a local club to a national champion.",
    },
    {
      name: "Maria Ivanova",
      title: "Chief Operations Officer",
      image: "https://placehold.co/300x300/111/333?text=MI",
      bio: "Maria oversees the day-to-day operations of the club, ensuring that players, staff, and fans have the best possible experience with Etros Basketball.",
    },
    {
      name: "Dimitar Stoyanov",
      title: "Technical Director",
      image: "https://placehold.co/300x300/111/333?text=DS",
      bio: "Dimitar is responsible for player recruitment, development programs, and technical direction. His strategic vision has been key to the team's on-court success.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            About <span className="text-yellow-400">Etros Basketball</span>
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Building a legacy of excellence in basketball since 2010
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
          <blockquote className="text-2xl italic font-medium text-gray-800 mb-8">
            "To inspire and unite our community through the power of basketball,
            delivering excellence on and off the court while developing athletes
            who represent the values of teamwork, dedication, and integrity."
          </blockquote>
          <p className="text-gray-600">
            At Etros Basketball, we strive to be more than just a team – we aim
            to be a positive force in our community, developing not only
            exceptional athletes but also exemplary citizens who make a
            difference in Veliko Tarnovo and beyond.
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Our Journey</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {historyTimeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center z-10 shadow-md">
                      <span className="text-black font-bold">{item.year}</span>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2"></div>
                    <div
                      className={`mt-8 md:mt-0 md:w-1/2 ${
                        index % 2 === 0
                          ? "md:text-right md:pr-12"
                          : "md:text-left md:pl-12"
                      } p-6 bg-white rounded-lg shadow-md`}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-lg text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-yellow-400 mx-auto mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Management Team
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-4">
                    {member.title}
                  </p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-2">Community Involvement</h2>
              <div className="w-20 h-1 bg-yellow-400 mb-8"></div>
              <p className="text-gray-200 mb-6">
                At Etros Basketball, we believe in giving back to the community
                that supports us. We are committed to making a positive impact
                through various community initiatives and programs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Youth basketball development programs in local schools
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Annual charity games supporting local causes</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Basketball clinics for underprivileged youth</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Hospital visits and community outreach initiatives
                  </span>
                </li>
              </ul>
              <button className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded transition-colors duration-200 shadow-md">
                Learn More About Our Community Work
              </button>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://placehold.co/800x600/111/333?text=Community+Programs"
                alt="Community Programs"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
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
              <p className="text-gray-600 mt-4 mb-2">Ticket Sales</p>
              <p className="text-gray-900 font-medium">+359 123 456 790</p>
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
              <p className="text-gray-900 font-medium">
                info@etrosbasketball.com
              </p>
              <p className="text-gray-600 mt-4 mb-2">Media Relations</p>
              <p className="text-gray-900 font-medium">
                media@etrosbasketball.com
              </p>
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

          <div className="mt-16 bg-gray-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Send Us a Message
            </h3>
            <form className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Message subject"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

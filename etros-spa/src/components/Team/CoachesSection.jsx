import React from "react";

const CoachesSection = () => {
  // Replace with actual API data if available
  const coaches = [
    {
      id: 1,
      name: "James Peterson",
      role: "Head Coach",
      image: "https://placehold.co/300x400/111/333?text=Coach",
      bio: "Coach Peterson brings 15 years of coaching experience and has led teams to multiple championships.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Coaching Staff</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-black rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-400">
                  {coach.name}
                </h3>
                <p className="text-gray-300 font-medium mb-4">{coach.role}</p>
                <p className="text-gray-400">{coach.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;

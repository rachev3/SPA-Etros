import React from "react";

const historyTimeline = [
  {
    year: "2022",
    title: "Foundation",
    description:
      "Etros Basketball was founded by a group of passionate basketball enthusiasts with the vision of creating a team that would represent Veliko Tarnovo on the national stage.",
  },
  {
    year: "2023",
    title: "Season Start BBL Center B Group",
    description: "The team started its first season in the BBL Center B Group.",
  },
  {
    year: "2024",
    title: "6th place in BBL Center B Group",
    description:
      "The team finished 6th in BBL Center B Group, qualifying for the playoffs.",
  },
  {
    year: "2025",
    title: "Season Start BBL Center B Group",
    description:
      "The team started its second season in the BBL Center B Group.",
  },
];

const HistoryTimelineSection = () => (
  <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Our Journey</h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

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
);

export default HistoryTimelineSection;

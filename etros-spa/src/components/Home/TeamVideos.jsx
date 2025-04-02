import React from "react";

const TeamHighlights = () => {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Videos</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/cfo5kjUqOgA"
                title="Season Highlights"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/rWFiX5yldoM"
                title="Player Interviews"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamHighlights;

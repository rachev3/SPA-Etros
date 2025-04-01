import React from "react";
import ArticleGridSection from "./ArticleGridSection";

const NewsPage = () => {
  return (
    <div className="bg-white">
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-yellow-400">Latest</span> News
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Stay up to date with the latest news, announcements, and stories
            from Etros Basketball.
          </p>
        </div>
      </section>

      <ArticleGridSection />
    </div>
  );
};

export default NewsPage;

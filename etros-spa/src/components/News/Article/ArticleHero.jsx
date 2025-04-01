import React from "react";
import { formatLongDate } from "../../../utils/dateUtils";

const ArticleHero = ({ article }) => {
  return (
    <div className="relative">
      <div className="w-full h-[50vh] relative overflow-hidden">
        <img
          src={article.images?.[0] || "/placeholder-image.jpg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex items-center">
            <span className="text-gray-300 text-sm">
              {formatLongDate(article.createdAt)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {article.title}
          </h1>
          {article.metaDescription && (
            <p className="text-xl text-gray-200 mb-4">
              {article.metaDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;

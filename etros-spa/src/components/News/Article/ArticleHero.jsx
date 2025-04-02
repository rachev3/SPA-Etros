import React from "react";
import { formatLongDate } from "../../../utils/dateUtils";

const ArticleHero = ({ article }) => {
  return (
    <div className="relative">
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src={article.images?.[0] || "/placeholder-image.jpg"}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-3">
            <span className="text-yellow-400 text-sm font-medium tracking-wide uppercase">
              {formatLongDate(article.createdAt)}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;

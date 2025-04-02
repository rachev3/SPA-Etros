import React from "react";
import { formatLongDate, formatTime } from "../../../utils/dateUtils";

const ArticleDetails = ({ article }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <div>
          <p className="font-bold text-gray-900">By {article.author}</p>
          <p className="text-sm text-gray-600">
            {formatLongDate(article.createdAt)} at{" "}
            {formatTime(article.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;

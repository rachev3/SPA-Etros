import React from "react";

const ArticleBody = ({ article }) => {
  return (
    <>
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      {article.images && article.images.length > 1 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Image Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {article.images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <img
                  src={image}
                  alt={`${article.title} - Image ${index + 1}`}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleBody;

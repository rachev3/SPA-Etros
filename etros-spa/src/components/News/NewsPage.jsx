import React, { useState } from "react";

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for news articles
  const newsArticles = [
    {
      id: 1,
      title: "Etros Wins Championship Final",
      date: "2023-06-15",
      category: "team",
      image: "https://placehold.co/800x500/111/333?text=Championship",
      summary:
        "In a thrilling finale, Etros defeated rivals 89-78 to claim the championship trophy.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "John Smith",
      featured: true,
    },
    {
      id: 2,
      title: "New Star Player Signs with Etros",
      date: "2023-07-02",
      category: "players",
      image: "https://placehold.co/800x500/111/333?text=New+Signing",
      summary:
        "International basketball star Michael Johnson has signed a 3-year contract with Etros.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Sarah Williams",
      featured: true,
    },
    {
      id: 3,
      title: "Team Training Camp Begins Next Week",
      date: "2023-07-10",
      category: "team",
      image: "https://placehold.co/800x500/111/333?text=Training+Camp",
      summary:
        "The annual training camp will start on Monday as the team prepares for the new season.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Michael Brown",
      featured: false,
    },
    {
      id: 4,
      title: "New Team Merchandise Now Available",
      date: "2023-07-18",
      category: "merchandise",
      image: "https://placehold.co/800x500/111/333?text=Merchandise",
      summary:
        "Check out our new collection of team jerseys, hats, and accessories for the 2023-2024 season.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Emily Johnson",
      featured: false,
    },
    {
      id: 5,
      title: "Coach Peterson Named Coach of the Year",
      date: "2023-06-30",
      category: "staff",
      image: "https://placehold.co/800x500/111/333?text=Coach+Award",
      summary:
        "Etros head coach James Peterson has been recognized as the league's top coach for the 2022-2023 season.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "David Wilson",
      featured: false,
    },
    {
      id: 6,
      title: "Stadium Renovations Complete for New Season",
      date: "2023-07-25",
      category: "facilities",
      image: "https://placehold.co/800x500/111/333?text=Stadium",
      summary:
        "Etros Arena has undergone significant upgrades to enhance the fan experience for the upcoming season.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Rebecca Martinez",
      featured: true,
    },
    {
      id: 7,
      title: "Season Ticket Sales Break Records",
      date: "2023-08-05",
      category: "business",
      image: "https://placehold.co/800x500/111/333?text=Tickets",
      summary:
        "Etros Basketball has sold more season tickets than ever before, showing growing support from fans.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Thomas Lee",
      featured: false,
    },
    {
      id: 8,
      title: "Michael Johnson Named Player of the Month",
      date: "2023-08-10",
      category: "players",
      image: "https://placehold.co/800x500/111/333?text=Player+Award",
      summary:
        "Star player Michael Johnson earns his first Player of the Month honor after outstanding performances.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
      author: "Jennifer Adams",
      featured: false,
    },
  ];

  // Get categories for filter
  const categories = [
    { id: "all", name: "All News" },
    { id: "team", name: "Team News" },
    { id: "players", name: "Players" },
    { id: "staff", name: "Coaching Staff" },
    { id: "business", name: "Business" },
    { id: "facilities", name: "Facilities" },
    { id: "merchandise", name: "Merchandise" },
  ];

  // Filter articles based on active category and search query
  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured articles
  const featuredArticles = newsArticles.filter((article) => article.featured);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
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

      {/* Featured Articles Slider */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Featured Stories</h2>
          <div className="w-20 h-1 bg-yellow-400 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <div
                key={article.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full ${
                      index === 0 ? "h-96 lg:h-80" : "h-60"
                    } object-cover`}
                  />
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold px-4 py-2 text-sm">
                    FEATURED
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(article.date)}
                    </span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-700 mb-4">{article.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {article.author}
                    </span>
                    <button className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors duration-200 inline-flex items-center">
                      Read Full Story
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Listing Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">All News</h2>
              <div className="w-20 h-1 bg-yellow-400"></div>
            </div>
            <div className="mt-4 md:mt-0 md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {formatDate(article.date)}
                      </span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        By {article.author}
                      </span>
                      <button className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors duration-200 inline-flex items-center">
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-1">No articles found</h3>
              <p className="text-gray-500">
                Try changing your search or filters
              </p>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > 6 && (
            <div className="text-center mt-12">
              <button className="bg-black hover:bg-gray-900 text-white py-3 px-8 rounded-lg transition-colors duration-200 shadow-md">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get News Updates</h2>
          <p className="text-lg mb-8 text-gray-200">
            Subscribe to receive the latest news and exclusive content directly
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { format } from "date-fns";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [commentContent, setCommentContent] = useState("");

  // Mock article data - in a real app this would come from an API call
  useEffect(() => {
    // Simulate API request delay
    const fetchTimeout = setTimeout(() => {
      // Mock article data
      const mockArticle = {
        id: id,
        title:
          "Etros Signs Star Point Guard Marcus Williams to Multi-Year Deal",
        subtitle:
          "The 26-year-old averaged 18.7 points and 7.3 assists last season",
        coverImage:
          "https://placehold.co/1200x600/111/333?text=Marcus+Williams+Signing",
        content: `
          <p class="lead">Etros Basketball Club has officially announced the signing of star point guard Marcus Williams to a four-year contract worth an estimated €2.4 million, making it one of the largest deals in the club's history.</p>
          
          <p>Williams, 26, joins Etros after a standout season with the Sofia Eagles, where he averaged 18.7 points, 4.2 rebounds, and 7.3 assists per game while shooting 38% from three-point range.</p>
          
          <p>"We are thrilled to welcome Marcus to the Etros family," said head coach Ivan Petrov. "His court vision, scoring ability, and leadership qualities make him the perfect fit for our system as we pursue a championship next season."</p>
          
          <p>The signing marks a significant step in Etros' offseason rebuilding efforts following their semifinal exit in last year's playoffs. Williams is expected to immediately step in as the team's starting point guard, forming a dynamic backcourt duo with shooting guard Nikolay Ivanov.</p>
          
          <h2>From College Star to Professional Success</h2>
          
          <p>Originally from Los Angeles, California, Williams had a stellar collegiate career at the University of Kentucky, where he was a two-time All-American and led the Wildcats to the NCAA Final Four in his junior year.</p>
          
          <p>After going undrafted in the NBA, Williams took his talents to Europe, quickly establishing himself as one of the top guards in the Bulgarian National Basketball League. His journey to becoming one of the league's elite players culminated in winning the Bulgarian League Most Improved Player award last season.</p>
          
          <p>"I'm excited for this new chapter with Etros," Williams said during his introductory press conference. "The club's commitment to excellence and the passionate fanbase made this an easy decision. I can't wait to get to work and help bring a championship to this organization."</p>
          
          <h2>Impact on Team Strategy</h2>
          
          <p>Basketball analysts expect Williams to transform Etros' offensive capabilities, particularly in transition and pick-and-roll situations. His ability to create for others while maintaining scoring efficiency addresses the team's primary weakness from last season.</p>
          
          <p>Technical Director Dimitar Stoyanov emphasized that Williams' signing fits perfectly with the club's long-term strategy. "Marcus represents the type of player and person we want in this organization—talented, hardworking, and committed to team success over individual accolades."</p>
          
          <p>Williams will wear jersey number 23 for Etros and is expected to participate in the team's training camp starting next week.</p>
        `,
        author: {
          name: "Elena Dimitrova",
          title: "Senior Sports Reporter",
          image: "https://placehold.co/200x200/111/333?text=ED",
        },
        publishDate: "2023-07-02T14:30:00Z",
        category: "Team News",
        tags: ["Signings", "Players", "Team News"],
        upvotes: 128,
        comments: [
          {
            id: 1,
            author: "BasketballFan123",
            content:
              "This is exactly the kind of player we needed! Can't wait to see him play.",
            date: "2023-07-02T15:45:00Z",
            upvotes: 24,
          },
          {
            id: 2,
            author: "EtrosSupporter",
            content:
              "Great signing! His pick-and-roll game is going to work perfectly with our centers.",
            date: "2023-07-02T16:20:00Z",
            upvotes: 19,
          },
          {
            id: 3,
            author: "HoopsMaster",
            content:
              "I watched him play last season. His court vision is incredible. This is a game-changer for Etros.",
            date: "2023-07-02T18:05:00Z",
            upvotes: 32,
          },
        ],
      };

      // Mock related articles
      const mockRelatedArticles = [
        {
          id: "2",
          title: "Etros Announces Pre-Season Tournament Schedule",
          excerpt:
            "The team will face international competition in preparation for the new season",
          image:
            "https://placehold.co/600x400/111/333?text=Pre-Season+Schedule",
          date: "2023-07-10T10:15:00Z",
          category: "Team News",
        },
        {
          id: "3",
          title: "Training Camp Opens with High Expectations",
          excerpt:
            "Coach Petrov sets championship goal as players report for first practice",
          image: "https://placehold.co/600x400/111/333?text=Training+Camp",
          date: "2023-07-15T09:30:00Z",
          category: "Team News",
        },
        {
          id: "4",
          title: "Etros Unveils New Home Court Design",
          excerpt:
            "The renovated arena features state-of-the-art facilities and a striking new court design",
          image: "https://placehold.co/600x400/111/333?text=New+Court+Design",
          date: "2023-07-08T13:45:00Z",
          category: "Facilities",
        },
      ];

      setArticle(mockArticle);
      setUpvoteCount(mockArticle.upvotes);
      setRelatedArticles(mockRelatedArticles);
      setLoading(false);
    }, 800);

    return () => clearTimeout(fetchTimeout);
  }, [id]);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount((prev) => prev - 1);
    } else {
      setUpvoteCount((prev) => prev + 1);
    }
    setUpvoted(!upvoted);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentContent.trim()) return;

    // In a real app, you would send this to an API
    const newComment = {
      id: article.comments.length + 1,
      author: "CurrentUser", // In a real app, you'd get this from auth state
      content: commentContent,
      date: new Date().toISOString(),
      upvotes: 0,
    };

    setArticle((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));

    setCommentContent("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero image and title section */}
      <div className="relative">
        <div className="w-full h-[50vh] relative overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center">
              <span className="bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full mr-3">
                {article.category}
              </span>
              <span className="text-gray-300 text-sm">
                {formatDate(article.publishDate)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {article.title}
            </h1>
            <p className="text-xl text-gray-200 mb-4">{article.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Author info */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={article.author.image}
              alt={article.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-bold text-gray-900">{article.author.name}</p>
              <p className="text-sm text-gray-600">{article.author.title}</p>
            </div>
          </div>

          {/* Social and upvote buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            <button
              onClick={handleUpvote}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full border ${
                upvoted
                  ? "border-yellow-500 bg-yellow-100 text-yellow-700"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              } transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  upvoted ? "text-yellow-500" : "text-gray-500"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{upvoteCount}</span>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Main article content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article footer */}
        <div className="border-t border-b border-gray-200 py-6 my-12 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Published on {formatDate(article.publishDate)} at{" "}
              {formatTime(article.publishDate)}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleUpvote}
              className={`flex items-center space-x-1 ${
                upvoted
                  ? "text-yellow-600"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Upvote ({upvoteCount})</span>
            </button>
            <button className="text-gray-600 hover:text-purple-600 flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Comments ({article.comments.length})</span>
            </button>
          </div>
        </div>

        {/* Comments section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">
            Comments ({article.comments.length})
          </h3>

          {/* Comment form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Join the discussion..."
              rows="3"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-6 rounded transition-colors"
                disabled={!commentContent.trim()}
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments list */}
          <div className="space-y-6">
            {article.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {comment.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(comment.date)} at {formatTime(comment.date)}
                    </p>
                  </div>
                  <button className="text-gray-500 hover:text-yellow-500 flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{comment.upvotes}</span>
                  </button>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related articles section */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                to={`/news/article/${related.id}`}
                key={related.id}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-700 font-medium">
                        {related.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(related.date)}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-600">{related.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

import { useLocation, useNavigate } from "react-router-dom";

function Article() {
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state;

  if (!article) {
    return <div className="py-20 text-center">Article not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 mb-6 hover:text-black"
      >
        ← Back
      </button>

      <p className="text-xs text-gray-500">{article.source.name}</p>

      <h1 className="text-3xl font-bold mt-3 leading-snug">{article.title}</h1>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(article.publishedAt).toLocaleString()}
      </p>

      <img
        src={article.urlToImage || "https://via.placeholder.com/800x400"}
        alt={article.title}
        className="w-full h-[400px] object-cover mt-6"
      />

      <p className="text-lg mt-6 leading-relaxed">{article.description}</p>

      <p className="text-base text-gray-700 mt-4 leading-relaxed">
        {article.content}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors"
      >
        Read Full Article
      </a>
    </div>
  );
}

export default Article;

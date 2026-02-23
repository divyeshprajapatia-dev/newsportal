import { useNavigate } from "react-router-dom";

function NewsCard({ article, variant = "vertical" }) {
  const navigate = useNavigate();

  if (!article) return null; // IMPORTANT

  if (variant === "horizontal") {
    return (
      <div onClick={() =>
        navigate(`/article/${encodeURIComponent(article.title)}`, {
          state: article,
        })
      }
      className="relative overflow-hidden cursor-pointer gap-4">
        <img src={article.urlToImage} alt={article.title} className="w-70 h-40 object-cover" />
        <h4 className="text-sm font-medium leading-snug mt-2">{article.title}</h4>
      </div>
    );
  }

  return (
    <div onClick={() =>
        navigate(`/article/${encodeURIComponent(article.title)}`, {
          state: article,
        })
      }
      className="relative overflow-hidden cursor-pointer">
      <img src={article.urlToImage} alt={article.title} className="w-full h-[300px] object-cover" />
      <h4 className="text-base font-semibold mt-3 leading-snug">{article.title}</h4>
      {article.description && (
        <p className="text-sm text-gray-500 mt-2">{article.description}</p>
      )}
    </div>
  );
}

export default NewsCard;

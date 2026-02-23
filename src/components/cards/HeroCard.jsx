import { useNavigate } from "react-router-dom";

function HeroCard({ article}) {
  const navigate = useNavigate();

  if (!article) return null; 

  return (
    <div
      onClick={() =>
        navigate(`/article/${encodeURIComponent(article.title)}`, {
          state: article,
        })
      }
      className="relative overflow-hidden cursor-pointer"
    >
      <img
        src={article.urlToImage || "https://via.placeholder.com/800"}
        alt={article.title}
        className="w-full h-[450px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-3xl font-semibold">{article.title}</h2>
        <p className="text-sm mt-2">
          {article.publishedAt &&
            new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default HeroCard;

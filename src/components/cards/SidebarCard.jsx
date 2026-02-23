import { useNavigate } from "react-router-dom";

function SidebarCard({ article }) {
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
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-[200px] object-cover"
      />
      <h4 className="text-sm font-medium mt-2 leading-snug">{article.title}</h4>
    </div>
  );
}

export default SidebarCard;

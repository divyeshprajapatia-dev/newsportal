import { useNavigate } from "react-router-dom";

function HeadlinesCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/article/${encodeURIComponent(article.title)}`, {
          state: article,
        })
      }
      className="space-y-1 border-b pb-4 last:border-none"
    >
      <p className="text-xs text-gray-500">{article.source.name}</p>

      <p className="text-sm font-medium leading-snug hover:text-black cursor-pointer transition-colors">
        {article.title}
      </p>
    </div>
  );
}

export default HeadlinesCard;

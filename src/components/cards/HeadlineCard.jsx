function HeadlinesCard({ category, title }) {
  return (
    <div className="space-y-1 border-b pb-4 last:border-none">
      <p className="text-xs text-gray-500">{category}</p>

      <p className="text-sm font-medium leading-snug hover:text-black cursor-pointer transition-colors">
        {title}
      </p>
    </div>
  );
}

export default HeadlinesCard;

function NewsCard({ image, title, description, variant = "vertical" }) {
  if (variant === "horizontal") {
    return (
      <div className="gap-4">
        <img src={image} alt={title} className="w-70 h-40 object-cover" />
        <h4 className="text-sm font-medium leading-snug mt-2">{title}</h4>
      </div>
    );
  }

  return (
    <div>
      <img src={image} alt={title} className="w-full h-[300px] object-cover" />
      <h4 className="text-base font-semibold mt-3 leading-snug">{title}</h4>
      {description && (
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
}

export default NewsCard;

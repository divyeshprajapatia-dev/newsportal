function SidebarCard({ image, title }) {
  return (
    <div>
      <img src={image} alt={title} className="w-full h-[200px] object-cover" />
      <h4 className="text-sm font-medium mt-2 leading-snug">{title}</h4>
    </div>
  );
}

export default SidebarCard;

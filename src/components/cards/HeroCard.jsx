function HeroCard({image, title, time}) {
    return (  
        <div className="relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-[400px] md:h-[450px] object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl md:text-3xl font-semibold max-w-[85%] leading-snug">
                    {title}
                </h2>
                <p className="text-sm mt-2 opacity-80">{time}</p>
            </div>

        </div>
    );
}

export default HeroCard;
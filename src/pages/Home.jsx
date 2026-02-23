import HeroCard from "../components/cards/HeroCard";
import NewsCard from "../components/cards/NewsCard";
import SidebarCard from "../components/cards/SidebarCard";
import HeadlineCard from "../components/cards/HeadlineCard";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTopHeadlines, getByCategory } from "../services/newsApi"
import { useLocation } from "react-router-dom"
import { searchNews, searchWithinCategory } from "../services/newsApi"

function Home() {
  const { categoryName } = useParams()

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5)


  const safeArticles = articles.filter(a => a.urlToImage)
  console.log(safeArticles[0])

  const heroArticle = safeArticles[0]

  const headlineArticles = safeArticles.slice(1, 5)

  const latestMain = safeArticles.slice(6, 9)

  const latestSide = safeArticles.slice(10, 16)

  const mostlyViewed = safeArticles.slice(17, 22)

  const extraArticles = safeArticles.slice(23)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get("search")
    

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        setError(null)

        let data

        if (searchQuery && categoryName) {
          data = await searchWithinCategory(categoryName, searchQuery)
        } else if (searchQuery) {
          data = await searchNews(searchQuery)
        } else if (categoryName) {
          data = await getByCategory(categoryName)
        } else {
          data = await getTopHeadlines()
        }

        setArticles(data)
      } catch (err) {
        setError("Failed to load news")
      } finally {
        setLoading(false)
      }
    }

    loadNews()

    setShowMore(false)
    setVisibleCount(5)
  }, [categoryName, searchQuery])

  const loadMore = () => {
    setMore(true)
  }


  return (

   

    <div>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
        <div className="md:col-span-8">
          <HeroCard
            article={heroArticle}
          />
        </div>

        <div className="md:col-span-4 bg-gray-50 p-6 space-y-6">
          <h3 className="text-3xl font-semibold">Headlines</h3>
            <div className="space-y-1 border-b pb-4 last:border-none">
              {headlineArticles.map((article, index) => (
                <HeadlineCard
                  key={index}
                  article={article}
                />
              ))}
            </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 md:border-t-2 border-gray-300">
        <div className="md:col-span-8">
          <h3 className="text-lg font-semibold mb-6">Latest Updates</h3>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">

            <div className="md:col-span-5">
            {latestMain.map((article,index)=>(
              <NewsCard
                key={index}
                article={article}
              />
            ))}
            </div>

           
            <div className="md:col-span-3 space-y-6">
              <div className="space-y-6">
                {latestSide.map((article, index) => (
                  <NewsCard
                    key={index}
                    article={article}
                    variant="horizontal"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mostly Viewed (4 cols) */}
        <div className="md:col-span-4 md:border-l-2 md:pl-8 border-gray-300">
          <h3 className="text-lg font-semibold mb-6">Mostly Viewed</h3>

          <div className="space-y-6">
            {mostlyViewed.map((article, index) => (
              <SidebarCard
                key={index}
                article={article}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 border-t text-center">

        {!showMore && extraArticles.length > 0 && (
          <button
            onClick={() => setShowMore(true)}
            className="px-6 py-2 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Load More News
          </button>
        )}

        {showMore && (
          <div className="mt-10 space-y-10 max-w-3xl mx-auto">

            {extraArticles.slice(0, visibleCount).map((article, index) => (
              <div key={index} className="space-y-4">

                <img
                  src={article.urlToImage || "https://via.placeholder.com/800x400"}
                  alt={article.title}
                  className="w-full h-[260px] object-cover"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    {article.source.name}
                  </p>

                  <h4 className="text-lg font-semibold mt-2 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    {article.description}
                  </p>
                </div>

              </div>
            ))}

            {visibleCount < extraArticles.length && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="px-6 py-2 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Load More
                </button>
              </div>
            )}

          </div>
        )}

      </section>
    </div>
  );
}

export default Home;

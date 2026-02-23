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
  const [more, setMore] = useState(false)
  const safeArticles = articles.filter(a => a.urlToImage)
  console.log(safeArticles.length)

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
  }, [categoryName, searchQuery])

  const loadMore = () => {
    setMore(true)
  }


  return (

   

    <div>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8">
        <div className="md:col-span-8">
          <HeroCard
            image={heroArticle?.urlToImage}
            title={heroArticle?.title}
            time={heroArticle?.publishedAt}
          />
        </div>

        <div className="md:col-span-4 bg-gray-50 p-6 space-y-6">
          <h3 className="text-lg font-semibold">Headlines</h3>
            <div className="space-y-1 border-b pb-4 last:border-none">
              {headlineArticles.map((article, index) => (
                <HeadlineCard
                  key={index}
                  category={article.source.name}
                  title={article.title}
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
                image={article.urlToImage || "https://via.placeholder.com/400"}
                title={article.title}
                description={article.description}
              />
            ))}
            </div>

           
            <div className="md:col-span-3 space-y-6">
              <div className="space-y-6">
                {latestSide.map((article, index) => (
                  <NewsCard
                    key={index}
                    variant="horizontal"
                    image={article.urlToImage || "https://via.placeholder.com/100"}
                    title={article.title}
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
                image={article.urlToImage || "https://via.placeholder.com/300"}
                title={article.title}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10">
        <h3 className="text-lg font-semibold mb-6 flex justify-center items-center"><button onClick={loadMore} className="border p-2 hover:resize cursor-pointer">More News</button></h3>

        {more && <div className="space-y-8">
          {extraArticles.map((article) => (
            <NewsCard
              key={article.url}
              image={article.urlToImage || fallback}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>}
      </section>
    </div>
  );
}

export default Home;

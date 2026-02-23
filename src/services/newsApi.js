const BASE_URL = "https://newsapi.org/v2"
const API_KEY = import.meta.env.VITE_API_KEY

const fetchNews = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await response.json()
  return data.articles
}

export const getTopHeadlines = () => {
  return fetchNews(
    `${BASE_URL}/top-headlines?country=us&pageSize=50&apiKey=${API_KEY}`
  )
}

export const getByCategory = (category) => {
  return fetchNews(
    `${BASE_URL}/top-headlines?country=us&pageSize=50&category=${category}&apiKey=${API_KEY}`
  )
}

export const searchNews = (query) => {
  return fetchNews(
    `${BASE_URL}/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
  )
}

export const searchWithinCategory = (category, query) => {
  return fetchNews(
    `${BASE_URL}/everything?q=${query}+${category}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
  )
}
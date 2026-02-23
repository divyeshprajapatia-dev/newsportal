import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useEffect } from "react";


function Navbar() {
    const categories = ['Home', 'Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get("search")

    const handleCategoryClick = (category) => {
    let path = category === "Home" ? "/" : `/category/${category}`

    if (searchQuery) {
        path += `?search=${searchQuery}`
    }

    navigate(path)
    }


    const navigate = useNavigate()
    const { categoryName } = useParams()

    // useEffect(() => {
    //     setSearch("")
    // }, [categoryName])

    // const handleCategoryClick = (category) => {
    //     if (category === "Home") {
    //         navigate("/")
    //     } else {
    //         navigate(`/category/${category}`)
    //     }
    // }


    return (
         <nav className="border-b border-gray-100 py-4">
            <div className="flex items-center justify-between">
                <div className="hidden md:flex items-center gap-2 text-sm font-medium">
                    <span className="text-xl">🌤️</span>
                    <span className="ml-2 flex flex-col leading-tight font-bold">
                        28°
                        <span className="text-gray-500 text-xs font-normal">
                        Cloudy
                        </span>
                    </span>
                </div>
                <div className="flex gap-10 text-sm font-semibold text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {categories.map((item) => {
                        const isActive =
                        (item === "Home" && !categoryName) ||
                        categoryName === item

                        return (
                        <span
                            key={item}
                            onClick={() => handleCategoryClick(item)}
                            className={`cursor-pointer transition-colors duration-200 ${isActive ? "text-black font-medium" : "hover:text-black"  }`}
                        >
                            {item}
                        </span>
                        )
                    })}
                </div>
                <div className="hidden md:flex items-center">
                    <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full object-cover"/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
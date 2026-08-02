export default function BlogCard() {
  const featuredBlogs = [
    {
      title: "Trends In Luxury Real Estate For 2025",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    },
    {
      title: "Understanding Home Equity: What You Need To Know",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
  ];

  const allBlogs = [
    {
      title: "The Role Of Realtors In Real Estate Transactions",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498a",
    },
    {
      title: "Navigating The Home Selling Process",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498a",
    },
    {
      title: "The Future Of Smart Homes: Trends To Watch",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
    },
    {
      title: "Exploring Sustainable Housing Options",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    },
    {
      title: "First-Time Homebuyer Tips For 2025",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    },
    {
      title: "Investing In Rental Properties: A Comprehensive Guide",
      date: "November 23, 2025",
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen px-4 md:px-10 lg:px-20 py-10">

      {/* FEATURED */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Featured <span className="text-orange-500">Blogs</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {featuredBlogs.map((blog, i) => (
          <div
            key={i}
            className="group cursor-pointer transition-all duration-300"
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img
                src={blog.image}
                alt=""
                className="w-full h-[260px] md:h-[320px] object-cover
                transition-transform duration-500 group-hover:scale-110"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition rounded-2xl"></div>
            </div>

            <div className="mt-3 transform transition-all duration-300 group-hover:-translate-y-1">
              <p className="text-sm text-gray-500">{blog.date}</p>
              <h3 className="text-lg md:text-xl font-semibold mt-1 group-hover:text-orange-500 transition">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ALL BLOGS */}
      <h2 className="text-3xl md:text-4xl font-semibold mt-14 mb-6">
        All <span className="text-orange-500">Blogs</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.map((blog, i) => (
          <div
            key={i}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-2xl"
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img
                src={blog.image}
                alt=""
                className="w-full h-[200px] object-cover
                transition-transform duration-500 group-hover:scale-110"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition rounded-2xl"></div>
            </div>

            <div className="mt-3 px-1 pb-2 transform transition-all duration-300 group-hover:-translate-y-1">
              <p className="text-sm text-gray-500">{blog.date}</p>
              <h3 className="text-base font-semibold mt-1 leading-snug group-hover:text-orange-500 transition">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

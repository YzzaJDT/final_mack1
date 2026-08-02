export default function Expertise() {
  const features = [
    {
      title: "Deep Local Market Insight",
      desc: "With deep community roots, our agents provide insider knowledge that empowers our clients.",
      icon: "/images/icon7.svg",
    },
    {
      title: "Built Around You",
      desc: "We put your goals first, delivering responsive support and customized solutions that match your needs.",
      icon: "/images/icon9.svg",
    },
  ];

  return (
    <section className="bg-[#f9fafb] py-16 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src="/images/bg5.jpg"
            alt="Luxury Villa"
            className="rounded-2xl shadow-xl w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">
            Results-Driven <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Expertise</span>
          </h2>

          {/* Description */}
          <p className="text-gray-500 mt-4 text-sm sm:text-base leading-relaxed">
         Delivering smooth and successful property transactions through expert real estate knowledge and personalized service.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-10">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-5 relative">
                <div className="absolute left-0 top-3 w-[2px] h-6 bg-[#345578] rounded"></div>
                <div className="ml-7 w-[50px] h-[50px] rounded-full border border-gray-100 bg-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

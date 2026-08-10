import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TeamSection() {
  const scrollRef = useRef(null);

  const team = [
    {
      name: "Ralph Mckenzi",
      role: "Founder & CEO",
      image: "/images/ralph.png",
    },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="bg-[#f9fafb] py-16 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Results-Driven Real Estate Team
            </h2>
          </div>

          {/* ARROWS */}
          <div className="hidden sm:flex gap-3">
            <button onClick={scrollLeft} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ChevronLeft size={18} />
            </button>
            <button onClick={scrollRight} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide">
          {team.map((member, index) => (
            <div key={index} className="min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] h-[420px] relative rounded-2xl overflow-hidden group">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-200 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

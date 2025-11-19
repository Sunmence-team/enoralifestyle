import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { assets } from "../../assets/assests";

interface BlogCrdProps {
  id: string;
  title: string;
  description: string;
  image: string;
}



const BlogCrd = ({ id, title, description, image }: BlogCrdProps) => {
  return (
    <Link
      to={`/blog/${id}`}
      className="relative h-[445px] bg-white rounded-3xl shadow hover:shadow-md transition-all duration-300 flex flex-col gap-2 justify-between text-center border border-black/10 overflow-hidden"
    >
      {/* Text before image */}
      <div className="px-5 pt-6 text-start">
        <h2 className="text-[20px] font-bold! leading-6 text-black mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-2 font-[inter]!">
          {description}
        </p>
      </div>

      {/* Blog image with smooth concave bottom */}
      <div className="relative overflow-hidden p-5">
        <div className="wave-div z-1 rounded-t-3xl h-[300px] overflow-hidden mb-8">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = assets.logo;
            }}
          />
        </div>
        <div
          className="text-(--primary-color) font-semibold hover:text-black transition-colors text-center mt-4 pb-6 absolute z-9 bottom-0 left-1/2 -translate-x-1/2 flex items-center"
        >
          <span>Read more</span>
          <span className="flex mt-1">
            <GoChevronRight className="-me-1.5" />
            <GoChevronRight className="-me-1.5" />
            <GoChevronRight className="-me-1.5" />
          </span>
        </div>

      </div>
    </Link>
  );
};

export default BlogCrd;
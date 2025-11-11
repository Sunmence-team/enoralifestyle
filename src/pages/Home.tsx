// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assests";
import { Link } from "react-router-dom";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import HeroSection from "../components/herosections/Herosection";
import { IoIosArrowRoundForward } from "react-icons/io";
import BlogCard from "../components/cards/BlogCard";
import PackageCard from "../components/cards/PackageCard";
import ServiceCard from "../components/cards/ServiceCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface ApiItem {
  id: number;
  name: string;
  description: string;
  type: "package" | "service";
  image: string | null;
  price: string;
  created_at: string;
}

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home - Enora Lifestyle And Spa";
  }, []);

  const [allItems, setAllItems] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH FROM /services (which returns both packages & services)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}services`);
        const rawData = res.data.data?.data || [];

        console.log("RAW API DATA FROM /services:", rawData);

        // Sort by latest first
        const sorted = rawData.sort((a: ApiItem, b: ApiItem) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setAllItems(sorted);

        // FILTER & LOG
        const packages = sorted.filter((i: ApiItem) => i.type === "package").slice(0, 3);
        const services = sorted.filter((i: ApiItem) => i.type === "service").slice(0, 3);

        console.log("PACKAGES (latest 3):", packages);
        console.log("SERVICES (latest 3):", services);
      } catch (err) {
        console.error("API FAILED:", err);
        setAllItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter latest 3 packages
  const packages = allItems
    .filter(item => item.type === "package")
    .slice(0, 3);

  // Filter latest 3 services
  const services = allItems
    .filter(item => item.type === "service")
    .slice(0, 3);

  // Hardcoded blogs (as before)
  const blogs = [
    {
      id: "1",
      title: "Anti-Aging Facials: Do They Really Make You Look Younger?",
      short_description: "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
      cover_image: null,
    },
    {
      id: "2",
      title: "Why Your Skin Isn’t Glowing, 5 Mistakes to Avoid",
      short_description: "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
      cover_image: null,
    },
    {
      id: "3",
      title: "Why Self-Care Is Not a Luxury but a Necessity",
      short_description: "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
      cover_image: null,
    },
    {
      id: "4",
      title: "Why Self-Care Is Not a Luxury but a Necessity",
      short_description: "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
      cover_image: null,
    },
  ];

  const reviews = [
    {
      iconColor: "#000000CC",
      reviewText: "I struggled with hormonal acne for years and nothing worked until I found this spa. Their acne facial plan cleared my skin in just 4 weeks. Highly recommended!",
      profileImage: assets.banker,
      name: "Sarah Johnson",
      role: "Banker",
      bgColor: "#C97BB7",
    },
    {
      iconColor: "#C97BB7",
      reviewText: "I used to think facials were just for women until I tried their deep cleansing facial. My skin feels fresh and clean, and my beard bumps reduced. I’m definitely coming back.",
      profileImage: assets.soft,
      name: "Michael Peters",
      role: "Software Engineer",
      bgColor: "#000000CC",
    },
    {
      iconColor: "#000000CC",
      reviewText: "I came for a skin consultation and left with so much knowledge. They actually understood my skin and recommended the right products. My dark spots are fading already.",
      profileImage: assets.desi,
      name: "Jennifer Okeke",
      role: "Digital Marketer",
      bgColor: "#C97BB7",
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Premium Spa Experience Designed for You"
        subtitle="Relax, recharge, and renew with spa treatments tailored to your body, beauty, and wellness needs."
        button1Text="Book Now"
        button2Text="View Services"
        backgroundImage={assets.hero}
        height="lg:h-[100vh] h-[90vh]"
      />

      {/* BLOG SECTION */}
      <section className="bg-white mt-16 lg:px-10 px-5">
        <h1 className="md:text-[48px] text-[30px] text-center font-semibold! text-(--accent-color)">
          Blog <span className="text-(--primary-color)">News</span>
        </h1>

        <div className="mt-10 flex overflow-x-scroll gap-4 no-scrollbar pb-2">
          {blogs.map((blog, index) => (
            <div className="md:min-w-[340px] min-w-[320px]" key={index}>
              <BlogCard
                id={blog.id}
                title={blog.title}
                description={blog.short_description}
                image={blog.cover_image ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}` : assets.blog1}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <Link
            to="/blog"
            className="flex items-center text-(--primary-color) font-semibold hover:text-black transition-colors"
          >
            <span>See more</span>
            <IoIosArrowRoundForward size={30} />
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative w-full bg-white mt-10 lg:px-10 px-5 md:pb-60">
        <div className="relative h-[350px] overflow-hidden rounded-[20px] md:block hidden">
          <img
            src={assets.newabout}
            alt="Spa background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:absolute inset-0 h-max md:top-30 bottom-5 left-1/2 transform md:-translate-x-1/2 md:translate-y-10 bg-[#fff9f7] shadow-lg rounded-2xl w-full md:w-5/6 lg:w-5/6 p-6 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            <span className="text-[#b23a8a] font-semibold!">About</span>{" "}
            <span className="text-(--accent-color)">Us</span>
          </h2>

          <div className="text-gray-700 leading-relaxed space-y-4 text-xs md:text-sm lg:text-base">
            <p className="font-[inter]!">
              At Enoralifestyle Spa, we believe self-care is not a luxury—it is
              a lifestyle.
            </p>
            <p className="font-[inter]!">
              We are a world-class spa destination offering a full range of
              wellness and beauty treatments designed to relax your body,
              refresh your mind, and restore your natural glow.
            </p>
            <p className="font-[inter]!">
              Our mission is to promote total body wellness through personalized
              therapies that relieve pain, reduce stress, and enhance overall
              health. Each session is thoughtfully crafted to balance your body
              and mind while reviving your inner calm.
            </p>
            <p className="font-[inter]!">
              Step into our serene environment where expert hands, soothing
              aromas, and natural products come together to create an experience
              of true relaxation and renewal.
            </p>
            <p className="font-[inter]!">
              At Enoralifestyle Spa, your well-being is our priority—because you
              deserve to feel your best, inside and out.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <div className="Our bg-white mt-10 lg:px-10 px-5 py-10">
        <div>
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold! text-(--primary-color)">
            Our <span className="text-(--accent-color)">Packages</span>
          </h1>
        </div>

        <div className="mt-10 lg:grid grid-cols-3 md:gap-6 gap-4 flex lg:overflow-auto overflow-x-scroll no-scrollbar py-4">
          {loading ? (
            <div className="w-full text-center py-20 text-gray-500 text-xl">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="w-full text-center py-20 text-gray-500">No packages available</div>
          ) : (
            packages.map((item, index) => (
              <div className="w-full" key={item.id}>
                <PackageCard
                  id={item.id.toString()}
                  index={index}
                  title={item.name}
                  description={item.description}
                  price={parseFloat(item.price)}
                  image={item.image ? `${IMAGE_URL}${item.image}` : assets.our1}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex flex-row-reverse mt-10">
          <Link
            to="/packages"
            className="flex items-center text-(--primary-color) font-semibold hover:text-black transition-colors"
          >
            <span>See all</span>
            <IoIosArrowRoundForward size={30} />
          </Link>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="bg-(--secondary-color) mt-10 lg:px-10 px-5 py-10">
        <div>
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold! text-(--accent-color)">
            Our <span className="text-(--primary-color)">Services</span>
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-500 text-xl">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">No services available</div>
          ) : (
            services.map((item, index) => (
              <ServiceCard
                key={item.id}
                id={item.id.toString()}
                index={index}
                title={item.name}
                price={parseFloat(item.price)}
                description={item.description}
                image={item.image ? `${IMAGE_URL}${item.image}` : assets.ser1}
              />
            ))
          )}
        </div>

        <div className="flex flex-row-reverse mt-10">
          <Link
            to="/services"
            className="flex items-center text-(--primary-color) font-semibold hover:text-black transition-colors"
          >
            <span>See all</span>
            <IoIosArrowRoundForward size={30} />
          </Link>
        </div>
      </div>

      {/* EBOOK SECTION */}
      <div className="mt-10 lg:px-10 px-5 py-10 grid md:grid-cols-2 grid-cols-1 gap-12 items-center">
        <div className="rounded-md overflow-hidden md:h-80">
          <img
            src={assets.ebook}
            alt="Weight loss hack for busy people"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="text">
          <h1 className="md:text-[48px] text-[30px] md:text-start text-center font-bold! text-(--accent-color) mb-5">
            Our <span className="text-(--primary-color)">Ebook</span>
          </h1>
          <p className="md:text-start text-center font-[inter]! text-sm">
            This course is designed to simplify weight loss cutting through the jargon and confusion, so you can achieve results that fit seamlessly into your busy lifestyle...
          </p>
          <div className="mt-10 flex md:justify-start justify-center">
            <button className="flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium! px-6 py-3 rounded-sm transition-colors duration-200 shadow-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="bg-(--secondary-color) mt-20 lg:px-10 px-5 py-16">
        <h1 className="md:text-[48px] text-[30px] text-center font-semibold mb-12">
          Frequently{" "}
          <span className="text-(--primary-color)">Asked Questions</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
          {[
            {
              num: "01",
              q: "What services does Enoralifestyle Spa offer?",
              a: "We offer facials, massages, body treatments, skincare therapy, pain management, and full spa access.",
            },
            {
              num: "02",
              q: "Do I need to book an appointment in advance?",
              a: "Yes, we recommend booking in advance to secure your preferred date, time, and therapist. Walk-ins are welcome when slots are available.",
            },
            {
              num: "03",
              q: "What should I expect during my first visit?",
              a: "You'll be welcomed by our team, guided through a short consultation, and introduced to your treatment space. Every session is customized to your needs and comfort.",
            },
            {
              num: "04",
              q: "What do I need to bring for my spa session?",
              a: "You don’t need to bring much — we provide robes, towels, and slippers. If you plan to use our pool or gym, simply come along with your swimwear and essentials.",
            },
            {
              num: "05",
              q: "Are your products suitable for sensitive skin?",
              a: "Absolutely. We use high-quality, dermatologist-tested products that are safe and effective for all skin types, including sensitive skin.",
            },
            {
              num: "06",
              q: "Do your spa packages include access to all facilities?",
              a: "Yes! Every spa package includes free access to our pool, sauna, gym, and relaxation rooms — so you can enjoy the full Enoralifestyle experience.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl px-6 py-8 border border-black/20 hover:shadow-lg transition-shadow duration-300 flex gap-4"
            >
              <div className="shrink-0 md:w-15 md:h-15 w-12 h-12 bg-[#C97BB7] text-white rounded-full flex items-center justify-center text-2xl font-bold!">
                {faq.num}
              </div>

              <div>
                <h3 className="text-lg font-semibold! text-(--accent-color) mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-[inter]!">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW SECTION */}
      <div className="mt-10 px-5 lg:px-10">
        <h1 className="md:text-[48px] text-[30px] text-center font-semibold lg:mb-25 mb-10">
          <span className="text-(--primary-color)">Client’s Review</span>
        </h1>

        <div className="flex gap-6 overflow-x-auto styled-scrollbar lg:overflow-x-visible lg:justify-center pb-5 snap-x snap-mandatory lg:flex-row lg:flex-wrap">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`
                flex flex-col shrink-0 w-[300px] h-[360px] snap-center 
                lg:flex-1 lg:min-w-[350px] lg:h-[380px]
                transition-all duration-300
                ${index % 2 !== 0 && "lg:-translate-y-14"}
              `}
            >
              <div className="border border-black/10 rounded-t-2xl px-4 py-8 flex-1 flex flex-col bg-white">
                <div className="flex items-center gap-1">
                  <BiSolidQuoteSingleLeft
                    className="w-8 h-8 md:w-10 md:h-10"
                    style={{ color: review.iconColor }}
                  />
                  <BiSolidQuoteSingleLeft
                    className="w-8 h-8 md:w-10 md:h-10"
                    style={{ color: review.iconColor }}
                  />
                </div>

                <div className="text mt-5 flex-1">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div
                className="p-3 rounded-b-2xl"
                style={{ backgroundColor: review.bgColor }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0">
                    <img
                      src={review.profileImage}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base">
                      {review.name}
                    </h4>
                    <p className="text-xs md:text-sm text-white">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assests";
import { Link } from "react-router-dom";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import HeroSection from "../components/herosections/Herosection";
import { IoIosArrowRoundForward } from "react-icons/io";
import BlogCard from "../components/cards/BlogCard";
import PackageCard from "../components/cards/PackageCard";
import ServiceCard from "../components/cards/ServiceCard";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import UserDetailsModal from "../modals/UserDetailsModal";
import BlogCardSkeleton from "../components/skeletons/BlogCardSkeleton";
import ServiceCardSkeleton from "../components/skeletons/ServiceCardSkeleton";
import PackageCardSkeleton from "../components/skeletons/PackageCardSkeleton";
import TestimonialCardSkeleton from "../components/skeletons/TestimonialCardSkeleton";
import type { testimonialProps } from "../utilities/sharedInterFaces";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface ApiItem {
  id: number;
  name: string;
  description: string;
  type: "package" | "service";
  image: string | null;
  price: string;
  created_at: string;
}

interface UserDetails {
  name: string;
  email: string;
  payment_type?: string;
}

interface Blog {
  id: number;
  title: string;
  short_description: string;
  cover_image: string | null;
  created_at: string;
}

interface PaymentResponse {
  message: string;
  authorization_url: string;
}

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home - Enora Lifestyle And Spa";
  }, []);

  const [packages, setPackages] = useState<ApiItem[]>([]);
  const [services, setServices] = useState<ApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializingPayment, setInitializingPayment] = useState(false);
  const [testimonials, setTestimonials] = useState<testimonialProps[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      if (response.status === 200) {
        const rawData = response.data.data?.data || [];
        setPackages(rawData);
      }
    } catch (err) {
      console.error("API FAILED:", err);
      setPackages([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      // console.log("service response", response)
      if (response.status === 200) {
        const rawData = response.data.data?.data || [];
        setServices(rawData);
      }
    } catch (err) {
      console.error("API FAILED:", err);
      setServices([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoadingBlogs(true);
      try {
        const response = await axios.get(`${API_URL}/blogs`);
        // console.log("response", response)
        const data = response.data?.data?.data || response.data?.data || [];
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Failed to fetch blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setTimeout(() => {
          setIsLoadingBlogs(false);
        }, 1000);
      }
    };

    fetchBlogs();
  }, []);

  const reviews = [
    {
      iconColor: "#000000CC",
      reviewText:
        "I struggled with hormonal acne for years and nothing worked until I found this spa. Their acne facial plan cleared my skin in just 4 weeks. Highly recommended!",
      profileImage: assets.banker,
      name: "Sarah Johnson",
      role: "Banker",
      bgColor: "#C97BB7",
    },
    {
      iconColor: "#C97BB7",
      reviewText:
        "I used to think facials were just for women until I tried their deep cleansing facial. My skin feels fresh and clean, and my beard bumps reduced. I’m definitely coming back.",
      profileImage: assets.soft,
      name: "Michael Peters",
      role: "Software Engineer",
      bgColor: "#000000CC",
    },
    {
      iconColor: "#000000CC",
      reviewText:
        "I came for a skin consultation and left with so much knowledge. They actually understood my skin and recommended the right products. My dark spots are fading already.",
      profileImage: assets.desi,
      name: "Jennifer Okeke",
      role: "Digital Marketer",
      bgColor: "#C97BB7",
    },
  ];

  const faqs = [
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
  ];

  async function fetchTestimonials() {
    setLoadingTestimonials(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/testimonials`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: any = await res.json();
      if (res.ok) {
        setTestimonials(data.data.data);
      } else {
        toast.error(`Failed to load testimonials. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while loading testimonials"
        );
      } else {
        toast.error(error?.message || "Error loading testimonials");
      }
    } finally {
      setLoadingTestimonials(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const initializePayment = async (userDetails: UserDetails) => {
    setInitializingPayment(true);
    const loading = toast.loading("Initializing payment");
    try {
      const reqBody = {
        name: userDetails.name,
        email: userDetails.email,
        payment_type: "online",
      };
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/ebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const data: PaymentResponse = await res.json();
      if (res.ok) {
        toast.success(
          "Payment initialize successfull, redirecting to pyment page..."
        );
        toast.dismiss(loading);
        setIsModalOpen(false);
        // console.log(data);
        window.open(data.authorization_url, "_blank");
      } else {
        toast.error(`Failed to initialize payment. ${data.message}.`);
      }
    } catch (error) {
      const err = error as Error;
      if (
        err?.message?.includes("Unexpected token '<'") ||
        err?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while initializing payment"
        );
      } else {
        toast.error(err?.message || "Error initializing payment");
      }
    } finally {
      setInitializingPayment(false);
    }
  };

  return (
    <>
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
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold text-(--accent-color)">
            Blog <span className="text-(--primary-color)">News</span>
          </h1>

          <div className="mt-10 flex overflow-x-scroll gap-4 no-scrollbar pb-2">
            {isLoadingBlogs
              ? Array(5).fill(0).map((_, index) => (
                <div className="md:min-w-[340px] min-w-[320px]" key={index}>
                  <BlogCardSkeleton />
                </div>
              ))
              : !isLoadingBlogs && !error && blogs.length === 0 ? (
                <div className="text-center pt-16 relative w-full">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                    <div className="absolute">
                      <p className="text-xl text-gray-600 font-medium">
                        No blogs available at the moment.
                      </p>
                      <p className="text-gray-500 mt-2">Check back soon for fresh content!</p>
                    </div>
                  </div>
                </div>
              ) : blogs.slice(0, 6).map((blog, index) => (
                  <div className="md:max-w-[340px] max-w-[320px]" key={index}>
                    <BlogCard
                      id={String(blog?.id)}
                      title={blog?.title}
                      description={blog?.short_description}
                      image={`${IMAGE_URL}/${blog?.cover_image}`}
                    />
                  </div>
                )
              )
            }
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
              <span className="text-[#b23a8a] font-semibold">About</span>{" "}
              <span className="text-(--accent-color)">Us</span>
            </h2>

            <div className="text-gray-700 leading-relaxed space-y-4 text-xs md:text-sm lg:text-base">
              <p className="font-[inter]">
                At Enoralifestyle Spa, we believe self-care is not a luxury—it
                is a lifestyle.
              </p>
              <p className="font-[inter]">
                We are a world-class spa destination offering a full range of
                wellness and beauty treatments designed to relax your body,
                refresh your mind, and restore your natural glow.
              </p>
              <p className="font-[inter]">
                Our mission is to promote total body wellness through
                personalized therapies that relieve pain, reduce stress, and
                enhance overall health.
              </p>
              <p className="font-[inter]">
                Step into our serene environment where expert hands, soothing
                aromas, and natural products come together to create an
                experience of true relaxation and renewal.
              </p>
              <p className="font-[inter]">
                At Enoralifestyle Spa, your well-being is our priority—because
                you deserve to feel your best, inside and out.
              </p>
            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section className="bg-white mt-10 lg:px-10 px-5 py-10">
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold text-(--primary-color)">
            Our <span className="text-black">Packages</span>
          </h1>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className="w-full" key={index}>
                    <PackageCardSkeleton />
                  </div>
                ))
            ) : packages.length === 0 ? (
              <div className="w-full text-center py-20 text-gray-500">
                No packages available
              </div>
            ) : (
              packages.map((item, index) => (
                <div className="min-w-[340px]" key={index}>
                  <PackageCard
                    id={item.id.toString()}
                    index={index}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    image={
                      item.image ? `${IMAGE_URL}/${item.image}` : assets.our1
                    }
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end mt-10">
            <Link
              to="/packages"
              className="flex items-center text-(--primary-color) font-semibold hover:text-black transition-colors"
            >
              <span>See all</span>
              <IoIosArrowRoundForward size={30} />
            </Link>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="bg-(--secondary-color) mt-10 lg:px-10 px-5 py-10">
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold! text-(--accent-color)">
            Our <span className="text-(--primary-color)">Services</span>
          </h1>

          <div className="mt-10 lg:grid grid-cols-3 md:gap-6 gap-4 flex lg:overflow-auto overflow-x-scroll no-scrollbar py-4">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, index) => <ServiceCardSkeleton key={index} />)
            ) : services.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500">
                No services available
              </div>
            ) : (
              services.map((item, index) => (
                <div className="min-w-[340px]" key={index}>
                  <ServiceCard
                    key={item.id}
                    id={item.id.toString()}
                    index={index}
                    title={item.name}
                    price={parseFloat(item.price)}
                    description={item.description}
                    image={
                      item.image ? `${IMAGE_URL}/${item.image}` : assets.ser1
                    }
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end mt-10">
            <Link
              to="/services"
              className="flex items-center text-(--accent-color) font-semibold transition-colors"
            >
              <span>See all</span>
              <IoIosArrowRoundForward size={30} />
            </Link>
          </div>
        </section>

        {/* EBOOK SECTION */}
        <section className="mt-10 lg:px-10 px-5 py-10 grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div className="rounded-xl overflow-hidden md:h-80">
            <img
              src={assets.ebook}
              alt="Weight loss hack for busy people"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="text">
            <h1 className="md:text-[48px] text-[30px] md:text-start text-center font-bold! text-(--accent-color) mb-3">
              Our <span className="text-(--primary-color)">Ebook</span>
            </h1>
            <p className="md:text-start text-center font-[inter] text-sm">
              This course is designed to simplify weight loss cutting through
              the jargon and confusion, so you can achieve results that fit
              seamlessly into your busy lifestyle. With practical strategies,
              time-saving hacks, and expert guidance, you’ll learn how to lose
              weight easily. This program provides the tools, structure, and
              motivation you need to succeed. By the end, you’ll have built
              lasting healthy habits that not only help you manage your weight
              but also boost your overall health. Disease free, no waste of
              money on hospital rounds, fake medications and unethical doctors.
            </p>
            <div className="mt-6 flex md:justify-start justify-center">
              <button
                className="flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium! px-6 py-3 rounded-sm transition-colors duration-200 shadow-sm cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <div className="bg-(--secondary-color) mt-20 lg:px-10 px-5 py-16">
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold mb-12">
            Frequently{" "}
            <span className="text-(--primary-color)">Asked Questions</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl px-6 py-8 border border-black/20 hover:shadow-lg transition-shadow duration-300 flex gap-4"
              >
                <div className="shrink-0 md:w-15 md:h-15 w-12 h-12 bg-[#C97BB7] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {faq.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-(--accent-color) mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-[inter]">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-10 px-5 lg:px-10">
          <h1 className="md:text-[48px] text-[30px] text-center font-semibold md:mb-25 mb-10">
            <span className="text-(--primary-color)">Client’s Review</span>
          </h1>

          {/* Scrollable container for sm & md; static grid on lg */}
          <div className="flex gap-6 overflow-x-auto lg:overflow-y-visible overflow-y-hidden lg:overflow-x-visible lg:justify-center pb-5 snap-x snap-mandatory lg:flex-row lg:flex-wrap">
            {loadingTestimonials
              ? [1, 2, 3].map((_, idx) => <TestimonialCardSkeleton key={idx} />)
              : testimonials.length < 3
                ? reviews.map((review, index) => (
                    <div
                      key={index}
                      className={`
                        flex flex-col shrink-0 w-[300px] h-[360px] snap-center 
                        lg:flex-1 lg:min-w-[350px] lg:h-[380px]
                        transition-all duration-300
                        ${index % 2 !== 0 && "lg:-translate-y-14"}
                      `}
                    >
                      {/* Top section (review content) */}
                      <div className="border border-black/20 rounded-t-2xl px-4 py-8 flex-1 flex flex-col bg-white">
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

                      {/* Bottom section (profile) */}
                      <div
                        className="p-3 rounded-b-2xl"
                        style={{ backgroundColor: review.bgColor }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
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
                  ))
                : testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex flex-col shrink-0 w-[300px] h-[360px] snap-center 
                      lg:flex-1 lg:min-w-[350px] lg:h-[380px]
                      transition-all duration-300
                      ${idx % 2 !== 0 && "lg:-translate-y-14"}
                    `}
                  >
                    {/* Top section (review content) */}
                    <div className="border border-black/20 rounded-t-2xl px-4 py-8 flex-1 flex flex-col bg-white">
                      <div className="flex items-center gap-1">
                        <BiSolidQuoteSingleLeft
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{
                            color: idx % 2 === 0 ? "#000000CC" : "#C97BB7",
                          }}
                        />
                        <BiSolidQuoteSingleLeft
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{
                            color: idx % 2 === 0 ? "#000000CC" : "#C97BB7",
                          }}
                        />
                      </div>

                      <div className="text mt-5 flex-1">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {decodeURIComponent(t.comment)}
                        </p>
                      </div>
                    </div>

                    {/* Bottom section (profile) */}
                    <div
                      className="p-3 rounded-b-2xl"
                      style={{
                        backgroundColor:
                          idx % 2 !== 0 ? "#000000CC" : "#C97BB7",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0">
                          <img
                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                              t.image
                            }`}
                            alt={t.full_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm md:text-base">
                            {t.full_name}
                          </h4>
                          <p className="text-xs md:text-sm text-white">
                            {t.occupation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
          </div>
        </section>
      </div>

      <UserDetailsModal
        isOpen={isModalOpen}
        isLoading={initializingPayment}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          initializePayment(data);
        }}
      />
    </>
  );
};

export default Home;

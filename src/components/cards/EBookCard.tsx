import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import UserDetailsModal from '../../modals/UserDetailsModal';
import { FiX } from 'react-icons/fi';
import { formatterUtility } from '../../utilities/formatterutility';

interface EbookCardProps {
    image: string;
    title: string;
    description: string;
}

interface UserDetails {
  name: string;
  email: string;
  payment_type?: string;
}

interface PaymentResponse {
  message: string;
  authorization_url: string;
}

const EBookCard : React.FC<EbookCardProps> = (item) => {
    const [selectedEbook, setSelectedEbook] = useState<EbookCardProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initializingPayment, setInitializingPayment] = useState(false);

    useEffect(() => {
        if (isModalOpen || selectedEbook) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "unset";
        }
        return () => {
          document.body.style.overflow = "unset";
        };
    }, [isModalOpen, selectedEbook]);

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
          toast.dismiss(loading);
        }
    };

    return (
        <>
            <div className='p-4 grid lg:grid-cols-3 grid-cols-1 gap-4 items-center relative bg-white rounded-3xl shadow hover:shadow-md transition-all duration-300 border border-black/10 overflow-hidden'>
                <div className="col-span-1 border border-inherit rounded-xl lg:h-[180px] h-[250px]">
                    <img src={item.image} alt="" className='h-full w-full object-cover' />
                </div>
                <div className="lg:col-span-2 space-y-1">
                    <h3 className='text-xl line-clamp-2 font-[Inter]! font-semibold!'>{item.title}</h3>
                    <p className='line-clamp-3 font-[Inter]! leading-5 text-sm'>{item.description}</p>
                    <div className="mt-4 flex gap-3 justify-sart w-full">
                        <button
                            className="flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium! px-6 h-10 rounded-sm transition-colors duration-200 shadow-sm cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Buy Now
                        </button>
                        <button
                            className="cursor-pointer bg-transparent text-(--primary-color) font-medium px-6 h-10 transition-colors duration-200 border border-(--primary-color) rounded-sm"
                            onClick={() => setSelectedEbook(item)}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            <UserDetailsModal
                isOpen={isModalOpen}
                isLoading={initializingPayment}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => {
                initializePayment(data);
                }}
            />
            {selectedEbook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
                    <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
                        <div className="relative h-[250px] ">
                            <div className="absolute inset-0 bg-black/60"></div>
                            <button
                                onClick={() => setSelectedEbook(null)}
                                className="cursor-pointer absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
                            >
                                <FiX size={20} />
                            </button>
            
                            <img
                                src={selectedEbook.image}
                                alt={selectedEbook.title}
                                className="w-full h-full object-cover rounded-t-3xl"
                            />
                            
                            <div className="absolute top-0 left-4 mt-4">
                                <p className="text-2xl font-semibold! text-white">
                                    Price:{" "}
                                    <span className="font-bold!">
                                    {formatterUtility(Number("5000"))}
                                    </span>
                                </p>
                            </div>
                        </div>
            
                        <div className="p-6 lg:max-h-[40vh] md:max-h-[30vh] max-h-[50vh] overflow-y-auto styled-scrollbar">
                            <h2 className="text-[24px] font-semibold! text-black mb-2">
                                {selectedEbook.title}
                            </h2>
                            <p className="text-gray-600 text-sm font-[Inter]! leading-relaxed">
                                {selectedEbook.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EBookCard
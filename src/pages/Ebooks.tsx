import React, { useEffect } from 'react'
import HeroSection from '../components/herosections/Herosection'
import { assets } from '../assets/assests'
import EBookCard from '../components/cards/EBookCard';

const Ebooks : React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ebooks - Enora Lifestyle And Spa";
    }, []);

    return (
        <div className="">
            <HeroSection
                title="E-Books"
                backgroundImage={assets.ebookbg}
                height="lg:h-[65vh] h-[40vh]"
            />
            <div className="py-16 lg:pt-20 px-5 lg:px-10">
                <div>
                    <h1
                        className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold! mb-4"
                        style={{ color: "var(--accent-color)" }}
                    >
                        Our <span className="font-semibold!" style={{ color: "var(--primary-color)"}}>Ebooks</span>
                    </h1>
                    <p className="text-center text-base sm:text-lg max-w-2xl mx-auto mb-12" style={{ color: "var(--accent-color)" }}>
                        Your Guides to Ultimate Relaxation and Health, expert Insights on Spa & Self-Care
                    </p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <EBookCard 
                        image={assets.ebook}
                        title='Weight loss hack for busy people'
                        description='This course is designed to simplify weight loss cutting through the jargon and confusion, so you can achieve results that fit seamlessly into your busy lifestyle. With practical strategies, time-saving hacks, and expert guidance, you’ll learn how to lose weight easily. This program provides the tools, structure, and motivation you need to succeed. By the end, you’ll have built lasting healthy habits that not only help you manage your weight but also boost your overall health. Disease free, no waste of money on hospital rounds, fake medications and unethical doctors. \n This is more than an e-book. It is a lifestyle shift that saves you countless health worries. You’ll want to get it instantly. 5k'
                    />
                </div>
            </div>
        </div>
    )
}

export default Ebooks
import { useState } from "react";
import aboutImageOne from '../../assets/about-img-1.jpg'
import aboutImageTwo from '../../assets/about-img-2.jpg'

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const faqs: FAQ[] = [
    {
      question: "What Do I Need To Rent A Car?",
      answer:
        "Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location that best fits your needs.",
    },
    {
      question: "How Old Do I Need To Be To Rent A Car?",
      answer:
        "The minimum age to rent a car is typically 21, but it may vary by location.",
    },
    {
      question: "Can I Rent A Car With A Debit Card?",
      answer:
        "Yes, you can rent a car with a debit card, but certain restrictions may apply based on the rental company.",
    },
  ];

  return (
    <div className="bg-black text-white py-16 px-8 rounded-lg">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left Section - Car and Background */}
        <div className="relative w-full max-w-md mx-auto p-6">
      {/* First Image */}
      <div className="relative">
        <img
          src={aboutImageOne}
          alt="Lady in Car"
          className="w-2/3 rounded-[40%] shadow-lg border-transparent outline"
        />
      </div>

      {/* Second Image */}
      <div className="absolute top-40 right-[-10%]">
        <img
          src={aboutImageTwo} 
          alt="Smiling Lady"
          className="w-2/3 rounded-[50%] shadow-lg border-4 border-transparent outline"
        />
      </div>

      {/* Red Asterisk Decoration */}
      <div className="absolute top-12 w-20 right-4 text-orange-600 text-9xl font-bold">
        *
      </div>

      {/* Star Decoration */}
      <div className="absolute bottom-6 left-10 text-gray-500 text-4xl">
        ✦
      </div>
    </div>

        {/* Right Section - FAQ */}
        <div className="w-full lg:w-1/2">
          <p className="text-orange-600 font-bold mb-4">
            ★ Frequently Asked Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Everything you need to know about our services
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700 mb-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center py-4">
                <h3 className="font-bold text-lg">{faq.question}</h3>
                <span className="text-gray-400">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-400 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

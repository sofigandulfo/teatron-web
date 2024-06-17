import { useState } from "react";
import FAQItem from "../components/FAQItem/FAQItem";
import faqsData from "../data/faq.json";
import "../styles/Faq.css";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <>
      <h1 className="faq-title">INFORMACIÓN GENERAL</h1>
      <div className="accordion">
        {faqsData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={index === openIndex}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Faq;

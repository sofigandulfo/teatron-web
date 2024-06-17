import '../../styles/Faq.css'

function FAQItem({ question, answer, isOpen, onClick }){
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        {question}
      </div>
        <div className={`accordion-content ${isOpen ? 'show' : ''}`}>
          {isOpen && answer}
        </div>
    </div>
  );
};

export default FAQItem;


const Card = ({ className = "", children }) => {
  return <div className={className + " Card w-sm"}>{children}</div>;
};

export default Card;

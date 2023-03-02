const Card = ({ className = "", children }) => {
  return <div className={className + " Card"}>{children}</div>;
};

export default Card;

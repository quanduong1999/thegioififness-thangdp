import React, { useState } from "react";

const ReadMore = ({ chirlden }) => {
  const text = chirlden;
  console.log("text",text);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      <span>{isReadMore ? text.slice(0, 150) : text}</span>
      <span onClick={toggleReadMore}>
        {isReadMore ? (
          <span style={{ color: "red" }}>...đọc thêm</span>
        ) : (
          <span style={{ color: "red" }}>ẩn bớt</span>
        )}
      </span>
    </p>
  );
};

const Content = ({ text }) => {
  return <ReadMore chirlden={text} />;
};

export default Content;

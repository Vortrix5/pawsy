import { useState, useEffect } from "react";

const AnimatedText = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const words = ["Companion", "Friend", "Family Member", "Buddy"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, 2000);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <span
      className={`inline-block min-w-[200px] text-secondary transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {words[currentWord]}
    </span>
  );
};

export default AnimatedText;

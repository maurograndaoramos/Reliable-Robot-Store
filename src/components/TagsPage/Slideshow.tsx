import React, { useState, useEffect } from 'react';

const images = [
  "https://cdn.lifeofpix.com/146172/_w1800/308944/lifeofpix-gokselyesilkaya2586-308944.webp",
  "https://cdn.lifeofpix.com/238472/_w1800/369770/lifeofpix-238472369770.webp",
  "https://cdn.lifeofpix.com/368590/_w1800/369411/lifeofpix-368590369411.webp"
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
}, []);

return (
    <div
        className="w-full h-full bg-no-repeat transition-all duration-5000"
        style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: window.innerWidth < 700 ? '200%' : '125%',
        backgroundPosition: 'center left',
      }}
    />
  );
}

import { useState } from 'react';
const MenuImageCarousel = ({ images = [] }) => {
  const safeImages = Array.isArray(images) ? images : [];

  const validImages = safeImages.filter(
    (img) => img && typeof img === 'object' && img.imageUrl,
  );

  const [index, setIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/400"
        alt="menu"
        className="w-full h-52 object-cover"
      />
    );
  }

  const next = () => {
    setIndex((prev) => (prev + 1) % validImages.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <div className="relative w-full h-52 overflow-hidden rounded-xl">
      <img
        src={validImages[index].imageUrl}
        alt="menu"
        className="w-full h-52 object-cover"
      />

      {validImages.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2">
            ‹
          </button>
          <button onClick={next} className="absolute right-2 top-1/2">
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default MenuImageCarousel;
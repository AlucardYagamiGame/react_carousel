import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize = 3,
  itemWidth = 130,
  animationDuration,
  //infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const maxIndex = images.length - frameSize;

    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [frameSize, images.length, currentIndex]);

  const handleNext = () => {
    const maxIndex = images.length - frameSize;

    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + Math.max(1, step);

      return nextIndex > maxIndex ? maxIndex : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex - Math.max(1, step);

      return nextIndex < 0 ? 0 : nextIndex;
    });
  };

  const maxIndex = images.length - frameSize;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  // Передаємо динамічні параметри як CSS-змінні
  const dynamicStyles = {
    '--item-width': `${itemWidth}px`,
    '--frame-size': frameSize,
    '--current-index': currentIndex,
    '--animation-duration': `${animationDuration}ms`,
  } as React.CSSProperties;

  return (
    <div className="Carousel" style={dynamicStyles}>
      <ul className="Carousel__list">
        {images.map((image, index) => {
          return (
            <li key={index} className="Carousel__item">
              <img
                src={image}
                alt={image}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          data-cy="prev"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

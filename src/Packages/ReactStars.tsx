import React, {
  useState,
  useEffect,
  CSSProperties,
  ReactElement,
  MouseEvent
} from 'react';

interface ZReactStarsProps {
  className?: string;
  edit?: boolean;
  value?: number;
  count?: number;
  size?: number;
  color1?: string;
  color2?: string;
  hoverColor?: string;
  onChange?: (value: number) => void;
  disabled?: boolean; // Added disabled prop
}

interface Star {
  active: boolean;
  hover: boolean;
}

const parentStyles: CSSProperties = {
  overflow: 'hidden',
  position: 'relative'
};

const defaultStyles: CSSProperties = {
  cursor: 'pointer',
  display: 'inline-block',
  transition: 'color 0.3s'
};

const disabledStyles: CSSProperties = {
  cursor: 'not-allowed',
  opacity: 0.5
};

const StarIcon = ({ fill, size }: { fill: string; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
  </svg>
);

const ZReactStars: React.FC<ZReactStarsProps> = (props) => {
  const {
    className,
    edit = true,
    value = 0,
    count = 5,
    size = 15,
    color1 = 'gray',
    color2 = '#ffd700',
    hoverColor = '#e6b800',
    onChange = () => {},
    disabled = false // Default disabled to false
  } = props;

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(getStars(value));
  }, [value, count]);

  const getStars = (activeCount: number = Math.round(value)): Star[] => {
    const starsArray: Star[] = [];
    for (let i = 0; i < count; i++) {
      starsArray.push({ active: i < activeCount, hover: false });
    }
    return starsArray;
  };

  const handleMouseOver = (event: MouseEvent<HTMLSpanElement>): void => {
    if (disabled || !edit) return;

    const index = Number(event.currentTarget.getAttribute('data-index')) + 1;
    const newStars = getStars(index).map((star, i) => ({
      ...star,
      hover: i < index
    }));
    setStars(newStars);
  };

  const handleMouseLeave = (): void => {
    if (disabled || !edit) return;
    setStars(getStars());
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>): void => {
    if (disabled || !edit) return;

    const index = Number(event.currentTarget.getAttribute('data-index')) + 1;
    setStars(getStars(index));
    onChange(index);
  };

  const renderStars = (): ReactElement[] => {
    return stars.map((star, i) => (
      <span
        style={{
          ...defaultStyles,
          ...(disabled ? disabledStyles : {}),
          color: star.active ? color2 : color1,
          fill: star.hover ? hoverColor : star.active ? color2 : color1
        }}
        key={i}
        data-index={i}
        onMouseOver={handleMouseOver}
        onMouseMove={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <StarIcon
          fill={star.hover ? hoverColor : star.active ? color2 : color1}
          size={size}
        />
      </span>
    ));
  };

  return (
    <div className={className} style={parentStyles}>
      {renderStars()}
    </div>
  );
};

export default ZReactStars;

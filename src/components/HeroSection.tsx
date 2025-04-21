
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgImage?: string;
  bgColor?: string;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  bgImage,
  bgColor = "bg-agro-blue",
}: HeroSectionProps) => {
  return (
    <div
      className={`${bgColor} py-20 text-white ${
        bgImage
          ? `bg-cover bg-center bg-no-repeat`
          : ""
      }`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <h2 className="text-2xl font-medium mb-6">{subtitle}</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">{description}</p>
        <Link
          to={buttonLink}
          className="inline-block px-6 py-3 bg-agro-orange text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;

import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible &&
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        opacity: .75
      }}
    ><FaArrowAltCircleUp className="icon" style={{ width: "32px", height: "32px" }} />
    </button>
  )
}
export default BackToTop
import { FaLocationArrow } from "react-icons/fa6";
import Link from 'next/link';
import { socialMedia } from "@/src/data";
import MagicButton from "./ui/MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      {/* <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div> */}
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
  <p className="md:text-base text-sm md:font-normal font-light whitespace-nowrap">
    Copyright © 2025 ThinkInfo Expert Solutions
  </p>
            
            {/* privacy polish*/}
            <div className="relative flex items-center md:gap-6 gap-9 w-full">
  <a
    href="/privacy"  // Change to your privacy policy URL
    target="_blank"
    rel="noopener noreferrer"
    className="w-[240px] h-[50px] cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 absolute right-2 z-5"
  >
    <span className="text-white text-md">Privacy Policy</span>
  </a>
</div>

            {/* ==================== */}
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
            
              key={info.id}
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
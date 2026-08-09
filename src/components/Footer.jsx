import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f172a] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src="/logo.svg" alt="WonderMate Logo" className="h-8" />
            <span className="text-xl font-bold">WonderMate</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Your AI travel curator — personalized itineraries, hotel picks, and
            day-by-day plans crafted in seconds.
          </p>
          <div className="flex gap-4 mt-5 text-white/60">
            <a href="#" aria-label="Instagram" className="hover:text-cyan-400 transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-cyan-400 transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-cyan-400 transition-colors">
              <FaFacebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-white/50 mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><Link to="/create-trip" className="hover:text-cyan-400 transition-colors">Plan a Trip</Link></li>
            <li><Link to="/saved-trips" className="hover:text-cyan-400 transition-colors">My Trips</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-white/50 mb-4">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide text-white/50 mb-4">
            Legal
          </h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} WonderMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

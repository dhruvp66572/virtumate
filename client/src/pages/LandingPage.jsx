import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Instead of @/components/ui/motion
import { Button } from "../components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Login from "./Login";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { 
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ];

  const navLinks = [
    // { text: 'Home', href: '#' },
    { text: "Why us?", href: "#about us" },
    // { text: 'Upcoming Events', href: '#events' },
    { text: "Speakers", href: "#speakers" },
    { text: "Content Library", href: "#library" },
    { text: "Our Sponsors", href: "#sponsors" },
    {
      text: "Login",
      href: "#", // Prevent navigation
      onClick: toggleModal,
    },
  ];

  // const secondaryNavButtons = [
  //   'Registration', 'Topics', 'Speakers', 'Sponsors'
  // ];

  return (
    <>
    <div className="relative min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Social Links */}
            <div className="hidden md:flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-white/90 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-white brightness-110 text-xl font-medium">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {link.text}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  )}
                  {/* {link.text} */}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="bg-black/95 backdrop-blur-lg py-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block px-6 py-2 text-white/90 hover:text-white hover:bg-white/10"
              >
                {link.text}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      <Login isOpen={isModalOpen} toggleModal={toggleModal} />

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-800/70 to-gray-900/90" /> */}
          <div
            className="absolute inset-0 "
            style={{ background: "rgba(128, 128, 128, 0.5)" }}
          />
          <img
            src="/cover.jpg"
            alt="Singapore Skyline"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Secondary Navigation */}
        {/* <div className="absolute top-28 right-6 z-10">
          <div className="flex flex-col md:flex-row gap-2">
            {secondaryNavButtons.map((text, index) => (
              <motion.button
                key={index}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {text}
              </motion.button>
            ))}
          </div>
        </div> */}

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* THE MARTECH<br />SUMMIT */}
              VIRTUMATE
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              "Accelerate Success with Us: Engaging, Seamless & Impactful
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-base md:text-lg">
                Join Virtually | Anywhere in the World | Elevate Your Experience
                at #VirtuLink
              </p>
              {/* <p>Raffles City Convention Centre</p> */}
              <p className="text-yellow-300 animate-pulse">
                {/* Early Bird Pricing Now Available */}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="default"
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Registration
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Apply to Speak/Sponsor
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="footer bg-gray-800 text-white text-center py-4 text-sm md:text-base lg:text-lg">
        &copy; 2025 Virtumate | All Rights Reserved
      </footer>
    </div>
    </>
  );
};

export default LandingPage;
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
  'https://i.ibb.co.com/PzJCH00V/university-scholarship-webpage.jpg',
  'https://i.ibb.co.com/4gTd4V1R/medium-shot-graduate-student.jpg',
  'https://i.ibb.co.com/Z1KtGJFR/happy-student-with-graduation-hat-diploma-grey.jpg',
  'https://i.ibb.co.com/LDZ3t9J6/happy-graduates-university-smiling-posing-holsing-diplomas.jpg',
  'https://i.ibb.co.com/svhF01zp/elegant-touching-reading-concentrated-sophisticated.jpg',
];

const ScholarshipAds = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % (images.length + 1));
      }, 2000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="flex flex-col items-center justify-center h-screen relative w-11/12 mx-auto" style={{
        backgroundImage: "url(https://i.ibb.co.com/JWrXbFsM/Screenshot-110.png)",
      }}>
        <div className="absolute inset-0 bg-black animate-neon-glow -z-10"></div>
        {currentImage < images.length ? (
          <motion.img
            key={images[currentImage]}
            src={images[currentImage]}
            alt="Insight"
            className="w-10/12 h-96 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          />
        ) : (
          <motion.h2
            className="text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
          >
            Find Out Yours Today!
          </motion.h2>
        )}
      </div>
    );
  };

export default ScholarshipAds;
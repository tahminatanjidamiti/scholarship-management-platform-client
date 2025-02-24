import React from "react";
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles-engine"; 
import { motion } from "framer-motion";

const ScholarshipFAQ = () => {
  
  const particlesInit = async () => {
    console.log(tsParticles); // Check if engine loads properly
  };


  return (
    <div className="relative w-11/12 mx-auto my-20">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            color: { value: "#0ff" }, // Neon blue
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: 4 },
            links: {
              enable: true,
              color: "#0ff",
              distance: 150,
              opacity: 0.5,
              width: 2,
            },
            move: {
              enable: true,
              speed: 2,
              outModes: { default: "bounce" },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full -z-10"
      />

      {/* FAQ Section */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, 
            repeat: Infinity, 
            repeatType: 'loop',  // or 'reverse' to reverse the animation on each cycle
            repeatDelay: 5 }}
        className="text-center text-4xl font-bold mb-4 text-teal-600"
      >
        Scholarships FAQ!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, 
            repeat: Infinity, 
            repeatType: 'loop',  // or 'reverse' to reverse the animation on each cycle
            repeatDelay: 5  }}
        className="mb-10 w-9/12 mx-auto text-center"
      >
        Scholarship FAQs help clarify eligibility, application processes, deadlines, required documents, and tips for success, empowering students to make informed decisions and secure valuable financial support.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, 
            repeat: Infinity, 
            repeatType: 'loop',  // or 'reverse' to reverse the animation on each cycle
            repeatDelay: 5  }}
        className="hero bg-opacity-10 bg-black min-h-screen border border-teal-500 shadow-[4px_4px_15px_teal,-4px_-4px_15px_black] rounded-lg py-6"
      >
        <div className="hero-content px-0 md:px-4 flex-col lg:flex-row">
          <motion.img
            src="https://i.ibb.co/6NpHwFY/th-4.jpg"
            className="max-w-sm rounded-lg border-2 border-teal-600 shadow-lg"
            alt="Scholarship"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          />
          <div>
            {[
              {
                title: "Scholarship common requirements?",
                content:
                  "Common scholarship requirements include academic performance, financial need, recommendation letters, a personal statement, proof of enrollment, and sometimes standardized test scores or community involvement.",
              },
              {
                title: "Bachelor, Master, Diploma criteria?",
                content:
                  "Bachelor's requires high school completion, GPA, and test scores. Master's needs a Bachelor's degree, recommendations, and a purpose statement. Diplomas require high school completion and subject-specific prerequisites.",
              },
              {
                title: "Scholarships Costing?",
                content:
                  "Scholarships typically do not cost anything to apply for. However, some may require minor fees for application processing or background checks, but the scholarship itself is usually awarded for free.",
              },
              {
                title: "Tips for choosing a Scholarship?",
                content:
                  "When choosing a scholarship, consider eligibility requirements, application deadlines, award amounts, renewal conditions, and whether the scholarship aligns with your academic and career goals.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="collapse collapse-arrow bg-black border border-cyan-500 shadow-[0_0_10px_#0ff] my-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                <div className="collapse-title text-xl font-medium text-cyan-400">
                  {faq.title}
                </div>
                <div className="collapse-content text-white">{faq.content}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default ScholarshipFAQ;
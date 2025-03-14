import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Marquee from 'react-fast-marquee';

const BestQualities = () => {
    const handleType = (count) => {
        // console.log(`Word typed: ${count}`);
    };
    
      const handleDone = () => {
        // console.log(`Done after 5 loops!`)
      }
    return (
        <div className='my-20'>
            <div>
                <h1 className="text-3xl font-extrabold mb-8 flex justify-center items-center mx-auto">
                The Reason {' '}
                    <span style={{ color: 'teal', fontWeight: 'bold', paddingLeft: '10px' }}>
                        <Typewriter
                            words={['to Pick Us!']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                            onLoopDone={handleDone}
                            onType={handleType}
                        />
                    </span>
                </h1>
            </div>
            
            <p className='my-10 w-9/12 mx-auto text-center'>We develop transformative, high-quality educational experiences that inspire and empower students to achieve their fullest potential.</p>
            <div>
                <div className="card bg-white my-5 flex gap-5 w-11/12 mx-auto relative">
                <div className="absolute inset-0 bg-black animate-neon-glow -z-10"></div>
                <Marquee pauseOnHover={true} speed={100} className='space-x-10'>
                    <div className="card-body items-center text-center">
                        <img className='w-40 h-40 rounded-full' src="https://img.icons8.com/?size=60&id=cjaav1k9qYa5&format=gif" alt="Customer support icon!" />
                        <div className="card-actions justify-end">
                            <p className='font-bold text-2xl text-amber-500'>Fast & Friendly Support</p>
                        </div>
                    </div>

                    <div className="card-body items-center text-center">
                        <img className='w-40 h-40 rounded-full' src="https://img.icons8.com/?size=48&id=crX4uqprHPro&format=gif" alt="Fast icon" />
                        <div className="card-actions justify-end">
                            <p className='font-bold text-2xl text-amber-500'>Fast Performance</p>
                        </div>
                    </div>
                    <div className="card-body items-center text-center">
                        <img className='w-40 h-40 rounded-full' src="https://img.icons8.com/?size=48&id=9XUigfHIZFH9&format=gif" alt="Update icon!" />
                        <div className="card-actions justify-end">
                            <p className='font-bold text-2xl text-amber-500'>Regular Update</p>
                        </div>
                    </div>
                    <div className="card-body items-center text-center">
                        <img className='w-40 h-40 rounded-full' src="https://img.icons8.com/?size=40&id=ptfr1HHrBeLT&format=gif" alt="Document icon!" />
                        <div className="card-actions justify-end">
                            <p className='font-bold text-2xl text-amber-500'>Well-Defined Documentation Structure</p>
                        </div>
                    </div>
                    </Marquee>
                </div>

            </div>
        </div>
    );
};

export default BestQualities;
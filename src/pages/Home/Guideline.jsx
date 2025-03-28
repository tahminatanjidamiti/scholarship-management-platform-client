import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const Guideline = () => {
    return (
        <div className='w-11/12 mx-auto my-20' id='guideline'>
            <h1 className="text-center text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 from-10% via-sky-500 to-black">Discover Our Guidelines - Reach Out Today!</h1>
            <p className='my-10 w-8/12 mx-auto text-center'>
                Reveal exciting opportunities with our expert guidelines—let's achieve success together! Reach out today to discover how we can fuel your growth and innovation.
            </p>
            <div className='relative'>
                <div className="absolute inset-0 bg-black animate-neon-glow -z-10"></div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper mb-24 relative"
                >
                    <div className='my-10 w-full'><Link to="/allScholarship">
                    <button className='pt-4 absolute left-0 top-2 z-10 btn mb-10 w-4/12 md:w-1/6 lg:w-[180px] ml-2 md:ml-6 bg-gradient-to-r from-sky-300 via-sky-950 via-30% to-sky-700 to-90% text-white hover:shadow-2xl hover:shadow-sky-500 transition-all'>
                        Find Scholarship <img src="https://img.icons8.com/?size=48&id=cg9cjgYky4Y8&format=gif" alt="Arrow icon!" />
                    </button>
                </Link></div>
                    <SwiperSlide>
                        <img className='w-[400px] h-[400px] border-2 border-sky-500 hover:border-sky-900 transition-all' src="https://i.ibb.co.com/jkmWzS0/education-learning-knowledge-banner-frame.jpg" alt="Slide Picture!" />
                        <h3 className='text-sm lg:text-2xl text-white uppercase text-center -mt-12'>Searching</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[400px] h-[400px] border-2 border-sky-500 hover:border-sky-900 transition-all' src="https://i.ibb.co.com/GHz0FGb/81361525-81ff-48a6-91b5-e56ca332698d.webp" alt="Slide Picture!" />
                        <h3 className='text-xs lg:text-2xl uppercase text-center -mt-12 text-white'>Scholarship?!</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[400px] h-[400px] border-2 border-sky-500 hover:border-sky-900 transition-all' src="https://i.ibb.co.com/0yGHMPY/close-up-still-life-hard-exams.jpg" alt="Slide Picture!" />
                        <h3 className='text-sm lg:text-2xl uppercase text-center -mt-12 text-white'>Need Guideline?</h3>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[400px] h-[400px] border-2 border-sky-500 hover:border-sky-900 transition-all' src="https://i.ibb.co.com/LP1MRxL/274d1931-ff53-4bcd-9d86-af2db5b83107.webp" alt="Slide Picture!" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[400px] h-[400px] border-2 border-sky-500 hover:border-sky-900 transition-all' src="https://i.ibb.co.com/S6QKnVJ/group-diverse-grads-throwing-caps-up-sky.jpg" alt="Slide Picture!" />
                        <h3 className='text-sm lg:text-2xl uppercase text-center -mt-20 text-white'>For Your Success Story!</h3>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
export default Guideline;
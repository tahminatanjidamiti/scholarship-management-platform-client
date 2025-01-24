import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const Guideline = () => {
    return (
        <div className='w-11/12 mx-auto my-20'>
            <h1 className="text-center text-4xl font-bold mb-4">Discover Our Guidelines - Reach Out Today!</h1>
            <p className='my-10 w-9/12 mx-auto text-center'>Reveal exciting opportunities with our expert guidelines—let's achieve success together! Reach out today to discover how we can fuel your growth and innovation.</p>
            <Link to="/allScholarship"><button className='btn mb-10 w-3/12  md:w-1/12 md:ml-6 bg-gradient-to-r from-teal-700 from-10% via-amber-500 via-30% to-teal-300 to-90% text-white '>Find Scholarship <img src="https://img.icons8.com/?size=48&id=cg9cjgYky4Y8&format=gif" alt="Arrow icon!" /> </button></Link>
            <div>
         <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-24"
        >
            <SwiperSlide>
                <img className='w-[400px] h-[400px]' src="https://i.ibb.co.com/jkmWzS0/education-learning-knowledge-banner-frame.jpg" alt="Slide Picture!" />
                <h3 className='text-3xl text-white uppercase text-center -mt-12'>Searching</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-[400px] h-[400px]' src="https://i.ibb.co.com/GHz0FGb/81361525-81ff-48a6-91b5-e56ca332698d.webp" alt="Slide Picture!" />
                <h3 className='text-3xl uppercase text-center -mt-12 text-white'>Scholarship...?!</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-[400px] h-[400px]' src="https://i.ibb.co.com/0yGHMPY/close-up-still-life-hard-exams.jpg" alt="Slide Picture!" />
                <h3 className='text-3xl uppercase text-center -mt-12 text-white'>Need Guideline?</h3>
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-[400px] h-[400px]' src="https://i.ibb.co.com/LP1MRxL/274d1931-ff53-4bcd-9d86-af2db5b83107.webp" alt="Slide Picture!" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='w-[400px] h-[400px]' src="https://i.ibb.co.com/S6QKnVJ/group-diverse-grads-throwing-caps-up-sky.jpg" alt="Slide Picture!" />
                <h3 className='text-3xl uppercase text-center -mt-20 text-white'>For Your Success Story!</h3>
            </SwiperSlide>
        </Swiper>
            </div>
        </div>
    );
};

export default Guideline;
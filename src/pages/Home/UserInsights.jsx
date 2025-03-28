import 'animate.css';
import { useEffect, useState } from 'react';

const UserInsights = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 2000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='my-20' id='review'>
            <div className="text-center items-center">
                <h1 className="text-4xl font-bold">Grasp User <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-950 via-sky-500 to-sky-600'>Insights</span></h1>
                <p className="py-5 w-8/12 mx-auto">
                Empower your scholarship journey with interactive learning, gamified challenges, real-world applications, personalized progress tracking, and seamless mastery—making education engaging, effective, and unforgettable!
                </p>
            </div>
            <div className='md:container mx-auto mt-5 space-y-5 bg-sky-100 px-5 py-10 rounded-lg'>
                <div className={`card card-side bg-base-100 shadow-x lg:w-11/12 mx-auto ${animate ? 'animate__animated animate__fadeInDown' : ''}`}>
                    <figure className='h-[200px]'>
                        <img className='w-full h-full object-cover'
                            src="https://i.ibb.co.com/tTWGtDfm/graduation-concept-with-portrait-happy-man.jpg"
                            alt="User pic" />
                    </figure>
                    <div className="card-body w-8/12">
                        <h2 className="card-title">ScholarBridge makes the scholarship hunt fun and efficient! The interactive tools, real-time updates, and tailored opportunities save so much time and effort. I feel more confident and focused on my goals, knowing I’m not missing any chances. Absolutely love this platform!</h2>
                        <div className="rating">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                        </div>
                    </div>
                </div>
                <div className={`card card-side bg-base-100 shadow-x lg:w-11/12 mx-auto ${animate ? 'animate__animated animate__fadeInDown' : ''}`}>
                    <div className="card-body w-8/12">
                        <h2 className="card-title">Finally, a scholarship platform that truly empowers students! ScholarBridge makes finding and applying for scholarships so easy and stress-free. The personalized recommendations and progress tracking keep me organized and motivated. It’s a total game-changer for anyone chasing their academic dreams!</h2>
                        <div className="rating">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-amber-400" />
                        </div>
                    </div>
                    <figure className='h-[200px]'>
                        <img className='w-full h-full object-cover'
                            src="https://i.ibb.co.com/zHSGCWt3/graduation-concept-with-portrait-happy-girl.jpg"
                            alt="User pic!" />
                    </figure>
                </div>
            </div>
        </div>
    );
};


export default UserInsights;
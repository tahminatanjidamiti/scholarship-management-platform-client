import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <div className='my-10'>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <Carousel 
                    showArrows={true} 
                    autoPlay={true} 
                    infiniteLoop={true} 
                    showThumbs={false} 
                    dynamicHeight={false}
                    emulateTouch={true}
                    interval={5000} 
                    transitionTime={500}
                >
                    <div style={{ height: '500px', overflow: 'hidden' }}>
                        <img 
                            src="https://i.ibb.co.com/k16m8BS/1600w-nu-Jy-F3-RMs-Ko.jpg" 
                            alt="Image 1" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                    <div style={{ height: '500px', overflow: 'hidden' }}>
                        <img 
                            src="https://i.ibb.co.com/5rc5cdF/graduation-concept-with-students-holding-blank-certificate-template.jpg" 
                            alt="Image 2" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                    <div style={{ height: '500px', overflow: 'hidden' }}>
                        <img 
                            src="https://i.ibb.co.com/qpXw6Qp/idea-brainstorm-creative-planning-success-concept.jpg" 
                            alt="Image 3" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                    <div style={{ height: '500px', overflow: 'hidden' }}>
                        <img 
                            src="https://i.ibb.co.com/wRsytqF/happy-student-graduation-cap.jpg" 
                            alt="Image 4" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};


export default Banner;
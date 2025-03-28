import { IoIosArrowDropdownCircle } from "react-icons/io";

const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-sky-300 via-sky-800 to-sky-700 py-5">
            <footer className="footer px-1 md:px-10 text-black">
                <aside className="pl-2">
                    <p className="text-4xl italic text-sky-600 font-bold">ScholarBridge</p>
                    <a href="#faq" className="link link-hover">FAQ</a>
                    <a href="#blog" className="link link-hover">Blogs</a>
                    <a href="#review" className="link link-hover">Reviews</a>
                    <a href="#guideline" className="link link-hover">Guideline</a>
                    <div className="flex items-center justify-center gap-2">
                    <h6 className="footer-title">Follow Us!</h6>
                    <p className="w-4 h-4 bg-sky-600 inline-flex rounded-full text-white justify-center items-center"><IoIosArrowDropdownCircle /></p>
                    </div>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <img src="https://img.icons8.com/?size=24&id=uLWV5A9vXIPu&format=png" alt="Facebook icon!" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/?size=24&id=TJX3x8NCUkFN&format=png" alt="Twiter icon!" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/?size=24&id=Xy10Jcu1L2Su&format=png" alt="Instagram icon!" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/?size=24&id=kBCrQMzpQDLQ&format=png" alt="Linkedin icon!" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/?size=24&id=kshUdu5u4FCX&format=png" alt="Reddit icon!" />
                        </a>

                    </div>
                </aside>
                <nav className="pl-2">
                <img className="w-32 h-20 rounded-lg" src="https://i.ibb.co.com/7ChChqg/131b03f2-f60f-46fd-b1de-fcf1611a421e.webp" alt="" />
                <h6 className="footer-title">Connected With Us!</h6>
                    <div><p className='font-bold text-lg'>Get the latest news and offers</p> <h2 className='font-bold text-xl md:text-3xl'>Subscribe to our newsletter</h2></div>
                    <div className=" mt-2 join border border-purple-950">
                    <input className="input pr-0 md:pr-4 text-black input-bordered join-item h-[60px]" placeholder="Email" />
                    <button className="btn h-[60px] join-item bg-sky-500 text-black hover:bg-sky-800 hover:text-white">Subscribe</button>
                </div>
                </nav>
            </footer>
            <div className="w-full mx-auto text-center pt-6">
                <p className="text-sm text-black">©  {new Date().getFullYear()} ScholarBridge - All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
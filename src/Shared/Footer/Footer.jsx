import { IoIosArrowDropdownCircle } from "react-icons/io";

const Footer = () => {
    return (
        <div className="bg-teal-400 bg-opacity-50 py-5">
            <footer className="footer text-gray-700 px-10">
                <aside>
                    <p className="text-4xl italic text-teal-600 font-bold">ScholarBridge</p>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Work with Us</a>
                    <a className="link link-hover">FAQ</a>
                    <div className="flex items-center justify-center gap-2">
                    <h6 className="footer-title">Follow Us!</h6>
                    <p className="w-4 h-4 bg-teal-600 inline-flex rounded-full text-white justify-center items-center"><IoIosArrowDropdownCircle /></p>
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
                <nav>
                <h6 className="footer-title">Connected With Us!</h6>
                    <div><p className='font-bold text-lg'>Get the latest news and offers</p> <h2 className='font-bold text-3xl'>Subscribe to our newsletter</h2></div>
                    <div className=" mt-2 join border border-purple-950">
                    <input className="input input-bordered join-item h-[60px]" placeholder="Email" />
                    <button className="btn h-[60px] join-item bg-teal-500 hover:bg-teal-800 hover:text-white">Subscribe</button>
                </div>
                </nav>
            </footer>
            <div className="text-center pt-6">
                <p className="text-sm text-gray-600">©  {new Date().getFullYear()} ScholarBridge - All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
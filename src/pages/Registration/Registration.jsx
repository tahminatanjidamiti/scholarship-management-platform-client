import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { auth, AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            const role = 'user';
    
            const userInfo = { email: user?.email, name: user?.displayName, photo: user?.photoURL, role: role};
            await axiosPublic.post('/users', userInfo);
    
            toast.success('🎉 Registration Successful! 🎉');
            navigate('/');
        } catch (err) {
            toast.error(`Registration Failed: ${err.message}`);
            setError({ ...error, login: err.code });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
    
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long!');
            return;
        }
    
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must include at least one uppercase letter!');
            return;
        }
    
        if (!/[\W_]/.test(password)) {
            toast.error('Password must include at least one special character!');
            return;
        }
    
        try {
            const result = await createNewUser(email, password);
            const user = result.user;
            toast.success('🎉 Registration Successful! 🎉');
            setUser(user);
    
            await updateUserProfile({ displayName: name, photoURL: photo });
            const role = 'user';
            const userInfo = { name, photo, email: user.email, role };
            const res = await axiosPublic.post('/users', userInfo);
            
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'User created successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInUp animate__faster',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster',
                    },
                });
                navigate('/');
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-bl from-sky-300 via-sky-950 via-40% to-sky-400 to-90% p-10">
            <Helmet>
                <title>ScholarBridge | Register</title>
            </Helmet>
            <motion.div
                className="card bg-white shadow-xl w-full max-w-lg rounded-lg p-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-6 text-gray-800"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Register Your Account
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        className="form-control"
                        whileFocus={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="input input-bordered focus:ring-2 focus:ring-sky-500"
                            required
                        />
                    </motion.div>

                    <motion.div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Your Photo URL"
                            className="input input-bordered focus:ring-2 focus:ring-sky-500"
                            required
                        />
                    </motion.div>

                    <motion.div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input input-bordered focus:ring-2 focus:ring-sky-500"
                            required
                        />
                    </motion.div>

                    <motion.div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="input input-bordered focus:ring-2 focus:ring-sky-500"
                            required
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </motion.div>

                    <motion.div className="form-control mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn bg-gradient-to-r from-sky-300 via-sky-950 via-40% to-sky-300 to-90% text-white font-bold rounded-lg shadow-lg"
                        >
                            Register
                        </motion.button>
                    </motion.div>
                </form>

                <motion.button
                    className="flex justify-center items-center my-5 text-3xl"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle />
                </motion.button>

                <motion.p
                    className="text-center font-medium text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Already have an account?{' '}
                    <Link className="text-sky-500 underline" to="/login">
                        Login
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};


export default Registration;
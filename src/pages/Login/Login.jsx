import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { auth, AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const { userLogin, setUser } = useContext(AuthContext);
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
        
                toast.success('🎉 Google Login Successful! 🎉');
                navigate('/');
            } catch (err) {
                toast.error(`Google Login Failed: ${err.message}`);
                setError({ ...error, login: err.code });
            }
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("🎉 Login Successful! 🎉");
                navigate("/");
            })
            .catch((err) => {
                setError({ ...error, login: err.code });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-sky-500 from-20% via-lime-500 via-50% to-teal-500 p-10">
            <Helmet>
                <title>ScholarBridge | Login</title>
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
                    Login to Your Account
                </motion.h2>
                <form
                    onSubmit={handleSubmit}
                    className="card-body space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.div
                        className="form-control"
                        whileFocus={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered focus:ring-2 focus:ring-teal-500"
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
                            placeholder="Enter your password"
                            className="input input-bordered focus:ring-2 focus:ring-teal-500"
                            required
                        />
                        {error.login && (
                            <label className="label text-sm text-red-500">
                                {error.login}
                            </label>
                        )}
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
                            className="btn bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg shadow-lg"
                        >
                            Login
                        </motion.button>
                    </motion.div>
                </form>
                <motion.button
                    className="flex justify-center items-center mb-4 text-3xl"
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
                    Don’t Have An Account?{" "}
                    <Link className="text-teal-500 underline" to="/registration">
                        Register Now
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
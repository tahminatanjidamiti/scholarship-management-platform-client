import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Main = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    // Toggle the theme//
    const handleThemeToggle = () => {
        setIsDark((prev) => {
            const newTheme = !prev ? 'dark' : 'light';
            // Update the theme in localStorage//
            localStorage.setItem('theme', newTheme);
            // Set the theme to the root element (html or body)//
            document.documentElement.setAttribute('data-theme', newTheme);
            return !prev;
        });
    };
    return (
        <div>
            <Navbar handleThemeToggle={handleThemeToggle} isDark={isDark}></Navbar>
            <div className='min-h-[calc(100vh-490px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;
import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarship/TopScholarship';
import Guideline from '../Guideline';
import OurBlog from './OurBlog';
import ScholarshipFAQ from './ScholarshipFAQ';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>ScholarBridge | Home</title>
            </Helmet>
            <Banner></Banner>
            <TopScholarship></TopScholarship>
            <OurBlog></OurBlog>
            <ScholarshipFAQ></ScholarshipFAQ>
            <Guideline></Guideline>
        </div>
    );
};

export default Home;
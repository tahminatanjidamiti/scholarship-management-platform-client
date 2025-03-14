import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarship from '../TopScholarship/TopScholarship';
import Guideline from '../Guideline';
import OurBlog from './OurBlog';
import ScholarshipFAQ from './ScholarshipFAQ';
import { Helmet } from 'react-helmet-async';
import BestQualities from '../BestQualities';
import UserInsights from '../UserInsights';
import ScholarshipAds from '../ScholarshipAds';


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
            <UserInsights></UserInsights>
            <ScholarshipAds></ScholarshipAds>
            <Guideline></Guideline>
            <BestQualities></BestQualities>
        </div>
    );
};

export default Home;
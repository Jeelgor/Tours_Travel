import React from 'react'
import HeroSection from '../components/HeroSection'
import TopPackage from '../components/TopPackage'
import FeaturesSection from '../components/FeaturesSection'
import SubscribeBanner from '../components/SubscribeBanner'

const Homepage = () => {
    return (
        <>
            <div className='mx-4 sm:mx-[4%]'>
                <HeroSection/>
                <FeaturesSection/>
                <TopPackage/>
                <SubscribeBanner/>
            </div>

            
        </>
    )
}

export default Homepage

import React from 'react'
import { assets } from '../assets/asset'

const FeaturesSection = () => {
    return (
        <>
            <div className={`flex flex-col mx-auto items-center text-center mt-20`}>
                
                <div>
                    <h2 className={`text-xl lg:text-2xl md:text-2xl mb-4 font-bold text-gray-800`}>WHY CHOOSE US ?</h2>
                    <hr className='w-3/5 mx-auto h-0.5 bg-gray-500'/>
                </div>

                <div className="flex flex-col sm:flex-row sm:text-sm md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12 pt-14 px-4 mx-auto lg:text-lg">

                        {/* dollar feature */}

                        <div className={`text-center flex flex-col gap-3 items-center w-3/6 md:w-[30%] lg:w-[25%]`}>
                            <div className='w-12'>
                                <img src={assets.dollar} alt="" />
                            </div>
                            <h3 className="sm:text-lg text-2xl lg:text-xl font-bold mb-2">Competitive Prices</h3>
                            <p className="text-gray-500">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>

                        {/* booking feature*/}

                        <div className={`text-center flex flex-col gap-3 items-center w-3/6 md:w-[30%] lg:w-[25%]`}>
                            <div className='w-12'>
                                <img src={assets.booking} alt="" />
                            </div>
                            <h3 className="sm:text-lg text-2xl lg:text-xl font-bold mb-2">Secure Booking</h3>
                            <p className="text-gray-500">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>

                        {/* experience feature */}

                        <div className={`text-center flex flex-col gap-3 items-center w-3/6 md:w-[30%] lg:w-[25%]`}>
                            <div className='w-12'>
                                <img src={assets.experience} alt="" />
                            </div>
                            <h3 className="sm:text-lg text-2xl lg:text-xl font-bold mb-2">Seamless Experience</h3>
                            <p className="text-gray-500">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                </div>
            </div>
        </>
    )
}

export default FeaturesSection

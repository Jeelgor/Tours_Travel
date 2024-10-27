import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';  // Make sure you import the context
import { assets } from '../assets/asset'

const PackageDetail = () => {
  const { pkgId } = useParams(); // Get package ID from the URL
  const { topPackages, packageDetails, allPackages, formData } = useContext(AppContext);  // Access context

  // Find the package by ID in _PackageDetails, _TopPackages, or _AllPackages

  const packageDetail = packageDetails.find(pkg => pkg._id === pkgId)
  const PackagePrice = topPackages.find(pkg => pkg._id === pkgId) || allPackages.find(pkg => pkg._id === pkgId)

  if (!packageDetail) {
    return <div>Package not found</div>;  // Handle the case where no package is found
  }

  // Ensure guests is at least 1, and default to 1 if undefined or invalid
  const guests = formData.guests && formData.guests > 0 ? formData.guests : 1;

  // Parse package price and handle cases where price may be undefined
  const parsedPrice = PackagePrice?.price ? parseInt(PackagePrice.price.replace(/,/g, '')) : 0;
  const totalPrice = parsedPrice * guests;

  return (
    <>
      <div className='mx-5 sm:mx-[5%] my-4'>

        {/* Package Images */}
        <section className="relative w-full h-[20vmax] lg:h-[30vmax] grid gap-1 grid-rows-2 grid-cols-3">

          <img
            src={packageDetail.gallery[0]}
            alt=""
            className="w-full h-full object-cover row-span-2 col-span-2"
          />
          <img
            src={packageDetail.gallery[1]}
            alt=""
            className="w-full h-full  object-cover"
          />
          <img
            src={packageDetail.gallery[2]}
            alt=""
            className="w-full h-full object-cover"
          />
        </section>
        {/* Package Navbar */}
        <section className='my-4'>
          {/* navlink */}
          <div className={`flex flex-col gap-2`}>
            <ul className={`flex w-[60%] justify-between`}>
              <a href="#Overview"><li>Overview</li></a>
              <a href="#Amenities"> <li>Amenities</li> </a>
              <a href="#About-Property"> <li>About Property</li> </a>
              <a href="#Accessibility"><li>Accessibility</li> </a>
              <a href="#Price-Details"><li>Price Details</li> </a>
            </ul> 
            <hr className={`h-[2px] bg-gray-900`} />
          </div>
        </section>

        {/* Package Overview */}
        < section id='Overview' className='my-5 flex flex-col items-start gap-2' >
          <h2 className='text-2xl text-gray-800 font-bold'>{packageDetail.overview[0]}</h2>
          <p className='text-lg'>{packageDetail.overview[1]}</p>
          <div className='flex gap-4'>
            <p className={`px-5 py-1 rounded-md text-white font-bold bg-green-500`}>{packageDetail.overview[2]}</p>
            <p className='text-lg font-bold text-gray-600'>{packageDetail.packageType}</p>
          </div>
        </section >

        {/* Package Amenities */}
        <section id='Amenities' className='my-5'>
          <h4 className='text-2xl text-gray-800 font-bold'>Amenities</h4>
          <ul className={`grid grid-flow-row-dense grid-cols-2 gap-2 w-[30vmax] mt-4`}>
            {packageDetail.amenities.map((amenity, index) => (
              <li key={index} className='text-lg'>{amenity}</li>
            ))}
          </ul>
        </section>

        {/* About the Property */}
        <section id='About-Property' className='my-5 flex w-full gap-8 justify-between' >
          <h3 className='text-2xl font-bold text-gray-800'>About Property</h3>
          <div className={`w-[75%] flex flex-col gap-4`}>
            <h3 className='text-xl font-bold text-gray-800'>{packageDetail.aboutProperty.title}</h3>
            <h4 className='italic'>{packageDetail.aboutProperty.subtitle}</h4>
            <p>{packageDetail.aboutProperty.description}</p>
            <ul className='mt-5 grid grid-flow-row-dense grid-cols-4 gap-2'>
              {packageDetail.aboutProperty.perks.map((perk, index) => (
                <li key={index}>
                  <span className='text-black mr-2'>•</span> {perk}
                </li>
              ))}
            </ul>
          </div>
        </section >


        {/* Accessibility */}
        <section id='Accessibility' className='my-5 flex justify-between w-full relative gap-8' >
          {/* Accessibility Section */}
          <div className='w-[50%] mt-12'>
            <h4 className='text-2xl mb-4 text-gray-800 font-bold'>Accessibility</h4>
            <p className='text-lg'>{packageDetail.accessibility}</p>
          </div>

          {/* Common Areas section*/}
          <div className='w-[40%] mt-12 flex flex-col justify-start'>
            <div className='flex gap-4 items-center text-center'>
              <img className='w-5 h-5' src={assets.CommonAreas} alt="" />
              <h4 className='text-2xl text-gray-800 font-bold'>Common Areas</h4>
            </div>
            <div className='pl-8 py-3'>
              <ul className='grid grid-flow-row-dense grid-cols-1 gap-2'>
                {packageDetail.commonAreas.map((area, index) => (
                  <li key={index}>
                    <span className='text-black mr-2'>•</span> {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section >

        <section id='Price-Details' className="bg-white p-4 relative rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-8">Price Details</h2>
          <div className="flex justify-between mb-2">
            <p className="text-lg text-gray-700 font-semibold">Starting price per traveller</p>
            <p className="text-lg text-gray-700 font-semibold">{PackagePrice.price}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg text-gray-700 font-semibold">Number of travellers</p>
            <p className="text-lg text-gray-700 font-semibold">{guests}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-lg font-semibold text-blue-500">Pay Now</p>
            <p className="text-lg font-semibold text-blue-500">₹{totalPrice.toLocaleString()}</p>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white w-full py-2 font-semibold text-lg rounded-md hover:bg-blue-600">Next: Final Details</button>
          </div>
        </section>
      </div >
    </>
  );
};

export default PackageDetail;

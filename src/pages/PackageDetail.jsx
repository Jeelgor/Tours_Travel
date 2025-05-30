import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL
const PackageDetail = () => {
  const { pkgId } = useParams();
  const location = useLocation();

  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numTravellers, setNumTravellers] = useState(1);
  const { price, Seatleft } = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Auth/users/getTourDetailPackages/${pkgId}`);
        setPackageDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch package details.');
        console.log(err)
        setLoading(false);
      }
    };

    fetchPackageDetail();
  }, [pkgId]);

  // Check if loading
  if (loading) return <div>Loading...</div>;

  // Check for errors
  if (error) return <div>{error}</div>;

  // Calculate total price
  const getNumericPrice = (priceString) => {
    const numericValue = parseFloat(priceString.replace(/[₹,]/g, '').trim());
    return numericValue;
  };
  const newprice = getNumericPrice(price);
  const totalPrice = newprice * numTravellers;

  const handleBooking = () => {
    navigate("/BookingForm", {
      state: {
        packageType: packageDetail.packageType,
        packageName: packageDetail.overview[0],
        packageId: pkgId,
        price: newprice,
      },
    })
  }
  return (
    <div className='mx-5 sm:mx-[5%] my-4'>
      {/* Package Images */}
      <section className="relative w-full h-[20vmax] lg:h-[30vmax] grid gap-1 grid-rows-2 grid-cols-3">
        {packageDetail.gallery && packageDetail.gallery.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Package image ${index + 1}`}
            className={index === 0 ? "w-full h-full object-cover row-span-2 col-span-2" : "w-full h-full object-cover"}
          />
        ))}


      </section>

      {/* Package Navbar */}
      <section className='my-4'>
        <div className={`flex flex-col gap-2`}>
          <ul className={`flex w-[60%] justify-between`}>
            <p><li>Overview</li></p>
            <p ><li>Amenities</li></p>
            <p ><li>About Property</li></p>
            <p ><li>Accessibility</li></p>
            <p ><li>Price Details</li></p>
          </ul>
          <hr className={`h-[2px] bg-gray-900`} />
        </div>
      </section>

      {/* Package Overview */}
      <section id='Overview' className='my-5 flex flex-col items-start gap-2'>
        <h2 className='text-2xl text-gray-800 font-bold'>{packageDetail.overview[0]}</h2>
        <p className='text-lg'>{packageDetail.overview[1]}</p>
        <div className='flex gap-4'>
          <p className={`px-5 py-1 rounded-md text-white font-bold bg-green-500`}>{packageDetail.overview[2]}</p>
          <p className='text-lg font-bold text-gray-600'>{packageDetail.packageType}</p>
        </div>
      </section>

      {/* Package Amenities */}
      <section id='Amenities' className='my-5'>
        <h4 className='text-2xl text-gray-800 font-bold'>Amenities</h4>
        <ul className={`grid grid-flow-row-dense grid-cols-2 gap-2 w-[30vmax] mt-4`}>
          {packageDetail.amenities && packageDetail.amenities.map((amenity, index) => (
            <li key={index} className='text-lg'>{amenity}</li>
          ))}
        </ul>
      </section>

      {/* About the Property */}
      <section id='About-Property' className='my-5 flex w-full gap-8 justify-between'>
        <h3 className='text-2xl font-bold text-gray-800'>About Property</h3>
        <div className={`w-[75%] flex flex-col gap-4`}>
          <h3 className='text-xl font-bold text-gray-800'>{packageDetail.aboutProperty.title}</h3>
          <h4 className='italic'>{packageDetail.aboutProperty.subtitle}</h4>
          <p>{packageDetail.aboutProperty.description}</p>
          <ul className='mt-5 grid grid-flow-row-dense grid-cols-4 gap-2'>
            {packageDetail.aboutProperty.perks && packageDetail.aboutProperty.perks.map((perk, index) => (
              <li key={index}>
                <span className='text-black mr-2'>•</span> {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Accessibility */}
      <section id='Accessibility' className='my-5 flex justify-between w-full relative gap-8'>
        <div className='w-[50%] mt-12'>
          <h4 className='text-2xl mb-4 text-gray-800 font-bold'>Accessibility</h4>
          <p className='text-lg'>{packageDetail.accessibility}</p>
        </div>
        <div className='w-[40%] mt-12 flex flex-col justify-start'>
          <div className='flex gap-4 items-center text-center'>
            <h4 className='text-2xl text-gray-800 font-bold'>Common Areas</h4>
          </div>
          <div className='pl-8 py-3'>
            <ul className='grid grid-flow-row-dense grid-cols-1 gap-2'>
              {packageDetail.commonAreas && packageDetail.commonAreas.map((area, index) => (
                <li key={index}>
                  <span className='text-black mr-2'>•</span> {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Price Details */}
      <section id='Price-Details' className="bg-white p-4 relative rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-8">Price Details</h2>
        <div className="flex justify-between mb-2">
          <p className="text-lg text-gray-700 font-semibold">Starting price per traveller</p>
          <p className="text-lg text-gray-700 font-semibold">₹{price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-semibold">Number of travellers</p>
          <input
            type="number"
            value={numTravellers}
            onChange={(e) => setNumTravellers(Math.max(1, e.target.value))}
            className="border rounded-lg w-20 p-1"
            min="1"
          />
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-blue-500">Total Price</p>
          <p className="text-lg font-semibold text-blue-500">₹{totalPrice}</p>
        </div>

        {
          Seatleft <= 0 ? <span>Sorry The Package Seat Was Full we will notify when Package will available</span> : <div>
            <button className="bg-blue-500 text-white w-full py-2 font-semibold text-lg rounded-md hover:bg-blue-600" onClick={handleBooking}>Book Now</button>
            <span className='text-red-800'>Hurry Up Limited Seats are available {Seatleft}</span>
          </div>
        }
      </section >
    </div >
  );
};

export default PackageDetail;
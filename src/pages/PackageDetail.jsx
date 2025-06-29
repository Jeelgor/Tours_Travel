import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Clock,
  Shield,
  Wifi,
  Car,
  Coffee,
  Camera,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Eye,
  Award,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const PackageDetail = () => {
  const { pkgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numTravellers, setNumTravellers] = useState(1);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { price, Seatleft } = location.state || {};
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/Auth/users/getTourDetailPackages/${pkgId}`);
        setPackageDetail(response.data);
      } catch (err) {
        setError('Failed to fetch package details.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetail();
  }, [pkgId]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'amenities', 'about-property', 'accessibility', 'price-details'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNumericPrice = (priceString) => {
    if (!priceString) return 0;
    const numericValue = parseFloat(priceString.toString().replace(/[₹,]/g, '').trim());
    return isNaN(numericValue) ? 0 : numericValue;
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
        numTravellers
      },
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextImage = () => {
    if (packageDetail?.gallery) {
      setCurrentImageIndex((prev) =>
        prev === packageDetail.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (packageDetail?.gallery) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? packageDetail.gallery.length - 1 : prev - 1
      );
    }
  };

  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="animate-pulse">
        <div className="w-full h-96 bg-gray-300 rounded-2xl mb-8"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded mb-8 w-2/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl">
                  <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-2xl h-fit">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!packageDetail) return null;

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'amenities', label: 'Amenities', icon: Star },
    { id: 'about-property', label: 'About Property', icon: Award },
    { id: 'accessibility', label: 'Accessibility', icon: Shield },
    { id: 'price-details', label: 'Price Details', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Gallery Section */}
      <section className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full h-[60vh] rounded-3xl overflow-hidden shadow-2xl group">
            {packageDetail.gallery && packageDetail.gallery.length > 0 ? (
              <>
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
                  <div
                    className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group/main"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <img
                      src={packageDetail.gallery[0] || "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                      alt="Main package view"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover/main:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <Camera size={14} />
                        View Gallery
                      </span>
                    </div>
                  </div>

                  {packageDetail.gallery.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden cursor-pointer group/thumb"
                      onClick={() => {
                        setCurrentImageIndex(index + 1);
                        setIsImageModalOpen(true);
                      }}
                    >
                      <img
                        src={image || "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                        alt={`Package view ${index + 2}`}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover/thumb:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      size={20}
                      className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                    />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Share2 size={20} className="text-gray-600 hover:text-blue-600 transition-colors duration-300" />
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Camera size={64} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8 overflow-x-auto">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${activeSection === id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-300"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section id="overview" className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">Premium Package</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    {packageDetail.overview?.[0] || 'Amazing Tour Package'}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {packageDetail.overview?.[1] || 'Discover breathtaking destinations and create unforgettable memories.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      <Star size={16} className="fill-white" />
                      {packageDetail.overview?.[2] || '4.5'}
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold">
                      <Award size={16} />
                      {packageDetail.packageType || 'Premium Tour'}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities Section */}
            <section id="amenities" className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-blue-600" />
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {packageDetail.amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                )) || (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      <Coffee size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Amenities information not available</p>
                    </div>
                  )}
              </div>
            </section>

            {/* About Property Section */}
            <section id="about-property" className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-600" />
                About This Experience
              </h2>
              {packageDetail.aboutProperty ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {packageDetail.aboutProperty.title}
                    </h3>
                    <p className="text-lg italic text-blue-600 mb-4">
                      {packageDetail.aboutProperty.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {packageDetail.aboutProperty.description}
                    </p>
                  </div>

                  {packageDetail.aboutProperty.perks && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">What's Included</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {packageDetail.aboutProperty.perks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Property information not available</p>
                </div>
              )}
            </section>

            {/* Accessibility Section */}
            <section id="accessibility" className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    Accessibility
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {packageDetail.accessibility || 'Accessibility information not available.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Common Areas
                  </h3>
                  <div className="space-y-3">
                    {packageDetail.commonAreas?.map((area, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    )) || (
                        <p className="text-gray-500 italic">Common areas information not available</p>
                      )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <section id="price-details" className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Your Adventure</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-6">
                  {/* Price Display */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-700">Price per person</span>
                      <span className="text-2xl font-bold text-blue-600">₹{price || '0'}</span>
                    </div>

                    {/* Travellers Counter */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-700">Travellers</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setNumTravellers(Math.max(1, numTravellers - 1))}
                          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="w-12 text-center font-bold text-lg">{numTravellers}</span>
                        <button
                          onClick={() => setNumTravellers(numTravellers + 1)}
                          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="border-t border-blue-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total Price</span>
                        <span className="text-3xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Button */}
                  {Seatleft <= 0 ? (
                    <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                      <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-red-800 mb-2">Fully Booked</h3>
                      <p className="text-red-600">
                        Sorry, this package is currently full. We'll notify you when seats become available.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={handleBooking}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <span>Book Now</span>
                        <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                      {Seatleft <= 10 && (
                        <div className="flex items-center justify-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg">
                          <AlertCircle size={16} />
                          <span className="font-semibold text-sm">
                            Hurry! Only {Seatleft} seats left
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <Shield size={24} className="text-green-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-medium">Secure Booking</span>
                    </div>
                    <div className="text-center">
                      <CheckCircle size={24} className="text-blue-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-medium">Instant Confirmation</span>
                    </div>
                    <div className="text-center">
                      <Award size={24} className="text-purple-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600 font-medium">Best Price</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && packageDetail.gallery && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              <X size={24} />
            </button>

            <img
              src={packageDetail.gallery[currentImageIndex] || "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
              alt={`Package view ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {packageDetail.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {packageDetail.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
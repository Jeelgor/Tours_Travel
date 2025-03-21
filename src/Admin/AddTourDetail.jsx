import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TourDetailsForm = () => {
  const { pkgId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { price } = location.state;
  console.log(price)
  const defaultTourState = {
    title: "",
    location: "",
    price: "",
    imageurl: "",
    images: [],
    description: "",
    highlights: [],
    rating: 0,
    SeatLeft: 0,
    currency: "₹",
    accessibility: "",
    commonAreas: []
  };

  const [tour, setTour] = useState(defaultTourState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (pkgId === "new") {
        setTour((prev) => ({ ...prev, price: price || "" }));
        setLoading(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/tours/admin/tourdetails/${pkgId}`,
          {
            withCredentials: true,
            validateStatus: function (status) {
              return status < 500;
            }
          }
        );

        if (response.status === 200 && response.data) {
          const data = response.data;

          // Map API data to form state
          setTour({
            title: data.aboutProperty?.title || "",
            location: "Malaysia",
            imageurl: data.gallery?.[0] || "",
            images: data.gallery || [],
            price: price,
            description: data.aboutProperty?.description || "",
            highlights: data.overview?.slice(1, 2) || [],
            rating: parseFloat(data.overview?.[2]) || 0,
            SeatLeft: 0,
            currency: "₹",
            accessibility: data.accessibility || "",
            commonAreas: data.commonAreas || [],
          });
        } else {
          setTour(defaultTourState);
          setError("Tour not found or invalid response");
        }
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Error fetching tour data. Please try again.");
        setTour(defaultTourState);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [pkgId, price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'highlights') {
      setTour({ ...tour, highlights: value.split(',').map(item => item.trim()) });
    } else if (name === 'commonAreas') {
      setTour({ ...tour, commonAreas: value.split(',').map(item => item.trim()) });
    } else {
      setTour({ ...tour, [name]: value });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...tour.images];
    newImages[index] = value;
    setTour({ ...tour, images: newImages });
  };

  const addImageField = () => {
    setTour({ ...tour, images: [...tour.images, ""] });
  };

  const removeImage = (index) => {
    const newImages = tour.images.filter((_, i) => i !== index);
    setTour({ ...tour, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const formattedTour = {
      ...tour,
      price: `${tour.price}`,
      gallery: tour.images,
    };

    try {
      if (pkgId === "new") {
        await axios.post(
          `${apiUrl}/api/tours/admin/tours`,
          formattedTour,
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `${apiUrl}/api/tours/admin/Updatetours/${pkgId}`,
          formattedTour,
          { withCredentials: true }
        );
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving tour:", err);
      setError(pkgId === "new" ? "Error saving tour." : "Error updating tour.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {pkgId === "new" ? "Create New Tour" : "Edit Tour"}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={tour.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={tour.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={tour.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              {/* Replace the existing image URL input with this section */}
              <div className="col-span-2">
                <label className="block font-semibold text-lg mb-3">Tour Images</label>
                <div className="grid grid-cols-1 gap-4">
                  {tour.images.map((img, index) => (
                    <div key={index} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={img}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter image URL"
                        />
                      </div>
                      {img && (
                        <div className="w-32 h-32 relative">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Image
                  </button>
                </div>
              </div>

              {/* Update the price input */}
              <div className="relative">
                <label className="block font-semibold">Price</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={tour.price}
                    onChange={handleChange}
                    className="w-full p-2 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold">Rating (0-10)</label>
              <input
                type="number"
                name="rating"
                value={tour.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Available Seats</label>
              <input
                type="number"
                name="SeatLeft"
                value={tour.SeatLeft}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Highlights (comma-separated)</label>
            <textarea
              name="highlights"
              value={tour.highlights?.join(', ')}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Enter highlights separated by commas"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={tour.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Accessibility</label>
            <textarea
              name="accessibility"
              value={tour.accessibility}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter accessibility information"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Common Areas (comma-separated)</label>
            <textarea
              name="commonAreas"
              value={tour.commonAreas?.join(', ')}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Enter common areas separated by commas"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {pkgId === "new" ? "Create Tour" : "Update Tour"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TourDetailsForm;
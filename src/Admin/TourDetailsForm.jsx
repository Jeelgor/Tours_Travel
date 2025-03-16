import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TourDetailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { price } = location.state;
  console.log(price,2222)
  
  const defaultTourState = {
    title: "",
    location: "",
    price: "",
    imageurl: "",
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
      if (id === "new") {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/tours/admin/tourdetails/${id}`,
          { 
            withCredentials: true,
            validateStatus: function (status) {
              return status < 500; // Accept any status code less than 500
            }
          }
        );

        if (response.status === 200 && response.data) {
          setTour(response.data);
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
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    const formattedTour = {
      ...tour,
      price: `${price}`,
    };

    try {
      if (id === "new") {
        await axios.post(
          `${apiUrl}/api/tours/admin/tours`, 
          formattedTour, 
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `${apiUrl}/api/tours/admin/tours/${id}`, 
          formattedTour, 
          { withCredentials: true }
        );
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving tour:", err);
      setError(id === "new" ? "Error saving tour." : "Error updating tour.");
    }
  };
console.log("first")
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {id === "new" ? "Create New Tour" : "Edit Tour"}
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
                value={price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Image URL</label>
              <input
                type="text"
                name="imageurl"
                value={tour.imageurl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
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
            {id === "new" ? "Create Tour" : "Update Tour"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TourDetailsForm;

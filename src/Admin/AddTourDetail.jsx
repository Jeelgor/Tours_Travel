import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddTourDetail = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [tour, setTour] = useState({
    title: "",
    location: "",
    price: "",
    SeatLeft: "",
    imageurl: ""
  });
  // new tour section
  const initialState = {
    _id: "",
    packageType: "Luxury",
    accessibility: "",
    gallery: [],
    overview: ["", "", ""],
    amenities: [""],
    aboutProperty: {
      title: "",
      subtitle: "",
      description: "",
      perks: [""],
    },
    commonAreas: [""],
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  // Handle basic text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input for gallery images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      gallery: files,
    }));
  };

  // Handle overview changes (array of 3 strings)
  const handleOverviewChange = (index, value) => {
    const newOverview = [...formData.overview];
    newOverview[index] = value;
    setFormData((prev) => ({
      ...prev,
      overview: newOverview,
    }));
  };

  // Handle array field changes (amenities, commonAreas)
  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  // Handle perks for aboutProperty
  const handlePerksChange = (index, value) => {
    const newPerks = [...formData.aboutProperty.perks];
    newPerks[index] = value;
    setFormData((prev) => ({
      ...prev,
      aboutProperty: {
        ...prev.aboutProperty,
        perks: newPerks,
      },
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };
  // Handle adding a new field
  const handleAddField = (field) => {
    if (field === "aboutProperty.perks") {
      setFormData((prev) => ({
        ...prev,
        aboutProperty: {
          ...prev.aboutProperty,
          perks: [...prev.aboutProperty.perks, ""],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    }
  };

  // Handle removing a field
  const handleRemoveField = (field, index) => {
    if (field === "aboutProperty.perks") {
      setFormData((prev) => ({
        ...prev,
        aboutProperty: {
          ...prev.aboutProperty,
          perks: prev.aboutProperty.perks.filter((_, i) => i !== index),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitFormData = new FormData();

      // Append simple text fields
      submitFormData.append("_id", formData._id);
      submitFormData.append("packageType", formData.packageType);
      submitFormData.append("accessibility", formData.accessibility);
      submitFormData.append("overview", JSON.stringify(formData.overview));
      submitFormData.append("amenities", JSON.stringify(formData.amenities));
      submitFormData.append("aboutProperty", JSON.stringify(formData.aboutProperty));
      submitFormData.append("commonAreas", JSON.stringify(formData.commonAreas));

      // Append gallery images
      formData.gallery.forEach((image) => {
        submitFormData.append("gallery", image);
      });

      await axios.post(
        `${apiUrl}/Auth/users/tour-package`,
        submitFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Tour package created successfully!");
      setFormData(initialState);
    } catch (error) {
      console.error("Error creating tour package:", error);
      toast.error(
        error.response?.data?.message || "Error creating tour package"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Create Tour Package</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Basic Information</h3>
          <div className="mb-4">
            <label className="block mb-2">Package ID</label>
            <input
              type="text"
              name="_id"
              value={formData._id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Package Type</label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Adventure">Adventure</option>
              <option value="Romantic">Romantic</option>
              <option value="Family Specials">Family Specials</option>
              <option value="Luxury">Luxury</option>
              <option value="Budget">Budget</option>
              <option value="Group Tour">Group Tour</option>
              <option value="Cruise Packages">Cruise Packages</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Accessibility</label>
            <textarea
              name="accessibility"
              value={formData.accessibility}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Gallery Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex flex-wrap gap-4">
            {formData.gallery.length > 0 &&
              formData.gallery.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                );
              })}
          </div>
        </div>

        {/* Overview */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          {formData.overview.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={item}
                onChange={(e) => handleOverviewChange(index, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Overview item ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={amenity}
                onChange={(e) =>
                  handleArrayFieldChange("amenities", index, e.target.value)
                }
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => handleRemoveField("amenities", index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("amenities")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Amenity
          </button>
        </div>

        {/* About Property */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">About Property</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.aboutProperty.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutProperty: { ...prev.aboutProperty, title: e.target.value },
                }))
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={formData.aboutProperty.subtitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutProperty: { ...prev.aboutProperty, subtitle: e.target.value },
                }))
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={formData.aboutProperty.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutProperty: { ...prev.aboutProperty, description: e.target.value },
                }))
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Perks */}
          <div className="mt-6">
            <h4 className="text-xl font-medium mb-2">Perks</h4>
            {formData.aboutProperty.perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={perk}
                  onChange={(e) => handlePerksChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a perk"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("aboutProperty.perks", index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("aboutProperty.perks")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Perk
            </button>
          </div>
        </div>

        {/* Common Areas */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Common Areas</h3>
          {formData.commonAreas.map((area, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={area}
                onChange={(e) => handleArrayFieldChange("commonAreas", index, e.target.value)}
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => handleRemoveField("commonAreas", index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("commonAreas")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Common Area
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Creating..." : "Create Tour Package"}
        </button>
      </form>
    </div>
  );
};

export default AddTourDetail;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL

const CreateTourPackage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    packageType: 'Luxury',
    accessibility: '',
    gallery: [],
    overview: ['', '', ''],
    amenities: [''],
    aboutProperty: {
      title: '',
      subtitle: '',
      description: '',
      perks: ['']
    },
    commonAreas: ['']
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      gallery: files
    }));
  };

  // Handle overview changes
  const handleOverviewChange = (index, value) => {
    const newOverview = [...formData.overview];
    newOverview[index] = value;
    setFormData(prev => ({
      ...prev,
      overview: newOverview
    }));
  };

  // Handle array field changes (amenities, commonAreas)
  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  // Updated handleAddField function
  const handleAddField = (field) => {
    if (field === 'aboutProperty.perks') {
      setFormData(prev => ({
        ...prev,
        aboutProperty: {
          ...prev.aboutProperty,
          perks: [...prev.aboutProperty.perks, '']
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], '']
      }));
    }
  };

  // Updated handleRemoveField function
  const handleRemoveField = (field, index) => {
    if (field === 'aboutProperty.perks') {
      setFormData(prev => ({
        ...prev,
        aboutProperty: {
          ...prev.aboutProperty,
          perks: prev.aboutProperty.perks.filter((_, i) => i !== index)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  // Add handler for perks
  const handlePerksChange = (index, value) => {
    const newPerks = [...formData.aboutProperty.perks];
    newPerks[index] = value;
    setFormData(prev => ({
      ...prev,
      aboutProperty: {
        ...prev.aboutProperty,
        perks: newPerks
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitFormData = new FormData();

      // Change packageId to _id to match the model
      submitFormData.append('_id', formData._id);
      submitFormData.append('packageType', formData.packageType);
      submitFormData.append('accessibility', formData.accessibility);
      submitFormData.append('overview', JSON.stringify(formData.overview));
      submitFormData.append('amenities', JSON.stringify(formData.amenities));
      submitFormData.append('aboutProperty', JSON.stringify(formData.aboutProperty));
      submitFormData.append('commonAreas', JSON.stringify(formData.commonAreas));

      // Append gallery images
      formData.gallery.forEach(image => {
        submitFormData.append('gallery', image);
      });

      const response = await axios.post(
        `${apiUrl}/Auth/users/tour-package`,
        submitFormData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Tour package created successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating tour package:', error);
      toast.error(error.response?.data?.message || 'Error creating tour package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Tour Package</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Package ID</label>
            <input
              type="text"
              name="_id"
              value={formData._id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Package Type</label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
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

          <div>
            <label className="block mb-2">Accessibility</label>
            <textarea
              name="accessibility"
              value={formData.accessibility}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block mb-2">Gallery Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Overview - Updated structure */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          {formData.overview.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={item}
                onChange={(e) => handleOverviewChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Overview item ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Amenities</h3>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={amenity}
                onChange={(e) => handleArrayFieldChange('amenities', index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveField('amenities', index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField('amenities')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Amenity
          </button>
        </div>

        {/* About Property - Added perks */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Property</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.aboutProperty.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                aboutProperty: { ...prev.aboutProperty, title: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={formData.aboutProperty.subtitle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                aboutProperty: { ...prev.aboutProperty, subtitle: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.aboutProperty.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                aboutProperty: { ...prev.aboutProperty, description: e.target.value }
              }))}
              className="w-full p-2 border rounded"
            />

            {/* Perks */}
            <div>
              <h4 className="font-medium mb-2">Perks</h4>
              {formData.aboutProperty.perks.map((perk, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={perk}
                    onChange={(e) => handlePerksChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Add a perk"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField('aboutProperty.perks', index)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField('aboutProperty.perks')}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Perk
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Tour Package'}
        </button>
      </form>
    </div>
  );
};

export default CreateTourPackage;
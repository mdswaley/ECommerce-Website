import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get pro_id

const UpdateProduct = () => {
  const { pro_id } = useParams(); // Get product ID from URL parameters
  const navigate = useNavigate(); // To navigate after form submission

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    description: "",
    availability: "IN_STOCK",
    review: "",
    policy: [],
    url: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch product data by product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${pro_id}`);
        setFormData(response.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        setError("Failed to fetch product data.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pro_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newPolicy = checked
        ? [...prevData.policy, value]
        : prevData.policy.filter((policy) => policy !== value);
      return { ...prevData, policy: newPolicy };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !formData.name ||
      !formData.sku ||
      !formData.category ||
      !formData.price ||
      !formData.description ||
      !formData.availability ||
      !formData.review ||
      formData.policy.length === 0 ||
      !formData.url
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/product/${pro_id}`, formData);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/"); // Navigate back to the product list page after success
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Update Product</h2>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-sm">Product updated successfully!</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter product name"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter product sku"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter product category"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter product price"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="IN_STOCK">IN_STOCK</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="DISCONTINUED">DISCONTINUED</option>
            </select>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Review</label>
            <select
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Policy</label>
            <div className="mt-1 space-y-2">
              {["RETURN", "REPLACE"].map((policy) => (
                <label key={policy} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={policy}
                    checked={formData.policy.includes(policy)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{policy}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter image URL"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

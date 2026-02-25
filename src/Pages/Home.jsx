import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [productstore, setproductstore] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [productname, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (search === "") fetchProducts();
  }, [page, search]);

  useEffect(() => {
    if (search !== "") handleSearch();
  }, [search]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/ser?search=${search}`
      );
      setproductstore(res.data.resz || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/get?page=${page}&limit=5`
      );
      setproductstore(res.data.items.docs || []);
      setTotalPages(res.data.items.totalPages);
      toast.success("Products loaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/products/edit/${editId}`,
          formData
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/products/create", formData);
        toast.success("Product added successfully");
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (pro) => {
    setIsEdit(true);
    setEditId(pro._id);
    setname(pro.productname);
    setdescription(pro.description);
    setprice(pro.price);
    setImage(null);
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/del/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setname("");
    setdescription("");
    setprice("");
    setImage(null);
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen text-gray-200">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="bg-gray-800 text-gray-200 placeholder-gray-400 rounded-2xl p-2 pl-4 flex-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl mt-2 sm:mt-0"
        >
          ADD
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-gray-200 p-6 rounded-2xl w-11/12 sm:w-96 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={addOrUpdateProduct} className="flex flex-col gap-3">
              <input
                className="border border-gray-700 p-2 rounded bg-gray-900 text-gray-200"
                value={productname}
                onChange={(e) => setname(e.target.value)}
                placeholder="Product name"
                required
              />
              <input
                className="border border-gray-700 p-2 rounded bg-gray-900 text-gray-200"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Description"
                required
              />
              <input
                className="border border-gray-700 p-2 rounded bg-gray-900 text-gray-200"
                type="number"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                placeholder="Price"
                required
              />
              <input
                type="file"
                className="text-gray-200"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT TABLE */}
      <div className="mt-6 grid gap-4 sm:overflow-x-auto">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-xl shadow divide-y divide-gray-700">
            <thead className="bg-linear-to-r from-blue-900 to-black text-white">
              <tr>
                <th className="w-1/5 px-6 py-4 text-center font-semibold uppercase tracking-wide border-b border-blue-700">
                  No
                </th>
                <th className="w-1/5 px-6 py-4 text-center font-semibold uppercase tracking-wide border-b border-blue-700">
                  Name
                </th>
                <th className="w-1/5 px-6 py-4 text-center font-semibold uppercase tracking-wide border-b border-blue-700">
                  Description
                </th>
                <th className="w-1/5 px-6 py-4 text-center font-semibold uppercase tracking-wide border-b border-blue-700">
                  Price
                </th>
                <th className="w-1/5 px-6 py-4 text-center font-semibold uppercase tracking-wide border-b border-blue-700">
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {productstore.length > 0 ? (
                productstore.map((pro, index) => (
                  <tr
                    key={pro._id}
                    className="text-center border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-3">{index + 1 + (page - 1) * 5}</td>
                    <td className="p-3">{pro.productname}</td>
                    <td className="p-3">{pro.description}</td>
                    <td className="p-3 text-green-400">₹{pro.price}</td>
                    <td className="p-3 flex justify-center">
                      <img
                        src={`http://localhost:5000/upload/${pro.image}`}
                        className="w-20 h-20 rounded object-cover border border-gray-700"
                        alt={pro.productname}
                      />
                    </td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => editProduct(pro)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(pro._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No product found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden flex flex-col gap-4">
          {productstore.length > 0 ? (
            productstore.map((pro, index) => (
              <div
                key={pro._id}
                className="bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-2 border border-gray-700"
              >
                <div className="flex justify-between">
                  <span className="font-bold">No:</span>
                  <span>{index + 1 + (page - 1) * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Name:</span>
                  <span>{pro.productname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Description:</span>
                  <span>{pro.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Price:</span>
                  <span className="text-green-400">₹{pro.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Image:</span>
                  <img
                    src={`http://localhost:5000/upload/${pro.image}`}
                    className="w-20 h-20 rounded object-cover border border-gray-700"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editProduct(pro)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-1 rounded flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(pro._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              No product found
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded disabled:opacity-40"
        >
          PREV
        </button>
        <span className="font-bold bg-gray-700 p-2.5 rounded-2xl">{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded disabled:opacity-40"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Home;

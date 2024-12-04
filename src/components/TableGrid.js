import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../store/formSlice";
import { toast } from "react-toastify";
import Modal from "./Modal";

const TableGrid = () => {
  const { submittedData } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); 
  const [target, setTarget] = useState({
    rowIndex: null,
    key: null,
    currentValue: "",
  });

  const openModal = (action, rowIndex, key, currentValue = "") => {
    setModalAction(action);
    setTarget({ rowIndex, key, currentValue });
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    const { rowIndex, key, currentValue } = target;
    if (currentValue.trim() === "") {
      toast.error(`${key} cannot be empty!`, { position: "top-right" });
      return;
    }

    const updatedData = { ...submittedData[rowIndex], [key]: currentValue };
    dispatch(updateData({ index: rowIndex, data: updatedData }));
    setIsModalOpen(false);
    toast.success(`${key} updated successfully!`, { position: "top-right" });
  };

  const handleDelete = () => {
    const { rowIndex, key } = target;
    const updatedData = { ...submittedData[rowIndex] };
    delete updatedData[key];
    dispatch(updateData({ index: rowIndex, data: updatedData }));
    setIsModalOpen(false);
    toast.warn(`${key} deleted successfully!`, { position: "top-right" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (value) => {
    setTarget((prev) => ({ ...prev, currentValue: value }));
  };

  return (
    <div className="mt-6 px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Submitted Data
      </h2>
      {submittedData.length === 0 ? (
        <p className="text-gray-600 text-center">No data submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-xl rounded-lg border border-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider border-b border-gray-200">
                  Label
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider border-b border-gray-200">
                  Entered Data
                </th>
                <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((row, rowIndex) =>
                Object.entries(row).map(([key, value], idx) => (
                  <tr
                    key={`${rowIndex}-${idx}`}
                    className="hover:bg-gray-100 transition-all duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                      {value}
                    </td>
                    <td className="px-6 py-4 text-center border-b border-gray-200">
                      <button
                        onClick={() => openModal("edit", rowIndex, key, value)}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openModal("delete", rowIndex, key)}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={
          modalAction === "edit"
            ? `Edit ${target.key}`
            : `Do you want to delete ${target.key}?`
        }
        inputValue={modalAction === "edit" ? target.currentValue : ""}
        onInputChange={handleInputChange}
        showInput={modalAction === "edit"}
        onCancel={handleCancel}
        onConfirm={modalAction === "edit" ? handleEdit : handleDelete}
        confirmLabel={modalAction === "edit" ? "Edit" : "Delete"}
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default TableGrid;

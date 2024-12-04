import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchFormData } from "../data/formApi";
import { useDispatch } from "react-redux";
import { addData } from "../store/formSlice";
import { toast } from "react-toastify";

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [formFields, setFormFields] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const watchFields = watch();

  useEffect(() => {
    if (formFields.length > 0) {
      const totalFields = formFields.length;
      const filledFields = formFields.filter(
        (field) => watchFields[field.name]?.toString().trim()
      ).length;
      setProgress(Math.round((filledFields / totalFields) * 100));
    }
  }, [formFields, watchFields]);

  const onSubmit = (data) => {
    dispatch(addData(data));
    reset();
    setProgress(0);
    toast.success("Form submitted successfully!", { position: "top-right" });
  };

  const handleFormChange = async (e) => {
    const formType = e.target.value;
    setSelectedForm(formType);
    const response = await fetchFormData(formType);
    setFormFields(response.fields);
    reset();
    setProgress(0);
    toast.info(`Loaded ${formType} form!`, { position: "top-right" });
  };

  const validateExpiryDate = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);
    if (selectedDate < today) {
      return "Expiry date must be greater than or equal to today";
    }
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Dynamic Form
        </h2>
        <select
          onChange={handleFormChange}
          value={selectedForm}
          className="w-full mb-4 p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Select a Form
          </option>
          <option value="UserInformation">User Information</option>
          <option value="AddressInformation">Address Information</option>
          <option value="PaymentInformation">Payment Information</option>
        </select>

        {formFields.length > 0 && (
          <div>
            <div className="h-2 bg-gray-300 rounded mb-4">
              <div
                className={`h-2 rounded ${
                  progress === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === "dropdown" ? (
                    <select
                      {...register(field.name, { required: field.required })}
                      className="w-full p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={
                        field.type === "number" ||
                        field.name === "cvv" ||
                        field.name === "cardNumber"
                          ? "text"
                          : field.type
                      }
                      {...register(field.name, {
                        required: field.required,
                        validate:
                          field.type === "number" ||
                          field.name === "cvv" ||
                          field.name === "cardNumber"
                            ? (value) =>
                                /^[0-9]+$/.test(value) ||
                                `${field.label} must be a number`
                            : field.name === "expiryDate"
                            ? validateExpiryDate
                            : undefined,
                      })}
                      className="w-full p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name].message ||
                        `${field.label} is required`}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;

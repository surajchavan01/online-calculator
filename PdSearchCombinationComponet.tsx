import { useEffect, useState } from "react";
import AsyncDropdown from "../../../components/common/AsyncDropdown";
import Swal from "sweetalert2";
import { apiCreate, apiDelete, apiGetAll } from "../api";
import Input from "../../../components/form/input/InputField";

type FormDataType = {
    id: number | null;
    Shape_id: number | null;
    Size_from: number | null;
    Size_to: number | null;
    Pcs_from: number | null;
    Pcs_to: number | null;
    Wt_from: number | null;
    wt_to: number | null;
};

const CatalogCategory = ({ isViewOnly = false }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        id: null,
        Shape_id: null,
        Size_from: null,
        Size_to: null,
        Pcs_from: null,
        Pcs_to: null,
        Wt_from: null,
        wt_to: null,
    });
    const [concepCutomers, setConcepCutomers] = useState<any[]>([]);
    const [selectedShape, setSelectedShape] = useState<any>(null);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const currentPage = 0;
    const pageSize = 100000;
    const [allData, setAllData] = useState(false);

    useEffect(() => {
        getAll();
    }, [allData]);

    // Fetch all data
    const getAll = async (search: string = "") => {
        try {
            const skip = currentPage * pageSize;
            const response = await apiGetAll(skip, pageSize, allData, search);
            setConcepCutomers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Dropdown change handler
    const handleShapeChange = (option: any) => {
        setSelectedShape(option);
        setFormData({ ...formData, Shape_id: option ? Number(option.value) : null });
    };

    // Form validation
    const validateForm = () => {
        if (!formData.Shape_id) {
            Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Shape is required.",
                timer: 4000,
            });
            return false;
        }
        return true;
    };

    // Save form data
    const handleFormSubmit = async () => {
        if (!validateForm()) return;

        try {
            const payload = { ...formData };
            const res = await apiCreate("catalogmasters/catalog-add", payload);

            if (res.status === 200 || res.status === 201) {
                getAll();
                setFormData({
                    id: null,
                    Shape_id: null,
                    Size_from: null,
                    Size_to: null,
                    Pcs_from: null,
                    Pcs_to: null,
                    Wt_from: null,
                    wt_to: null,
                });
                setSelectedShape(null);
                Swal.fire({
                    icon: "success",
                    title: "Added",
                    text: res.data.message || "Record added successfully!",
                    timer: 3000,
                });
            }
        } catch (err: any) {
            console.error("Submit error:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    err.response?.data?.detail ||
                    "The Combination Already Exists or Something went wrong.",
                timer: 4000,
            });
        }
    };

    // Delete record
    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await apiDelete("catalogmasters/catalog-delete", id);
                    getAll();
                    Swal.fire("Deleted!", "Record has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting record:", error);
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });
    };

    return (
        <div className="border rounded-md overflow-x-auto shadow-md mt-2">
            {/* Header with Toggle */}
            <div className="flex items-center gap-2 justify-between bg-gray-200 py-0.5 px-3 dark:bg-gray-800 border rounded-md">
                <span className="dark:text-gray-200 text-center p-1">
                    COMBINATION
                </span>
                <button
                    onClick={toggleCollapse}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
                >
                    {isCollapsed ? (
                        <img
                            src="/assets/icons/Down-arrow.svg"
                            alt="Down-arrow"
                            className="dark:invert w-5 h-5 mr-2"
                        />
                    ) : (
                        <img
                            src="/assets/icons/Up-arrow.svg"
                            alt="Up-arrow"
                            className="dark:invert w-5 h-5 mr-2"
                        />
                    )}
                </button>
            </div>

            {/* Table */}
            {!isCollapsed && (
                <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
                    <thead className="bg-gray-200 text-left text-gray-700">
                        <tr className=" text-center border px-3 py-2">
                            <th>Shape:-<span className="space-x-1"><label>Dia</label><input type="checkbox" id="subscribe" name="subscribe" value="yes"></input><label>Cs</label><input type="checkbox" id="subscribe" name="subscribe" value="yes"></input></span></th>
                            <th>Size From</th>
                            <th>Size To</th>
                            <th>Pcs From</th>
                            <th>Pcs To</th>
                            <th>Wt From</th>
                            <th>Wt To</th>
                            {!isViewOnly && (
                                <th className="border px-3 py-2 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Add Row — Always Visible */}
                        <tr>
                            <td className="border px-3 py-2 w-1/8">
                                <AsyncDropdown
                                    url={`/api/comman-master/cs-shape-dropdown`}
                                    onChange={handleShapeChange}
                                    selectedOption={selectedShape}
                                    placeholder="Shape"
                                    labelField="label"
                                    valueField="value"
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Size From"
                                    value={formData.Size_from || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            Size_from: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Size To"
                                    value={formData.Size_to || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            Size_to: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Pcs From"
                                    value={formData.Pcs_from || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            Pcs_from: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Pcs To"
                                    value={formData.Pcs_to || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            Pcs_to: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Wt From"
                                    value={formData.Wt_from || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            Wt_from: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            <td className="border px-3 py-2">
                                <Input
                                    type="number"
                                    placeholder="Wt To"
                                    value={formData.wt_to || ""}
                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            wt_to: e.target.value ? Number(e.target.value) : null,
                                        })
                                    }
                                />
                            </td>
                            {!isViewOnly && (
                                <td className="border px-3 py-2 text-center">
                                    <button onClick={handleFormSubmit} className="flex justify-center w-full">
                                        <img src="/assets/icons/Add_Circle.svg" alt="Add Icon" className="w-5 h-5 dark:invert" />
                                    </button>
                                </td>
                            )}
                        </tr>

                        {/* Existing Records */}
                        {concepCutomers.map((row) => (
                            <tr key={row.id}>
                                <td className="border px-3 py-2 text-center">{row.shape_name}</td>
                                <td className="border px-3 py-2 text-center">{row.size_from}</td>
                                <td className="border px-3 py-2 text-center">{row.size_to}</td>
                                <td className="border px-3 py-2 text-center">{row.pcs_from}</td>
                                <td className="border px-3 py-2 text-center">{row.pcs_to}</td>
                                <td className="border px-3 py-2 text-center">{row.wt_from}</td>
                                <td className="border px-3 py-2 text-center">{row.wt_to}</td>
                                {!isViewOnly && (
                                    <td className="border px-3 py-2 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button onClick={() => handleDelete(row.id)}>
                                                <img src="/assets/icons/Delete.svg" alt="Delete" className="w-5 h-5 dark:invert" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CatalogCategory;

import { useEffect, useState } from "react";
import AsyncDropdown from "../../../components/common/AsyncDropdown";
import Swal from "sweetalert2";
import { apiCreate, apiDelete, apiGetAll } from "../api";
import Input from "../../../components/form/input/InputField";

type FormDataType = {
    id: number | null;
    dia_type: number | null;
    dia_shape: number | null;
    dia_color: number | null;
    dia_group_size: number | null;
    dia_size: number | null;
    dia_length: number | null;
    dia_breadth: number | null;
    dia_width: number | null;
    dia_weight: number | null;
    side_dia_wt: number | null;
    cs_type: number | null;
    cs_shape: number | null;
    cd_color: number | null;
    cs_name: number | null;
    cs_size: number | null;
    cs_length: number | null;
    cs_breadth: number | null;
    cs_width: number | null;
    cs_weight: number | null;
    cs_dia_wt: number | null;
};

const BulkStyleComponent = ({ isViewOnly = false }) => {
    const [isBulkStyleCollapsed, setIsBulkStyleCollapsed] = useState(false);
    const [bulkStyleInput, setBulkStyleInput] = useState("");

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        id: null,
        dia_type: null,
        dia_shape: null,
        dia_color: null,
        dia_group_size: null,
        dia_size: null,
        dia_length: null,
        dia_breadth: null,
        dia_width: null,
        dia_weight: null,
        side_dia_wt: null,
        cs_type: null,
        cs_shape: null,
        cd_color: null,
        cs_name: null,
        cs_size: null,
        cs_length: null,
        cs_breadth: null,
        cs_width: null,
        cs_weight: null,
        cs_dia_wt: null,
    });

    const [concepCutomers, setConcepCutomers] = useState<any[]>([]);
    const [diatype, setDiaType] = useState<any>(null);
    const [diashape, setDiaShape] = useState<any>(null);
    const [diacolor, setDiaColor] = useState<any>(null);
    const [diagroup, setDiaGroup] = useState<any>(null);
    const [cstype, setCsType] = useState<any>(null);
    const [csshape, setCsShape] = useState<any>(null);
    const [cscolor, setCsColor] = useState<any>(null);
    const [csname, setCsName] = useState<any>(null);

    const toggleBulkStyleCollapse = () => setIsBulkStyleCollapsed(!isBulkStyleCollapsed);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const currentPage = 0;
    const pageSize = 100000;
    const [allData, setAllData] = useState(false);

    useEffect(() => {
        getAll();
    }, [allData]);

    const getAll = async (search: string = "") => {
        try {
            const skip = currentPage * pageSize;
            const response = await apiGetAll(skip, pageSize, allData, search);
            setConcepCutomers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // -------- Diamond handlers ----------
    const handleDiaTypeChange = (option: any) => {
        setDiaType(option);
        setFormData({ ...formData, dia_type: option ? Number(option.value) : null });
    };

    const handleDiaShapeChange = (option: any) => {
        setDiaShape(option);
        setFormData({ ...formData, dia_shape: option ? Number(option.value) : null });
    };

    const handleDiaColorChange = (option: any) => {
        setDiaColor(option);
        setFormData({ ...formData, dia_color: option ? Number(option.value) : null });
    };

    const handleDiaGroupChange = (option: any) => {
        setDiaGroup(option);
        setFormData({ ...formData, dia_group_size: option ? Number(option.value) : null });
    };

    // -------- Center Stone handlers ----------
    const handleCsTypeChange = (option: any) => {
        setCsType(option);
        setFormData({ ...formData, cs_type: option ? Number(option.value) : null });
    };

    const handleCsShapeChange = (option: any) => {
        setCsShape(option);
        setFormData({ ...formData, cs_shape: option ? Number(option.value) : null });
    };

    const handleCsColorChange = (option: any) => {
        setCsColor(option);
        setFormData({ ...formData, cd_color: option ? Number(option.value) : null });
    };

    const handleCsNameChange = (option: any) => {
        setCsName(option);
        setFormData({ ...formData, cs_name: option ? Number(option.value) : null });
    };

    const validateForm = () => {
        if (!formData.dia_type) {
            Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: "Dia Type is required.",
                timer: 4000,
            });
            return false;
        }
        return true;
    };

    const handleFormSubmit = async () => {
        if (!validateForm()) return;

        try {
            const payload = { ...formData };
            const res = await apiCreate("catalogmasters/catalog-add", payload);

            if (res.status === 200 || res.status === 201) {
                getAll();
                resetForm();
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

    const resetForm = () => {
        setFormData({
            id: null,
            dia_type: null,
            dia_shape: null,
            dia_color: null,
            dia_group_size: null,
            dia_size: null,
            dia_length: null,
            dia_breadth: null,
            dia_width: null,
            dia_weight: null,
            side_dia_wt: null,
            cs_type: null,
            cs_shape: null,
            cd_color: null,
            cs_name: null,
            cs_size: null,
            cs_length: null,
            cs_breadth: null,
            cs_width: null,
            cs_weight: null,
            cs_dia_wt: null,
        });
        setDiaType(null);
        setDiaShape(null);
        setDiaColor(null);
        setDiaGroup(null);
        setCsType(null);
        setCsShape(null);
        setCsColor(null);
        setCsName(null);
    };

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
        <>
            {/* Bulk Style */}
            <div className="mt-2 border rounded-lg overflow-x-auto shadow-md">
                <div className="flex items-center gap-2 justify-between bg-gray-200 px-3 dark:bg-gray-800 border rounded-md">
                    <span className="font-medium text-gray-900 dark:text-white">
                        BULK STYLE
                    </span>
                    <button
                        onClick={toggleBulkStyleCollapse}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        title={isBulkStyleCollapsed ? "Expand" : "Collapse"}
                    >
                        <img
                            src={
                                isBulkStyleCollapsed
                                    ? "/assets/icons/Down-arrow.svg"
                                    : "/assets/icons/Up-arrow.svg"
                            }
                            alt="Toggle"
                            className="w-5 h-5 dark:invert"
                        />
                    </button>
                </div>

                {!isBulkStyleCollapsed && (
                    <div className="p-4 bg-white dark:bg-gray-800">
                        <textarea
                            rows={2}
                            placeholder="Enter Bulk Styles here..."
                            value={bulkStyleInput}
                            onChange={(e) => setBulkStyleInput(e.target.value)}
                            className="border w-full rounded p-2 pt-5 text-center dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                )}
            </div>

            {/* Center Stone Section */}
            <div className="mt-6 border rounded-lg overflow-x-auto shadow-md">
                <div className="flex items-center gap-2 justify-between bg-gray-200 py-0.5 px-3 dark:bg-gray-800 border rounded-md">
                    <span className="font-medium text-gray-900 dark:text-white">
                        CENTER STONE
                    </span>
                    <button
                        onClick={toggleCollapse}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                        <img
                            src={
                                isCollapsed
                                    ? "/assets/icons/Down-arrow.svg"
                                    : "/assets/icons/Up-arrow.svg"
                            }
                            alt="Toggle"
                            className="dark:invert w-5 h-5"
                        />
                    </button>
                </div>

                {!isCollapsed && (
                    <div className="flex w-full">
                        {/* Left Side - Diamond */}
                        <div className="w-1/2 text-center border ml-2 my-2 p-2">
                            <div className="w-full flex">
                                <div className="w-1/2 space-y-8.5 text-left pl-10 pt-2">
                                    {[
                                        "Dia Type", "Dia Shape", "Dia Color",
                                        "Dia Group Size", "Dia Size", "Dia Length",
                                        "Dia Breadth", "Dia Width", "Dia Weight", "Size Dia Wt"
                                    ].map((label, i) => (
                                        <div key={i}><label className="dark:text-white">{label}</label></div>
                                    ))}
                                </div>

                                <div className="w-1/2 space-y-4.5">
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleDiaTypeChange}
                                        selectedOption={diatype}
                                        placeholder="Dia Type"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleDiaShapeChange}
                                        selectedOption={diashape}
                                        placeholder="Dia Shape"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleDiaColorChange}
                                        selectedOption={diacolor}
                                        placeholder="Dia Color"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleDiaGroupChange}
                                        selectedOption={diagroup}
                                        placeholder="Dia Group Size"
                                        labelField="label"
                                        valueField="value"
                                    />

                                    {[
                                        "dia_size",
                                        "dia_length",
                                        "dia_breadth",
                                        "dia_width",
                                        "dia_weight",
                                        "side_dia_wt",
                                    ].map((field, i) => (
                                        <Input
                                            key={i}
                                            type="number"
                                            placeholder="0.00"
                                            value={formData[field as keyof FormDataType] || ""}
                                            className="border w-full rounded text-center dark:border-gray-500"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    [field]: Number(e.target.value),
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Center Stone */}
                        <div className="w-1/2 text-center border mr-2 my-2 p-2">
                            <div className="w-full flex">
                                <div className="w-1/2 space-y-8.5 text-left pl-10 pt-2">
                                    {[
                                        "Cs Type", "Cs Shape", "Cs Color", "Cs Name",
                                        "Cs Size", "Cs Length", "Cs Breadth", "Cs Width",
                                        "Cs Weight", "Cs Dia Wt"
                                    ].map((label, i) => (
                                        <div key={i}><label className="dark:text-white">{label}</label></div>
                                    ))}
                                </div>

                                <div className="w-1/2 space-y-4.5">
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleCsTypeChange}
                                        selectedOption={cstype}
                                        placeholder="Cs Type"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleCsShapeChange}
                                        selectedOption={csshape}
                                        placeholder="Cs Shape"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleCsColorChange}
                                        selectedOption={cscolor}
                                        placeholder="Cs Color"
                                        labelField="label"
                                        valueField="value"
                                    />
                                    <AsyncDropdown
                                        url="/api/comman-master/master-dropdown/rep-builder-modules"
                                        onChange={handleCsNameChange}
                                        selectedOption={csname}
                                        placeholder="Cs Name"
                                        labelField="label"
                                        valueField="value"
                                    />

                                    {[
                                        "cs_size",
                                        "cs_length",
                                        "cs_breadth",
                                        "cs_width",
                                        "cs_weight",
                                        "cs_dia_wt",
                                    ].map((field, i) => (
                                        <Input
                                            key={i}
                                            type="number"
                                            placeholder="0.00"
                                            value={formData[field as keyof FormDataType] || ""}
                                            className="border w-full rounded text-center dark:border-gray-500"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    [field]: Number(e.target.value),
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BulkStyleComponent;

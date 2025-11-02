import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiDelete, apiGetAll, apiGetById, apiCreate, apiUpdate } from "../api";
import PageMeta from "../../../components/common/PageMeta";

import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AsyncDropdown from "../../../components/common/AsyncDropdown";
import PdSearchCombinationComponet from "./PdSearchCombinationComponet";
import PdSearchBulkStyleComponent from "./PdSearchBulkStyleComponent";
import YearDropdownOptions from "node_modules/react-datepicker/dist/year_dropdown_options";
import CsTypeComponent from "./CsTypeComponent";
import { setYear } from "date-fns";


{/* Collapsible Section one Varibles*/ }
interface PDSearchDataSec1 {
    id: number | null;
    Metal_Net_Wtl: number | null;
    Metal_Net_Wt2: number | null;
    Diamond_Wt1: number | null;
    Diamond_Wt2: number | null;
    No_of_Diamond1: number | null;
    No_of_Diamond2: number | null;
    Center_Stone: number | null;
    Multi_Color: number | null;
    Pointer: number | null;
    Shank_Width: number | null;
    Design_Known_as: number | null;
    DesignLBW1: number | null;
    DesignLBW2: number | null;
    DesignLBW3: number | null;
    Metal_Gross_Wt1: number | null;
    Metal_Gross_Wt2: number | null;
    Color_Stone_Wt1: number | null;
    Color_Stone_Wt2: number | null;
    No_of_Color_Stone1: number | null;
    No_of_Color_Stone2: number | null;
    Introduced_In1: string
    Introduced_In2: string
    Event: number | null;
    Year: number | null;
    Model_Process: number | null;
    Price: number | null;
    Price2: number | null;
}

interface PDSearchDataSec2 {


    //    {/* Collapsible Section two Varibles*/}
    Product_Category: number | null;
    Product_Sub_Category: number | null;
    Design_USP: number | null;
    Customer_Name: number | null;
    Metal_Tone: number | null;
    Occasion: number | null;
    Classification: number | null;
    Character_Shape: number | null;
    Special_Effect: number | null;
    Inspiration: number | null;
    Target_Audience: number | null;
    Design_Look: number | null;
    Region: number | null;
    Theme_Concept: number | null;
    Setting_Concept: number | null;
    Religion_Culture: number | null;
    Jewelry_Size: number | null;
    Catalogue: number | null;

}

interface PDSearchDataSec3 {


    Metal_Type: number | null;
    Metal_Purity: number | null;
    Metal_Color: number | null;
    Metal_Alloy_Ctg: number | null;
    Finishing_Effect: number | null;
    STN_Main_Setting: number | null;
    Dia_Type: number | null;
    Dia_Shape: number | null;
    Dia_Color: number | null;
    Dia_Group_Size: number | null;
    Dia_Size_Fr_To1: number | null;
    Dia_Size_Fr_To2: number | null;
    STN_Sub_Setting: number | null;
    CS_Type: number | null
    CS_Name: number | null;
    CS_Shape: number | null;
    CS_Color: number | null;
    CS_Size1: number | null;
    CS_Size2: number | null;
    FD_Type: number | null;
    FD_Sub_Ctg: number | null;
    FD_Metal_Puri: number | null;
    FD_Metal_Alloy_Ct: number | null;
    FD_Size1: number | null;
    FD_Size2: number | null;



}
interface DropdownOption {
    label: string;
    value: number;
}



export default function PdSearchComponent() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [event, setEvent] = useState<DropdownOption | null>(null);
    const [year, setYear] = useState<DropdownOption | null>(null);
    const [designKnownAs, setDesignKnownAs] = useState<DropdownOption | null>(null);

    const [productCategory, setProductCategory] = useState<DropdownOption | null>(null);
    const [productSubCategory, setProductSubCategory] = useState<DropdownOption | null>(null);
    const [designUSP, setDesignUSP] = useState<DropdownOption | null>(null);
    const [customerName, setCustomerName] = useState<DropdownOption | null>(null);
    const [metalTone, setMetalTone] = useState<DropdownOption | null>(null);
    const [occasion, setOccasion] = useState<DropdownOption | null>(null);
    const [classification, setClassification] = useState<DropdownOption | null>(null);
    const [characterShape, setCharacterShape] = useState<DropdownOption | null>(null);
    const [specialEffect, setSpecialEffect] = useState<DropdownOption | null>(null);
    const [inspiration, setInspiration] = useState<DropdownOption | null>(null);
    const [targetAudience, setTargetAudience] = useState<DropdownOption | null>(null);
    const [designLook, setdesignLook] = useState<DropdownOption | null>(null);
    const [region, setRegion] = useState<DropdownOption | null>(null);
    const [themeConcept, setThemeConcept] = useState<DropdownOption | null>(null);
    const [settingConcept, setSettingConcept] = useState<DropdownOption | null>(null);
    const [religionCulture, setReligionCulture] = useState<DropdownOption | null>(null);
    const [jewelrySize, setJewelrySize] = useState<DropdownOption | null>(null);
    const [catalogue, setCatalogue] = useState<DropdownOption | null>(null);

    const [metalType, setMetalType] = useState<DropdownOption | null>(null);
    const [metalPurity, setMetalPurity] = useState<DropdownOption | null>(null);
    const [metalColor, setMetalColor] = useState<DropdownOption | null>(null);
    const [metalAlloy, setMetalAlloy] = useState<DropdownOption | null>(null);
    const [finishingEffect, setFinishingEffect] = useState<DropdownOption | null>(null);
    const [sTNMain, setSTNMain] = useState<DropdownOption | null>(null);
    const [sTNSub, setSTNSub] = useState<DropdownOption | null>(null);
    const [diaType, setDiaType] = useState<DropdownOption | null>(null);
    const [diaShape, setDiaShape] = useState<DropdownOption | null>(null);
    const [diaColor, setDiaColor] = useState<DropdownOption | null>(null);
    const [diaGroupSize, setDiaGroupSize] = useState<DropdownOption | null>(null);
    const [diaSize1, setDiaSize1] = useState<DropdownOption | null>(null);
    const [diaSize2, setDiaSize2] = useState<DropdownOption | null>(null);
    const [csType, setcsType] = useState<DropdownOption | null>(null);
    const [csName, setcsName] = useState<DropdownOption | null>(null);
    const [csShape, setcsShape] = useState<DropdownOption | null>(null);
    const [csColor, setcsColor] = useState<DropdownOption | null>(null);
    const [csSize1, setcsSize1] = useState<DropdownOption | null>(null);
    const [csSize2, setcsSize2] = useState<DropdownOption | null>(null);
    const [fdType, setfdType] = useState<DropdownOption | null>(null);
    const [fdSubCtg, setfdSubCtg] = useState<DropdownOption | null>(null);
    const [fdMetalPuri, setfdMatalPuri] = useState<DropdownOption | null>(null);
    const [fdMtAlloyCt, setfdMtAlloyCt] = useState<DropdownOption | null>(null);
    const [fdSize1, setfdSize1] = useState<DropdownOption | null>(null);
    const [fdSize2, setfdSize2] = useState<DropdownOption | null>(null);

    const [apiDatas1, setApiDatas1] = useState<PDSearchDataSec1[]>([]);
    const [apiDatas2, setApiDatas2] = useState<PDSearchDataSec2[]>([]);
    const [apiDatas3, setApiDatas3] = useState<PDSearchDataSec3[]>([]);
    const [errors, setErrors] = useState<{ code?: string; desc?: string; sortindex?: string; isactive?: string; }>({});

    const [SearchDataSec1, setSearchDataSec1] = useState<PDSearchDataSec1>({
        id: null,
        Metal_Net_Wtl: null,
        Metal_Net_Wt2: null,
        Diamond_Wt1: null,
        Diamond_Wt2: null,
        No_of_Diamond1: null,
        No_of_Diamond2: null,
        Center_Stone: null,
        Multi_Color: null,
        Pointer: null,
        Shank_Width: null,
        Design_Known_as: null,
        DesignLBW1: null,
        DesignLBW2: null,
        DesignLBW3: null,
        Metal_Gross_Wt1: null,
        Metal_Gross_Wt2: null,
        Color_Stone_Wt1: null,
        Color_Stone_Wt2: null,
        No_of_Color_Stone1: null,
        No_of_Color_Stone2: null,
        Introduced_In1: "",
        Introduced_In2: "",
        Event: null,
        Year: null,
        Model_Process: null,
        Price: null,
        Price2: null,
    });

    const [SearchDataSec2, setSearchDataSec2] = useState<PDSearchDataSec2>({

        Product_Category: null,
        Product_Sub_Category: null,
        Design_USP: null,
        Customer_Name: null,
        Metal_Tone: null,
        Occasion: null,
        Classification: null,
        Character_Shape: null,
        Special_Effect: null,
        Inspiration: null,
        Target_Audience: null,
        Design_Look: null,
        Region: null,
        Theme_Concept: null,
        Setting_Concept: null,
        Religion_Culture: null,
        Jewelry_Size: null,
        Catalogue: null,

    });

    const [SearchDataSec3, setSearchDataSec3] = useState<PDSearchDataSec3>({

        Metal_Type: null,
        Metal_Purity: null,
        Metal_Color: null,
        Metal_Alloy_Ctg: null,
        Finishing_Effect: null,
        STN_Main_Setting: null,
        Dia_Type: null,
        Dia_Shape: null,
        Dia_Color: null,
        Dia_Group_Size: null,
        Dia_Size_Fr_To1: null,
        Dia_Size_Fr_To2: null,
        STN_Sub_Setting: null,
        CS_Type: null,
        CS_Name: null,
        CS_Shape: null,
        CS_Color: null,
        CS_Size1: null,
        CS_Size2: null,
        FD_Type: null,
        FD_Sub_Ctg: null,
        FD_Metal_Puri: null,
        FD_Metal_Alloy_Ct: null,
        FD_Size1: null,
        FD_Size2: null,

    });

    const [allData, setAllData] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const [isCollapsedDesAtt, setIsCollapsedDesAtt] = useState(false);
    const toggleCollapseDesAtt = () => setIsCollapsedDesAtt(!isCollapsedDesAtt);

    const [isCollapsedBomAtt, setIsCollapsedBomAtt] = useState(false);
    const toggleCollapseBomAtt = () => setIsCollapsedBomAtt(!isCollapsedBomAtt);

    const navigationUrl = "/pd-search-component";
    const apiEntity = "pd-search-component";
    const isAdding = location.pathname === `${navigationUrl}/add`;
    // const isEditing = location.pathname.startsWith(`${navigationUrl}/edit/`);
    const isViewOnly = location.pathname.startsWith(`${navigationUrl}/view/`);
    const currentPage = 0;
    const pageSize = 100000;

    useEffect(() => {
        if (isAdding) {
            setSearchDataSec1({
                id: null,
                Metal_Net_Wtl: null,
                Metal_Net_Wt2: null,
                Diamond_Wt1: null,
                Diamond_Wt2: null,
                No_of_Diamond1: null,
                No_of_Diamond2: null,
                Center_Stone: null,
                Multi_Color: null,
                Pointer: null,
                Shank_Width: null,
                Design_Known_as: null,
                DesignLBW1: null,
                DesignLBW2: null,
                DesignLBW3: null,
                Metal_Gross_Wt1: null,
                Metal_Gross_Wt2: null,
                Color_Stone_Wt1: null,
                Color_Stone_Wt2: null,
                No_of_Color_Stone1: null,
                No_of_Color_Stone2: null,
                Introduced_In1: "",
                Introduced_In2: "",
                Event: null,
                Year: null,
                Model_Process: null,
                Price: null,
                Price2: null,

            });


            setSearchDataSec2({

                Product_Category: null,
                Product_Sub_Category: null,
                Design_USP: null,
                Customer_Name: null,
                Metal_Tone: null,
                Occasion: null,
                Classification: null,
                Character_Shape: null,
                Special_Effect: null,
                Inspiration: null,
                Target_Audience: null,
                Design_Look: null,
                Region: null,
                Theme_Concept: null,
                Setting_Concept: null,
                Religion_Culture: null,
                Jewelry_Size: null,
                Catalogue: null,

            });


            setSearchDataSec3({


                Metal_Type: null,
                Metal_Purity: null,
                Metal_Color: null,
                Metal_Alloy_Ctg: null,
                Finishing_Effect: null,
                STN_Main_Setting: null,
                Dia_Type: null,
                Dia_Shape: null,
                Dia_Color: null,
                Dia_Group_Size: null,
                Dia_Size_Fr_To1: null,
                Dia_Size_Fr_To2: null,
                STN_Sub_Setting: null,
                CS_Type: null,
                CS_Name: null,
                CS_Shape: null,
                CS_Color: null,
                CS_Size1: null,
                CS_Size2: null,
                FD_Type: null,
                FD_Sub_Ctg: null,
                FD_Metal_Puri: null,
                FD_Metal_Alloy_Ct: null,
                FD_Size1: null,
                FD_Size2: null,
            });
            setErrors({});
        }
    }, [isAdding]);

    // Transaction Type Searchable Dropdown Function #PDSearchDataSec1
    const handleEventSearch = (option: any) => {
        console.log('option', option);

        setDesignKnownAs(option);
        setSearchDataSec1((prev) => ({
            ...prev,
            Design_Known_As: option ? Number(option.value) : null,
        }));
    };

    const handleYearSearch = (option: any) => {
        console.log('option', option);

        setDesignKnownAs(option);
        setSearchDataSec1((prev) => ({
            ...prev,
            Design_Known_As: option ? Number(option.value) : null,
        }));
    };

    const handleDesignKnownAsSearch = (option: any) => {
        console.log('option', option);

        setDesignKnownAs(option);
        setSearchDataSec1((prev) => ({
            ...prev,
            Design_Known_As: option ? Number(option.value) : null,
        }));
    };

    // Transaction Type Searchable Dropdown Function #PDSearchDataSec2

    const handleProductCategorySearch = (option: any) => {
        console.log('option', option);

        setProductCategory(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Product_Category: option ? Number(option.value) : null,
        }));
    };
    const handleProductSubCategorySearch = (option: any) => {
        console.log('option', option);

        setProductSubCategory(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Product_Sub_Category: option ? Number(option.value) : null,
        }));
    };
    const handleDesignUSPSearch = (option: any) => {
        console.log('option', option);

        setDesignUSP(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Design_USP: option ? Number(option.value) : null,
        }));
    };
    const handleCustomerNameSearch = (option: any) => {
        console.log('option', option);

        setCustomerName(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Customer_Name: option ? Number(option.value) : null,
        }));
    };
    const handleMetolToneSearch = (option: any) => {
        console.log('option', option);

        setMetalTone(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Metal_Tone: option ? Number(option.value) : null,
        }));
    };
    const handleOccasionSearch = (option: any) => {
        console.log('option', option);

        setOccasion(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Occasion: option ? Number(option.value) : null,
        }));
    };

    const handleClassificationSearch = (option: any) => {
        console.log('option', option);

        setClassification(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Classification: option ? Number(option.value) : null,
        }));
    };
    const handleCharacterShapeSearch = (option: any) => {
        console.log('option', option);

        setCharacterShape(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Character_Shape: option ? Number(option.value) : null,
        }));
    };
    const handleSpecialEffectSearch = (option: any) => {
        console.log('option', option);

        setSpecialEffect(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Special_Effect: option ? Number(option.value) : null,
        }));
    };
    const handleInspirationSearch = (option: any) => {
        console.log('option', option);

        setInspiration(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Inspiration: option ? Number(option.value) : null,
        }));
    };
    const handleTargetAudienceSearch = (option: any) => {
        console.log('option', option);

        setTargetAudience(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Target_Audience: option ? Number(option.value) : null,
        }));
    };
    const handleDesignLookSearch = (option: any) => {
        console.log('option', option);

        setdesignLook(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Design_Look: option ? Number(option.value) : null,
        }));
    };
    const handleRegionSearch = (option: any) => {
        console.log('option', option);

        setRegion(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Region: option ? Number(option.value) : null,
        }));
    };
    const handleThemeConceptSearch = (option: any) => {
        console.log('option', option);

        setThemeConcept(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Theme_Concept: option ? Number(option.value) : null,
        }));
    };
    const handleSettingConceptSearch = (option: any) => {
        console.log('option', option);

        setSettingConcept(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Setting_Concept: option ? Number(option.value) : null,
        }));
    };
    const handleReligionCultureSearch = (option: any) => {
        console.log('option', option);

        setReligionCulture(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Religion_Culture: option ? Number(option.value) : null,
        }));
    };
    const handleJewelrySizeSearch = (option: any) => {
        console.log('option', option);

        setJewelrySize(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Jewelry_Size: option ? Number(option.value) : null,
        }));
    };
    const handleCatalogueSearch = (option: any) => {
        console.log('option', option);

        setCatalogue(option);
        setSearchDataSec2((prev) => ({
            ...prev,
            Catalogue: option ? Number(option.value) : null,
        }));
    };

    // Transaction Type Searchable Dropdown Function #PDSearchDataSec3
    const handleMetalTypeSearch = (option: any) => {
        console.log('option', option);

        setMetalType(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Metal_Type: option ? Number(option.value) : null,
        }));
    };
    const handleMetalPuritySearch = (option: any) => {
        console.log('option', option);

        setMetalPurity(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Metal_Purity: option ? Number(option.value) : null,
        }));
    };
    const handleMetalColorSearch = (option: any) => {
        console.log('option', option);

        setMetalColor(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Metal_Color: option ? Number(option.value) : null,
        }));
    };
    const handleMetalAlloySearch = (option: any) => {
        console.log('option', option);

        setMetalAlloy(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Metal_Alloy_Ctg: option ? Number(option.value) : null,
        }));
    };
    const handleFinishingEffectSearch = (option: any) => {
        console.log('option', option);

        setFinishingEffect(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Finishing_Effect: option ? Number(option.value) : null,
        }));
    };
    const handleSTNMainSettingSearch = (option: any) => {
        console.log('option', option);

        setSTNMain(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            STN_Main_Setting: option ? Number(option.value) : null,
        }));
    };
    const handleSTNSubSettingSearch = (option: any) => {
        console.log('option', option);

        setSTNSub(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            STN_Sub_Setting: option ? Number(option.value) : null,
        }));
    };
    const handleDiaTypeSearch = (option: any) => {
        console.log('option', option);

        setDiaType(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Type: option ? Number(option.value) : null,
        }));
    };
    const handleDiaShapeSearch = (option: any) => {
        console.log('option', option);

        setDiaShape(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Shape: option ? Number(option.value) : null,
        }));
    };
    const handleDiaColorSearch = (option: any) => {
        console.log('option', option);

        setDiaColor(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Color: option ? Number(option.value) : null,
        }));
    };
    const handleDiaGroupSizeSearch = (option: any) => {
        console.log('option', option);

        setDiaGroupSize(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Group_Size: option ? Number(option.value) : null,
        }));
    };
    const handleDiaSize1Search = (option: any) => {
        console.log('option', option);

        setDiaSize1(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Size_Fr_To1: option ? Number(option.value) : null,
        }));
    };
    const handleDiaSize2Search = (option: any) => {
        console.log('option', option);

        setDiaSize2(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            Dia_Size_Fr_To2: option ? Number(option.value) : null,
        }));
    };
    const handleCSTypeSearch = (option: any) => {
        console.log('option', option);

        setcsType(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Type: option ? Number(option.value) : null,
        }));
    };
    const handleCSNameSearch = (option: any) => {
        console.log('option', option);

        setcsName(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Name: option ? Number(option.value) : null,
        }));
    };
    const handleCSShapeSearch = (option: any) => {
        console.log('option', option);

        setcsShape(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Shape: option ? Number(option.value) : null,
        }));
    };
    const handleCSColorSearch = (option: any) => {
        console.log('option', option);

        setcsColor(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Color: option ? Number(option.value) : null,
        }));
    };
    const handleCSSize1Search = (option: any) => {
        console.log('option', option);

        setcsSize1(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Size1: option ? Number(option.value) : null,
        }));
    };
    const handleCSSize2Search = (option: any) => {
        console.log('option', option);

        setcsSize2(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            CS_Size2: option ? Number(option.value) : null,
        }));
    };
    const handleFDTypeSearch = (option: any) => {
        console.log('option', option);

        setfdType(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Type: option ? Number(option.value) : null,
        }));
    };
    const handleFDSubCtgSearch = (option: any) => {
        console.log('option', option);

        setfdSubCtg(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Sub_Ctg: option ? Number(option.value) : null,
        }));
    };
    const handleFDMetalPuriSearch = (option: any) => {
        console.log('option', option);

        setfdMatalPuri(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Metal_Puri: option ? Number(option.value) : null,
        }));
    };
    const handleFDMetalAlloyCtSearch = (option: any) => {
        console.log('option', option);

        setfdMtAlloyCt(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Metal_Alloy_Ct: option ? Number(option.value) : null,
        }));
    };
    const handleFDSize1Search = (option: any) => {
        console.log('option', option);

        setfdSize1(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Size1: option ? Number(option.value) : null,
        }));
    };
    const handleFDSize2Search = (option: any) => {
        console.log('option', option);

        setfdSize2(option);
        setSearchDataSec3((prev) => ({
            ...prev,
            FD_Size2: option ? Number(option.value) : null,
        }));
    };



    // useEffect(() => {
    //     // if ((isEditing || isViewOnly) && id) {
    //     //     const fetchData = async () => {
    //     //         try {
    //     //             const response = await apiGetById(apiEntity, Number(id));
    //     //             setSearchDataSec1(response.data);
    //     //         } catch (error) {
    //     //             console.error("Error fetching Pd Search:", error);
    //     //         }
    //     //     };
    //     //     fetchData();
    //     // }
    // }, [id, isEditing, isViewOnly]);

    const getAll = async (search: string = "") => {
        try {
            const skip = currentPage * pageSize;
            const response = await apiGetAll(apiEntity, skip, pageSize, allData, search);
            setApiDatas1(response.data.data);
            setApiDatas2(response.data.data);
            setApiDatas3(response.data.data);
        } catch (error) {
            console.error("Error fetching Pd Search:", error);
        }
    };

    // const handleFormSubmit = async () => {
    //     if (!validateForm()) return;
    //     try {
    //         let response;
    //         if (SearchDataSec1.id) {
    //             response = await apiUpdate(apiEntity, SearchDataSec1.id, SearchDataSec1);
    //         } else {
    //             response = await apiCreate(apiEntity, SearchDataSec1);
    //         }
    //         if (response.status === 200 || response.status === 201) {
    //             getAll();
    //             Swal.fire("Success", response.data.message, "success");
    //             navigate(navigationUrl);
    //         }
    //     } catch (error: any) {
    //         if (axios.isAxiosError(error) && error.response) {
    //             Swal.fire("Error", error.response.data.detail || "Something went wrong!", "error");
    //         }
    //     }
    // };


    const handleClear = () => {
        setSearchDataSec1({
            id: null,
            Metal_Net_Wtl: null,
            Metal_Net_Wt2: null,
            Diamond_Wt1: null,
            Diamond_Wt2: null,
            No_of_Diamond1: null,
            No_of_Diamond2: null,
            Center_Stone: null,
            Multi_Color: null,
            Pointer: null,
            Shank_Width: null,
            Design_Known_as: null,
            DesignLBW1: null,
            DesignLBW2: null,
            DesignLBW3: null,
            Metal_Gross_Wt1: null,
            Metal_Gross_Wt2: null,
            Color_Stone_Wt1: null,
            Color_Stone_Wt2: null,
            No_of_Color_Stone1: null,
            No_of_Color_Stone2: null,
            Introduced_In1: "",
            Introduced_In2: "",
            Event: null,
            Year: null,
            Model_Process: null,
            Price: null,
            Price2: null,
        });



        setSearchDataSec2({
            Product_Category: null,
            Product_Sub_Category: null,
            Design_USP: null,
            Customer_Name: null,
            Metal_Tone: null,
            Occasion: null,
            Classification: null,
            Character_Shape: null,
            Special_Effect: null,
            Inspiration: null,
            Target_Audience: null,
            Design_Look: null,
            Region: null,
            Theme_Concept: null,
            Setting_Concept: null,
            Religion_Culture: null,
            Jewelry_Size: null,
            Catalogue: null,
        });




        setSearchDataSec3({
            Metal_Type: null,
            Metal_Purity: null,
            Metal_Color: null,
            Metal_Alloy_Ctg: null,
            Finishing_Effect: null,
            STN_Main_Setting: null,
            Dia_Type: null,
            Dia_Shape: null,
            Dia_Color: null,
            Dia_Group_Size: null,
            Dia_Size_Fr_To1: null,
            Dia_Size_Fr_To2: null,
            STN_Sub_Setting: null,
            CS_Type: null,
            CS_Name: null,
            CS_Shape: null,
            CS_Color: null,
            CS_Size1: null,
            CS_Size2: null,
            FD_Type: null,
            FD_Sub_Ctg: null,
            FD_Metal_Puri: null,
            FD_Metal_Alloy_Ct: null,
            FD_Size1: null,
            FD_Size2: null,
        });

        setEvent(null);
        setYear(null);
        setDesignKnownAs(null);

        setProductCategory(null);
        setProductSubCategory(null);
        setDesignUSP(null);
        setCustomerName(null);
        setMetalTone(null);
        setOccasion(null);
        setClassification(null);
        setCharacterShape(null);
        setSpecialEffect(null);
        setInspiration(null);
        setTargetAudience(null);
        setdesignLook(null);
        setRegion(null);
        setThemeConcept(null);
        setSettingConcept(null);
        setReligionCulture(null);
        setJewelrySize(null);
        setCatalogue(null);

        setMetalType(null);
        setMetalPurity(null);
        setMetalColor(null);
        setMetalAlloy(null);
        setFinishingEffect(null);
        setSTNMain(null);
        setSTNSub(null);
        setDiaType(null);
        setDiaShape(null);
        setDiaColor(null);
        setDiaGroupSize(null);
        setDiaSize1(null);
        setDiaSize2(null);
        setcsType(null);
        setcsName(null);
        setcsShape(null);
        setcsSize1(null);
        setcsSize2(null);
        setfdType(null);
        setfdSubCtg(null);
        setfdMatalPuri(null);
        setfdMtAlloyCt(null);
        setfdSize1(null);
        setfdSize2(null);

        setErrors({});
    };


    // const validateForm = () => {
    //     let formErrors: any = {};
    //     if (!SearchDataSec1.Metal.trim()) formErrors.Metal = "Required.";
    //     if (!SearchDataSec1.desc.trim()) formErrors.desc = "Required.";
    //     if (SearchDataSec1.sortindex === null) formErrors.sortindex = "Required.";
    //     if (SearchDataSec1.isactive === null) formErrors.isactive = "Required.";
    //     setErrors(formErrors);
    //     return Object.keys(formErrors).length === 0;
    // };

    const handleShow = async () => {
        console.log("SearchDataSec1:", SearchDataSec1);
        const response = await apiCreate("model-search", SearchDataSec1)
        console.log("response :", response);
    }

    return (
        <>
            <div>
                <PageMeta title="Pd Search" description="Pd Search" />
                <div className="p-1 space-y-2 text-sm">
                    {/* Header */}
                    <div className="flex justify-between border bg-gray-300">
                        <div className="flex gap-3">
                            <div className="underline underline-offset-4 decoration-2 text-xl dark:text-white text-center pl-2 pt-1">
                                Selection
                            </div>
                            <div className="underline underline-offset-4 decoration-2 text-xl text-blue-400 text-center pt-1">
                                Output Grid
                            </div>
                        </div>
                        <div className="text-yellow-600 text-xl  p-2">Model Search</div>
                    </div>

                    <div className="border h-[79vh] overflow-y-auto p-1">
                        {/* Collapsible Section one RANGE / SINGLE ATTRIBUTES*/}
                        <div className="bg-gray-200 py-1 px-3 dark:bg-gray-800 border rounded-md">
                            <div className="flex items-center justify-between">
                                <span className="dark:text-gray-200 text-center">RANGE / SINGLE ATTRIBUTES</span>
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

                            {!isCollapsed && (
                                <div className="mt-2">
                                    {/* Begin your original form layout */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-1">
                                        {/* 1st child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-2 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Metal Net Wt.</div>

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Metal_Net_Wtl || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Metal_Net_Wtl: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Metal_Net_Wt2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Metal_Net_Wt2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Diamond Wt.</div>
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Diamond_Wt1 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Diamond_Wt1: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Diamond_Wt2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Diamond_Wt2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">No of Diamond</div>
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.No_of_Diamond1 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            No_of_Diamond1: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.No_of_Diamond2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            No_of_Diamond2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Price $</div>

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Price || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Price: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />

                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Price2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Price2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>


                                            <div className="flex w-full gap-1">
                                                <div className="w-2/3 border-b dark:border-gray-500">Multi Color</div>
                                                <div className="w-full ">
                                                    <select
                                                        value={SearchDataSec1.Multi_Color ?? ""}
                                                        onChange={(e) => setSearchDataSec1({ ...SearchDataSec1, Multi_Color: e.target.value === "" ? null : Number(e.target.value) })}
                                                        className="border w-full h-8 rounded dark:border-gray-500 dark:text-white dark:bg-gray-800"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>
                                                </div>
                                                <div className="w-full flex m-0.5">
                                                    <label className="w-1/2 flex items-center border-b  dark:border-gray-500">
                                                        Shank Width</label>
                                                    <input
                                                        type="number"
                                                        value={SearchDataSec1.Shank_Width || ""}
                                                        onChange={(e) =>
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                Shank_Width: Number(e.target.value) || null,
                                                            })
                                                        }
                                                        className="w-full p-0.5 border-gray-300 border rounded-sm text-sm dark:border-gray-500  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-center"
                                                        placeholder="Shank Width"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b dark:border-gray-500">Design Known As</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/design-known-as-dropdown`}
                                                    key={`deskas-${SearchDataSec1.Design_Known_as}`}
                                                    onChange={handleDesignKnownAsSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={designKnownAs ? designKnownAs : null}
                                                    defaultId={SearchDataSec1.Design_Known_as}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left  dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>

                                            <div className="flex w-full">
                                                <div className="w-1/3 border-b dark:border-gray-500 h-8">Design L/B/W</div>
                                                <div className="flex w-full">
                                                    <input
                                                        type="number"
                                                        value={SearchDataSec1.DesignLBW1 || ""}
                                                        onChange={(e) =>
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                DesignLBW1: Number(e.target.value) || null,
                                                            })
                                                        }
                                                        className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
                                                        placeholder="Length"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={SearchDataSec1.DesignLBW2 || ""}
                                                        onChange={(e) =>
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                DesignLBW2: Number(e.target.value) || null,
                                                            })
                                                        }
                                                        className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        placeholder="0.00"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={SearchDataSec1.DesignLBW3 || ""}
                                                        onChange={(e) =>
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                DesignLBW3: Number(e.target.value) || null,
                                                            })
                                                        }
                                                        className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full gap-2 dark:border-gray-500">
                                                <div className="w-2/3 border-b dark:border-gray-500">Center Stone</div>
                                                <div className="w-full">
                                                    <select
                                                        value={SearchDataSec1.Center_Stone ?? ""}
                                                        onChange={(e) => setSearchDataSec1({ ...SearchDataSec1, Center_Stone: e.target.value === "" ? null : Number(e.target.value) })}
                                                        className="border w-full h-8 rounded dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>

                                                </div>
                                                <div className="w-full flex m-0.5">
                                                    <label className="w-1/2 flex items-center border-b dark:border-gray-500">Pointer Y/N
                                                    </label>
                                                    <select
                                                        value={SearchDataSec1.Pointer ?? ""}
                                                        onChange={(e) => setSearchDataSec1({ ...SearchDataSec1, Pointer: e.target.value === "" ? null : Number(e.target.value) })}
                                                        className="border w-full h-8 rounded dark:border-gray-500 dark:text-white dark:bg-gray-800"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2nd child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-4 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Metal Gross Wt.</div>
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Metal_Gross_Wt1 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Metal_Gross_Wt1: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Metal_Gross_Wt2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Metal_Gross_Wt2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border w-full rounded text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Color Stone Wt.</div>
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Color_Stone_Wt1 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Color_Stone_Wt1: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.Color_Stone_Wt2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            Color_Stone_Wt2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">No of Color Stone</div>
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.No_of_Color_Stone1 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            No_of_Color_Stone1: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                                <input
                                                    type="number"
                                                    value={SearchDataSec1.No_of_Color_Stone2 || ""}
                                                    onChange={(e) =>
                                                        setSearchDataSec1({
                                                            ...SearchDataSec1,
                                                            No_of_Color_Stone2: Number(e.target.value) || null,
                                                        })
                                                    }
                                                    className="border rounded w-full text-center dark:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-2/3 border-b dark:border-gray-500 h-8">Introduced In</div>
                                                <div className="w-full">
                                                    <Calendar
                                                        showButtonBar
                                                        value={SearchDataSec1.Introduced_In1 ? new Date(SearchDataSec1.Introduced_In1) : null}
                                                        onChange={(e) => {
                                                            const date = e.value as Date | null;
                                                            const formattedDate = date
                                                                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                                                                : '';
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                Introduced_In1: formattedDate,
                                                            });
                                                        }}
                                                        dateFormat="dd-M-yy"
                                                        showIcon
                                                        placeholder="DD-MM-YYYY"
                                                        className="w-full h-8 dark:gray-500 border-rounded-md"
                                                        disabled={isViewOnly}
                                                    />

                                                </div>
                                                <div className="w-full">
                                                    <Calendar
                                                        showButtonBar
                                                        value={SearchDataSec1.Introduced_In2 ? new Date(SearchDataSec1.Introduced_In2) : null}
                                                        onChange={(e) => {
                                                            const date = e.value as Date | null;
                                                            const formattedDate = date
                                                                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                                                                : '';
                                                            setSearchDataSec1({
                                                                ...SearchDataSec1,
                                                                Introduced_In2: formattedDate,
                                                            });
                                                        }}
                                                        dateFormat="dd-M-yy"
                                                        showIcon
                                                        placeholder="DD-MM-YYYY"
                                                        className="w-full h-8 dark:gray-500 border-rounded-md"
                                                        disabled={isViewOnly}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b dark:border-gray-500 h-8">Event/Year</div>
                                                <div className="w-full flex gap-x-2">
                                                    <div className="w-1/2">
                                                        <AsyncDropdown
                                                            url={`/api/comman-master/event-dropdown`}
                                                            key={`cssz1-${SearchDataSec1.Event}`}
                                                            onChange={handleEventSearch}
                                                            placeholder=""
                                                            labelField="label"
                                                            valueField="value"
                                                            selectedOption={event ? event : null}
                                                            defaultId={SearchDataSec1.Event}
                                                            disabled={isViewOnly}
                                                            className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <AsyncDropdown
                                                            url={`/api/comman-master/year-dropdown`}
                                                            key={`cssz2-${SearchDataSec1.Year}`}
                                                            onChange={handleYearSearch}
                                                            placeholder=""
                                                            labelField="label"
                                                            valueField="value"
                                                            selectedOption={year ? year : null}
                                                            defaultId={SearchDataSec1.Year}
                                                            disabled={isViewOnly}
                                                            className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b dark:border-gray-500">Model Process</div>
                                                <select
                                                    value={SearchDataSec1.Model_Process ?? ""}
                                                    onChange={(e) => setSearchDataSec1({ ...SearchDataSec1, Model_Process: e.target.value === "" ? null : Number(e.target.value) })}
                                                    className="border w-full rounded h-8 text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End original form layout */}
                                </div>
                            )}
                        </div>


                        {/* Collapsible Section two DESIGN ATTRIBUTES*/}
                        <div className="bg-gray-200 py-1 px-3 dark:bg-gray-800 border rounded-md mt-2">
                            <div className="flex items-center justify-between">
                                <span className="dark:text-gray-200 text-center">DESIGN ATTRIBUTES</span>
                                <button
                                    onClick={toggleCollapseDesAtt}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
                                >
                                    {isCollapsedDesAtt ? (
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

                            {!isCollapsedDesAtt && (
                                <div className="mt-2">
                                    {/* Begin your original form layout */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-1">
                                        {/* 1st child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-2 dark:bg-gray-800 dark:text-gray-200">
                                            {/* Material Type Searchable dropdown */}
                                            <div className="flex w-full">
                                                <div className="w-1/3 border-b">Product Category</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/product-category-dropdown`}
                                                    key={`pctgctg-${SearchDataSec2.Product_Category}`}
                                                    onChange={handleProductCategorySearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={productCategory ? productCategory : null}
                                                    defaultId={SearchDataSec2.Product_Category}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />

                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Product Sub Category</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/product-sub-category-dropdown`}
                                                    key={`pctgsubctg-${SearchDataSec2.Product_Sub_Category}`}
                                                    onChange={handleProductSubCategorySearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={productSubCategory ? productSubCategory : null}
                                                    defaultId={SearchDataSec2.Product_Sub_Category}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Design USP</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/design-usp-dropdown`}
                                                    key={`desusp-${SearchDataSec2.Design_USP}`}
                                                    onChange={handleDesignUSPSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={designUSP ? designUSP : null}
                                                    defaultId={SearchDataSec2.Design_USP}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Customer Name</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/customer-dropdown`}
                                                    key={`custname-${SearchDataSec2.Customer_Name}`}
                                                    onChange={handleCustomerNameSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={customerName ? customerName : null}
                                                    defaultId={SearchDataSec2.Customer_Name}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Metal Tone</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/metal-tone-dropdown`}
                                                    key={`mettone-${SearchDataSec2.Metal_Tone}`}
                                                    onChange={handleMetolToneSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={metalTone ? metalTone : null}
                                                    defaultId={SearchDataSec2.Metal_Tone}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>


                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Occasion</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/occasion-dropdown`}
                                                    key={`occ-${SearchDataSec2.Occasion}`}
                                                    onChange={handleOccasionSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={occasion ? occasion : null}
                                                    defaultId={SearchDataSec2.Occasion}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Classification</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/classification-dropdown`}
                                                    key={`classf-${SearchDataSec2.Classification}`}
                                                    onChange={handleClassificationSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={classification ? classification : null}
                                                    defaultId={SearchDataSec2.Classification}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Character/Shape</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/character-hape-dropdown`}
                                                    key={`charS-${SearchDataSec2.Character_Shape}`}
                                                    onChange={handleCharacterShapeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={characterShape ? characterShape : null}
                                                    defaultId={SearchDataSec2.Character_Shape}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Special Effect</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/master-dropdown`}
                                                    key={`speceff-${SearchDataSec2.Special_Effect}`}
                                                    onChange={handleSpecialEffectSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={specialEffect ? specialEffect : null}
                                                    defaultId={SearchDataSec2.Special_Effect}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                        </div>


                                        {/* 2nd child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-2 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Inspiration</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/inspiration-dropdown`}
                                                    key={`insp-${SearchDataSec2.Inspiration}`}
                                                    onChange={handleInspirationSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={inspiration ? inspiration : null}
                                                    defaultId={SearchDataSec2.Inspiration}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Target Audience</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/trg-adnc-dropdown`}
                                                    key={`trgaud-${SearchDataSec2.Target_Audience}`}
                                                    onChange={handleTargetAudienceSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={targetAudience ? targetAudience : null}
                                                    defaultId={SearchDataSec2.Target_Audience}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Design Look</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/design-look-dropdown`}
                                                    key={`deslk-${SearchDataSec2.Design_Look}`}
                                                    onChange={handleDesignLookSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={designLook ? designLook : null}
                                                    defaultId={SearchDataSec2.Design_Look}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Region</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/region-dropdown`}
                                                    key={`reg-${SearchDataSec2.Region}`}
                                                    onChange={handleRegionSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={region ? region : null}
                                                    defaultId={SearchDataSec2.Region}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Theme/Concept</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/theme-concept-dropdown`}
                                                    key={`thecon-${SearchDataSec2.Theme_Concept}`}
                                                    onChange={handleThemeConceptSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={themeConcept ? themeConcept : null}
                                                    defaultId={SearchDataSec2.Theme_Concept}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>


                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Setting/Concept</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/setting-concept-dropdown`}
                                                    key={`setcon-${SearchDataSec2.Setting_Concept}`}
                                                    onChange={handleSettingConceptSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={settingConcept ? settingConcept : null}
                                                    defaultId={SearchDataSec2.Setting_Concept}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full">
                                                <div className="w-1/3 border-b">Religion/Culture</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/religion-culture-dropdown`}
                                                    key={`relcult-${SearchDataSec2.Religion_Culture}`}
                                                    onChange={handleReligionCultureSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={religionCulture ? religionCulture : null}
                                                    defaultId={SearchDataSec2.Religion_Culture}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>
                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Jewelry Size</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/prod-size-dropdown`}
                                                    key={`jewsize-${SearchDataSec2.Jewelry_Size}`}
                                                    onChange={handleJewelrySizeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={jewelrySize ? jewelrySize : null}
                                                    defaultId={SearchDataSec2.Jewelry_Size}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                />
                                            </div>

                                            <div className="flex w-full  ">
                                                <div className="w-1/3 border-b">Catalogue</div>
                                                <AsyncDropdown
                                                    url={`/api/sales-distribution/catalogue-dropdown`}
                                                    key={`catlog-${SearchDataSec2.Catalogue}`}
                                                    onChange={handleCatalogueSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={catalogue ? catalogue : null}
                                                    defaultId={SearchDataSec2.Catalogue}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                            </div>

                                            {/* End original form layout */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Collapsible Section Three BOM RM ATTRIBUTES*/}
                        <div className="bg-gray-200 py-1 px-3 dark:bg-gray-800 border rounded-md mt-2">
                            <div className="flex items-center justify-between">
                                <span className="dark:text-gray-200 text-center">BOM RM ATTRIBUTES</span>
                                <button
                                    onClick={toggleCollapseBomAtt}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
                                >
                                    {isCollapsedBomAtt ? (
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


                            {!isCollapsedBomAtt && (
                                <div className="mt-2 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                                    {/* Begin your original form layout */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-1 ml-2">
                                        {/* 1st child div */}
                                        <div className="border p-3 rounded-md bg-white  dark:bg-gray-800 dark:text-gray-200 space-y-2">
                                            {/* Material Type Searchable dropdown */}
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Metal Type</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/matal-type-dropdown`}
                                                    key={`mttype-${SearchDataSec3.Metal_Type}`}
                                                    onChange={handleMetalTypeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={metalType ? metalType : null}
                                                    defaultId={SearchDataSec3.Metal_Type}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Metal Purity</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/matal-purity-dropdown`}
                                                    key={`mtpuri-${SearchDataSec3.Metal_Purity}`}
                                                    onChange={handleMetalPuritySearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={metalPurity ? metalPurity : null}
                                                    defaultId={SearchDataSec3.Metal_Purity}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8"/>
                                            </div>
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Metal Color</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/matal-color-dropdown`}
                                                    key={`mtcol-${SearchDataSec3.Metal_Color}`}
                                                    onChange={handleMetalColorSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={metalColor ? metalColor : null}
                                                    defaultId={SearchDataSec3.Metal_Color}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Metal Alloy Ctg</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/mtalyctg-dropdown`}
                                                    key={`mtallctg-${SearchDataSec3.Metal_Alloy_Ctg}`}
                                                    onChange={handleMetalAlloySearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={metalAlloy ? metalAlloy : null}
                                                    defaultId={SearchDataSec3.Metal_Alloy_Ctg}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Finishing Effect</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/finishing-effect-dropdown`}
                                                    key={`fineff-${SearchDataSec3.Finishing_Effect}`}
                                                    onChange={handleFinishingEffectSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={finishingEffect ? finishingEffect : null}
                                                    defaultId={SearchDataSec3.Finishing_Effect}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>


                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">STN Main Setting</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/stn-main-dropdown`}
                                                    key={`stnmset-${SearchDataSec3.STN_Main_Setting}`}
                                                    onChange={handleSTNMainSettingSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={sTNMain ? sTNMain : null}
                                                    defaultId={SearchDataSec3.STN_Main_Setting}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                        </div>


                                        {/* 2nd child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-2 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Dia Type</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/dia-type-dropdown`}
                                                    key={`diatp-${SearchDataSec3.Dia_Type}`}
                                                    onChange={handleDiaTypeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={diaType ? diaType : null}
                                                    defaultId={SearchDataSec3.Dia_Type}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Dia Shape</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/dia-shape-dropdown`}
                                                    key={`diashp-${SearchDataSec3.Dia_Shape}`}
                                                    onChange={handleDiaShapeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={diaShape ? diaShape : null}
                                                    defaultId={SearchDataSec3.Dia_Shape}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Dia Color</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/dia-stone-dropdown`}
                                                    key={`diacol-${SearchDataSec3.Dia_Color}`}
                                                    onChange={handleDiaColorSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={diaColor ? diaColor : null}
                                                    defaultId={SearchDataSec3.Dia_Color}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">Dia Group Size</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/stone-group-size-dropdown`}
                                                    key={`diagsz-${SearchDataSec3.Dia_Group_Size}`}
                                                    onChange={handleDiaGroupSizeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={diaGroupSize ? diaGroupSize : null}
                                                    defaultId={SearchDataSec3.Dia_Group_Size}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/1 border-b">Dia Size</div>
                                                <div className="w-full gap-x-2">
                                                    <AsyncDropdown
                                                        url={`/api/comman-master/dia-size-list-dropdown`}
                                                        key={`diasz1-${SearchDataSec3.Dia_Size_Fr_To1}`}
                                                        onChange={handleDiaSize1Search}
                                                        placeholder=""
                                                        labelField="label"
                                                        valueField="value"
                                                        selectedOption={diaSize1 ? diaSize1 : null}
                                                        defaultId={SearchDataSec3.Dia_Size_Fr_To1}
                                                        disabled={isViewOnly}
                                                        className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <AsyncDropdown
                                                        url={`/api/comman-master/dia-size-list-dropdown`}
                                                        key={`diasz2-${SearchDataSec3.Dia_Size_Fr_To2}`}
                                                        onChange={handleDiaSize2Search}
                                                        placeholder=""
                                                        labelField="label"
                                                        valueField="value"
                                                        selectedOption={diaSize2 ? diaSize2 : null}
                                                        defaultId={SearchDataSec3.Dia_Size_Fr_To2}
                                                        disabled={isViewOnly}
                                                        className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                    />

                                                </div>
                                                <input type="checkbox" className="w-26" />
                                            </div>


                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">STN Sub Setting</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/stn-sub-setting-dropdown`}
                                                     key={`stnsubset-${SearchDataSec3.STN_Sub_Setting}`}
                                                    onChange={handleSTNSubSettingSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={sTNSub ? sTNSub : null}
                                                    defaultId={SearchDataSec3.STN_Sub_Setting}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            {/* End original form layout */}
                                        </div>
                                    </div>

                                    {/* Begin your original form layout */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-1">
                                        {/* 1st child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-5 dark:bg-gray-800 dark:text-gray-200">
                                            {/* Material Type Searchable dropdown */}
                                            <div className="flex w-full gap-2 ">
                                                <div className="w-1/3 border-b">CS Type</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/cs-type-dropdown`}
                                                    key={`cstp-${SearchDataSec3.CS_Type}`}
                                                    onChange={handleCSTypeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={csType ? csType : null}
                                                    defaultId={SearchDataSec3.CS_Type}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">CS Name</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/cs-name-dropdown`}
                                                    key={`csnm-${SearchDataSec3.CS_Name}`}
                                                    onChange={handleCSNameSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={csName ? csName : null}
                                                    defaultId={SearchDataSec3.CS_Name}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">CS Shape</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/cs-shape-dropdown`}
                                                    key={`csshp-${SearchDataSec3.CS_Shape}`}
                                                    onChange={handleCSShapeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={csShape ? csShape : null}
                                                    defaultId={SearchDataSec3.CS_Shape}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">CS Color</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/stone-dropdown`}
                                                    key={`cscol-${SearchDataSec3.CS_Color}`}
                                                    onChange={handleCSColorSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={csColor ? csColor : null}
                                                    defaultId={SearchDataSec3.CS_Color}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-2">
                                                <div className="w-1/1 border-b">CS Size</div>
                                                <div className="w-full flex gap-x-1.5">
                                                    <div className="w-1/2 ml-2">
                                                        <AsyncDropdown
                                                            url={`/api/comman-master/cs-size-list`}
                                                            key={`cssz1-${SearchDataSec3.CS_Size1}`}
                                                            onChange={handleCSSize1Search}
                                                            placeholder=""
                                                            labelField="label"
                                                            valueField="value"
                                                            selectedOption={csSize1 ? csSize1 : null}
                                                            defaultId={SearchDataSec3.CS_Size1}
                                                            disabled={isViewOnly}
                                                            className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <AsyncDropdown
                                                            url={`/api/comman-master/cs-size-list`}
                                                            key={`cssz2-${SearchDataSec3.CS_Size2}`}
                                                            onChange={handleCSSize2Search}
                                                            placeholder=""
                                                            labelField="label"
                                                            valueField="value"
                                                            selectedOption={csSize2 ? csSize2 : null}
                                                            defaultId={SearchDataSec3.CS_Size2}
                                                            disabled={isViewOnly}
                                                            className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                        />
                                                    </div>
                                                </div>
                                                <input type="checkbox" className="w-26" />
                                            </div>
                                        </div>


                                        {/* 2nd child div */}
                                        <div className="border p-3 rounded-md bg-white space-y-5 dark:bg-gray-800 dark:text-gray-200">
                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">FD Type</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/master-dropdown/materialtypes`}
                                                    key={`fdtp-${SearchDataSec3.FD_Type}`}
                                                    onChange={handleFDTypeSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={fdType ? fdType : null}
                                                    defaultId={SearchDataSec3.FD_Type}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">FD Sub-Ctg</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/fd-sub-ctg-dropdown`}
                                                    key={`fdsctg-${SearchDataSec3.FD_Sub_Ctg}`}
                                                    onChange={handleFDSubCtgSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={fdSubCtg ? fdSubCtg : null}
                                                    defaultId={SearchDataSec3.FD_Sub_Ctg}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">FD Metal Puri</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/matal-purity-dropdown`}
                                                    key={`fdmtpuri-${SearchDataSec3.FD_Metal_Puri}`}
                                                    onChange={handleFDMetalPuriSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={fdMetalPuri ? fdMetalPuri : null}
                                                    defaultId={SearchDataSec3.FD_Metal_Puri}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>

                                            <div className="flex w-full gap-2">
                                                <div className="w-1/3 border-b">FD Metal Alloy Ct</div>
                                                <AsyncDropdown
                                                    url={`/api/comman-master/mtalyctg-dropdown`}
                                                    key={`fdmtallct-${SearchDataSec3.FD_Metal_Alloy_Ct}`}
                                                    onChange={handleFDMetalAlloyCtSearch}
                                                    placeholder=""
                                                    labelField="label"
                                                    valueField="value"
                                                    selectedOption={fdMtAlloyCt ? fdMtAlloyCt : null}
                                                    defaultId={SearchDataSec3.FD_Metal_Alloy_Ct}
                                                    disabled={isViewOnly}
                                                    className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"

                                                />
                                                <input type="checkbox" className="w-8" />
                                            </div>
                                            <div className="flex w-full gap-1.5">
                                                <div className="w-1/1 border-b">FD Size</div>
                                                <div className="w-full">
                                                    <div className="w-1/2 ml-2">
                                                        <AsyncDropdown
                                                            url={`/api/comman-master/fd-size-dropdown`}
                                                            key={`fdsz1-${SearchDataSec3.FD_Size1}`}
                                                            onChange={handleFDSize1Search}
                                                            placeholder=""
                                                            labelField="label"
                                                            valueField="value"
                                                            selectedOption={fdSize1 ? fdSize1 : null}
                                                            defaultId={SearchDataSec3.FD_Size1}
                                                            disabled={isViewOnly}
                                                            className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800 ml-2.5"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <AsyncDropdown
                                                        url={`/api/comman-master/fd-size-dropdown`}
                                                        key={`fdsz2
                                                        -${SearchDataSec3.FD_Size2}`}
                                                        onChange={handleFDSize2Search}
                                                        placeholder=""
                                                        labelField="label"
                                                        valueField="value"
                                                        selectedOption={fdSize2 ? fdSize2 : null}
                                                        defaultId={SearchDataSec3.FD_Size2}
                                                        disabled={isViewOnly}
                                                        className="w-full text-left dark:border-gray-500  dark:text-white dark:bg-gray-800"
                                                    />
                                                </div>
                                                <input type="checkbox" className="w-26" />
                                            </div>
                                        </div>

                                        {/* End original form layout */}
                                    </div>
                                </div>

                            )}
                        </div>

                        {/* Combination ATTRIBUTES IMPORT */}
                        <div>
                            <PdSearchCombinationComponet isViewOnly={isViewOnly} />
                        </div>

                        <div>
                            <PdSearchBulkStyleComponent isViewOnly={isViewOnly} />
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex bg-gray-300 text-white p-2 rounded-lg  justify-between gap-2 mx-2 dark:to-blue-300 ">
                        {!isViewOnly && (
                            <button className="bg-orange-500 px-4 py-1 rounded" onClick={handleClear}>
                                Clear
                            </button>
                        )}
                        <div className="flex gap-2">
                            <button className="bg-yellow-500 px-4 py-1 rounded" onClick={handleShow}>
                                Show
                            </button>
                            {/* {isAdding && (
                                <button onClick={handleFormSubmit} className="bg-green-500 px-4 py-1 rounded">
                                    Save
                                </button>
                            )}
                            {!isViewOnly && isEditing && (
                                <button onClick={handleFormSubmit} className="bg-green-500 px-4 py-1 rounded">
                                    Update
                                </button>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



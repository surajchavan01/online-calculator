

from typing import List, Optional, Any
from pydantic import BaseModel


class DiaCondition(BaseModel):
    shape_id: Optional[int] = None
    size_from: Optional[float] = None
    size_to: Optional[float] = None
    pcs_from: Optional[float] = None
    pcs_to: Optional[float] = None
    wt_from: Optional[float] = None
    wt_to: Optional[float] = None


class ReportFilters(BaseModel):
    nor: Optional[int] = 1000

    # Multi selects (lists)
    category: Optional[List[int]] = None
    subCategory: Optional[List[int]] = None
    usp: Optional[List[int]] = None
    customerName: Optional[List[int]] = None
    metalKT: Optional[List[int]] = None
    metalTone: Optional[List[int]] = None
    stoneMainSetting: Optional[List[int]] = None
    stoneSubSetting: Optional[List[int]] = None
    colorStoneName: Optional[List[int]] = None
    pointerShape: Optional[List[int]] = None
    colorStonePointerShape: Optional[List[int]] = None
    occasion: Optional[List[int]] = None
    inspiration: Optional[List[int]] = None
    targetaudiance: Optional[List[int]] = None
    designlook: Optional[List[int]] = None
    region: Optional[List[int]] = None
    conceptTheme: Optional[List[int]] = None
    conceptSetting: Optional[List[int]] = None
    religion: Optional[List[int]] = None
    charactershape: Optional[List[int]] = None
    prodsizechartdet: Optional[List[int]] = None
    specialeffect: Optional[List[int]] = None
    catalogue: Optional[List[int]] = None
    Classificn: Optional[List[int]] = None
    usp: Optional[List[int]] = None
    design_known_as_id: Optional[List[int]] = None

    # Single values / ranges
    metalNetWtFrom: Optional[float] = None
    metalNetWtTo: Optional[float] = None
    metalGrossWtFrom: Optional[float] = None
    metalGrossWtTo: Optional[float] = None
    diamondWtFrom: Optional[float] = None
    diamondWtTo: Optional[float] = None
    colorStoneWtFrom: Optional[float] = None
    colorStoneWtTo: Optional[float] = None
    noDiamondFrom: Optional[float] = None
    noDiamondTo: Optional[float] = None
    noColorStoneFrom: Optional[float] = None
    noColorStoneTo: Optional[float] = None

    centerStoneLengthFrom: Optional[float] = None
    centerStoneLengthTo: Optional[float] = None
    centerStoneBreadthFrom: Optional[float] = None
    centerStoneBreadthTo: Optional[float] = None
    centerStoneWidthFrom: Optional[float] = None
    centerStoneWidthTo: Optional[float] = None

    introducedInMonth: Optional[int] = None
    introducedInYear: Optional[int] = None

    eventFrom: Optional[int] = None
    eventTo: Optional[int] = None

    customerExclusive: Optional[bool] = None
    exclusiveTillDateFrom: Optional[str] = None
    exclusiveTillDateTo: Optional[str] = None

    # BOM related lists
    bom_metal_type_id: Optional[List[int]] = None
    bom_metal_purity_id: Optional[List[int]] = None
    bom_metal_color_id: Optional[List[int]] = None
    bom_alloy_category_id: Optional[List[int]] = None
    bom_mateffect_id: Optional[List[int]] = None

    bom_dia_type_id: Optional[List[int]] = None
    bom_dia_shape_id: Optional[List[int]] = None
    bom_dia_color_id: Optional[List[int]] = None
    bom_dia_group_size_id: Optional[List[int]] = None
    bom_dia_size_id: Optional[List[int]] = None

    bom_cs_type_id: Optional[List[int]] = None
    cs_bom_cs_type_id: Optional[List[int]] = None
    bom_cs_name_id: Optional[List[int]] = None
    cs_bom_cs_name_id: Optional[List[int]] = None
    bom_cs_shape_id: Optional[List[int]] = None
    cs_bom_cs_shape_id: Optional[List[int]] = None
    bom_cs_color_id: Optional[List[int]] = None
    cs_bom_cs_color_id: Optional[List[int]] = None
    bom_cs_size_id: Optional[List[int]] = None
    cs_bom_cs_size_id: Optional[List[int]] = None

    bom_finding_type_id: Optional[List[int]] = None
    bom_finding_sub_ctg_id: Optional[List[int]] = None
    bom_finding_metal_purity_id: Optional[List[int]] = None
    bom_finding_alloy_category_id: Optional[List[int]] = None

    # LBWW style ranges
    dia_design_length_from: Optional[float] = None
    dia_design_length_to: Optional[float] = None
    bom_dia_design_length_from: Optional[float] = None
    bom_dia_design_length_to: Optional[float] = None
    dia_design_breadth_from: Optional[float] = None
    dia_design_breadth_to: Optional[float] = None
    dia_design_width_from: Optional[float] = None
    dia_design_width_to: Optional[float] = None
    dia_design_wt_from: Optional[float] = None
    dia_design_wt_to: Optional[float] = None
    side_stone_weight_from: Optional[float] = None
    side_stone_weight_to: Optional[float] = None

    cs_design_length_from: Optional[float] = None
    cs_design_length_to: Optional[float] = None
    bom_cs_design_length_from: Optional[float] = None
    bom_cs_design_length_to: Optional[float] = None
    cs_design_breadth_from: Optional[float] = None
    cs_design_breadth_to: Optional[float] = None
    cs_design_width_from: Optional[float] = None
    cs_design_width_to: Optional[float] = None
    cs_design_wt_from: Optional[float] = None
    cs_design_wt_to: Optional[float] = None

    dia_conditions: Optional[List[DiaCondition]] = None

    # Toggles and flags
    centerStone: Optional[bool] = None
    pointer: Optional[str] = None
    multi_color: Optional[int] = None
    dia_cs: Optional[bool] = None
    dia_only: Optional[bool] = None

    output_category_id: Optional[int] = None
    bulkstyle: Optional[str] = None
    introduce_from: Optional[str] = None
    introduce_to: Optional[str] = None
    shank_width: Optional[str] = None
    design_length: Optional[str] = None
    design_breadth: Optional[str] = None
    design_width: Optional[str] = None
    bom_special_effect_id: Optional[List[int]] = None
    model_process_id: Optional[List[int]] = None
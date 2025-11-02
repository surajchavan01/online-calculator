
from sqlalchemy.orm import Session
# from modules.comman_master.models.model_search_model import ModelSearch  # SQLAlchemy model
from modules.comman_master.schemas.model_search_schema import *
from typing import Tuple, List, Any

# field_aliases = {
#     "id": "event_id",
#     "code": "event_code",
#     "desc": "event_desc",
#     # "is_for_rapnet": "stnshape_is_for_rapnet",
#     # "is_for_diamond": "stnshape_is_for_diamond",
#     # "is_for_color_stone": "stnshape_is_for_color_stone",
#     "sortindex": "sort_index",
#     "isactive": "isactive",
#     "created_by": "created_by",
#     "created_at": "created_at",
#     "creator_user":"creator_user",
#     "deleted_at": "deleted_at",    
#     "deleted_by": "deleted_by",  
#     "deleter_user": "deleter_user",
# }

# def model_search_get(data: ModelSearchResponse, db: Session):
#     """
#     Filters ModelSearch records based on the fields provided in the request.
#     """

#     # Convert schema to dict and remove None values
#     filter_data = data.dict(exclude_none=True)

#     # Build dynamic filter list
#     filters = []
#     for field_name, field_value in filter_data.items():
#         # Check if field exists in the SQLAlchemy model
#         if hasattr(ModelSearch, field_name):
#             model_column = getattr(ModelSearch, field_name)
#             filters.append(model_column == field_value)

#     # Apply filters to query
#     query = db.query(ModelSearch)
#     if filters:
#         query = query.filter(*filters)

#     results = query.all()

#     # Format response
#     return {
#         "status": "success",
#         "filter_count": len(filter_data),
#         "filters_applied": filter_data,
#         "result_count": len(results),
#         "data": [result.as_dict() for result in results]
#     }



# def get_records(
#     db: Session, 
#     model, 
#     skip: int = 0, 
#     limit: int = 10, 
#     allData: bool = False,
#     search: str = None, 
#     search_fields: list = None, 
#     filters: list = None, 
#     relationships: list = None
# ):
#     search_fields = [ModelSearch.stnshape_code, ModelSearch.stnshape_desc]
#     relationships = ["creator_user", "deleter_user"]  # or [] if not needed

#     record = base_get_records(
#         db=db,
#         model=model,
#         skip=skip,
#         limit=limit,
#         allData=allData,
#         search=search,
#         search_fields=search_fields,
#         filters=filters,
#         relationships=relationships,
#         output_fields=list(field_aliases.keys()),
#         field_aliases=field_aliases,
#     )
#     # print(record)
#     return record

from sqlalchemy.orm import Session
# from modules.comman_master.models.model_search_model import ModelSearch  # SQLAlchemy model
from modules.comman_master.schemas.model_search_schema import *
from typing import Tuple, List, Any





# Helper to safely join numeric lists
def _list_to_csv(arr: List[int]) -> str:
    return ",".join(str(int(x)) for x in arr)

class ReportService:
    def __init__(self, f: ReportFilters):
        self.f = f
        self.counter = 0
        self.not_in = ""

    def build(self) -> Tuple[str, List[Any]]:
        # Start statement: base selection
        nor = int(self.f.nor or 1000)
        # We'll build WHERE fragments and append them
        where_fragments: List[str] = []

        # Base where skeleton (mat_allow_model_search enforced later too)
        base_where = "(mat_mattype_id in (2,3) and a.deleted_at is null and mat_allow_model_search=1)"

        # === multiData mapping (complete arrays) ===
        multi_map = {
            5: ('category', 'matattrib_attrib_table_id'),
            6: ('subCategory', 'matattrib_attrib_table_id'),
            50: ('usp', 'matattrib_attrib_table_id'),
            18: ('customerName', 'matattrib_attrib_table_id'),
            24: ('metalKT', 'matattrib_attrib_table_id'),
            32: ('metalTone', 'matattrib_attrib_number'),
            19: ('stoneMainSetting', 'matbom_stnsettingtype_id'),
            20: ('stoneSubSetting', 'matbom_stnsettingsubtype_id'),
            23: ('colorStoneName', 'matattrib_attrib_table_id'),
            13: ('pointerShape', 'matattrib_attrib_table_id'),
            14: ('colorStonePointerShape', 'matattrib_attrib_table_id'),
            15: ('occasion', 'matattrib_attrib_table_id'),
            1: ('inspiration', 'matattrib_attrib_table_id'),
            2: ('targetaudiance', 'matattrib_attrib_table_id'),
            3: ('designlook', 'matattrib_attrib_table_id'),
            4: ('region', 'matattrib_attrib_table_id'),
            7: ('conceptTheme', 'matattrib_attrib_table_id'),
            8: ('conceptSetting', 'matattrib_attrib_table_id'),
            9: ('religion', 'matattrib_attrib_table_id'),
            10: ('charactershape', 'matattrib_attrib_table_id'),
            11: ('prodsizechartdet', 'matattrib_attrib_table_id'),
            12: ('specialeffect', 'matattrib_attrib_table_id'),
            35: ('catalogue', 'matattrib_attrib_table_id'),
            42: ('Classificn', 'matattrib_attrib_table_id'),
            49: ('design_known_as_id', 'matattrib_attrib_table_id'),

            # BOM related (5000+)
            5001: ('bom_metal_type_id', 'matext_mettyp_id'),
            5002: ('bom_metal_purity_id', 'matext_metpur_id'),
            5003: ('bom_metal_color_id', 'matext_metcol_id'),
            5004: ('bom_alloy_category_id', 'matext_allctg_id'),

            5005: ('bom_dia_type_id', 'matext_diastntype_id'),
            5006: ('bom_dia_shape_id', 'matext_diastnshape_id'),
            5007: ('bom_dia_color_id', 'matext_diastncolor_id'),
            5008: ('bom_dia_group_size_id', 'matext_diastnsizegroup_id'),
            5009: ('bom_dia_size_id', 'matext_diastnsize_id'),

            5027: ('bom_cs_type_id', 'matext_csstntype_id'),
            5010: ('bom_cs_name_id', 'matext_csstnname_id'),
            5011: ('bom_cs_shape_id', 'matext_csstnshape_id'),
            5012: ('bom_cs_color_id', 'matext_csstncolor_id'),
            5013: ('bom_cs_size_id', 'matext_csstnsize_id'),

            5014: ('bom_finding_type_id', 'matext_findctg_id'),
            5015: ('bom_finding_sub_ctg_id', 'matext_findsctg_id'),
            5016: ('bom_finding_metal_purity_id', 'matext_metpur_id'),
            5017: ('bom_finding_alloy_category_id', 'matext_allctg_id'),

            5018: ('cs_bom_dia_type_id', 'matext_diastntype_id'),
            5019: ('cs_bom_dia_shape_id', 'matext_diastnshape_id'),
            5020: ('cs_bom_dia_color_id', 'matext_diastncolor_id'),
            5021: ('cs_bom_dia_group_size_id', 'matext_diastnsizegroup_id'),
            5022: ('cs_bom_dia_size_id', 'matext_diastnsize_id'),

            5023: ('cs_bom_cs_name_id', 'matext_csstnname_id'),
            5024: ('cs_bom_cs_shape_id', 'matext_csstnshape_id'),
            5025: ('cs_bom_cs_color_id', 'matext_csstncolor_id'),
            5026: ('cs_bom_cs_size_id', 'matext_csstnsize_id'),
            5028: ('cs_bom_cs_type_id', 'matext_csstntype_id'),
        }

        # multiData handling
        for key, md in multi_map.items():
            field = md[0]
            column = md[1]
            val = getattr(self.f, field, None)
            if val:
                self.counter += 1
                # special handling similar to : some keys use different logic (e.g. 32)
                if key == 32:
                    # metalTone stored as matattrib_attrib_number but  used first element
                    if isinstance(val, list) and len(val) > 0:
                        where_fragments.append(
                            f"and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and matattrib_attrib_id = {key} and matattrib_attrib_number={int(val[0])} )"
                        )
                    continue

                # keys that are BOM material ext columns (matext_...) need to check mst_material_map_bom_combined
                if str(column).startswith('matext_') or 'matbom' in column or key >= 5000:
                    # In many cases we want mat_id in (select distinct a.matbom_mat_id from mst_material_map_bom_combined as a inner join mst_material_exts as b on b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and <column> in (...))
                    # For keys that represent size_code lists (5009,5013,5022,5026)  looked up size ids from diastn/csstn tables first.
                    if key in (5009, 5022, 5026):
                        # these expect list of size codes; emulate : find diastnsize_id or csstnsize_id -> here assume client gives actual IDs OR codes
                        # We'll accept numeric IDs directly (safer). If strings provided, this code will attempt to use them as codes (not implemented DB lookup here).
                        ids = _list_to_csv(val)
                        where_fragments.append(
                            f"and mat_id in ( select distinct a.matbom_mat_id from mst_material_map_bom_combined as a inner join mst_material_exts as b on b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and {column} in ({ids}) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 5 )"
                        )
                    elif key == 5013:
                        ids = _list_to_csv(val)
                        where_fragments.append(
                            f"and mat_id in ( select distinct a.matbom_mat_id from mst_material_map_bom_combined as a inner join mst_material_exts as b on b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and {column} in ({ids}) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 6 )"
                        )
                    else:
                        # For other BOM columns, if client provided list, either treat as OR of equals ( iterated) or IN depending on bom_symbol flags.
                        ids = _list_to_csv(val) if isinstance(val, list) else str(int(val))
                        # If bom_symbol flag present in  it used IN otherwise multiple equals per input; here we will use IN for brevity (correct semantics)
                        where_fragments.append(
                            f"and mat_id in ( select distinct a.matbom_mat_id from mst_material_map_bom_combined as a inner join mst_material_exts as b on b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and {column} in ({ids}) )"
                        )
                else:
                    # attribute mapping path
                    ids = _list_to_csv(val) if isinstance(val, list) else str(int(val))
                    if key == 42:
                        # classification: special join with material_map_material
                        where_fragments.append(
                            f"and mat_id in ( select mmm_map_mat_id from material_map_materials where deleted_at is null and mmm_mat_id in ( select mat_id from mst_materials where deleted_at is null and mat_matclass_id in ({ids}) ) )"
                        )
                    elif key in (19, 20):
                        # stoneMainSetting / stoneSubSetting:  used mst_material_map_bom_combined
                        where_fragments.append(
                            f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and {column} in ({ids}) )"
                        )
                    else:
                        where_fragments.append(
                            f"and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and matattrib_attrib_id = {key} and matattrib_attrib_table_id in ({ids}) )"
                        )

        # === singleData mapping (full port) ===
        # For date or numeric ranges we emulate  logic.
        single_map = {
            28: ('metalNetWtFrom', 'metalNetWtTo', 'matattrib_attrib_number', '0.000', '99.999'),
            36: ('metalGrossWtFrom', 'metalGrossWtTo', 'matattrib_attrib_number', '0.000', '99.999'),
            29: ('diamondWtFrom', 'diamondWtTo', 'matattrib_attrib_number', '0.000', '99.999'),
            37: ('colorStoneWtFrom', 'colorStoneWtTo', 'matattrib_attrib_number', '0.000', '99.999'),
            30: ('noDiamondFrom', 'noDiamondTo', 'matattrib_attrib_number', '0.000', '99.999'),
            31: ('noColorStoneFrom', 'noColorStoneTo', 'matattrib_attrib_number', '0.000', '99.999'),
            25: ('centerStoneLengthFrom', 'centerStoneLengthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"),
            26: ('centerStoneBreadthFrom', 'centerStoneBreadthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"),
            27: ('centerStoneWidthFrom', 'centerStoneWidthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"),
            16: ('eventFrom', None, 'matattrib_attrib_table_id', None, None),  # eventFrom mapped differently in 
            17: ('eventTo', None, 'matattrib_attrib_table_id', None, None),
            21: ('customerExclusive', None, 'matattrib_attrib_bit', '0.000', '99.999'),
            22: ('exclusiveTillDateFrom', 'exclusiveTillDateTo', 'matattrib_attrib_date', "'2000-01-01'", "'2999-12-31'"),
        }

        for key, sd in single_map.items():
            # sd structure varies; interpret carefully
            if key in (16, 17, 21):
                # eventFrom/eventTo/customerExclusive handled later separately too, but keep check if present
                pass

            from_field = sd[0]
            to_field = sd[1] if len(sd) > 1 else None
            column = sd[2] if len(sd) > 2 else None

            from_val = getattr(self.f, from_field, None) if from_field else None
            to_val = getattr(self.f, to_field, None) if to_field else None

            # When both present
            if from_val is not None and to_val is not None:
                self.counter += 1
                where_fragments.append(
                    f"and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = {key} and {column} between '{from_val}' and '{to_val}' )"
                )
            elif from_val is not None:
                self.counter += 1
                # use column-specific upper bound constant if provided
                upper = sd[3] if len(sd) > 3 else None
                upper_sql = upper if upper is not None else "'2999-12-31'"
                where_fragments.append(
                    f"and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = {key} and {column} between '{from_val}' and {upper_sql} )"
                )
            elif to_val is not None:
                self.counter += 1
                lower = sd[3] if len(sd) > 3 else None
                lower_sql = lower if lower is not None else "'0001-01-01'"
                where_fragments.append(
                    f"and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = {key} and {column} between {lower_sql} and '{to_val}' )"
                )

        # === LBWW map (stone sizes and sums) ===
        lbww = {
            1: ('dia_design_length_from', 'dia_design_length_to', 'diastnsize_length', '0.000', '99.999'),
            9: ('bom_dia_design_length_from', 'bom_dia_design_length_to', 'diastnsize_length', '0.000', '99.999'),
            2: ('dia_design_breadth_from', 'dia_design_breadth_to', 'diastnsize_breadth', '0.000', '99.999'),
            3: ('dia_design_width_from', 'dia_design_width_to', 'diastnsize_width', '0.000', '99.999'),
            4: ('cs_design_length_from', 'cs_design_length_to', 'csstnsize_length', '0.000', '99.999'),
            10: ('bom_cs_design_length_from', 'bom_cs_design_length_to', 'csstnsize_length', '0.000', '99.999'),
            5: ('cs_design_breadth_from', 'cs_design_breadth_to', 'csstnsize_breadth', '0.000', '99.999'),
            6: ('cs_design_width_from', 'cs_design_width_to', 'csstnsize_width', '0.000', '99.999'),
            7: ('dia_design_wt_from', 'dia_design_wt_to', '5', '0.000', '99.999'),  # '5' and '6' used as matbom_mattype_id in 
            8: ('cs_design_wt_from', 'cs_design_wt_to', '6', '0.000', '99.999'),
            11: ('side_dia_design_wt_from', 'side_dia_design_wt_to', '5', '0.000', '99.999'),
            12: ('side_cs_design_wt_from', 'side_cs_design_wt_to', '6', '0.000', '99.999'),
            13: ('bom_fnd_design_length_from', 'bom_fnd_design_length_to', 'findsize_length', '0.000', '99.999'),
        }

        for key, sd in lbww.items():
            frm_field, to_field, column, col_from, col_to = sd
            frm = getattr(self.f, frm_field, None)
            to = getattr(self.f, to_field, None)

            # Cases similar to 
            if key <= 3 or key == 9:
                # dia length/breadth/width
                if frm is not None and to is not None:
                    self.counter += 1
                    if key == 9:
                        # bom_dia_design_length special: check both dia and cs not outside
                        where_fragments.append(
                            f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null and {column} between {frm} and {to} ) and matbom_mattype_id = 5 )"
                        )
                        # Exclude items not in range only if not bom_symbol flag used —  added further not in checks; for parity we add one NOT IN that matches  default behavior when bom_symbol not set (we don't track bom_symbol per request in this port)
                        where_fragments.append(
                            f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from st_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null and {column} not between {frm} and {to} ) and matbom_mattype_id = 5 )"
                        )
                        where_fragments.append(
                            f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and csstnsize_length not between {frm} and {to} ) and matbom_mattype_id = 6 )"
                        )
                    else:
                        where_fragments.append(
                            f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null and {column} between {frm} and {to} ) and matbom_mattype_id = 5 and COALESCE(matbom_iscenter,0)=1 )"
                        )
                elif frm is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null and {column} between {frm} and {col_to} ) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 5 )"
                    )
                elif to is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null and {column} between {col_from} and {to} ) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 5 )"
                    )
            elif key <= 6 or key == 10:
                # cs stone sizes
                if frm is not None and to is not None:
                    self.counter += 1
                    if key == 10:
                        where_fragments.append(
                            f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and {column} between {frm} and {to} ) and matbom_mattype_id = 6 )"
                        )
                        # Not in checks like  (unless bom_symbol set)
                        where_fragments.append(
                            f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and {column} not between {frm} and {to} ) and matbom_mattype_id = 6 )"
                        )
                    else:
                        where_fragments.append(
                            f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and {column} between {frm} and {to} ) and matbom_mattype_id = 6 and COALESCE(matbom_iscenter,0)=1 )"
                        )
                elif frm is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and {column} between {frm} and {col_to} ) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 6 )"
                    )
                elif to is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null and {column} between {col_from} and {to} ) and COALESCE(matbom_iscenter,0)=1 and matbom_mattype_id = 6 )"
                    )
            elif key <= 8 or key == 11 or key == 12:
                # weight sums group by matbom_mat_id having sum(...) between
                isCenter = 1
                if key == 11 or key == 12:
                    isCenter = 0
                if frm is not None and to is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in (SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_iscenter = {isCenter} and matbom_mattype_id = {column} group by matbom_mat_id having sum(COALESCE(matbom_primary_wt,0)) between {frm} and {to} )"
                    )
                elif frm is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in (SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_iscenter = {isCenter} and matbom_mattype_id = {column} group by matbom_mat_id having sum(COALESCE(matbom_primary_wt,0)) between {frm} and {col_to} )"
                    )
                elif to is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in (SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_iscenter = {isCenter} and matbom_mattype_id = {column} group by matbom_mat_id having sum(COALESCE(matbom_primary_wt,0)) between {col_from} and {to} )"
                    )
            elif key == 13:
                # finding sizes
                if frm is not None and to is not None:
                    self.counter += 1
                    where_fragments.append(
                        f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_finding_sizes as a inner join mst_material_exts as b on b.matext_findsize_id = a.findsize_id where a.deleted_at is null and {column} between {frm} and {to} ) and matbom_mattype_id = 7 )"
                    )
                    # Additional not in clauses  had to exclude other types if no bom_symbol — adding similar exclusions
                    where_fragments.append(
                        f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null ) and matbom_mattype_id = 6 )"
                    )
                    where_fragments.append(
                        f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where a.deleted_at is null) and matbom_mattype_id = 5 )"
                    )

        # === centerStone toggle ===
        if self.f.centerStone:
            self.counter += 1
            where_fragments.append("and mat_id in(select distinct a.matbom_mat_id from mst_material_map_bom_combined as a where deleted_at is null and COALESCE(matbom_iscenter,0)=1)")

        # === pointer (P/X) ===
        if self.f.pointer in ('P', 'X'):
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_material_exts where deleted_at is null and matext_ispointer = '{self.f.pointer}' ) )"
            )

        # === multi_color ===
        if self.f.multi_color is not None:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from material_map_attribs where deleted_at is null and matattrib_attrib_id = 48 and matattrib_attrib_bit = {int(self.f.multi_color)})"
            )

        # === eventFrom / eventTo / customerExclusive / exclusiveTillDate ===
        if self.f.eventFrom:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from material_map_attribs where deleted_at is null and matattrib_attrib_id = 16 and matattrib_attrib_table_id = {int(self.f.eventFrom)})"
            )

        if self.f.eventTo:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 17 and matattrib_attrib_table_id = {int(self.f.eventTo)})"
            )

        if self.f.customerExclusive:
            # boolean flagged by  as bit
            self.counter += 1
            bit = 1 if self.f.customerExclusive else 0
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 21 and matattrib_attrib_bit = {bit})"
            )

        if self.f.exclusiveTillDateFrom and self.f.exclusiveTillDateTo:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 22 and matattrib_attrib_date between '{self.f.exclusiveTillDateFrom}' and '{self.f.exclusiveTillDateTo}')"
            )

        # introduce range (styles)
        if self.f.introduce_from and self.f.introduce_to:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matsty_mat_id from mst_material_styles where deleted_at is null and matsty_introduce_date between '{self.f.introduce_from}' and '{self.f.introduce_to}')"
            )

        # shank & design text matches
        if self.f.shank_width:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 49 and matattrib_attrib_text like '%{self.f.shank_width}%')"
            )
        if self.f.design_length:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 46 and matattrib_attrib_text like '%{self.f.design_length}%')"
            )
        if self.f.design_breadth:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 47 and matattrib_attrib_text like '%{self.f.design_breadth}%')"
            )
        if self.f.design_width:
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 48 and matattrib_attrib_text like '%{self.f.design_width}%')"
            )

        # bom_special_effect_id
        if self.f.bom_special_effect_id:
            s_ids = _list_to_csv(self.f.bom_special_effect_id)
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matbom_mat_id from mst_material_map_bom_combined where matbom_mattype_id = 8 and matbom_mat_id_material in ({s_ids}))"
            )

        # model_process_id
        if self.f.model_process_id:
            model_ids = _list_to_csv(self.f.model_process_id)
            self.counter += 1
            where_fragments.append(
                f"and mat_id in(select distinct matsty_mat_id from mst_material_styles where deleted_at is null and matsty_pdmodelproc_id in ({model_ids}))"
            )

        # === dia_conditions complex block ===
        if self.f.dia_conditions and len(self.f.dia_conditions) > 0:
            self.counter += 1
            not_in_list = []
            for con in self.f.dia_conditions:
                sid = con.shape_id
                size_from = con.size_from
                size_to = con.size_to
                pcs_from = con.pcs_from
                pcs_to = con.pcs_to
                wt_from = con.wt_from
                wt_to = con.wt_to

                not_in_list.append(str(sid))

                subq = f"and mat_id in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where b.matext_diastnshape_id IN({sid}) AND a.deleted_at is null "
                if size_from and size_to:
                    subq += f" and diastnsize_length between {size_from} and {size_to} "
                subq += f") and matbom_mattype_id = 5 group by matbom_mat_id "
                if pcs_from and pcs_to:
                    subq += f" having sum(COALESCE(matbom_secondary_wt,0)) between {pcs_from} and {pcs_to}"
                if wt_from and wt_to:
                    if pcs_from and pcs_to:
                        subq += f" and sum(COALESCE(matbom_primary_wt,0)) between {wt_from} and {wt_to}"
                    else:
                        subq += f" having sum(COALESCE(matbom_primary_wt,0)) between {wt_from} and {wt_to}"
                subq += ")"
                where_fragments.append(subq)

                # not in counterpart
                subq_not = f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where b.matext_diastnshape_id IN({sid}) AND a.deleted_at is null "
                if size_from and size_to:
                    subq_not += f" and diastnsize_length not between {size_from} and {size_to} "
                subq_not += f") and matbom_mattype_id = 5 group by matbom_mat_id "
                if pcs_from and pcs_to:
                    subq_not += f" having sum(COALESCE(matbom_secondary_wt,0)) not between {pcs_from} and {pcs_to}"
                if wt_from and wt_to:
                    if pcs_from and pcs_to:
                        subq_not += f" and sum(COALESCE(matbom_primary_wt,0)) not between {wt_from} and {wt_to}"
                    else:
                        subq_not += f" having sum(COALESCE(matbom_primary_wt,0)) not between {wt_from} and {wt_to}"
                subq_not += ")"
                where_fragments.append(subq_not)

            not_in_csv = ",".join(not_in_list)
            #  then excluded materials containing shapes not in selected list and excluded all CS types
            where_fragments.append(
                f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id where b.matext_diastnshape_id not IN({not_in_csv}) AND a.deleted_at is null ) )"
            )
            where_fragments.append(
                f"and mat_id not in ( SELECT DISTINCT matbom_mat_id from mst_material_map_bom_combined where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_cs_stone_sizes as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id where a.deleted_at is null ) and matbom_mattype_id = 6 )"
            )

        # === dia_cs and dia_only toggles ===
        if self.f.dia_cs:
            self.counter += 1
            where_fragments.append(
                "and mat_id in (select matbom_mat_id FROM ( select matbom_mat_id, sum(case when matbom_mattype_id = 6 then 1 else 0 end) HasCS, sum(case when matbom_mattype_id = 5 then 1 else 0 end) HasDia from mst_material_map_bom_combined where deleted_at is null and ( matbom_mattype_id = 6 or matbom_mattype_id = 5 ) group by matbom_mat_id) A1 WHERE (case when A1.HasCS > 0 and A1.HasDia > 0 then 1 else 0 end) = 1 )"
            )

        if self.f.dia_only:
            self.counter += 1
            where_fragments.append(
                "and mat_id in (select matbom_mat_id FROM ( select matbom_mat_id, sum(case when matbom_mattype_id = 6 then 1 else 0 end) HasCS, sum(case when matbom_mattype_id = 5 then 1 else 0 end) HasDia from mst_material_map_bom_combined where deleted_at is null and ( matbom_mattype_id = 6 or matbom_mattype_id = 5 ) group by matbom_mat_id) A1 WHERE (case when A1.HasCS = 0 and A1.HasDia > 0 then 1 else 0 end) = 1 )"
            )

        # === output category ===
        if self.f.output_category_id:
            where_fragments.append(f"and mat_pctg_id = {int(self.f.output_category_id)}")

        # === bulkstyle ===
        if self.f.bulkstyle:
            lines = [s.strip() for s in str(self.f.bulkstyle).replace("\n", ",").split(",") if s.strip()]
            quoted = ",".join([f"'{s}'" for s in lines])
            where_fragments.append(f"and mat_code in ({quoted})")

        # enforce mat_allow_model_search again and combine everything
        where_sql = " ".join(where_fragments)

        final_sql = f"""
SELECT mat_id, mat_code, mat_pctg_id, pctg_desc, pctg_code
FROM mst_materials as a
LEFT JOIN mst_prod_ctgs as b on b.pctg_id = a.mat_pctg_id
WHERE {base_where}
{where_sql}
ORDER BY mat_code asc
LIMIT {nor};
""".strip()

        return final_sql

def run_report(filters: ReportFilters):
    svc = ReportService(filters)
    sql = svc.build()
    rows = fetch_all(sql)
    return sql, rows
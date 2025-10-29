<?php

namespace App\Http\Livewire\Master;

use App\Exports\AttributeSummeryExport;
use App\Models\AlloyCategory;
use App\Models\Concept;
use App\Models\CustomerMst;
use App\Models\DesignUsp;
use App\Models\MarketMst;
use App\Models\MaterialMapMaterial;
use App\Models\MetalPurity;
use App\Models\MstAttribute;
use App\Models\MstCatalogue;
use App\Models\MstCatlogItems;
use App\Models\MstCharactershape;
use App\Models\MstCsStoneColor;
use App\Models\MstCsStoneName;
use App\Models\MstCsStoneShape;
use App\Models\MstCsStoneSize;
use App\Models\MstCsStoneType;
use App\Models\MstCsStoneTypeMapCsStoneName;
use App\Models\MstDesignlook;
use App\Models\MstDiaStoneColor;
use App\Models\MstDiaStoneShape;
use App\Models\MstDiaStoneSize;
use App\Models\MstDiaStoneSizeGroup;
use App\Models\MstDiaStoneType;
use App\Models\MstEvent;
use App\Models\MstFindingCtg;
use App\Models\MstFindingSubCtg;
use App\Models\MstImageView;
use App\Models\MstInspiration;
use App\Models\MstMaterial;
use App\Models\MstMaterialClassification;
use App\Models\MstMaterialEffect;
use App\Models\MstMetalColor;
use App\Models\MstMetalPurity;
use App\Models\MstMetalType;
use App\Models\MstReligion;
use App\Models\MstSettingconcept;
use App\Models\MstsMaterialDesignKnownAs;
use App\Models\MstStoneSettingSubType;
use App\Models\MstStoneSettingType;
use App\Models\MstTargetaudiance;
use App\Models\Occasion;
use App\Models\PdModelProcessMst;
use App\Models\ProdCtgMst;
use App\Models\ProdSizeChartDetMst;
use App\Models\ProdSubCtgMst;
use App\Models\VwcMstMaterialMapBomCombined;
use App\Models\Year;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Livewire\Component;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;
use Livewire\WithPagination;

class PdSearchComponent extends Component
{
    use WithPagination;
    public $mat_id;
    public $msg = "";
    // public $subCategories;

    // multi data vairiable 
    public $category;
    public $subCategory;
    public $concept;
    public $customerName;
    public $metalKT;
    public $metalTone;
    public $stoneMainSetting;
    public $stoneSubSetting;
    public $colorStoneName;
    public $pointerShape;
    public $colorStonePointerShape;
    public $occasion;
    public $inspiration;
    public $targetaudiance;
    public $designlook;
    public $region;
    public $conceptTheme;
    public $conceptSetting;
    public $religion;
    public $charactershape;
    public $prodsizechartdet;
    public $specialeffect;
    public $catalogue;
    public $Classificn;
    public $usp;

    // Single data vairiable 
    public $metalNetWtFrom;
    public $metalNetWtTo;
    public $metalGrossWtFrom;
    public $metalGrossWtTo;
    public $diamondWtFrom;
    public $diamondWtTo;
    public $colorStoneWtFrom;
    public $colorStoneWtTo;
    public $noDiamondFrom;
    public $noDiamondTo;
    public $noColorStoneFrom;
    public $noColorStoneTo;
    public $centerStoneLengthFrom;
    public $centerStoneLengthTo;
    public $centerStoneBreadthFrom;
    public $centerStoneBreadthTo;
    public $centerStoneWidthFrom;
    public $centerStoneWidthTo;
    public $introducedInMonth;
    public $introducedInYear;
    public $centerStone;
    public $eventFrom;
    public $eventTo;
    public $customerExclusive;
    public $exclusiveTillDateFrom;
    public $exclusiveTillDateTo;


    public $materialCodes;
    public $symbol;
    public $conditions;
    public $materialAttributes = [];
    public $attributes;
    public $images;
    public $boms;
    public $tab;
    public $checkAll;
    public $attributeCheck = [];
    public $myreport = 0;
    public $allDesign = false;
    public $checkAllStyle;
    public $checkStyle = [];
    public $styles = [];
    public $selectedImage = 1;    
    public $format = 1;
    public $bom_metal_type_id = [];
    public $bom_metal_purity_id;
    public $bom_metal_color_id;
    public $bom_alloy_category_id;
    public $bom_mateffect_id;
    public $bom_dia_type_id;
    public $cs_bom_dia_type_id;
    public $bom_dia_shape_id;
    public $cs_bom_dia_shape_id;
    public $bom_dia_color_id;
    public $cs_bom_dia_color_id;
    public $bom_dia_group_size_id;
    public $cs_bom_dia_group_size_id;
    public $bom_dia_size_id;
    public $cs_bom_dia_size_id;
    public $bom_cs_type_id = [];
    public $cs_bom_cs_type_id;
    public $bom_cs_name_id;
    public $cs_bom_cs_name_id;
    public $bom_cs_shape_id;
    public $cs_bom_cs_shape_id;
    public $bom_cs_color_id;
    public $cs_bom_cs_color_id;
    public $bom_cs_size_id;
    public $cs_bom_cs_size_id;
    public $bom_finding_type_id = [];
    public $bom_finding_sub_ctg_id;
    public $bom_finding_metal_purity_id;
    public $bom_finding_alloy_category_id;
    public $bom_special_effect_id;
    public $shank_width;
    public $design_length;
    public $design_breadth;
    public $design_width;

    public $dia_design_length_from;
    public $bom_dia_design_length_to;
    public $bom_dia_design_length_from;
    public $dia_design_length_to;
    public $dia_design_breadth_from;
    public $dia_design_breadth_to;
    public $dia_design_width_from;
    public $dia_design_width_to;
    public $dia_design_wt_from;
    public $dia_design_wt_to;
    public $side_stone_weight_from;
    public $side_stone_weight_to;

    public $cs_design_length_from;
    public $cs_design_length_to;
    public $bom_cs_design_length_from;
    public $bom_cs_design_length_to;
    public $cs_design_breadth_from;
    public $cs_design_breadth_to;
    public $cs_design_width_from;
    public $cs_design_width_to;
    public $cs_design_wt_from;
    public $cs_design_wt_to;
    public $ranges = [];

    public $series = [];
    public $sets = [];
    public $nor = 1000;
    public $nort;
    public $pointer;
    public $multi_color;
    public $modelProcesses = [];
    public $model_process_id;
    public $designKnowns = [];
    public $design_known_as_id;
    public $catalog_items;
    public $bom_symbol = [];
    public $category_ids = [];
    public $main_setting_ids = [];
    public $cs_stone_type_ids = [];

    public $dia_conditions = [];
    public $bom_dia_shape_id_con;
    public $bom_dia_design_length_from_con;
    public $bom_dia_design_length_to_con;
    public $bom_dia_design_pcs_from_con;
    public $bom_dia_design_pcs_to_con;
    public $bom_dia_design_wt_from_con;
    public $bom_dia_design_wt_to_con;
    public $bom_fnd_design_length_from;
    public $bom_fnd_design_length_to;

    public $side_dia_design_wt_from;
    public $side_dia_design_wt_to;
    public $side_cs_design_wt_from;
    public $side_cs_design_wt_to;

    public $dia_cs;
    public $dia_only;
    public $output_categories = [];
    public $output_category_id;
    public $introduce_from;
    public $introduce_to;
    public $ctg_count = [];
    public $bulkstyle;
    public $catalogs=[];
    public $quality=20;
    public $selected_styles_count=0;
    public $product_size=null;
    public $query=null;

    protected $listeners = ['categoryChange', 'csTypeChange', 'fndTypeChange', 'metalTypeChange','stoneMainSettingChange'];



   

    

    public function attributeList($tab)
    {
        if ($tab == 4) {
            $this->attributes = MstAttribute::all();
        }
        $this->tab = $tab;
    }

    public function updatedCheckAll()
    {
        // dd($this->checkAll);
        if ($this->checkAll == true) {
            $attributes = MstAttribute::all();
            foreach ($attributes as $attribute) {
                $this->attributeCheck[$attribute->attrib_id]  = $attribute->attrib_id;
            }
        } else {
            $this->attributeCheck = [];
        }
    }

    public function exportExcel()
    {
        if(count($this->checkStyle)==0)
       {
        $this->addError('msg','Select Styles');
        return;
       }
        ini_set('memory_limit', '10664M');
        ini_set('max_execution_time', '5000');

        return Excel::download(new AttributeSummeryExport($this->checkStyle, $this->format, $this->selectedImage,$this->quality), 'report.xlsx');
    }

    public function tab($id)
    {
        $this->myreport = $id;
    }

    public function refresh()
    {
        return redirect(request()->header('Referer'));
    }


    public function showReport()
    {
        $this->checkAllStyle=false;
        $this->checkStyle=[];
        $this->output_categories = [];
        $this->images = null;
        $this->boms = new Collection();
        $this->myreport=1;
        $this->tab = 1;
        // dd($this->myreport);
        $this->report();
    }

    public function addCondition()
    {
        $this->validate(
            [
                'bom_dia_shape_id_con' => 'required',
            ],
            [
                'bom_dia_shape_id_con.required' => 'Dia Shape is reuired',
            ]
        );
        if ($this->bom_dia_shape_id_con) {
            $this->dia_conditions[] =
                [
                    'shape_id' => $this->bom_dia_shape_id_con,
                    'size_from' => $this->bom_dia_design_length_from_con,
                    'size_to' => $this->bom_dia_design_length_to_con,
                    'pcs_from' => $this->bom_dia_design_pcs_from_con,
                    'pcs_to' => $this->bom_dia_design_pcs_to_con,
                    'wt_from' => $this->bom_dia_design_wt_from_con,
                    'wt_to' => $this->bom_dia_design_wt_to_con,

                ];
        }

        $this->bom_dia_shape_id_con = null;
        $this->bom_dia_design_length_from_con = null;
        $this->bom_dia_design_length_to_con = null;
        $this->bom_dia_design_pcs_from_con = null;
        $this->bom_dia_design_pcs_to_con = null;
        $this->bom_dia_design_wt_from_con = null;
        $this->bom_dia_design_wt_to_con = null;
    }

    public function removeCon($id)
    {
        unset($this->dia_conditions[$id]);
    }

    public function report()
    {
        
        $not_in = "";
        $materialCodes = [];
        $statment = "";
        $counter = 0;
        if ($this->myreport == 0) {
            return $materialCodes;
        } elseif($this->myreport == 1) {


            $statment = 'select top '.$this->nor.'  mat_id, mat_code, mat_pctg_id, pctg_desc,pctg_code from mst_materials as a left outer join mst_prod_ctgs as b on b.pctg_id = a.mat_pctg_id where  (mat_mattype_id in (2,3) and a.deleted_at is null and mat_allow_model_search=1';

            $c = "";
            $multiData = [
                '5' => ['category', 'matattrib_attrib_table_id'],
                '6' => ['subCategory', 'matattrib_attrib_table_id'],
                '50' => ['usp', 'matattrib_attrib_table_id'],
                '18' => ['customerName', 'matattrib_attrib_table_id'],
                '24' => ['metalKT', 'matattrib_attrib_table_id'],
                '32' => ['metalTone', 'matattrib_attrib_number'],
                '19' => ['stoneMainSetting', 'matbom_stnsettingtype_id'],
                '20' => ['stoneSubSetting', 'matbom_stnsettingsubtype_id'],
                '23' => ['colorStoneName', 'matattrib_attrib_table_id'],
                '13' => ['pointerShape', 'matattrib_attrib_table_id'],
                '14' => ['colorStonePointerShape', 'matattrib_attrib_table_id'],
                '15' => ['occasion', 'matattrib_attrib_table_id'],
                '1' => ['inspiration', 'matattrib_attrib_table_id'],
                '2' => ['targetaudiance', 'matattrib_attrib_table_id'],
                '3' => ['designlook', 'matattrib_attrib_table_id'],
                '4' => ['region', 'matattrib_attrib_table_id'],
                '7' => ['conceptTheme', 'matattrib_attrib_table_id'],
                '8' => ['conceptSetting', 'matattrib_attrib_table_id'],
                '9' => ['religion', 'matattrib_attrib_table_id'],
                '10' => ['charactershape', 'matattrib_attrib_table_id'],
                '11' => ['prodsizechartdet', 'matattrib_attrib_table_id'],
                '12' => ['specialeffect', 'matattrib_attrib_table_id'],
                '35' => ['catalogue', 'matattrib_attrib_table_id'],
                '42' => ['Classificn', 'matattrib_attrib_table_id'],
                '49' => ['design_known_as_id', 'matattrib_attrib_table_id'],
                // '33' => ['introducedInMonth', 'matattrib_attrib_table_id'],
                // '34' => ['introducedInYear', 'matattrib_attrib_table_id'],

                '5001' => ['bom_metal_type_id', 'matext_mettyp_id'],
                '5002' => ['bom_metal_purity_id', 'matext_metpur_id'],
                '5003' => ['bom_metal_color_id', 'matext_metcol_id'],
                '5004' => ['bom_alloy_category_id', 'matext_allctg_id'],

                '5005' => ['bom_dia_type_id', 'matext_diastntype_id'],
                '5006' => ['bom_dia_shape_id', 'matext_diastnshape_id'],
                '5007' => ['bom_dia_color_id', 'matext_diastncolor_id'],
                '5008' => ['bom_dia_group_size_id', 'matext_diastnsizegroup_id'],
                '5009' => ['bom_dia_size_id', 'matext_diastnsize_id'],

                '5027' => ['bom_cs_type_id', 'matext_csstntype_id'],
                '5010' => ['bom_cs_name_id', 'matext_csstnname_id'],
                '5011' => ['bom_cs_shape_id', 'matext_csstnshape_id'],
                '5012' => ['bom_cs_color_id', 'matext_csstncolor_id'],
                '5013' => ['bom_cs_size_id', 'matext_csstnsize_id'],

                '5014' => ['bom_finding_type_id', 'matext_findctg_id'],
                '5015' => ['bom_finding_sub_ctg_id', 'matext_findsctg_id'],
                '5016' => ['bom_finding_metal_purity_id', 'matext_metpur_id'],
                '5017' => ['bom_finding_alloy_category_id', 'matext_allctg_id'],

                '5018' => ['cs_bom_dia_type_id', 'matext_diastntype_id'],
                '5019' => ['cs_bom_dia_shape_id', 'matext_diastnshape_id'],
                '5020' => ['cs_bom_dia_color_id', 'matext_diastncolor_id'],
                '5021' => ['cs_bom_dia_group_size_id', 'matext_diastnsizegroup_id'],
                '5022' => ['cs_bom_dia_size_id', 'matext_diastnsize_id'],

                '5023' => ['cs_bom_cs_name_id', 'matext_csstnname_id'],
                '5024' => ['cs_bom_cs_shape_id', 'matext_csstnshape_id'],
                '5025' => ['cs_bom_cs_color_id', 'matext_csstncolor_id'],
                '5026' => ['cs_bom_cs_size_id', 'matext_csstnsize_id'],
                '5028' => ['cs_bom_cs_type_id', 'matext_csstntype_id'],

            ];
            $singleData = [
                '28' => ['metalNetWtFrom', 'metalNetWtTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '36' => ['metalGrossWtFrom', 'metalGrossWtTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '29' => ['diamondWtFrom', 'diamondWtTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '37' => ['colorStoneWtFrom', 'colorStoneWtTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '30' => ['noDiamondFrom', 'noDiamondTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '31' => ['noColorStoneFrom', 'noColorStoneTo', 'matattrib_attrib_number', '0.000', '99.999'],
                '25' => ['centerStoneLengthFrom', 'centerStoneLengthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"],
                '26' => ['centerStoneBreadthFrom', 'centerStoneBreadthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"],
                '27' => ['centerStoneWidthFrom', 'centerStoneWidthTo', 'matattrib_attrib_text', 'A', "'zzzzzzzzzz'"],
                // '33' => ['introducedInMonth', 'matattrib_attrib_table_id'],
                // '34' => ['introducedInYear', 'matattrib_attrib_table_id'],
                '16' => ['eventFrom', 'matattrib_attrib_table_id'],
                '17' => ['eventTo', 'matattrib_attrib_table_id', '0.000', '99.999'],
                '21' => ['customerExclusive', 'matattrib_attrib_number', '0.000', '99.999'],
                '22' => ['exclusiveTillDateFrom', 'exclusiveTillDateTo', 'matattrib_attrib_date', "'01-jan-2000'", "'31-dec-9999'"],
            ];
            $lbww = [
                '1' => ['dia_design_length_from', 'dia_design_length_to', 'diastnsize_length', '0.000', '99.999'],
                '9' => ['bom_dia_design_length_from', 'bom_dia_design_length_to', 'diastnsize_length', '0.000', '99.999'],
                '2' => ['dia_design_breadth_from', 'dia_design_breadth_to', 'diastnsize_breadth', '0.000', '99.999'],
                '3' => ['dia_design_width_from', 'dia_design_width_to', 'diastnsize_width]', '0.000', '99.999'],

                '4' => ['cs_design_length_from', 'cs_design_length_to', 'csstnsize_length', '0.000', '99.999'],
                '10' => ['bom_cs_design_length_from', 'bom_cs_design_length_to', 'csstnsize_length', '0.000', '99.999'],
                '5' => ['cs_design_breadth_from', 'cs_design_breadth_to', 'csstnsize_breadth', '0.000', '99.999'],
                '6' => ['cs_design_width_from', 'cs_design_width_to', 'csstnsize_width', '0.000', '99.999'],

                '7' => ['dia_design_wt_from', 'dia_design_wt_to', '5', '0.000', '99.999'],
                '8' => ['cs_design_wt_from', 'cs_design_wt_to', '6', '0.000', '99.999'],
                '11' => ['side_dia_design_wt_from', 'side_dia_design_wt_to', '5', '0.000', '99.999'],
                '12' => ['side_cs_design_wt_from', 'side_cs_design_wt_to', '6', '0.000', '99.999'],
                '13' => ['bom_fnd_design_length_from', 'bom_fnd_design_length_to', 'findsize_length', '0.000', '99.999'],
            ];

            $ids = 0;

            // $query = MstMaterialMapAttrib::query();

            foreach ($multiData as $key => $md) {
                
                if ($key > 5000) {
                    $from = $md[0];
                    $column = $md[1];
                    if ($this->$from) {

                        if ($key == 33 || $key == 34) {
                            $ids = [];
                            $ids[] = $this->$from;
                        } elseif ($key == 32) {
                            $statment .= ' and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and 
                            matattrib_attrib_id = ' . $key . ' and matattrib_attrib_number=' . $this->$from[0] . ' )';
                        } else {

                            // $ids = implode(',', $this->$from);
                            // $statment .= ' and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and 
                            // matattrib_attrib_id = ' . $key . ' and matattrib_attrib_table_id=' . $ids . ' )';
                        }

                        if ($key == 5009 || $key == 5013) {
                            $ids = 0;
                            if ($key == 5013) {
                                $ddd = MstCsStoneSize::whereIn('csstnsize_code', $this->$from)->get();
                            }
                            if ($key == 5009) {
                                $ddd =  MstDiaStoneSize::whereIn('diastnsize_code', $this->$from)->get();
                            }
                            if ($key == 5022) {
                                $ddd =  MstDiaStoneSize::whereIn('diastnsize_code', $this->$from)->get();
                            }
                            if ($key == 5026) {
                                $ddd =  MstDiaStoneSize::whereIn('diastnsize_code', $this->$from)->get();
                            }
                            $ctr = 1;
                            foreach ($ddd as $dd) {
                                if ($ctr != 1) {
                                    $ids .= ",";
                                } else {
                                    $ids = null;
                                }
                                if ($key == 5009) {
                                    $ids .= $dd->diastnsize_id;
                                }
                                if ($key == 5013) {
                                    $ids .= $dd->csstnsize_id;
                                }
                                if ($key == 5022) {
                                    $ids .= $dd->csstnsize_id;
                                }
                                if ($key == 5026) {
                                    $ids .= $dd->csstnsize_id;
                                }
                                $ctr++;
                            }
                            // dd($ids);
                        }

                        $counter++;
                        if ($key >= 5018 && $key <= 5022) {
                            $statment .= ' and mat_id in  ( select distinct a.matbom_mat_id from vwc_mst_material_map_bom_combined as a inner join mst_material_exts as b on 
    b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and ' . $column . ' in (' . $ids . ') and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 5 )';
                        } elseif ($key > 5022 && $key <= 5026) {
                            $statment .= ' and mat_id in  ( select distinct a.matbom_mat_id from vwc_mst_material_map_bom_combined as a inner join mst_material_exts as b on 
    b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and ' . $column . ' in (' . $ids . ') and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 6 )';
                        } else {
                    
                            $ids = implode(',', $this->$from);

                            if (isset($this->bom_symbol[$from]) and $this->bom_symbol[$from] == true) {
                                $statment .= ' and mat_id in  ( select distinct a.matbom_mat_id from vwc_mst_material_map_bom_combined as a inner join mst_material_exts as b on 
                                b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and ' . $column . ' in( ' . $ids . ') )';
                            } else {
                                foreach ($this->$from as $bom_id) {
                                    $statment .= ' and mat_id in  ( select distinct a.matbom_mat_id from vwc_mst_material_map_bom_combined as a inner join mst_material_exts as b on 
                                    b.matext_mat_id = a.matbom_mat_id_material where a.deleted_at is null and ' . $column . ' = ' . $bom_id . ' )';
                                }
                                if (count($this->dia_conditions) == 0) {

                                    $statment .= 'and mat_id not in  ( select distinct a.matbom_mat_id 
                                from vwc_mst_material_map_bom_combined as a 
                                inner join mst_material_exts as b on b.matext_mat_id = a.matbom_mat_id_material 
                                where a.deleted_at is null and ' . $column . ' not in (' . $ids . ')
                                )';
                                } else {
                                    $not_in = $ids . ",";
                                }
                            }
                        }
                    }
                } else {
                    $from = $md[0];
                    $column = $md[1];
                    if ($this->$from) {
                        $counter++;
                        if ($key == 33 || $key == 34) {
                            $statment .= ' and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and 
                            matattrib_attrib_id = ' . $key . ' and matattrib_attrib_table_id=' . $this->$from . ' )';
                        } elseif ($key == 32) {
                            $statment .= ' and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and 
                            matattrib_attrib_id = ' . $key . ' and matattrib_attrib_number=' . $this->$from[0] . ' )';
                        } elseif ($key == 42) {
                            $ids = implode(',', $this->$from);
                            $statment .= ' and mat_id in ( select mmm_map_mat_id
                            from material_map_materials
                            where deleted_at  is null and mmm_mat_id in (
                            select mat_id from mst_materials where deleted_at is null and mat_matclass_id in (' . $ids . ') ) )';
                        } 
                        elseif($key == 19 || $key == 20)
                        {
                            $ids = implode(',', $this->$from);
                            $statment .=  " and mat_id in (
                                SELECT DISTINCT matbom_mat_id 
                                from vwc_mst_material_map_bom_combined 
                                where deleted_at is null  and ".$column." in (".$ids.")) ";
                        }
                        else {
                            $ids = implode(',', $this->$from);
                            $statment .= ' and mat_id in ( select matattrib_mat_id FROM mst_material_map_attribs WHERE deleted_at is null and 
        matattrib_attrib_id = ' . $key . ' and matattrib_attrib_table_id in (' . $ids . ') )';
                        }
                    }
                }
            }
            foreach ($singleData as $key => $sd) {
                if (in_array($key, [22, 25, 26, 27])) {
                    $c = "'";
                }
                if (count($sd) > 4) {
                    $from = $sd[0];
                    $to = $sd[1];
                    $column = $sd[2];
                    $col_from = $sd[3];
                    $col_to = $sd[4];
                    if ($this->$from && $this->$to) {
                        $counter++;
                        $statment .=  ' and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and         
                        matattrib_attrib_id = ' . $key . ' and ' . $column . ' between ' . $c . $this->$from . $c . ' and ' . $c . $this->$to . $c . ' ) ';
                    } elseif ($this->$from) {
                        $counter++;
                        $statment .=  ' and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and 
                    matattrib_attrib_id = ' . $key . ' and ' . $column . ' between ' . $c . $this->$from . $c . ' and ' . $col_to . ' ) ';
                    } elseif ($this->$to) {
                        $counter++;
                        $statment .=  ' and mat_id in ( select matattrib_mat_id from mst_material_map_attribs where deleted_at is null and 
                    matattrib_attrib_id = ' . $key . ' and ' . $column . ' between ' . $c . $col_from . $c . ' and ' . $this->$to . ' ) ';
                    }
                } else {
                    $from = $sd[0];
                    $column = $sd[1];
                    if ($this->$from) {
                    }
                }
            }

            foreach ($lbww as $key => $sd) {

                $from = $sd[0];
                $to = $sd[1];
                $column = $sd[2];
                $col_from = $sd[3];
                $col_to = $sd[4];
                if ($key <= 3 || $key == 9) {
                    if ($this->$from && $this->$to) {

                        if ($key == 9) {
                            $counter++;
                            $statment .=  " and mat_id in (
                            SELECT DISTINCT matbom_mat_id 
                            from vwc_mst_material_map_bom_combined 
                            where deleted_at is null  and matbom_mat_id_material in 
                            ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                    where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $this->$to . " )  and matbom_mattype_id = 5
                         ) ";
                            if (isset($this->bom_symbol['bom_dia_design_length']) && $this->bom_symbol['bom_dia_design_length'] == true) {
                            } else {
                                $statment .=  " and mat_id not in (
                                SELECT DISTINCT matbom_mat_id 
                                from vwc_mst_material_map_bom_combined 
                                where deleted_at is null  and matbom_mat_id_material in 
                                ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                        where a.deleted_at is null and " . $column . " not between " . $this->$from . " and " . $this->$to . " )  and matbom_mattype_id = 5
                             ) ";
                                $statment .=  " and mat_id not in (
                                SELECT DISTINCT matbom_mat_id 
                                from vwc_mst_material_map_bom_combined 
                                where deleted_at is null and matbom_mat_id_material in 
                                ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                        where a.deleted_at is null and csstnsize_length not between " . $this->$from . " and " . $this->$to . " )   and matbom_mattype_id = 6
                             ) ";
                            }
                        } else {
                            $counter++;
                            $statment .=  " and mat_id in (
                            SELECT DISTINCT matbom_mat_id 
                            from vwc_mst_material_map_bom_combined 
                            where deleted_at is null  and matbom_mat_id_material in 
                            ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                    where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $this->$to . " )  and matbom_mattype_id = 5 and isnull(matbom_iscenter,0)=1
                         ) ";
                        }
                    } elseif ($this->$from) {
                        $counter++;
                        $statment .=  " and mat_id in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $col_to . " )  and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 5
                     ) ";
                    } elseif ($this->$to) {
                        $counter++;
                        $statment .=  " and mat_id in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null  and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                where a.deleted_at is null and " . $column . " between " . $col_from . " and " . $this->$to . " )  and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 5
                     ) ";
                    }
                } elseif ($key <= 6 || $key == 10) {
                    if ($this->$from && $this->$to) {
                        if ($key == 10) {
                            $counter++;
                            $statment .=  " and mat_id in (
                            SELECT DISTINCT matbom_mat_id 
                            from vwc_mst_material_map_bom_combined 
                            where deleted_at is null and matbom_mat_id_material in 
                            ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                    where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $this->$to . " )   and matbom_mattype_id = 6
                         ) ";

                            if (isset($this->bom_symbol['cs_dia_design_length']) && $this->bom_symbol['cs_dia_design_length'] == true) {
                            } else {
                                $statment .=  " and mat_id not in (
                                SELECT DISTINCT matbom_mat_id 
                                from vwc_mst_material_map_bom_combined 
                                where deleted_at is null and matbom_mat_id_material in 
                                ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                        where a.deleted_at is null and " . $column . " not between " . $this->$from . " and " . $this->$to . " )   and matbom_mattype_id = 6
                             ) ";
                            //     $statment .=  " and mat_id not in (
                            //     SELECT DISTINCT matbom_mat_id 
                            //     from vwc_mst_material_map_bom_combined 
                            //     where deleted_at is null  and matbom_mat_id_material in 
                            //     ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                            //             where a.deleted_at is null and diastnsize_length not between " . $this->$from . " and " . $this->$to . " )  and matbom_mattype_id = 5
                            //  ) ";
                            }
                        } else {
                            $counter++;
                            $statment .=  " and mat_id in (
                            SELECT DISTINCT matbom_mat_id 
                            from vwc_mst_material_map_bom_combined 
                            where deleted_at is null and matbom_mat_id_material in 
                            ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                    where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $this->$to . " )  and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 6
                         ) ";
                        }
                    } elseif ($this->$from) {
                        $counter++;
                        $statment .=  " and mat_id in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $col_to . " )  and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 6
                     ) ";
                    } elseif ($this->$to) {
                        $counter++;
                        $statment .=  " and mat_id in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                where a.deleted_at is null and " . $column . " between " . $col_from . " and " . $this->$to . " ) and isnull(matbom_iscenter,0)=1 and matbom_mattype_id = 6
                     ) ";
                    }
                } elseif ($key <= 8 || $key == 11 || $key == 12) {
                    $isCenter = 1;
                    if ($key == 11 || $key == 12) {
                        $isCenter = 0;
                    }
                    if ($this->$from && $this->$to) {
                        $counter++;
                        $statment .=  " and mat_id in (SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_iscenter = " . $isCenter . " and matbom_mattype_id = " . $column .  " 
                        group by matbom_mat_id 
                        having sum(isnull(matbom_primary_wt,0)) between " . $this->$from . " and " . $this->$to . " ) ";
                    } elseif ($this->$from) {
                        $counter++;
                        $statment .=  " and mat_id in (SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_iscenter = " . $isCenter . " and matbom_mattype_id = " . $column .  " 
                        group by matbom_mat_id 
                        having sum(isnull(matbom_primary_wt,0)) between " . $this->$from . " and " . $col_to . " ) ";
                    } elseif ($this->$to) {
                        $counter++;
                        $statment .=  " and mat_id in (SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_iscenter = " . $isCenter . " and matbom_mattype_id = " . $column .  " 
                        group by matbom_mat_id 
                        having sum(isnull(matbom_primary_wt,0)) between " . $col_from . " and " . $this->$to . " ) ";
                    }
                } elseif ($key == 13) {
                    if ($this->$from && $this->$to) {
                        $counter++;
                        $statment .=  " and mat_id in (
                            SELECT DISTINCT matbom_mat_id 
                            from vwc_mst_material_map_bom_combined 
                            where deleted_at is null and matbom_mat_id_material in 
                            ( select matext_mat_id from mst_finding_sizes  as a inner join mst_material_exts as b on b.matext_findsize_id = a.findsize_id
                                    where a.deleted_at is null and " . $column . " between " . $this->$from . " and " . $this->$to . " )   and matbom_mattype_id = 7
                         ) ";
                        if (isset($this->bom_symbol['bom_fnd_design_length_from']) && $this->bom_symbol['bom_fnd_design_length_to'] == true) {
                        } else {
                            $statment .=  " and mat_id not in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                                where a.deleted_at is null )  and matbom_mattype_id = 6
                     ) ";
                            $statment .=  " and mat_id not in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null  and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                where a.deleted_at is null)  and matbom_mattype_id = 5
                     ) ";
                        }
                    }
                }
            }
            if ($this->centerStone) {
                $counter++;
                $statment .= 'and mat_id in(select distinct a.matbom_mat_id from vwc_mst_material_map_bom_combined as a where deleted_at is null and isnull(matbom_iscenter,0)=1)';
            }

            if ($this->pointer == 'P' || $this->pointer == 'X') {
                $counter++;
                $statment .= "and mat_id in(SELECT DISTINCT matbom_mat_id 
                from vwc_mst_material_map_bom_combined 
                where deleted_at is null and matbom_mat_id_material in ( select matext_mat_id from mst_material_exts where deleted_at is null and matext_ispointer = '" . $this->pointer . "' ) )";
            }
            if ($this->multi_color) {
                $counter++;
                $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 48 and matattrib_attrib_bit = ' . $this->multi_color . ')';
            }
            // if ($this->introducedInMonth) {
            //     $counter++;
            //     $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 34 and matattrib_attrib_number = ' . $this->introducedInMonth . ')';
            // }
            // if ($this->introducedInYear) {
            //     $counter++;
            //     $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 33 and matattrib_attrib_number = ' . $this->introducedInYear . ')';
            // }
            if ($this->eventFrom) {
                $counter++;
                $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 16 and matattrib_attrib_table_id = ' . $this->eventFrom . ')';
            }
            if ($this->eventTo) {
                $counter++;
                $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 17 and matattrib_attrib_table_id = ' . $this->eventTo . ')';
            }
            if ($this->customerExclusive) {
                $counter++;
                $statment .= 'and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 21 and matattrib_attrib_bit = ' . $this->customerExclusive . ')';
            }
            if ($this->exclusiveTillDateFrom && $this->exclusiveTillDateTo) {
                $counter++;
                $statment .= "and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 22 
                and matattrib_attrib_date between '" . $this->exclusiveTillDateFrom . "' and '" . $this->exclusiveTillDateFrom . "')";
            }
            if ($this->introduce_from && $this->introduce_to) {
                $counter++;
                $statment .= "and mat_id in(select distinct matsty_mat_id from mst_material_styles where deleted_at is null
                and matsty_introduce_date between '" . $this->introduce_from . "' and '" . $this->introduce_to . "')";
            }
            if ($this->shank_width) {
                $counter++;
                $statment .= "and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 49 and matattrib_attrib_text like '%" . $this->shank_width . "%')";
            }
            if ($this->design_length) {
                $counter++;
                $statment .= "and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 46 and matattrib_attrib_text like '%" . $this->design_length . "%')";
            }
            if ($this->design_breadth) {
                $counter++;
                $statment .= "and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 47 and matattrib_attrib_text like '%" . $this->design_breadth . "%')";
            }
            if ($this->design_width) {
                $counter++;
                $statment .= "and mat_id in(select distinct matattrib_mat_id from mst_material_map_attribs where deleted_at is null and matattrib_attrib_id = 48 and matattrib_attrib_text like '%" . $this->design_width . "%')";
            }
            if ($this->bom_special_effect_id) {
                $s_ids = implode(",", $this->bom_special_effect_id);
                $counter++;
                $statment .= "and mat_id in(select distinct matbom_mat_id from vwc_mst_material_map_bom_combined where matbom_mattype_id = 8 and matbom_mat_id_material in (" . $s_ids . "))";
            }
            if ($this->model_process_id) {
                $model_process_ids = implode(",", $this->model_process_id);
                $counter++;
                $statment .= "and mat_id in(select distinct matsty_mat_id from mst_material_styles where deleted_at is null and matsty_pdmodelproc_id in (" . $model_process_ids . "))";
            }


            if (count($this->dia_conditions) > 0) {
                $counter++;

                $ctr = 1;
                foreach ($this->dia_conditions as $con) {
                    if ($ctr != 1) {
                        $not_in .= "," . $con['shape_id'];
                    } else {
                        $not_in .= $con['shape_id'];
                    }
                    $statment .=  " and mat_id in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null  and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                where  b.matext_diastnshape_id IN(" . $con['shape_id'] . ") AND a.deleted_at is null ";
                    if ($con['size_from'] && $con['size_to']) {
                        $statment .=  "   and diastnsize_length between " . $con['size_from'] . " and " . $con['size_to'] . "  ";
                    }
                    $statment .=  " ) and matbom_mattype_id = 5 group by matbom_mat_id ";
                    if ($con['pcs_from'] && $con['pcs_to']) {
                        $statment .= " having sum(isnull(matbom_secondary_wt,0)) between " . $con['pcs_from'] . " and " . $con['pcs_to'];
                    }
                    if ($con['wt_from'] && $con['wt_to']) {
                        if ($con['pcs_from'] && $con['pcs_to']) {
                            $statment .= " and sum(isnull(matbom_primary_wt,0))  between " . $con['wt_from'] . " and " . $con['wt_to'];
                        } else {
                            $statment .= " having sum(isnull(matbom_primary_wt,0))  between " . $con['wt_from'] . " and " . $con['wt_to'];
                        }
                    }
                    $statment .= " ) ";

                    $statment .=  " and mat_id not in (
                        SELECT DISTINCT matbom_mat_id 
                        from vwc_mst_material_map_bom_combined 
                        where deleted_at is null  and matbom_mat_id_material in 
                        ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                                where b.matext_diastnshape_id IN(" . $con['shape_id'] . ") AND a.deleted_at is null ";
                    if ($con['size_from'] && $con['size_to']) {
                        $statment .=  "   and diastnsize_length not between " . $con['size_from'] . " and " . $con['size_to']  . "  ";
                    }
                    $statment .=  " ) and matbom_mattype_id = 5 group by matbom_mat_id ";
                    if ($con['pcs_from'] && $con['pcs_to']) {
                        $statment .= " having sum(isnull(matbom_secondary_wt,0)) not between " . $con['pcs_from'] . " and " . $con['pcs_to'];
                    }
                    if ($con['wt_from'] && $con['wt_to']) {
                        if ($con['pcs_from'] && $con['pcs_to']) {
                            $statment .= " and sum(isnull(matbom_primary_wt,0)) not  between " . $con['wt_from'] . " and " . $con['wt_to'];
                        } else {
                            $statment .= " having sum(isnull(matbom_primary_wt,0)) not  between " . $con['wt_from'] . " and " . $con['wt_to'];
                        }
                    }
                    $statment .=  " ) ";
                    $ctr++;
                }
                // dd($not_in);
                $statment .=  " and mat_id not in (
                    SELECT DISTINCT matbom_mat_id 
                    from vwc_mst_material_map_bom_combined 
                    where deleted_at is null  and matbom_mat_id_material in 
                    ( select matext_mat_id from mst_dia_stone_sizes as a inner join mst_material_exts as b on b.matext_diastnsize_id = a.diastnsize_id
                            where b.matext_diastnshape_id not IN(" . $not_in . ") AND a.deleted_at is null )";

                $statment .=  " ) ";
                $statment .=  " and mat_id not in (
                    SELECT DISTINCT matbom_mat_id 
                    from vwc_mst_material_map_bom_combined 
                    where deleted_at is null and matbom_mat_id_material in 
                    ( select matext_mat_id from mst_cs_stone_sizes  as a inner join mst_material_exts as b on b.matext_csstnsize_id = a.csstnsize_id
                            where   a.deleted_at is null  )   and matbom_mattype_id = 6
                 ) ";
            }

            // $user = User::find(Auth::user()->id)->emp;
            // if (!$this->allDesign || $user->emp_issales_person) {
            //     $statment .= ' and mat_id in (select matsty_mat_id from mst_material_styles where isnull(matsty_sample_design,0) = 1 ) ';
            // }
            $statment .= "and mat_allow_model_search = 1";
            if ($this->dia_cs) {
                $counter++;
                $statment .=  " and mat_id in (
                    select matbom_mat_id
					FROM (
					select matbom_mat_id, 
                    sum((case when matbom_mattype_id = 6 then 1 else 0 end )) HasCS,
					sum((case when matbom_mattype_id = 5 then 1 else 0 end )) HasDia
					from vwc_mst_material_map_bom_combined where deleted_at is null and ( matbom_mattype_id = 6 or matbom_mattype_id = 5 )
					group by matbom_mat_id
					) A1
					WHERE ( case when A1.HasCS > 0 and  A1.HasDia > 0 THEN 1 ELSE 0 END ) = 1

                 ) ";
            }
            if ($this->dia_only) {
                $counter++;
                $statment .=  " and mat_id in (
                    select matbom_mat_id
					FROM (
					select matbom_mat_id, 
                    sum((case when matbom_mattype_id = 6 then 1 else 0 end )) HasCS,
					sum((case when matbom_mattype_id = 5 then 1 else 0 end )) HasDia
					from vwc_mst_material_map_bom_combined where deleted_at is null and ( matbom_mattype_id = 6 or matbom_mattype_id = 5 )
					group by matbom_mat_id
					) A1
					WHERE ( case when A1.HasCS = 0 and  A1.HasDia > 0 THEN 1 ELSE 0 END ) = 1

                 ) ";
            }
            if ($this->output_category_id) {
                $statment .= "and mat_pctg_id = " . $this->output_category_id;
            }
            if ($this->bulkstyle) {
                $data = stringToArray($this->bulkstyle);
                $string = implode("','", $data);
                $styles = "'" . $string . "'";

                $counter++;
                $statment .=  " and mat_code in (" . $styles . ") ";
            }
            $statment .= '  ) order by mat_code asc';
            $this->query = $statment;
            
        }
    }

    
   
    public function hydrate()
    {
        $this->dispatchBrowserEvent('loadContactDeviceSelect2');
    }

 
    public function concepts()
    {
        
        return Cache::remember('concepts', 60, function () {
            return Concept::all(['con_id', 'con_code', 'con_name']);
        });
    }

    public function designusps()
    {
        
        return Cache::remember('designusps', 60, function () {
            return DesignUsp::orderBy('usp_desc', 'asc')->get(['usp_id', 'usp_code', 'usp_desc']);
        });
    }

    public function customers()
    {
        
        return Cache::remember('customers', 60, function () {
            return CustomerMst::all(['cust_id', 'cust_code', 'cust_name']);
        });
    }
    public function metalPurities()
    {
       
        return Cache::remember('metalPurities', 60, function () {
            return MetalPurity::all(['metpur_id', 'metpur_code', 'metpur_description']);
        });
    }
    public function stoneSettingTypes()
    {
        
        return Cache::remember('stoneSettingTypes', 60, function () {
            return MstStoneSettingType::all(['stnsettingtype_id', 'stnsettingtype_code', 'stnsettingtype_desc']);
        });
    }

    public function stoneSettingSubTypes()
    {        $cacheKey = 'stoneSettingSubTypes_' . implode('_', $this->main_setting_ids);
        return Cache::remember($cacheKey, 60, function () {
            return MstStoneSettingSubType::when(count($this->main_setting_ids)>0,function($q){
                $q->whereIn('stnsettingsubtype_stnsettingtype_id',$this->main_setting_ids);
            })
            ->get(['stnsettingsubtype_id', 'stnsettingsubtype_code', 'stnsettingsubtype_desc']);
        });
       
       
    }

    public function csStoneNames()
    {
        
        return Cache::remember('csStoneNames', 60, function () {
            return MstCsStoneName::all(['csstnname_id', 'csstnname_code', 'csstnname_name']);
        });
    }

    public function diaStoneShapes()
    {
        
        return Cache::remember('diaStoneShapes', 60, function () {
            return MstDiaStoneShape::all(['diastnshape_id', 'diastnshape_code', 'diastnshape_name']);
        });
    }

    public function csStoneShapes()
    {
        
        return Cache::remember('csStoneShapes', 60, function () {
            return MstCsStoneShape::all(['csstnshape_id', 'csstnshape_code', 'csstnshape_name']);
        });
    }

    public function occasions()
    {
       
        return Cache::remember('occasions', 60, function () {
            return Occasion::all(['occa_id', 'occa_name', 'occa_description']);
        });
    }

    public function inspirations()
    {
        // return MstInspiration::all(['inspirn_id', 'inspirn_code', 'inspirn_desc']);
        return Cache::remember('inspirations', 60, function () {
            return MstInspiration::all(['inspirn_id', 'inspirn_code', 'inspirn_desc']);
        });
    }

    public function targetaudiances()
    {
        // return MstTargetaudiance::all(['targaudin_id', 'targaudin_code', 'targaudin_desc']);
        return Cache::remember('targetaudiances', 60, function () {
            return MstTargetaudiance::all(['targaudin_id', 'targaudin_code', 'targaudin_desc']);
        });
    }

    public function designlooks()
    {
        // return MstDesignlook::all(['dsgnlook_id', 'dsgnlook_code', 'dsgnlook_desc']);
        return Cache::remember('designlooks', 60, function () {
            return MstDesignlook::all(['dsgnlook_id', 'dsgnlook_code', 'dsgnlook_desc']);
        });
    }

    public function regions()
    {
        // return MarketMst::all(['mkt_id', 'mkt_code', 'mkt_name']);
        return Cache::remember('regions', 60, function () {
            return MarketMst::all(['mkt_id', 'mkt_code', 'mkt_name']);
        });
    }

    // public function themeconcepts()
    // {
    //     return Concept::all(['con_id', 'con_code', 'con_name']);
    // }

    public function settconcepts()
    {
        // return MstSettingconcept::all(['settingcon_id', 'settingcon_code', 'settingcon_desc']);
        return Cache::remember('settconcepts', 60, function () {
            return MstSettingconcept::all(['settingcon_id', 'settingcon_code', 'settingcon_desc']);
        });
    }

    public function religions()
    {
        // return MstReligion::all(['religion_id', 'religion_code', 'religion_desc']);
        return Cache::remember('religions', 60, function () {
            return MstReligion::all(['religion_id', 'religion_code', 'religion_desc']);
        });
    }

    public function charactershapes()
    {
        // return MstCharactershape::all(['charshp_id', 'charshp_code', 'charshp_desc']);
        return Cache::remember('charactershapes', 60, function () {
            return MstCharactershape::all(['charshp_id', 'charshp_code', 'charshp_desc']);
        });
    }
    public function categoryChange($data)
    {
        $this->category_ids = $data;
    }
    public function stoneMainSettingChange($data)
    {
        
        $this->main_setting_ids = $data;
        $this->stoneSettingSubTypes();
    }

    public function metalTypeChange($data)
    {
        $this->bom_metal_type_id = $data;
    }

    public function csTypeChange($data)
    {
        $this->cs_stone_type_ids = $data;
    }

    public function fndTypeChange($data)
    {
        $this->bom_finding_type_id = $data;
    }


    public function prodsizechartdets()
    {
        $cacheKey = 'prodsizechartdets_' . implode('_', $this->category_ids);
        return Cache::remember($cacheKey, 60, function () {
            return ProdSizeChartDetMst::where('prodsize_prodsizechart_id', 10)->when(count($this->category_ids) > 0, function ($q) {
                $q->whereIn('prodsize_pctg_id', $this->category_ids);
            })->get(['prodsize_id', 'prodsize_pctg_id', 'prodsize_code']);
        });
    }

    public function specialeffects()
    {
        // return MstMaterial::where('mat_mattype_id', 8)->get(['mat_id', 'mat_code', 'mat_desc']);
        // return MstMaterialEffect::all();
        return Cache::remember('MstMaterialEffect', 60, function () {
            return MstMaterialEffect::all();
        });
    }

    public function catalogues()
    {
        // return MstCatalogue::all(['catlog_id', 'catlog_code', 'catlog_desc']);
        return Cache::remember('MstCatalogue', 60, function () {
            // return MstCatalogue::all(['catlog_id', 'catlog_code', 'catlog_desc']);
            return MstCatalogue::whereIn('catlog_catlogtype_id',[380,382])->get();
        });
    }
    public function classifications()
    {
        // return MstMaterialClassification::get(['matclass_id', 'matclass_code', 'matclass_desc']);
        return Cache::remember('MstMaterialClassification', 60, function () {
            return MstMaterialClassification::get(['matclass_id', 'matclass_code', 'matclass_desc']);
        });

    }
    public function metalTypes()
    {
        // return MstMetalType::all();
        return Cache::remember('MstMetalType', 60, function () {
            return MstMetalType::all();
        });
    }
    public function modelProcesses()
    {
        // return PdModelProcessMst::all();
       return Cache::remember('PdModelProcessMst', 60, function () {
            return PdModelProcessMst::all();
        });
    }

    public function designKnowns()
    {
        // return MstsMaterialDesignKnownAs::all();
        return Cache::remember('MstsMaterialDesignKnownAs', 60, function () {
            return MstsMaterialDesignKnownAs::all();
        });
    }
    public function mount()
    {
        $this->boms = new Collection();
    }
    private function getEvents()
    {
        return Cache::remember('events', 60, function () {
            return MstEvent::all();
        });
    }

    private function getEventYears()
    {
        return Cache::remember('eventYears', 60, function () {
            return Year::all();
        });
    }

    private function getBomMetalPurities()
{
    $cacheKey = 'bomMetalPurities_' . implode('_', $this->bom_metal_type_id);

    return Cache::remember($cacheKey, 60, function () {
        return MstMetalPurity::when(count($this->bom_metal_type_id) > 0, function ($q) {
            return $q->whereIn('metpur_mettyp_id', $this->bom_metal_type_id);
        })->get();
    });
}


    private function getBomMetalColors()
    {
        return Cache::remember('bomMetalColors', 60, function () {
            return MstMetalColor::all();
        });
    }

    private function getBomAlloyCategories()
    {
        return Cache::remember('bomAlloyCategories', 60, function () {
            return AlloyCategory::all();
        });
    }

    private function getBomDiaTypes()
    {
        return Cache::remember('bomDiaTypes', 60, function () {
            return MstDiaStoneType::all();
        });
    }

    private function getBomDiaShapes()
    {
        return Cache::remember('bomDiaShapes', 60, function () {
            return MstDiaStoneShape::all();
        });
    }

    private function getBomDiaColors()
    {
        return Cache::remember('bomDiaColors', 60, function () {
            return MstDiaStoneColor::all();
        });
    }

    private function getBomDiaGroupSizes()
    {
        return Cache::remember('bomDiaGroupSizes', 60, function () {
            return MstDiaStoneSizeGroup::with('shape')->get();
        });
    }

    private function getBomDiaSizes()
    {
        return Cache::remember('bomDiaSizes', 60, function () {
            return MstDiaStoneSize::all();
        });
    }

    private function getBomCsTypes()
    {
        return Cache::remember('bomCsTypes', 60, function () {
            return MstCsStoneType::all();
        });
    }

    private function getBomCsNames()
    {
        $cacheKey = 'bomCsNames_' . implode('_', $this->bom_cs_type_id);
    
        return Cache::remember($cacheKey, 60, function () {
            return MstCsStoneName::when(count($this->bom_cs_type_id) > 0, function ($q) {
                $ids = MstCsStoneTypeMapCsStoneName::whereIn('csstntype_id', $this->bom_cs_type_id)->pluck('csstnname_id');
                return $q->whereIn('csstnname_id', $ids);
            })->get();
        });
    }
    

    private function getBomCsShapes()
    {
        return Cache::remember('bomCsShapes', 60, function () {
            return MstCsStoneShape::all();
        });
    }

    private function getBomCsColors()
    {
        return Cache::remember('bomCsColors', 60, function () {
            return MstCsStoneColor::all();
        });
    }

    private function getBomCsSizes()
    {
        return Cache::remember('bomCsSizes', 60, function () {
            return MstCsStoneSize::all();
        });
    }

    private function getBomFindingTypes()
    {
        return Cache::remember('bomFindingTypes', 60, function () {
            return MstFindingCtg::all();
        });
    }

    private function getBomFindingSubCtgs()
{
    $cacheKey = 'bomFindingSubCtgs_' . implode('_', $this->bom_finding_type_id);

    return Cache::remember($cacheKey, 60, function () {
        return MstFindingSubCtg::when(count($this->bom_finding_type_id) > 0, function ($q) {
            return $q->whereIn('findsctg_findctg_id', $this->bom_finding_type_id);
        })->get();
    });
}


    private function getCategories()
    {
        return Cache::remember('categories', 60, function () {
            return ProdCtgMst::all(['pctg_id', 'pctg_desc']);
        });
    }

    private function getStoneSettingSubTypes()
{
    $cacheKey = 'stoneSettingSubTypes_' . implode('_', $this->main_setting_ids);

    return Cache::remember($cacheKey, 60, function () {
        return MstStoneSettingSubType::when(count($this->main_setting_ids) > 0, function ($q) {
            $q->whereIn('stnsettingsubtype_stnsettingtype_id', $this->main_setting_ids);
        })->get(['stnsettingsubtype_id', 'stnsettingsubtype_code', 'stnsettingsubtype_desc']);
    });
}


    private function getSubCategories()
    {
        $cacheKey = 'subCategories_' . implode('_', $this->category_ids);
    
        return Cache::remember($cacheKey, 60, function () {
            return ProdSubCtgMst::with(['category'])->when(count($this->category_ids) > 0, function ($q) {
                return $q->whereIn('psctg_pctg_id', $this->category_ids);
            })->get();
        });
    }
    

    private function getImageViews()
    {
        return Cache::remember('imageViews', 60, function () {
            return MstImageView::all();
        });
    }

    private function getYears()
    {
        return Cache::remember('years', 60, function () {
            return Year::orderBy('yr_id', 'desc')->get();
        });
    }

    public function render()
    {
       

        return view('livewire.master.pd-search-component', [
            'prodsizechartdets' => $this->prodsizechartdets(),
            'modelProcesses' => $this->modelProcesses(),
            'designKnowns' => $this->designKnowns(),
            'events' => $this->getEvents(),
            'eventYears' => $this->getEventYears(),
            'bomMetalPurities' => $this->getBomMetalPurities(),
            'bomMetalColors' => $this->getBomMetalColors(),
            'bomAlloyCategories' => $this->getBomAlloyCategories(),
            'bomspecialeffects' => $this->specialeffects(),
            'bomDiaTypes' => $this->getBomDiaTypes(),
            'bomDiaShapes' => $this->getBomDiaShapes(),
            'bomDiaColors' => $this->getBomDiaColors(),
            'bomDiaGroupSizes' => $this->getBomDiaGroupSizes(),
            'bomDiaSizes' => $this->getBomDiaSizes(),
            'bomCsTypes' => $this->getBomCsTypes(),
            'bomCsNames' => $this->getBomCsNames(),
            'bomCsShapes' => $this->getBomCsShapes(),
            'bomCsColors' => $this->getBomCsColors(),
            'bomCsSizes' => $this->getBomCsSizes(),
            'bomFindingTypes' => $this->getBomFindingTypes(),
            'bomFindingSubCtgs' => $this->getBomFindingSubCtgs(),
            'categories' => $this->getCategories(),
            'concepts' => $this->concepts(),
            'customers' => $this->customers(),
            'metalPurities' => $this->metalPurities(),
            'stoneSettingTypes' => $this->stoneSettingTypes(),
            'stoneSettingSubTypes' => $this->getStoneSettingSubTypes(),
            'csStoneNames' => $this->csStoneNames(),
            'diaStoneShapes' => $this->diaStoneShapes(),
            'csStoneShapes' => $this->csStoneShapes(),
            'occasions' => $this->occasions(),
            'inspirations' => $this->inspirations(),
            'targetaudiances' => $this->targetaudiances(),
            'designlooks' => $this->designlooks(),
            'regions' => $this->regions(),
            'settconcepts' => $this->settconcepts(),
            'religions' => $this->religions(),
            'charactershapes' => $this->charactershapes(),
            'specialeffects' => $this->specialeffects(),
            'catalogues' => $this->catalogues(),
            'classifications' => $this->classifications(),
            'designusps' => $this->designusps(),
            'subCategories' => $this->getSubCategories(),
            // 'style' => $this->report(),
            'imageViews' => $this->getImageViews(),
            'years' => $this->getYears(),
            'bomMetalTypes' => $this->metalTypes(),
        ]);
    }
}

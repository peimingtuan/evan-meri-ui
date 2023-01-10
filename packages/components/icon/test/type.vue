<template>
  <span class="item" v-for="item in icons" :key="item.icon_id"
    ><m-icon :type="item.font_class"></m-icon>
    <span class="name" v-text="item.name"></span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const icons = [
    {
      "icon_id": "26993124",
      "name": "IconUp",
      "font_class": "IconUp",
      "unicode": "e6f1",
      "unicode_decimal": 59121
    },
    {
      "icon_id": "26464950",
      "name": "IconTransfer",
      "font_class": "IconTransfer",
      "unicode": "e6e9",
      "unicode_decimal": 59113
    },
    {
      "icon_id": "26464665",
      "name": "IconEdit",
      "font_class": "IconEdit",
      "unicode": "e6e1",
      "unicode_decimal": 59105
    },
    {
      "icon_id": "26459778",
      "name": "IconAnalysis",
      "font_class": "IconAnalysis1",
      "unicode": "e71b",
      "unicode_decimal": 59163
    },
    {
      "icon_id": "26459779",
      "name": "IconMonitor",
      "font_class": "IconMonitor2",
      "unicode": "e71c",
      "unicode_decimal": 59164
    },
    {
      "icon_id": "26459504",
      "name": "IconStrategy",
      "font_class": "IconStrategy",
      "unicode": "e70f",
      "unicode_decimal": 59151
    },
    {
      "icon_id": "26459505",
      "name": "IconYearerlier",
      "font_class": "IconYearerlier",
      "unicode": "e710",
      "unicode_decimal": 59152
    },
    {
      "icon_id": "26459506",
      "name": "IconReply",
      "font_class": "IconReply1",
      "unicode": "e711",
      "unicode_decimal": 59153
    },
    {
      "icon_id": "26459507",
      "name": "IconRelation",
      "font_class": "IconRelation",
      "unicode": "e712",
      "unicode_decimal": 59154
    },
    {
      "icon_id": "26459508",
      "name": "IconSubitem",
      "font_class": "IconSubitem",
      "unicode": "e713",
      "unicode_decimal": 59155
    },
    {
      "icon_id": "26459509",
      "name": "IconWarningPolice",
      "font_class": "IconWarningPolice",
      "unicode": "e714",
      "unicode_decimal": 59156
    },
    {
      "icon_id": "26459510",
      "name": "IconAudit",
      "font_class": "IconAudit",
      "unicode": "e715",
      "unicode_decimal": 59157
    },
    {
      "icon_id": "26459511",
      "name": "IconWeather",
      "font_class": "IconWeather",
      "unicode": "e716",
      "unicode_decimal": 59158
    },
    {
      "icon_id": "26459512",
      "name": "IconFastforward",
      "font_class": "IconFastforward1",
      "unicode": "e717",
      "unicode_decimal": 59159
    },
    {
      "icon_id": "26459513",
      "name": "IconTimetable",
      "font_class": "IconTimetable",
      "unicode": "e718",
      "unicode_decimal": 59160
    },
    {
      "icon_id": "26459514",
      "name": "IconOverview",
      "font_class": "IconOverview",
      "unicode": "e719",
      "unicode_decimal": 59161
    },
    {
      "icon_id": "26459515",
      "name": "IconPolice",
      "font_class": "IconPolice",
      "unicode": "e71a",
      "unicode_decimal": 59162
    },
    {
      "icon_id": "26459266",
      "name": "IconStart",
      "font_class": "IconStart",
      "unicode": "e6e2",
      "unicode_decimal": 59106
    },
    {
      "icon_id": "26459267",
      "name": "IconUnlock",
      "font_class": "IconUnlock",
      "unicode": "e6e3",
      "unicode_decimal": 59107
    },
    {
      "icon_id": "26459268",
      "name": "IconTopping",
      "font_class": "IconTopping",
      "unicode": "e6e4",
      "unicode_decimal": 59108
    },
    {
      "icon_id": "26459269",
      "name": "IconTick",
      "font_class": "IconTick",
      "unicode": "e6e5",
      "unicode_decimal": 59109
    },
    {
      "icon_id": "26459270",
      "name": "IconUpload",
      "font_class": "IconUpload",
      "unicode": "e6e6",
      "unicode_decimal": 59110
    },
    {
      "icon_id": "26459271",
      "name": "IconReply",
      "font_class": "IconReply",
      "unicode": "e6e7",
      "unicode_decimal": 59111
    },
    {
      "icon_id": "26459272",
      "name": "IconPreservation",
      "font_class": "IconPreservation",
      "unicode": "e6e8",
      "unicode_decimal": 59112
    },
    {
      "icon_id": "26459274",
      "name": "IconTips",
      "font_class": "IconTips",
      "unicode": "e6ea",
      "unicode_decimal": 59114
    },
    {
      "icon_id": "26459275",
      "name": "IconPosition",
      "font_class": "IconPosition",
      "unicode": "e6eb",
      "unicode_decimal": 59115
    },
    {
      "icon_id": "26459276",
      "name": "IconReturn",
      "font_class": "IconReturn",
      "unicode": "e6ec",
      "unicode_decimal": 59116
    },
    {
      "icon_id": "26459277",
      "name": "IconScreen",
      "font_class": "IconScreen",
      "unicode": "e6ed",
      "unicode_decimal": 59117
    },
    {
      "icon_id": "26459278",
      "name": "IconVoice",
      "font_class": "IconVoice",
      "unicode": "e6ee",
      "unicode_decimal": 59118
    },
    {
      "icon_id": "26459279",
      "name": "IconRevoke",
      "font_class": "IconRevoke",
      "unicode": "e6ef",
      "unicode_decimal": 59119
    },
    {
      "icon_id": "26459280",
      "name": "IconStop",
      "font_class": "IconStop",
      "unicode": "e6f0",
      "unicode_decimal": 59120
    },
    {
      "icon_id": "26459475",
      "name": "IconCalendar",
      "font_class": "IconCalendar",
      "unicode": "e6f2",
      "unicode_decimal": 59122
    },
    {
      "icon_id": "26459476",
      "name": "IconAssign",
      "font_class": "IconAssign",
      "unicode": "e6f3",
      "unicode_decimal": 59123
    },
    {
      "icon_id": "26459477",
      "name": "IconComplaint",
      "font_class": "IconComplaint",
      "unicode": "e6f4",
      "unicode_decimal": 59124
    },
    {
      "icon_id": "26459478",
      "name": "IconApply",
      "font_class": "IconApply",
      "unicode": "e6f5",
      "unicode_decimal": 59125
    },
    {
      "icon_id": "26459479",
      "name": "IconAdministration",
      "font_class": "IconAdministration",
      "unicode": "e6f6",
      "unicode_decimal": 59126
    },
    {
      "icon_id": "26459480",
      "name": "IconDistribution",
      "font_class": "IconDistribution",
      "unicode": "e6f7",
      "unicode_decimal": 59127
    },
    {
      "icon_id": "26459481",
      "name": "IconEvaluationExecutor",
      "font_class": "IconEvaluationExecutor",
      "unicode": "e6f8",
      "unicode_decimal": 59128
    },
    {
      "icon_id": "26459482",
      "name": "IconElevator",
      "font_class": "IconElevator",
      "unicode": "e6f9",
      "unicode_decimal": 59129
    },
    {
      "icon_id": "26459483",
      "name": "IconCost",
      "font_class": "IconCost",
      "unicode": "e6fa",
      "unicode_decimal": 59130
    },
    {
      "icon_id": "26459484",
      "name": "IconFunction",
      "font_class": "IconFunction",
      "unicode": "e6fb",
      "unicode_decimal": 59131
    },
    {
      "icon_id": "26459485",
      "name": "IconMonitor",
      "font_class": "IconMonitor1",
      "unicode": "e6fc",
      "unicode_decimal": 59132
    },
    {
      "icon_id": "26459486",
      "name": "IconIndex",
      "font_class": "IconIndex",
      "unicode": "e6fd",
      "unicode_decimal": 59133
    },
    {
      "icon_id": "26459487",
      "name": "IconInspection",
      "font_class": "IconInspection",
      "unicode": "e6fe",
      "unicode_decimal": 59134
    },
    {
      "icon_id": "26459488",
      "name": "IconJournal",
      "font_class": "IconJournal",
      "unicode": "e6ff",
      "unicode_decimal": 59135
    },
    {
      "icon_id": "26459489",
      "name": "IconProcessing",
      "font_class": "IconProcessing",
      "unicode": "e700",
      "unicode_decimal": 59136
    },
    {
      "icon_id": "26459490",
      "name": "IconMonthErlier",
      "font_class": "IconMonthErlier",
      "unicode": "e701",
      "unicode_decimal": 59137
    },
    {
      "icon_id": "26459491",
      "name": "IconStatistics",
      "font_class": "IconStatistics",
      "unicode": "e702",
      "unicode_decimal": 59138
    },
    {
      "icon_id": "26459492",
      "name": "IconTime",
      "font_class": "IconTime",
      "unicode": "e703",
      "unicode_decimal": 59139
    },
    {
      "icon_id": "26459493",
      "name": "IconSearch",
      "font_class": "IconSearch",
      "unicode": "e704",
      "unicode_decimal": 59140
    },
    {
      "icon_id": "26459494",
      "name": "IconPay",
      "font_class": "IconPay",
      "unicode": "e705",
      "unicode_decimal": 59141
    },
    {
      "icon_id": "26459495",
      "name": "IconTemperature",
      "font_class": "IconTemperature",
      "unicode": "e706",
      "unicode_decimal": 59142
    },
    {
      "icon_id": "26459496",
      "name": "IconMaintenance",
      "font_class": "IconMaintenance",
      "unicode": "e707",
      "unicode_decimal": 59143
    },
    {
      "icon_id": "26459497",
      "name": "IconPlan",
      "font_class": "IconPlan",
      "unicode": "e708",
      "unicode_decimal": 59144
    },
    {
      "icon_id": "26459498",
      "name": "IconPending",
      "font_class": "IconPending",
      "unicode": "e709",
      "unicode_decimal": 59145
    },
    {
      "icon_id": "26459499",
      "name": "IconData",
      "font_class": "IconData",
      "unicode": "e70a",
      "unicode_decimal": 59146
    },
    {
      "icon_id": "26459500",
      "name": "IconPrint",
      "font_class": "IconPrint",
      "unicode": "e70b",
      "unicode_decimal": 59147
    },
    {
      "icon_id": "26459502",
      "name": "IconReportForm",
      "font_class": "IconReportForm",
      "unicode": "e70d",
      "unicode_decimal": 59149
    },
    {
      "icon_id": "26459503",
      "name": "IconRepair",
      "font_class": "IconRepair",
      "unicode": "e70e",
      "unicode_decimal": 59150
    },
    {
      "icon_id": "26459159",
      "name": "IconQualityManagement",
      "font_class": "IconQualityManagement",
      "unicode": "e679",
      "unicode_decimal": 59001
    },
    {
      "icon_id": "26459228",
      "name": "IconBasicPlus",
      "font_class": "IconBasicPlus",
      "unicode": "e67a",
      "unicode_decimal": 59002
    },
    {
      "icon_id": "26459229",
      "name": "IconClose",
      "font_class": "IconClose",
      "unicode": "e67b",
      "unicode_decimal": 59003
    },
    {
      "icon_id": "26459230",
      "name": "IconBasicMinus",
      "font_class": "IconBasicMinus",
      "unicode": "e67c",
      "unicode_decimal": 59004
    },
    {
      "icon_id": "26459231",
      "name": "IconAscending",
      "font_class": "IconAscending",
      "unicode": "e67d",
      "unicode_decimal": 59005
    },
    {
      "icon_id": "26459232",
      "name": "IconBackoff",
      "font_class": "IconBackoff",
      "unicode": "e67e",
      "unicode_decimal": 59006
    },
    {
      "icon_id": "26459233",
      "name": "IconDelete",
      "font_class": "IconDelete",
      "unicode": "e67f",
      "unicode_decimal": 59007
    },
    {
      "icon_id": "26459234",
      "name": "IconDescending",
      "font_class": "IconDescending",
      "unicode": "e680",
      "unicode_decimal": 59008
    },
    {
      "icon_id": "26459235",
      "name": "IconDetails",
      "font_class": "IconDetails",
      "unicode": "e681",
      "unicode_decimal": 59009
    },
    {
      "icon_id": "26459236",
      "name": "IconFastforward",
      "font_class": "IconFastforward",
      "unicode": "e682",
      "unicode_decimal": 59010
    },
    {
      "icon_id": "26459237",
      "name": "IconExport",
      "font_class": "IconExport",
      "unicode": "e683",
      "unicode_decimal": 59011
    },
    {
      "icon_id": "26459238",
      "name": "IconCopy",
      "font_class": "IconCopy",
      "unicode": "e684",
      "unicode_decimal": 59012
    },
    {
      "icon_id": "26459239",
      "name": "IconDownload",
      "font_class": "IconDownload",
      "unicode": "e685",
      "unicode_decimal": 59013
    },
    {
      "icon_id": "26459240",
      "name": "IconLocking",
      "font_class": "IconLocking",
      "unicode": "e686",
      "unicode_decimal": 59014
    },
    {
      "icon_id": "26459241",
      "name": "IconCollection",
      "font_class": "IconCollection",
      "unicode": "e687",
      "unicode_decimal": 59015
    },
    {
      "icon_id": "26459242",
      "name": "IconOpen",
      "font_class": "IconOpen",
      "unicode": "e688",
      "unicode_decimal": 59016
    },
    {
      "icon_id": "26459243",
      "name": "IconControl",
      "font_class": "IconControl",
      "unicode": "e689",
      "unicode_decimal": 59017
    },
    {
      "icon_id": "26459244",
      "name": "IconLoad",
      "font_class": "IconLoad",
      "unicode": "e68a",
      "unicode_decimal": 59018
    },
    {
      "icon_id": "26459245",
      "name": "IconMovedown",
      "font_class": "IconMovedown",
      "unicode": "e68b",
      "unicode_decimal": 59019
    },
    {
      "icon_id": "26459246",
      "name": "IconFromMinus",
      "font_class": "IconFromMinus",
      "unicode": "e68c",
      "unicode_decimal": 59020
    },
    {
      "icon_id": "26459247",
      "name": "IconMore",
      "font_class": "IconMore",
      "unicode": "e68d",
      "unicode_decimal": 59021
    },
    {
      "icon_id": "26459248",
      "name": "IconMoveup",
      "font_class": "IconMoveup",
      "unicode": "e68e",
      "unicode_decimal": 59022
    },
    {
      "icon_id": "26459249",
      "name": "IconNextrnLevel",
      "font_class": "IconNextrnLevel",
      "unicode": "e68f",
      "unicode_decimal": 59023
    },
    {
      "icon_id": "26459250",
      "name": "IconRelease",
      "font_class": "IconRelease",
      "unicode": "e690",
      "unicode_decimal": 59024
    },
    {
      "icon_id": "26459251",
      "name": "IconBottom",
      "font_class": "IconBottom",
      "unicode": "e691",
      "unicode_decimal": 59025
    },
    {
      "icon_id": "26459252",
      "name": "IconLiftingSequence",
      "font_class": "IconLiftingSequence",
      "unicode": "e692",
      "unicode_decimal": 59026
    },
    {
      "icon_id": "26459253",
      "name": "IconMenu",
      "font_class": "IconMenu",
      "unicode": "e693",
      "unicode_decimal": 59027
    },
    {
      "icon_id": "26459254",
      "name": "IconSet",
      "font_class": "IconSet",
      "unicode": "e694",
      "unicode_decimal": 59028
    },
    {
      "icon_id": "26459255",
      "name": "IconRefresh",
      "font_class": "IconRefresh",
      "unicode": "e695",
      "unicode_decimal": 59029
    },
    {
      "icon_id": "26459256",
      "name": "IconSuspend",
      "font_class": "IconSuspend",
      "unicode": "e696",
      "unicode_decimal": 59030
    },
    {
      "icon_id": "26459257",
      "name": "IconTreeOpen",
      "font_class": "IconTreeOpen",
      "unicode": "e697",
      "unicode_decimal": 59031
    },
    {
      "icon_id": "26459258",
      "name": "IconMute",
      "font_class": "IconMute",
      "unicode": "e698",
      "unicode_decimal": 59032
    },
    {
      "icon_id": "26459259",
      "name": "IconFromPlus",
      "font_class": "IconFromPlus",
      "unicode": "e699",
      "unicode_decimal": 59033
    },
    {
      "icon_id": "26459260",
      "name": "IconSignout",
      "font_class": "IconSignout",
      "unicode": "e69a",
      "unicode_decimal": 59034
    },
    {
      "icon_id": "26459261",
      "name": "IconContrast",
      "font_class": "IconContrast",
      "unicode": "e69b",
      "unicode_decimal": 59035
    },
    {
      "icon_id": "26459262",
      "name": "IconPreview",
      "font_class": "IconPreview",
      "unicode": "e69c",
      "unicode_decimal": 59036
    },
    {
      "icon_id": "26459263",
      "name": "IconHide",
      "font_class": "IconHide",
      "unicode": "e69d",
      "unicode_decimal": 59037
    },
    {
      "icon_id": "26459264",
      "name": "IconUpperLevel",
      "font_class": "IconUpperLevel",
      "unicode": "e69e",
      "unicode_decimal": 59038
    },
    {
      "icon_id": "26459288",
      "name": "IconAssessmentSystem",
      "font_class": "IconAssessmentSystem",
      "unicode": "e69f",
      "unicode_decimal": 59039
    },
    {
      "icon_id": "26459289",
      "name": "IconBI",
      "font_class": "IconBI",
      "unicode": "e6a0",
      "unicode_decimal": 59040
    },
    {
      "icon_id": "26459290",
      "name": "IconBasicData",
      "font_class": "IconBasicData",
      "unicode": "e6a1",
      "unicode_decimal": 59041
    },
    {
      "icon_id": "26459291",
      "name": "IconComprehensive",
      "font_class": "IconComprehensive",
      "unicode": "e6a2",
      "unicode_decimal": 59042
    },
    {
      "icon_id": "26459292",
      "name": "IconDeviceManagement",
      "font_class": "IconDeviceManagement",
      "unicode": "e6a3",
      "unicode_decimal": 59043
    },
    {
      "icon_id": "26459293",
      "name": "IconCostSystem",
      "font_class": "IconCostSystem",
      "unicode": "e6a4",
      "unicode_decimal": 59044
    },
    {
      "icon_id": "26459294",
      "name": "IconCentralBudget",
      "font_class": "IconCentralBudget",
      "unicode": "e6a5",
      "unicode_decimal": 59045
    },
    {
      "icon_id": "26459295",
      "name": "IconEngineering",
      "font_class": "IconEngineering",
      "unicode": "e6a6",
      "unicode_decimal": 59046
    },
    {
      "icon_id": "26459296",
      "name": "IconEnvironment",
      "font_class": "IconEnvironment",
      "unicode": "e6a7",
      "unicode_decimal": 59047
    },
    {
      "icon_id": "26459297",
      "name": "IconContractManagement",
      "font_class": "IconContractManagement",
      "unicode": "e6a8",
      "unicode_decimal": 59048
    },
    {
      "icon_id": "26459298",
      "name": "IconEngineeringDataManagement",
      "font_class": "IconEngineeringDataManagement",
      "unicode": "e6a9",
      "unicode_decimal": 59049
    },
    {
      "icon_id": "26459299",
      "name": "IconcustomerService",
      "font_class": "IconcustomerService",
      "unicode": "e6aa",
      "unicode_decimal": 59050
    },
    {
      "icon_id": "26459300",
      "name": "IconEquipmentSpace",
      "font_class": "IconEquipmentSpace",
      "unicode": "e6ab",
      "unicode_decimal": 59051
    },
    {
      "icon_id": "26459301",
      "name": "IconFMConfiguration",
      "font_class": "IconFMConfiguration",
      "unicode": "e6ac",
      "unicode_decimal": 59052
    },
    {
      "icon_id": "26459302",
      "name": "IconEnergyManagement",
      "font_class": "IconEnergyManagement",
      "unicode": "e6ad",
      "unicode_decimal": 59053
    },
    {
      "icon_id": "26459303",
      "name": "IconGroupEvents",
      "font_class": "IconGroupEvents",
      "unicode": "e6ae",
      "unicode_decimal": 59054
    },
    {
      "icon_id": "26459304",
      "name": "IconEventManagement",
      "font_class": "IconEventManagement",
      "unicode": "e6af",
      "unicode_decimal": 59055
    },
    {
      "icon_id": "26459305",
      "name": "IconGroupAnnouncement",
      "font_class": "IconGroupAnnouncement",
      "unicode": "e6b0",
      "unicode_decimal": 59056
    },
    {
      "icon_id": "26459306",
      "name": "IconGroupTask",
      "font_class": "IconGroupTask",
      "unicode": "e6b1",
      "unicode_decimal": 59057
    },
    {
      "icon_id": "26459307",
      "name": "IconFileManagement",
      "font_class": "IconFileManagement",
      "unicode": "e6b2",
      "unicode_decimal": 59058
    },
    {
      "icon_id": "26459308",
      "name": "IconGroupReport",
      "font_class": "IconGroupReport",
      "unicode": "e6b3",
      "unicode_decimal": 59059
    },
    {
      "icon_id": "26459309",
      "name": "IconGroupPlan",
      "font_class": "IconGroupPlan",
      "unicode": "e6b4",
      "unicode_decimal": 59060
    },
    {
      "icon_id": "26459310",
      "name": "IconHumanResources",
      "font_class": "IconHumanResources",
      "unicode": "e6b5",
      "unicode_decimal": 59061
    },
    {
      "icon_id": "26459311",
      "name": "IconIntegratedManagement",
      "font_class": "IconIntegratedManagement",
      "unicode": "e6b6",
      "unicode_decimal": 59062
    },
    {
      "icon_id": "26459312",
      "name": "IconOperationalIndicators",
      "font_class": "IconOperationalIndicators",
      "unicode": "e6b7",
      "unicode_decimal": 59063
    },
    {
      "icon_id": "26459313",
      "name": "IconMaintenancePlan",
      "font_class": "IconMaintenancePlan",
      "unicode": "e6b8",
      "unicode_decimal": 59064
    },
    {
      "icon_id": "26459314",
      "name": "IconLease",
      "font_class": "IconLease",
      "unicode": "e6b9",
      "unicode_decimal": 59065
    },
    {
      "icon_id": "26459315",
      "name": "IconOperationManagement",
      "font_class": "IconOperationManagement",
      "unicode": "e6ba",
      "unicode_decimal": 59066
    },
    {
      "icon_id": "26459316",
      "name": "IconProjectUndertakeInspection",
      "font_class": "IconProjectUndertakeInspection",
      "unicode": "e6bb",
      "unicode_decimal": 59067
    },
    {
      "icon_id": "26459317",
      "name": "IconProjectDocument",
      "font_class": "IconProjectDocument",
      "unicode": "e6bc",
      "unicode_decimal": 59068
    },
    {
      "icon_id": "26459318",
      "name": "IconOrder",
      "font_class": "IconOrder",
      "unicode": "e6bd",
      "unicode_decimal": 59069
    },
    {
      "icon_id": "26459319",
      "name": "IconGroupPage",
      "font_class": "IconGroupPage",
      "unicode": "e6be",
      "unicode_decimal": 59070
    },
    {
      "icon_id": "26459320",
      "name": "IconPersonnelManagement",
      "font_class": "IconPersonnelManagement",
      "unicode": "e6bf",
      "unicode_decimal": 59071
    },
    {
      "icon_id": "26459321",
      "name": "IconOrganizationalStructure",
      "font_class": "IconOrganizationalStructure",
      "unicode": "e6c0",
      "unicode_decimal": 59072
    },
    {
      "icon_id": "26459322",
      "name": "IconPromotionDepartment",
      "font_class": "IconPromotionDepartment",
      "unicode": "e6c1",
      "unicode_decimal": 59073
    },
    {
      "icon_id": "26459323",
      "name": "IconProjectReport",
      "font_class": "IconProjectReport",
      "unicode": "e6c2",
      "unicode_decimal": 59074
    },
    {
      "icon_id": "26459324",
      "name": "IconSingleOperationManagement",
      "font_class": "IconSingleOperationManagement",
      "unicode": "e6c3",
      "unicode_decimal": 59075
    },
    {
      "icon_id": "26459325",
      "name": "IconSecurityManagement",
      "font_class": "IconSecurityManagement",
      "unicode": "e6c4",
      "unicode_decimal": 59076
    },
    {
      "icon_id": "26459326",
      "name": "IconPlanManagement",
      "font_class": "IconPlanManagement",
      "unicode": "e6c5",
      "unicode_decimal": 59077
    },
    {
      "icon_id": "26459327",
      "name": "IconQualityManagement",
      "font_class": "IconQualityManagement1",
      "unicode": "e6c6",
      "unicode_decimal": 59078
    },
    {
      "icon_id": "26459328",
      "name": "IconSolidSuccess",
      "font_class": "IconSolidSuccess",
      "unicode": "e6c7",
      "unicode_decimal": 59079
    },
    {
      "icon_id": "26459329",
      "name": "IconProjectWork",
      "font_class": "IconProjectWork",
      "unicode": "e6c8",
      "unicode_decimal": 59080
    },
    {
      "icon_id": "26459330",
      "name": "IconSolidTips",
      "font_class": "IconSolidTips",
      "unicode": "e6c9",
      "unicode_decimal": 59081
    },
    {
      "icon_id": "26459331",
      "name": "IconSolidWarning",
      "font_class": "IconSolidWarning",
      "unicode": "e6ca",
      "unicode_decimal": 59082
    },
    {
      "icon_id": "26459332",
      "name": "IconSingleBudget",
      "font_class": "IconSingleBudget",
      "unicode": "e6cb",
      "unicode_decimal": 59083
    },
    {
      "icon_id": "26459333",
      "name": "IconHumanRD",
      "font_class": "IconHumanRD",
      "unicode": "e6cc",
      "unicode_decimal": 59084
    },
    {
      "icon_id": "26459334",
      "name": "IconSupplier",
      "font_class": "IconSupplier",
      "unicode": "e6cd",
      "unicode_decimal": 59085
    },
    {
      "icon_id": "26459335",
      "name": "IconSop",
      "font_class": "IconSop",
      "unicode": "e6ce",
      "unicode_decimal": 59086
    },
    {
      "icon_id": "26459336",
      "name": "IconSOPManagement",
      "font_class": "IconSOPManagement",
      "unicode": "e6cf",
      "unicode_decimal": 59087
    },
    {
      "icon_id": "26459337",
      "name": "IconTenant",
      "font_class": "IconTenant",
      "unicode": "e6d0",
      "unicode_decimal": 59088
    },
    {
      "icon_id": "26459338",
      "name": "IconWorkbench",
      "font_class": "IconWorkbench",
      "unicode": "e6d1",
      "unicode_decimal": 59089
    },
    {
      "icon_id": "26459339",
      "name": "IconUndertakeInspection",
      "font_class": "IconUndertakeInspection",
      "unicode": "e6d2",
      "unicode_decimal": 59090
    },
    {
      "icon_id": "26459340",
      "name": "IconTaskManagement",
      "font_class": "IconTaskManagement",
      "unicode": "e6d3",
      "unicode_decimal": 59091
    },
    {
      "icon_id": "26459341",
      "name": "IconSpaceManagement",
      "font_class": "IconSpaceManagement",
      "unicode": "e6d4",
      "unicode_decimal": 59092
    },
    {
      "icon_id": "26459342",
      "name": "IconWorkManagement",
      "font_class": "IconWorkManagement",
      "unicode": "e6d5",
      "unicode_decimal": 59093
    },
    {
      "icon_id": "26459343",
      "name": "IconWorkforceManagement",
      "font_class": "IconWorkforceManagement",
      "unicode": "e6d6",
      "unicode_decimal": 59094
    },
    {
      "icon_id": "26459344",
      "name": "IconSolidFail",
      "font_class": "IconSolidFail",
      "unicode": "e6d7",
      "unicode_decimal": 59095
    },
    {
      "icon_id": "26459345",
      "name": "IconSupplierManagement",
      "font_class": "IconSupplierManagement",
      "unicode": "e6d8",
      "unicode_decimal": 59096
    },
    {
      "icon_id": "26459351",
      "name": "IconDomesticWaterPump",
      "font_class": "IconDomesticWaterPump",
      "unicode": "e6d9",
      "unicode_decimal": 59097
    },
    {
      "icon_id": "26459352",
      "name": "IconCoolingMachineRoom",
      "font_class": "IconCoolingMachineRoom",
      "unicode": "e6da",
      "unicode_decimal": 59098
    },
    {
      "icon_id": "26459353",
      "name": "IconHeatExchangerRoom",
      "font_class": "IconHeatExchangerRoom",
      "unicode": "e6db",
      "unicode_decimal": 59099
    },
    {
      "icon_id": "26459354",
      "name": "IconFirePumpRoom",
      "font_class": "IconFirePumpRoom",
      "unicode": "e6dc",
      "unicode_decimal": 59100
    },
    {
      "icon_id": "26459355",
      "name": "IconBasicPlus",
      "font_class": "IconBasicPlus1",
      "unicode": "e6dd",
      "unicode_decimal": 59101
    },
    {
      "icon_id": "26459356",
      "name": "IconReclaimedWaterPump",
      "font_class": "IconReclaimedWaterPump",
      "unicode": "e6de",
      "unicode_decimal": 59102
    },
    {
      "icon_id": "26459357",
      "name": "IconStabilizedPressurePump",
      "font_class": "IconStabilizedPressurePump",
      "unicode": "e6df",
      "unicode_decimal": 59103
    },
    {
      "icon_id": "26459358",
      "name": "IconRefrigerationStation",
      "font_class": "IconRefrigerationStation",
      "unicode": "e6e0",
      "unicode_decimal": 59104
    }
  ];

    return { icons };
  },
});
</script>



<style lang="less" scoped>
.item {
  width: 150px;
  height: 80px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
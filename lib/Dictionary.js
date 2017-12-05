function Dictionary() {
}
;

Dictionary.BANNER = '';

// 天干
Dictionary.HEAVENLY_STEM = ["癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬"];
// 地支
Dictionary.EARTHLY_BRANCH = ["亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌"];
// 十二人事宮
Dictionary.PALACE = ["命", "兄弟", "夫妻", "子女", "財帛", "疾厄", "遷移", "僕役", "官祿", "田宅", "褔德", "父母"];
// 命主
Dictionary.INNATE_MASTER = ["貪狼", "巨門", "祿存", "文曲", "廉貞", "武曲", "破軍"];
// 身主
Dictionary.ACQUIRED_MASTER = ["火星", "天相", "天梁", "天同", "文昌", "天機"];
//
// 星耀名稱
/** 
 * 甲級星
 * 十四主星
 * 紫微系逆行
 * 天府系順行
 */
Dictionary.PRIMARY_STAR = ["紫微", "天機", "太陽", "武曲", "天同", "廉貞", "天府", "太陰", "貪狼", "巨門", "天相", "天梁", "七殺", "破軍"];
// 甲級輔耀
// 六吉星
Dictionary.NICE_STAR = ["文昌", "文曲", "左輔", "右弼", "天魁", "天鉞"];
// 四煞星
Dictionary.BAD_STAR = ["擎羊", "陀羅", "火星", "鈴星"];
// 空亡星
Dictionary.HOLLOW_STAR = ["地空", "地劫", "截空", "旬空", "天空"];
//
Dictionary.COFFER_STAR = "祿存";
//
// 乙級輔耀
Dictionary.SECONDARY_STAR = ["天哭", "天虛", "紅鸞", "天喜", "龍池", "鳳閣", "孤辰", "寡宿", "天才", "天壽", "蜚廉", "破碎", "天姚", "天刑", "天馬", "天巫", "解神", "陰煞", "天月", "天官", "天褔", "三台", "八座", "恩光", "天貴", "台輔", "封誥", "天使", "天傷"];
// 十二長生
Dictionary.TWELVE_PHASE = ["長生", "沐浴", "冠帶", "臨官", "帝旺", "衰", "病", "死", "墓", "絕", "胎", "養"];
// 十二博士
Dictionary.TWELVE_WIZARD = ["博士", "力士", "青龍", "小耗", "將軍", "奏書", "飛廉", "喜神", "病符", "大耗", "伏兵", "官府"];
// 將前諸星
Dictionary.GENERAL_SERIES = ["將星", "攀安", "歲驛", "息神", "華蓋", "劫煞", "災煞", "天煞", "指背", "咸池", "地煞", "亡神"];
// 歲前諸星
Dictionary.YEAR_LORD_SERIES = ["歲建", "晦氣", "喪門", "貫索", "官符", "小耗", "大耗", "龍德", "白虎", "天德", "弔客", "病符"];
// 四化
Dictionary.TRANSFORM_STAR = ["祿", "權", "科", "忌"];
// 生年/大限/太歲/小限
Dictionary.TRANSFORM_TYPE = [0, 1, 2, 3];
// 年干四化
//public static int[][] TRANSFORM_INDEX;
Dictionary.TRANSFORM_INDEX = [
    [13, 9, 7, 8], // 癸年四化：破巨陰貪
    [5, 13, 15, 2], // 甲年四化：廉破曲陽
    [1, 11, 0, 7], // 乙年四化：機梁紫陰
    [4, 1, 14, 5], // 丙年四化：同機昌廉
    [7, 4, 1, 9], // 丁年四化：陰同機巨
    [8, 7, 17, 1], // 戊年四化：貪陰右機
    [3, 8, 11, 15], // 己年四化：武貪梁曲
    [2, 3, 4, 10], // 庚年四化：陽武同相
    [9, 2, 3, 14], // 辛年四化：巨陽武昌
    [11, 0, 6, 3] // 壬年四化：梁紫府武
];
// 陰陽
Dictionary.YANG = "陽";
Dictionary.YIN = "陰";
// 五行
Dictionary.FIVE_ELEMENT = ["水", "火", "木", "金", "土"];
// 五行局數(－2)
Dictionary.FIVE_ELEMENT_NO_STRING = ["水二局", "火六局", "土五局", "木三局", "金四局"];
// 局數
Dictionary.FIVE_ELEMENT_ID = [2, 6, 3, 4, 5];
Dictionary.FIVE_ELEMENT_NO_ID = [[3, 0, 1, 4, 2],
    [0, 1, 4, 2, 3],
    [1, 4, 2, 3, 0]
];

// 閏月模式: 0=本月論, 1=月中論, 2=下月論
Dictionary.LEAP_MONTH_MODE = 1;
// 本命天馬模式: 0=月馬, 1=年馬
Dictionary.SKY_HORSE_MODE = 0;

Dictionary.getFiveElementCase = function(five_element_no) {
    //console.info("五行局數="+five_element_no);
    //console.info(HoroscopeUtil.getFiveElementNOString(five_element_no));
    return HoroscopeUtil.getFiveElementNOString(five_element_no);
};

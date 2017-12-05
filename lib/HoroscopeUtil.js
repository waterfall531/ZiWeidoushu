/**
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function HoroscopeUtil() {
    //
};

/**
 * 查五行局數
 * @param heavenlyTrunk 命宮年干
 * @param earthlyBranch 命宮地支
 * @return 五行局數
 */
HoroscopeUtil.getFiveElementNO = function(heavenlyTrunk, earthlyBranch) {
    var case_id = this.getFiveElementId(heavenlyTrunk, earthlyBranch);
    return Dictionary.FIVE_ELEMENT_ID[case_id];
};

/**
 * 查五行局
 * @param heavenlyTrunk 命宮年干
 * @param earthlyBranch 命宮地支
 * @return 五行局
 */
HoroscopeUtil.getFiveElementNOString = function(heavenlyTrunk, earthlyBranch) {
    var five_elem_no = HoroscopeUtil.getFiveElementNO(heavenlyTrunk, earthlyBranch); // 局數
    return HoroscopeUtil.getFiveElementNOString(five_elem_no);
};

// 查五行局字串
HoroscopeUtil.getFiveElementNOString = function(five_elem_no) {
    //
    var idx = 0;
    switch (five_elem_no) {
        case 2:
            idx = 0;
            break;
        case 6:
            idx = 1;
            break;
        case 5:
            idx = 2;
            break;
        case 3:
            idx = 3;
            break;
        case 4:
            idx = 4;
            break;
    }
    return Dictionary.FIVE_ELEMENT_NO_STRING[idx];
};

/**
 * 起五行局數（直接查表）
 * @param heavenlyTrunk 命宮年干
 * @param earthlyBranch 命宮地支
 * @return 五行局數(2,3,4,5,6)
 */
HoroscopeUtil.getFiveElementId = function(heavenlyTrunk, earthlyBranch) {
    var id1 = 0;
    switch (earthlyBranch) {
        case 1: // 子
        case 2: // 丑
        case 7: // 午
        case 8: // 未
            id1 = 0;
            break;
        case 3: // 寅
        case 4: // 卯
        case 9: // 申
        case 10: // 酉
            id1 = 1;
            break;
        case 5: // 辰
        case 6: // 巳
        case 11: // 戌
        case 0: // 亥
            id1 = 2;
            break;
    }
    var id2 = 0;
    switch (heavenlyTrunk) {
        case 1: // 甲
        case 2: // 乙
            id2 = 0;
            break;
        case 3: // 丙
        case 4: // 丁
            id2 = 1;
            break;
        case 5: // 戊
        case 6: // 己
            id2 = 2;
            break;
        case 7: // 庚
        case 8: // 辛
            id2 = 3;
            break;
        case 9: // 壬
        case 0: // 癸
            id2 = 4;
            break;
    }
    //
    return Dictionary.FIVE_ELEMENT_NO_ID[id1][id2];
};

/**
 * 起寅首
 * @param yearHeaveyStem 年支
 * @return 寅首
 */
HoroscopeUtil.getFirstMonthHeavenlyStemId = function(yearHeaveyStem) {
    var heavenlyStemId = 0;
    switch (yearHeaveyStem) {
        case 1: // 甲
        case 6: // 己
            heavenlyStemId = 3; // 丙
            break;
        case 2: // 乙
        case 7: // 庚
            heavenlyStemId = 5; // 戊
            break;
        case 3: // 丙
        case 8: // 辛
            heavenlyStemId = 7; // 庚
            break;
        case 4: // 丁
        case 9: // 壬
            heavenlyStemId = 9; // 壬
            break;
        case 5: // 戊
        case 0: // 癸
            heavenlyStemId = 1; // 甲
            break;
        default:
    }
    return heavenlyStemId;
};

/**
 * 取得小限1歲宮位
 * @param brance 生年年支
 * @return 小限1歲宮位地支
 */
HoroscopeUtil.getInternalYearIdx = function(brance) {
    var start_id = 0; //
    switch (brance) {
        case 9: // 申
        case 1: // 子
        case 5: // 辰
            start_id = 11; // 戌
            break;
        case 3: // 寅
        case 7: // 午
        case 11: // 戌
            start_id = 5; // 辰
            break;
        case 6: // 巳
        case 10: // 酉
        case 2: // 丑
            start_id = 8; // 未
            break;
        case 0: // 亥
        case 4: // 卯
        case 8: // 未
            start_id = 2; // 丑
            break;
    }
    return start_id;
};
/**
 * 計算紫微星的宮位
 * @param five_elem_no 五行局
 * @param chineseBirth 農曆生日
 * @return 紫微星的宮位地支
 */
HoroscopeUtil.getEmperorLocation = function(five_elem_no, chineseBirth) {
    var x = (five_elem_no - (chineseBirth[2] % five_elem_no)) % five_elem_no;
    var qt = Math.floor((chineseBirth[2] + x) / five_elem_no);
    if (x % 2 === 0) { // 雙數順數
        return (2 + qt + x) % 12;
    } else { // 單數逆數
        return (14 + qt - x) % 12;
    }
};

/**
 * 找祿存位
 * @param stem 天干
 * @return 祿存位
 */
HoroscopeUtil.getCofferLocation = function(stem) {
    var branch = 0; // 宮位
    switch (stem) { // 生年天干
        case 1: // 甲
            branch = 3;
            break;
        case 2: // 乙
            branch = 4;
            break;
        case 3: // 丙
            branch = 6;
            break;
        case 4: // 丁
            branch = 7;
            break;
        case 5: // 戊
            branch = 6;
            break;
        case 6: // 己
            branch = 7;
            break;
        case 7: // 庚
            branch = 9;
            break;
        case 8: // 辛
            branch = 10;
            break;
        case 9: // 壬
            branch = 0;
            break;
        case 0: // 癸
            branch = 1;
            break;
    }
    return branch;
};

/**
 * 計算左輔右弼宮位
 * @param monthStem 生月地支
 * @return 左輔右弼宮位
 */
HoroscopeUtil.getAssistantStarLocation = function(monthStem) {
    return new Array((2 + monthStem) % 12, (14 - monthStem) % 12);
};

/**
 * 計算文昌/文曲宮位
 * @param hour 生時地支
 * @return 文昌/文曲宮位
 */
HoroscopeUtil.getLiteratureStarLocation = function(hour) {
    return new Array((12 - hour) % 12, (4 + hour) % 12);
};

/**
 * 計算天魁/天鉞宮位
 * @param stem 生年年干
 * @return 天魁/天鉞宮位
 */
HoroscopeUtil.getVIPStarLocation = function(stem) {
    var loc = new Array(0, 0);
    switch (stem) {
        case 1: // 甲
        case 5: // 戊
        case 7: // 庚
            loc[0] = 2; // 丑
            loc[1] = 8; // 未
            break;
        case 3: // 丙
        case 4: // 丁
            loc[0] = 0; // 亥
            loc[1] = 10; // 酉
            break;
        case 2: // 乙
        case 6: // 己
            loc[0] = 1; // 子
            loc[1] = 9; // 申
            break;
        case 9: // 壬
        case 0: // 癸
            loc[0] = 4; // 卯
            loc[1] = 6; // 巳
            break;
        case 8: // 辛
            loc[0] = 7; // 午
            loc[1] = 3; // 寅
            break;
    }
    return loc;
};

/**
 * 計算火鈴宮位
 * @param branch 生年地支
 * @param hour 生時地支
 * @return 火鈴宮位
 */
HoroscopeUtil.getFlameStarLocation = function(branch, hour) {
    var loc = new Array(0, 0);
    var pt = 0; // 支點
    switch (branch) {
        case 3:  // 寅
        case 7:  // 午
        case 11: // 戌
            pt = 2;
            break;
        case 6:  // 巳
        case 10: // 酉
        case 2:  // 丑
            pt = 4;
            break;
        case 9:  // 申
        case 1:  // 子
        case 5:  // 辰
            pt = 3;
            break;
        case 0:  // 亥
        case 4:  // 卯
        case 8:  // 未
            pt = 10;
            break;
    }
    //
    loc[0] = (pt + hour - 1) % 12;
    if (pt === 2) {
        loc[1] = (3 + hour) % 12;
    } else {
        loc[1] = (10 + hour) % 12;
    }
    return loc;
};

/**
 * 計算地空地劫宮位
 * @param stem 生年天干
 * @param hour 生時地支
 * @return 地空地劫宮位
 */
HoroscopeUtil.getHollowStarLocation = function(stem, hour) {
    // 地空,地劫,截空(旬空)
    var loc = [-1, -1, -1, -1];
    loc[0] = (13 - hour) % 12;
    loc[1] = (11 + hour) % 12;
    // 截空
    switch (stem) {
        case 1:
        case 2:
        case 3:
        case 4:
            loc[2] = 11 - 2 * stem;
            break;
        case 5:
        case 6:
            loc[2] = 16 - stem;
            break;
        case 7:
        case 8:
        case 9:
            loc[2] = 22 - 2 * stem;
            break;
        case 0:
            loc[2] = 0;
            break;
    }
    return loc;
};

/**
 * 排其它乙級星
 * @param main_idx 命宮地支
 * @param body_idx 身宮地支
 * @param stem 年干
 * @param branch 年支
 * @param monthBranch 月支
 * @param day 生日
 * @param hour 時辰
 * @return 其它乙級星宮位
 */
HoroscopeUtil.getSecondaryStarLocation = function(main_idx, body_idx, stem, branch, monthBranch, day, hour) {
    monthBranch = (monthBranch) % 12;
    //
    var loc = new Array();
    // 天哭/天虛
    loc[0] = (20 - branch) % 12;
    loc[1] = (6 + branch) % 12;
    // 紅鸞/天喜
    loc[2] = (17 - branch) % 12;
    loc[3] = (6 + loc[2]) % 12;
    // 龍池/鳳閣
    loc[4] = (4 + branch) % 12;
    loc[5] = (12 - branch) % 12;
    // 孤辰/寡宿
    loc[6] = ((Math.floor(branch/3) + 1) * 3) % 12;
    if (loc[6] === 0) {
        loc[7] = 8;
    } else {
        loc[7] = (8 + loc[6]) % 12;
    }
    // 天才/天壽
    // 命宮及身宮位
    loc[8] = (12 + main_idx + branch - 1) % 12;
    loc[9] = (12 + body_idx + branch - 1) % 12;
    // 蜚廉/破碎
    // 蜚廉:子丑寅年在申酉戍, 卯辰巳年在巳午未, 午未申年在寅卯辰, 酉戍亥年在亥子丑
    switch (branch) {
        case 1:
            loc[10] = 9;
            break;
        case 2:
            loc[10] = 10;
            break;
        case 3:
            loc[10] = 11;
            break;
        case 4:
            loc[10] = 6;
            break;
        case 5:
            loc[10] = 7;
            break;
        case 6:
            loc[10] = 8;
            break;
        case 7:
            loc[10] = 3;
            break;
        case 8:
            loc[10] = 4;
            break;
        case 9:
            loc[10] = 5;
            break;
        case 10:
            loc[10] = 0;
            break;
        case 11:
            loc[10] = 1;
            break;
        case 0:
            loc[10] = 2;
            break;
    }
    // 破碎
    switch (branch % 3) {
        case 1:
            loc[11] = 6;
            break;
        case 2:
            loc[11] = 2;
            break;
        case 0:
            loc[11] = 10;
            break;
    }
    // 生年月支
    // 天姚/天刑
    loc[12] = (11 + monthBranch) % 12;
    loc[13] = (7 + monthBranch) % 12;
    // 天馬/天巫
    // 本命用月馬
    loc[14] = ((4 - (monthBranch + 2) % 4) * 3) % 12;
    loc[15] = (loc[14] < 6) ? loc[14] : (15 - loc[14]);
    // 解神
    loc[16] = (7 + Math.floor(((monthBranch + 11) % 12) / 2) * 2) % 12;
    // 陰煞
    loc[17] = (27 - (monthBranch - 3) * 2) % 12;
    // 天月
    switch (monthBranch) {
        case 6:  // 巳
        case 11: // 戌
        case 2:
            loc[18] = 3;
            break;
        case 8:  // 未
            loc[18] = 4;
            break;
        case 5:  // 辰
            loc[18] = 5;
            break;
        case 4:  // 卯
            loc[18] = 6;
            break;
        case 0:  // 亥
            loc[18] = 7;
            break;
        case 7:  // 午
        case 10: // 酉
            loc[18] = 8;
            break;
        case 3:  // 寅
        case 1:  // 子
            loc[18] = 11;
            break;
        case 9:  // 申
            loc[18] = 0;
            break;
    }
    // 生年年干
    // 天官/天褔
    switch (stem) {
        case 1:
            loc[19] = 8;
            loc[20] = 10;
            break;
        case 2:
            loc[19] = 5;
            loc[20] = 9;
            break;
        case 3:
            loc[19] = 6;
            loc[20] = 1;
            break;
        case 4:
            loc[19] = 3;
            loc[20] = 0;
            break;
        case 5:
            loc[19] = 4;
            loc[20] = 4;
            break;
        case 6:
            loc[19] = 10;
            loc[20] = 3;
            break;
        case 7:
            loc[19] = 0;
            loc[20] = 7;
            break;
        case 8:
            loc[19] = 10;
            loc[20] = 6;
            break;
        case 9:
            loc[19] = 11;
            loc[20] = 7;
            break;
        case 0:
            loc[19] = 7;
            loc[20] = 6;
            break;
    }
    // 三台/八座，由左右決定
    var tmp = HoroscopeUtil.getAssistantStarLocation(monthBranch);
    loc[21] = (12 + tmp[0] - 1 + day % 12) % 12;
    loc[22] = (12 + tmp[1] + 1 - day % 12) % 12;
    // 恩光/天貴，由昌曲決定
    tmp = HoroscopeUtil.getLiteratureStarLocation(hour);
    loc[23] = (12 + tmp[0] - 2 + day % 12) % 12;
    loc[24] = (12 + tmp[1] - 2 + day % 12) % 12;
    // 出生時辰
    // 台輔/封誥
    loc[25] = (7 + hour - 1) % 12;
    loc[26] = (loc[25] + 8) % 12;
    // 天使/天傷(夾遷移)
    loc[27] = (main_idx + 7) % 12;
    loc[28] = (main_idx + 5) % 12;
    //
    return loc;
};

// 將前星(華蓋)
HoroscopeUtil.getOtherStarLocation = function(branch) {
    // 以生年地支計算出生年的將星位置
    var idx = this.getInternalYearIdx(branch);
    idx = (idx + 2) % 12;
    // 華蓋在數第5位
    var location = new Array(0);
    location[0] = (idx + 4) % 12;
    return location;
};

/**
 * 取得四化主星
 * @param stem 年干
 * @return 四化主星
 */
HoroscopeUtil.getFourTransStar = function(stem) {
    var transStar = new Array();
    var transIdx = Dictionary.TRANSFORM_INDEX[stem];
    for (var i = 0; i < transIdx.length; i++) {
        if (transIdx[i] < 14) {
            transStar[i] = Dictionary.PRIMARY_STAR[transIdx[i]];
        } else {
            transStar[i] = Dictionary.NICE_STAR[transIdx[i] - 14];
        }
    }
    return transStar;
};

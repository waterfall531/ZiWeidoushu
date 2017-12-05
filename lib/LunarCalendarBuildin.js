/**
 * 西曆/農曆轉換程式
 */
function LunarCalendar() {
    this.status = -1; // 1: 表示執行中
    this.solarDate;
    // 因為農曆2月會有29天的問題，所以不能直接用Date物件
    // 改用JSON物件
    this.lunarDate; // JSON format: {"year": , "month", "day": }
    this.isLeapMonth;
    this.currentTerm; // 節氣
};

/*
  用16進位儲存 1900-2100 年之農曆資料陣列
  起算日為國曆1900年01月31日即農曆1900年元月初一
  以2進位檢視元素資料
  16~5bit 儲存全年農曆月份之大小月，1 為大月30天，0 為小月29天
  4~1bit 儲存農曆閏月月份，f 表示前一年閏年為大月30天，0 為小月29天
*/

LunarCalendar.LUNAR_DATA = [
0x4bd8, // 1900/1/31~1900/12/31
0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,0x4ae0, // 1901~1910
0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,0x497f, // 1911~1920
0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,0x6566, // 1921~1930
0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,0xd4a0, // 1931~1940
0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,0x6ca0, // 1941~1950
0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,0xaea6, // 1951~1960
0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,0x96d0, // 1961~1970
0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,0x95bf, // 1971~1980
0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,0x4af5, // 1981~1990
0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,0xc960, // 1991~2000
0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,0xa950, // 2001~2010
0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,0x7954, // 2011~2020
0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,0x5aa0, // 2021~2030
0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,0xb5a0, // 2031~2040
0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,0x4b63, // 2041~2050
0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,0x92e0, // 2051~2060
0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,0x52d0, // 2061~2070
0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,0xb273, // 2071~2080
0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,0xe968, // 2081~2090
0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,0xd520, // 2091~2100
];

//
// 24節氣
LunarCalendar.SOLAR_TERM = ["小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];

// 某年的第n個節氣為幾日(從0小寒起算)
LunarCalendar.SOLAR_TERM_BASE = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21];
LunarCalendar.SOLAR_TERM_IDX = "0123415341536789:;<9:=<>:=1>?012@015@015@015AB78CDE8CD=1FD01GH01GH01IH01IJ0KLMN;LMBEOPDQRST0RUH0RVH0RWH0RWM0XYMNZ[MB\\]PT^_ST`_WH`_WH`_WM`_WM`aYMbc[Mde]Sfe]gfh_gih_Wih_WjhaWjka[jkl[jmn]ope]qph_qrh_sth_W";
LunarCalendar.SOLAR_TERM_OS = "211122112122112121222211221122122222212222222221222122222232222222222222222233223232223232222222322222112122112121222211222122222222222222222222322222112122112121222111211122122222212221222221221122122222222222222222222223222232222232222222222222112122112121122111211122122122212221222221221122122222222222222221211122112122212221222211222122222232222232222222222222112122112121111111222222112121112121111111222222111121112121111111211122112122112121122111222212111121111121111111111122112122112121122111211122112122212221222221222211111121111121111111222111111121111111111111111122112121112121111111222111111111111111111111111122111121112121111111221122122222212221222221222111011111111111111111111122111121111121111111211122112122112121122211221111011111101111111111111112111121111121111111211122112122112221222211221111011111101111111110111111111121111111111111111122112121112121122111111011111121111111111111111011111111112111111111111011111111111111111111221111011111101110111110111011011111111111111111221111011011101110111110111011011111101111111111211111001011101110111110110011011111101111111111211111001011001010111110110011011111101111111110211111001011001010111100110011011011101110111110211111001011001010011100110011001011101110111110211111001010001010011000100011001011001010111110111111001010001010011000111111111111111111111111100011001011001010111100111111001010001010000000111111000010000010000000100011001011001010011100110011001011001110111110100011001010001010011000110011001011001010111110111100000010000000000000000011001010001010011000111100000000000000000000000011001010001010000000111000000000000000000000000011001010000010000000";

//
// 取得農曆year年閏哪個月?, 沒閏月則傳回0
LunarCalendar.prototype.getLeapMonth = function(year) {
    var leapMonth = LunarCalendar.LUNAR_DATA[year - 1900] & 0xf;
    if (leapMonth == 0xf) {
        leapMonth = 0;
    }
    return leapMonth;
}

// 取得農曆year年閏月的天數
LunarCalendar.prototype.getLeapMonthDays = function(year) {
    if (this.getLeapMonth(year)) {
        return ((LunarCalendar.LUNAR_DATA[year - 1899] & 0xf) == 0xf)? 30 : 29;
    } else {
        return 0;
    }
}

// 取得農曆year年的總天數
LunarCalendar.prototype.getLunarYearDays = function(year) {
    var sum = 348;
    for(var i=0x8000; i>0x8; i>>=1) { 
        sum += (LunarCalendar.LUNAR_DATA[year - 1900] & i)? 1: 0;
    }
    sum += this.getLeapMonthDays(year);
    return sum;
}

LunarCalendar.prototype.getLunarMonthDays = function(year, month) {
   return (LunarCalendar.LUNAR_DATA[year - 1900] & (0x10000 >> month))? 30 : 29;
}

//
// 算出農曆, 傳入日期物件, 傳回農曆日期物件
// 該物件屬性有 .year .month .day .isLeap
// 轉換成農曆日期
// 好像會少一天？
LunarCalendar.prototype.convertToLunarDate = function(year, month, month_of_day) {
    if (year < 1900 || year >= 2100) {
        return;
    }
    this.solarDate = new Date(year, month - 1, month_of_day);
    this.status = 1;
    // 計算從1900/1/31(??) 0:0:0開始的Timestamp差距
    // 國曆1900年01月31日即農曆1900年元月初一
    var today = Date.UTC(year, month - 1, month_of_day, 0, 0, 0, 0);
    var since = Date.UTC(1900, 0, 31);
    //console.info(today+" - "+since)
    var offset = Math.floor((today - since) / 86400000);
    //
    // 從1900年開始至目標年為止，但也不能超過2100年
    // 逐年扣掉農曆年的天數
    var lunarYear = 1900;
    for (var i=1900; ; i++) {
        lunarYear = i;
        var temp = this.getLunarYearDays(i);
        if (temp > offset) {
            break;
        }
        offset -= temp;
    }
    //
    var lunarMonth = 1;
    var leapMonth = this.getLeapMonth(lunarYear); // 閏哪個月
    var isLeap = false;
    // 由1月開始逐月扣掉
    for (var i=1; i<13; i++) {
        lunarMonth = i;
        var temp = this.getLunarMonthDays(lunarYear, i);
        if (temp > offset) {
            break;
        }
        offset -= temp;
        // 閏月要再扣一次
        if (i == leapMonth) {
            temp = this.getLeapMonthDays(lunarYear);
            if (temp > offset) {
                isLeap = true;
                break;
            }
            offset -= temp;
        }
    }
    var lunarDay = offset;
    //  因為會少一天，要補回去
    lunarDay += 1;
    //console.info(lunarYear+", "+lunarMonth+", "+lunarDay+", "+isLeap);
    //
    // 因為農曆2月會有29天的問題，所以不能直接用Date物件
    // 改用JSON物件
    this.lunarDate = {
      "year"   : lunarYear,
      "month"  : lunarMonth,
      "day"    : lunarDay
    }; // JSON format: {"year": , "month", "day": }
    this.isLeapMonth = isLeap;
    //
    this.currentTerm; // 節氣
    this.status = -1;
};

// 轉換成國曆日期
LunarCalendar.prototype.convertToSolarDate = function(year, month, month_of_day, isLeapMonth) {
    this.status = 1;
    if (year < 1900 || year >= 2100) {
        return;
    }
    var lunarYearDays = LunarCalendar.prototype.getLunarYearDays(year);
    var days = 0;
    // 累計由1900年農曆1/1至前一年的農曆12/31的天數
    for (var i=1900; i<year; i++) {
        days += this.getLunarYearDays(i);
    }
    //
    for (var i=1; i<month; i++) {
        days += this.getLunarMonthDays(year, i);
    }
    if (isLeapMonth && (this.getLeapMonth(year) == month)) { // 如果是閏月，要再加上閏月的天數
        days += this.getLeapMonthDays(year);
    }
    //
    days += month_of_day; // 由西元1900年1/31日至今的天數
    //
    var start = new Date('1900/1/31 00:00:00').getTime();
    this.solarDate = new Date();
    this.solarDate.setTime(start + days * 86400000);
    //
    this.status = 0;
    return this.solarDate;
};

// 該日曆物件是否使用中
LunarCalendar.prototype.isRunning = function() {
    return (this.status === 1);
};

// 某年的第n個節氣為該年的幾日(從0小寒起算)
LunarCalendar.prototype.getSolarTerm = function(year, n) {
    return (LunarCalendar.SOLAR_TERM_BASE[n] + Math.floor( LunarCalendar.SOLAR_TERM_OS.charAt( ( Math.floor(LunarCalendar.SOLAR_TERM_IDX.charCodeAt(year - 1900)) - 48) * 24 + n ) ) );
};


//============================================================================================//

// 日期轉換
// mode, 0: 國轉農, 1: 農轉國
LunarCalendar.prototype.convertDate = function(mode, year, month, month_of_day, isLeapMonth) {
    if (mode === 0) {
        this.convertToLunarDate(year, month, month_of_day);
    } else {
        this.convertToSolarDate(year, month, month_of_day, isLeapMonth);
    }
};

// 將日期時間轉換成干支格式(依節氣換月)
// 傳入國曆年月日時物件
LunarCalendar.prototype.getStemBranchDate = function() {
    // 回傳結果陣列
	var result = [0,0,0,0,0,0,0,0];
	//
    // 依節氣修改月份干支
    // 該年的立春日期(國曆)
    // 立春一定落在國曆2月
    var term_2 = this.getSolarTerm(this.solarDate.getFullYear(), 2);
    // 如果未過立春，要算前一年
    var year = this.solarDate.getFullYear();
    // 國曆2月之前
    if ((this.solarDate.getMonth() < 1) || (this.solarDate.getMonth() == 1 && term_2 > this.solarDate.getDate())) {
        // 未過立春
    	year -= 1;
    } else {
        console.info(term_2+' 已過立春，要算前一年');        
    }
    // 先決定年干及年支
    // 以1900年(庚子年)為基準年
    // 年干
    switch ((year - 1900) % 10) {
        case 0: // 庚
            result[0] = 7;
            break;
        case 1: // 辛
            result[0] = 8;
            break;
        case 2: // 壬
            result[0] = 9;
            break;
        case 3: // 癸
            result[0] = 0;
            break;
        case 4: // 甲
            result[0] = 1;
            break;
        case 5: // 乙
            result[0] = 2;
            break;
        case 6: // 丙
            result[0] = 3;
            break;
        case 7: // 丁
            result[0] = 4;
            break;
        case 8: // 戊
            result[0] = 5;
            break;
        case 9: // 己
            result[0] = 6;
            break;
    }
    // 年支
    switch ((year - 1900) % 12) {
        case 0:  // 子
            result[1] = 1;
            break;
        case 1:  // 丑
            result[1] = 2;
            break;
        case 2:  // 寅
            result[1] = 3;
            break;
        case 3:  // 卯
            result[1] = 4;
            break;
        case 4:  // 辰
            result[1] = 5;
            break;
        case 5:  // 巳
            result[1] = 6;
            break;
        case 6:  // 午
            result[1] = 7;
            break;
        case 7:  // 未
            result[1] = 8;
            break;
        case 8:  // 申
            result[1] = 9;
            break;
        case 9:  // 酉
            result[1] = 10;
            break;
        case 10: // 戌
            result[1] = 11;
            break;
        case 11: // 亥
            result[1] = 0;
            break;
    }
    //
    // 決定完年干及年支後，以年干起五虎遁，決定正月的天干
    switch (result[0]) {
        case 1: // 甲
        case 6: // 己
            result[2] = 3; // 丙
            break;
        case 2: // 乙
        case 7: // 庚
            result[2] = 5; // 戊
            break;
        case 3: // 丙
        case 8: // 辛
            result[2] = 7; // 庚
            break;
        case 4: // 丁
        case 9: // 壬
            result[2] = 9; // 壬
            break;
        case 5: // 戊
        case 0: // 癸
            result[2] = 1; // 甲
            break;
    }
    // 節氣月與農曆月份無關
    // 月柱 1900年1月小寒以前為「丙子」月(60進制12)
    // 傳回當月「節」為幾日開始(國曆)
    // month 0~11
    var month = 0; // 節氣月
    var term_firstDay = 0;
    // 國曆新的一年的節氣從小寒開始，但農曆立春後才算新的一年
    for (var i=0; i <= this.solarDate.getMonth(); i++) {
        this.currentTerm = i * 2;
    	term_firstDay = this.getSolarTerm(this.solarDate.getFullYear(), this.currentTerm);
    	// console.info(i+" 當月「節」為幾日開始: "+term_firstDay);
    	month = i;
    }
    //
    month = (month + 10) % 12;
    // console.info(term_firstDay+", "+this.solarDate.getDate());
    if (term_firstDay <= this.solarDate.getDate()) { // 已過節，算下一個月
    	month = (month + 1) % 12;
    }
    //
    // 月支是依月份，一月是寅、二月是卯...依此類推
    // 農曆N月，要看是否過了該月的節氣
    result[2] = (month + result[2]) % 10; // 月干
    result[3] = (month + 3) % 12; // 月支
    //
    // 日干及日支，可利用西元年的日期計算
    // 配合Unix時間，從西曆1970/1/1(乙酉年丙子月辛巳日)開始算
    // 1900/1/1與1970/1/1相差25567日，1900/1/1日柱為甲戌日(60進制10)
    //
    var days = Math.floor(this.solarDate.getTime() / 86400000) + 25567 + 11; // 一天有86400000 ms
    // 日干
    result[4] = days % 10;
    // 日支
    result[5] = days % 12;
    //console.info(result[4]+", "+result[5]);
    // 接著決定時干及時支
    // 先求子時天干
    // 五鼠遁
    switch (result[4]) {
        case 1: // 甲
        case 6: // 己
            result[6] = 1; // 甲
            break;
        case 2: // 乙
        case 7: // 庚
            result[6] = 3; // 丙
            break;
        case 3: // 丙
        case 8: // 辛
            result[6] = 5; // 戊
            break;
        case 4: // 丁
        case 9: // 壬
            result[6] = 7; // 庚
            break;
        case 5: // 戊
        case 0: // 癸
            result[6] = 9; // 壬
            break;
    }
    // 時支，先轉成24小時制
    result[7] = (Math.round(this.solarDate.getHours() / 2) + 1) % 12; // 時支
    // 因為天干只有10個，而一天有12時辰，所以剩下2個時辰要重複
    // 亥時=0會有邊際效應
    if (result[7] == 0) {
        result[6] = (result[6] + 1) % 10;
    } else if (result[7] == 11) {
        //result[6] = result[6];
    } else {
        result[6] = (result[6] + (result[7] - 1)) % 10;
    }
    //
    return result;
};

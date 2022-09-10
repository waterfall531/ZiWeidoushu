/**
 *
 * 命盤
 */
function Horoscope() {
  this.id = -1; // 命盤編號
  this.name = "未命名"; // 姓名
  this.gender = true; // True:男, False:女
  this.westernBirth = [0, 0, 0]; // 國曆生日{年,月,日}
  this.lunarBirth_org = [0, 0, 0]; // 直接轉換的農曆生日{年,月,日}
  this.lunarBirth = [0, 0, 0]; // 經閏月換算過的農曆生日{年,月,日}
  this.isLeapMonth = false; // 是否為閏月
  this.bornMonth = 0; // 經閏月及本月/下月/半月換算過的生月
  this.bornHour = 0; // 出生時辰地支, 0~11
  this.bornHeavenlyStem = -1; // 生年天干
  this.bornEarthlyBranch = -1; // 生年地支
  //
  this.virtualAge = 0; // 年紀(虛歲)
  // 生年資訊
  this.palace = new Array(); // 命盤十二宮
  this.main_palace_idx = -1; // 命宮位置(宮支)
  this.body_palace_idx = -1; // 身宮位置(宮支)
  this.internalStar = null; // 命主
  this.externalStar = null; // 身主
  this.five_elem_no = 0; // 五行局數
  //
  this.period_no = -1; // 目前為第幾大限
  this.period_palace_id = -1; // 大限宮位
  this.firstYearId = -1; // 小限1歲宮位地支
  // 排盤日的農曆時間
  this.today = new Date();
  this.isready = false;
}

Horoscope.prototype.getUid = function () {
  return "HOROSCOPE_" + this.id;
};

// 命盤編號
Horoscope.prototype.getId = function () {
  return this.id;
};

Horoscope.prototype.setId = function (id) {
  this.id = id;
};

Horoscope.prototype.getName = function () {
  return this.name;
};

Horoscope.prototype.setName = function (name) {
  return this.name;
};

// 取得性別
Horoscope.prototype.getGender = function () {
  return this.gender;
};

// 設定性別，True:男, False:女
Horoscope.prototype.setGender = function (gender) {
  this.gender = gender;
};

// 取得國曆生日
Horoscope.prototype.getWesternBirth = function () {
  return this.westernBirth;
};

// 取得原始農曆生日
Horoscope.prototype.getLunarBirth_Org = function () {
  return this.lunarBirth_org;
};

// 取得經閏月換算過的農曆生日{年,月,日}
Horoscope.prototype.getLunarBirth = function () {
  return this.lunarBirth;
};

// 設為閏月
Horoscope.prototype.setLeapMonth = function (isLeap) {
  this.isLeapMonth = isLeap;
};

// 是否為閏月?
Horoscope.prototype.isLeapMonth = function () {
  return this.isLeapMonth;
};

// 取得生時
Horoscope.prototype.getBornHour = function () {
  return this.bornHour;
};

// 取得生年天干
Horoscope.prototype.getBornHeavenlyStem = function () {
  return this.bornHeavenlyStem;
};

// 取得生年地支
Horoscope.prototype.getBornEarthlyBranch = function () {
  return this.bornEarthlyBranch;
};

// 取得年紀(虛歲)
Horoscope.prototype.getVirtualAge = function () {
  return this.virtualAge;
};

// 取得所有宮位參考
Horoscope.prototype.getPalace = function () {
  return this.palace;
};

// 取得命主
Horoscope.prototype.getInternalStar = function () {
  return this.internalStar;
};

// 取得身主
Horoscope.prototype.getExternalStar = function () {
  return this.externalStar;
};

// 取得五行局數(2~6)
Horoscope.prototype.getFiveElementNo = function () {
  return this.five_elem_no;
};

Horoscope.prototype.getFirstYearId = function () {
  return this.firstYearId;
};

Horoscope.prototype.isReady = function () {
  return this.isready;
};

// 安大限，陽男陰女順行, 陰男陽女逆行
Horoscope.prototype.assignPeriod = function () {
  // 生年天干 (17 + (year - 1900) % 10) % 10
  if (
    (this.bornHeavenlyStem % 2 === 1 && this.gender) ||
    (this.bornHeavenlyStem % 2 === 0 && !this.gender)
  ) {
    // 陽男陰女順行
    // 本大限命宮宮支
    this.period_palace_id = (this.main_palace_idx + this.period_no + 11) % 12;
    for (var i = 0; i < this.palace.length; i++) {
      // 目前工作中的宮位
      //var idx = (this.period_palace_id + i) % 12; // 0~11
      // 該宮位的大限起限歲數
      var periodIdx = i * 10 + this.five_elem_no;
      this.palace[(this.main_palace_idx + i) % 12].setPeriodIdx(periodIdx);
    }
  } else {
    // 陰男陽女逆行
    // 本大限命宮宮支
    this.period_palace_id =
      (this.main_palace_idx - this.period_no + 1 + 12) % 12;
    for (var i = 0; i < this.palace.length; i++) {
      // 目前工作中的宮位
      //var idx = (this.period_palace_id + 24 - i) % 12; // 0~11
      // 該宮位的大限起限歲數
      var periodIdx = i * 10 + this.five_elem_no;
      this.palace[(12 + this.main_palace_idx - i) % 12].setPeriodIdx(periodIdx);
    }
  }
};

// 安小限, 男順女逆
Horoscope.prototype.assignAnnual = function () {
  // 小限1歲宮位地支
  var idx = this.firstYearId;
  if (this.gender) {
    for (var i = 0; i < this.palace.length; i++) {
      this.palace[(idx + i) % 12].setInternalYear(i + 1);
    }
  } else {
    for (var i = 0; i < this.palace.length; i++) {
      this.palace[(12 + idx - i) % 12].setInternalYear(i + 1);
    }
  }
};

// 指定星座落宮
Horoscope.prototype.assignStars = function () {
  // 起紫微星
  var emperorLocation = HoroscopeUtil.getEmperorLocation(
    this.five_elem_no,
    this.lunarBirth
  );
  // 起天府星
  var ministerLocation =
    emperorLocation > 6 ? 18 - emperorLocation : 6 - emperorLocation;
  // 紫微系逆行
  //console.info(this.palace[0].primaryStar);
  this.palace[(emperorLocation + 12) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[0]
  );
  this.palace[(emperorLocation + 12 - 1) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[1]
  );
  this.palace[(emperorLocation + 12 - 3) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[2]
  );
  this.palace[(emperorLocation + 12 - 4) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[3]
  );
  this.palace[(emperorLocation + 12 - 5) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[4]
  );
  this.palace[(emperorLocation + 12 - 8) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[5]
  );
  // 天府系順行
  this.palace[ministerLocation % 12].addPrimaryStar(Dictionary.PRIMARY_STAR[6]);
  this.palace[(ministerLocation + 1) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[7]
  );
  this.palace[(ministerLocation + 2) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[8]
  );
  this.palace[(ministerLocation + 3) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[9]
  );
  this.palace[(ministerLocation + 4) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[10]
  );
  this.palace[(ministerLocation + 5) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[11]
  );
  this.palace[(ministerLocation + 6) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[12]
  );
  this.palace[(ministerLocation + 10) % 12].addPrimaryStar(
    Dictionary.PRIMARY_STAR[13]
  );
  //
  // 其他星
  // 祿存
  var cofferLocation = HoroscopeUtil.getCofferLocation(this.bornHeavenlyStem); // 生年祿存位
  // 同時可排羊陀, 博士十二星
  this.palace[cofferLocation].addPrimaryStar(Dictionary.COFFER_STAR);
  // 羊陀
  this.palace[(1 + cofferLocation) % 12].addBadStar(Dictionary.BAD_STAR[0]);
  this.palace[(11 + cofferLocation) % 12].addBadStar(Dictionary.BAD_STAR[1]);
  // 博士十二星
  // 陽男陰女順行
  if (
    (this.bornEarthlyBranch % 2 === 1 && this.gender) ||
    (this.bornEarthlyBranch % 2 === 0 && !this.gender)
  ) {
    for (var i = 0; i < 12; i++) {
      this.palace[(cofferLocation + i) % 12].addWizard(
        Dictionary.TWELVE_WIZARD[i]
      );
    }
  } else {
    // 陰男陽女逆行
    for (var i = 0; i < 12; i++) {
      this.palace[(cofferLocation + 12 - i) % 12].addWizard(
        Dictionary.TWELVE_WIZARD[i]
      );
    }
  }
  //
  var loc = new Array();
  // 華蓋
  loc = HoroscopeUtil.getOtherStarLocation(
    this.main_palace_idx,
    this.body_palace_idx,
    this.bornHeavenlyStem,
    this.bornEarthlyBranch,
    this.bornMonth + 2,
    this.lunarBirth[2],
    this.bornHour
  );
  this.palace[loc[0]].addWizard(Dictionary.GENERAL_SERIES[4]);
  //
  // 左輔/右弼
  loc = HoroscopeUtil.getAssistantStarLocation(this.bornMonth + 2);
  this.palace[loc[0]].addNiceStar(Dictionary.NICE_STAR[2]); // 左輔
  this.palace[loc[1]].addNiceStar(Dictionary.NICE_STAR[3]); // 右弼
  // 文昌/文曲
  loc = HoroscopeUtil.getLiteratureStarLocation(this.bornHour);
  this.palace[loc[0]].addNiceStar(Dictionary.NICE_STAR[0]); // 文昌
  this.palace[loc[1]].addNiceStar(Dictionary.NICE_STAR[1]); // 文曲
  // 天魁/天鉞
  loc = HoroscopeUtil.getVIPStarLocation(this.bornHeavenlyStem);
  this.palace[loc[0]].addNiceStar(Dictionary.NICE_STAR[4]); // 天魁
  this.palace[loc[1]].addNiceStar(Dictionary.NICE_STAR[5]); // 天鉞
  // 火星/鈴星
  loc = HoroscopeUtil.getFlameStarLocation(
    this.bornEarthlyBranch,
    this.bornHour
  );
  this.palace[loc[0]].addBadStar(Dictionary.BAD_STAR[2]);
  this.palace[loc[1]].addBadStar(Dictionary.BAD_STAR[3]);
  //
  // 地空/地劫
  loc = HoroscopeUtil.getHollowStarLocation(
    this.bornHeavenlyStem,
    this.bornHour
  );
  this.palace[loc[0]].addHollowStar(Dictionary.HOLLOW_STAR[0]);
  this.palace[loc[1]].addHollowStar(Dictionary.HOLLOW_STAR[1]);
  // 截空
  this.palace[loc[2]].addHollowStar(Dictionary.HOLLOW_STAR[2]);
  // 旬空(還要改)
  // palace[loc[3]].addHollowStar(Dictionary.HOLLOW_STAR[3]);
  //=====================================================================
  // 乙級星
  //命宮地支,身宮地支,年干,年支,月支,生日,時辰
  loc = HoroscopeUtil.getSecondaryStarLocation(
    this.main_palace_idx,
    this.body_palace_idx,
    this.bornHeavenlyStem,
    this.bornEarthlyBranch,
    this.bornMonth + 2,
    this.lunarBirth[2],
    this.bornHour
  );
  for (var i = 0; i < Dictionary.SECONDARY_STAR.length; i++) {
    this.palace[loc[i]].addSecondaryStar(Dictionary.SECONDARY_STAR[i]);
  }
  // 指定生年四化
  var fourTransStar = HoroscopeUtil.getFourTransStar(this.bornHeavenlyStem);
  for (var i = 0; i < this.palace.length; i++) {
    for (var j = 0; j < fourTransStar.length; j++) {
      var idx1 = this.palace[i].getPrimaryStar().indexOf(fourTransStar[j]);
      var idx2 = this.palace[i].getNiceStar().indexOf(fourTransStar[j]);
      if (idx1 >= 0 || idx2 >= 0) {
        this.palace[i].addTransformStar(fourTransStar[j], j);
      }
    }
  }
  //
};

// 建立命盤
// 取得排盤農曆日期
Horoscope.prototype.create = function (
  _name,
  _gender,
  _western,
  _birth,
  _bornHour,
  _isLeapMonth
) {
  var _horoscope = this;
  this.name = _name;
  this.gender = _gender;
  //
  var cal = new LunarCalendar();
  // 計算排盤日的農曆日期
  var currentDate = new Date();
  //console.info('排盤日的國曆日期： '+currentDate.toLocaleString());
  cal.convertDate(
    0,
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    false
  );
  //
  var intervalID = setInterval(function () {
    if (!cal.isRunning()) {
      clearInterval(intervalID);
      _horoscope.today = cal.solarDate;
      _horoscope.init(_western, _birth, _bornHour, _isLeapMonth);
    }
  }, 100);
  //
};

// 國農曆日期轉換
Horoscope.prototype.init = function (
  _western,
  _birth,
  _bornHour,
  _isLeapMonth
) {
  var _horoscope = this;
  this.bornHour = _bornHour;
  //
  if (_western) {
    // 西曆
    this.westernBirth = _birth;
    var cal = new LunarCalendar();
    cal.convertDate(0, _birth[0], _birth[1], _birth[2]);
    var intervalID = setInterval(function () {
      if (!cal.isRunning()) {
        clearInterval(intervalID);
        // 檢查否成功轉換
        if (
          cal.lunarDate.year <= 0 ||
          cal.lunarDate.month <= 0 ||
          cal.lunarDate.day <= 0
        ) {
          alert("輸入國曆日期不正確！");
          return;
        }
        // 保留原始轉換的生辰(月份直接用)
        _horoscope.lunarBirth_org = [
          cal.lunarDate.year,
          cal.lunarDate.month,
          cal.lunarDate.day,
        ];
        _horoscope.lunarBirth = [
          cal.lunarDate.year,
          cal.lunarDate.month,
          cal.lunarDate.day,
        ];
        _horoscope.isLeapMonth = cal.isLeapMonth;
        // 開始處理閏月問題
        if (_horoscope.isLeapMonth) {
          switch (Dictionary.LEAP_MONTH_MODE) {
            case 0: // 本月論，如果是閏5月，則做5月論
              _horoscope.bornMonth = _horoscope.lunarBirth[1];
              break;
            case 1: // 月中論，如果是閏5月，前15天做5月論，後15天做6月論
              if (_horoscope.lunarBirth[2] > 15) {
                _horoscope.bornMonth = _horoscope.lunarBirth[1] + 1;
              } else {
                _horoscope.bornMonth = _horoscope.lunarBirth[1];
              }
              break;
            case 2: // 下月論，如果是閏5月，則做6月論
            default:
              _horoscope.bornMonth = _horoscope.lunarBirth[1] + 1;
              break;
          }
          //
        } else {
          _horoscope.bornMonth = _horoscope.lunarBirth[1];
        }
        // 開始排盤
        _horoscope.caculate();
      }
    }, 100);
  } else {
    // 農曆
    // 還沒有驗證過
    this.lunarBirth_org = _birth;
    var cal = new LunarCalendar();
    cal.convertDate(1, _birth[0], _birth[1], _birth[2]);
    var intervalID = setInterval(function () {
      if (!cal.isRunning()) {
        clearInterval(intervalID);
        _horoscope.westernBirth = [
          cal.solarDate.getFullYear(),
          cal.solarDate.getMonth() + 1,
          cal.solarDate.getDate(),
        ];
        _horoscope.isLeapMonth = cal.isLeapMonth;
        // 開始排盤
        _horoscope.caculate();
      }
    }, 100);
  }
  //
};

Horoscope.prototype.caculate = function () {
  //
  this.bornHeavenlyStem = (17 + this.lunarBirth[0] - 1900) % 10;
  this.bornEarthlyBranch = (13 + ((this.lunarBirth[0] - 1900) % 12)) % 12;
  // 指定太歲
  this.heavenly_stem = (this.today.getFullYear() - 1893) % 10; // 1893年是癸巳年
  this.earthly_branch = (this.today.getFullYear() - 1893 + 6) % 12;
  // 計算虛歲
  this.virtualAge = this.today.getFullYear() - this.lunarBirth[0] + 1;
  // 以寅月為正月，month=1
  // 命宮為生月起子，逆數至生時
  this.main_palace_idx = (12 + this.bornMonth + 2 - this.bornHour + 1) % 12; // 命宮位置
  // 身宮為生月起子，順數至生時
  this.body_palace_idx = (this.bornMonth + 2 + this.bornHour - 1) % 12; // 身宮位置
  //
  // 安命主
  if (this.main_palace_idx > 0 && this.main_palace_idx < 8) {
    this.internalStar = Dictionary.INNATE_MASTER[this.main_palace_idx - 1];
  } else {
    this.internalStar =
      Dictionary.INNATE_MASTER[(13 - this.main_palace_idx) % 12];
  }
  // 安身主（生年地支）(13 + (year - 1900) % 12) % 12; // 生年地支
  this.externalStar =
    Dictionary.ACQUIRED_MASTER[((5 + this.bornEarthlyBranch) % 6) % 6];
  // 起寅首（生年天干）(17 + (year - 1900) % 10) % 10
  var firstMonthHeavenlyStemId = HoroscopeUtil.getFirstMonthHeavenlyStemId(
    this.bornHeavenlyStem
  ); // 寅(月)首
  // 十二宮
  // 安干支及本命宮名
  // i=0為亥位，i=2為子位...
  for (var i = 0; i < 12; i++) {
    this.palace.push(null);
  }
  //
  for (var i = 0; i < this.palace.length; i++) {
    var id = 11 - ((14 + i - this.main_palace_idx) % 12);
    var _p = new Palace();
    _p.setHeavenklyStem((firstMonthHeavenlyStemId + i) % 10);
    _p.setEarthlyBranch((i + 3) % 12);
    _p.setName(Dictionary.PALACE[id]);
    this.palace[(i + 3) % 12] = _p;
  }
  // 設定身宮
  this.palace[this.body_palace_idx].setAcquired(true);
  // 起五行局（要先安完各宮干支）
  // 以命宮的干支來決定
  this.five_elem_no = HoroscopeUtil.getFiveElementNO(
    this.palace[this.main_palace_idx].getHeavenklyStem(),
    this.palace[this.main_palace_idx].getEarthlyBranch()
  );
  //
  // 決定為第幾大限
  this.period_no = Math.floor(this.virtualAge / 10);
  if (this.virtualAge % 10 >= this.five_elem_no) {
    this.period_no++;
  }
  // 小限1歲宮位地支
  this.firstYearId = HoroscopeUtil.getInternalYearIdx(this.bornEarthlyBranch);
  // 小限男順女逆行
  if (this.gender) {
    this.annual_palace_id =
      ((this.virtualAge % 12) + this.firstYearId + 11) % 12;
  } else {
    this.annual_palace_id =
      ((this.virtualAge % 12) + this.firstYearId + 1) % 12;
  }
  // 安大限，陽男陰女順行, 陰男陽女逆行
  //setPeriodNo(this.period_no);
  this.assignPeriod();
  // 安小限, 男順女逆
  //setAnnualYear(currentDate[0]);
  this.assignAnnual();
  // 安本命星
  this.assignStars();
  //
  this.isready = true;
};

Horoscope.getHoroscopeHtml = function (
  name,
  gender,
  westen,
  birthDate,
  bornHour,
  isLeapMonth,
  callback
) {
  var hs = new Horoscope();
  hs.create(name, gender, westen, birthDate, bornHour, isLeapMonth);
  //
  var hid = setInterval(function () {
    if (hs.isReady()) {
      clearInterval(hid);
      var hs_html = HtmlUtility.toHTML(hs);
      if (callback !== undefined && callback !== null) {
        callback(hs_html, hs.name);
      }
    }
  }, 100);
};

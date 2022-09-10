function HtmlUtility() {}

HtmlUtility.EMPTY_CHAR = "　";

// 輸出成HTML格式字串
HtmlUtility.toHTML = function (horoscope) {
  //get 命盤中宮
  var summary = HtmlUtility.transSummaryToHTML(horoscope);
  //
  var palace_content = new Array();
  var palace = horoscope.getPalace();
  //
  for (var id = 0; id < 12; id++) {
    palace_content[id] = HtmlUtility.transPalaceToHTML(palace[id]);
  }

  //6 7 8 9
  //5  s  10
  //4  s  11
  //3 2 1 0
  var html;
  html = "<!DOCTYPE html>";
  html += '<html lang="zh-tw">';
  html += "<head>";
  html +=
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
  html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
  html += "<title>紫微斗數排盤 - " + horoscope.getName() + "</title>";
  html += '<script src="lib/js/jquery-3.2.1.slim.min.js"></script>';
  html += '<script src="lib/js/bootstrap.min.js"></script>';
  html += '<link rel="stylesheet" href="lib/css/bootstrap.min.css">';
  html += '<link rel="stylesheet" href="lib/css/new.css">';
  html += "</head>";
  html += "<body>";
  html += '<div class="container">';

  html += '<div class="row">';
  for (var i = 6; i <= 9; i++) {
    html += '<div class="col-3">';
    html += palace_content[i];
    html += "</div>";
  }
  html += "</div>";

  html += '<div class="row">';
  html += '<div class="col-3">';
  html += '<div class="col-half">';
  html += '<div class="col-12">';
  html += palace_content[5];
  html += "</div>";
  html += "</div>";
  html += '<div class="col-half">';
  html += '<div class="col-12">';
  html += palace_content[4];
  html += "</div>";
  html += "</div>";
  html += "</div>";
  html += '<div class="col-6">';
  html += summary;
  html += "</div>";
  html += '<div class="col-3">';
  html += '<div class="col-half">';
  html += '<div class="col-12">';
  html += palace_content[10];
  html += "</div>";
  html += "</div>";
  html += '<div class="col-half">';
  html += '<div class="col-12">';
  html += palace_content[11];
  html += "</div>";
  html += "</div>";
  html += "</div>";
  html += "</div>";

  html += '<div class="row">';
  for (var i = 3; i >= 0; i--) {
    html += '<div class="col-3">';
    html += palace_content[i];
    html += "</div>";
  }
  html += "</div>";

  html += "</div>";

  console.log(html);
  return html;
};

/**
 * 將命盤中宮資料以HTML格式輸出
 * @param horoscope 命盤
 * @returns 中宮資料HTML格式
 */
HtmlUtility.transSummaryToHTML = function (horoscope) {
  // 中宮資料
  // 寛21個字元, 高14個字元
  var content;
  // var column_idx;
  // var row_idx;
  // 不需要預填空白
  // for (column_idx = 0; column_idx < 14; column_idx++) {
  //     var row = new Array();
  //     for (row_idx = 0; row_idx < 21; row_idx++) {
  //         row.push(HtmlUtility.EMPTY_CHAR);
  //     }
  //     content.push(row);
  // }
  //

  /* Hope Output
    <div class="summary">
    陰男 @name
    </div>
    */
  content = '<div class="summary">';
  content += horoscope.getBornHeavenlyStem() % 2 === 0 ? "陰" : "陽";
  content += horoscope.getGender() ? "男 " : "女 ";
  content += HtmlUtility.convertName(horoscope.getName());
  content += "</div>";

  /*
    <div class="summary">
    國曆 <span class="summary_tb">06</span>年<span class="summary_tb">11</span>月<span class="summary_tb">27</span>日 子時
    </div>
    */
  var westBirth = horoscope.getWesternBirth();
  content += '<div class="summary">';
  content += "國曆 ";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(westBirth[0] - 1911) +
    "</span>年";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(westBirth[1]) +
    "</span>月";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(westBirth[2]) +
    "</span>日 ";
  content +=
    '<span class="summary_tb">' +
    Dictionary.EARTHLY_BRANCH[horoscope.getBornHour()] +
    "</span>時";
  content += "</div>";
  /*
    <div class="summary">
    農曆 <span class="summary_tb">06</span>年<span class="summary_tb">10</span>月<span class="summary_tb">10</span>日 子時
    </div>
    */
  var lunarBirth_Org = horoscope.getLunarBirth_Org();
  var lunarBirth = horoscope.getLunarBirth();
  content += '<div class="summary">';
  content += "農曆 ";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(lunarBirth[0] - 1911) +
    "</span>年";
  if (horoscope.isLeapMonth) {
    content +=
      '<span class="summary_tb">' +
      HtmlUtility.to2DigFormat(lunarBirth[1]) +
      "</span>";
    content += "<span class='summary_leapmonth' >閏</span>";
  } else {
    content +=
      "<span class='summary_tb' >" +
      HtmlUtility.to2DigFormat(lunarBirth_Org[1]) +
      " </span>";
  }
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(lunarBirth[1]) +
    "</span>月";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(lunarBirth[2]) +
    "</span>日 ";
  content +=
    '<span class="summary_tb">' +
    Dictionary.EARTHLY_BRANCH[horoscope.getBornHour()] +
    "</span>時";
  content += "</div>";
  /*
    <div class="summary">
    年齡 <span class="summary_tb">01</span>歲四月
    </div>
    */
  content += '<div class="summary">';
  content += "年齡 ";
  content +=
    '<span class="summary_tb">' +
    HtmlUtility.to2DigFormat(horoscope.getVirtualAge()) +
    "</span>歲";
  content += "</div>";
  /*
    <div class="summary">
    命主 天同
    </div>
    */
  var int_star = horoscope.getInternalStar();
  var ext_star = horoscope.getExternalStar();
  content += '<div class="summary">';
  content += "命主 " + int_star;
  content += "</div>";
  /*
    <div class="summary">
    身主 丁金
    </div>
    */
  content += '<div class="summary">';
  content += "身主 " + ext_star;
  content += "</div>";
  // 五行局
  /*
    <div class="summary">
    五行局 水二
    </div>
    */
  var five_elem_case = Dictionary.getFiveElementCase(
    horoscope.getFiveElementNo()
  );
  content += '<div class="summary">';
  content += "五行局 " + five_elem_case;
  content += "</div>";
  /*
    <div class="summary">
    歲次 壬酉
    </div>
    */
  content += '<div class="summary">';
  content +=
    "歲次 " +
    Dictionary.HEAVENLY_STEM[horoscope.getBornHeavenlyStem()] +
    Dictionary.EARTHLY_BRANCH[horoscope.getBornEarthlyBranch()];
  content += "</div>";
  var palace = horoscope.getPalace();
  /*
    <div class="summary">
    大限 壬酉
    </div>
    */
  content += '<div class="summary">';
  content +=
    "大限  " +
    Dictionary.HEAVENLY_STEM[
      palace[horoscope.period_palace_id].getHeavenklyStem()
    ] +
    Dictionary.EARTHLY_BRANCH[
      palace[horoscope.period_palace_id].getEarthlyBranch()
    ];
  content += "</div>";
  return content;
};

/**
 * 將各宮資料以HTML格式輸出
 * @param palace 宮位
 * @returns 宮位HTML格式(Array)
 */
HtmlUtility.transPalaceToHTML = function (palace) {
  //
  var content;
  // 開始col_bottom
  content = "<div class='col_bottom' >";
  // 安大限歲數範圍用半型字
  var _start = palace.getPeriodIdx();
  var _stop = _start + 9;
  if (_start < 90) {
    if (_start < 10) {
      content += "<div class='period_range' >0" + (_start % 10);
    } else {
      content += "<div class='period_range' >" + (_start % 100);
    }
    content += "－" + _stop + "</div>";
  } else {
    content += "<div class='period_range' >&nbsp;</div>";
  }
  /*
    <div class="col_bottom">
    <div class="internal_age">11 23 35 47 59 71 83 95</div>
    </div>
    */
  // 小限歲數
  //console.info(palace.name+": "+palace.getInternalYear());
  var _internal_year = parseInt(palace.getInternalYear()) % 12;
  if (_internal_year === 0) {
    _internal_year = 12;
  }
  var _internal_year_string = "";
  for (var i = 0; i < 8; i++) {
    _internal_year_string = _internal_year_string.concat(
      _internal_year + 12 * i + " "
    );
  }
  content += "<div class='internal_age' >" + _internal_year_string + "</div>";
  content += "</div>";
  // 結束col_bottom

  //開始col_right
  content += '<div class="col_right">';
  // 宮位名稱
  /*
    <div class="palace_name">
    遷移宮
    </div>
    */
  var placeName = palace.getName();
  if (placeName !== null) {
    content += '<div class="palace_name">';
    content += placeName + "宮";
    content += "</div>";
  }
  // 安身宮
  if (palace.isAcquired()) {
    content += '<div class="palace_name">';
    content += "身宮";
    content += "</div>";
  }
  /*
    <div class="primary_star">
    天機
    <span class="transform_star">科</span>
    </div>
    <div class="nice_star_class">文昌</div>
    <div class="bad_star">陀羅</div>
    <div class="secondary_star">天馬</div>
    <div class="secondary_star">破碎</div>
    */
  // 四化星
  var transformStar = palace.getTransformStar();
  var transformStarIdx = palace.getTransformStarIdx();
  // 甲級星
  var primaryStar = palace.getPrimaryStar();
  //
  for (var i = 0; i < primaryStar.length; i++) {
    if (primaryStar[i] !== null) {
      content += "<div class='primary_star' >" + primaryStar[i];
      var idx = transformStar.indexOf(primaryStar[i]);
      if (idx >= 0) {
        // 帶有四化
        content +=
          "<span class='transform_star' >" +
          Dictionary.TRANSFORM_STAR[transformStarIdx[idx]] +
          "</span>";
      }
      content += "</div>";
    }
  }
  // 六吉星
  var niceStar = palace.getNiceStar();
  for (i = 0; i < niceStar.length; i++) {
    if (niceStar[i] !== null) {
      content += "<div class='nice_star' >" + niceStar[i];
      var idx = transformStar.indexOf(niceStar[i]);
      if (idx >= 0) {
        // 帶有四化
        content +=
          "<span class='transform_star' >" +
          Dictionary.TRANSFORM_STAR[transformStarIdx[idx]] +
          "</span>";
      }
      content += "</div>";
    }
  }
  // 將四煞與空亡一起處理
  // 四煞星
  var badStar = palace.getBadStar();
  for (i = 0; i < badStar.length; i++) {
    if (badStar[i] !== null) {
      content += "<div class='bad_star' >" + badStar[i] + "</div>";
    }
  }
  // 空亡星
  var hollowStar = palace.getHollowStar();
  for (i = 0; i < hollowStar.length; i++) {
    if (hollowStar[i] !== null) {
      content += "<div class='hollow_star' >" + hollowStar[i] + "</div>";
    }
  }
  // 乙級星
  var secondaryStar = palace.getSecondaryStar();
  for (i = 0; i < secondaryStar.length; i++) {
    if (secondaryStar[i] !== null) {
      content += "<div class='secondary_star' >" + secondaryStar[i] + "</div>";
    }
  }
  content += "</div>";
  //結束col_right

  // 宮位干支
  /*
    <div class="col_left">
    <div class="palace_stem">乙巳</div>
    </div>
    */
  content += '<div class="col_left">';
  content += Dictionary.HEAVENLY_STEM[palace.getHeavenklyStem()];
  content += Dictionary.EARTHLY_BRANCH[palace.getEarthlyBranch()];
  content += "</div>";
  //
  return content;
};

// 將數字轉成全型
HtmlUtility.convertNumber = function (num) {
  switch (num) {
    case 0:
      return "０";
    case 1:
      return "１";
    case 2:
      return "２";
    case 3:
      return "３";
    case 4:
      return "４";
    case 5:
      return "５";
    case 6:
      return "６";
    case 7:
      return "７";
    case 8:
      return "８";
    case 9:
      return "９";
  }
};

// 將數字轉成2位數
HtmlUtility.to2DigFormat = function (num) {
  var _temp = "" + (num + 100);
  return _temp.substr(1, 2);
};

// 檢查Name，將之轉為全形
HtmlUtility.convertName = function (name) {
  var new_name = "";
  var char_array = name.split("");
  //console.info(char_array);
  for (var i = 0; i < char_array.length; i++) {
    var ascii_code = char_array[i].charCodeAt(0);
    if (ascii_code < 127 && ascii_code > 1) {
      // 半形 空格 ASCII 為 32 , 全形 空格 ASCII 為12288
      // 其他字元 半形ASCII 33~126 與 全形ASCII 65281~65374 對應之 ASCII 皆相差 65248
      // 全形符號 〔 〕’  轉 半型時 ASCII 對應關係不同 ， 因此直接用 Replace 做處理
      new_name = new_name.concat(String.fromCharCode(ascii_code + 65248));
    } else {
      new_name = new_name.concat(char_array[i]);
    }
  }
  return new_name;
};

// 偵測瀏覧器版本
HtmlUtility.detectBrowser = function () {
  var nVer = navigator.appVersion;
  var navigatorAgent = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = "" + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameShift, versionShift, trimSemicolon;
  if ((versionShift = navigatorAgent.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = navigatorAgent.substring(versionShift + 6);
    if ((versionShift = navigatorAgent.indexOf("Version")) != -1) {
      fullVersion = navigatorAgent.substring(versionShift + 8);
    }
  } else if ((versionShift = navigatorAgent.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = navigatorAgent.substring(versionShift + 5);
  } else if ((versionShift = navigatorAgent.indexOf("Sleipnir")) != -1) {
    browserName = "Sleipnir";
    fullVersion = navigatorAgent.substring(versionShift + 9);
  } else if ((versionShift = navigatorAgent.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = navigatorAgent.substring(versionShift + 7);
  } else if ((versionShift = navigatorAgent.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = navigatorAgent.substring(versionShift + 7);
    if ((versionShift = navigatorAgent.indexOf("Version")) != -1) {
      fullVersion = navigatorAgent.substring(versionShift + 8);
    }
  } else if ((versionShift = navigatorAgent.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = navigatorAgent.substring(versionShift + 8);
  } else if (
    (nameShift = navigatorAgent.lastIndexOf(" ") + 1) <
    (versionShift = navigatorAgent.lastIndexOf("/"))
  ) {
    // 多數瀏覽器中，“名稱/版本”是在 userAgent 的結尾
    browserName = navigatorAgent.substring(nameShift, versionShift);
    fullVersion = navigatorAgent.substring(versionShift + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // 如果分號存在修剪分號
  if ((trimSemicolon = fullVersion.indexOf(";")) != -1) {
    fullVersion = fullVersion.substring(0, trimSemicolon);
  }
  if ((trimSemicolon = fullVersion.indexOf(" ")) != -1) {
    fullVersion = fullVersion.substring(0, trimSemicolon);
  }
  majorVersion = parseInt("" + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = "" + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  //
  var info = {
    browerName: browserName,
    fullVersion: fullVersion,
    majorVersion: majorVersion,
    appName: navigator.appName,
    userAgent: navigator.userAgent,
  };
  //
  //console.info(info);
  return info;
};

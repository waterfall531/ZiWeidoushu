/**
 *
 * 命盤宮位物件
 */
function Palace() {
    this.name = ''; // 十二人事宮名
    this.heavenklyStem = -1; // 宮位天干
    this.earthlyBranch = -1; // 宮位地支
    this._isAcquired = false; // 是否為身宮
    this.periodIdx = 0; // 大限(起限歲數)
    this.internalYear = 0; // 小限歲數(依大限而變)
    this.primaryStar = new Array(); //甲級星/十四主星
    this.niceStar = new Array(); // 六吉星&祿存
    this.badStar = new Array(); // 四煞星
    this.secondaryStar = new Array(); // 乙級星
    this.hollowStar = new Array(); // 空亡星
    this.wizard = new Array(); // 神煞
    this.transformStar = new Array(); // 四化星
    this.transformStarIdx = new Array(); // 四化星Index
};
/*
// 十二人事宮名
Palace.prototype.name;
// 宮位天干
Palace.prototype.heavenklyStem;
// 宮位地支
Palace.prototype.earthlyBranch;
// 是否為身宮
Palace.prototype.isAcquired;
// 大限(起限歲數)
Palace.prototype.periodIdx;
// 小限歲數(依大限而變)
Palace.prototype.internalYear;
//甲級星,十四主星
Palace.prototype.primaryStar;
// 六吉星&祿存
Palace.prototype.niceStar;
// 四煞星
Palace.prototype.badStar;
// 乙級星
Palace.prototype.secondaryStar;
// 空亡星
Palace.prototype.hollowStar;
// 神煞
Palace.prototype.wizard;
// 四化星
Palace.prototype.transformStar;
//
*/
Palace.prototype.getName = function() {
    return this.name;
};

Palace.prototype.setName = function(name) {
    this.name = name;
};

Palace.prototype.getHeavenklyStem = function() {
    return this.heavenklyStem;
};

Palace.prototype.setHeavenklyStem = function(heavenklyStem) {
    this.heavenklyStem = heavenklyStem;
};

Palace.prototype.getEarthlyBranch = function() {
    return this.earthlyBranch;
};

Palace.prototype.setEarthlyBranch = function(earthlyBranch) {
    this.earthlyBranch = earthlyBranch;
};

Palace.prototype.isAcquired = function() {
    return this._isAcquired;
};

Palace.prototype.setAcquired = function(isAcquired) {
    this._isAcquired = isAcquired;
};

Palace.prototype.getPeriodIdx = function() {
    return this.periodIdx;
};

Palace.prototype.setPeriodIdx = function(periodIdx) {
    this.periodIdx = periodIdx;
};

Palace.prototype.getInternalYear = function() {
    return this.internalYear;
};

Palace.prototype.setInternalYear = function(internalYear) {
    this.internalYear = internalYear;
};
//
Palace.prototype.addPrimaryStar = function(star) {
    //console.info('Add '+star+' into Palace '+this.earthlyBranch);
    this.primaryStar.push(star);
};
Palace.prototype.getPrimaryStar = function() {
    return this.primaryStar;
};
//
Palace.prototype.addNiceStar = function(star) {
    this.niceStar.push(star);
};
Palace.prototype.getNiceStar = function() {
    return this.niceStar;
};
//
Palace.prototype.addBadStar = function(star) {
    this.badStar.push(star);
};
Palace.prototype.getBadStar = function() {
    return this.badStar;
};
//
Palace.prototype.addSecondaryStar = function(star) {
    this.secondaryStar.push(star);
};
Palace.prototype.getSecondaryStar = function() {
    return this.secondaryStar;
};
//
Palace.prototype.addHollowStar = function(star) {
    this.hollowStar.push(star);
};
Palace.prototype.getHollowStar = function() {
    return this.hollowStar;
};
//
Palace.prototype.addWizard = function(star) {
    this.wizard.push(star);
};
Palace.prototype.getWizardStar = function() {
    return this.wizardStar;
};
//
Palace.prototype.addTransformStar = function(transformStar, idx) {
    //
    this.transformStar.push(transformStar);
    this.transformStarIdx.push(idx);
};
Palace.prototype.getTransformStar = function() {
    return this.transformStar;
};
Palace.prototype.getTransformStarIdx = function() {
    return this.transformStarIdx;
};
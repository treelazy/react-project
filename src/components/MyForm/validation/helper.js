// this helper function is still in development
const RegexStr = function () {
  const _bopomofo = "\\u3105-\\u3129";
  const _cjk = "\\u4e00-\\u9fff";
  const _cjkExtensionA = "\\u3400-\\u4dbf";
  const _cjkExtensionB = "\\u{20000}-\\u{2A6DF}";
  const _cjkExtensionC = "\\u{2A700}-\\u{2B73F}";
  const _cjkExtensionD = "\\u{2B740}–\\u{2B81F}";
  const _cjkExtensionE = " \\u{2B820}–\\u{2CEAF}";

  // u tag of regex is required when using this chinese string fragment,
  // since it contains 5bytes unicodes. eg: "\\u{20000}-\\u{2A6DF}"
  const _chinese =
    _bopomofo +
    _cjk +
    _cjkExtensionA +
    _cjkExtensionB +
    _cjkExtensionC +
    _cjkExtensionD +
    _cjkExtensionE;

  const _halfAllEng = "A-Za-z";

  // fullwidthａ-ｚ
  const _fullLowerEng = "\\uff41-\\uff5a";

  // fullwidth Ａ-Ｚ
  const _fullUpperEng = "\\uff21-\\uff3a";

  // fullwidthａ-ｚＡ-Ｚ
  const _fullAllEng = _fullLowerEng + _fullUpperEng;

  // \uff10-\uff19: fullwidth number(０-９)
  const _fullNum = "\\uff10-\\uff19";

  const _halfNum = "0-9";
};

// the reson of the following regex being such huge is because it covers CJK Extension A~E
// 下面正規表示法會這麼長是因為把CJK擴充中文字庫A~E全部加進去了
function regexForTag() {
  return /^[a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
}
function regexForOrgName() {
  return /^[\s\uff10-\uff19\uff41-\uff5a\uff21-\uff3aa-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
}
function regexForAnyChinese() {
  return /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu;
}

export { regexForTag, regexForOrgName, regexForAnyChinese };

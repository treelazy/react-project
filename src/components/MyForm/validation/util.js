// the reson of the following regex being such huge is because it covers CJK Extension A~E
// 下面正規表示法會這麼長是因為把CJK擴充中文字庫A~E全部加進去了

const rgx = {
  // 編號的邏輯
  forTag() {
    return /^[a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
  },
  // 組織名稱的邏輯
  forOrgName() {
    return /^[\s\uff10-\uff19\uff41-\uff5a\uff21-\uff3aa-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
  },
  // 重量欄位的邏輯
  forWeight() {
    return /^\d{0,7}(\.\d{1,2})?$/;
  },
  // 符合中文的字元都找出來
  findAnyChinese() {
    return /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu;
  },
  // 不能斷行
  noNewline() {
    return /^.*$/;
  },
  // 不能有空白
  noSpace() {
    return /^[^\s]*$/;
  },
  // 正整數, 不可以是零開頭
  positiveInts() {
    return /(^[1-9][0-9]*$)|(^0$)/;
  },
  // 正整數，可以是零開頭
  positiveIntsZeroPrefix() {
    return /^[0-9]*$/;
  },
};

export default rgx;

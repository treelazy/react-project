// the reson of the following regex being such huge is because it covers CJK Extension A~E
// 下面正規表示法會這麼長是因為把CJK擴充中文字庫A~E全部加進去了

const rgx = {
  forTag() {
    return /^[a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
  },
  forOrgName() {
    return /^[\s\uff10-\uff19\uff41-\uff5a\uff21-\uff3aa-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]*$/u;
  },
  findAnyChinese() {
    return /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu;
  },
  forWeight() {
    return /^\d{0,7}(\.\d{1,2})?$/;
  },
  noNewline() {
    return /^.*$/;
  },
  noSpace() {
    return /^[^\s]*$/;
  },
  positiveInts() {
    return /(^[1-9][0-9]*$)|(^0$)/;
  },
};

export default rgx;

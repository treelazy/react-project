import { useEffect, useState } from "react";

function useChineseCharsCount(description) {
  const [charCounts, setCharCounts] = useState(0);
  useEffect(() => {
    const chineseChars =
      description?.match(
        /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu
      ) || "";
    const otherChars =
      description?.replace(
        /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}–\u{2B81F}\u{2B820}–\u{2CEAF}\u3105-\u3129]/gu,
        ""
      ) || "";
    // a chinese char count as 3
    setCharCounts(chineseChars.length * 3 + otherChars.length);
  }, [description]);
  return charCounts;
}

export { useChineseCharsCount };

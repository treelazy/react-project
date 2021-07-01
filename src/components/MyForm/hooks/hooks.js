import { useEffect, useState } from "react";
import { regexForAnyChinese } from "../validation/helper";

function useChineseCharsCount(description = "") {
  const [charCounts, setCharCounts] = useState(0);
  useEffect(() => {
    const chineseChars = description?.match(regexForAnyChinese()) || "";
    const otherChars = description?.replace(regexForAnyChinese(), "") || "";
    // a chinese char count as 3
    setCharCounts(chineseChars.length * 3 + otherChars.length);
  }, [description]);
  return charCounts;
}

export { useChineseCharsCount };

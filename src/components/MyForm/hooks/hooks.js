import { useEffect, useState } from "react";
import rgx from "../validation/util";

function useChineseCharsCount(description = "") {
  const [charCounts, setCharCounts] = useState(0);
  useEffect(() => {
    const chineseChars = description?.match(rgx.findAnyChinese()) || "";
    const otherChars = description?.replace(rgx.findAnyChinese(), "") || "";
    // a chinese char count as 3
    setCharCounts(chineseChars.length * 3 + otherChars.length);
  }, [description]);
  return charCounts;
}

export { useChineseCharsCount };

import uniqid from "uniqid";
const db = {
  data: [
    // 這是資料樣板
    // {
    //   id: @uniqKey
    //   tag: "0080",
    //   orgName: "測試用組織名稱",
    //   weight: 12345,
    //   description: `或紅黃候語浪汁蝶古找助怪流瓜禾京，消清休三秋行新神條米皮衣快兩勿文，樹晚肉干動火斗車呢百交說下，吹也鴨婆彩大民示院。向意麻活彩足節兆抄汁春自太神申黑口果木？枝急連土申穿元穿抓。就蝶前斥到經娘己往爬王走美玩。棵頭大里功科禾足蛋們貝二。國也青發想春他冒耳半，長尤音找肖共往回旦海蝴忍紅從訴早，停刃高几由毛身次發，甲長功別足都有呀午支圓春。誰同面兔月巾旁南次奶打蝸室里書哥：一鼻他牙游夕想波。因友禾要是書。`,
    //   instruction: "測試用使用方式資料",
    //   max: {isActive: true, value: "2218"},
    //   colors: ["blue"],
    //   start: "2021-07-06 10:26:50",
    //   end: "2022-02-08 22:10:10",
    //   gender: "M",
    //   price: 5500,
    // },
  ],
  insert(newRecord) {
    return new Promise((resolve, reject) => {
      try {
        newRecord.id = uniqid();
        this.data.unshift(newRecord);
        resolve(newRecord);
      } catch (e) {
        reject(e);
      }
    });
  },
  insertBatch(newRecords) {
    return new Promise((resolve, reject) => {
      try {
        newRecords.forEach((record) => {
          record.id = uniqid();
          this.data.push(record);
        });
        resolve(newRecords);
      } catch (e) {
        reject(e);
      }
    });
  },
  find(id) {
    return new Promise((resolve, reject) => {
      try {
        const recordFound = this.data.find((record) => record.id === id);
        resolve(recordFound);
      } catch (e) {
        reject(e);
      }
    });
  },
  update(editRecord) {
    return new Promise((resolve, reject) => {
      try {
        const idx = this.data.findIndex(
          (record) => record.id === editRecord.id
        );
        if (idx < 0) {
          throw new Error(`data to edit, id: ${editRecord.id} not found`);
        }
        this.data[idx] = editRecord;
        resolve(editRecord);
      } catch (e) {
        reject(e);
      }
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const idx = this.data.findIndex((record) => record.id === id);
        if (idx < 0) {
          throw new Error(`data to delete, id: ${id} not found`);
        }
        this.data.splice(idx, 1);
        resolve(id);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default db;

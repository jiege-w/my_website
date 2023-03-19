import { messageHistory } from "./config_chatHistory";
import { getAssetsFile } from "../utils/pub-use";
const friend_list = [
  {
    id: 1,
    uid: 1,
    avatar: "avatar/avatar_1.jpg",
    nickName: "菠萝小仔仔",
    unRead: 0,
  },
  {
    id: 2,
    uid: 2,
    avatar: "avatar/avatar_2.jpg",
    nickName: "Leo_yooo",
    unRead: 3,
  },
  {
    id: 3,
    uid: 3,
    avatar: "avatar/avatar_3.jpg",
    nickName: "Dazzle_cgb",
    unRead: 0,
  },
  {
    id: 4,
    uid: 4,
    avatar: "avatar/avatar_4.jpg",
    nickName: "有些鱿鱼不要香菇",
    unRead: 1,
  },
  {
    id: 5,
    uid: 5,
    avatar: "avatar/avatar_5.jpg",
    nickName: "viewsummer",
    unRead: 0,
  },
  {
    id: 6,
    uid: 6,
    avatar: "avatar/avatar_6.jpg",
    nickName: "Thor、",
    unRead: 0,
  },
  {
    id: 7,
    uid: 7,
    avatar: "avatar/avatar_7.jpg",
    nickName: "吃定彩虹",
    unRead: 5,
  },
  {
    id: 8,
    uid: 8,
    avatar: "avatar/avatar_8.jpg",
    nickName: "温暖的阳光",
    unRead: 0,
  },
];
const action = new Map(messageHistory);
friend_list.forEach((item) => {
  item.avatar = getAssetsFile(item.avatar);
  let history = action.get(`user_${item.uid}`);
  item.latestMessage = history?.length ? history[history.length - 1].content : "";
  item.date = history.length ? history[history.length - 1].timeStamp : "";
});
console.log("1231231231", friend_list);
export { friend_list };

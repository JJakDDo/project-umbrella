import axios from "axios";

export default async (url) => {
  const data = await axios.get(url);
  const header = data.data.response.header;
  const body = data.data.response.body;
  console.log(data);
  if (header.resultCode === "00") {
    return body.items.item.filter(
      (item) => item.category === "PTY" || item.category === "SKY"
    );
  }
};

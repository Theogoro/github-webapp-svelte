const BASE_URL = "https://api.github.com/";

export async function getData(url) {
  if (url == undefined) return;
  url = url.replace(BASE_URL, "");
  let response = await fetch(BASE_URL + url);
  let data = await response.json();
  return data;
}

export default { getData };

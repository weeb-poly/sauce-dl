// TODO: use api for this
// includes
common = require("../shared/shared.js")

function downloader(jsonData){
  let title = jsonData["safe_title"];
  let img = jsonData["img"];
  common.download(img, jsonData["title"] + jsonData["img"].match(/\.[0-9a-z]+$/i)[0]);

}

async function xkcd(num){
  let url = "https://xkcd.com/" + num + "/info.0.json";
  await common.getFromAPI(url, downloader);
}

/*
-- NOTE: needs to be tested
--       gets the current xkcd webcomic
*/
async function xkcd_curr(){
  await common.getFromAPI("https://xkcd.com/info.0.json", downloader);
}

/*
-- NOTE: needs to be tested
--       gets a random xkcd web comic
*/
async function xkcd_rand(){
  await common.getFromAPI("https://xkcd.com/info.0.json", (jsonData) => {
    common.getFromAPI("https://xkcd.com/" + (Math.floor(Math.random(jsonData["num"]) * 100)) + "/info.0.json", (data) => {
	common.download(data["img"], data["title"] + data["img"].match(/\.[0-9a-z]+$/i)[0]);
    });
  });
}

// TEST:

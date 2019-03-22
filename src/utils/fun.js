//将string转为dom
export function parseDom(arg) {
  var objE = document.createElement("div");
  objE.innerHTML = arg;
  return objE;
}
// 修改图片路径
export function changeImgSrc(html, src) {
  let img = html.getElementsByTagName("img");
  for (let i = 0; i < img.length; i++) {
    img[i].setAttribute("src", src);
  }
  return html;
}
var x0 = 0;
var y0 = 0;
var width = 0;
var height = 0;

var styleElem = document.createElement("style");

styleElem.innerHTML = `
.filter-line {
  width: 4px;
  background-color: gray;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}
.filter-line:after {
  content: "";
  display: block;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 50%;
  border: 2px solid gray;
  z-index: 2;
}
.filtered-img {
  position: absolute;
  filter: blur(4px);
  clip: rect(auto, 0, auto, 0);
  z-index: 1;
}`;

var filterLine = document.createElement("div");
filterLine.className = "filter-line";

var filteredImg = document.createElement("img");
filteredImg.className = "filtered-img";

document.addEventListener("DOMContentLoaded", (e) => {
  let img = document.querySelector("img[filter]");
  x0 = img.getBoundingClientRect().x;
  y0 = img.getBoundingClientRect().y;
  height = img.getBoundingClientRect().height;
  width = img.getBoundingClientRect().width;

  filterLine.style.height = `${height}px`;
  filterLine.style.top = `${y0}px`;
  filterLine.style.left = `${x0}px`;
  filteredImg.style.top = `${y0}px`;
  filteredImg.style.left = `${x0}px`;

  filteredImg.setAttribute("src", `${img.getAttribute("src")}`);

  document.head.appendChild(styleElem);
  document.body.append(filterLine);
  document.body.append(filteredImg);

  filterLine.addEventListener("mousedown", mouseDownListener);

  filterLine.addEventListener("mouseup", mouseUpListener);

  filteredImg.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", mouseMoveListener);
  });

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", mouseMoveListener);
  });
});

const mouseMoveListener = (e) => {
  e.preventDefault();
  X = e.clientX - x0;
  filterLine.style.left = `${
    X < 0 ? x0 : X > width - 4 ? x0 + width - 4 : e.clientX
  }px`;
  filteredImg.style.clip = `rect(auto, ${
    X < 0 ? 0 : X > width - 4 ? width - 4 : X
  }px, auto, 0)`;
};

const mouseDownListener = () => {
  document.addEventListener("mousemove", mouseMoveListener);
};

const mouseUpListener = () => {
  filterLine.removeEventListener("mousemove", mouseMoveListener);
};

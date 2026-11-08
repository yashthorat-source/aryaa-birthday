const pageIds = ["home","countdown","gallery","memories","your-fav","letter","letter-opened","sky-entry","sky-wishes"];
const pages = pageIds.map(id => document.getElementById(id)).filter(Boolean);
const navLinks = [...document.querySelectorAll(".ribbon-clicks a")];
const activePill = document.querySelector(".ribbon-active-pill");
const navTargets = ["home","gallery","memories","your-fav","letter","sky-entry"];
const pillPositions = [
  {left:54.45,width:6.9},
  {left:61.35,width:7.1},
  {left:69.05,width:8.2},
  {left:77.75,width:7.5},
  {left:85.7,width:6.8},
  {left:92.2,width:7.1}
];

function setActiveNav(id) {
  const navId = id === "letter-opened" ? "letter" : id === "sky-wishes" ? "sky-entry" : id;
  const index = navTargets.indexOf(navId);
  navLinks.forEach((link,i) => {
    link.classList.toggle("active", i === index);
    if (i === index) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });
  if (activePill && index >= 0) {
    activePill.style.left = pillPositions[index].left + "%";
    activePill.style.width = pillPositions[index].width + "%";
  }
}

function showPage(id, addHistory = true) {
  const target = document.getElementById(id);
  if (!target || !target.classList.contains("page") || target.classList.contains("gated")) return;
  pages.forEach(page => {
    const active = page === target;
    page.classList.toggle("active", active);
    page.setAttribute("aria-hidden", String(!active));
  });
  setActiveNav(id);
  if (addHistory && location.hash !== `#${id}`) {
    history.pushState({page:id},"",`#${id}`);
  }
  window.scrollTo({top:0,behavior:"instant"});
}

document.addEventListener("click", event => {
  const nav = event.target.closest(".ribbon-clicks a");
  if (nav) {
    event.preventDefault();
    showPage(nav.getAttribute("href").slice(1));
    return;
  }
  const next = event.target.closest("[data-go]");
  if (next) showPage(next.dataset.go);
});

window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  const target = document.getElementById(id);
  if (target && target.classList.contains("page") && !target.classList.contains("gated")) {
    showPage(id,false);
  } else {
    showPage("home",false);
  }
});

const initialId = location.hash.slice(1);
const initialTarget = document.getElementById(initialId);
showPage(initialTarget && initialTarget.classList.contains("page") && !initialTarget.classList.contains("gated") ? initialId : "home",false);

// Birthday timer: next 14 November, using the visitor's local time.
function nextBirthdayDate() {
  const now = new Date();
  let year = now.getFullYear();
  let date = new Date(year, 10, 14, 0, 0, 0);
  if (date.getTime() <= now.getTime()) date = new Date(year + 1, 10, 14, 0, 0, 0);
  return date;
}
const birthday = nextBirthdayDate();
function updateTimer() {
  const total = Math.max(0, birthday.getTime() - Date.now());
  const values = {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000)
  };
  Object.entries(values).forEach(([id,value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2,"0");
  });
}
updateTimer();
setInterval(updateTimer,1000);

// The gallery and memory frames are intentionally empty until the owner chooses photos.
document.querySelectorAll(".photo-slot input").forEach(input => {
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const preview = input.parentElement.querySelector("img");
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.classList.add("has-photo");
  });
});

// The visible button on the Letter entrance opens the opened-letter screen.
document.getElementById("open-letter").addEventListener("click", () => {
  const openedLetter = document.getElementById("letter-opened");
  openedLetter.classList.remove("gated");
  showPage("letter-opened");
});
document.getElementById("back-letter").addEventListener("click", () => {
  showPage("letter");
  document.getElementById("letter-opened").classList.add("gated");
});

// The visible cloud button on the Sky entrance opens the nine-star wishes screen.
document.getElementById("enter-sky").addEventListener("click", () => {
  const wishesPage = document.getElementById("sky-wishes");
  wishesPage.classList.remove("gated");
  showPage("sky-wishes");
});

// Nine individual wishes, one for each star.
const wishes = [
  ["For Your Happiness","May your days be full of the kind of happiness that makes your eyes sparkle and your heart feel light. You deserve every little bit of it. 🥰"],
  ["For Our Future","Here's to more silly conversations, unexpected adventures and a thousand little moments we haven't made yet. 😉"],
  ["For My Queen","You don't need a crown to be royalty. You already have that effortless way of making everything brighter. 👑"],
  ["For Your Dreams","May every dream you quietly carry find its way into the real world. I'll always be cheering the loudest for you. ✨"],
  ["How Special You Are","If you could see yourself the way I see you, you'd never question how extraordinary you are. ❤️"],
  ["For Your Smile","Please keep that smile safe. It has a very unfair advantage over my ability to act normal. 😘"],
  ["A Little Confession","I was supposed to play it cool, but then you happened. So much for having a plan. 🙈"],
  ["For Your Growth","Keep becoming everything you've imagined. I hope life surprises you with beautiful opportunities and brave new beginnings. 🌱"],
  ["For Many More Birthdays","One birthday wish is not enough. I hope I get to celebrate countless more of your smiles, dreams and little victories. 💗"]
];
let currentWish = 0;
const modal = document.getElementById("wish-modal");
function openWish(index) {
  currentWish = index;
  document.getElementById("wish-title").textContent = wishes[index][0];
  document.getElementById("wish-message").textContent = wishes[index][1];
  modal.hidden = false;
}
document.querySelectorAll("[data-wish]").forEach(button => {
  button.addEventListener("click", () => openWish(Number(button.dataset.wish)));
});
function closeWish() { modal.hidden = true; }
document.getElementById("close-wish").addEventListener("click", closeWish);
modal.addEventListener("click", event => { if (event.target === modal) closeWish(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeWish(); });
document.getElementById("next-wish").addEventListener("click", () => openWish((currentWish + 1) % wishes.length));

// Returning from the wish stars closes that reveal until Enter My Sky is clicked again.
document.querySelector(".wishes-back").addEventListener("click", () => {
  showPage("sky-entry");
  document.getElementById("sky-wishes").classList.add("gated");
});

// Letter page navigation: move forward to the Surprise entrance.
document.getElementById("next-surprise").addEventListener("click", () => {
  showPage("sky-entry");
});

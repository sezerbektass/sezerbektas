const satir = 9;
const sutun = 9;
const mayinSayisi = 10;
const alan = document.getElementById("oyun-alani");

let oyunMatrisi = [];
let oyunBitti = false;

function alanOlustur() {
  alan.innerHTML = "";
  oyunMatrisi = [];
  oyunBitti = false;

  for (let y = 0; y < satir; y++) {
    oyunMatrisi[y] = [];
    for (let x = 0; x < sutun; x++) {
      const hucre = document.createElement("div");
      hucre.classList.add("kare");
      hucre.dataset.y = y;
      hucre.dataset.x = x;
      hucre.addEventListener("click", hucreTiklandi);
      hucre.addEventListener("contextmenu", hucreSagTiklandi);
      alan.appendChild(hucre);
      oyunMatrisi[y][x] = {
        mayin: false,
        acildi: false,
        bayrak: false,
        dom: hucre
      };
    }
  }

  let yerlestirilen = 0;
  while (yerlestirilen < mayinSayisi) {
    let y = Math.floor(Math.random() * satir);
    let x = Math.floor(Math.random() * sutun);
    if (!oyunMatrisi[y][x].mayin) {
      oyunMatrisi[y][x].mayin = true;
      yerlestirilen++;
    }
  }
}

function hucreTiklandi(e) {
  if (oyunBitti) return;

  const y = parseInt(e.target.dataset.y);
  const x = parseInt(e.target.dataset.x);
  const hucre = oyunMatrisi[y][x];

  if (hucre.acildi || hucre.bayrak) return;

  hucre.acildi = true;
  hucre.dom.classList.add("acildi");

  if (hucre.mayin) {
    hucre.dom.textContent = "💣";
    alert("💥 BOOM! Oyun bitti.");
    oyunBitti = true;
    tumMayinlariGoster();
  } else {
    let sayi = cevreMayinSayisi(y, x);
    if (sayi > 0) {
      hucre.dom.textContent = sayi;
    } else {
      bosAlanAc(y, x);
    }
  }
}

function hucreSagTiklandi(e) {
  e.preventDefault();
  if (oyunBitti) return;

  const y = parseInt(e.target.dataset.y);
  const x = parseInt(e.target.dataset.x);
  const hucre = oyunMatrisi[y][x];

  if (hucre.acildi) return;

  hucre.bayrak = !hucre.bayrak;
  hucre.dom.textContent = hucre.bayrak ? "🚩" : "";
}

function cevreMayinSayisi(y, x) {
  let toplam = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ny = y + dy;
      const nx = x + dx;
      if (
        ny >= 0 &&
        ny < satir &&
        nx >= 0 &&
        nx < sutun &&
        !(dy === 0 && dx === 0)
      ) {
        if (oyunMatrisi[ny][nx].mayin) toplam++;
      }
    }
  }
  return toplam;
}

function bosAlanAc(y, x) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ny = y + dy;
      const nx = x + dx;
      if (
        ny >= 0 &&
        ny < satir &&
        nx >= 0 &&
        nx < sutun &&
        !oyunMatrisi[ny][nx].acildi
      ) {
        hucreTiklandi({ target: oyunMatrisi[ny][nx].dom });
      }
    }
  }
}

function tumMayinlariGoster() {
  for (let y = 0; y < satir; y++) {
    for (let x = 0; x < sutun; x++) {
      if (oyunMatrisi[y][x].mayin) {
        oyunMatrisi[y][x].dom.textContent = "💣";
        oyunMatrisi[y][x].dom.classList.add("acildi");
      }
    }
  }
}

alanOlustur();

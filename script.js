const data = [
  { lines:[{text:"오늘은 조금 느리게",top:"12%"},{text:"걸어도 괜찮은 날이었다.",top:"28%"}], extra:"천천히 걷다 보니 생각도 정리됐다." },
  { lines:[{text:"괜히 마음이 복잡한 날",top:"18%"},{text:"이럴 때는 그냥",top:"36%"}], extra:"시간이 해결해주는 것들도 있다." },
  { lines:[{text:"요즘은 이상하게",top:"22%"},{text:"조용해지고 싶다.",top:"40%"}], extra:"혼자 있는 시간이 필요하다." },
  { lines:[{text:"오늘 하루는",top:"20%"},{text:"괜찮았다.",top:"36%"}], extra:"작은 일들이 쌓였다." },
  { lines:[{text:"괜히 웃음이 나왔다.",top:"30%"}], extra:"이유 없어도 괜찮다." },
  { lines:[{text:"아무것도 안 했는데",top:"24%"}], extra:"시간은 잘 간다." },
  { lines:[{text:"조금 더 솔직해지면",top:"26%"}], extra:"편해질까" },
  { lines:[{text:"괜히 그때가 생각난다.",top:"32%"}], extra:"단순했던 시기" },
  { lines:[{text:"오늘은 그냥",top:"24%"},{text:"쉬어도 될 것 같다.",top:"42%"}], extra:"충분히 했다" },
  { lines:[{text:"내일은 조금",top:"26%"}], extra:"다르게 살아볼까" }
];

const scroll = document.getElementById('scroll');

function createCard(item){
  const card = document.createElement('div');
  card.className = 'card';

  const textLayer = document.createElement('div');
  textLayer.className = 'text-layer';

  item.lines.forEach(l=>{
    const line = document.createElement('div');
    line.className = 'line';
    line.style.top = l.top;
    line.textContent = l.text;
    textLayer.appendChild(line);
  });

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.textContent = item.extra;

  card.onclick = () => card.classList.toggle('open');

  card.appendChild(textLayer);
  card.appendChild(overlay);

  return card;
}

data.forEach(d => scroll.appendChild(createCard(d)));

function updateScale(){
  const cards = document.querySelectorAll('.card');
  const center = window.innerWidth / 2;

  cards.forEach(card=>{
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const dist = Math.abs(center - cardCenter);

    const maxDist = window.innerWidth / 2;

    let scaleFactor = 0.15;
    if(window.innerWidth > 768) scaleFactor = 0.1;

    const scale = 1 + (1 - dist / maxDist) * scaleFactor;

    card.style.transform = `scale(${scale})`;
    card.style.zIndex = Math.round(scale * 100);
  });
}

scroll.addEventListener('scroll', ()=>requestAnimationFrame(updateScale));
window.addEventListener('load', updateScale);
window.addEventListener('resize', updateScale);
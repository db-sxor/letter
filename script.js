const data = [
  { lines:[
    {text:"틀림없이 소중한 당신에게,", top:"8%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"두려워하지 마세요", top:"16%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"당신이 평화롭길 바랍니다", top:"24%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"오늘도 내일도 앞으로도", top:"32%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"힘을 내세요", top:"40%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"그리고...", top:"48%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"힘을 내세요", top:"56%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"\"매우 귀중한 사람이여, 두려워하지 마시오.\n당신에게 평화가 있기를 바라오.\n힘을 내시오. 힘을 내시오.\"\n- 다니엘 10:19" },

  { lines:[
    {text:"내일의 일을 너무 염려하지 마세요", top:"8%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"내일의 걱정은 내일해도 괜찮습니다", top:"16%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"오늘은 오늘의 당신이 수고했으니,", top:"24%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"이제부터는", top:"32%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"편안한 마음을 간직하시면 좋겠습니다", top:"40%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"내일 일을 결코 염려하지 마십시오.\n내일은 내일의 염려가 있을 것입니다.\n그날의 괴로움은 그날로 충분합니다.\n- 마태복음 6:34" },

  { lines:[
    {text:"요즘은 이상하게", top:"22%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"조용해지고 싶다.", top:"40%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"혼자 있는 시간이 필요하다." },

  { lines:[
    {text:"오늘 하루는", top:"20%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"괜찮았다.", top:"36%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"작은 일들이 쌓였다." },

  { lines:[
    {text:"괜히 웃음이 나왔다.", top:"30%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"이유 없어도 괜찮다." },

  { lines:[
    {text:"아무것도 안 했는데", top:"24%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"시간은 잘 간다." },

  { lines:[
    {text:"조금 더 솔직해지면", top:"26%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"편해질까" },

  { lines:[
    {text:"괜히 그때가 생각난다.", top:"32%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"단순했던 시기" },

  { lines:[
    {text:"오늘은 그냥", top:"24%", left:"10%", size:"clamp(12px, 3vw, 18px)"},
    {text:"쉬어도 될 것 같다.", top:"42%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"충분히 했다" },

  { lines:[
    {text:"내일은 조금", top:"26%", left:"10%", size:"clamp(12px, 3vw, 18px)"}], 
    extra:"다르게 살아볼까" }
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
    if(l.left) line.style.left = l.left;
    if(l.size) line.style.fontSize = l.size;
    line.textContent = l.text;
    textLayer.appendChild(line);
  });

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const lines = item.extra.split('\n');

  lines.forEach((text, i) => {
    const div = document.createElement('div');
    div.textContent = text;

    if(i === lines.length - 1) {
      div.style.alignSelf = 'flex-end';
      div.style.textAlign = 'right';
      div.style.marginRight = '50px';
    }
    overlay.appendChild(div);
  });

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
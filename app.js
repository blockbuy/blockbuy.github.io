const base=[
[1,"Celestial Dragon Set","Cosmetics","Java",249,"PixelForge",4.9,342,"Featured"],
[2,"Titan Rank","Ranks","Java",399,"NovaCraft",4.8,881,"Popular"],
[3,"Neon Samurai Skin Pack","Skins","Java + Bedrock",149,"PixelForge",4.9,212,"New"],
[4,"Skyblock Starter Build","Builds","Java",299,"VoidBuilds",5,109,"Top rated"],
[5,"5,000 Server Credits","Server Goods","Bedrock",199,"NovaCraft",4.7,624,"Popular"],
[6,"Frost Ranger Bundle","Bundles","Java + Bedrock",179,"PixelForge",4.9,165,"New"],
[7,"Medieval Castle Mega Build","Builds","Java",699,"VoidBuilds",5,74,"Premium"],
[8,"Aurora Trails Pack","Cosmetics","Bedrock",99,"NovaCraft",4.8,503,"Under ₹199"],
[9,"Starter Kit","Server Goods","Java",129,"NovaCraft",4.6,318,"Under ₹199"]
];
let store=JSON.parse(localStorage.getItem("blockbuy_v2")||'{"f":[],"custom":[],"theme":"dark"}');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const data=()=>base.concat(store.custom||[]);
function save(){localStorage.setItem("blockbuy_v2",JSON.stringify(store))}
function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2000)}
function render(){
 let q=$("#search").value.toLowerCase(),e=$("#edition").value,c=$("#category").value,sort=$("#sort").value;
 let a=data().filter(x=>(!q||x.slice(1,7).join(" ").toLowerCase().includes(q))&&(e==="all"||x[3].includes(e))&&(c==="all"||x[2]===c));
 if(sort==="low")a.sort((x,y)=>x[4]-y[4]); if(sort==="high")a.sort((x,y)=>y[4]-x[4]); if(sort==="popular")a.sort((x,y)=>y[7]-x[7]); if(sort==="newest")a.sort((x,y)=>y[0]-x[0]);
 $("#meta").textContent=a.length+" listing"+(a.length===1?"":"s");
 $("#catalog").innerHTML=a.map(x=>`<article class="product" data-id="${x[0]}"><div class="thumb"><span class="badge">${x[8]}</span><button class="heart ${store.f.includes(x[0])?"on":""}" data-f="${x[0]}">${store.f.includes(x[0])?"♥":"♡"}</button><div class="pixel"></div></div><div class="product-body"><h3>${x[1]}</h3><p>${x[2]} · ${x[3]}</p><div class="product-foot"><span class="price">₹${x[4]}</span><span class="rating">★ ${x[6]}</span></div><div class="sellerline">by ${x[5]} · ${x[7]} sales</div></div></article>`).join("");
 $$(".product").forEach(p=>p.onclick=e=>{if(!e.target.closest("[data-f]"))openProduct(+p.dataset.id)});
 $$("[data-f]").forEach(b=>b.onclick=e=>{e.stopPropagation();let id=+b.dataset.f;store.f=store.f.includes(id)?store.f.filter(v=>v!==id):store.f.concat(id);save();render();toast(store.f.includes(id)?"Added to favorites":"Removed from favorites")});
 $("#fav small").textContent=store.f.length;
}
function openProduct(id){
 let x=data().find(v=>v[0]===id); if(!x)return;
 $("#detail").innerHTML=`<div class="detail"><div class="detail-art"><div class="pixel"></div></div><div><label>${x[2].toUpperCase()}</label><h2>${x[1]}</h2><div class="sellerline">by <b>${x[5]}</b> · ★ ${x[6]} · ${x[7]} sales</div><div class="big">₹${x[4]}</div><div class="tags"><span class="tag">${x[3]}</span><span class="tag">${x[8]}</span><span class="tag">Digital item</span></div><p>Sample marketplace listing. A production version would connect this page to verified seller data, inventory, orders and compliant checkout.</p><button class="primary" onclick="toast('Demo only — checkout is not enabled')">Continue to checkout →</button></div></div>`;
 $("#productModal").classList.add("open");
}
["#search","#edition","#category","#sort"].forEach(s=>$(s).addEventListener("input",render));
$("#heroSearch").oninput=e=>{$("#search").value=e.target.value;render()};
$("#heroSearch").onkeydown=e=>{if(e.key==="Enter")location.hash="market"};
$$(".categories button").forEach(b=>b.onclick=()=>{$("#category").value=b.dataset.cat;render();location.hash="market"});
$$(".chips button").forEach(b=>b.onclick=()=>{ $$(".chips button").forEach(x=>x.classList.remove("active"));b.classList.add("active");let v=b.dataset.chip;if(v==="Java"||v==="Bedrock")$("#edition").value=v;if(v==="all"){$("#edition").value="all";$("#category").value="all"}if(v==="low")$("#sort").value="low";render()});
$("#theme").onclick=()=>{store.theme=store.theme==="dark"?"light":"dark";document.body.style.background=store.theme==="light"?"#f4f6fa":"#07090e";document.body.style.color=store.theme==="light"?"#11151e":"#f5f7fb";save();toast("Theme changed")};
$("#fav").onclick=()=>toast(store.f.length?store.f.length+" favorites saved":"No favorites yet");
$("#sellBtn").onclick=()=>$("#studioModal").classList.add("open");
$$(".close").forEach(b=>b.onclick=()=>b.closest(".modal").classList.remove("open"));
$("#form").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);store.custom.push([Date.now(),f.get("title"),f.get("category"),f.get("edition"),+f.get("price"),f.get("seller"),0,0,"Your listing"]);save();e.target.reset();$("#studioModal").classList.remove("open");render();toast("Listing saved locally")};
document.onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus()}if(e.key==="Escape")$$(".modal").forEach(m=>m.classList.remove("open"))};
render();

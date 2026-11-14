'use strict';
const products = CATALOG_PRODUCTS;
const money=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let category='filamentos',cart={};
try{cart=JSON.parse(localStorage.getItem('filacria_cart_v3')||'{}')||{};}catch(e){}
if(typeof cart!=='object'||Array.isArray(cart))cart={};
for(const id of Object.keys(cart)){if(!products.some(p=>p.id===id)||!Number.isSafeInteger(cart[id])||cart[id]<1)delete cart[id];}
function render(){const matches=products.filter(p=>p.cat===category);$('#catalogNote').textContent=`${matches.length} ${category==='filamentos'?'filamentos':'produtos 3D'} para o seu projeto. Consulte disponibilidade e entrega.`;$('#products').innerHTML=matches.map(p=>`<article class="product">${p.photo?`<img class="product-photo" src="${esc(p.photo)}" alt="${esc(p.name)} — ${esc(p.desc)}" loading="lazy">`:'<div class="product-icon" aria-hidden="true">📦</div>'}<h3>${esc(p.name)}</h3><p class="product-description">${esc(p.desc)}</p><div class="price">${money(p.price)}</div><button data-add="${esc(p.id)}">+ Adicionar ao Carrinho</button></article>`).join('');$('#empty').hidden=matches.length>0;}
function setCategory(next){category=next;$$('.tab').forEach(b=>{b.classList.toggle('active',b.dataset.tab===next);b.setAttribute('aria-pressed',String(b.dataset.tab===next));});render();$('#catalogo').scrollIntoView({behavior:'smooth'});}
$$('[data-category]').forEach(b=>b.onclick=()=>setCategory(b.dataset.category));$$('.tab').forEach(b=>b.onclick=()=>setCategory(b.dataset.tab));$$('[data-nav-category]').forEach(b=>b.onclick=()=>setCategory(b.dataset.navCategory));
$('#products').onclick=e=>{const b=e.target.closest('[data-add]');if(!b)return;const key=b.dataset.add;cart[key]=(cart[key]||0)+1;save();openCart();};
function entries(){return Object.entries(cart).filter(([id,q])=>q>0&&products.some(p=>p.id===id));}
function save(){try{localStorage.setItem('filacria_cart_v3',JSON.stringify(cart));}catch(e){}$('#orderInfo').textContent='';$('#orderTransfer').hidden=true;$('#orderMessage').value='';renderCart();}
function subtotal(){return entries().reduce((s,[id,q])=>s+products.find(p=>p.id===id).price*q,0);}
function renderCart(){const a=entries(),count=a.reduce((n,[,q])=>n+q,0);$('#count').textContent=$('#drawerCount').textContent=count;$('#cartItems').innerHTML=a.length?a.map(([id,qty])=>{const p=products.find(x=>x.id===id);return `<div class="cart-line"><div><b>${esc(p.name)}</b><br><small>${esc(p.desc)}<br>${money(p.price)} / unidade · ${money(p.price*qty)}</small></div><div class="qty-controls"><button data-minus="${id}" aria-label="Diminuir quantidade de ${esc(p.name)}">−</button><span>${qty}</span><button data-plus="${id}" aria-label="Aumentar quantidade de ${esc(p.name)}">+</button><button data-remove="${id}" aria-label="Remover ${esc(p.name)}">Remover</button></div></div>`}).join(''):'Seu carrinho está vazio.';$('#total').textContent=money(subtotal());}
$('#cartItems').onclick=e=>{const b=e.target.closest('button');if(!b)return;const key=b.dataset.plus||b.dataset.minus||b.dataset.remove;if(!key)return;if(b.dataset.remove)delete cart[key];else{cart[key]+=(b.dataset.plus?1:-1);if(cart[key]<=0)delete cart[key];}save();};
let previousFocus;
function openCart(){previousFocus=document.activeElement;$('#drawer').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');$('#drawer').inert=false;$('#overlay').hidden=false;document.body.style.overflow='hidden';$('#closeCart').focus();}
function closeCart(){$('#drawer').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');$('#drawer').inert=true;$('#overlay').hidden=true;document.body.style.overflow='';previousFocus?.focus();}
$('#cartOpen').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;$('#drawer').inert=true;
document.addEventListener('keydown',e=>{if(!$('#drawer').classList.contains('open'))return;if(e.key==='Escape')closeCart();if(e.key==='Tab'){const a=[...$('#drawer').querySelectorAll('button,a,textarea')].filter(x=>!x.disabled&&x.offsetParent!==null),f=a[0],l=a[a.length-1];if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus();}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus();}}});
function orderMessage(){return 'Olá, FILA.CRIA! Gostaria de confirmar meu pedido:\n\n'+entries().map(([id,qty])=>{const p=products.find(x=>x.id===id);return `${qty}x ${p.name}\n${p.desc}\n${money(p.price)} / unidade — ${money(p.price*qty)}`;}).join('\n\n')+'\n\nSubtotal: '+money(subtotal())+'\nGostaria de confirmar disponibilidade, frete e pagamento na entrega.';}
$('#contactButton').onclick=()=>window.open(WHATSAPP_LINK,'_blank','noopener,noreferrer');
$('#sendOrder').onclick=()=>{if(!entries().length){$('#orderInfo').textContent='Adicione um produto antes de enviar.';return;}const message=orderMessage();$('#orderMessage').value=message;$('#orderTransfer').hidden=false;$('#orderInfo').textContent='Copie o pedido abaixo, abra o WhatsApp e cole na conversa.';$('#copyOrder').focus();};
$('#copyOrder').onclick=async()=>{const field=$('#orderMessage');try{await navigator.clipboard.writeText(field.value);$('#orderInfo').textContent='Pedido copiado! Abra o WhatsApp e cole na conversa.';}catch(e){field.focus();field.select();$('#orderInfo').textContent='Selecione e copie o texto do pedido (Ctrl+C). Depois abra o WhatsApp e cole na conversa.';}};
$('#openWhatsApp').href=WHATSAPP_LINK;
render();renderCart();

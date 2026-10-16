'use strict';
// PREÇOS: edite price:10.00 para o valor desejado em cada produto.
// As imagens foram recortadas do catálogo Masterprint fornecido; confirme disponibilidade e rótulos antes da publicação.
const PRODUCTS = [
  {id:'231010007',sku:'231010007',name:'PLA Dourado',type:'PLA',price:93.00,image:'assets/produtos/231010007.png',hex:'#cbd5e1'},
  {id:'231010028',sku:'231010028',name:'PLA Silk Vermelho',type:'PLA',price:93.00,image:'assets/produtos/231010028.png',hex:'#cbd5e1'},
  {id:'231010006',sku:'231010006',name:'PLA Verde',type:'PLA',price:93.00,image:'assets/produtos/231010006.png',hex:'#cbd5e1'},
  {id:'231010033',sku:'231010033',name:'PLA Roxo Claro',type:'PLA',price:93.00,image:'assets/produtos/231010033.png',hex:'#cbd5e1'},
  {id:'231010038',sku:'231010038',name:'PLA Silk Bronze',type:'PLA',price:93.00,image:'assets/produtos/231010038.png',hex:'#cbd5e1'},
  {id:'231010046',sku:'231010046',name:'PLA Madeira Escura',type:'PLA',price:93.00,image:'assets/produtos/231010046.png',hex:'#cbd5e1'},
  {id:'231010045',sku:'231010045',name:'PLA Silk Happy Rainbow',type:'PLA',price:93.00,image:'assets/produtos/231010045.png',hex:'#cbd5e1'},
  {id:'231020028',sku:'231020028',name:'PETG Dourado',type:'PETG',price:83.00,image:'assets/produtos/231020028.png',hex:'#cbd5e1'},
  {id:'231020035',sku:'231020035',name:'PETG Branco Etiqueta Neutra',type:'PETG',price:83.00,image:'assets/produtos/231020035.png',hex:'#cbd5e1'},
  {id:'231020016',sku:'231020016',name:'PETG Skin',type:'PETG',price:83.00,image:'assets/produtos/231020016.png',hex:'#cbd5e1'},
  {id:'231020017',sku:'231020017',name:'PETG Madeira',type:'PETG',price:83.00,image:'assets/produtos/231020017.png',hex:'#cbd5e1'},
  {id:'231010001',sku:'231010001',name:'PLA Preto',type:'PLA',price:93.00,image:'assets/produtos/231010001.png',hex:'#cbd5e1'},
  {id:'231010002',sku:'231010002',name:'PLA Branco',type:'PLA',price:93.00,image:'assets/produtos/231010002.png',hex:'#cbd5e1'},
  {id:'231010003',sku:'231010003',name:'PLA Azul',type:'PLA',price:93.00,image:'assets/produtos/231010003.png',hex:'#cbd5e1'},
  {id:'231010004',sku:'231010004',name:'PLA Cinza',type:'PLA',price:93.00,image:'assets/produtos/231010004.png',hex:'#cbd5e1'},
  {id:'231010005',sku:'231010005',name:'PLA Vermelho',type:'PLA',price:93.00,image:'assets/produtos/231010005.png',hex:'#cbd5e1'},
  {id:'231010047',sku:'231010047',name:'PLA Mármore',type:'PLA',price:93.00,image:'assets/produtos/231010047.png',hex:'#cbd5e1'},
  {id:'231010102',sku:'231010102',name:'PLA Fosco Cinza',type:'PLA',price:93.00,image:'assets/produtos/231010102.png',hex:'#cbd5e1'},
  {id:'231010039',sku:'231010039',name:'PLA Silk Prata',type:'PLA',price:93.00,image:'assets/produtos/231010039.png',hex:'#cbd5e1'},
  {id:'231010041',sku:'231010041',name:'PLA Silk Dourado',type:'PLA',price:93.00,image:'assets/produtos/231010041.png',hex:'#cbd5e1'},
  {id:'231010057',sku:'231010057',name:'PLA Silk Cobre',type:'PLA',price:93.00,image:'assets/produtos/231010057.png',hex:'#cbd5e1'},
  {id:'231010064',sku:'231010064',name:'PLA Silk Azul/Dourado/Roxo',type:'PLA',price:93.00,image:'assets/produtos/231010064.png',hex:'#cbd5e1'},
  {id:'231010013',sku:'231010013',name:'PLA Rainbow',type:'PLA',price:93.00,image:'assets/produtos/231010013.png',hex:'#cbd5e1'},
  {id:'231020001',sku:'231020001',name:'PETG Preto',type:'PETG',price:83.00,image:'assets/produtos/231020001.png',hex:'#cbd5e1'},
  {id:'231020002',sku:'231020002',name:'PETG Branco',type:'PETG',price:83.00,image:'assets/produtos/231020002.png',hex:'#cbd5e1'},
  {id:'231020003',sku:'231020003',name:'PETG Azul',type:'PETG',price:83.00,image:'assets/produtos/231020003.png',hex:'#cbd5e1'},
  {id:'231020004',sku:'231020004',name:'PETG Vermelho',type:'PETG',price:83.00,image:'assets/produtos/231020004.png',hex:'#cbd5e1'},
  {id:'231020009',sku:'231020009',name:'PETG Rosa',type:'PETG',price:83.00,image:'assets/produtos/231020009.png',hex:'#cbd5e1'},
  {id:'231020012',sku:'231020012',name:'PETG Cinza',type:'PETG',price:83.00,image:'assets/produtos/231020012.png',hex:'#cbd5e1'},
  {id:'231020053',sku:'231020053',name:'PETG Preto New',type:'PETG',price:83.00,image:'assets/produtos/231020053.png',hex:'#cbd5e1'},
  {id:'231020054',sku:'231020054',name:'PETG Branco New',type:'PETG',price:83.00,image:'assets/produtos/231020054.png',hex:'#cbd5e1'},
  {id:'231020018',sku:'231020018',name:'PETG Fosco Preto',type:'PETG',price:83.00,image:'assets/produtos/231020018.png',hex:'#cbd5e1'},
];
const $ = id => document.getElementById(id);
const config = window.FILACRIA_CONFIG || {};
const money = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
const cleanNumber = String(config.whatsapp || '').replace(/\D/g,'');
const validWhatsapp = /^55\d{10,11}$/.test(cleanNumber);
let filter='Todos';let search='';let cart={};
try{const saved=JSON.parse(localStorage.getItem('filacria-cart')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)){for(const p of PRODUCTS){const q=Number(saved[p.id]);if(Number.isInteger(q)&&q>0&&q<=99)cart[p.id]=q;}}}catch(e){}
function save(){try{localStorage.setItem('filacria-cart',JSON.stringify(cart));}catch(e){}}
function renderProducts(){
 const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const list=PRODUCTS.filter(p=>(filter==='Todos'||p.type===filter)&&norm(p.name+' '+p.sku).includes(norm(search)));
 $('empty').hidden=!!list.length;
 $('product-grid').innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><span class="tag">${p.type}</span><img class="product-photo" src="${p.image}" alt="${p.name} Masterprint" loading="lazy"></div><div class="product-info"><h3>${p.name}</h3><div class="product-bottom"><strong class="price ${p.price===null?'consult':''}">${p.price===null?'Preço sob consulta':money(p.price)}</strong><span class="product-code">Cod. Produto: ${p.sku}</span><button class="add-btn" data-add="${p.id}" aria-label="Adicionar ${p.name} ao pedido">+ Adicionar</button></div></div></article>`).join('');
}
function renderCart(){const total=Object.values(cart).reduce((s,q)=>s+q,0);$('cart-count').textContent=total;$('float-count').textContent=total;$('drawer-count').textContent=`(${total})`;const items=PRODUCTS.filter(p=>cart[p.id]);$('cart-items').innerHTML=items.length?items.map(p=>`<div class="cart-item"><div class="cart-dot" style="--dot:${p.hex}"></div><div class="cart-item-content"><strong>${p.name}</strong><small>${p.price===null?'Preço sob consulta':money(p.price)+' / un.'}</small><div class="qty"><button data-qty="${p.id}" data-delta="-1" aria-label="Diminuir ${p.name}">−</button><strong>${cart[p.id]}</strong><button data-qty="${p.id}" data-delta="1" aria-label="Aumentar ${p.name}">+</button><button class="remove" data-remove="${p.id}">Remover</button></div></div></div>`).join(''):'<p class="cart-empty">Seu carrinho está vazio.<br>Escolha seus filamentos no catálogo.</p>';$('cart-total').textContent=money(items.reduce((s,p)=>s+(p.price||0)*cart[p.id],0));$('checkout').disabled=!items.length;$('checkout').style.opacity=items.length?'1':'.5';}
function openCart(){$('cart-overlay').hidden=false;$('cart-drawer').classList.add('open');$('cart-drawer').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('close-cart').focus();}
function closeCart(){$('cart-overlay').hidden=true;$('cart-drawer').classList.remove('open');$('cart-drawer').setAttribute('aria-hidden','true');document.body.style.overflow='';}
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.append(el);setTimeout(()=>el.remove(),2400);}
function changeQty(id,delta){cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+delta));if(!cart[id])delete cart[id];save();renderCart();}
function checkout(){const items=PRODUCTS.filter(p=>cart[p.id]);if(!items.length)return;if(!validWhatsapp){$('checkout-status').textContent='Para ativar os pedidos, informe seu WhatsApp no arquivo config.js (55 + DDD + número).';return;}const lines=['Olá, FILA.CRIA! Gostaria de consultar/fazer o seguinte pedido:','',...items.map(p=>`• ${p.name} — ${cart[p.id]} un. — ${p.price===null?'valor a consultar':money(p.price)+' cada'}`),'',`Subtotal dos itens com preço: ${money(items.reduce((s,p)=>s+(p.price||0)*cart[p.id],0))}`,'','Podem confirmar disponibilidade, valor final e entrega para meu endereço?'];window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');}
$('search').addEventListener('input',e=>{search=e.target.value;renderProducts();});document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderProducts();}));$('product-grid').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;changeQty(b.dataset.add,1);toast('Produto adicionado ao pedido');});$('cart-items').addEventListener('click',e=>{const qty=e.target.closest('[data-qty]');const rem=e.target.closest('[data-remove]');if(qty)changeQty(qty.dataset.qty,Number(qty.dataset.delta));if(rem){delete cart[rem.dataset.remove];save();renderCart();}});$('open-cart').addEventListener('click',openCart);$('floating-cart').addEventListener('click',openCart);$('close-cart').addEventListener('click',closeCart);$('cart-overlay').addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();});$('checkout').addEventListener('click',checkout);$('year').textContent=new Date().getFullYear();if(validWhatsapp){$('contact-whatsapp').href=`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Olá, FILA.CRIA! Gostaria de informações sobre os filamentos.')}`;$('contact-whatsapp').target='_blank';$('contact-whatsapp').rel='noopener noreferrer';$('contact-whatsapp').removeAttribute('aria-disabled');$('contact-status').textContent='Atendimento direto pelo WhatsApp.';}else{$('contact-whatsapp').addEventListener('click',e=>{e.preventDefault();toast('WhatsApp ainda não configurado no site.');});}renderProducts();renderCart();

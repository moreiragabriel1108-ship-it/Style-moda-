import './style.css';

const products = [
  { id: 1, name: 'Camiseta Oversized', category: 'Masculino', price: 59.90, oldPrice: 79.90, tag: 'MAIS VENDIDO', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', description: 'Algodão macio, caimento amplo e estilo urbano.' },
  { id: 2, name: 'Calça Cargo', category: 'Masculino', price: 119.90, oldPrice: null, tag: 'NOVIDADE', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85', description: 'Modelagem moderna para compor seu visual.' },
  { id: 3, name: 'Vestido Casual', category: 'Feminino', price: 89.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85', description: 'Leve, versátil e perfeito para o dia a dia.' },
  { id: 4, name: 'Tênis Street', category: 'Calçados', price: 159.90, oldPrice: 189.90, tag: 'OFERTA', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', description: 'Conforto e personalidade em cada passo.' },
  { id: 5, name: 'Moletom Premium', category: 'Masculino', price: 129.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85', description: 'Aquele conforto que combina com tudo.' },
  { id: 6, name: 'Conjunto Infantil', category: 'Infantil', price: 74.90, oldPrice: null, tag: '', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85', description: 'Praticidade e conforto para os pequenos.' }
];

const state = { category: 'Todos', query: '', cart: {}, screen: 'home' };
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const app = document.querySelector('#app');

function cartCount() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}
function cartTotal() {
  return products.reduce((sum, p) => sum + p.price * (state.cart[p.id] || 0), 0);
}
function visibleProducts() {
  return products.filter(p => (state.category === 'Todos' || p.category === state.category) &&
    p.name.toLowerCase().includes(state.query.toLowerCase()));
}
function productCard(p) {
  return `<article class="product-card">
    <div class="product-image-wrap">
      <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x700/f0eee9/333?text=Style+Modas'">
      ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      <button class="quick-add" data-add="${p.id}" aria-label="Adicionar ${p.name}">+</button>
    </div>
    <div class="product-info">
      <span class="product-category">${p.category}</span>
      <h3>${p.name}</h3>
      <p class="product-description">${p.description}</p>
      <div class="price-line"><strong>${money(p.price)}</strong>${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ''}</div>
      <button class="add-button" data-add="${p.id}">Adicionar à sacola <span>＋</span></button>
    </div>
  </article>`;
}
function header() {
  return `<header class="site-header">
    <a class="brand" href="#" data-home aria-label="Style Modas início"><span class="brand-mark">S</span><span>STYLE <b>MODAS</b><small>VISTA SEU ESTILO</small></span></a>
    <nav class="desktop-nav"><a href="#colecao" data-category="Todos">Novidades</a><a href="#colecao" data-category="Feminino">Feminino</a><a href="#colecao" data-category="Masculino">Masculino</a><a href="#colecao" data-category="Infantil">Infantil</a></nav>
    <button class="bag-button" data-screen="cart" aria-label="Abrir sacola">SACOLA <span class="bag-count">${cartCount()}</span></button>
  </header>`;
}
function footer() {
  return `<footer class="footer"><div class="footer-brand">STYLE <b>MODAS</b></div><p>Seu estilo, sua identidade.</p><div class="footer-bottom"><span>© 2026 Style Modas</span><span>Feito para você.</span></div></footer>`;
}
function home() {
  const cats = ['Todos', 'Feminino', 'Masculino', 'Infantil', 'Calçados'];
  return `<main>
    <section class="hero">
      <div class="hero-copy"><span class="eyebrow">NOVA COLEÇÃO · 2026</span><h1>Vista aquilo<br>que <em>te representa.</em></h1><p>Peças escolhidas para acompanhar seu estilo em todos os momentos.</p><a href="#colecao" class="hero-cta">EXPLORAR COLEÇÃO <span>↗</span></a><div class="hero-note">ESTILO QUE FALA POR VOCÊ.</div></div>
      <div class="hero-visual"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90" alt="Modelos usando looks de moda"></div>
      <div class="hero-stamp">STYLE<br>YOUR<br>WAY</div>
    </section>
    <section class="benefits"><div><span>✦</span><p><b>Novidades sempre</b><small>Peças selecionadas</small></p></div><div><span>◇</span><p><b>Atendimento próximo</b><small>Fale direto com a loja</small></p></div><div><span>♡</span><p><b>Seu estilo em primeiro</b><small>Escolhas para você</small></p></div></section>
    <section class="collection section" id="colecao">
      <div class="section-heading"><div><span class="eyebrow">ESCOLHA SEU LOOK</span><h2>Encontre sua <em>peça.</em></h2></div><label class="search-box"><span>⌕</span><input id="search" type="search" placeholder="Buscar produto..." value="${state.query}"></label></div>
      <div class="category-list">${cats.map(c => `<button class="category-chip ${state.category === c ? 'active' : ''}" data-category="${c}">${c}</button>`).join('')}</div>
      <div class="product-grid">${visibleProducts().map(productCard).join('') || '<p class="empty-state">Nenhum produto encontrado. Tente outra busca.</p>'}</div>
    </section>
    <section class="promo"><div><span class="eyebrow">É HORA DE RENOVAR</span><h2>Seu próximo look<br>está te esperando.</h2><p>Confira as peças disponíveis e faça seu pedido pelo WhatsApp.</p></div><a href="#colecao" class="promo-link">VER PRODUTOS ↗</a></section>
    <section class="about section"><span class="eyebrow">STYLE MODAS</span><h2>Moda para todos<br>os seus <em>momentos.</em></h2><p>Uma seleção especial de roupas e acessórios para você expressar quem é, do seu jeito.</p></section>
  </main>`;
}
function cartPage() {
  const entries = products.filter(p => state.cart[p.id]);
  return `<main class="cart-page section"><button class="back-link" data-home>← Continuar comprando</button><span class="eyebrow">SEU PEDIDO</span><h1>Sua <em>sacola.</em></h1>
    ${entries.length ? `<div class="cart-layout"><div class="cart-items">${entries.map(p => `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div class="cart-item-info"><span>${p.category}</span><b>${p.name}</b><strong>${money(p.price)}</strong><div class="quantity"><button data-qty="${p.id}" data-delta="-1">−</button><span>${state.cart[p.id]}</span><button data-qty="${p.id}" data-delta="1">＋</button><button class="remove" data-remove="${p.id}">Remover</button></div></div></div>`).join('')}</div>
      <aside class="order-summary"><h2>Resumo do pedido</h2><div><span>Subtotal</span><b>${money(cartTotal())}</b></div><div><span>Entrega</span><span>A combinar</span></div><div class="summary-total"><span>Total</span><strong>${money(cartTotal())}</strong></div><button class="checkout-button" data-checkout>FINALIZAR PELO WHATSAPP ↗</button><small>O pagamento e a entrega serão combinados diretamente com a loja.</small></aside></div>` : '<div class="empty-cart"><span>♡</span><h2>Sua sacola está vazia.</h2><p>Adicione seus favoritos para começar seu pedido.</p><button class="add-button" data-home>EXPLORAR PRODUTOS ↗</button></div>'}
  </main>`;
}
function render() {
  app.innerHTML = header() + (state.screen === 'cart' ? cartPage() : home()) + footer();
}
function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  render();
}
app.addEventListener('click', event => {
  const add = event.target.closest('[data-add]');
  const category = event.target.closest('[data-category]');
  const screen = event.target.closest('[data-screen]');
  const qty = event.target.closest('[data-qty]');
  const remove = event.target.closest('[data-remove]');
  if (add) addToCart(Number(add.dataset.add));
  if (category) { state.category = category.dataset.category; state.screen = 'home'; render(); document.querySelector('#colecao')?.scrollIntoView({ behavior: 'smooth' }); }
  if (screen) { state.screen = screen.dataset.screen; render(); window.scrollTo(0, 0); }
  if (event.target.closest('[data-home]')) { state.screen = 'home'; render(); window.scrollTo(0, 0); }
  if (qty) { const id = Number(qty.dataset.qty); state.cart[id] = Math.max(0, (state.cart[id] || 0) + Number(qty.dataset.delta)); if (!state.cart[id]) delete state.cart[id]; render(); }
  if (remove) { delete state.cart[Number(remove.dataset.remove)]; render(); }
  if (event.target.closest('[data-checkout]')) checkout();
});
app.addEventListener('input', event => {
  if (event.target.id === 'search') {
    const pos = event.target.selectionStart;
    state.query = event.target.value;
    const grid = document.querySelector('.product-grid');
    if (grid) grid.innerHTML = visibleProducts().map(productCard).join('') || '<p class="empty-state">Nenhum produto encontrado.</p>';
    event.target.focus(); event.target.setSelectionRange(pos, pos);
  }
});
function checkout() {
  const lines = products.filter(p => state.cart[p.id]).map(p => `• ${p.name} — ${state.cart[p.id]}x — ${money(p.price * state.cart[p.id])}`);
  const message = encodeURIComponent(`Olá! Quero fazer este pedido na Style Modas:\n\n${lines.join('\n')}\n\nTotal dos produtos: ${money(cartTotal())}\n\nComo faço para combinar pagamento e entrega?`);
  // Configure o número oficial da loja antes de publicar.
  const whatsappNumber = '';
  if (!whatsappNumber) {
    alert('Pedido montado! O número de WhatsApp da loja ainda precisa ser configurado pelo proprietário antes da publicação.');
    return;
  }
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener');
}
render();
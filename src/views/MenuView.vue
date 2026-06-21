<template>
  <DefaultLayout>
    <!-- Hero -->
    <section class="menu-hero" aria-label="Menu header">
      <div class="hero-inner">
        <div class="hero-glass-chip">
          <AppIcon name="utensils" :size="14" aria-hidden="true" />
          Our Full Menu
        </div>
        <h1 class="hero-title">
          <span class="hero-ar" lang="ar">قائمة الطعام</span>
          <span class="hero-en">Koshary Abou Tarek Menu</span>
        </h1>
        <p class="hero-sub">A deliberately simple, legendary menu — perfected over 70+ years</p>
        <div class="hero-tags">
          <span class="tag">🌱 100% Vegan Options</span>
          <span class="tag">🥜 Gluten friendly</span>
          <span class="tag">🚫 No animal fats</span>
          <span class="tag">📞 Delivery: <a href="tel:16011" class="tag-link">16011</a></span>
        </div>
      </div>
    </section>

    <div class="menu-body">

      <!-- ── KOSHARY ── -->
      <section class="menu-section" aria-labelledby="koshary-heading">
        <div class="section-label">
          <div class="section-icon">🍲</div>
          <div>
            <h2 id="koshary-heading" class="section-name">Koshary — كشري</h2>
            <p class="section-desc">Egypt's national street food. Layers of rice, brown lentils &amp; pasta topped with spiced tomato sauce, crispy fried onions, chickpeas &amp; tangy daqqah. 100% plant-based.</p>
          </div>
        </div>

        <div class="items-grid">
          <div class="item-card featured">
            <div class="item-top">
              <div class="item-names">
                <span class="item-name">Koshary</span>
                <span class="item-name-ar" lang="ar">كشري</span>
              </div>
              <span class="badge badge-gold">
                <AppIcon name="star-fill" :size="11" aria-hidden="true" />
                Signature
              </span>
            </div>
            <p class="item-desc">The iconic original — a perfectly balanced bowl of lentils, rice, macaroni, chickpeas, tomato sauce and crispy golden onions.</p>
            <div class="item-sizes">
              <div class="size-row">
                <span class="size-icon">🥣</span>
                <span class="size-name">Small — صغير</span>
                <span class="size-price">~50 EGP</span>
              </div>
              <div class="size-row">
                <span class="size-icon">🥣</span>
                <span class="size-name">Medium — وسط</span>
                <span class="size-price">~60 EGP</span>
              </div>
              <div class="size-row">
                <span class="size-icon">🥣</span>
                <span class="size-name">Large — كبير</span>
                <span class="size-price">~70 EGP</span>
              </div>
              <div class="size-row">
                <span class="size-icon">🥣</span>
                <span class="size-name">Jumbo — جامبو</span>
                <span class="size-price">~85 EGP</span>
              </div>
            </div>
            <div class="item-note">💡 Customize with extra sauce, extra onions, or extra daqqah</div>
          </div>
        </div>

        <!-- Daqqah info -->
        <div class="daqqah-card">
          <div class="daqqah-icon">🫙</div>
          <div class="daqqah-info">
            <h3 class="daqqah-title">The Legendary Daqqah <span lang="ar">الدقة</span></h3>
            <p class="daqqah-desc">Abou Tarek's secret weapon — a tangy, garlicky vinegar sauce made with distilled white vinegar, garlic, water, cumin &amp; coriander. Applied at the table to taste. Ask for <em>daqqa fi sahn</em> (on the side) to control your pour.</p>
            <div class="daqqah-levels">
              <span class="level level-0">Without — بدون</span>
              <span class="level level-1">Regular — عادي</span>
              <span class="level level-2">Extra — زيادة</span>
              <span class="level level-3">🔥 Very Hot — حار جداً</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── SOUPS ── -->
      <section class="menu-section" aria-labelledby="soup-heading">
        <div class="section-label">
          <div class="section-icon">🥣</div>
          <div>
            <h2 id="soup-heading" class="section-name">Soups — الشوربة</h2>
            <p class="section-desc">Traditional Egyptian soups slow-cooked daily from fresh ingredients.</p>
          </div>
        </div>
        <div class="items-grid items-grid--3">
          <article class="item-card">
            <div class="item-emoji">🥣</div>
            <div class="item-names">
              <span class="item-name">Lentil Soup</span>
              <span class="item-name-ar" lang="ar">شوربة عدس</span>
            </div>
            <p class="item-desc">Velvety smooth lentil soup seasoned with cumin &amp; lemon. A perfect warm-up before your koshary.</p>
            <div class="item-price">~60 EGP</div>
          </article>
        </div>
      </section>

      <!-- ── DESSERTS ── -->
      <section class="menu-section" aria-labelledby="dessert-heading">
        <div class="section-label">
          <div class="section-icon">🍮</div>
          <div>
            <h2 id="dessert-heading" class="section-name">Desserts — الحلويات</h2>
            <p class="section-desc">Sweet Egyptian classics to round off your meal.</p>
          </div>
        </div>
        <div class="items-grid items-grid--3">
          <article class="item-card">
            <div class="item-emoji">🍮</div>
            <div class="item-names">
              <span class="item-name">Rice Pudding</span>
              <span class="item-name-ar" lang="ar">أرز باللبن</span>
            </div>
            <p class="item-desc">Classic Om Ali–style Egyptian rice pudding. Warm, creamy &amp; mildly sweet — the perfect complement to spicy koshary.</p>
            <div class="item-price">Market price</div>
          </article>
        </div>
      </section>

      <!-- ── DRINKS ── -->
      <section class="menu-section" aria-labelledby="drinks-heading">
        <div class="section-label">
          <div class="section-icon">🥤</div>
          <div>
            <h2 id="drinks-heading" class="section-name">Drinks — المشروبات</h2>
            <p class="section-desc">Soft drinks and beverages available at all branches.</p>
          </div>
        </div>
        <div class="items-grid items-grid--3">
          <article class="item-card">
            <div class="item-emoji">🥤</div>
            <div class="item-names">
              <span class="item-name">Soft Drinks</span>
              <span class="item-name-ar" lang="ar">مشروبات غازية</span>
            </div>
            <p class="item-desc">Pepsi, 7Up, Mirinda &amp; water available at all branches.</p>
            <div class="item-price">Market price</div>
          </article>
          <article class="item-card">
            <div class="item-emoji">💧</div>
            <div class="item-names">
              <span class="item-name">Water</span>
              <span class="item-name-ar" lang="ar">مياه</span>
            </div>
            <p class="item-desc">Still water in various bottle sizes.</p>
            <div class="item-price">Market price</div>
          </article>
        </div>
      </section>

      <!-- ── Order CTA ── -->
      <section class="order-cta" aria-label="Order delivery">
        <div class="cta-inner">
          <div class="cta-text">
            <h2>Order Now — اطلب دلوقتي</h2>
            <p>Delivery available daily from 7 AM to 10 PM across Cairo, Giza &amp; beyond.</p>
          </div>
          <a href="tel:16011" class="cta-btn" aria-label="Call to order, hotline 16011">
            <AppIcon name="phone" :size="20" aria-hidden="true" />
            <span class="cta-num">16011</span>
          </a>
          <div class="cta-platforms">
            <span class="platform-label">Also on:</span>
            <span class="platform-chip">🛵 Talabat</span>
            <span class="platform-chip">📱 Elmenus</span>
          </div>
        </div>
      </section>

    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { usePageMeta } from '../composables/usePageMeta'

usePageMeta({
  title: 'Our Menu',
  description: 'Full menu of Koshary Abou Tarek — Koshary in all sizes, Lentil Soup, Rice Pudding and drinks. Prices, sizes and the legendary daqqah sauce explained.'
})
</script>

<style scoped>
/* ── Hero ── */
.menu-hero {
  background: var(--hero-gradient);
  padding: var(--sp-12) var(--sp-10);
  position: relative; overflow: hidden;
}
.menu-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.hero-inner { max-width: 680px; position: relative; z-index: 1; }
.hero-glass-chip { margin-bottom: var(--sp-4); }
.hero-title { margin: 0 0 var(--sp-3); display: flex; flex-direction: column; gap: var(--sp-1); }
.hero-ar  { font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1.1; }
.hero-en  { font-size: 1rem; font-weight: 600; color: rgba(255,255,255,.75); letter-spacing: .04em; }
.hero-sub { color: rgba(255,255,255,.8); font-size: .9rem; line-height: 1.6; margin: 0 0 var(--sp-5); }
.hero-tags { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.tag {
  background: var(--hero-glass); border: 1px solid var(--hero-glass-border);
  color: rgba(255,255,255,.9); padding: 5px var(--sp-3); border-radius: var(--r-pill);
  font-size: .78rem; font-weight: 600;
}
.tag-link { color: var(--gold); text-decoration: none; font-weight: 800; }
.tag-link:hover { text-decoration: underline; }

/* ── Body ── */
.menu-body {
  max-width: var(--max-body); margin: 0 auto;
  padding: var(--sp-10) var(--sp-8);
  display: flex; flex-direction: column; gap: var(--sp-12);
}

/* ── Section ── */
.menu-section { display: flex; flex-direction: column; gap: var(--sp-5); }
.section-label {
  display: flex; gap: var(--sp-4); align-items: flex-start;
  padding-bottom: var(--sp-4); border-bottom: 2px solid var(--border);
}
.section-icon {
  width: 52px; height: 52px; flex-shrink: 0;
  background: var(--primary-light); border-radius: var(--r-xl);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem;
}
.section-name { margin: 0 0 var(--sp-1); font-size: 1.3rem; font-weight: 800; color: var(--text); }
.section-desc { margin: 0; font-size: .88rem; color: var(--text-muted); line-height: 1.55; }

/* ── Items grid ── */
.items-grid { display: grid; grid-template-columns: 1fr; gap: var(--sp-4); }
.items-grid--3 { grid-template-columns: var(--grid-cards-sm); }

/* ── Item cards ── */
.item-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-3);
  transition: border-color .15s, box-shadow .15s;
}
.item-card:hover { border-color: var(--primary); box-shadow: var(--shadow-primary); }
.item-card.featured { border-color: var(--gold); background: var(--gold-light); }
.item-card.featured:hover { box-shadow: 0 6px 20px rgba(245,166,35,.2); }

.item-top   { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-3); }
.item-names { display: flex; flex-direction: column; gap: 2px; }
.item-name    { font-size: 1.05rem; font-weight: 800; color: var(--text); }
.item-name-ar { font-size: .85rem; color: var(--text-muted); }
.item-emoji   { font-size: 2rem; }
.item-desc    { font-size: .85rem; color: var(--text-muted); line-height: 1.55; margin: 0; }

/* ── Sizes ── */
.item-sizes {
  display: flex; flex-direction: column; gap: var(--sp-2);
  background: var(--bg); border-radius: var(--r-lg); padding: var(--sp-3) var(--sp-4);
}
.size-row { display: flex; align-items: center; gap: var(--sp-3); font-size: .88rem; color: var(--text); }
.size-icon  { font-size: 1rem; flex-shrink: 0; }
.size-name  { flex: 1; font-weight: 500; }
.size-price { font-weight: 800; color: var(--primary); }
.item-card.featured .size-price { color: var(--gold-text); }

.item-note {
  font-size: .78rem; color: var(--text-muted);
  background: var(--bg); border-radius: var(--r-md); padding: var(--sp-2) var(--sp-3);
}
.item-price {
  font-size: .95rem; font-weight: 800; color: var(--primary);
  background: var(--primary-light); padding: 5px var(--sp-3); border-radius: var(--r-md);
  align-self: flex-start; margin-top: auto;
}

/* ── Daqqah ── */
.daqqah-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-5);
  display: flex; gap: var(--sp-4); align-items: flex-start;
}
.daqqah-icon  { font-size: 2.5rem; flex-shrink: 0; }
.daqqah-title { margin: 0 0 var(--sp-2); font-size: 1rem; font-weight: 800; color: var(--text); }
.daqqah-title span { color: var(--text-muted); font-size: .88rem; }
.daqqah-desc  { margin: 0 0 var(--sp-3); font-size: .85rem; color: var(--text-muted); line-height: 1.6; }
.daqqah-levels { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.level { padding: 4px var(--sp-3); border-radius: var(--r-pill); font-size: .75rem; font-weight: 600; }
.level-0 { background: var(--bg); color: var(--text-muted); }
.level-1 { background: var(--primary-light); color: var(--primary); }
.level-2 { background: rgba(200,16,46,.2); color: var(--primary); }
.level-3 { background: var(--primary); color: #fff; }

/* ── Order CTA ── */
.order-cta {
  background: linear-gradient(135deg, #1a0a0a 0%, #2d1015 100%);
  border-radius: var(--r-3xl); padding: var(--sp-8);
  box-shadow: var(--shadow-lg);
}
.cta-inner { display: flex; align-items: center; gap: var(--sp-6); flex-wrap: wrap; }
.cta-text { flex: 1; min-width: 200px; }
.cta-text h2 { margin: 0 0 var(--sp-1); font-size: 1.3rem; font-weight: 800; color: #fff; }
.cta-text p  { margin: 0; font-size: .88rem; color: rgba(255,255,255,.65); line-height: 1.5; }
.cta-btn {
  display: flex; align-items: center; gap: var(--sp-3);
  background: var(--primary); color: #fff; text-decoration: none;
  border-radius: var(--r-xl); padding: var(--sp-4) var(--sp-6);
  box-shadow: var(--shadow-primary); transition: opacity .15s; white-space: nowrap; flex-shrink: 0;
}
.cta-btn:hover { opacity: .88; }
.cta-num { font-size: 1.5rem; font-weight: 900; letter-spacing: .08em; }
.cta-platforms { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; width: 100%; }
.platform-label { font-size: .78rem; color: rgba(255,255,255,.5); }
.platform-chip {
  background: rgba(255,255,255,.1); color: rgba(255,255,255,.8);
  border: 1px solid rgba(255,255,255,.15);
  padding: 4px var(--sp-3); border-radius: var(--r-pill); font-size: .78rem; font-weight: 600;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .menu-hero { padding: var(--sp-8) var(--sp-4); }
  .hero-ar { font-size: 1.7rem; }
  .menu-body { padding: var(--sp-6) var(--sp-4); gap: var(--sp-8); }
  .hero-tags { gap: var(--sp-2); }
  .tag { font-size: .72rem; padding: 4px var(--sp-3); }
  .section-label { flex-direction: column; gap: var(--sp-3); }
  .items-grid--3 { grid-template-columns: 1fr; }
  .daqqah-card { flex-direction: column; }
  .cta-inner { flex-direction: column; align-items: flex-start; gap: var(--sp-5); }
  .cta-btn { width: 100%; justify-content: center; }
  .order-cta { padding: var(--sp-5); border-radius: var(--r-2xl); }
}
@media (max-width: 380px) {
  .hero-ar { font-size: 1.4rem; }
  .item-card { padding: var(--sp-4); }
}
</style>

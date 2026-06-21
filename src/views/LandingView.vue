<template>
  <DefaultLayout>

    <!-- ══ HERO — full-screen cinematic ══ -->
    <section class="land-hero" aria-label="Hero">
      <div class="hero-bg" :style="{ backgroundImage: `url('/hero-bg.webp')` }"></div>
      <div class="hero-overlay"></div>
      <!-- Hero character — start side -->
      <div class="hero-char" aria-hidden="true">
        <img src="/hero-section.webp" alt="" class="hero-char-img" />
      </div>

      <div class="hero-content" :class="{ 'fade-in': heroVisible }" ref="heroRef">
        <p class="hero-eyebrow">{{ t('مرحبا بكم في', 'Welcome to') }}</p>
        <h1 class="hero-headline">
          {{ t('إمبراطورية أبو طارق', 'The Empire of Abou Tarek') }}
        </h1>
        <p class="hero-desc">
          {{ t(
            'منذ الخمسينيات، يقدم كشري أبو طارق الأكلة الشعبية المصرية الأصيلة للملايين في مصر والعالم.',
            'Since the 1950s, Koshary Abou Tarek has served Egypt\'s beloved national dish to millions across Egypt and the world.'
          ) }}
        </p>
        <div class="hero-cta">
          <router-link to="/branches" class="btn-hero-primary">
            {{ t('اكتشف الفروع', 'Explore Branches') }}
          </router-link>
          <a href="#history" class="btn-hero-ghost">
            {{ t('تعرف علينا', 'Our Story') }}
          </a>
        </div>
      </div>
      <!-- Scroll indicator -->
      <div class="scroll-hint" aria-hidden="true">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
      </div>
    </section>

    <!-- ══ SEPARATOR ══ -->
    <div class="section-separator" aria-hidden="true">
      <img src="/separator.png" alt="" class="separator-img" />
    </div>

    <!-- ══ HISTORY / WHO WE ARE ══ -->
    <section class="history-section" id="history" aria-labelledby="history-heading">
      <div class="history-inner">
        <div class="section-label-row">
          <span class="section-eyebrow">{{ t('من نحن', 'About Us') }}</span>
          <h2 id="history-heading" class="section-big-title">{{ t('تاريخ أبو طارق', 'The Abou Tarek Story') }}</h2>
        </div>

        <!-- Video block -->
        <div class="video-block">
          <div class="video-frame">
            <div class="video-placeholder">
              <div class="play-btn" aria-label="Play video">
                <svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="video-caption">{{ t('شاهد قصتنا', 'Watch Our Story') }}</div>
            </div>
          </div>
        </div>

        <!-- History text -->
        <div class="history-grid">
          <div class="history-card">
            <div class="history-icon">🏺</div>
            <h3>{{ t('البداية ١٩٥٠', 'The Beginning — 1950') }}</h3>
            <p>{{ t(
              'بدأت رحلة كشري أبو طارق من عربة متجولة في شوارع وسط القاهرة، حاملةً وصفة سرية وحبًا أصيلًا لإطعام الناس.',
              'The journey began with a humble street cart in Downtown Cairo, carrying a secret recipe and an authentic love for feeding people.'
            ) }}</p>
          </div>
          <div class="history-card">
            <div class="history-icon">🏛️</div>
            <h3>{{ t('معلم وسط البلد', 'Downtown Landmark') }}</h3>
            <p>{{ t(
              'أصبح المطعم معلمًا أسطوريًا من 4 طوابق في شارع شامبليون، يستقبل آلاف الزوار يوميًا من كل أنحاء العالم.',
              'The restaurant became a legendary 4-story landmark on Champollion Street, welcoming thousands of visitors daily from around the world.'
            ) }}</p>
          </div>
          <div class="history-card">
            <div class="history-icon">🌍</div>
            <h3>{{ t('اليونسكو والعالم', 'UNESCO & The World') }}</h3>
            <p>{{ t(
              'اختارت اليونسكو كشري أبو طارق ممثلًا رسميًا للمطبخ الشعبي المصري، بعد إدراج "الكشري" في قائمة التراث الثقافي غير المادي.',
              'UNESCO selected Koshary Abou Tarek as the official representative of Egyptian folk cuisine, after "Koshary" was inscribed on the Intangible Cultural Heritage list.'
            ) }}</p>
          </div>
        </div>
        <div class="history-read-more">
          <router-link to="/about" class="btn-outline">
            {{ t('اقرأ أكثر', 'Read More') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- ══ ACHIEVEMENTS ══ -->
    <section class="achievements-section" aria-labelledby="achievements-heading">
      <div class="achievements-inner">
        <div class="achievement-feature">
          <div class="ach-img-wrap">
            <div class="ach-img-placeholder">
              <span class="ach-trophy">🏆</span>
            </div>
          </div>
          <div class="ach-text">
            <span class="ach-eyebrow">{{ t('إنجاز عالمي', 'World Achievement') }}</span>
            <h2 class="ach-title">{{ t('مصر تدخل جينيس بأكبر كشري في العالم', 'Egypt Enters Guinness with the World\'s Largest Koshary') }}</h2>
            <p class="ach-desc">{{ t(
              'حقق كشري أبو طارق رقمًا قياسيًا في موسوعة غينيس للأرقام القياسية بتحضير أكبر طبق كشري في التاريخ، في احتفالية وطنية كبرى.',
              'Koshary Abou Tarek set a Guinness World Record by preparing the largest koshary dish in history, in a grand national celebration.'
            ) }}</p>
            <a href="https://www.guinnessworldrecords.com" target="_blank" rel="noopener" class="btn-outline">
              {{ t('اقرأ أكثر', 'Read More') }}
            </a>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-big">70+</span>
            <span class="stat-lbl">{{ t('عامًا من الخبرة', 'Years of Excellence') }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-big">6+</span>
            <span class="stat-lbl">{{ t('فروع في 3 دول', 'Branches in 3 Countries') }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-big">4</span>
            <span class="stat-lbl">{{ t('طوابق في وسط البلد', 'Floors Downtown Cairo') }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-big">🏆</span>
            <span class="stat-lbl">{{ t('جينيس العالمية', 'Guinness World Record') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ NEWS ══ -->
    <section class="news-section" aria-labelledby="news-heading">
      <div class="news-inner">
        <div class="news-header">
          <h2 id="news-heading" class="section-big-title">{{ t('أخبار أبو طارق', 'Abou Tarek News') }}</h2>
          <router-link to="/news" class="btn-outline sm">{{ t('كل الأخبار', 'All News') }}</router-link>
        </div>
        <div class="news-grid">
          <article v-for="article in newsItems" :key="article.id" class="news-card">
            <div class="news-thumb">
              <div class="news-thumb-inner">{{ article.emoji }}</div>
            </div>
            <div class="news-body">
              <span class="news-tag">{{ t(article.tagAr, article.tagEn) }}</span>
              <h3 class="news-title">{{ t(article.titleAr, article.titleEn) }}</h3>
              <p class="news-excerpt">{{ t(article.excerptAr, article.excerptEn) }}</p>
              <span class="news-date">{{ article.date }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ══ ORDER CTA ══ -->
    <section class="order-cta" aria-labelledby="order-heading">
      <div class="order-inner">
        <h2 id="order-heading">{{ t('اطلب كشري أبو طارق الآن', 'Order Koshary Abou Tarek Now') }}</h2>
        <p>{{ t('توصيل يومي من الساعة ٧ صباحًا حتى ١٠ مساءً', 'Daily delivery from 7 AM to 10 PM') }}</p>
        <a href="tel:16011" class="cta-phone">
          <AppIcon name="phone" :size="20" />
          <span>16011</span>
        </a>
      </div>
    </section>

  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'

const { t } = useLanguage()
usePageMeta({ title: 'إمبراطورية أبو طارق', description: 'Koshary Abou Tarek — Egypt\'s legendary koshary since the 1950s' })

const heroRef    = ref(null)
const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => { heroVisible.value = true }, 80)
})

const newsItems = [
  {
    id: 1, emoji: '🏆',
    tagAr: 'إنجاز', tagEn: 'Achievement',
    titleAr: 'كشري أبو طارق يدخل موسوعة جينيس بأكبر طبق كشري',
    titleEn: 'Koshary Abou Tarek Enters Guinness with World\'s Largest Koshary Dish',
    excerptAr: 'حقق المطعم الأسطوري رقمًا قياسيًا عالميًا بتحضير أكبر طبق كشري في التاريخ.',
    excerptEn: 'The legendary restaurant set a world record by preparing the largest koshary dish in history.',
    date: '2024'
  },
  {
    id: 2, emoji: '🎖️',
    tagAr: 'تميّز', tagEn: 'Recognition',
    titleAr: 'TasteAtlas تختار كشري أبو طارق ضمن أفضل ١٠٠ مطعم أسطوري',
    titleEn: 'TasteAtlas Lists Koshary Abou Tarek Among Top 100 Legendary Restaurants',
    excerptAr: 'حصد المطعم لقب "أسطوري" من موقع TasteAtlas الشهير ليكون الأول مصريًا.',
    excerptEn: 'The restaurant earned the "Legendary" title from TasteAtlas, becoming the first Egyptian entry.',
    date: '2024'
  },
  {
    id: 3, emoji: '🌍',
    tagAr: 'توسع', tagEn: 'Expansion',
    titleAr: 'كشري أبو طارق يفتتح فرعًا جديدًا في المملكة العربية السعودية',
    titleEn: 'Koshary Abou Tarek Opens New Branch in Saudi Arabia',
    excerptAr: 'يواصل المطعم توسعه في منطقة الخليج العربي بافتتاح فرع جديد في المملكة.',
    excerptEn: 'The restaurant continues its Gulf expansion with a new branch in Saudi Arabia.',
    date: '2023'
  }
]
</script>

<style scoped>
/* ══ HERO ══ */
.land-hero {
  position: relative; overflow: hidden;
  min-height: 100vh; display: flex;
  align-items: center; justify-content: center;
}
/* Hero character image — pinned to start-bottom corner */
.hero-char {
  position: absolute; bottom: 0;
  inset-inline-start: clamp(20px, 6vw, 120px);
  z-index: 2; pointer-events: none;
  display: flex; align-items: flex-end;
}
.hero-char-img {
  width: clamp(140px, 18vw, 280px);
  height: auto; object-fit: contain;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,.6));
  animation: charFloat 4s ease-in-out infinite;
}
@keyframes charFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background-size: cover; background-position: center;
  background-repeat: no-repeat;
  background-color: #100303;
}
.hero-bg::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 60% 40%, rgba(139,9,32,.75) 0%, transparent 65%),
    linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(10,2,2,.85) 100%);
}
.hero-overlay { position: absolute; inset: 0; z-index: 1; background: rgba(0,0,0,.2); }

.hero-content {
  position: relative; z-index: 2;
  max-width: 760px; padding: var(--sp-8);
  text-align: center;
  opacity: 0; transform: translateY(30px);
  transition: opacity .8s ease, transform .8s ease;
}
.hero-content.fade-in { opacity: 1; transform: none; }

.hero-eyebrow {
  font-size: 1rem; color: rgba(255,255,255,.6);
  letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: var(--sp-3); font-weight: 500;
}
.hero-headline {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900; color: #fff; line-height: 1.1;
  margin: 0 0 var(--sp-5); font-family: 'Cairo', sans-serif;
  text-shadow: 0 2px 30px rgba(0,0,0,.5);
}
.hero-desc {
  font-size: 1rem; color: rgba(255,255,255,.72);
  max-width: 560px; margin: 0 auto var(--sp-8);
  line-height: 1.7;
}
.hero-cta { display: flex; gap: var(--sp-3); justify-content: center; flex-wrap: wrap; }

.btn-hero-primary {
  padding: 14px 36px; background: var(--primary);
  color: #fff; border-radius: var(--r-xl);
  font-weight: 800; font-size: 1rem;
  text-decoration: none; transition: all .2s;
  box-shadow: 0 6px 24px rgba(200,16,46,.4);
}
.btn-hero-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 10px 32px rgba(200,16,46,.5); }

.btn-hero-ghost {
  padding: 14px 36px; background: rgba(255,255,255,.1);
  color: rgba(255,255,255,.85);
  border: 1.5px solid rgba(255,255,255,.25);
  border-radius: var(--r-xl);
  font-weight: 700; font-size: 1rem;
  text-decoration: none; transition: all .2s; backdrop-filter: blur(4px);
}
.btn-hero-ghost:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.4); }

/* Separator */
.section-separator { text-align: center; padding: var(--sp-4) 0; background: var(--bg); overflow: hidden; }
.separator-img { max-width: 360px; width: 60%; height: auto; opacity: .6; margin: 0 auto; mix-blend-mode: multiply; }
[data-theme="dark"] .separator-img { mix-blend-mode: screen; opacity: .25; }

/* Scroll hint */
.scroll-hint {
  position: absolute; bottom: var(--sp-6); left: 50%; transform: translateX(-50%);
  z-index: 2; animation: scrollBounce 2s ease-in-out infinite;
}
.scroll-mouse {
  width: 22px; height: 36px; border: 2px solid rgba(255,255,255,.4);
  border-radius: 11px; display: flex; justify-content: center; padding-top: 6px;
}
.scroll-wheel {
  width: 3px; height: 8px; background: rgba(255,255,255,.6);
  border-radius: 2px; animation: wheelMove 2s ease-in-out infinite;
}
@keyframes scrollBounce { 0%,100%{opacity:.7} 50%{opacity:1} }
@keyframes wheelMove { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

/* ══ HISTORY ══ */
.history-section { background: var(--bg); padding: var(--sp-12) 0; }
.history-inner { max-width: 1100px; margin: 0 auto; padding: 0 var(--sp-8); }

.section-label-row { text-align: center; margin-bottom: var(--sp-8); }
.section-eyebrow {
  display: inline-block; font-size: .8rem; font-weight: 700;
  color: var(--primary); text-transform: uppercase; letter-spacing: .1em;
  margin-bottom: var(--sp-2); background: var(--primary-light);
  padding: 4px 14px; border-radius: var(--r-pill);
}
.section-big-title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 900; color: var(--text); margin: var(--sp-2) 0 0;
}

/* Video */
.video-block { margin-bottom: var(--sp-10); }
.video-frame { border-radius: var(--r-2xl); overflow: hidden; box-shadow: var(--shadow-lg); }
.video-placeholder {
  background: linear-gradient(135deg, #1a0a0a, #2d1010);
  aspect-ratio: 16 / 7; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--sp-3);
  cursor: pointer; transition: filter .2s;
  border: 1px solid rgba(255,255,255,.06);
}
.video-placeholder:hover { filter: brightness(1.1); }
.play-btn {
  width: 72px; height: 72px; border-radius: var(--r-pill);
  background: rgba(200,16,46,.85); display: flex;
  align-items: center; justify-content: center;
  box-shadow: 0 6px 24px rgba(200,16,46,.5);
  transition: transform .2s;
}
.play-btn:hover { transform: scale(1.1); }
.video-caption { font-size: .9rem; color: rgba(255,255,255,.5); }

/* History cards */
.history-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-5); margin-bottom: var(--sp-6);
}
.history-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-6);
  transition: border-color .2s, box-shadow .2s;
}
.history-card:hover { border-color: var(--primary); box-shadow: 0 4px 20px var(--primary-shadow); }
.history-icon { font-size: 2rem; margin-bottom: var(--sp-3); }
.history-card h3 { font-size: .95rem; font-weight: 800; color: var(--text); margin: 0 0 var(--sp-2); }
.history-card p  { font-size: .84rem; color: var(--text-muted); line-height: 1.65; margin: 0; }
.history-read-more { text-align: center; }

.btn-outline {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  padding: 10px 28px; border: 2px solid var(--primary);
  color: var(--primary); border-radius: var(--r-xl);
  font-weight: 700; font-size: .9rem; text-decoration: none;
  transition: all .2s;
}
.btn-outline:hover { background: var(--primary); color: #fff; }
.btn-outline.sm { padding: 7px 20px; font-size: .82rem; }

/* ══ ACHIEVEMENTS ══ */
.achievements-section {
  background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
  padding: var(--sp-12) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.achievements-inner { max-width: 1100px; margin: 0 auto; padding: 0 var(--sp-8); }

.achievement-feature {
  display: grid; grid-template-columns: 1fr 1.2fr;
  gap: var(--sp-10); align-items: center; margin-bottom: var(--sp-10);
}
.ach-img-wrap { border-radius: var(--r-2xl); overflow: hidden; }
.ach-img-placeholder {
  aspect-ratio: 4/3; background: linear-gradient(135deg, #1a0a0a, #3d1515);
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--r-2xl); border: 1px solid rgba(255,255,255,.06);
}
.ach-trophy { font-size: 5rem; filter: drop-shadow(0 4px 16px rgba(245,166,35,.4)); }
.ach-eyebrow {
  display: inline-block; font-size: .78rem; font-weight: 700;
  color: var(--gold); background: var(--gold-light);
  padding: 3px 12px; border-radius: var(--r-pill);
  text-transform: uppercase; letter-spacing: .08em; margin-bottom: var(--sp-3);
}
.ach-title { font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 900; color: var(--text); margin: 0 0 var(--sp-4); line-height: 1.3; }
.ach-desc  { font-size: .9rem; color: var(--text-muted); line-height: 1.7; margin: 0 0 var(--sp-5); }

.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-4);
}
.stat-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-6);
  text-align: center; display: flex; flex-direction: column;
  gap: var(--sp-2); transition: border-color .2s;
}
.stat-card:hover { border-color: var(--gold); }
.stat-big { font-size: 2.2rem; font-weight: 900; color: var(--gold); line-height: 1; }
.stat-lbl { font-size: .8rem; color: var(--text-muted); line-height: 1.4; }

/* ══ NEWS ══ */
.news-section { padding: var(--sp-12) 0; background: var(--bg); }
.news-inner { max-width: 1100px; margin: 0 auto; padding: 0 var(--sp-8); }
.news-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--sp-6); flex-wrap: wrap; gap: var(--sp-4);
}
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-5); }
.news-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); overflow: hidden;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  cursor: pointer;
}
.news-card:hover { border-color: var(--primary); box-shadow: var(--shadow-md); transform: translateY(-3px); }
.news-thumb { aspect-ratio: 16/9; background: linear-gradient(135deg, #1a0a0a, #2d1515); display: flex; align-items: center; justify-content: center; }
.news-thumb-inner { font-size: 3.5rem; filter: drop-shadow(0 2px 8px rgba(0,0,0,.4)); }
.news-body { padding: var(--sp-4) var(--sp-5); }
.news-tag {
  display: inline-block; font-size: .72rem; font-weight: 700;
  color: var(--primary); background: var(--primary-light);
  padding: 2px 10px; border-radius: var(--r-pill);
  text-transform: uppercase; letter-spacing: .05em; margin-bottom: var(--sp-2);
}
.news-title   { font-size: .95rem; font-weight: 800; color: var(--text); margin: 0 0 var(--sp-2); line-height: 1.4; }
.news-excerpt { font-size: .81rem; color: var(--text-muted); line-height: 1.6; margin: 0 0 var(--sp-3); }
.news-date    { font-size: .75rem; color: var(--text-muted); }

/* ══ ORDER CTA ══ */
.order-cta {
  background: var(--hero-gradient);
  padding: var(--sp-10) var(--sp-8); text-align: center;
}
.order-inner { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
.order-cta h2 { font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 900; color: #fff; margin: 0; }
.order-cta p  { color: rgba(255,255,255,.72); font-size: .9rem; margin: 0; }
.cta-phone {
  display: inline-flex; align-items: center; gap: var(--sp-3);
  background: var(--gold); color: #1a0a0a;
  padding: 14px 40px; border-radius: var(--r-xl);
  font-size: 1.6rem; font-weight: 900; text-decoration: none;
  box-shadow: 0 6px 24px rgba(245,166,35,.4);
  transition: all .2s; letter-spacing: .06em;
}
.cta-phone:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(245,166,35,.5); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .history-grid { grid-template-columns: 1fr 1fr; }
  .achievement-feature { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .news-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .history-inner, .achievements-inner, .news-inner { padding: 0 var(--sp-4); }
  .history-grid { grid-template-columns: 1fr; }
  .news-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .hero-headline { font-size: 2.2rem; }
}
</style>

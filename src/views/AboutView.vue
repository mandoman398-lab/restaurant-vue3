<template>
  <DefaultLayout>
    <!-- Hero — About-bg.webp cinematic (matches official site) -->
    <section class="about-page-hero" :style="{ backgroundImage: 'url(/About-bg.webp)' }" aria-label="About">
      <div class="about-page-overlay"></div>
      <div class="about-page-hero-inner">
        <img src="/hero-section.webp" alt="" class="about-page-char" />
        <p class="about-page-eyebrow">{{ t('من نحن', 'About Us') }}</p>
        <h1 class="about-page-title">{{ t('إمبراطورية الكشري المصري منذ الخمسينيات', 'Egypt\'s Koshary Empire Since the 1950s') }}</h1>
      </div>
    </section>

    <div class="about-body">

      <!-- Founding story -->
      <section class="about-section">
        <div class="about-section-inner two-col">
          <div class="about-text">
            <span class="section-eyebrow">{{ t('قصتنا', 'Our Story') }}</span>
            <h2>{{ t('من عربة متجولة إلى إمبراطورية', 'From a Street Cart to an Empire') }}</h2>
            <p>{{ t(
              'في الخمسينيات، انطلقت قصة كشري أبو طارق من عربة صغيرة في شوارع وسط القاهرة. بوصفة سرية وحب أصيل لإطعام الناس، نجح أبو طارق في تحويل أكلة شعبية بسيطة إلى تجربة لا تُنسى.',
              'In the 1950s, the story of Koshary Abou Tarek began with a small cart on the streets of Downtown Cairo. With a secret recipe and an authentic love for feeding people, Abou Tarek transformed a simple folk dish into an unforgettable experience.'
            ) }}</p>
            <p>{{ t(
              'اليوم، يستقبل المطعم الأسطوري من 4 طوابق آلاف الزوار يوميًا من كل أنحاء العالم في شارع شامبليون بوسط القاهرة، ويمتد بفروع في مصر والإمارات العربية المتحدة والمملكة العربية السعودية.',
              'Today, the legendary 4-story restaurant welcomes thousands of visitors daily from around the world on Champollion Street in Downtown Cairo, with branches extending across Egypt, the UAE, and Saudi Arabia.'
            ) }}</p>
          </div>
          <div class="about-visual">
            <div class="about-img-wrap">
              <img src="/branch1.png" alt="كشري أبو طارق" class="about-branch-img" />
              <div class="about-badge">{{ t('منذ ١٩٥٠', 'Since 1950') }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- UNESCO -->
      <section class="about-section alt-bg">
        <div class="about-section-inner">
          <div class="text-center">
            <span class="section-eyebrow">{{ t('اليونسكو', 'UNESCO') }}</span>
            <h2>{{ t('الكشري على قائمة التراث اليونسكو', 'Koshary on the UNESCO Heritage List') }}</h2>
          </div>
          <div class="unesco-content">
            <div class="unesco-badge">🏛️</div>
            <div class="unesco-text">
              <p>{{ t(
                'اختارت منظمة اليونسكو "الكشري" ممثلًا للمطبخ الشعبي المصري في قائمة التراث الثقافي غير المادي للإنسانية، واختارت كشري أبو طارق ممثلًا رسميًا لهذا التراث.',
                'UNESCO designated "Koshary" as a representative of Egyptian folk cuisine on the Intangible Cultural Heritage of Humanity list, selecting Koshary Abou Tarek as the official representative of this heritage.'
              ) }}</p>
              <p>{{ t(
                'هذا الاعتراف الدولي يؤكد مكانة كشري أبو طارق ليس فقط كمطعم، بل كموروث ثقافي حي يجسّد روح المطبخ المصري الأصيل.',
                'This international recognition confirms Koshary Abou Tarek\'s status not just as a restaurant, but as a living cultural heritage embodying the spirit of authentic Egyptian cuisine.'
              ) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="about-section">
        <div class="about-section-inner">
          <div class="text-center">
            <span class="section-eyebrow">{{ t('قيمنا', 'Our Values') }}</span>
            <h2>{{ t('ما يميّزنا', 'What Sets Us Apart') }}</h2>
          </div>
          <div class="values-grid">
            <div class="value-card" v-for="v in values" :key="v.icon">
              <div class="value-icon">{{ v.icon }}</div>
              <h3>{{ t(v.titleAr, v.titleEn) }}</h3>
              <p>{{ t(v.descAr, v.descEn) }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'

const { t } = useLanguage()
usePageMeta({ title: 'من نحن', description: 'About Koshary Abou Tarek — Egypt\'s legendary koshary restaurant since the 1950s' })

const values = [
  {
    icon: '🌱', titleAr: 'نباتي ١٠٠٪', titleEn: '100% Plant-Based',
    descAr: 'كشري أبو طارق نباتي بالكامل — لا دهون حيوانية، لا جيلاتين، مناسب للجميع.',
    descEn: 'Koshary Abou Tarek is fully plant-based — no animal fats, no gelatin, suitable for everyone.'
  },
  {
    icon: '📜', titleAr: 'وصفة سرية', titleEn: 'Secret Recipe',
    descAr: 'وصفة الدقة والصلصة ورّثها الأجداد وتناقلتها الأجيال بكل أمانة.',
    descEn: 'The daqqah and sauce recipe was passed down through generations with complete fidelity.'
  },
  {
    icon: '🏆', titleAr: 'جودة معترف بها عالميًا', titleEn: 'Globally Recognized Quality',
    descAr: 'جينيس للأرقام القياسية، TasteAtlas الأسطوري، واليونسكو — شهادات تثق بها.',
    descEn: 'Guinness World Records, TasteAtlas Legendary, and UNESCO — credentials you can trust.'
  },
  {
    icon: '🤝', titleAr: 'خدمة الجميع', titleEn: 'Serving Everyone',
    descAr: 'من طلاب الجامعة إلى السياح والمشاهير — الكشري للجميع بأسعار يرضى بها الجميع.',
    descEn: 'From university students to tourists and celebrities — koshary for everyone at prices everyone loves.'
  }
]
</script>

<style scoped>
/* Hero */
.page-hero {
  background: var(--hero-gradient); padding: var(--sp-12) var(--sp-8);
  text-align: center; position: relative; overflow: hidden;
}
.page-hero::before {
  content:''; position:absolute; inset:0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E");
}
.page-hero-inner { position: relative; z-index: 1; }
.page-eyebrow { font-size:.8rem; color:rgba(255,255,255,.6); text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:var(--sp-2); }
.page-hero-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; color:#fff; margin:0 0 var(--sp-3); font-family:'Cairo',sans-serif; }
.page-hero-sub { font-size:1rem; color:rgba(255,255,255,.72); margin:0; }

/* ── About page hero ── */
.about-page-hero {
  position: relative; overflow: hidden;
  background-size: cover; background-position: center; background-repeat: no-repeat;
  background-color: #1a0a0a;
  padding: clamp(60px, 10vw, 120px) var(--sp-6) clamp(60px, 12vw, 160px);
  display: flex; align-items: center; justify-content: center;
  margin-top: -72px;
}
@media (max-width: 640px) { .about-page-hero { margin-top: -60px; } }
.about-page-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.35), rgba(10,3,3,.65));
  pointer-events: none;
}
.about-page-hero-inner {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--sp-4);
}
.about-page-char {
  width: clamp(160px, 22vw, 280px); height: auto; object-fit: contain;
  filter: drop-shadow(0 12px 32px rgba(0,0,0,.5));
}
.about-page-eyebrow {
  font-size: 1.1rem; font-weight: 400; color: rgba(255,255,255,.9);
  font-family: 'Poppins', sans-serif; letter-spacing: .06em;
}
.about-page-title {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 400; color: #FEFEFE; line-height: 1.2;
  font-family: 'Cairo', sans-serif; margin: 0; max-width: 700px;
}

/* Body */
.about-body {}
.about-section { padding: var(--sp-12) 0; }
.about-section.alt-bg { background: var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.about-section-inner { max-width:1100px; margin:0 auto; padding:0 var(--sp-8); }

/* Two col */
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-10); align-items:center; }
.about-text h2 { font-size:clamp(1.3rem,2.5vw,2rem); font-weight:900; color:var(--text); margin:var(--sp-2) 0 var(--sp-4); }
.about-text p  { font-size:.9rem; color:var(--text-muted); line-height:1.8; margin:0 0 var(--sp-4); }
.about-visual {}
.about-img-wrap {
  position: relative; border-radius: var(--r-2xl); overflow: visible;
  display: flex; justify-content: center;
}
.about-branch-img {
  width: 100%; max-width: 340px;
  height: auto; object-fit: contain;
  border-radius: var(--r-2xl);
  filter: drop-shadow(0 12px 32px rgba(0,0,0,.25));
  transition: transform .3s;
}
.about-img-wrap:hover .about-branch-img { transform: translateY(-4px); }
.about-badge {
  position: absolute; bottom: var(--sp-4); inset-inline-end: var(--sp-4);
  background: var(--gold); color: #1a0a0a;
  padding: 6px 14px; border-radius: var(--r-xl);
  font-size: .82rem; font-weight: 800;
  box-shadow: 0 4px 12px rgba(245,166,35,.4);
}

/* Section titles */
.section-eyebrow { display:inline-block; font-size:.75rem; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:.1em; background:var(--primary-light); padding:3px 12px; border-radius:var(--r-pill); margin-bottom:var(--sp-2); }
.text-center { text-align:center; margin-bottom:var(--sp-8); }
.text-center h2 { font-size:clamp(1.3rem,2.5vw,2rem); font-weight:900; color:var(--text); margin:var(--sp-2) 0 0; }

/* UNESCO */
.unesco-content { display:grid; grid-template-columns:auto 1fr; gap:var(--sp-6); align-items:start; margin-top:var(--sp-6); }
.unesco-badge { font-size:4rem; flex-shrink:0; }
.unesco-text p { font-size:.92rem; color:var(--text-muted); line-height:1.8; margin:0 0 var(--sp-4); }

/* Values */
.values-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--sp-4); }
.value-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-2xl); padding:var(--sp-5); text-align:center; transition:border-color .2s,box-shadow .2s; }
.value-card:hover { border-color:var(--primary); box-shadow:0 4px 16px var(--primary-shadow); }
.value-icon { font-size:2rem; margin-bottom:var(--sp-3); }
.value-card h3 { font-size:.88rem; font-weight:800; color:var(--text); margin:0 0 var(--sp-2); }
.value-card p  { font-size:.8rem; color:var(--text-muted); line-height:1.6; margin:0; }

@media(max-width:860px){ .two-col{grid-template-columns:1fr} .values-grid{grid-template-columns:1fr 1fr} }
@media(max-width:640px){ .about-section-inner{padding:0 var(--sp-4)} .values-grid{grid-template-columns:1fr} .unesco-content{grid-template-columns:1fr} }
</style>

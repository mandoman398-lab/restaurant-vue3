<template>
  <DefaultLayout>
    <section class="page-hero" aria-label="News">
      <div class="page-hero-inner">
        <span class="page-eyebrow">{{ t('كشري أبو طارق', 'Koshary Abou Tarek') }}</span>
        <h1 class="page-hero-title">{{ t('الأخبار', 'News') }}</h1>
        <p class="page-hero-sub">{{ t('آخر أخبار وإنجازات كشري أبو طارق', 'Latest news and achievements from Koshary Abou Tarek') }}</p>
      </div>
    </section>

    <div class="news-body">
      <div class="news-inner">

        <!-- Featured article -->
        <article class="news-featured">
          <div class="featured-thumb">
            <span class="featured-emoji">🏆</span>
          </div>
          <div class="featured-text">
            <span class="news-tag">{{ t('إنجاز عالمي', 'World Achievement') }}</span>
            <h2>{{ t('كشري أبو طارق يدخل موسوعة جينيس للأرقام القياسية', 'Koshary Abou Tarek Enters Guinness World Records') }}</h2>
            <p>{{ t(
              'حقق كشري أبو طارق رقمًا قياسيًا عالميًا بتحضير أكبر طبق كشري في التاريخ خلال احتفالية وطنية كبرى، ليثبت أن الكشري المصري ليس مجرد أكلة — بل إرث حضاري حقيقي.',
              'Koshary Abou Tarek set a world record by preparing the largest koshary dish in history during a grand national celebration, proving that Egyptian koshary is not just a dish — it\'s a true civilizational heritage.'
            ) }}</p>
            <span class="news-date">2024</span>
          </div>
        </article>

        <!-- All articles grid -->
        <div class="all-news-grid">
          <article v-for="a in allNews" :key="a.id" class="news-card">
            <div class="news-thumb">
              <span class="news-thumb-emoji">{{ a.emoji }}</span>
            </div>
            <div class="news-body-inner">
              <span class="news-tag">{{ t(a.tagAr, a.tagEn) }}</span>
              <h3>{{ t(a.titleAr, a.titleEn) }}</h3>
              <p>{{ t(a.excerptAr, a.excerptEn) }}</p>
              <span class="news-date">{{ a.date }}</span>
            </div>
          </article>
        </div>

      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'

const { t } = useLanguage()
usePageMeta({ title: 'الأخبار', description: 'Latest news from Koshary Abou Tarek' })

const allNews = [
  {
    id:1, emoji:'🎖️', tagAr:'تميّز', tagEn:'Recognition',
    titleAr:'TasteAtlas تختار كشري أبو طارق ضمن أفضل ١٠٠ مطعم أسطوري في العالم',
    titleEn:'TasteAtlas Lists Koshary Abou Tarek Among World\'s Top 100 Legendary Restaurants',
    excerptAr:'حصد المطعم لقب "أسطوري" من موسوعة TasteAtlas ليكون الأول مصريًا في هذه القائمة المرموقة.',
    excerptEn:'The restaurant earned the "Legendary" title from TasteAtlas, becoming the first Egyptian entry on this prestigious list.',
    date:'2024'
  },
  {
    id:2, emoji:'🌍', tagAr:'توسع', tagEn:'Expansion',
    titleAr:'افتتاح فرع جديد في المملكة العربية السعودية',
    titleEn:'New Branch Opens in Saudi Arabia',
    excerptAr:'يواصل كشري أبو طارق توسعه في منطقة الخليج بافتتاح فرعه الجديد في المملكة.',
    excerptEn:'Koshary Abou Tarek continues its Gulf expansion with a new branch in Saudi Arabia.',
    date:'2023'
  },
  {
    id:3, emoji:'🏛️', tagAr:'تراث', tagEn:'Heritage',
    titleAr:'الكشري على قائمة اليونسكو للتراث الثقافي غير المادي',
    titleEn:'Koshary Added to UNESCO Intangible Cultural Heritage List',
    excerptAr:'أعلنت اليونسكو إدراج الكشري المصري في قائمة التراث الثقافي غير المادي للإنسانية.',
    excerptEn:'UNESCO announced the inclusion of Egyptian Koshary on the Intangible Cultural Heritage of Humanity list.',
    date:'2023'
  },
  {
    id:4, emoji:'📺', tagAr:'إعلام', tagEn:'Media',
    titleAr:'كشري أبو طارق في برامج عالمية وتقارير عن المطبخ المصري',
    titleEn:'Koshary Abou Tarek Featured in International Shows on Egyptian Cuisine',
    excerptAr:'سلّطت برامج دولية الضوء على كشري أبو طارق كسفير للمطبخ المصري الأصيل.',
    excerptEn:'International programs highlighted Koshary Abou Tarek as an ambassador of authentic Egyptian cuisine.',
    date:'2023'
  },
  {
    id:5, emoji:'🤝', tagAr:'شراكة', tagEn:'Partnership',
    titleAr:'شراكة استراتيجية لتوسيع التوصيل عبر منصات رقمية',
    titleEn:'Strategic Partnership to Expand Delivery via Digital Platforms',
    excerptAr:'أطلق كشري أبو طارق شراكات جديدة مع منصات توصيل رائدة لتغطية مناطق أوسع.',
    excerptEn:'Koshary Abou Tarek launched new partnerships with leading delivery platforms to cover wider areas.',
    date:'2022'
  },
  {
    id:6, emoji:'🥇', tagAr:'جائزة', tagEn:'Award',
    titleAr:'جائزة أفضل مطعم شعبي في مصر لعام ٢٠٢٢',
    titleEn:'Best Egyptian Street Food Restaurant Award 2022',
    excerptAr:'حصد كشري أبو طارق جائزة أفضل مطعم شعبي في مصر من إحدى أبرز المجلات السياحية.',
    excerptEn:'Koshary Abou Tarek won the Best Egyptian Street Food Restaurant award from one of the most prominent tourism magazines.',
    date:'2022'
  }
]
</script>

<style scoped>
.page-hero { background:var(--hero-gradient); padding:var(--sp-12) var(--sp-8); text-align:center; position:relative; overflow:hidden; }
.page-hero::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E"); }
.page-hero-inner { position:relative; z-index:1; }
.page-eyebrow { font-size:.8rem; color:rgba(255,255,255,.6); text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:var(--sp-2); }
.page-hero-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; color:#fff; margin:0 0 var(--sp-3); font-family:'Cairo',sans-serif; }
.page-hero-sub { font-size:1rem; color:rgba(255,255,255,.72); margin:0; }

.news-body { background:var(--bg); }
.news-inner { max-width:1100px; margin:0 auto; padding:var(--sp-10) var(--sp-8); }

/* Featured */
.news-featured {
  display:grid; grid-template-columns:300px 1fr; gap:var(--sp-8);
  background:var(--surface); border:1.5px solid var(--border);
  border-radius:var(--r-2xl); overflow:hidden; margin-bottom:var(--sp-8);
  transition:border-color .2s; align-items:center;
}
.news-featured:hover { border-color:var(--primary); }
.featured-thumb { background:linear-gradient(135deg,#1a0a0a,#3d1515); display:flex; align-items:center; justify-content:center; height:100%; min-height:220px; }
.featured-emoji { font-size:5rem; }
.featured-text { padding:var(--sp-6); }
.featured-text h2 { font-size:1.3rem; font-weight:900; color:var(--text); margin:var(--sp-2) 0 var(--sp-3); line-height:1.35; }
.featured-text p  { font-size:.88rem; color:var(--text-muted); line-height:1.75; margin:0 0 var(--sp-3); }

.news-tag { display:inline-block; font-size:.72rem; font-weight:700; color:var(--primary); background:var(--primary-light); padding:2px 10px; border-radius:var(--r-pill); text-transform:uppercase; letter-spacing:.05em; margin-bottom:var(--sp-2); }
.news-date { font-size:.75rem; color:var(--text-muted); }

/* Grid */
.all-news-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--sp-4); }
.news-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-2xl); overflow:hidden; transition:border-color .2s,box-shadow .2s,transform .2s; }
.news-card:hover { border-color:var(--primary); box-shadow:var(--shadow-md); transform:translateY(-3px); }
.news-thumb { aspect-ratio:16/9; background:linear-gradient(135deg,#1a0a0a,#2d1515); display:flex; align-items:center; justify-content:center; }
.news-thumb-emoji { font-size:3rem; }
.news-body-inner { padding:var(--sp-4) var(--sp-5); }
.news-body-inner h3 { font-size:.9rem; font-weight:800; color:var(--text); margin:0 0 var(--sp-2); line-height:1.4; }
.news-body-inner p  { font-size:.8rem; color:var(--text-muted); line-height:1.6; margin:0 0 var(--sp-3); }

@media(max-width:900px){ .all-news-grid{grid-template-columns:1fr 1fr} .news-featured{grid-template-columns:1fr} .featured-thumb{min-height:160px} }
@media(max-width:640px){ .news-inner{padding:var(--sp-6) var(--sp-4)} .all-news-grid{grid-template-columns:1fr} }
</style>

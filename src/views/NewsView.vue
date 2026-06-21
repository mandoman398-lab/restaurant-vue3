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
          <div class="featured-thumb" :style="{ background: featuredNews.color }">
            <span class="featured-emoji">{{ featuredNews.emoji }}</span>
          </div>
          <div class="featured-text">
            <span class="news-tag">{{ t(featuredNews.tagAr, featuredNews.tagEn) }}</span>
            <h2>{{ t(featuredNews.titleAr, featuredNews.titleEn) }}</h2>
            <p>{{ t(featuredNews.excerptAr, featuredNews.excerptEn) }}</p>
            <span class="news-date">{{ featuredNews.date }}</span>
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
import allNewsData from '../data/news.json'

const { t } = useLanguage()
usePageMeta({ title: 'الأخبار', description: 'Latest news from Koshary Abou Tarek' })

const featuredNews = allNewsData[0]
const allNews = allNewsData.slice(1)
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

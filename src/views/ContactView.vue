<template>
  <DefaultLayout>
    <section class="page-hero" aria-label="Contact">
      <div class="page-hero-inner">
        <span class="page-eyebrow">{{ t('كشري أبو طارق', 'Koshary Abou Tarek') }}</span>
        <h1 class="page-hero-title">{{ t('تواصل معنا', 'Contact Us') }}</h1>
        <p class="page-hero-sub">{{ t('نحن هنا لخدمتك', 'We\'re Here to Serve You') }}</p>
      </div>
    </section>

    <div class="contact-body">
      <div class="contact-inner">

        <!-- Quick cards -->
        <div class="contact-cards">
          <a href="tel:16011" class="contact-card phone-card">
            <div class="cc-icon">📞</div>
            <div class="cc-text">
              <span class="cc-label">{{ t('خط التوصيل', 'Delivery Hotline') }}</span>
              <span class="cc-value">16011</span>
              <span class="cc-sub">{{ t('يومياً ٧ ص – ١٠ م', 'Daily 7 AM – 10 PM') }}</span>
            </div>
          </a>
          <a href="https://www.instagram.com/koshariabotarek" target="_blank" rel="noopener" class="contact-card social-card">
            <div class="cc-icon">📸</div>
            <div class="cc-text">
              <span class="cc-label">Instagram</span>
              <span class="cc-value">@koshariabotarek</span>
            </div>
          </a>
          <a href="https://www.facebook.com/kosharyabotarek" target="_blank" rel="noopener" class="contact-card social-card">
            <div class="cc-icon">👥</div>
            <div class="cc-text">
              <span class="cc-label">Facebook</span>
              <span class="cc-value">@kosharyabotarek</span>
            </div>
          </a>
        </div>

        <!-- Main content: map placeholder + form -->
        <div class="contact-grid">

          <!-- Location -->
          <div class="contact-location">
            <h2>{{ t('الفرع الرئيسي', 'Main Branch') }}</h2>
            <div class="location-map-placeholder">
              <div class="map-pin-anim" aria-hidden="true">📍</div>
              <p>{{ t('١٦ شارع معروف، تقاطع شارع شامبليون، وسط القاهرة، مصر', '16 Maarouf St., Champollion St. Intersection, Downtown Cairo, Egypt') }}</p>
            </div>
            <div class="location-details">
              <div class="loc-detail">
                <span class="loc-icon">🕐</span>
                <div>
                  <strong>{{ t('ساعات العمل', 'Opening Hours') }}</strong>
                  <p>{{ t('يومياً من ٧ صباحًا حتى منتصف الليل', 'Daily from 7 AM to midnight') }}</p>
                </div>
              </div>
              <div class="loc-detail">
                <span class="loc-icon">🛵</span>
                <div>
                  <strong>{{ t('التوصيل', 'Delivery') }}</strong>
                  <p>{{ t('يومياً ٧ ص – ١٠ م عبر خط ١٦٠١١', 'Daily 7 AM – 10 PM via hotline 16011') }}</p>
                </div>
              </div>
              <div class="loc-detail">
                <span class="loc-icon">🌍</span>
                <div>
                  <strong>{{ t('فروعنا', 'Our Branches') }}</strong>
                  <p>{{ t('مصر • الإمارات • المملكة العربية السعودية', 'Egypt • UAE • Saudi Arabia') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact form -->
          <div class="contact-form-wrap">
            <h2>{{ t('أرسل لنا رسالة', 'Send Us a Message') }}</h2>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-field">
                <label class="form-label">{{ t('الاسم', 'Name') }}</label>
                <input v-model="form.name" class="form-input" type="text" :placeholder="t('اسمك الكريم', 'Your name')" required />
              </div>
              <div class="form-field">
                <label class="form-label">{{ t('البريد الإلكتروني', 'Email') }}</label>
                <input v-model="form.email" class="form-input" type="email" :placeholder="t('بريدك الإلكتروني', 'Your email')" required />
              </div>
              <div class="form-field">
                <label class="form-label">{{ t('الموضوع', 'Subject') }}</label>
                <input v-model="form.subject" class="form-input" type="text" :placeholder="t('موضوع رسالتك', 'Message subject')" required />
              </div>
              <div class="form-field">
                <label class="form-label">{{ t('الرسالة', 'Message') }}</label>
                <textarea v-model="form.message" class="form-input form-textarea" :placeholder="t('اكتب رسالتك هنا…', 'Write your message here…')" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-full" :disabled="submitted">
                <span v-if="!submitted">{{ t('إرسال الرسالة', 'Send Message') }}</span>
                <span v-else>{{ t('✅ تم الإرسال بنجاح!', '✅ Sent Successfully!') }}</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Social row -->
        <div class="social-row">
          <h3>{{ t('تابعنا على', 'Follow Us On') }}</h3>
          <div class="social-links">
            <a href="https://www.instagram.com/koshariabotarek" target="_blank" rel="noopener" class="social-link">Instagram</a>
            <a href="https://www.facebook.com/kosharyabotarek" target="_blank" rel="noopener" class="social-link">Facebook</a>
            <a href="https://www.tiktok.com/@koshariaboutarek" target="_blank" rel="noopener" class="social-link">TikTok</a>
            <a href="https://www.youtube.com/@koshari_apo_tareq" target="_blank" rel="noopener" class="social-link">YouTube</a>
          </div>
        </div>

      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'

const { t } = useLanguage()
usePageMeta({ title: 'تواصل معنا', description: 'Contact Koshary Abou Tarek' })

const form = reactive({ name:'', email:'', subject:'', message:'' })
const submitted = ref(false)

function submitForm() {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    Object.keys(form).forEach(k => form[k] = '')
  }, 3000)
}
</script>

<style scoped>
.page-hero { background:var(--hero-gradient); padding:var(--sp-12) var(--sp-8); text-align:center; position:relative; overflow:hidden; }
.page-hero::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E"); }
.page-hero-inner { position:relative; z-index:1; }
.page-eyebrow { font-size:.8rem; color:rgba(255,255,255,.6); text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:var(--sp-2); }
.page-hero-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; color:#fff; margin:0 0 var(--sp-3); font-family:'Cairo',sans-serif; }
.page-hero-sub { font-size:1rem; color:rgba(255,255,255,.72); margin:0; }

.contact-body { background:var(--bg); }
.contact-inner { max-width:1100px; margin:0 auto; padding:var(--sp-10) var(--sp-8); display:flex; flex-direction:column; gap:var(--sp-8); }

/* Quick cards */
.contact-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--sp-4); }
.contact-card {
  display:flex; align-items:center; gap:var(--sp-4);
  background:var(--surface); border:1.5px solid var(--border);
  border-radius:var(--r-2xl); padding:var(--sp-5);
  text-decoration:none; transition:border-color .2s,box-shadow .2s;
}
.contact-card:hover { border-color:var(--primary); box-shadow:0 4px 16px var(--primary-shadow); }
.phone-card { border-color:var(--gold); }
.phone-card:hover { border-color:var(--gold); box-shadow:0 4px 16px rgba(245,166,35,.25); }
.cc-icon { font-size:2rem; flex-shrink:0; }
.cc-text { display:flex; flex-direction:column; gap:2px; }
.cc-label { font-size:.72rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }
.cc-value { font-size:1.1rem; font-weight:800; color:var(--text); }
.cc-sub   { font-size:.75rem; color:var(--text-muted); }

/* Grid */
.contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-8); align-items:start; }

/* Location */
.contact-location h2 { font-size:1.2rem; font-weight:900; color:var(--text); margin:0 0 var(--sp-4); }
.location-map-placeholder {
  background:linear-gradient(135deg,#1a0a0a,#2d1515);
  border-radius:var(--r-2xl); padding:var(--sp-8);
  display:flex; flex-direction:column; align-items:center;
  gap:var(--sp-3); text-align:center; margin-bottom:var(--sp-4);
  border:1px solid rgba(255,255,255,.06); min-height:160px; justify-content:center;
}
.map-pin-anim { font-size:3rem; animation:pinPulse 2s ease-in-out infinite; }
@keyframes pinPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.location-map-placeholder p { font-size:.85rem; color:rgba(255,255,255,.6); margin:0; line-height:1.6; }
.location-details { display:flex; flex-direction:column; gap:var(--sp-4); }
.loc-detail { display:flex; align-items:flex-start; gap:var(--sp-3); }
.loc-icon { font-size:1.3rem; flex-shrink:0; margin-top:2px; }
.loc-detail strong { display:block; font-size:.85rem; color:var(--text); font-weight:700; margin-bottom:2px; }
.loc-detail p { font-size:.82rem; color:var(--text-muted); margin:0; line-height:1.5; }

/* Form */
.contact-form-wrap h2 { font-size:1.2rem; font-weight:900; color:var(--text); margin:0 0 var(--sp-5); }
.contact-form { display:flex; flex-direction:column; gap:var(--sp-4); }
.form-field { display:flex; flex-direction:column; gap:var(--sp-2); }
.form-label { font-size:.85rem; font-weight:600; color:var(--text); }
.form-input { padding:11px var(--sp-4); border:1.5px solid var(--border); border-radius:var(--r-lg); background:var(--surface); color:var(--text); font-size:.9rem; font-family:inherit; transition:border-color .15s,box-shadow .15s; }
.form-input:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-shadow); }
.form-textarea { resize:vertical; min-height:110px; }

/* Social */
.social-row { text-align:center; border-top:1px solid var(--border); padding-top:var(--sp-6); }
.social-row h3 { font-size:1rem; font-weight:700; color:var(--text); margin:0 0 var(--sp-4); }
.social-links { display:flex; gap:var(--sp-3); justify-content:center; flex-wrap:wrap; }
.social-link { padding:10px 24px; background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-xl); color:var(--text); font-weight:600; font-size:.88rem; text-decoration:none; transition:all .15s; }
.social-link:hover { border-color:var(--primary); color:var(--primary); background:var(--primary-light); }

@media(max-width:860px){ .contact-cards{grid-template-columns:1fr} .contact-grid{grid-template-columns:1fr} }
@media(max-width:640px){ .contact-inner{padding:var(--sp-6) var(--sp-4)} }
</style>

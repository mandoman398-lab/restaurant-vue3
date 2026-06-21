/**
 * Sets <title> and <meta name="description"> dynamically per-page.
 * Keeps SEO meta fresh on every navigation.
 */
export function usePageMeta({ title, description } = {}) {
  const siteName = 'Koshary Abou Tarek | كشري أبو طارق'

  if (title) {
    document.title = `${title} – ${siteName}`
  } else {
    document.title = siteName
  }

  const descEl = document.querySelector('meta[name="description"]')
  if (descEl && description) {
    descEl.setAttribute('content', description)
  }

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle && title) ogTitle.setAttribute('content', `${title} – ${siteName}`)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && description) ogDesc.setAttribute('content', description)
}

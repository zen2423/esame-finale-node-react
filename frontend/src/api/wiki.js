// Simple Wikipedia/Wikimedia image search helper
// Uses MediaWiki API to fetch thumbnail images for a given query
// CORS: Wikimedia APIs allow CORS by default

const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php'

// Basic in-memory cache
const imageCache = new Map()

export async function fetchWikiImages(query, limit = 3, thumbSize = 1200) {
  const key = `${query}|${limit}|${thumbSize}`
  if (imageCache.has(key)) return imageCache.get(key)

  const url = new URL(WIKI_ENDPOINT)
  const params = {
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrlimit: String(limit),
    gsrsearch: query,
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: String(thumbSize)
  }
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const resp = await fetch(url.toString())
  if (!resp.ok) return []
  const data = await resp.json()
  const pages = data?.query?.pages ? Object.values(data.query.pages) : []
  const images = pages
    .filter(p => p.thumbnail?.source)
    .map(p => p.thumbnail.source)

  imageCache.set(key, images)
  return images
}

export async function fetchWikiImage(query, thumbSize = 1200) {
  const images = await fetchWikiImages(query, 1, thumbSize)
  return images[0] || ''
}

// One-off script: upload local product images to Vercel Blob and emit
// a JSON manifest that maps product IDs → public Blob URLs.
//
// Usage:
//   1. Create a Blob store on Vercel and copy its BLOB_READ_WRITE_TOKEN.
//   2. Run from repo root:
//        BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-blob-images.mjs
//   3. Take the printed manifest and use it to patch
//      apps/shell/app/api/products/route.ts.

import { put } from '@vercel/blob'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SOURCE_DIR = join(ROOT, 'assets', 'products')
const MANIFEST_PATH = join(ROOT, 'assets', 'products-blob-manifest.json')

// Maps each product ID → a substring that should match its source filename
// (case-insensitive, partial match). This lets the user keep descriptive
// filenames in assets/products/ while we upload them under clean blob paths.
const PRODUCT_FILE_HINTS = {
  'p-1': 'double heart sparkling ring',
  'p-2': 'shop me link chain bracelet',
  'p-3': 'shop moments snake chain bracelet',
  'p-4': 'open heart stud',
  'p-5': 'shop lab grown diamond ring',
  'p-6': 'celestial stars collier necklace',
  'p-7': 'floating heart charm',
  'p-8': 'shop signature band ring',
  'p-9': 'pave tennis bracelet',
  'p-10': 'family tree charm',
  'p-11': 'mum heart pave charm',
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Missing BLOB_READ_WRITE_TOKEN env var.')
  console.error('Get it from your Vercel Blob store and re-run as:')
  console.error('  BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-blob-images.mjs')
  process.exit(1)
}

const files = await readdir(SOURCE_DIR)
const manifest = {}
let uploaded = 0

console.log(`\nUploading from ${SOURCE_DIR}\n`)

for (const [productId, hint] of Object.entries(PRODUCT_FILE_HINTS)) {
  const match = files.find((f) => f.toLowerCase().includes(hint))
  if (!match) {
    console.warn(`  [skip] ${productId} — no file matched "${hint}"`)
    continue
  }

  const buffer = await readFile(join(SOURCE_DIR, match))
  const ext = match.split('.').pop().toLowerCase()
  const blobPath = `products/${productId}.${ext}`

  process.stdout.write(`  ${productId} ← ${match}  ... `)
  const blob = await put(blobPath, buffer, {
    access: 'public',
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
    addRandomSuffix: false,
    allowOverwrite: true,
  })
  console.log('ok')

  manifest[productId] = blob.url
  uploaded++
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
console.log(`\nUploaded ${uploaded} file(s).`)
console.log(`Manifest written to: ${MANIFEST_PATH}\n`)
console.log(JSON.stringify(manifest, null, 2))

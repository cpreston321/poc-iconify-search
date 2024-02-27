// Create a search for the icons.mjs file that was generated using fuse.js
import Fuse from 'fuse.js'
import icons from './icons.mjs'

import { parseArgs } from "util";

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
});

const TERM = positionals?.[2] ?? ''
const FILTERED_COLLECTIONS = ['ph', 'bxs', 'logos', 'ri']

const filteredIcons = Object.fromEntries(
  Object.entries(icons).filter(([key]) => FILTERED_COLLECTIONS.includes(key))
)
const options = {
  keys: [
    'icons',
    'aliasesKeys'
  ],
  includeScore: true,
  includeMatches: true,
  threshold: 0.0,
}

// measure the time it takes to search for an icon
// Create Fuse Index for the icons
const values = Object.values(filteredIcons)
const iconIndex = Fuse.createIndex(options.keys, values)
const fuse = new Fuse(values, options, iconIndex)

console.time('search')
// Search fuse.search('bun') and only return the highest score
const results = fuse.search(TERM).flat()
const possibleIcons = results.map(({ item, matches }) => {
  // @ts-expect-error - prefix is not null
  const itemKey = item?.prefix ?? ''
  return matches?.map(({ value }) => {
    return `${itemKey}:${value}`
  }).flat()
}).flat()
console.log(`\n`, `Searching icons within iconify with term: '${TERM}':`)
console.log(`\n`, possibleIcons, '\n')
console.timeEnd('search')

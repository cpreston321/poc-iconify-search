import { type IconifyJSON } from '@iconify/types'

// Pull in all the icons from `@iconify/json` and generate a file with all the icons using bun.sh
const glob = new Bun.Glob('*.json')
const scan = await Array.fromAsync(glob.scan({
  cwd: 'node_modules/@iconify/json/json',
  absolute: true,
  onlyFiles: true,
}))

// I want to generate a file with all the icons to make a super fast search for icons
// I will use bun.sh to generate a file with all the icons
// I will read all the files and then generate a file with all the icons
const icons = await Promise.all(scan.map(async (path) => {
  const json: IconifyJSON = await Bun.file(path).json()
  const icons = Object.keys(json.icons)
  const prefix = json.prefix
  const aliases = (json.aliases ?? {})

  return [
    prefix,
    {
      prefix,
      icons: icons.map((icon) => icon),
      aliases,
      aliasesKeys: Object.keys(json.aliases ?? {}),
      lastModified: json.lastModified,
    }
  ]
}))

// Generate the file with all the icons using bun.sh
Bun.write(
  Bun.file('icons.mjs', {
    type: 'javascript'
  }), 
  `// Iconify Search Payload\n// Date Generated: ${new Date().toISOString()}\n// Created by: Christian Preston\n\nexport default ${JSON.stringify(Object.fromEntries(icons))}`
)

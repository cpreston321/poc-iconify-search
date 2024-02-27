# iconify-search

A simple script that get the information we need for the iconify/json search then uses fuse.js to search for the icons using a term.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev <search-name>
```

## Example usage

```bash
▲ bun dev component
$ bun index.ts component

 Searching icons within iconify with term: 'component':

 [ "logos:componentkit", "logos:component", "bxs:component" ] 

[12.08ms] search
```

This project was created using `bun init` in bun v1.0.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

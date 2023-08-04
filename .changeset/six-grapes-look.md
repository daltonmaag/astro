---
'astro': major
---

The value of `import.meta.env.BASE_URL`, which is derived from the `base` option, will not be enforced with a trailing slash if `trailingSlash: "ignore"` is set. The existing behaviours of `trailingSlash: "always"` and `trailingSlash: "never"` are unchanged.

To migrate to this new behaviour, if your `base` configuration already has a trailing slash, no change is needed. If your `base` configuration does not have a trailing slash, you can add one to preserve the previous behaviour, or make sure any usages of `import.meta.env.BASE_URL` works without the trailing slash.

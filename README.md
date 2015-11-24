# klmn-landing

"KLMN project" promo site

Plain-structured site built with [HarpJS](http://harpjs.com/) and custom post-processing:  
- css inlining in `head`
- crucial js logic inlining in `head`
- images inlining to base64 using [PostCSS plugins](http://postcss.parts/)
- html and css minification

PageSpeed insights score: [100/100](https://developers.google.com/speed/pagespeed/insights/?url=klmn-promo.surge.sh) both for desktop and mobile.


## Requirements

- [NodeJS](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [Harp](http://harpjs.com/)
- [Surge](https://surge.sh/) (optional)


## Install

```
npm i
```


## Build

```
# dev build
npm run build-dev

# prod build after dev
npm run build-prod

# just build
npm run build
```

### Deploy

```
# deploy dev
npm run deploy-dev

# regular deploy
npm run deploy
```

### Build and deploy

```
# dev version
npm run build-deploy-dev

# prod version
npm run build-deploy
```


## Server (dev mode)

```
npm run serve
```


## Lint JS

```
npm run lint
```


## Special links

There are couple of pages which you cannot reach via navigation.  
One is obviously **404 page** - just get `/404` and here you go!

The other is **single image** page.
The key is `/image` in the location path.


## [License](LICENSE)

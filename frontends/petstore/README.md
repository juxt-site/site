# Petstore Demo

# Site Server setup
You'll want to follow the site pdf instructions until the petstore is installed. You'll also need to add a system-client 'petstore' the resource for which is already added.

# Build Instructions

```
npm install
npx @juxt/pass init (optionally, if you don't have the service worker js files in public)
npx shadow-cljs watch ui
```

Once the build completes open http://localhost:3000.

A release build can be created via `npx shadow-cljs release ui`.


## TODO

- 2-tier architecture
- Fix auth glitches
- Logout
- Store view
- Pets view

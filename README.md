# city-adventure-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Atypical Conventions

### Application Modules Separation

Due to big overlap of features in both admin/creator applications this single project is used as a base for both of them.

The usual *vue-convention* folders now include directories that categorize the content by the role of user i.e. `admin` or `creator`. There are also `shared` directories for things present in multiple *apps*.

This is why we have two `App.vue` files which define how each of the applications looks like.
We also use `vue-cli` pages feature to output two different `index.html` files.


### Vuex Module Builders

Another quirky thing is the re-use of modules or parts of them.
The issue is that the actions inside these modules will use two different APIs (different URLs, less/more actions).

To address that and not fall into code repetition the module `builders` are introduced.
Basically builders are functions which return objects used to usually define your typical Vuex modules, but you can configure them by passing them APIs which they should use and so on.
Also this way we can extend these objects with ease using for example ES6 Object spreading.

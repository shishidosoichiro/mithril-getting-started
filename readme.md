# mithril-getting-started

How to run
----------


```
npm start
```

Features
---------

* Routing
* Msx
* Msx on server side
* Twitter Bootstrap with mithril


Problems
--------

### IE9

`m.route.mode = "pathname";` does not work.


### route changes now re-render from scratch

v0.1.17 on <https://lhorie.github.io/mithril/change-log.html>

	> route changes now re-render from scratch, rather than attempting a virtual dom diff

### comments in jsx

On jsx, HTML style comments <\!-- --> cause compile error. JavaScript style comments /* */ show on a browser. Instead, You must use {/*  */}

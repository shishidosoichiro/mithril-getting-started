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
* concat
* test

Routing
-------

mithril　ではチョー簡単。
だけど、IE9ではpathnameでのroutingが不可能。

[Internet Explorer サポートポリシー変更の重要なお知らせ] によれば、2016 年 1 月 12 日 (米国時間) には、下記がサポート対象になるらしい。

|お使いの Windows OS         |Internet Explorer の バージョン  |
|--------------------------|-----------------------------|
|Windows Vista SP2         |Internet Explorer 9          |
|Windows Server 2008 SP2   |Internet Explorer 9          |
|Windows 7 SP1             |Internet Explorer 11         |
|Windows Server 2008 R2 SP1|Internet Explorer 11         |
|Windows 8.1 Update        |Internet Explorer 11         |
|Windows Server 2012       |Internet Explorer 10         |
|Windows Server 2012 R2    |Internet Explorer 11         |
|Windows 8                 |Windows 8.1 へアップデートが必要です|

IDMV3としては、IE9は必要？

[Internet Explorer サポートポリシー変更の重要なお知らせ]: https://www.microsoft.com/ja-jp/windows/lifecycle/iesupport/


Msx
---

jsxに似たmsxという形式が用意されていて、javascriptの中にhtmlを混在させられる。
htmlとしてはだいぶ見やすい。
クライアント上での変換なら、

```html
<script src="https://cdn.rawgit.com/insin/msx/master/dist/MSXTransformer.js"></script>
```

をつけるだけ。

Msx on server side
------------------

jsx -> javascript　変換は、一回やっておけばいいだけで、各クライアントで行う必要はない。
というわけで、サーバ上で行う。
gulpとgulp-msxを使う。

```javascript
var gulp = require('gulp');
var msx = require('gulp-msx');

gulp.task('msx', function() {
	return gulp.src(paths.msx)
		.pipe(plumber())
		.pipe(msx())
		.pipe(gulp.dest(paths.js))
})
```

これでオッケー。

```sh
gulp msx
```

でいける。


Bootstrap
----------



Browserify
----------

モジュールごとに別ファイルで書きたいよね。というわけでBrowserifyを使う。

```javascript
gulp.task('js', function() {
	return browserify({
		entries: paths.entries,
		debug: true,
		transform: [mithrilify]
	})
	.bundle()
	.on('error', error)
	.pipe(source('app.js'))
})
```


Testing
-------

### msx 形式はそのままじゃ require できない。

`msx` で記載された Javascript ファイルをどのようにしてテストするかが問題。
`msx` を変換したファイルを `temp` フォルダに吐き出して、それを使用する。
ファイルの場所が変わってしまうと、依存関係が問題になりそう。
`msx` フォルダと `test` フォルダをまとめて `temp` フォルダに変換吐き出すことで解消。

### テストの仕方

とりあえず、Componentは `view` メソッドの実行結果を確認することが基本だろう。
それ自体はプレーンなオブジェクトの固まり。これだけでもある程度は確認可能。
でもそれだと、bootstrapを使用した結果までは確認できない。
というわけで、node.js　上でDOMを構築できる環境があるとすばらしい。
jsdomを使ってみる。
jsdomはnode.js ｖ0.12ではなく、io.jsなんだそうだ。
io.jsは秋にnode.jsと統合される予定ではあるそうだが、
ひとまず、io.jsを入れてみる。
Windowsでは、pythonとvcbuildが必要とのこと。しょうがないので入れてみる。

C:\Users\sshishido\Documents\01_作業\3.0\samples\mithril-getting-started>npm install --msvs_version=2013 --save-dev jsdom@
3.1.2


Problems
--------

### IE9

`m.route.mode = "pathname";` does not work.


### route changes now re-render from scratch

v0.1.17 on <https://lhorie.github.io/mithril/change-log.html>

	> route changes now re-render from scratch, rather than attempting a virtual dom diff

### comments in jsx

On jsx, HTML style comments <\!-- --> cause compile error. JavaScript style comments /* */ show on a browser. Instead, You must use {/*  */}


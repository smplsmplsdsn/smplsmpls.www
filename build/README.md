# Gulp (2024年版)

今回のサンプルでは、SassファイルとJavaScriptファイルを更新するたびに、自動で、下記を処理するようにする。

## package.json のバージョンを更新する場合

    npm install -g npm-check-updates
    ncu -u

gulp のバージョンの更新もしておくこと（一旦削除、追加については下記フロー内にて）

    npm rm --global gulp

## CSSファイルを修正したとき、自動反映すること

 - プリフィックス対応する（*任意に設定可能）
 - media queryをまとめる
 - プロパティの並び替えをおこなう
 - 複数のCSSファイルを一ファイルにまとめる
 - SassをCSSに変換する
 - CSSをワンラインにする（最小化）

## JavaScriptファイルを修正したとき、自動反映すること

 - 複数のJS(JavaScript)ファイルを一ファイルにまとめる
 - JS(JavaScript)をワンラインにする（難読化）

# 手順

ターミナルを開いて順番に下記コマンドを入力していく

### 1. nodeがインストールされているか確認する

    node -v

数字が表示されればOK。<br>
表示されない場合は、公式サイトからインストールする。<br>
[https://nodejs.org/ja/](https://nodejs.org/ja/)

### 2. npmがインストールされているか確認する

    npm -v

数字が表示されればOK。

### 3. gulpがインストールされているか確認する

    gulp -v

versionが表示されればOK。<br>
表示されない場合は、下記を入力する。

    npm install --global gulp-cli

Local version: Unknown の場合は

    npm install --save-dev gulp

ちなみに、公式サイトは、[https://gulpjs.com/docs/en/getting-started/quick-start](https://gulpjs.com/docs/en/getting-started/quick-start)　。バージョンを入れ直したい場合は、`npm rm --global gulp` をして一旦削除する必要があるとのこと。

#### Permission Error が発生する場合

Permission Error が発生する場合は、最初にsudoをつけて入力する。`sudo npm install --global gulp-cli` そのあとに、Password: と出てくるので、パソコンを起動する際に使用するパスワードを入力する。以下同様。

### 4. ディレクトリを移動する

    cd 任意のディレクトリのパス

gulpを導入したいディレクトリに移動する。手順4以降はサイト単位で作ることになる。よく分らない場合は、とりあえずデスクトップにテスト用のフォルダを作って、そこに移動して試してみるのもあり、確認後、ディレクトリごと削除すれば、手順4以降はなかったことにできる。ちなみに `cd` は change directory の略。

### 5. gulpとモジュールをインストールする

    npm i -D

このコマンドを入力すると、手順4のディレクトリ直下に、package-lock.jsonとnode_modulesフォルダが作られる。

ちなみに、i は install、-D は --save-dev の略。<br>
`npm i -D` は、`npm install --save-dev` と同様。

### 6. Sass-migrator を有効にする

https://sass-lang.com/documentation/breaking-changes/slash-div

    sass-migrator division **/*.scss

# テスト

sassファイルを`sample/_build/src/sass/`。JSファイルを`sample/_build/src/js/`に適当に入れたらテストしてみる

コンソールに入力していく。

## CSS

### 複数のSASSファイルを一つのSASSファイルに結合する

    gulp css.concat

`sample/dist/css/common.uncompressed.scss`が生成(上書き)される。

### SASSをCSSにし、ベンダープレフィックスを付与し、プロパティをアルファベット順に並び替え、メディアクエリをまとめる

    gulp sass

`sample/assets/css/common.uncompressed.css`が生成(上書き)される。

### ワンライン(最小化)にする

    gulp css.min

`sample/assets/css/common.min.css`が生成(上書き)される。

## JS

### 複数のJSファイルを一つにまとめる

    gulp js.concat

`sample/assets/js/common.uncompressed.js`が生成(上書き)される。

###  ワンライン(難読化)にする

    gulp js.uglify

`sample/assets/js/common.min.js`が生成(上書き)される。

# これらすべての処理を自動化する（監視）

テストがうまくいけば、あとはファイルを保存したタイミングでテストと同様のことを自動で実行させることができる。

    gulp

監視を中止したい場合は、`control`+`c`。

以上。


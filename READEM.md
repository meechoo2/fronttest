# kick様コーポレートサイト開発環境構築

## 1. 仕様
### 1-1. 対象環境
環境は以下で検証します。

#### 1-1-1. OS
* windows 7,8,10
* macOSX 10.10~
* iOS 10~12
* android 7.x ~ 8.x

#### 1-1-2.ブラウザ
* PC
	* Edge
	* Chrome最新
	* Firefox最新
* スマートフォン
	* Android -  Chrome
	* iOS - Safari(OS標準)

### 1-2. ディレクトリ・ファイルの命名
リソースファイルの命名・配置は以下の通りとします。

#### 1-2-1. 基本方針

* 小文字を基本とした半角英数、アンダースコア`_`、ハイフン`-`から構成します。

#### 1-2-2. 共通リソース
##### サイト内共通リソースファイル
`/htdocs/assets/`以下に使用するリソースを格納しています。

### 1-3. HTML

以下に格納しています。
`/htdocs/{ページ名}.html`

### 1-4. CSS
#### 1-4-1. 読み込み用CSS
以下に格納しています。
`/htdocs/assets/css/style.css`

#### 1-4-2. CSS ソースファイル
以下に格納しています。
`/src/_scss/以下`

#### 1-5. JavaScript
JavaScriptを利用する場合は、下記ファイルに初期設定/function呼び出しの記述をしてください。  
`htdocs/assets/js/init.js`  

jQueryやjQueryライブラリを利用する場合は下記に格納してください。  
`htdocs/assets/lib/***.js`

### 1-5. ディレクトリ配置規則

```
.htdocs/
├── assets/
│   ├── css/
│   ├── img/
│   │   ├── common/
│   │   ├── works/
│   │   ├── services/
│   │   └── members/
│   │ 		•
│   │ 		•
│   │ 		•
│   └── js/
├── index.html
├── members.html
├── services.html
└── works.html
``` 

## 2. コーディングルール

### 2-1. 各種素材呼び出しパス記述
* サイト内：ルートパス

### 2-2. HTML(サイト内のもの)
* 文書型定義：HTML5
* 文字コード：UTF-8
* インデント：なし
* ファイル参照パス:ルートパス
* リンクパス：ルートパス

### 2-3. CSS
* 文書型定義：CSS3
* 文字コード：UTF-8
* インデント：なし
* ファイル参照パス:ルートパス
* コメントの記述：モジュールごとにコメントを記述

#### 2-3-1. ID, Class命名規則
* Block,Element,Modifierの要素をベースにしたBEMを使用します。
* BlockとElementの間は_(アンダースコア)、1つで区切ってください。
* {Block|Element}とModifierの間は-(ハイフン)1つで区切ってください。
    * 例： `.Block_Element-Modifier`
* JavaScriptで吐き出すclass属性については{Block|Element}とModifierは繋げずに、分けて記述してください。
    * 例： `.Block_Element .-Modifier`
* Modifierには-（ハイフン）、1つをprefixとして付けてください。
* 単語同士が2単語以上連続する場合はキャメルケースを使用してください。

* 尚、標準コンポーネントの要素に対しては、クラスに接頭辞を付けて名前空間を与えています。<br>接頭辞の表記は`名前空間-`としています。<br>js利用などで固有の名称を付与する場合も接頭辞を付与してください。

* グローバル要素：g-
* レイアウト要素：l-
* コンポーネント：c-
* ユーティリティ：u-
* JavaScrpt による処理対象：js-
    * JavaScriptによる処理対象については、単語同士を`-`で区切ってください。

### 2-4. JavaScript
* 文字コード：UTF-8
* ファイルパス：サイトルートパス
* 可読性確保のため適宜コメントを記述
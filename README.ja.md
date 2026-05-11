# 福井県の野外フェスオープンデータ (opendata-fes)

このリポジトリは、福井県で開催される野外音楽フェスティバルのオープンデータを提供します。データは自動的に処理され、見やすいHTMLページ、ダウンロード可能なiCalendar (.ics) ファイル、および生のCSVファイルが生成されます。

このプロジェクトは、フェスティバルのウェブサイトからOpen Graph Protocol (OGP) メタデータをスクレイピングし、画像や説明文を追加してソースCSVファイルを充実させます。

## デモ & データ形式

生成されたHTMLページは、フェスティバルのカードをレスポンシブなグリッドで表示します。各カードには、目を引く画像、フェスティバルのタイトルと都市名、および簡単な説明が含まれます。

- **[HTMLページを表示](https://code4fukui.github.io/opendata-fes/)**
- **[iCalendarファイル (.ics) をダウンロード](https://code4fukui.github.io/opendata-fes/fes-fukui.ics)**
- **[CSVファイル (.csv) をダウンロード](https://code4fukui.github.io/opendata-fes/fes-fukui.csv)**

## 仕組み

データ生成は、以下のシンプルな自動化ワークフローで行われます:

1.  **ソースデータ**: フェスティバル情報（名前、URL、日付、場所）は `fes-fukui_src.csv` で手動で管理されます。
2.  **データの拡張**: `addOGP.js` スクリプトがソースCSVを読み込み、各フェスティバルのURLからOGPメタデータ（`og:image` や `og:description` など）を取得し、結合したデータを `fes-fukui.csv` に書き込みます。
3.  **出力生成**:
    - `makeHTML.js` は `fes-fukui.csv` を静的HTMLページ (`fes-fukui.html`) に変換します。
    - `makeICAL.js` は `fes-fukui.csv` を標準のiCalendarファイル (`fes-fukui.ics`) に変換し、カレンダーアプリケーションにインポートできるようにします。

## データの更新方法

新しいフェスティバルを追加したり、既存の情報を更新したりするには、以下の手順に従ってください:

1.  **ソースファイルの編集**: `fes-fukui_src.csv` に行を追加または変更します。`start`、`end`、`title`、`url`、`city`、および `geo3x3` フィールドのみを指定するだけです。

2.  **スクリプトの実行**: 以下のDenoコマンドを順番に実行して、すべての出力を再生成します。

    ```bash
    # 1. OGPデータを取得し、メインの fes-fukui.csv を作成
    deno run -A addOGP.js

    # 2. HTMLページを生成
    deno run -A makeHTML.js

    # 3. iCalendarファイルを生成
    deno run -A makeICAL.js
    ```

## 開発

### 必要条件

- [Deno](https://deno.land/) ランタイム

### 依存関係

このプロジェクトは以下の外部ESモジュールに依存しています:
- [scrapeutil.js](https://code4fukui.github.io/scrapeutil/scrapeutil.js) : ウェブスクレイピング用
- [ICAL.js](https://code4fukui.github.io/ICAL/ICAL.js) : iCalendarファイル生成用
- [CSV.js](https://js.sabae.cc/CSV.js) : CSVのパースと文字列化用
- [DateTime.js](https://js.sabae.cc/DateTime.js) : 日付処理用
- [Geo3x3.js](https://geo3x3.com/Geo3x3.js) : 地理座標のエンコードとデコード用

## データスキーマ

メインのデータファイル `fes-fukui.csv` は以下の列を含みます:

- `start`: イベント開始日 (YYYY-MM-DD)
- `end`: イベント終了日 (YYYY-MM-DD)
- `title`: フェスティバルの公式名称
- `url`: フェスティバルの公式ウェブサイトのURL
- `city`: 福井県の開催都市
- `geo3x3`: イベントの場所を表す [Geo3x3](https://geo3x3.com/) エンコード文字列
- `ogpimage`: 自動取得されたOGP画像のURL
- `ogpdescription`: 自動取得されたOGP説明文

## コントリビューション

コントリビューションは大歓迎です！フェスティバルを追加または更新するには、`fes-fukui_src.csv` ファイルを変更してプルリクエストを作成してください。

## ライセンス

[MIT](https://github.com/code4fukui/opendata-fes/blob/main/LICENSE)

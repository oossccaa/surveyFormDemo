# Vue 3 問卷調查系統 Demo

這是一個使用 Vue 3, Vite, Vue Router 和 Pinia 建立的簡易問卷調查系統前端 Demo。
使用者可以填寫問卷，並在一個模擬的「後台」頁面查看所有已提交的回覆。

**請注意：此為純前端 Demo，所有提交的問卷資料僅儲存在瀏覽器的記憶體中 (透過 Pinia 狀態管理)。關閉或重新整理瀏覽器分頁將會清除所有已提交的資料。資料不會在不同使用者或不同瀏覽器會話間共享或持久保存。**

## 功能特色

* **動態問卷渲染**：根據 JSON 設定檔 (`src/data/surveyQuestions.json`) 動態產生問卷題目。
* **支援題型**：
    * 段落文字 (Paragraph)
    * 電子郵件 (Email)
    * 單選題 (SingleChoice)
    * 多選題 (MultipleChoice)
* **必填驗證**：基礎的必填欄位檢查。
* **前端路由**：使用 Vue Router 實現頁面導航。
    * `/`：問卷填寫頁面。
    * `/reviews`：查看已提交問卷回覆的頁面。
* **狀態管理**：使用 Pinia 管理已提交的問卷資料 (僅限前端記憶體)。
* **響應式設計**：基礎的樣式使其在不同裝置上可閱覽 (樣式靈感部分參考 Google Forms)。

## Demo 網址 (如果已部署)

[點擊這裡查看線上 Demo](YOUR_VERCEL_DEPLOYMENT_URL_HERE)  ## 技術棧

* [Vue 3](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Vue Router](https://router.vuejs.org/)
* [Pinia](https://pinia.vuejs.org/)
* HTML5
* CSS3
* JavaScript (ES6+)

## 如何在本機執行

### 前置需求

* [Node.js](https://nodejs.org/) (建議 LTS 版本，例如 v18.x 或 v20.x)
* [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)

### 安裝依賴

在專案根目錄下執行：

```bash
npm install
# 或
# yarn install
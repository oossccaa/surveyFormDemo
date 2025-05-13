// src/App.vue
<template>
  <div id="app-root">
    <header class="app-header">
      <nav class="main-navigation">
        <router-link to="/" class="nav-link">填寫問卷</router-link>
        <router-link to="/reviews" class="nav-link">查看回覆 ({{ submissionStore.submissionCount }})</router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} 問卷調查系統 Demo. (資料使用 Pinia 存於瀏覽器記憶體)</p>
    </footer>
  </div>
</template>

<script setup>
// 不再需要從 vue 引入 computed
import { useSubmissionStore } from './stores/submissionStore.js'; // <--- 引入 Pinia store

const submissionStore = useSubmissionStore(); // <--- 初始化 Pinia store 實例
// submissionCount getter 現在可以直接從 submissionStore 訪問
</script>

<style>
/* App.vue 的全域樣式保持不變 */
body {
  font-family: 'Roboto', 'Noto Sans TC', Arial, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  color: #202124;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#app-root {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.app-header {
  background-color: #ffffff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.main-navigation {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}
.nav-link {
  font-weight: 500;
  color: #5f6368;
  margin-right: 25px;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 15px;
}
.nav-link:hover {
  background-color: #e8f0fe;
  color: #1967d2;
}
.nav-link.router-link-exact-active {
  color: #1967d2;
  background-color: #e8f0fe;
  font-weight: 700;
}
.app-content {
  flex-grow: 1;
  width: 100%;
}
.app-footer {
  text-align: center;
  padding: 15px 0;
  font-size: 13px;
  color: #5f6368;
  background-color: #f8f9fa;
  border-top: 1px solid #dadce0;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
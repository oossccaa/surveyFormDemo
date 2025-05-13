// src/stores/submissionStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // 從 vue 引入 ref 和 computed

export const useSubmissionStore = defineStore('submissions', () => {
  // --- State ---
  // 使用 ref 來定義響應式的 submittedForms 陣列
  const submittedForms = ref([]);

  // --- Getters ---
  // 使用 computed 來建立 getter，這樣它們會是響應式的
  const allSubmissions = computed(() => submittedForms.value);
  const submissionCount = computed(() => submittedForms.value.length);

  // --- Actions ---
  function addSubmission(formData) {
    const newSubmission = {
      id: `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleString('zh-TW', { hour12: false }),
      // 進行深拷貝以避免直接修改原始響應式對象可能帶來的副作用
      data: JSON.parse(JSON.stringify(formData))
    };
    // 將新的提交添加到陣列的開頭，方便在 ReviewPage 最新顯示
    submittedForms.value.unshift(newSubmission);

    console.log("新的問卷已透過 Pinia 提交:", newSubmission);
    console.log("所有已提交問卷 (Pinia state):", submittedForms.value);

    // -------------------------------------------------------------------------
    // **重要說明 (與之前相同)**：
    // 這裡的資料仍然是儲存在前端瀏覽器的記憶體中。
    // 如果關閉或重新整理頁面，這些資料將會遺失。
    // 在真實的應用中，你會在這裡呼叫一個 API 將資料發送到後端伺服器進行持久化儲存。
    // 例如：
    // import axios from 'axios';
    // axios.post('/api/save-survey', newSubmission)
    //   .then(response => console.log('資料已成功儲存到後端', response))
    //   .catch(error => console.error('儲存資料到後端失敗', error));
    // -------------------------------------------------------------------------
  }

  // 返回 store 的 state, getters, 和 actions
  return {
    // State (可以直接暴露 ref，或透過 getters 訪問)
    // submittedForms, // 如果需要從外部直接修改 state (通常不建議)

    // Getters
    allSubmissions,
    submissionCount,

    // Actions
    addSubmission,
  };
});
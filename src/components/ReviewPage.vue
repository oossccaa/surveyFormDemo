// src/components/ReviewPage.vue
<template>
  <div class="review-page-container">
    <h1>問卷回覆總覽</h1>
    <p class="review-intro">
      此處顯示所有已提交的問卷回覆。請注意：這些資料僅儲存於瀏覽器記憶體中 (使用 Pinia 狀態管理)，
      <strong>關閉或重新整理此分頁將會清除所有回覆。</strong>
      如需永久儲存，需要後端伺服器支援。
    </p>

    <div v-if="submissionStore.submissionCount === 0" class="no-submissions">
      <p>目前尚無任何問卷回覆。</p>
      <router-link to="/" class="action-button">前往填寫問卷</router-link>
    </div>

    <div v-else class="submissions-list">
      <div v-for="submission in submissionStore.allSubmissions" :key="submission.id" class="submission-card">
        <div class="submission-header">
          <h3>回覆 ID: <span class="submission-id">{{ submission.id }}</span></h3>
          <p class="submission-time">提交時間: {{ submission.timestamp }}</p>
        </div>
        <div class="submission-details">
          <h4>回覆內容:</h4>
          <table class="details-table">
            <thead>
              <tr>
                <th>問題</th>
                <th>答案</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(answer, questionId) in submission.data" :key="questionId">
                <td class="question-title-cell">{{ getQuestionTitleById(questionId) }}</td>
                <td class="answer-cell">{{ formatAnswer(answer, questionId) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
     <div style="text-align: center; margin-top: 30px;">
        <router-link to="/" class="action-button">&larr; 返回填寫問卷</router-link>
    </div>
  </div>
</template>

<script setup>
// 不再需要從 vue 引入 computed，因為 getter 已經在 store 中定義好了
import { useSubmissionStore } from '../stores/submissionStore.js'; // <--- 引入 Pinia store
import surveyQuestions from '../data/surveyQuestions.json';

const submissionStore = useSubmissionStore(); // <--- 初始化 Pinia store 實例

// Helper functions (getQuestionTitleById, formatAnswer) 保持不變
const getQuestionTitleById = (questionId) => {
  const question = surveyQuestions.find(q => q.id === questionId);
  return question ? question.title : `未知問題 (ID: ${questionId})`;
};

const formatAnswer = (answer, questionId) => {
  if (answer === null || answer === undefined) return '未填寫';
  const question = surveyQuestions.find(q => q.id === questionId);
  if (question) {
    if (question.type === 'MultipleChoice') {
      if (Array.isArray(answer) && answer.length > 0) {
        return answer.map(val => {
          const option = question.options.find(opt => opt.value === val);
          return option ? option.label : val;
        }).join('、 ');
      }
      return '未選擇';
    }
    if (question.type === 'SingleChoice') {
      const option = question.options.find(opt => opt.value === answer);
      return option ? option.label : answer;
    }
  }
  if (Array.isArray(answer)) {
    return answer.join('、 ');
  }
  return String(answer);
};
</script>

<style scoped>
/* ReviewPage.vue 的樣式保持不變 */
.review-page-container {
  max-width: 960px;
  width: 95%;
  margin: 20px auto;
  padding: 30px 40px;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #202124;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 15px;
}
.review-intro {
  text-align: center;
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px dashed #ced4da;
  border-radius: 4px;
}
.review-intro strong {
    color: #c0392b;
}
.no-submissions {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #5f6368;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.submissions-list {
  margin-top: 20px;
}
.submission-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 25px;
  background-color: #fdfdfd;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}
.submission-header {
  background-color: #f1f3f4;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
}
.submission-header h3 {
  margin: 0 0 5px 0;
  color: #1a73e8;
  font-size: 18px;
  font-weight: 500;
}
.submission-id {
    font-weight: normal;
    color: #3c4043;
    font-size: 0.9em;
}
.submission-time {
  font-size: 13px;
  color: #5f6368;
  margin: 0;
}
.submission-details {
  padding: 20px;
}
.submission-details h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #202124;
  font-size: 16px;
  font-weight: 500;
}
.details-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.details-table th,
.details-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}
.details-table th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #3c4043;
}
.question-title-cell {
    width: 35%;
    font-weight: 500;
    color: #3c4043;
}
.answer-cell {
    word-break: break-word;
}
.action-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #1a73e8;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}
.action-button:hover {
  background-color: #185abc;
}
</style>
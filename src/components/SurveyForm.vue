<template>
  <div class="survey-container">
    <h1>{{ surveyTitle }}</h1>
    <p class="survey-description" v-if="surveyDescription">{{ surveyDescription }}</p>
    <form @submit.prevent="handleSubmit">
      <QuestionRenderer
        v-for="question in questions"
        :key="question.id"
        :question="question"
        v-model="formData[question.id]"
        :error-message="errors[question.id]"
      />
      <button type="submit" class="submit-button">提交問卷</button>
    </form>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import QuestionRenderer from './QuestionRenderer.vue';
import surveyQuestions from '../data/surveyQuestions.json';
import { useSubmissionStore } from '../stores/submissionStore.js';

const submissionStore = useSubmissionStore();

const surveyTitle = ref("問卷調查");
const surveyDescription = ref("感謝您撥冗填寫本次問卷，您的意見對我們非常重要。");

const questions = ref(surveyQuestions);
const formData = reactive({});
const errors = reactive({});
// const lastSubmittedDataForFeedback = ref(null); // <--- 移除這個 ref

questions.value.forEach(q => {
  formData[q.id] = q.type === 'MultipleChoice' ? [] : null;
  errors[q.id] = '';
});

const validateForm = () => {
  let isValid = true;
  for (const key in errors) {
    errors[key] = '';
  }
  questions.value.forEach(question => {
    const value = formData[question.id];
    if (question.required) {
      if (question.type === 'MultipleChoice' && (!value || value.length === 0)) {
        errors[question.id] = `${question.title} 為必填項目。`;
        isValid = false;
      } else if (question.type !== 'MultipleChoice' && (value === null || String(value).trim() === '')) {
        errors[question.id] = `${question.title} 為必填項目。`;
        isValid = false;
      }
    }
    if (question.type === 'Email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
        errors[question.id] = `${question.title} 格式不正確。`;
        isValid = false;
    }
  });
  return isValid;
};

const handleSubmit = () => {
  // lastSubmittedDataForFeedback.value = null; // <--- 移除這行
  if (validateForm()) {
    submissionStore.addSubmission(formData);
    // lastSubmittedDataForFeedback.value = JSON.parse(JSON.stringify(formData)); // <--- 移除這行
    alert('問卷提交成功！'); // 保留這個提示

    questions.value.forEach(q => {
      formData[q.id] = q.type === 'MultipleChoice' ? [] : null;
      errors[q.id] = '';
    });
  } else {
    alert('部分欄位未填寫或格式錯誤，請檢查！');
  }
};
</script>

<style scoped>
/* SurveyForm.vue 的樣式保持不變 */
.survey-container {
  max-width: 800px;
  width: 90%;
  margin: 20px auto;
  padding: 30px 40px;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: left;
  color: #202124;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 8px;
}
.survey-description {
  text-align: left;
  color: #5f6368;
  font-size: 14px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dadce0;
}
/* 移除了 .submitted-data-feedback 相關的樣式，因為該區塊已刪除 */
/*
.submitted-data-feedback {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dadce0;
}
.submitted-data-feedback h2 {
  margin-top: 0;
  color: #202124;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
}
.view-all-submissions-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}
.view-all-submissions-link:hover {
  background-color: #0056b3;
}
*/
.submit-button {
  display: inline-block;
  padding: 10px 24px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin-top: 30px;
}
.submit-button:hover {
  background-color: #185abc;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
}

</style>
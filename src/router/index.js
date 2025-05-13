// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SurveyForm from '../components/SurveyForm.vue';
import ReviewPage from '../components/ReviewPage.vue';

const routes = [
  {
    path: '/',
    name: 'SurveyForm',
    component: SurveyForm,
    meta: { title: '填寫問卷' }
  },
  {
    path: '/reviews',
    name: 'ReviewPage',
    component: ReviewPage,
    meta: { title: '查看回覆' }
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '問卷調查系統 Demo';
  next();
});


export default router;
<template>
  <div class="question-item">
    <label :for="question.id" class="question-title">
      {{ question.title }}
      <span v-if="question.required" class="required-asterisk">*</span>
    </label>

    <div v-if="question.type === 'Paragraph'">
      <textarea
        :id="question.id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="question.required"
        :placeholder="question.placeholder || '請輸入...'"
        rows="4"
      ></textarea>
    </div>

    <div v-else-if="question.type === 'Email'">
      <input
        type="email"
        :id="question.id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="question.required"
        :placeholder="question.placeholder || '例如：name@example.com'"
      />
    </div>

    <div v-else-if="question.type === 'SingleChoice' && question.options">
      <div v-for="option in question.options" :key="option.value" class="option-item">
        <input
          type="radio"
          :id="`${question.id}-${option.value}`"
          :name="question.id"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          :required="question.required && !modelValue"
        />
        <label :for="`${question.id}-${option.value}`">{{ option.label }}</label>
      </div>
    </div>

    <div v-else-if="question.type === 'MultipleChoice' && question.options">
      <div v-for="option in question.options" :key="option.value" class="option-item">
        <input
          type="checkbox"
          :id="`${question.id}-${option.value}`"
          :value="option.value"
          :checked="Array.isArray(modelValue) && modelValue.includes(option.value)"
          @change="handleCheckboxChange(option.value)"
        />
        <label :for="`${question.id}-${option.value}`">{{ option.label }}</label>
      </div>
    </div>

    <div v-else>
      <p>未知的問題類型: {{ question.type }}</p>
      <input
        type="text"
        :id="question.id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="question.required"
        :placeholder="question.placeholder || '請輸入...'"
      />
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  modelValue: { // For v-model
    type: [String, Array, null], // Can be string for text/radio, array for checkboxes
    default: null,
  },
  errorMessage: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue']);

const handleCheckboxChange = (optionValue) => {
  let newValue;
  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.includes(optionValue)) {
      newValue = props.modelValue.filter(v => v !== optionValue);
    } else {
      newValue = [...props.modelValue, optionValue];
    }
  } else {
    newValue = [optionValue];
  }
  emit('update:modelValue', newValue);
};
</script>
<style scoped>
.question-item {
  margin-bottom: 24px; /* 增加問題間的底部間距 */
  padding: 24px;      /* 增加問題內部的 padding */
  border: 1px solid #dadce0; /* Google Forms 的問題框線顏色 */
  border-radius: 8px;
  background-color: #fff; /* 問題區塊背景色 */
  transition: box-shadow 0.2s ease-in-out;
}

/* 可以考慮加上滑鼠懸停或聚焦時的陰影效果 */
.question-item:focus-within,
.question-item:hover {
  border-color: #1a73e8; /* 聚焦時邊框變色 */
  /* box-shadow: 0 0 0 1px #1a73e8 inset; */ /* 另一種聚焦效果 */
}


.question-title {
  display: block;
  font-weight: 400; /* Google Forms 題目字重 */
  margin-bottom: 16px; /* 增加標題和輸入區域的間距 */
  font-size: 16px;   /* Google Forms 題目字體大小 */
  color: #202124;    /* Google Forms 文字顏色 */
  line-height: 1.5;
}

.required-asterisk {
  color: #d93025; /* Google Forms 必填星號顏色 */
  margin-left: 4px;
  font-weight: normal; /* 避免星號也加粗 */
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px 16px; /* 調整輸入框內邊距 */
  border: 1px solid #dadce0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px; /* Google Forms 輸入文字大小 */
  color: #202124;
  background-color: #fff; /* 確保背景是白色 */
  line-height: 24px; /* 行高 */
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  border-color: #1a73e8; /* 聚焦時邊框顏色 */
  box-shadow: 0 0 0 1px #1a73e8 inset; /* 聚焦時內陰影 */
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 80px; /* 設定 textarea 最小高度 */
}

/* Placeholder 樣式 */
input::placeholder,
textarea::placeholder {
  color: #5f6368;
  opacity: 1; /* Firefox */
}


.option-item {
  margin-bottom: 12px; /* 選項間的間距 */
  display: flex;
  align-items: center;
  position: relative; /* 為了更好地定位 radio/checkbox */
  padding: 8px 0; /* 給選項一些垂直空間 */
}

.option-item input[type="radio"],
.option-item input[type="checkbox"] {
  margin-right: 12px; /* 增加與標籤的距離 */
  height: 20px; /* 調整大小 */
  width: 20px;  /* 調整大小 */
  /* accent-color: #1a73e8; */ /* 可以用這個屬性快速改變勾選顏色，但瀏覽器支援度要注意 */
  /* 下面是更傳統的自訂樣式方法，如果需要完全仿照 Google Forms，會更複雜 */
}

.option-item label {
  font-weight: normal;
  font-size: 14px; /* 選項文字大小 */
  color: #202124;
  line-height: 1.5;
  cursor: pointer;
}

.error-message {
  color: #d93025; /* Google Forms 錯誤訊息顏色 */
  font-size: 12px;
  margin-top: 6px;
  padding-left: 2px; /* 稍微縮排 */
}
</style>
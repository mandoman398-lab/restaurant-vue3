---
name: Vue CLI ESLint script-setup
description: Fix for defineProps/defineEmits not-defined errors in Vue CLI projects using script setup
---

The rule to add: `"vue/setup-compiler-macros": true` in the `env` block of the ESLint config.

**Why:** Vue CLI's older eslint-plugin-vue version does not automatically recognize `defineProps`, `defineEmits`, `defineExpose`, and `withDefaults` as global compiler macros. Without this env flag, ESLint throws `no-undef` errors for those macros even though Vue 3 makes them available automatically inside `<script setup>`.

**How to apply:** In package.json eslintConfig:
```json
"env": {
  "node": true,
  "vue/setup-compiler-macros": true
}
```
Also add `"requireConfigFile": false` to parserOptions so @babel/eslint-parser doesn't require a babel config file.

<template>
  <hf-form ref="formInline" :model="form" :label-width="80">
    <hf-row>
      <hf-col span="6">
        <hf-form-item label="产品分类" prop="user">
          <hf-input v-model="form.user"></hf-input>
        </hf-form-item>
      </hf-col>

      <hf-col span="6">
        <hf-form-item label="产品名称" prop="password">
          <hf-input v-model="form.password"></hf-input>
        </hf-form-item>
      </hf-col>

      <hf-col span="6">
        <hf-form-item label="路由名称" prop="password">
          <hf-input v-model="form.password"></hf-input>
        </hf-form-item>
      </hf-col>

      <hf-col span="6">
        <hf-form-item label="路由类型" prop="password">
          <hf-input v-model="form.password"></hf-input>
        </hf-form-item>
      </hf-col>

      <hf-col span="6">
        <hf-form-item label="状态" prop="password">
          <hf-select v-model="form.password" :data="enable"></hf-select>
        </hf-form-item>
      </hf-col>
    </hf-row>

    <hf-form-item>
      <hf-button type="primary" @click="handleSubmit">查询</hf-button>
      <hf-button type="primary" @click="resetForm">重置</hf-button>
    </hf-form-item>
  </hf-form>
</template>

<script>
  export default {
    name: 'QueryForm',
    data() {
      return {
        form: {},
        enable: [
          {label: '启用', value: '0'},
          {label: '不启用', value: '1'}
        ]
      }
    },
    methods: {
      handleSubmit() {

      },
      resetForm() {

      }
    }
  }
</script>

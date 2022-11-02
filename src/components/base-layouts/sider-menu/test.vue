<template>
  <div style="padding-top:10px">
    <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item :name="['user', 'name']" label="条件一" :rules="[{ required: true }]">
      <a-input v-model:value="formState.user.name" />
    </a-form-item>
    <a-form-item :name="['user', 'email']" label="条件二" :rules="[{ type: 'email' }]">
      <a-input v-model:value="formState.user.email" />
    </a-form-item>

    <a-form-item :name="['user', 'website']" label="条件三">
      <a-input v-model:value="formState.user.website" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">查询</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 13 },
    };

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const formState = reactive({
      user: {
        name: '',
        age: undefined,
        email: '',
        website: '',
        introduction: '',
      },
    });
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
    return {
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
});
</script>
<template>
  <div>{{data}}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Warning',
  setup() {
      const data = ref(111);
    return { data };
  },
});
</script>

<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
}
</style>

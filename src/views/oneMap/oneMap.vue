<template>
  <div class="map">
    <div class="left">
      <div class="leftTop">
        <a-row style="height: 50%; text-align: center; line-height: 80px">
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('zhaiyao')"
          >
            <div v-if="selected != 'zhaiyao'">
              <div class="outImg">
                <img src="../../assets/onemap/zhaiyao.png" alt="" class="img" />
              </div>

              <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
                摘要
              </div>
            </div>

            <div v-if="selected == 'zhaiyao'">
              <div class="outImg">
                <img src="../../assets/onemap/zhaiyaob.png" alt="" class="img" />
              </div>

              <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);    font-weight: 600;
    font-size: 18px;
">
                摘要
              </div>
              <div style="position: absolute; top: 105px; left: 50%; transform: translateX(-50%); width:50px;height:5px;background:#1296db"></div>
              
            </div>
          </a-col>
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('jiangyu')"
          >
            <div  v-if="selected != 'jiangyu'">
                <div class="outImg">
              <img src="../../assets/onemap/jiangyu.png" alt="" class="img" />
            </div>

            <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
              降雨
            </div>
            </div>

            <div  v-if="selected == 'jiangyu'">
                <div class="outImg">
              <img src="../../assets/onemap/jiangyub.png" alt="" class="img" />
            </div>

            <div
              style="
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 18px;
                font-weight: 600;

              "
            >
              降雨
            </div>
            </div>
          </a-col>
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('hedao')"
          >
            <div v-if="selected != 'hedao'">
                <div class="outImg">
              <img src="../../assets/onemap/heliu.png" alt="" class="img" />
            </div>

            <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
              河道
            </div>
            </div>

            <div v-if="selected == 'hedao'">
                <div class="outImg">
              <img src="../../assets/onemap/heliub.png" alt="" class="img" />
            </div>

            <div
              style="
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 18px;
                font-weight: 600;
              "
            >
              河道
            </div>
            </div>
          </a-col>
        </a-row>
        <a-row style="height: 50%; text-align: center; line-height: 80px">
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('shuiku')"
          >
            <div v-if="selected != 'shuiku'">
                <div class="outImg">
              <img src="../../assets/onemap/shuiku.png" alt="" class="img" />
            </div>

            <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
              水库
            </div>
            </div>

            <div v-if="selected == 'shuiku'">
                <div class="outImg">
              <img src="../../assets/onemap/shukub.png" alt="" class="img" />
            </div>

            <div
              style="
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 18px;
                font-weight: 600;
              "
            >
              水库
            </div>
            </div>
          </a-col>
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('zhanwang')"
          >
            <div v-if="selected != 'zhanwang'">
                <div class="outImg">
              <img src="../../assets/onemap/zhanwang.png" alt="" class="img" />
            </div>

            <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
              站网
            </div>
            </div>

            <div v-if="selected == 'zhanwang'">
                <div class="outImg">
              <img src="../../assets/onemap/zhanwangb.png" alt="" class="img" />
            </div>

            <div
              style="
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 18px;
                font-weight: 600;
              "
            >
              站网
            </div>
            </div>
          </a-col>
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            style="position: relative"
            @click="tabChange('qixiang')"
          >
            <div v-if="selected != 'qixiang'">
                <div class="outImg">
              <img src="../../assets/onemap/qixiang.png" alt="" class="img" />
            </div>

            <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);font-size: 18px;">
              气象
            </div>
            </div>

            <div v-if="selected == 'qixiang'">
                <div class="outImg">
              <img src="../../assets/onemap/qixiangb.png" alt="" class="img" />
            </div>

            <div
              style="
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 18px;
                font-weight: 600;
              "
            >
              气象
            </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="leftBottom">
        <hedao v-if="selected == 'hedao'"></hedao>
        <jiangyu v-if="selected == 'jiangyu'"></jiangyu>
      </div>
    </div>
    <!-- {{ data }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import hedao from './components/hedao.vue';
import jiangyu from './components/jiangyu.vue';
import request from '@/utils/request';
export default defineComponent({
  name: 'OneMap',
  components: {
    hedao,
    jiangyu,
  },
  setup() {
    const data = ref(111);
    const selected = ref('');
    const tabChange = config => {
      debugger;
      selected.value = config;
    };
    const getAjaxData = (params)=>{
        return request.get('/xxxxx', params);
    };
    getAjaxData({ name:123 }).then((res)=>{
        console.log(res);
    });

    return { data, tabChange, selected };
  },
});
</script>

<style lang="less" scoped>
.map {
  position: relative;
  background: gainsboro;
  width: 100%;
  height: calc(100vh - 73px);
  //   height: 500px;
  .left {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    min-width: 250px;
    height: 500px;
    // background: chocolate;
    display: flex;
    flex-direction: column;
    .leftTop {
      height: 230px;
      width: 100%;
      background: rgba(251, 251, 251, 0.2);
      .outImg {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .img {
          width: 50px;
          height: 50px;
        }
        .desc {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .leftBottom {
      margin-top: 5px;
      height: 200px;
      width: 100%;
      background: rgba(252, 253, 252, 0.2);
    }
  }
}
</style>

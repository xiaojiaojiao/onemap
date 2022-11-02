<template>
  <div id="warning" class="charts"></div>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, ref, toRaw } from 'vue';
// import type { ECharts } from 'echarts';
import * as echarts from "echarts";
import shengfen from '../../assets/shandong.json'
// import "echarts-liquidfill";

export default defineComponent({
  name: 'AdvanceForm',
  setup() {
    const charts = ref(HTMLElement);
    const myChart = ref<any>();
    setTimeout(()=>{
        myChart.value = markRaw(echarts.init(
          document.getElementById("warning") as HTMLCanvasElement
        ))
        let airData  = [
                    { name: '北京', value: 1 },
                    { name: '天津', value: 2 },
                    { name: '河北', value: 5 },
                    { name: '山西', value: 7 },
                    { name: '内蒙古', value: 10 },
                    { name: '辽宁', value: 12 },
                    { name: '吉林', value: 15 },
                    { name: '黑龙江', value: 18 },
                    { name: '上海', value: 20 },
                    { name: '江苏', value: 22 },
                    { name: '浙江', value: 25 },
                    { name: '安徽', value: 30 },
                    { name: '福建', value: 34 },
                    { name: '江西', value: 96 },
                    { name: '山东', value: 92 },
                    { name: '河南', value: 13 },
                    { name: '湖北', value: 27 },
                    { name: '湖南', value: 17 },
                    { name: '广东', value: 38 },
                    { name: '广西', value: 59 },
                    { name: '海南', value: 54 },
                    { name: '重庆', value: 66 },
                    { name: '四川', value: 8 },
                    { name: '贵州', value: 1 },
                    { name: '云南', value: 25 },
                    { name: '西藏', value: 24 },
                    { name: '陕西', value: 25 },
                    { name: '甘肃', value: 19 },
                    { name: '青海', value: 17 },
                    { name: '宁夏', value: 52 },
                    { name: '新疆', value: 10 },
                    { name: '台湾', value: 8 },
                ]
                const option = {
                    // 背景颜色
                    backgroundColor: "#fff",
                    // 提示浮窗样式
                    tooltip: {
                        show: true,
                        trigger: 'item', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        alwaysShowContent: false,
                        backgroundColor: "#fff",
                        borderColor: "rgba(0, 0, 0, 0.16);",
                        triggerOn: "mousemove",
                        enterable: true, //鼠标是否可进入提示框浮层中
                        textStyle: {
                            fontSize: "12",
                            overflow: "break",
                        },
                        formatter: function (params) {
                            let str = '';
                            str = `<div> ` + params.name + `:` + params.value + `</div>`                   
                            return str
                        },
                    },
                    visualMap: { //分段型视觉映射组件
                        show: true,
                        type: 'piecewise',
                        left: 50,
                        bottom: 50,
                        showLabel: true,
                        itemWidth: 10,
                        itemHeight: 10,
                        inverse: true,
                        // lt:小于; lte:小于等于; gt:大于; gte:大于等于;
                        pieces: [  
                            {
                                lt: 5,
                                label: "<5ms",
                                color: "#83CBAC"
                            },
                            {
                                gte: 5,
                                lte: 10,
                                label: "5-10ms",
                                color: "#55BB8A"
                            },
                            {
                                gt: 10,
                                lte: 15,
                                label: "10-15ms",
                                color: "#20A162"
                            },
                            {
                                gt: 15,
                                lte: 20,
                                label: "15-20ms",
                                color: "#9ABEFA"
                            },
                            {
                                gt: 20,
                                lte: 30,
                                label: '20-30ms',
                                color: "#78A9F9"
                            },
                            {
                                gt: 30,
                                label: '>30ms',
                                color: "#5693F7"
                            }
                        ]
                    },
                    // 地图配置
                    geo: {
                        map: "china",
                        aspectScale: 0.8, //长宽比,0.75的含义为宽是高的0.75,假如高为100,宽就只有75;0.5的含义就是宽只有高的一半,假如高为100,宽就只有50
                        zoom: 1.6, //视觉比例大小,1.2即为原有大小的1.2倍
                        roam: false, //是否开启鼠标缩放和平移漫游。默认不开启。可以不用设置,如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。
                        top: '25%',
                        label: {
                            // 通常状态下的样式
                            normal: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                },
                            },
                            // 鼠标放上去的样式
                            emphasis: {
                                textStyle: {
                                    color: "#fff",
                                },
                            },
                        },
                        // 地图区域的样式设置
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0, 0, 0, 0.1)",
                                borderWidth: 1,
                            },
                            // 鼠标放上去高亮的样式
                            emphasis: {
                                // areaColor: "rgba(0, 0, 0, 0.1)",
                                borderWidth: 0,
                            },
                        },
                    },
                    series: [
                        {
                            selectedMode: false, //取消地图区域点击事件
                            geoIndex: 0,  //将数据和第0个geo配置关联在一起
                            type: 'map',
                            data: airData,
                        },
                    ],
                }
                echarts.registerMap("china", shengfen )
                myChart.value.setOption(option);
                myChart.value.on("mouseover", function () { //取消鼠标移入地图区域高亮
                   myChart.value.dispatchAction({
                        type: 'legendUnSelect'
                    });
                });

    },1000)
    return {charts}
  }
});
</script>

<style lang="less" scoped>
.charts {
  height: 100%;
  width: 100%;
}
</style>

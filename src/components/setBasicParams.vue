<template id="setBasicParams">
    <div class="panel-body row">
        <div class="row" style="margin-left: 0px">
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">Channel Path</span>
                    <input v-model="pathId" type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <span class="input-group-addon">StartTime</span>
                    <input v-model="startTime" type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <span class="input-group-addon">EndTime</span>
                    <input v-model="endTime" type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">DotNum</span>
                    <input v-model="dotNum" type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-primary btn-mid" v-on:click="viewLoad">
                    <b>&nbsp;Load&nbsp;</b>
                    <span class="glyphicon glyphicon-save"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class setBasicParams extends Vue {
    @Prop() id!:string;
    thingPath = '/dataserver';
    pathId:string = '';
    startTime:string = '';
    endTime:string = '';
    dotNum:string = '';
    viewLoad(){
        var temp = {};
        var path = this.pathId;
        path = path.replace(/\//g, ".");
        path = path.replace(/\\/g, ".");
        var startTime = this.startTime;
        var endTime = this.endTime;
        var dotNum = this.dotNum;
        if (path == '' || startTime == '' || endTime == '') {
            alert("请输入完整数据");
        } else {
            var data = this.getData(path, startTime, endTime, dotNum);
            this.getDataTimeAxis(path, startTime, endTime, dotNum);
            console.log(data);
        }
    }
    createChannelChart(myPlot:any, data_update:any, data_layout:any = {}) {
        data_layout.margin = { t: 20 };

        var config = {
        modeBarButtonsToRemove: ['resetScale2d'],
        displaylogo: false
        };

        Plotly.newPlot(myPlot, data_update, data_layout, config);
    }
    parseData(data:any) {
        var arrData = [];
        for (var i in data.ObjectVal) {
            arrData.push(data.ObjectVal[i]);
        }
        return arrData;
    }
    getData(path:any, startTime:string, endTime:string, dotNum:string){
        var apiLoad = this.thingPath + '/DataByTimeFuzzy/' + path + '/' + startTime + '/' + endTime + '/' + dotNum;
        return axios.get(apiLoad);
    }
    getDataTimeAxis(path:any, startTime:string, endTime:string, dotNum:string){
        console.log(startTime, endTime, dotNum);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div id="app">
    <div>
      <qh-select v-model="value"
                 placeholder="请选择"
                 :options="options">
      </qh-select>

      <qh-button type="search"></qh-button>
    </div>

    <QhTable :tableData="tableData" :tHeader="tHeader" stripe border ref="table">
      <template slot-scope="scope" slot="button">
        <el-button type="text" size="small">{{scope.row.address}}</el-button>
      </template>
    </QhTable>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        value: '',
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶',
            disabled: true
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        tHeader: [
          {
            prop: 'customerCode',
            label: '客户编码',
            width: 200
          },
          {
            prop: 'address',
            label: '客户编码',
            render: (h, params) => {
              return this.$refs.table.$scopedSlots.button(params)
            }
          }
        ],
        tableData: [
          {
            customerCode: 'John Brown--- 1',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ]
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  body, h1, div, p {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

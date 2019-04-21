<template>
  <div id="app">
    <div style="margin: 50px">
      <tree-select v-model="treeData" multiple :options="data2"></tree-select>
      <div>
        <tree-select v-model="value3" :options="data2" clearable></tree-select>
        <span>{{value3}}</span>
      </div>

      <multi-select v-model="multiData" :options="options"></multi-select>

      <el-select v-model="value5" multiple placeholder="请选择" v-draggable class="draggable">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div>
      <qh-select v-model="value"
                 placeholder="请选择"
                 :options="options">
      </qh-select>
      <qh-button type="search"></qh-button>
    </div>

    <qh-table :tableData="tableData" :tHeader="tHeader" stripe border index selection ref="table">
      <template v-slot:button="scope">
        <el-button type="text" size="small">{{scope.row.address}}</el-button>
      </template>
      <template v-slot:test>
        <qh-button type="delete" size="small"></qh-button>
      </template>
      <template v-slot:expandColumn="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </qh-table>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  export default {
    name: 'app',
    components: {},
    data() {
      return {
        treeData: [1, 2],
        value3: 2,
        multiData: ['选项1', '选项3'],
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        value5: [],
        componentId: 'el-button',
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
          // {
          //   type: 'expand',
          //   slotKey: 'expandColumn'
          // },
          {
            prop: 'customerCode',
            label: '客户编码',
            wvalueth: 200
          },
          {
            prop: 'address',
            label: '客户编码',
            // render: (h, params) => {
            //   return h('span', {style: {color: 'red'}}, '测试')
            //   // return this.$refs.table.$scopedSlots.button(params)
            // }
          },
          {
            prop: 'address',
            label: '客户编码',
            // slotKey: 'test'
          }
        ],
        tableData: [
          {
            value: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            customerCode: 'John Brown--- 1',
            age: 18,
            date: '2016-10-03'
          }
        ]
      }
    },
    beforeCreate() {
      this.$set(this, 'testData', []);
      console.log(this.$set);
      // this.testData = [];
      // setInterval(() => {
      //     this.testData.push(Math.random())
      //     console.log(this.testData);
      // }, 2000)
    },
    mounted() {
      this.resize = debounce(() => {
        console.log(1);
      },50);
      console.log(this.resize);
      // console.log(this.testData, '测试大运');
      setTimeout(() => {
        this.data2 = [
          {
            value: 1,
            label: '一级 1',
            children: [{
              value: 4,
              label: '二级 1-1',
              children: [{
                value: 9,
                label: '三级 1-1-1'
              }, {
                value: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            value: 2,
            label: '一级 2',
            children: [{
              value: 5,
              label: '二级 2-1'
            }, {
              value: 6,
              label: '二级 2-2'
            }]
          }, {
            value: 3,
            label: '一级 3',
            children: [{
              value: 7,
              label: '二级 3-1'
            }, {
              value: 8,
              label: '二级 3-2'
            }]
          }]
      }, 2000)
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

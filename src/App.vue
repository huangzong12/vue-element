<template>
  <div id="app">
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

  export default {
    name: 'app',
    components: {},
    data() {
      return {
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
          {
            type: 'expand',
            slotKey: 'expandColumn'
          },
          {
            prop: 'customerCode',
            label: '客户编码',
            width: 200
          },
          {
            prop: 'address',
            label: '客户编码',
            render: (h, params) => {
              return h('span', {style: {color: 'red'}}, '测试')
              // return this.$refs.table.$scopedSlots.button(params)
            }
          },
          {
            prop: 'address',
            label: '客户编码',
            slotKey: 'test'
          }
        ],
        tableData: [
          {
            id: '12987122',
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

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

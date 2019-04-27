<template>
  <div class="home">
    <query-form></query-form>

    <CustomFilter ref="test"></CustomFilter>

    <hf-button type="primary" @click="test">测试</hf-button>

    <hf-button type="primary" @click="test2">测试按钮2</hf-button>

    <hf-button type="primary" @click="modalVisible = true">拖动弹窗</hf-button>

    <p>主页 {{model2}} {{model3}} {{model5}}</p>
    <p>树 {{model5}}</p>
    <hf-select v-model="model2" :data="cityList"></hf-select>
    <hf-checkbox-group v-model="model3" :data="cityList"></hf-checkbox-group>
    <hf-radio-group v-model="model4" :data="cityList"></hf-radio-group>
    <Button @click="modal = true">20px from the top</Button>
    <hf-modal title="Title"
              v-model="modal"
              :styles="{top: '100px'}">
    </hf-modal>

    <hf-tree-select :data="treeData1" v-model="model5"></hf-tree-select>

    <hf-tree-select :data="treeData"
                    label-key="title"
                    value-key="id"
                    multiple
                    expand-all
                    v-model="model6">
    </hf-tree-select>

    <Dropdown>
      下拉菜单
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem disabled>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem divided>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <hf-switch v-model="switch1" @on-change="change"/>


    <TableSetting :headerData="columns1"></TableSetting>

    <hf-table :columns="columns1" :data="data1" ref="table" border></hf-table>

    <hf-page :total="40"></hf-page>

    <Modal v-dragmodal v-model="modalVisible" title="拖动">
      拖动这里即可拖动整个弹窗
    </Modal>
  </div>
</template>

<script>
  import {menu} from "@/api/system"
  import QueryForm from '@/common/query-table/query-form'
  import TableSetting from '@/common/query-table/table-setting'
  import CustomFilter from '@/common/query-table/custom-filter'

  export default {
    name: 'home',
    components: {QueryForm, TableSetting, CustomFilter},
    data() {
      return {
        modalVisible: false,
        options: {
          trigger: '.ivu-modal-header',
          body: '.ivu-modal',
          recover: false
        },
        model2: '',
        switch1: false,
        model3: [],
        model4: 'New York',
        model5: '111',
        model6: '',
        cityList: [
          {
            value: 'New York',
            label: '纽约'
          },
          {
            value: 'London',
            label: '伦敦'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        modal: false,
        treeData1: [
          {
            label: '测试数据1',
            value: '1',
            children: [
              {
                value: '11',
                label: '测试数据2',
                children: [
                  {
                    value: '111',
                    label: '测试数据3'
                  }
                ]
              },
            ]
          }
        ],
        treeData: [
          {
            id: 1,
            title: '1',
            children: [
              {
                id: 11,
                title: '1-1',
                children: [
                  {
                    id: 111,
                    title: '1-1-1'
                  }
                ]
              },
              {
                id: 12,
                title: '1-2',
                children: [
                  {
                    id: 121,
                    title: '1-2-1'
                  }
                ]
              }
            ]
          }
        ],
        columns1: [
          {
            title: 'Name',
            key: 'name',
            // "fixed": "left",
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status);
      },
      test() {
        menu({
          username: 'orgadmin',
          password: '9ad97475f63ad02e900b211ef491c4e7',
          verifyCode: 'e3dp'
        }).then(res => {
          console.log(res);
        }).catch(error => {
          console.log(error);
        })
        this.$refs.test.show = true
      },
      test2() {
        console.log(this.$refs.table)
      },
    }
  }
</script>

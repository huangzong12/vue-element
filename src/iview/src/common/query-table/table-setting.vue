<template>
  <div title="自定义列" class="table-setting">
    <hf-button type="text" @click="showSetting">个性化设置</hf-button>
    <hf-modal title="个性化设置" v-model="settingVisible">
      <div class="title">可拖动进行排序</div>
      <div class="select-box">
        <hf-checkbox-group v-model="headerSelect">
          <div ref="sortBox">
            <div v-for="(item,index) in headerSource" :key="index" class="checkbox-content">
              <hf-checkbox :label="item" :key="index">{{item}}</hf-checkbox>
            </div>
          </div>
        </hf-checkbox-group>
      </div>
    </hf-modal>
  </div>
</template>

<script>
  import Sortable from "sortablejs"

  export default {
    name: "TableSetting",
    props: {
      //需要排序的表头
      headerData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        settingVisible: false,
        headerDataCopy: [], //复制一份表头数据用于排序
        headerSelect: [], //选择需要显示的表头
        headerSelectCopy: [], //复制需要显示的表头
        headerSource: [], //没有排序前的表头数据
        headerSourceCopy: [] //复制没有排序前的表头数据
      };
    },
    watch: {
      headerData: {
        handler(val) {
          this.headerSelect = val.map(item => item.title).filter(item => item);
          this.headerSelectCopy = [...this.headerSelect];
          this.headerSource = val.map(item => item.title).filter(item => item);
          this.headerSourceCopy = [...this.headerSource];
          this.headerDataCopy = [...val];
        },
        immediate: true
      }
    },
    methods: {
      showSetting() {
        const _this = this;
        this.settingVisible = true;
        this.$nextTick(() => {
          new Sortable(this.$refs.sortBox, {
            animation: 200,
            group: "description",
            disabled: false,
            ghostClass: "ghost",
            onEnd(e) {
              const temp = _this.headerSourceCopy.splice(e.oldIndex, 1)[0];
              _this.headerSourceCopy.splice(e.newIndex, 0, temp);
            }
          });
        });
      },
      resetSort() {
        this.headerSelect = [...this.headerSelectCopy];
        this.headerSource = [...this.headerSource];
      },
      cancelSort() {
        this.resetSort();
        this.settingVisible = false;
      },
      confirmSort() {
        this.headerSelectCopy = [...this.headerSelect];
        this.settingVisible = false;
        this.headerSource = [...this.headerSourceCopy];
        const arr = [];
        const arrData = [];
        this.headerSource.forEach(item => {
          if (this.headerSelect.includes(item)) {
            arr.push(item);
          }
        });
        this.headerSelect = arr;
        this.headerSelect.forEach(item => {
          this.headerDataCopy.forEach(val => {
            if (val.title === item) {
              arrData.push(val);
            }
          });
        });
        this.$emit("sorttable", arrData);
      }
    }
  };
</script>

<style lang="less">
  .table-setting {
    display: inline-block;
    height: 28px;
  }

  .select-box {
    border: 1px solid #e2e2e2;
    height: 320px;
    overflow-y: auto;
  }

  .checkbox-content {
    padding: 5px 10px;
    border-bottom: 1px solid #f5f5f5;
    height: 32px;
    box-sizing: border-box;
  }

  /*.checkbox-content:last-child {*/
  /*  border: none;*/
  /*}*/

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .no-move {
    transition: transform 0s;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
</style>

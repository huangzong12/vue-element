<template>
  <el-table :data="tableData" :height="height ? height : autoHeight" v-bind="$attrs" v-on="$listeners">
    <el-table-column type="index" label="序号" width="50" align="center" v-if="index"></el-table-column>
    <el-table-column type="selection" width="50" v-if="selection"></el-table-column>
    <el-table-column v-for="(item, index) in tHeader" :key="index" v-bind="item">
      <template v-slot="scope">
        <render-td v-if="typeof item.render === 'function' || item.slotKey"
                   :row="scope.row"
                   :column="scope.column"
                   :scopedSlots="$scopedSlots"
                   :slotKey="item.slotKey"
                   :index="scope.$index"
                   :render="item.render">
        </render-td>
        <template v-else>{{scope.row[item.prop]}}</template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import RenderTd from "./RenderTd";

  export default {
    name: "QhTable",
    components: {RenderTd},
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      tHeader: {
        type: Array,
        default: () => []
      },
      selection: {
        type: Boolean,
        default: false
      },
      index: {
        type: Boolean,
        default: false
      },
      height: [Number, String]
    },
    data() {
      return {
        autoHeight: 'auto'
      }
    },
    methods: {
      getHeight() {
        this.$nextTick(() => {
          let {top} = this.$el.getBoundingClientRect();
          this.autoHeight = document.documentElement.clientHeight - top;
        })
      }
    },
    created() {
      this.getHeight();
    }
  }
</script>

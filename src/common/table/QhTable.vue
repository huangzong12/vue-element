<template>
  <el-table :data="tableData" :height="height ? height : autoHeight" v-bind="$attrs" v-on="$listeners">
    <el-table-column type="index" width="55" v-if="index"></el-table-column>
    <el-table-column type="selection" width="55" v-if="selection"></el-table-column>
    <el-table-column v-for="(item, index) in tHeader" :key="index" v-bind="item">
      <template slot-scope="scope">
        <render-td v-if="item.render"
                   :row="scope.row"
                   :column="scope.column"
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
        default: true
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

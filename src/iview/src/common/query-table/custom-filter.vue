<template>
  <hf-modal class="custom-filter"
            width="1000px"
            title="通用查询"
            v-model="show"
            @open="onOpen"
            @close="onClose">
    <div class="main-wrap">
      <div class="main-wrap_left">
        <div class="title">模板列表</div>
        <ul class="tpl-list">
          <li class="tpl" v-for="(item, index) in templateList" :key="index">
            <div :class="`name ${model.templateIndex === index ? 'is-active' : ''}`"
                 @click="loadTemplate(index)">
              <i class="iconfont icon-custom"></i>
              <span :title="item.name.length >= 8 ? item.name : ''">&ensp;{{item.name}}</span>
            </div>
            <div v-show="model.templateIndex === index">
              <i class="hf-icon-edit" @click="updateTemplate(index)"></i>
              <i class="hf-icon-delete red" @click="removeTemplate(index)"></i>
            </div>
          </li>
          <li v-if="templateList.length === 0" class="center">暂无数据</li>
        </ul>
      </div>
      <div class="main-wrap_right">

      </div>
    </div>
    <div slot="footer">
      <hf-button type="primary" @click="addRule" icon="iconfont icon-plus">新增一条</hf-button>
      <hf-button type="primary"
                 icon="iconfont icon-pen"
                 :disabled="!model.templateId"
                 @click="saveTemplate">保存(S)
      </hf-button>
      <hf-button type="primary" @click="createTemplate" icon="iconfont icon-saveas">另存为</hf-button>
      <hf-button type="primary" @click="onQuery" icon="iconfont icon-search">查询</hf-button>
      <hf-button style="padding-left:20px;padding-right:20px;" @click="show = false">取消</hf-button>
    </div>
    <hf-modal ref="templateDialog"
              width="360px"
              title="设置模板名称"
              custom-class="custom-filter-template"
              v-model="showSavePanel"
              @open="openTemplate"
              @close="closeTemplate">
      <hf-form :model="model" :rules="templateRules" ref="templateForm" labhf-width="60px">
        <hf-form-item label="模板名称" prop="templateName">
          <hf-input v-model="model.templateName" placeholder="请输入模板名称" :maxlength="100"></hf-input>
        </hf-form-item>
      </hf-form>
      <div slot="footer">
        <hf-button type="primary" @click="validatedSaveTemplate">保存(S)</hf-button>
        <hf-button @click="showSavePanel = false">取消</hf-button>
      </div>
    </hf-modal>
  </hf-modal>
</template>

<script>
  export default {
    name: 'custom-filter',
    props: {
      module: Object
    },
    data() {
      return {
        show: false,
        showSavePanel: false,
        templateList: [{name: '查询模板1'}, {name: '查询模板2'}],
        ruleOption: {},
        model: {
          esFlag: true,
          genericId: '',
          fields: null,
          templateId: '',
          templateName: '',
          templateIndex: -1
        },
        templateRules: {
          templateName: [
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // this.initProps()
    },
    methods: {
      // 对外暴露，merge 查询条件
      setGenericFields(option) {
        this.ruleOption = option
      },
      setGenericSearchFields(obj) {
        if (obj && obj.columnList && obj.columnList.length) {
          this.model.genericId = obj.id
          this.model.esFlag = obj.esFlag === '10'
          obj.columnList.forEach(v => {
            v.key = this.model.esFlag ? v.propertyName : v.columnName
          })
          this.model.fields = obj.columnList
        }
      },
      resetTemplate() {
        this.$refs.templateForm && this.$refs.templateForm.clearValidate()
        this.model.templateId = ''
        this.model.templateName = ''
        this.showSavePanel = false
      },
      createTemplate() {
        this.model.templateId = ''
        this.model.templateName = ''
        this.model.templateIndex = -1
        let vos = this.$refs.rule.onSubmit()
        if (vos) {
          this.showSavePanel = true
        }
      },
      async saveTemplate() {
        let vos = this.$refs.rule.onSubmit()
        if (!vos) {
          return
        }
        let data = {
          name: this.model.templateName,
          genericId: this.model.genericId,
          columnList: this.$refs.rule.mapColumnList()
        }
        if (this.model.templateId) {
          data.id = this.model.templateId
        }
        await this.$http('system.genericSearch.template.saveOrUpdate', data)
        if (this.model.templateId && data.columnList) {
          this.templateList[this.model.templateIndex].name = this.model.templateName
          this.templateList[this.model.templateIndex].columnList = data.columnList
        } else {
          this.getTemplateList()
        }
        this.resetTemplate()
        this.$message.success('保存模板成功')
      },
      validatedSaveTemplate() {
        this.$refs.templateForm.validate(valid => {
          if (!valid) {
            return false
          }
          this.saveTemplate()
        })
      },
      async getTemplateList() {
        let data = {genericId: this.model.genericId}
        this.templateList = await this.$http('system.genericSearch.template.listByGenericId', data)
      },
      removeTemplate() {

      },
      loadTemplate() {

      },
      updateTemplate() {

      },
      addRule() {

      },
      addRuleEvent(e) {
        if (e.target.className && e.target.className.includes('hf-table__body-wrapper')) {
          this.addRule()
        }
      },
      onClose() {
        document.removeEventListener('keydown', this.handleKeydown)
        this.$refs.rule.$el.removeEventListener('click', this.addRuleEvent)
        this.show = false
        this.$emit('close')
      },
      onOpen() {
        this.model.templateId = ''
        this.model.templateName = ''
        this.model.templateIndex = -1
        this.$nextTick(_ => {
          if (this.model.genericId) {
            this.$refs.rule.setGenericSearchFields(this.model.fields, this.model.esFlag)
            this.getTemplateList()
          }
          this.$refs.rule.setGenericFields(this.ruleOption)
          this.$refs.rule.$el.addEventListener('click', this.addRuleEvent)
        })
        // 通用查询弹框可能是在弹框里使用的，这种情况下hotkey查找dom的策略已失效
        document.addEventListener('keydown', this.handleKeydown)
      },
      onQuery() {
        let vos = this.$refs.rule.onSubmit()
        if (!vos) {
          return
        }
        let data = {
          elasticsearchFlag: this.model.esFlag ? 'Y' : 'N',
          generic: {vos}
        }
        this.$emit('submit', data)
        this.show = false
      },
      initProps() {
        if (!this.module.method || !this.module.searchCode) {
          let msg = 'custom-filter 组件配置错误：method, searchCode 为必选项'
          this.$alert(msg, '提示', {type: 'error', showClose: false})
          return
        }
        if (this.module.sectionOption) {
          this.module.sectionOption.$row = `$${this.module.sectionOption.row}`
        }
        if (!this.module.module) {
          this.module.module = this.module.method
        }
      },
      handleKeydown(e) {
        if (!this.showSavePanel && this.$el) {
          keydownEvent(e, this.$el)
        }
      },
      openTemplate() {
        document.addEventListener('keydown', this.handleKeydownTemplate)
      },
      closeTemplate() {
        document.removeEventListener('keydown', this.handleKeydownTemplate)
        this.resetTemplate()
      },
      handleKeydownTemplate(e) {
        keydownEvent(e, this.$refs.templateDialog && this.$refs.templateDialog.$el)
      }
    }
  }
</script>

<style lang="less">
  .custom-filter {
    .hf-dialog__body {
      padding: 0;
      overflow-y: hidden;
    }

    .main-wrap {
      display: flex;

      &_left {
        width: 180px;
        border-right: 1px solid #dcdbe2;

        .title {
          padding: 8px 16px;
          color: #9d9d9d;
        }

        .tpl-list {
          padding: 0 16px;
          overflow: auto;

          .tpl {
            height: 32px;
            display: flex;
            align-items: center;

            .name {
              flex: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow-x: hidden;
              max-width: 120px;
              cursor: pointer;
              font-size: 12px;
            }

            .hf-icon-edit {
              color: #9571e9;
              cursor: pointer;
            }

            .hf-icon-delete {
              cursor: pointer;
            }

            .is-active {
              color: #ff9300;
            }
          }
        }

        .hf-scrollbar {
          height: 368px;
        }

        .hf-scrollbar__wrap {
          height: 100%;
          overflow: auto;
        }

        .hf-scrollbar__bar.is-horizontal {
          display: none;
        }
      }

      &_right {
        width: 820px;
      }
    }

    &-template {
      .hf-dialog__body {
        padding-bottom: 1px;
      }
    }
  }
</style>

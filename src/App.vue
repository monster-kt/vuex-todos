<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="changeHandle"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="cbStatusChange(item.id, $event)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group @click.native="changeList">
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'"
            >全部</a-button
          >
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'"
            >未完成</a-button
          >
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['infoList', 'unDoneLength'])
  },
  methods: {
    changeHandle(e) {
      this.$store.commit('setInput', e.target.value)
    },
    // 向列表中新增 item
    addItem() {
      if (this.inputValue.trim().length <= 0) {
        // 警告信息弹窗
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    // 根据 id 删除事项
    removeItem(data) {
      this.$store.commit('removeItem', data)
    },
    // 复选框状态改变
    cbStatusChange(id, e) {
      const param = {
        id,
        val: e.target.checked
      }
      this.$store.commit('cbchenge', param)
    },
    // 清除已完成
    clean() {
      this.$store.commit('cleanDone')
    },
    changeList(e) {
      const text = e.target.innerText
      if (text === '未完成') {
        this.$store.commit('changeViewkey', 'undone')
      } else if (text === '已完成') {
        this.$store.commit('changeViewkey', 'done')
      } else {
        this.$store.commit('changeViewkey', 'all')
      }
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

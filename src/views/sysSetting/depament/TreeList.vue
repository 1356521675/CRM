<template>
  <a-card :bordered="false"
          style="height:100%">
    <div class="titlebox">
      <h3>员工与部门管理</h3>
    </div>
    <a-row>
      <a-col :span="5"
             class="row-left"
             style="height:100%">
        <s-tree style="height:100%"
                v-if="reftree"
                ref="tabletree"
                :dataSource="orgTree"
                :openKeys.sync="openKeys"
                :search="true"
                @editOrg="editOrgName"
                @click="handleClick"
                @add="handleAdd"
                @edit="handleEdit"
                @del="handleDel"
                @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19"
             class="row-right"
             style="height:100%">
        <div class="tabs">
          <div class="top">
            <a-row :gutter="18"
                   v-if="!showOperate">
              <a-col :xs="24"
                     :sm="24"
                     :lg="6"
                     :xl="6"
                     :xxl="6">
                <a-input-search placeholder="员工姓名"
                                style="width: 100%"
                                v-model="username"
                                @search="handleSearch" />
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="6"
                     :xl="5"
                     :xxl="5">
                <!-- <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                            placeholder="请选择状态"
                          :value="selectedItems"
                          @change="selectChange"
                          style="width: 100%">
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select> -->
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="{span:4,offset:8}"
                     :xl="{span:4,offset:9}"
                     :xxl="{span:4,offset:9}"
                     :style="{ textAlign: 'right' }">
                <a-button class="btn-primary"
                          @click="newStaff">新建员工</a-button>
              </a-col>
            </a-row>
            <a-row v-else
                   class="operatebox">
              <a-col span="24">
                <span>
                  已选中
                  <span class="topword">{{selectedRowKeys.length}}</span>项
                </span>
                <a href="javascript:;"
                   v-if="selectedRowKeys.length<2"
                   @click="editStaff(selectedRows)">
                  <a-icon type="edit" />编辑
                </a>
                <a href="javascript:;"
                   v-if="selectedRowKeys.length<2"
                   @click="delStaff">
                  <a-icon type="pause-circle" />删除
                </a>
                <a href="javascript:;"
                   v-if="selectedRowKeys.length<2"
                   @click="moveDep(selectedRows)">
                  <a-icon type="reload" />部门转移
                </a>
                <a href="javascript:;"
                  @click="addRoleMeb(selectedRows)">
                  <a-icon type="user"/>角色分配
                </a>
                <a href="javascript:;"
                v-if="selectedRowKeys.length<2"
                  @click="rePwd(selectedRows)">
                  <a-icon type="unlock"/>重置密码
                </a>
              </a-col>
            </a-row>
          </div>
          <s-table style="height:calc(100% - 53px);background-color:#fff;overflow-y: scroll"
                   ref="table"
                   size="default"
                   rowKey="user_id"
                   :columns="columns"
                   :data="loadData"
                   :alert="options.alert"
                   :scroll="{x:780}"
                   :rowSelection="options.rowSelection"></s-table>
        </div>
      </a-col>
    </a-row>

    <org-modal ref="modal"
               :treedata="orgTree"
               @ok="handleSaveOk"
               @close="handleSaveClose" />
    <edit-dp ref="editModal"
             :dpdata="sdpList"
             :treedata="orgTree"
             @ok="handleSaveOk"
             @close="handleSaveClose" />
    <add-staff :dpdata="sdpList"
               ref="addStaffModal"
               @ok="addStaffSaveOk" />
    <move-dp :dpdata="sdpList"
             ref="movedp"
             @ok="movedpSaveOk" />
    <edit-orgname ref="editOrg"
                  @ok="editOrgSaveOk"
                  @close="handleSaveClose" />
    <addRole-member ref="addRolemember"
                  @ok="addMemberOk(true)"
                  @close="addMemberOk(false)" />              
  </a-card>
</template>

<script>
import { bxAnaalyse, SIndex, SNewallocation, SAllocation, SNew, yd_server } from '@/core/icons'
import STree from '@/components/Tree/Tree'
import EditDp from './modules/EditDp'
import STable from '@/components/table/'
import OrgModal from './modules/OrgModal'
import editOrgname from './modules/editOrg'
import AddStaff from './modules/AddStaff'
import MoveDp from './modules/movedp'
import AddRoleMember from './modules/AddRoleMember'
import { getOrg, editOrg, getServiceList, getUserList, delNewUser, getDepartment, delDepartment, getDpUser, getUserSearch, putUserResetpwd } from '@/api/manage'
let treeData = [
  {
    department_name: '某某公司',
    department_id: '0',
    parent_id: '',
    group: true,
    children: []
  }
]
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal,
    EditDp,
    AddStaff,
    MoveDp,
    editOrgname,
    AddRoleMember
  },
  data () {
    return {
      iconlist: {
        SIndex
      },
      reftree: true,
      openKeys: [],
      orgTree: [],
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {},
      selectedItems: [],
      showOperate: false,
      // 部门id
      dpId: '',
      // 表头
      columns: [
        {
          title: '姓名',
          dataIndex: 'user_name',
        },
        {
          title: '部门',
          dataIndex: 'department.name',
        },
        {
          title: '角色',
          dataIndex: 'role_name',
        },
        {
          title: '账号/手机号',
          dataIndex: 'phone',
          needTotal: true,
        },
        {
          title: '企业QQ',
          dataIndex: 'firm_qq',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // this.$refs.table.clearSelected()
        if (this.isSearch) {
          return getUserSearch(Object.assign(parameter, { keywords: this.username })).then(res => {
            if (res.code == 200) {
              return res.data
            } else {
              return { data: [] }
            }
          }).catch(err => {
            this.isSearch = false
            return { data: [] }
          })
        } else {
          if (!this.dpId) {
            return getUserList(Object.assign(parameter)).then(res => {
              return res.data
            }).catch(err => {
              return { data: [] }
            })
          } else {
            return getDpUser(this.dpId).then(res => {
              return res
            }).catch(err => {
              return { data: [] }
            })
          }
        }
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      dpList: [],
      sdpList: [],
      isSearch: false,
      username: ''
    }
  },
  created () {
    this.getDep()
  },
  computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  methods: {
    addRoleMeb(selectedRows){
      this.$refs.addRolemember.add(selectedRows)
    },
    addMemberOk(clear){
      if(clear){
        this.$refs.table.clearSelected()
      }
    },
    rePwd(){
      const _this= this
      const uId = _this.selectedRows[0].user_id
      const name = _this.selectedRows[0].user_name
      this.$confirm({
        title: '重置密码',
        content: '确定要重置  ' + name + '  密码?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          putUserResetpwd(uId).then(res=>{
            if(res.code== 200){
              _this.$notification.success({
                  message: '提示',
                  description: '密码重置成功,新密码:'+res.data.pwd,
                  duration: 20
                })
            }else{
              _this.$message.warning(res.msg)
            }
          }).catch(err=>{

          })
          
        },
        onCancel () {
          
        }
      })
    },
    handleSearch () {
      if (this.username) {
        this.isSearch = true
        this.$refs.table.refresh(true)
      } else {
        this.isSearch = false
        this.$refs.table.refresh(true)
      }
    },
    handleReset () {
      this.form.resetFields()
    },
    getDep () {
      getDepartment().then(res => {
        treeData[0].children = res.data
        let parentsList = [
          {
            parent_id: 0,
            parent_name: '某某公司'
          }
        ]
        let copyList = []
        function one (item) {
          if (item.children.length == 0) {
            copyList.push({ department_id: item.department_id, department_name: item.department_name ,parent_id: item.parent_id})
          } else {
            copyList.push({ department_id: item.department_id, department_name: item.department_name ,parent_id: item.parent_id})
            item.children.forEach(function (list) {
              one(list)
            })
          }
        }
        let allMeunList=[]
        res.data.forEach(function (item) {
          one(item)
          allMeunList.push({ department_id: item.department_id, department_name: item.department_name,children:[{ department_id: item.department_id, department_name: item.department_name }] })
        })
        
        copyList.forEach(item => {
          allMeunList.forEach(child => {
            if (child.department_id==item.parent_id) {
              child.children.push({
                department_id: item.department_id,
                department_name: item.department_name,
              })
            } else {
              child.children.forEach((list,index) => {
                if (item.parent_id == list.department_id) {
                  child.children.push( {
                    department_id: item.department_id,
                    department_name: item.department_name,
                  })
                }
              })
            }
          })
        })
        this.sdpList=allMeunList,
        this.dpList = copyList
        this.orgTree = treeData
      })


      return
      getOrg().then(response => {
        if (response.code == 200) {
          getDepartment().then(res => {
            response.data.forEach(item => {
              item.parent_id = '',
                item.department_id = '0',
                item.group = true,
                item.department_name = item.org_name,
                item.children = []
              if (item.org_id == 3) {
                item.children = res.data
              }
            })
            let orgdep = []
            response.data.forEach((item, index) => {
              if (item.children.length != 0) {
                orgdep.push(item)
              }
            })
            treeData = orgdep
            
            // treeData[0].children = res.data
            let parentsList = [
              {
                parent_id: 0,
                parent_name: '某某公司'
              }
            ]
            let copyList = []
            function one (item) {
              if (item.children.length == 0) {
                copyList.push({ department_id: item.department_id, department_name: item.department_name })
              } else {
                copyList.push({ department_id: item.department_id, department_name: item.department_name })
                item.children.forEach(function (list) {
                  one(list)
                })
              }
            }
            res.data.forEach(function (item) {
              one(item)
            })
            
            this.dpList = copyList
            this.orgTree = treeData
          })
        }
      })

    },
    handleClick (e) {
      this.queryParam = {
        key: e.key
      }
      this.dpId = e.key
      this.$refs.table.refresh(true)
      this.$refs.table.clearSelected()
    },
    handleAdd (item) {
      // 添加部门
      this.$refs.modal.add(item)
    },
    handleEdit (item) {
      // 编辑已添加部门
      this.$refs.editModal.edit(item)
    },
    handleDel (id, name) {
      let _this = this
      this.$confirm({
        title: '移除部门',
        content: '确定要移除' + name + '吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // 移除部门
          delDepartment({ accessToken: _this.$store.getters.token }, id).then(res => {
            _this.handleSaveOk()
          })
        },
        onCancel () {
          
        }
      })
    },
    handleTitleClick (item, e) {
      if (item == 'alluser') {
        this.dpId = ''
        this.$refs.table.refresh(true)
        this.$refs.table.clearSelected()
      } else {
        this.dpId = item.department_id
        this.$refs.table.refresh(true)
        this.$refs.table.clearSelected()
      }
    },
    titleClick (e) {
      
    },
    handleSaveOk () {
      let _this = this
      getDepartment({ accessToken: _this.$store.getters.token }).then(res => {
        treeData[0].children = res.data
        _this.orgTree = treeData
        _this.reftree = false
        window.setTimeout(function () {
          _this.reftree = true
        }, 100)
      })
    },
    handleSaveClose () { },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      if (this.selectedRowKeys.length > 0) {
        this.showOperate = true
      } else {
        this.showOperate = false
      }
    },
    openChange (checked) {
      
    },
    selectChange () { },
    newStaff () {
      this.$refs.addStaffModal.add()
    },
    editStaff (row) {
      this.$refs.addStaffModal.edit(row, this.dpId)
    },
    moveDep (row) {
      this.$refs.movedp.edit(row, this.dpId)
    },
    addStaffSaveOk () {
      this.$refs.table.refresh()
      this.$refs.table.clearSelected()
    },
    movedpSaveOk () {
      this.$refs.table.refresh()
      this.$refs.table.clearSelected()
    },
    delStaff () {
      const _this = this
      const uId = _this.selectedRows[0].user_id
      const name = _this.selectedRows[0].user_name
      this.$confirm({
        title: '删除员工',
        content: '确定要删除' + name + '吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          delNewUser(uId)
            .then(res => {
              _this.$message.success('保存成功')
              _this.$refs.table.refresh(true)
              _this.$refs.table.clearSelected()
            })
            .catch(err => {
              // Do something
            })
            .finally(() => { })
        },
        onCancel () {
          
        }
      })
    },
    editOrgName (item) {
      this.$refs.editOrg.add(item)
    },
    editOrgSaveOk () {
      this.getDep()
    }
  }
}
</script>

<style lang="less">
.ant-card {
  height: 100%;
  background-color: #f0f2f5;
  .ant-card-body {
    height: 100%;
    .titlebox {
      line-height: 34px;
      h3 {
        margin-bottom: 0;
      }
    }
    .ant-row {
      height: calc(100% - 34px);
      .row-left {
        background-color: #fff;
        border: 1px solid #dedede;
        height: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .row-right {
        box-sizing: border-box;
        padding-left: 18px;
        height: 100%;
        .tabs {
          height: 100%;
          background-color: #fff;
          border: 1px solid #dedede;
          position: relative;
          .ant-table-wrapper {
            height: 100%;
            // overflow-y: scroll;
            position: relative;
            .ant-table-thead {
              // position: fixed;
              // width: 100%;
              // background-color: #fafafa;
            }
            .ant-table-pagination.ant-pagination {
              margin: 8px 0;
            }
          }
        }
      }
      .tree-wrapper {
        background-color: #fff;
        .custom-tree {
          box-sizing: border-box;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
  }
}

.top {
  padding: 10px 24px;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  button {
    margin-top: 0;
  }
  .operatebox {
    span,
    a {
      display: inline-block;
      line-height: 32px;
      text-decoration: none;
      color: #666;
      margin-right: 20px;
      .anticon {
        color: #999;
        margin-right: 2px;
      }
    }
    .topword {
      display: inline;
      color: #71b6f9;
      margin-right: 0;
    }
  }
}

.custom-tree {
  border: 0 none;
  .ant-menu-item-group-title {
    position: relative;
    color: #333;
    font-weight: 700;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }

  .ant-menu-submenu-title {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  .ant-menu-submenu-title .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 30px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
</style>

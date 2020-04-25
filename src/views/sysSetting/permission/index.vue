<template>
  <a-card :bordered="false" style="height:100%">
    <div class="titlebox">
      <h3>角色权限控制</h3>
    </div>
    <a-row>
      <a-col :span="4" class="row-left" style="height:100%;overflow-y: scroll">
        <a-button
          class="btn-success"
          size="large"
          block
          style="width:90%;margin-bottom:8px"
          @click="handleAdd"
        >新建角色</a-button>
        <a-menu style="width: 100%" :defaultSelectedKeys="[1]" mode="inline" @click="menuClick">
          <template v-for="item in roleList">
            <a-menu-item v-if="!item.children" :key="item.role_id">
              <span>{{item.role_name}}</span>
              <a-dropdown>
                <a class="btn">
                  <a-icon type="ellipsis" />
                </a>
                <a-menu slot="overlay" @click="menuItm=>handleItem(menuItm,item)">
                  <a-menu-item key="0">
                    <span>编辑</span>
                  </a-menu-item>
                  <a-menu-item key="2">删除</a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-menu-item>
          </template>
        </a-menu>
      </a-col>
      <a-col :span="20" class="row-right" style="height:100%">
        <a-tabs defaultActiveKey="1" @change="callback" :animated="false">
          <a-tab-pane style="overflow-y: scroll" tab="角色员工" key="1">
            <div class="top">
              <a-button class="btn-primary" @click="addMember(selfId,selfName)">关联员工</a-button>
            </div>
            <div class="bottom left-bottom">
              <s-table
                style="height:100%;background-color:#fff;"
                ref="table"
                size="default"
                rowKey="user_id"
                :columns="columns"
                :data="loadData"
                :alert="options.alert"
                :rowSelection="options.rowSelection"
              >
                <span slot="action" slot-scope="text, record">
                  <template>
                    <a-button class="btn-secondary" size="small" @click="delMember(record)">删除</a-button>
                  </template>
                </span>
              </s-table>
            </div>
          </a-tab-pane>
          <a-tab-pane style="overflow-y: scroll" tab="角色权限" key="2" forceRender>
            <div class="top">
              <span class="left">权限管理</span>
              <a-button class="btn-primary" @click="editSelfRule(selfId)">保存</a-button>
            </div>
            <div class="bottom">
              <div :style="{  }">
                <a-checkbox
                  :indeterminate="indeterminate"
                  @change="onCheckedAll"
                  :checked="checkAll"
                >全选</a-checkbox>
              </div>
              <br />
              <div class="rule-list" v-for="(item, index) in ruleGroup" :key="item.group_id">
                <a-checkbox
                  :indeterminate="indeterArr[index]"
                  @change="onCheckAllChange(index)"
                  :checked="checkAllArr[index]"
                >{{item.group_name}}</a-checkbox>
                <div class="rule-list-body">
                  <a-checkbox-group
                    :options="item.children"
                    v-model="checkedList"
                    @change="onChange(index)"
                  />
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane style="overflow-y: scroll" tab="角色页面" key="3" forceRender>
            <div class="top">
              <span class="left">页面管理</span>
              <!-- <a-button class="menudelbtn"
              @click="deleteRoleMenu(selfId)">清空角色页面</a-button>-->
              <a-button class="btn-primary" @click="addRoleMenu(selfId)">保存</a-button>
            </div>
            <div class="bottom">
              <!-- <div :style="{  }">
                <a-checkbox :indeterminate="indeterminate"
                            @change="onmenuCheckedAll"
                            :checked="menuCheckAll">全选</a-checkbox>
              </div>-->
              <br />
              <div class="rule-list" v-for="(item, index) in allMeunList" :key="item.id">
                <a-checkbox
                  :indeterminate="menuIndeterArr[index]"
                  @change="onmenuCheckAllChange(index)"
                  :checked="menuCheckAllArr[index]"
                >{{item.name}}</a-checkbox>
                <div class="rule-list-body rule-list-bodys">
                  <a-checkbox-group
                    :options="item.children"
                    v-model="menuCheckedList"
                    @change="onMeunChange(index)"
                  />
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane style="overflow-y: scroll" tab="角色部门" key="4" forceRender>
            <div class="top">
              <span class="left">角色部门管理</span>
              <!-- <a-button class="menudelbtn" >清空角色部门</a-button> -->
              <a-button class="btn-primary" @click="addRoleDep(selfId)">保存</a-button>
            </div>
            <div class="bottom">
              <div :style="{  }">
                <!-- <a-checkbox
                  :indeterminate="indeterminate"
                  @change="onDepCheckedAll"
                  :checked="depCheckAll"
                >全选</a-checkbox> -->
              </div>
              <br />
              <div class="rule-list" v-for="(item, index) in departmentList" :key="item.id">
                <a-checkbox
                  :indeterminate="depIndeterArr[index]"
                  @change="onDepCheckAllChange(index)"
                  :checked="depCheckAllArr[index]"
                >{{item.name}}</a-checkbox>
                <div class="rule-list-body">
                  <a-checkbox-group
                    :options="item.children"
                    v-model="depCheckedList"
                    @change="onDepChange(index)"
                  />
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <add-role ref="addRole" @ok="handleSaveOk" @close="handleSaveClose" />
    <edit-role ref="editRole" @ok="handleSaveOk" @close="handleSaveClose" />
    <add-roleMember ref="addRoleMember" :roleuser="roleUser" @ok="roleMemberSaveOk" />
    <edit-roleMember ref="editRoleMember" @ok="roleMemberSaveOk" />
  </a-card>
</template>

<script>
import AddRole from "./modules/AddRole";
import EditRole from "./modules/EditRole";
import AddRoleMember from "./modules/AddRoleMember";
import EditRoleMember from "./modules/EditRoleMember";
import STable from "@/components/table/";
import {
  getUserList,
  getRuleList,
  getRoleList,
  getRuleGroup,
  addRoleList,
  editItemRole,
  delRole,
  getRoleRuleList,
  getRoleRules,
  addRoleRules,
  editRoleRules,
  delRoleRules,
  getRoleUser,
  delOneRoleUser,
  getMenu,
  postRoleMenu,
  getRoleMenuById,
  putRoleMenuById,
  delRoleMenu,
  getDepartment,
  getSelfRoleDep,
  putRoleDep
} from "@/api/manage";
export default {
  name: "RuleList",
  components: {
    STable,
    AddRole,
    EditRole,
    AddRoleMember,
    EditRoleMember
  },
  data() {
    return {
      indeterminate: false,
      checkAll: false,
      checkedList: [],
      indeterArr: [],
      checkAllArr: [],
      plainOptions: [],
      roleList: [],
      ruleList: [],
      allRullId: [],
      roleUser: [],
      nub: [],
      selfRule: [],
      ruleGroup: [],
      selfId: "1",
      selfName: "",
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: "登录名",
          dataIndex: "user_name",
          width: "20%"
        },
        {
          title: "昵称",
          dataIndex: "nick_name",
          width: "20%"
        },
        {
          title: "添加时间",
          dataIndex: "create_time",
          width: "20%"
        },
        {
          title: "手机号",
          dataIndex: "phone",
          width: "20%"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: "20%"
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleUser(this.selfId)
          .then(res => {
            this.roleUser = res.data;
            return res;
          })
          .catch(err => {
            this.roleUser = [];
            return { data: [] };
          });
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: false,
        rowSelection: null
      },
      optionAlertShow: false,
      allMeunList: [],
      menuIndeterArr: [],
      menuCheckAllArr: [],
      menuCheckAll: false,
      menuCheckedList: [],
      allMeunId: [],
      hasMenuList: [],
      departmentList: [],
      depIndeterArr: [],
      depCheckAllArr: [],
      depCheckAll: false,
      depCheckedList: [],
      allDepId: [],
      hasdepList: [],
      allDepChild: [],
      allMenuChild: []
    };
  },
  created() {
    this.getRoles();
    this.getMenuList();
    this.getAllDepartment();
  },
  methods: {
    getAllDepartment() {
      let _this= this
      this.allDepChild= []
      this.departmentList = [];
      getDepartment().then(res => {
        function one(item, copyList, pid) {
          if (item.children.length == 0) {
            copyList.push({
              value: item.department_id,
              label: item.department_name,
              pid: pid
            });
            _this.allDepChild.push({
              value: item.department_id,
              label: item.department_name,
              pid: pid
            })
          } else {
            _this.allDepChild.push({
              value: item.department_id,
              label: item.department_name,
              pid: pid
            })
            copyList.push({
              value: item.department_id,
              label: item.department_name,
              pid: pid
            });
            item.children.forEach(function(list) {
              one(list, copyList, pid);
            });
          }
        }
        res.data.forEach(function(item) {
          if (item.children.length) {
            item.childs = [];
            one(item, item.childs, item.department_id);
          }else{
            item.childs = [{
              pid: item.department_id,
              value: item.department_id,
              label: item.department_name,
            }]
            _this.allDepChild.push({
              pid: item.department_id,
              value: item.department_id,
              label: item.department_name,
            })
          }
        });
        res.data.forEach(item => {
          let dtext= item.childs ? '----全部': ''
          this.departmentList.push({
            id: item.department_id,
            name: item.department_name + dtext,
            children: item.childs
          });
        });
      });
    },
    getMenuList() {
      getMenu()
        .then(res => {
          this.allMenuChild= []
          res.data.forEach(item => {
            this.allMeunId.push(item.id);
            if (item.p_id == 0) {
              this.menuIndeterArr.push(false);
              this.menuCheckAllArr.push(false);
              this.allMeunList.push({
                id: item.id,
                name: item.menu_name,
                children: [
                  {
                    value: item.id,
                    label: item.menu_name
                  }
                ]
              });
            }
          });
          res.data.forEach(item => {
            this.allMeunList.forEach(child => {
              if (item.p_id == child.id) {
                child.children.push({
                  value: item.id,
                  label: item.menu_name
                });
              } else {
                child.children.forEach((list, index) => {
                  if (item.p_id == list.value) {
                    child.children.splice(index + 1, 0, {
                      value: item.id,
                      label: item.menu_name
                    });
                  }
                });
              }
            });
          });
          this.allMeunList.forEach(list=>{
            if(list.children.length){
              list.children.forEach(child=>{
                this.allMenuChild.push({
                  id:child.value,
                  p_id : list.id
                })
              })
            }
          })
        })
        .catch(err => {});
    },
    getRule() {
      getRuleList().then(res => {
        this.ruleList = res.data;
        res.data.forEach(item => {
          this.allRullId.push(item.rule_id);
          this.ruleGroup.forEach(child => {
            if (item.group_id == child.group_id) {
              child.children.push({
                label: item.rule_name,
                value: item.rule_id
              });
            }
          });
        });
      });
    },
    getRuleGroups() {
      getRuleGroup().then(res => {
        res.data.forEach(item => {
          this.ruleGroup.push({
            group_id: item.group_id,
            group_name: item.group_name,
            children: []
          });
        });
        this.ruleGroup.forEach(item => {
          this.indeterArr.push(false);
          this.checkAllArr.push(false);
          this.nub.push({ number: 0 });
        });
        // this.selectiveState()
        this.getRule();
        this.getSelfRule(this.roleList[0].role_id);
      });
    },
    selectiveState() {
      // 判断权限全选状态
      this.nub.forEach((item, index) => {
        item.number = 0;
        this.checkAllArr.splice(index, 1, false);
        this.indeterArr.splice(index, 1, false);
      });
      for (var i = 0; i < this.ruleGroup.length; i++) {
        this.ruleGroup[i].children.forEach(list => {
          if (this.checkedList.indexOf(list.value) != -1) {
            this.nub[i].number++;
            this.indeterArr.splice(i, 1, true);
          }
        });
        if (
          (this.ruleGroup[i].children.length == this.nub[i].number) &
          (this.nub[i].number != 0)
        ) {
          this.checkAllArr.splice(i, 1, true);
          this.indeterArr.splice(i, 1, false);
        } else if (this.nub[i].number == 0) {
          this.checkAllArr.splice(i, 1, false);
          this.indeterArr.splice(i, 1, false);
        }
      }
      if (this.checkedList.length == this.allRullId.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    getRoles() {
      getRoleList().then(res => {
        this.roleList = res.data;
        this.getRuleGroups();
      });
    },
    getRoleRule() {
      getRoleRuleList().then(res => {});
    },
    getSelfRule(id) {
      this.selfId = id;
      this.roleList.forEach(item => {
        if (item.role_id == id) {
          this.selfName = item.role_name;
          return;
        }
      });
      this.getSelfMenu(id);
      this.getSelfRoleDep(id)
      getRoleRules(id)
        .then(res => {
          let itemStr = "";
          res.data.forEach(function(item) {
            itemStr += item.rule_id;
          });
          let arr = itemStr.split(",");
          arr.lastIndexOf("") != -1 && arr.pop();
          let arr1 = arr.map(function(item) {
            return -(-item);
          });
          this.checkedList = arr1;
          this.selfRule = this.checkedList;
          this.selectiveState();
        })
        .catch(err => {
          if (err.response.data.msg == "您查询的资源不存在") {
            this.checkedList = [];
            this.selfRule = this.checkedList;
            this.indeterminate = false;
          }
        });
    },
    getSelfMenu(id) {
      this.menuIndeterArr = [];
      this.menuCheckAllArr = [];
      this.allMeunList.forEach((child, index) => {
        this.menuIndeterArr.push(false);
        this.menuCheckAllArr.push(false);
      });
      this.menuCheckedList = [];
      this.hasMenuList = [];
      getRoleMenuById(id)
        .then(res => {
          if (res.code == 200) {
            this.hasMenuList = res.data;
            res.data.forEach(item => {
              this.menuCheckedList.push(item.menu_id);
            });
            let pidArr= [],selNum= {};
            this.allMenuChild.forEach(child=>{
              if(this.menuCheckedList.indexOf(child.id)!=-1){
                if(selNum[child.p_id]){
                  selNum[child.p_id] +=1
                }else{
                  selNum[child.p_id]= 1
                }
                if(pidArr.indexOf(child.p_id) ==-1){
                  pidArr.push(child.p_id)
                }
              }
            })
            this.allMeunList.forEach((item,index)=>{
              let myIndex= pidArr.indexOf(item.id)
              if(myIndex != -1){
                this.menuIndeterArr.splice(index, 1, true);
                if(item.children.length == selNum[item.id]){
                  this.menuIndeterArr.splice(index, 1, false);
                  this.menuCheckAllArr.splice(index, 1, true);
                }
              }
            })
          }
        })
        .catch(err => {});
    },
    getSelfRoleDep(id) {
      this.depIndeterArr = [];
      this.depCheckAllArr = [];
      this.departmentList.forEach((child, index) => {
        this.depIndeterArr.push(false);
        this.depCheckAllArr.push(false);
      });
      this.depCheckedList = [];
      this.hasDepList = [];
      getSelfRoleDep(id)
        .then(res => {
          if (res.code == 200) {
            this.hasMenuList = res.data;
            res.data.forEach(item => {
              this.depCheckedList.push(item.dep_id);
            });
            let pidArr= [],selNum= {};
            this.allDepChild.forEach(child=>{
              if(this.depCheckedList.indexOf(child.value)!=-1){
                if(selNum[child.pid]){
                  selNum[child.pid] +=1
                }else{
                  selNum[child.pid]= 1
                }
                if(pidArr.indexOf(child.pid) ==-1){
                  pidArr.push(child.pid)
                }
              }
            })
            this.departmentList.forEach((item,index)=>{
              let myIndex= pidArr.indexOf(item.id)
              if(myIndex != -1){
                this.depIndeterArr.splice(index, 1, true);
                if(item.children.length == selNum[item.id]){
                  this.depIndeterArr.splice(index, 1, false);
                  this.depCheckAllArr.splice(index, 1, true);
                }
              }
            })
          }
        })
        .catch(err => {});
    },
    editSelfRule(id) {
      let addArr = [],
        selfNewRule = "",
        opAction = "",
        _this = this;
      opAction = "edit";
      _this.checkedList.forEach(item => {
        selfNewRule += item + ",";
      });
      if (opAction == "add") {
        const parameter = {
          role_id: _this.selfId,
          rule_id: selfNewRule
        };
        addRoleRules(parameter)
          .then(res => {
            if (res.code == 200) {
              _this.$message.success("保存成功");
            } else {
              _this.$message.warning(res.msg);
            }
          })
          .catch(err => {
            // Do something
          })
          .finally(() => {});
      } else if (opAction == "edit") {
        const parameter = {
          // role_id: _this.selfId,
          rule_id: selfNewRule
        };
        editRoleRules(parameter, _this.selfId)
          .then(res => {
            if (res.code == 200) {
              _this.$message.success("保存成功");
            } else {
              if (res.msg) {
                let errMsg = res.data[0] ? res.data[0] : res.msg;
                _this.$message.warning(errMsg);
              }
            }
          })
          .catch(err => {})
          .finally(() => {});
      } else if (opAction == "del") {
        const parameter = {
          role_id: _this.selfId,
          rule_id: selfNewRule
        };
        delRoleRules(parameter, _this.selfId)
          .then(res => {
            _this.$message.success("保存成功");
          })
          .catch(err => {
            // Do something
          })
          .finally(() => {});
      }
    },
    addRoleMenu(id) {
      let menuids = this.menuCheckedList;
      // _this.checkedList.forEach(item => {
      //   selfNewRule += item + ",";
      // });
      let userCheckedList = [];
      let putData = [];
      this.menuCheckedList.forEach(mid => {
        userCheckedList.push(mid);
      });
      this.hasMenuList.forEach(item => {
        if (this.menuCheckedList.indexOf(item.menu_id) != -1) {
          let sindex = userCheckedList.indexOf(item.menu_id);
          userCheckedList.splice(sindex, 1);
          putData.push({
            id: item.id,
            role_id: this.selfId,
            menu_id: item.menu_id
          });
        }
      });
      userCheckedList.forEach(list => {
        putData.push({
          role_id: this.selfId,
          menu_id: list
        });
      });
      let parameter = JSON.stringify(putData);
      putRoleMenuById(this.selfId, { menu: parameter })
        .then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {});
    },
    addRoleDep(id) {
      let depids = this.depCheckedList;
      let userCheckedList = [];
      let putData = [];
      this.depCheckedList.forEach(mid => {
        userCheckedList.push({role_id: id, dep_id:mid});
      });
      let parameter = JSON.stringify(userCheckedList);
      putRoleDep(this.selfId, {dep: parameter})
        .then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
          }else {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          if(err.response.data && err.response.data.msg== "部门没有更新"){
            this.$message.success("保存成功");
          }
        })
        .finally(() => {});
    },
    callback(key) {},
    onChange(index) {
      const _this = this;
      let nub = 0;
      _this.ruleGroup[index].children.forEach(list => {
        if (_this.checkedList.indexOf(list.value) != -1) {
          nub++;
          _this.indeterArr.splice(index, 1, true);
        }
      });
      if (_this.ruleGroup[index].children.length == nub) {
        _this.checkAllArr.splice(index, 1, true);
        _this.indeterArr.splice(index, 1, false);
      } else if (nub == 0) {
        _this.checkAllArr.splice(index, 1, false);
        _this.indeterArr.splice(index, 1, false);
      }
      if (_this.checkedList.length == _this.allRullId.length) {
        _this.checkAll = true;
      } else {
        _this.checkAll = false;
      }
    },
    onMeunChange(index) {
      const _this = this;
      let nub = 0;
      _this.allMeunList[index].children.forEach(list => {
        if (_this.menuCheckedList.indexOf(list.value) != -1) {
          nub++;
          _this.menuIndeterArr.splice(index, 1, true);
        }
      });
      if (_this.allMeunList[index].children.length == nub) {
        _this.menuCheckAllArr.splice(index, 1, true);
        _this.menuIndeterArr.splice(index, 1, false);
      } else if (nub == 0) {
        _this.menuCheckAllArr.splice(index, 1, false);
        _this.menuIndeterArr.splice(index, 1, false);
      }
      if (_this.menuCheckedList.length == _this.allMeunId.length) {
        _this.menuCheckAll = true;
      } else {
        _this.menuCheckAll = false;
      }
    },
    onCheckAllChange(index) {
      const _this = this;
      if (!_this.checkAllArr[index] || _this.indeterArr[index]) {
        _this.checkAllArr.splice(index, 1, true);
        _this.indeterArr.splice(index, 1, false);
        _this.ruleGroup[index].children.forEach(item => {
          if (_this.checkedList.indexOf(item.value) == -1) {
            _this.checkedList.push(item.value);
          }
        });
      } else {
        _this.checkAllArr.splice(index, 1, false);
        _this.ruleGroup[index].children.forEach(item => {
          if (_this.checkedList.indexOf(item.value) != -1) {
            _this.checkedList.splice(_this.checkedList.indexOf(item.value), 1);
          }
        });
      }
      if (this.checkAll && !this.checkAllArr[index]) {
        this.checkAll = false;
        _this.checkAllArr.splice(index, 1, false);
        _this.ruleGroup[index].children.forEach(item => {
          if (_this.checkedList.indexOf(item.value) != -1) {
            _this.checkedList.splice(_this.checkedList.indexOf(item.value), 1);
          }
        });
      }
      if (_this.checkedList.length == _this.allRullId.length) {
        _this.checkAll = true;
      } else {
        _this.checkAll = false;
      }
    },
    onCheckedAll() {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.checkedList = JSON.parse(JSON.stringify(this.allRullId));
        this.nub.forEach((item, index) => {
          item.number = 3;
          this.checkAllArr.splice(index, 1, true);
          this.indeterArr.splice(index, 1, false);
        });
      } else {
        this.checkedList = [];
        this.nub.forEach((item, index) => {
          item.number = 0;
          this.checkAllArr.splice(index, 1, false);
          this.indeterArr.splice(index, 1, false);
        });
      }
    },
    onmenuCheckedAll() {
      this.menuCheckAll = !this.menuCheckAll;
      if (this.menuCheckAll) {
        this.menuCheckAllArr = JSON.parse(JSON.stringify(this.allMeunId));
        this.nub.forEach((item, index) => {
          item.number = 3;
          this.menuCheckAllArr.splice(index, 1, true);
          this.menuIndeterArr.splice(index, 1, false);
        });
      } else {
        this.menuCheckedList = [];
        this.nub.forEach((item, index) => {
          item.number = 0;
          this.menuCheckAllArr.splice(index, 1, false);
          this.menuIndeterArr.splice(index, 1, false);
        });
      }
    },
    onmenuCheckAllChange(index) {
      const _this = this;
      if (!_this.menuCheckAllArr[index] || _this.menuIndeterArr[index]) {
        _this.menuCheckAllArr.splice(index, 1, true);
        _this.menuIndeterArr.splice(index, 1, false);
        _this.allMeunList[index].children.forEach(item => {
          if (_this.menuCheckedList.indexOf(item.value) == -1) {
            _this.menuCheckedList.push(item.value);
          }
        });
      } else {
        _this.menuCheckAllArr.splice(index, 1, false);
        _this.allMeunList[index].children.forEach(item => {
          if (_this.menuCheckedList.indexOf(item.value) != -1) {
            _this.menuCheckedList.splice(
              _this.menuCheckedList.indexOf(item.value),
              1
            );
          }
        });
      }
      if (this.checkAll && !this.checkAllArr[index]) {
        this.checkAll = false;
        _this.checkAllArr.splice(index, 1, false);
        _this.ruleGroup[index].children.forEach(item => {
          if (_this.checkedList.indexOf(item.value) != -1) {
            _this.checkedList.splice(_this.checkedList.indexOf(item.value), 1);
          }
        });
      }
      if (_this.checkedList.length == _this.allRullId.length) {
        _this.checkAll = true;
      } else {
        _this.checkAll = false;
      }
    },
    handleAdd() {
      this.$refs.addRole.add();
    },
    handleSaveOk() {
      getRoleList().then(res => {
        this.roleList = res.data;
      });
    },
    handleSaveClose() {},
    handleItem(menuItm, item) {
      switch (menuItm.key) {
        case "0":
          this.$refs.editRole.add(item);
          break;
        case "1":
          this.$emit("add", item);
          break;
        case "2":
          this.handleDel(item.role_id, item.role_name);
          break;
        default:
          break;
      }
    },
    handleDel(id, name) {
      let _this = this;
      this.$confirm({
        title: "删除角色",
        content: "确定要移除" + name + "吗?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          // 移除部门
          delRole(id).then(res => {
            _this.handleSaveOk();
          });
        },
        onCancel() {
          
        }
      });
    },
    menuClick(item) {
      this.selfId = item.key;
      this.$refs.table.refresh(true);
      this.getSelfRule(item.key);
    },
    addMember(id, name) {
      this.$refs.addRoleMember.add(id, name);
    },
    roleMemberSaveOk() {
      this.$refs.table.refresh(true);
    },
    memberEdit(item) {
      // 编辑已添加部门员工
      this.$refs.editRoleMember.edit(item);
    },
    delMember(item) {
      const _this = this;
      _this.$confirm({
        title: "提示",
        content: "此操作将永久删除是否继续?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          delOneRoleUser({ user_id: item.user_id }, _this.selfId)
            .then(res => {
              if (res.code == 200) {
                _this.$refs.table.refresh(true);
              } else {
                let errMsg = res.data[0] ? res.data[0] : res.msg;
                _this.$message.warning(errMsg);
              }
            })
            .catch(err => {
              
            });
        },
        onCancel() {}
      });
    },
    deleteRoleMenu(id) {
      const _this = this;
      _this.$confirm({
        title: "提示",
        content: "确定清空角色页面?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          delRoleMenu(id)
            .then(res => {
              if (res.code == 200) {
                _this.getSelfMenu(id);
              } else {
                let errMsg = res.data[0] ? res.data[0] : res.msg;
                _this.$message.warning(errMsg);
              }
            })
            .catch(err => {
              
            });
        },
        onCancel() {}
      });
    },
    getSelfDep() {
      this.depIndeterArr = [];
      this.depCheckAllArr = [];
      this.departmentList.forEach((child, index) => {
        this.depIndeterArr.push(false);
        this.depCheckAllArr.push(false);
      });
      this.depCheckedList = [];
      this.hasDepList = [];
    },
    onDepCheckedAll() {
      this.depCheckAll = !this.depCheckAll;
      if (this.depCheckAll) {
        this.depCheckAllArr = JSON.parse(JSON.stringify(this.departmentList));
        this.nub.forEach((item, index) => {
          item.number = 3;
          this.depCheckAllArr.splice(index, 1, true);
          this.depIndeterArr.splice(index, 1, false);
        });
      } else {
        this.depCheckedList = [];
        this.nub.forEach((item, index) => {
          item.number = 0;
          this.depCheckAllArr.splice(index, 1, false);
          this.depIndeterArr.splice(index, 1, false);
        });
      }
    },
    onDepCheckAllChange(index) {
      const _this = this;
      if (!_this.depCheckAllArr[index] || _this.depIndeterArr[index]) {
        _this.depCheckAllArr.splice(index, 1, true);
        _this.depIndeterArr.splice(index, 1, false);
        _this.departmentList[index].children.forEach(item => {
          if (_this.depCheckedList.indexOf(item.value) == -1) {
            _this.depCheckedList.push(item.value);
          }
        });
      } else {
        _this.depCheckAllArr.splice(index, 1, false);
        _this.departmentList[index].children.forEach(item => {
          if (_this.depCheckedList.indexOf(item.value) != -1) {
            _this.depCheckedList.splice(
              _this.depCheckedList.indexOf(item.value),
              1
            );
          }
        });
      }
      if (this.checkAll && !this.checkAllArr[index]) {
        this.checkAll = false;
        _this.checkAllArr.splice(index, 1, false);
        _this.ruleGroup[index].children.forEach(item => {
          if (_this.checkedList.indexOf(item.value) != -1) {
            _this.checkedList.splice(_this.checkedList.indexOf(item.value), 1);
          }
        });
      }
      if (_this.checkedList.length == _this.allRullId.length) {
        _this.checkAll = true;
      } else {
        _this.checkAll = false;
      }
    },
    onDepChange(index) {
      const _this = this;
      let nub = 0;
      _this.departmentList[index].children.forEach(list => {
        if (_this.depCheckedList.indexOf(list.value) != -1) {
          nub++;
          _this.depIndeterArr.splice(index, 1, true);
        }
      });
      if (_this.departmentList[index].children.length == nub) {
        _this.depCheckAllArr.splice(index, 1, true);
        _this.depIndeterArr.splice(index, 1, false);
      } else if (nub == 0) {
        _this.depCheckAllArr.splice(index, 1, false);
        _this.depIndeterArr.splice(index, 1, false);
      }
      if (_this.depCheckedList.length == _this.allDepId.length) {
        _this.depCheckAll = true;
      } else {
        _this.depCheckAll = false;
      }
    }
  }
};
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
        text-align: center;
        background-color: #fff;
        border: 1px solid #dedede;
        height: 100%;
        box-sizing: border-box;
        padding: 10px 4px;
        .ant-menu {
          border: 0 none;
          text-align: left;
          .ant-menu-item-selected {
            background-color: #ebf3ff;
            color: #000;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              border: 0 none;
            }
          }
        }
      }
      .row-right {
        box-sizing: border-box;
        padding-left: 18px;
        .ant-tabs {
          height: 100%;
          overflow-y: scroll;
          background-color: #fff;
          border: 1px solid #dedede;
          .ant-tabs-top-bar {
            margin: 0;
          }
          .top {
            padding-bottom: 16px;
            height: 43px;
            line-height: 44px;
            padding-left: 20px;
            border-bottom: 1px dashed #dedede;
            position: relative;
            .left {
              position: absolute;
              left: 20px;
              top: 0;
            }
            .btn-primary {
              position: absolute;
              right: 20px;
              top: 5px;
            }
            .menudelbtn {
              position: absolute;
              right: 92px;
              top: 5px;
            }
          }
          .bottom {
            padding-left: 20px;
            padding-top: 18px;
            box-sizing: border-box;
            .rule-list {
              .rule-list-body {
                box-sizing: border-box;
                padding-left: 40px;
                padding-top: 12px;
                .ant-checkbox-group-item {
                  width: 200px;
                  margin-bottom: 18px;
                }
              }
              .rule-list-bodys {
                .ant-checkbox-group-item {
                  width: 260px;
                  margin-bottom: 18px;
                }
              }
            }
          }
          .left-bottom {
            padding: 0;
          }
        }
      }
    }
  }
}

.ant-menu {
  .ant-menu-item {
    position: relative;
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
}
</style>

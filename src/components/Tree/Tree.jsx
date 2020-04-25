import { Menu, Icon, Input } from 'ant-design-vue'
const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input
export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    }
  },

  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  methods: {
    refresh(){
      const list = this.dataSource.map(item => {
        return this.renderItem(item)
      })
      return (
        <div class="tree-wrapper">
          <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
            { list }
          </Menu>
        </div>
      )
    },
    handlePlus (item) {
      this.$emit('add', item)
    },
    handleTitleClick (...args) {
      this.$emit('titleClick', { args })
    },
    renderSearch () {
      return (
        <Search
          placeholder="input search text"
          style="width: 100%; margin-bottom: 1rem"
        />
      )
    },
    renderIcon (icon) {
      return icon && (<Icon type={icon} />) || null
    },
    renderMenuItem (item) {
      return (
        <Item key={item.department_id}>
          { this.renderIcon(item.icon) }
          { item.department_name }
          <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay" {...{ on: { click: menuItm => {this.handleItem(menuItm,item)}} }}>
                <a-menu-item key="0"><span>更改</span></a-menu-item>
                <a-menu-item key="1"><span>新增</span></a-menu-item>
                <a-menu-item key="2">移除</a-menu-item>
              </a-menu>
          </a-dropdown>
        </Item>
      )
    },
    renderItem (item) {
      return (item.children.length>0) ? this.renderSubItem(item, item.department_id) : this.renderMenuItem(item, item.department_id)
    },
    renderItemGroup (item) {
      const childrenItems = item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      return (
        <ItemGroup key={item.department_id}>
          <template slot="title">
            <span style="cursor:pointer;padding-right:50px;"  {...{ on: { click: () => this.userList('alluser') } }}>{ item.department_name }</span>
            <a class="btn" title="添加部门" style="width: 20px;z-index:1300" {...{ on: { click: () => this.handlePlus(item) } }}><a-icon type="plus"/></a>
            {/* <a class="btn" title="修改" style="right:34px" {...{ on: { click: () => this.editOrg(item) } }}><a-icon type="edit" /></a> */}
            {/* <a-dropdown>
              <a class="btn" style="right:40px"><a-icon type="edit" /></a>
              <a-menu slot="overlay" {...{ on: { click: () => {}} }}>
                <a-menu-item key="1"><span>更改</span></a-menu-item>
              </a-menu>
            </a-dropdown> */}
          </template>
          { childrenItems }
        </ItemGroup>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.children.length>0 && item.children.map(o => {
        return this.renderItem(o, o.key)
      })
      const title = (
        <span slot="title" style="display:block;" {...{ on: { click: ($event) => this.userList(item,$event) } }}>
          { this.renderIcon(item.icon) }
          <span>{ item.department_name }</span>
          <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay" {...{ on: { click: menuItm => {this.handleItem(menuItm,item)}} }}>
                <a-menu-item key="0"><span>更改</span></a-menu-item>
                <a-menu-item key="1"><span>新增</span></a-menu-item>
                <a-menu-item key="2">移除</a-menu-item>
              </a-menu>
          </a-dropdown>
        </span>
      )
      if (item.group) {
        return this.renderItemGroup(item)
      }
      // titleClick={this.handleTitleClick(item)}
      return (
        <SubMenu key={key}>
          { title }
          { childrenItems }
        </SubMenu>
      )
    },
    handleItem (menuItm,item) {
      switch (menuItm.key) {
        case '0':
          
          this.$emit('edit', item)
          break;
        case '1':
          
          this.$emit('add', item)
          break;
        case '2':
          
          this.$emit('del', item.department_id, item.department_name)
          break;
        default:
          break;
      }
    },
    userList (all,$event) {
      this.$emit('titleClick',all,$event);
    },
    editOrg (item) {
      this.$emit('editOrg',item);
    }
  },
  render () {
    const { dataSource, search } = this.$props
    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })
    return (
      <div class="tree-wrapper">
        {/* { search ? this.renderSearch() : null } */}
        <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </Menu>
      </div>
    )
  }
}

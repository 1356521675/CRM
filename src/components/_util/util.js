/**
 * components util
 */

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/*** 列表双击事件 ***/
export function tableDbClick(record, index){
  return {
        on: {
           dblclick: () => {
              this.cusdblclick&&this.cusdblclick(record);
              clearSelections();
          },
        }
    }
}
/*** 清除页面中选中内容 ***/
export function clearSelections(){
  if (window.getSelection) {
      // 获取选中
      var selection = window.getSelection();
      // 清除选中
      selection.removeAllRanges();
  } else if (document.selection && document.selection.empty) {
    // 兼容 IE8 以下，但 IE9+ 以上同样可用
      document.selection.empty();
      // 或使用 clear() 方法
      // document.selection.clear();
  }       
}

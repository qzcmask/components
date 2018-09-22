/**
 * Pagination
 *
 * @description It's responsible for pagination's logic, without getting involved in dom.
 * @author Mask
 */
class Pagination {
  constructor(config = {}) {
    this.currentPage = 1
    this.contents = config.contents || []
    this.perPageRecord = config.perPageRecord || 6
    this.totalPages = Math.ceil(this.contents.length / this.perPageRecord)
  }

  getPageContent(page) {
    let recordPos = (page - 1) * this.perPageRecord
    this.currentPage = page
    return this.contents.slice(recordPos, recordPos + this.perPageRecord)
  }

  getPreviousPageContent() {
    let page
    if (this.currentPage < 2) {
      page = this.currentPage
    } else {
      this.currentPage--
      page = this.currentPage
    }
    return this.getPageContent(page)
  }

  getNextPageContent() {
    let page
    if (this.currentPage >= this.totalPages) {
      page = this.totalPages
    } else {
      this.currentPage++
      page = this.currentPage
    }
    return this.getPageContent(page)
  }
}

/**
 * PaginationWithDOM
 *
 * @description It's responsible for pagination's dom structure.
 * @author Mask
 */
class PaginationWithDOM extends Pagination {
  constructor(config, callback) {
    super(config)
    this.callback = callback
    this.pageBtnNum = config.pageBtnNum || 3
    // DOM Element
    this.pageContainerId = config.pageContainerId || 'mPageItem'
    this.pageBtnPrevText = config.pagePrevText || '上一页'
    this.pageBtnNextText = config.pageNextText || '下一页'
    this.pageBtnClass = config.pageBtnClass || 'm-page-btn'
    this.pageBtnPrevClass = config.pageBtnPrevClass || 'm-page-btn-prev'
    this.pageBtnNextClass = config.pageBtnNextClass || 'm-page-btn-next'
    this.pageItemClass = config.pageItemClass || 'm-page-item-num'
    this.pageItemActiveClass = config.pageItemActiveClass || 'active'

    this._init()
  }

  _init() {
    this._buildUI()
    this._bindAction()

    let content = this.getPageContent(this.currentPage)
    // execute the customized function to render data
    this.callback.call(null, content)
  }

  _buildUI() {
    let start
    let end
    let html = ''
    let length = this.totalPages
    let middle = Math.floor(this.pageBtnNum / 2)
    let $page = document.querySelector(`#${this.pageContainerId}`)

    html += `<div class="${this.pageBtnClass} ${this.pageBtnPrevClass}" data-page="prev">${this.pageBtnPrevText}</div>`

    if (this.pageBtnNum >= length) {
      // show all page number
      start = 1
      end = length
    } else if (this.currentPage - middle < 1) {
      start = 1
      end = (start + this.pageBtnNum - 1) % length
    } else if (this.currentPage + middle > length) {
      end = length
      start = (end - this.pageBtnNum + 1) % length
    } else {
      start = this.currentPage - middle
      end = this.currentPage + middle
    }

    for (let i = start; i <= end; i++) {
      if (i === this.currentPage) {
        html += `<span class="${this.pageItemClass} ${this.pageItemActiveClass}" data-page="${i}">${i}</span>`
      } else {
        html += `<span class="${this.pageItemClass}" data-page="${i}">${i}</span>`
      }
    }
    html += `<div class="${this.pageBtnClass} ${this.pageBtnNextClass}" data-page="next">${this.pageBtnNextText}</div>`
    $page.innerHTML = html
  }

  _bindAction() {
    let $page = document.querySelector(`#${this.pageContainerId}`)
    // bind action
    $page.addEventListener('click', (e) => {
      let target = e.target
      if (target.hasAttribute('data-page')) {
        let page = target.getAttribute('data-page')
        switch (page) {
          case 'prev':
            this.getPreviousPageContent()
            break
          case 'next':
            this.getNextPageContent()
            break
          default:
            this.getPageContent(parseInt(page))
            break
        }

        let content = this.getPageContent(this.currentPage)
        // render page structure
        this._buildUI()
        this.callback.call(null, content)
      }
    })
  }
}
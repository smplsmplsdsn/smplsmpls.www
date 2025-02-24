/*
 * スクロールバーをカスタマイズする
 */
const scroll = {}

scroll.is_touch = (('ontouchstart' in window && 'ontouchend' in window) || navigator.msPointerEnabled || navigator.maxTouchPoints > 0)? true: false

scroll.eventstart = (scroll.is_touch)? 'touchstart': 'mousedown'
scroll.eventmove = (scroll.is_touch)? 'touchmove': 'mousemove'
scroll.eventend = (scroll.is_touch)? 'touchend': 'mouseup'

// 値が数字のみか判別する
scroll.isNumber = (v = '') => {
  let pattern = /^[0-9]+$/;
  return pattern.test(v);
}

(() => {
  let stopEvent = new $.Event("resizestop"),
      timer;

  let stopEventTrigger = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){$(window).trigger(stopEvent)}, 300);
  }
  $(window).on("resize", stopEventTrigger);
})();


/**
 * スクロールバーをカスタマイズする
 *
 * @param (object) elem: jQuery要素
 * @param (object) obj:
 *    (string) direction: horizontal(default) | vertical
 *    (number) padding: スクロールバーの左右もしくは上下の余白（デフォルト: 0）
 *    (string) color: バーの色 例) #ccc
 *    (string) bg: バー領域の背景色 例) #000
 *    (number) size: バーの幅もしくは高さ（最大20）
 *    (number) bg_size: バー領域の幅もしくは高さ（最大20）
 *
 * @return undefined
 */
scroll.show = (elem = '.scroll', obj = {}) => {

  const _elem = $(elem),
        _elem_outer = $('.scroll__outer', _elem),
        _elem_inner = $('.scroll__inner', _elem),
        _elem_content = $('.scroll__content', _elem)

  let _elem_scrollbar = $('.scroll__bar', _elem)


  // ガード（タッチデバイスか判別する）
  if (scroll.is_touch) {
    _elem_outer.width('').height('')
    return false
  }

  // ガード（必要な要素があるか判別する）
  if (_elem.length === 0 || _elem_outer.length === 0 || _elem_inner.length === 0 || _elem_content.length === 0) {
    return false
  }


  const direction = obj.direction || 'horizontal',
        is_horizontal = (direction === 'horizontal')? true: false,
        pos = (direction === 'horizontal')? 'left': 'top',
        css_size = (direction === 'horizontal')? 'width': 'height',
        css_size_opposition = (direction === 'horizontal')? 'height': 'width',
        css_margin = (direction === 'horizontal')? 'margin-top': 'margin-left'


  // CSS上書き
  let css_overwirte = ''

  if (obj.bg) {
    css_overwirte += elem + ' .scroll__bar::after{background:' + obj.bg + '}'
    delete obj.bg
  }

  if (obj.color) {
    css_overwirte += elem + ' .scroll__bar span::after{background:' + obj.color + '}'
    delete obj.color
  }

  if (obj.size && scroll.isNumber(obj.size)) {
    css_overwirte += elem + ' .scroll__bar span::after{' + css_size_opposition + ':' + Math.min(obj.size, 20) + 'px;' + css_margin + ': ' + (Math.min(obj.size, 20) / 2) * (-1) + 'px}'
    delete obj.size
  }

  if (obj.bg_size && scroll.isNumber(obj.size)) {
    css_overwirte += elem + ' .scroll__bar::after{' + css_size_opposition + ':' + Math.min(obj.bg_size, 20) + 'px;' + css_margin + ': ' + (Math.min(obj.bg_size, 20) / 2) * (-1) + 'px}'
    delete obj.bg_size
  }

  if (css_overwirte != '') {
    $('head').append('<style>' + css_overwirte + '</style>')
  }



  // 高さと幅を計測するために、一旦overflowを無効にする
  _elem_inner.css({overflow: 'hidden'})

  let content_width = _elem_content[0].scrollWidth,
      content_height = _elem_content[0].scrollHeight

  let inner_size = (is_horizontal)? _elem.width(): _elem.height(),
      content_size = (is_horizontal)? content_width: content_height

  const is_scroll_view = (Math.abs(inner_size - content_size) >= 1) && (content_size - inner_size > 1)


  // ガード（スクロールバーを表示する必要があるか判別する）
  if (!is_scroll_view) {

    if (_elem_scrollbar.length > 0) {
      _elem_scrollbar.hide()
    }
    return false
  }

  _elem_scrollbar.show()

  // overflowを元に戻す
  _elem_inner.css({overflow: 'auto'})


  let is_draging = false,
      start_pos = 0,
      initial_pos = 0

  let now_size = 0,
      new_size = 0,
      max_val = 0,
      bar_size_ratio = 0,
      bar_size = 0

  let is_resizing = false

  inner_size = inner_size - (obj.padding || 0)

  const dragToScroll = () => {
    let content_pos = 0

    _bar.on(scroll.eventstart, function(event) {
      is_draging = true
      content_pos = (is_horizontal)? _elem_content.position().left: _elem_content.position().top
      start_pos = (is_horizontal)? event.pageX: event.pageY
      initial_pos = Math.floor((Math.abs(content_pos) / content_size) * inner_size)
    })

    $(document).on(scroll.eventmove, function(event) {
      if (is_draging && !is_resizing) {
        let new_start_pos = (is_horizontal)? event.pageX: event.pageY,
            diff_pos = new_start_pos - start_pos,
            new_pos = initial_pos + diff_pos

        let distance_ratio = 0,
            scroll_pos = 0

        new_pos = Math.max(0, new_pos)
        new_pos = Math.min(Math.ceil(max_val), new_pos)

        distance_ratio = Math.ceil(100 * (new_pos / inner_size))

        scroll_pos = content_size * (distance_ratio / 100)

        if (distance_ratio + bar_size_ratio > 100) {
          distance_ratio = 100 - bar_size_ratio
        }

        _bar.css(pos, distance_ratio + '%')

        if (is_horizontal) {
          _elem_inner.scrollLeft(scroll_pos)
        } else {
          _elem_inner.scrollTop(scroll_pos)
        }
      }
    })

    $(document).on(scroll.eventend, function() {
      is_draging = false
    })
  }


  _elem_inner.on('scroll', () => {

    // ガード（ドラッグ中か確認する）
    if (is_draging) {
      return false
    }

    const pos_size = (is_horizontal)? _elem_content.position().left: _elem_content.position().top

    let pos_size_ratio = Math.ceil(100 * (Math.abs(pos_size) / content_size))

    if (pos_size_ratio + bar_size_ratio > 100) {
      pos_size_ratio = 100 - bar_size_ratio
    }

    _bar.css(pos, pos_size_ratio + '%')
  })


  $(window).on('resize', () => {
    is_resizing = true
  })

  $(window).on('resizestop', () => {
    const _scrollbar = $('.scroll__bar-control', _elem),
          scrollbar_size = (is_horizontal)? _scrollbar.width(): _scrollbar.height()

    new_size = (is_horizontal)? window.innerWidth: window.innerHeight

    if (now_size != new_size) {
      scroll.show(elem, obj)

      if (_scrollbar.length > 0) {
        max_val = inner_size - scrollbar_size
      }

      is_resizing = false
      now_size = new_size
    }
  })


  if (_elem_scrollbar.length === 0) {
    _elem.append(`
      <div class="scroll__bar scroll__bar--${direction}">
        <span class="scroll__bar-control"></span>
      </div>
    `)

    _elem_scrollbar = $('.scroll__bar', _elem)

    if (obj.padding) {
      _elem_scrollbar
        .css(css_size, 'calc(100% - ' + obj.padding + 'px)')
        .css(pos, obj.padding / 2 + 'px')
    }
  }

  const _bar = $('.scroll__bar-control', _elem)

  // ブラウザのスクロールバーを非表示にする
  if (is_horizontal) {
    _elem_outer.height(content_height)
    _elem_inner.height(content_height + 30)
  } else {
    _elem_outer.width(content_width)
    _elem_inner.width(content_width + 30)
  }

  bar_size_ratio = Math.ceil(100 * (inner_size / content_size))

  if (is_horizontal) {
    _bar.width(bar_size_ratio + '%')
    bar_size = _bar.width()
  } else {
    _bar.height(bar_size_ratio + '%')
    bar_size = _bar.height()
  }

  // スクロールバーの設定済みか判別する
  if (!max_val) {
    max_val = inner_size - bar_size
    dragToScroll()
  }
}

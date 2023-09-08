goog.provide("goog.positioning");
goog.provide("goog.positioning.Corner");
goog.provide("goog.positioning.CornerBit");
goog.provide("goog.positioning.Overflow");
goog.provide("goog.positioning.OverflowStatus");
goog.require("goog.asserts");
goog.require("goog.dom");
goog.require("goog.dom.TagName");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Rect");
goog.require("goog.math.Size");
goog.require("goog.style");
goog.require("goog.style.bidi");
goog.requireType("goog.math.Box");
goog.positioning.CornerBit = {BOTTOM:1, CENTER:2, RIGHT:4, FLIP_RTL:8};
goog.positioning.Corner = {TOP_LEFT:0, TOP_RIGHT:goog.positioning.CornerBit.RIGHT, BOTTOM_LEFT:goog.positioning.CornerBit.BOTTOM, BOTTOM_RIGHT:goog.positioning.CornerBit.BOTTOM | goog.positioning.CornerBit.RIGHT, TOP_START:goog.positioning.CornerBit.FLIP_RTL, TOP_END:goog.positioning.CornerBit.FLIP_RTL | goog.positioning.CornerBit.RIGHT, BOTTOM_START:goog.positioning.CornerBit.BOTTOM | goog.positioning.CornerBit.FLIP_RTL, BOTTOM_END:goog.positioning.CornerBit.BOTTOM | goog.positioning.CornerBit.RIGHT | 
goog.positioning.CornerBit.FLIP_RTL, TOP_CENTER:goog.positioning.CornerBit.CENTER, BOTTOM_CENTER:goog.positioning.CornerBit.BOTTOM | goog.positioning.CornerBit.CENTER};
goog.positioning.Overflow = {IGNORE:0, ADJUST_X:1, FAIL_X:2, ADJUST_Y:4, FAIL_Y:8, RESIZE_WIDTH:16, RESIZE_HEIGHT:32, ADJUST_X_EXCEPT_OFFSCREEN:64 | 1, ADJUST_Y_EXCEPT_OFFSCREEN:128 | 4};
goog.positioning.OverflowStatus = {NONE:0, ADJUSTED_X:1, ADJUSTED_Y:2, WIDTH_ADJUSTED:4, HEIGHT_ADJUSTED:8, FAILED_LEFT:16, FAILED_RIGHT:32, FAILED_TOP:64, FAILED_BOTTOM:128, FAILED_OUTSIDE_VIEWPORT:256, FAILED:16 | 32 | 64 | 128 | 256, FAILED_HORIZONTAL:16 | 32, FAILED_VERTICAL:64 | 128,};
goog.positioning.positionAtAnchor = function(anchorElement, anchorElementCorner, movableElement, movableElementCorner, opt_offset, opt_margin, opt_overflow, opt_preferredSize, opt_viewport) {
  goog.asserts.assert(movableElement);
  var movableParentTopLeft = goog.positioning.getOffsetParentPageOffset(movableElement);
  var anchorRect = goog.positioning.getVisiblePart_(anchorElement);
  goog.style.translateRectForAnotherFrame(anchorRect, goog.dom.getDomHelper(anchorElement), goog.dom.getDomHelper(movableElement));
  var corner = goog.positioning.getEffectiveCorner(anchorElement, anchorElementCorner);
  var offsetLeft = anchorRect.left;
  if (corner & goog.positioning.CornerBit.RIGHT) {
    offsetLeft += anchorRect.width;
  } else if (corner & goog.positioning.CornerBit.CENTER) {
    offsetLeft += anchorRect.width / 2;
  }
  var absolutePos = new goog.math.Coordinate(offsetLeft, anchorRect.top + (corner & goog.positioning.CornerBit.BOTTOM ? anchorRect.height : 0));
  absolutePos = goog.math.Coordinate.difference(absolutePos, movableParentTopLeft);
  if (opt_offset) {
    absolutePos.x += (corner & goog.positioning.CornerBit.RIGHT ? -1 : 1) * opt_offset.x;
    absolutePos.y += (corner & goog.positioning.CornerBit.BOTTOM ? -1 : 1) * opt_offset.y;
  }
  var viewport;
  if (opt_overflow) {
    if (opt_viewport) {
      viewport = opt_viewport;
    } else {
      viewport = goog.style.getVisibleRectForElement(movableElement);
      if (viewport) {
        viewport.top -= movableParentTopLeft.y;
        viewport.right -= movableParentTopLeft.x;
        viewport.bottom -= movableParentTopLeft.y;
        viewport.left -= movableParentTopLeft.x;
      }
    }
  }
  return goog.positioning.positionAtCoordinate(absolutePos, movableElement, movableElementCorner, opt_margin, viewport, opt_overflow, opt_preferredSize);
};
goog.positioning.getOffsetParentPageOffset = function(movableElement) {
  var movableParentTopLeft;
  var parent = movableElement.offsetParent;
  if (parent) {
    var isBody = parent.tagName == goog.dom.TagName.HTML || parent.tagName == goog.dom.TagName.BODY;
    if (!isBody || goog.style.getComputedPosition(parent) != "static") {
      movableParentTopLeft = goog.style.getPageOffset(parent);
      if (!isBody) {
        movableParentTopLeft = goog.math.Coordinate.difference(movableParentTopLeft, new goog.math.Coordinate(goog.style.bidi.getScrollLeft(parent), parent.scrollTop));
      }
    }
  }
  return movableParentTopLeft || new goog.math.Coordinate();
};
goog.positioning.getVisiblePart_ = function(el) {
  var rect = goog.style.getBounds(el);
  var visibleBox = goog.style.getVisibleRectForElement(el);
  if (visibleBox) {
    rect.intersection(goog.math.Rect.createFromBox(visibleBox));
  }
  return rect;
};
goog.positioning.positionAtCoordinate = function(absolutePos, movableElement, movableElementCorner, opt_margin, opt_viewport, opt_overflow, opt_preferredSize) {
  absolutePos = absolutePos.clone();
  var corner = goog.positioning.getEffectiveCorner(movableElement, movableElementCorner);
  var elementSize = goog.style.getSize(movableElement);
  var size = opt_preferredSize ? opt_preferredSize.clone() : elementSize.clone();
  var positionResult = goog.positioning.getPositionAtCoordinate(absolutePos, size, corner, opt_margin, opt_viewport, opt_overflow);
  if (positionResult.status & goog.positioning.OverflowStatus.FAILED) {
    return positionResult.status;
  }
  goog.style.setPosition(movableElement, positionResult.rect.getTopLeft());
  size = positionResult.rect.getSize();
  if (!goog.math.Size.equals(elementSize, size)) {
    goog.style.setBorderBoxSize(movableElement, size);
  }
  return positionResult.status;
};
goog.positioning.getPositionAtCoordinate = function(absolutePos, elementSize, elementCorner, opt_margin, opt_viewport, opt_overflow) {
  absolutePos = absolutePos.clone();
  elementSize = elementSize.clone();
  var status = goog.positioning.OverflowStatus.NONE;
  if (opt_margin || elementCorner != goog.positioning.Corner.TOP_LEFT) {
    if (elementCorner & goog.positioning.CornerBit.RIGHT) {
      absolutePos.x -= elementSize.width + (opt_margin ? opt_margin.right : 0);
    } else if (elementCorner & goog.positioning.CornerBit.CENTER) {
      absolutePos.x -= elementSize.width / 2;
    } else if (opt_margin) {
      absolutePos.x += opt_margin.left;
    }
    if (elementCorner & goog.positioning.CornerBit.BOTTOM) {
      absolutePos.y -= elementSize.height + (opt_margin ? opt_margin.bottom : 0);
    } else if (opt_margin) {
      absolutePos.y += opt_margin.top;
    }
  }
  if (opt_overflow) {
    status = opt_viewport ? goog.positioning.adjustForViewport_(absolutePos, elementSize, opt_viewport, opt_overflow) : goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
  }
  var rect = new goog.math.Rect(0, 0, 0, 0);
  rect.left = absolutePos.x;
  rect.top = absolutePos.y;
  rect.width = elementSize.width;
  rect.height = elementSize.height;
  return {rect:rect, status:status};
};
goog.positioning.adjustForViewport_ = function(pos, size, viewport, overflow) {
  var status = goog.positioning.OverflowStatus.NONE;
  var ADJUST_X_EXCEPT_OFFSCREEN = goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN;
  var ADJUST_Y_EXCEPT_OFFSCREEN = goog.positioning.Overflow.ADJUST_Y_EXCEPT_OFFSCREEN;
  if ((overflow & ADJUST_X_EXCEPT_OFFSCREEN) == ADJUST_X_EXCEPT_OFFSCREEN && (pos.x < viewport.left || pos.x >= viewport.right)) {
    overflow &= ~goog.positioning.Overflow.ADJUST_X;
  }
  if ((overflow & ADJUST_Y_EXCEPT_OFFSCREEN) == ADJUST_Y_EXCEPT_OFFSCREEN && (pos.y < viewport.top || pos.y >= viewport.bottom)) {
    overflow &= ~goog.positioning.Overflow.ADJUST_Y;
  }
  if (pos.x < viewport.left && overflow & goog.positioning.Overflow.ADJUST_X) {
    pos.x = viewport.left;
    status |= goog.positioning.OverflowStatus.ADJUSTED_X;
  }
  if (overflow & goog.positioning.Overflow.RESIZE_WIDTH) {
    var originalX = pos.x;
    if (pos.x < viewport.left) {
      pos.x = viewport.left;
      status |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED;
    }
    if (pos.x + size.width > viewport.right) {
      size.width = Math.min(viewport.right - pos.x, originalX + size.width - viewport.left);
      size.width = Math.max(size.width, 0);
      status |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED;
    }
  }
  if (pos.x + size.width > viewport.right && overflow & goog.positioning.Overflow.ADJUST_X) {
    pos.x = Math.max(viewport.right - size.width, viewport.left);
    status |= goog.positioning.OverflowStatus.ADJUSTED_X;
  }
  if (overflow & goog.positioning.Overflow.FAIL_X) {
    status |= (pos.x < viewport.left ? goog.positioning.OverflowStatus.FAILED_LEFT : 0) | (pos.x + size.width > viewport.right ? goog.positioning.OverflowStatus.FAILED_RIGHT : 0);
  }
  if (pos.y < viewport.top && overflow & goog.positioning.Overflow.ADJUST_Y) {
    pos.y = viewport.top;
    status |= goog.positioning.OverflowStatus.ADJUSTED_Y;
  }
  if (overflow & goog.positioning.Overflow.RESIZE_HEIGHT) {
    var originalY = pos.y;
    if (pos.y < viewport.top) {
      pos.y = viewport.top;
      status |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED;
    }
    if (pos.y + size.height > viewport.bottom) {
      size.height = Math.min(viewport.bottom - pos.y, originalY + size.height - viewport.top);
      size.height = Math.max(size.height, 0);
      status |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED;
    }
  }
  if (pos.y + size.height > viewport.bottom && overflow & goog.positioning.Overflow.ADJUST_Y) {
    pos.y = Math.max(viewport.bottom - size.height, viewport.top);
    status |= goog.positioning.OverflowStatus.ADJUSTED_Y;
  }
  if (overflow & goog.positioning.Overflow.FAIL_Y) {
    status |= (pos.y < viewport.top ? goog.positioning.OverflowStatus.FAILED_TOP : 0) | (pos.y + size.height > viewport.bottom ? goog.positioning.OverflowStatus.FAILED_BOTTOM : 0);
  }
  return status;
};
goog.positioning.getEffectiveCorner = function(element, corner) {
  return (corner & goog.positioning.CornerBit.FLIP_RTL && goog.style.isRightToLeft(element) ? corner ^ goog.positioning.CornerBit.RIGHT : corner) & ~goog.positioning.CornerBit.FLIP_RTL;
};
goog.positioning.flipCornerHorizontal = function(corner) {
  return corner ^ goog.positioning.CornerBit.RIGHT;
};
goog.positioning.flipCornerVertical = function(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM;
};
goog.positioning.flipCorner = function(corner) {
  return corner ^ goog.positioning.CornerBit.BOTTOM ^ goog.positioning.CornerBit.RIGHT;
};

//# sourceMappingURL=goog.positioning.positioning.js.map

goog.provide("goog.structs.Queue");
goog.require("goog.array");
goog.structs.Queue = function() {
  this.front_ = [];
  this.back_ = [];
};
goog.structs.Queue.prototype.maybeFlip_ = function() {
  if (this.front_.length === 0) {
    this.front_ = this.back_;
    this.front_.reverse();
    this.back_ = [];
  }
};
goog.structs.Queue.prototype.enqueue = function(element) {
  this.back_.push(element);
};
goog.structs.Queue.prototype.dequeue = function() {
  this.maybeFlip_();
  return this.front_.pop();
};
goog.structs.Queue.prototype.peek = function() {
  this.maybeFlip_();
  return goog.array.peek(this.front_);
};
goog.structs.Queue.prototype.getCount = function() {
  return this.front_.length + this.back_.length;
};
goog.structs.Queue.prototype.isEmpty = function() {
  return this.front_.length === 0 && this.back_.length === 0;
};
goog.structs.Queue.prototype.clear = function() {
  this.front_ = [];
  this.back_ = [];
};
goog.structs.Queue.prototype.contains = function(obj) {
  return goog.array.contains(this.front_, obj) || goog.array.contains(this.back_, obj);
};
goog.structs.Queue.prototype.remove = function(obj) {
  return goog.array.removeLast(this.front_, obj) || goog.array.remove(this.back_, obj);
};
goog.structs.Queue.prototype.getValues = function() {
  var res = [];
  for (var i = this.front_.length - 1; i >= 0; --i) {
    res.push(this.front_[i]);
  }
  var len = this.back_.length;
  for (var i = 0; i < len; ++i) {
    res.push(this.back_[i]);
  }
  return res;
};

//# sourceMappingURL=goog.structs.queue.js.map

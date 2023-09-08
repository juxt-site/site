goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__16154 = arguments.length;
switch (G__16154) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async16156 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16156 = (function (f,blockable,meta16157){
this.f = f;
this.blockable = blockable;
this.meta16157 = meta16157;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16158,meta16157__$1){
var self__ = this;
var _16158__$1 = this;
return (new cljs.core.async.t_cljs$core$async16156(self__.f,self__.blockable,meta16157__$1));
}));

(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16158){
var self__ = this;
var _16158__$1 = this;
return self__.meta16157;
}));

(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async16156.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async16156.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta16157","meta16157",-806870170,null)], null);
}));

(cljs.core.async.t_cljs$core$async16156.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16156.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16156");

(cljs.core.async.t_cljs$core$async16156.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16156");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16156.
 */
cljs.core.async.__GT_t_cljs$core$async16156 = (function cljs$core$async$__GT_t_cljs$core$async16156(f__$1,blockable__$1,meta16157){
return (new cljs.core.async.t_cljs$core$async16156(f__$1,blockable__$1,meta16157));
});

}

return (new cljs.core.async.t_cljs$core$async16156(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__16197 = arguments.length;
switch (G__16197) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__16214 = arguments.length;
switch (G__16214) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__16228 = arguments.length;
switch (G__16228) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_18833 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_18833) : fn1.call(null,val_18833));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_18833) : fn1.call(null,val_18833));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__16242 = arguments.length;
switch (G__16242) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___18840 = n;
var x_18841 = (0);
while(true){
if((x_18841 < n__5636__auto___18840)){
(a[x_18841] = x_18841);

var G__18842 = (x_18841 + (1));
x_18841 = G__18842;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async16256 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16256 = (function (flag,meta16257){
this.flag = flag;
this.meta16257 = meta16257;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16258,meta16257__$1){
var self__ = this;
var _16258__$1 = this;
return (new cljs.core.async.t_cljs$core$async16256(self__.flag,meta16257__$1));
}));

(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16258){
var self__ = this;
var _16258__$1 = this;
return self__.meta16257;
}));

(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async16256.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async16256.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta16257","meta16257",696547021,null)], null);
}));

(cljs.core.async.t_cljs$core$async16256.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16256.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16256");

(cljs.core.async.t_cljs$core$async16256.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16256");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16256.
 */
cljs.core.async.__GT_t_cljs$core$async16256 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async16256(flag__$1,meta16257){
return (new cljs.core.async.t_cljs$core$async16256(flag__$1,meta16257));
});

}

return (new cljs.core.async.t_cljs$core$async16256(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async16266 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16266 = (function (flag,cb,meta16267){
this.flag = flag;
this.cb = cb;
this.meta16267 = meta16267;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16268,meta16267__$1){
var self__ = this;
var _16268__$1 = this;
return (new cljs.core.async.t_cljs$core$async16266(self__.flag,self__.cb,meta16267__$1));
}));

(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16268){
var self__ = this;
var _16268__$1 = this;
return self__.meta16267;
}));

(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async16266.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async16266.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta16267","meta16267",-1181334795,null)], null);
}));

(cljs.core.async.t_cljs$core$async16266.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16266.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16266");

(cljs.core.async.t_cljs$core$async16266.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16266");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16266.
 */
cljs.core.async.__GT_t_cljs$core$async16266 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async16266(flag__$1,cb__$1,meta16267){
return (new cljs.core.async.t_cljs$core$async16266(flag__$1,cb__$1,meta16267));
});

}

return (new cljs.core.async.t_cljs$core$async16266(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__16281_SHARP_){
var G__16283 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16281_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16283) : fret.call(null,G__16283));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__16282_SHARP_){
var G__16284 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__16282_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__16284) : fret.call(null,G__16284));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__18859 = (i + (1));
i = G__18859;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___18860 = arguments.length;
var i__5770__auto___18861 = (0);
while(true){
if((i__5770__auto___18861 < len__5769__auto___18860)){
args__5775__auto__.push((arguments[i__5770__auto___18861]));

var G__18862 = (i__5770__auto___18861 + (1));
i__5770__auto___18861 = G__18862;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__16293){
var map__16294 = p__16293;
var map__16294__$1 = cljs.core.__destructure_map(map__16294);
var opts = map__16294__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq16288){
var G__16289 = cljs.core.first(seq16288);
var seq16288__$1 = cljs.core.next(seq16288);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16289,seq16288__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__16300 = arguments.length;
switch (G__16300) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__16075__auto___18865 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16384){
var state_val_16385 = (state_16384[(1)]);
if((state_val_16385 === (7))){
var inst_16374 = (state_16384[(2)]);
var state_16384__$1 = state_16384;
var statearr_16390_18867 = state_16384__$1;
(statearr_16390_18867[(2)] = inst_16374);

(statearr_16390_18867[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (1))){
var state_16384__$1 = state_16384;
var statearr_16391_18868 = state_16384__$1;
(statearr_16391_18868[(2)] = null);

(statearr_16391_18868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (4))){
var inst_16349 = (state_16384[(7)]);
var inst_16349__$1 = (state_16384[(2)]);
var inst_16350 = (inst_16349__$1 == null);
var state_16384__$1 = (function (){var statearr_16392 = state_16384;
(statearr_16392[(7)] = inst_16349__$1);

return statearr_16392;
})();
if(cljs.core.truth_(inst_16350)){
var statearr_16393_18869 = state_16384__$1;
(statearr_16393_18869[(1)] = (5));

} else {
var statearr_16394_18870 = state_16384__$1;
(statearr_16394_18870[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (13))){
var state_16384__$1 = state_16384;
var statearr_16395_18872 = state_16384__$1;
(statearr_16395_18872[(2)] = null);

(statearr_16395_18872[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (6))){
var inst_16349 = (state_16384[(7)]);
var state_16384__$1 = state_16384;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16384__$1,(11),to,inst_16349);
} else {
if((state_val_16385 === (3))){
var inst_16382 = (state_16384[(2)]);
var state_16384__$1 = state_16384;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16384__$1,inst_16382);
} else {
if((state_val_16385 === (12))){
var state_16384__$1 = state_16384;
var statearr_16396_18874 = state_16384__$1;
(statearr_16396_18874[(2)] = null);

(statearr_16396_18874[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (2))){
var state_16384__$1 = state_16384;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16384__$1,(4),from);
} else {
if((state_val_16385 === (11))){
var inst_16364 = (state_16384[(2)]);
var state_16384__$1 = state_16384;
if(cljs.core.truth_(inst_16364)){
var statearr_16397_18876 = state_16384__$1;
(statearr_16397_18876[(1)] = (12));

} else {
var statearr_16398_18877 = state_16384__$1;
(statearr_16398_18877[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (9))){
var state_16384__$1 = state_16384;
var statearr_16399_18878 = state_16384__$1;
(statearr_16399_18878[(2)] = null);

(statearr_16399_18878[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (5))){
var state_16384__$1 = state_16384;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16400_18879 = state_16384__$1;
(statearr_16400_18879[(1)] = (8));

} else {
var statearr_16401_18880 = state_16384__$1;
(statearr_16401_18880[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (14))){
var inst_16372 = (state_16384[(2)]);
var state_16384__$1 = state_16384;
var statearr_16402_18881 = state_16384__$1;
(statearr_16402_18881[(2)] = inst_16372);

(statearr_16402_18881[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (10))){
var inst_16361 = (state_16384[(2)]);
var state_16384__$1 = state_16384;
var statearr_16406_18882 = state_16384__$1;
(statearr_16406_18882[(2)] = inst_16361);

(statearr_16406_18882[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16385 === (8))){
var inst_16355 = cljs.core.async.close_BANG_(to);
var state_16384__$1 = state_16384;
var statearr_16407_18883 = state_16384__$1;
(statearr_16407_18883[(2)] = inst_16355);

(statearr_16407_18883[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_16415 = [null,null,null,null,null,null,null,null];
(statearr_16415[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_16415[(1)] = (1));

return statearr_16415;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_16384){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16384);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16416){var ex__15956__auto__ = e16416;
var statearr_16417_18885 = state_16384;
(statearr_16417_18885[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16384[(4)]))){
var statearr_16418_18886 = state_16384;
(statearr_16418_18886[(1)] = cljs.core.first((state_16384[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18887 = state_16384;
state_16384 = G__18887;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_16384){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_16384);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16419 = f__16076__auto__();
(statearr_16419[(6)] = c__16075__auto___18865);

return statearr_16419;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__16424){
var vec__16425 = p__16424;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16425,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16425,(1),null);
var job = vec__16425;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__16075__auto___18891 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16436){
var state_val_16437 = (state_16436[(1)]);
if((state_val_16437 === (1))){
var state_16436__$1 = state_16436;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16436__$1,(2),res,v);
} else {
if((state_val_16437 === (2))){
var inst_16433 = (state_16436[(2)]);
var inst_16434 = cljs.core.async.close_BANG_(res);
var state_16436__$1 = (function (){var statearr_16446 = state_16436;
(statearr_16446[(7)] = inst_16433);

return statearr_16446;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16436__$1,inst_16434);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_16447 = [null,null,null,null,null,null,null,null];
(statearr_16447[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__);

(statearr_16447[(1)] = (1));

return statearr_16447;
});
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1 = (function (state_16436){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16436);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16448){var ex__15956__auto__ = e16448;
var statearr_16449_18899 = state_16436;
(statearr_16449_18899[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16436[(4)]))){
var statearr_16450_18902 = state_16436;
(statearr_16450_18902[(1)] = cljs.core.first((state_16436[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18903 = state_16436;
state_16436 = G__18903;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = function(state_16436){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1.call(this,state_16436);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16451 = f__16076__auto__();
(statearr_16451[(6)] = c__16075__auto___18891);

return statearr_16451;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__16452){
var vec__16453 = p__16452;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16453,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16453,(1),null);
var job = vec__16453;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___18908 = n;
var __18909 = (0);
while(true){
if((__18909 < n__5636__auto___18908)){
var G__16461_18910 = type;
var G__16461_18911__$1 = (((G__16461_18910 instanceof cljs.core.Keyword))?G__16461_18910.fqn:null);
switch (G__16461_18911__$1) {
case "compute":
var c__16075__auto___18913 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__18909,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = ((function (__18909,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function (state_16474){
var state_val_16475 = (state_16474[(1)]);
if((state_val_16475 === (1))){
var state_16474__$1 = state_16474;
var statearr_16480_18917 = state_16474__$1;
(statearr_16480_18917[(2)] = null);

(statearr_16480_18917[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16475 === (2))){
var state_16474__$1 = state_16474;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16474__$1,(4),jobs);
} else {
if((state_val_16475 === (3))){
var inst_16472 = (state_16474[(2)]);
var state_16474__$1 = state_16474;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16474__$1,inst_16472);
} else {
if((state_val_16475 === (4))){
var inst_16464 = (state_16474[(2)]);
var inst_16465 = process__$1(inst_16464);
var state_16474__$1 = state_16474;
if(cljs.core.truth_(inst_16465)){
var statearr_16487_18919 = state_16474__$1;
(statearr_16487_18919[(1)] = (5));

} else {
var statearr_16488_18922 = state_16474__$1;
(statearr_16488_18922[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16475 === (5))){
var state_16474__$1 = state_16474;
var statearr_16489_18924 = state_16474__$1;
(statearr_16489_18924[(2)] = null);

(statearr_16489_18924[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16475 === (6))){
var state_16474__$1 = state_16474;
var statearr_16494_18925 = state_16474__$1;
(statearr_16494_18925[(2)] = null);

(statearr_16494_18925[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16475 === (7))){
var inst_16470 = (state_16474[(2)]);
var state_16474__$1 = state_16474;
var statearr_16499_18926 = state_16474__$1;
(statearr_16499_18926[(2)] = inst_16470);

(statearr_16499_18926[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__18909,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
;
return ((function (__18909,switch__15952__auto__,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_16500 = [null,null,null,null,null,null,null];
(statearr_16500[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__);

(statearr_16500[(1)] = (1));

return statearr_16500;
});
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1 = (function (state_16474){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16474);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16501){var ex__15956__auto__ = e16501;
var statearr_16502_18931 = state_16474;
(statearr_16502_18931[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16474[(4)]))){
var statearr_16503_18932 = state_16474;
(statearr_16503_18932[(1)] = cljs.core.first((state_16474[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18934 = state_16474;
state_16474 = G__18934;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = function(state_16474){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1.call(this,state_16474);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__;
})()
;})(__18909,switch__15952__auto__,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
})();
var state__16077__auto__ = (function (){var statearr_16516 = f__16076__auto__();
(statearr_16516[(6)] = c__16075__auto___18913);

return statearr_16516;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
});})(__18909,c__16075__auto___18913,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
);


break;
case "async":
var c__16075__auto___18935 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__18909,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = ((function (__18909,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function (state_16542){
var state_val_16543 = (state_16542[(1)]);
if((state_val_16543 === (1))){
var state_16542__$1 = state_16542;
var statearr_16547_18939 = state_16542__$1;
(statearr_16547_18939[(2)] = null);

(statearr_16547_18939[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16543 === (2))){
var state_16542__$1 = state_16542;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16542__$1,(4),jobs);
} else {
if((state_val_16543 === (3))){
var inst_16540 = (state_16542[(2)]);
var state_16542__$1 = state_16542;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16542__$1,inst_16540);
} else {
if((state_val_16543 === (4))){
var inst_16532 = (state_16542[(2)]);
var inst_16533 = async(inst_16532);
var state_16542__$1 = state_16542;
if(cljs.core.truth_(inst_16533)){
var statearr_16551_18941 = state_16542__$1;
(statearr_16551_18941[(1)] = (5));

} else {
var statearr_16552_18943 = state_16542__$1;
(statearr_16552_18943[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16543 === (5))){
var state_16542__$1 = state_16542;
var statearr_16553_18946 = state_16542__$1;
(statearr_16553_18946[(2)] = null);

(statearr_16553_18946[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16543 === (6))){
var state_16542__$1 = state_16542;
var statearr_16561_18947 = state_16542__$1;
(statearr_16561_18947[(2)] = null);

(statearr_16561_18947[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16543 === (7))){
var inst_16538 = (state_16542[(2)]);
var state_16542__$1 = state_16542;
var statearr_16562_18948 = state_16542__$1;
(statearr_16562_18948[(2)] = inst_16538);

(statearr_16562_18948[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__18909,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
;
return ((function (__18909,switch__15952__auto__,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_16569 = [null,null,null,null,null,null,null];
(statearr_16569[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__);

(statearr_16569[(1)] = (1));

return statearr_16569;
});
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1 = (function (state_16542){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16542);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16570){var ex__15956__auto__ = e16570;
var statearr_16571_18953 = state_16542;
(statearr_16571_18953[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16542[(4)]))){
var statearr_16572_18954 = state_16542;
(statearr_16572_18954[(1)] = cljs.core.first((state_16542[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18955 = state_16542;
state_16542 = G__18955;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = function(state_16542){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1.call(this,state_16542);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__;
})()
;})(__18909,switch__15952__auto__,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
})();
var state__16077__auto__ = (function (){var statearr_16573 = f__16076__auto__();
(statearr_16573[(6)] = c__16075__auto___18935);

return statearr_16573;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
});})(__18909,c__16075__auto___18935,G__16461_18910,G__16461_18911__$1,n__5636__auto___18908,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__16461_18911__$1)].join('')));

}

var G__18957 = (__18909 + (1));
__18909 = G__18957;
continue;
} else {
}
break;
}

var c__16075__auto___18960 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16597){
var state_val_16598 = (state_16597[(1)]);
if((state_val_16598 === (7))){
var inst_16593 = (state_16597[(2)]);
var state_16597__$1 = state_16597;
var statearr_16605_18962 = state_16597__$1;
(statearr_16605_18962[(2)] = inst_16593);

(statearr_16605_18962[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16598 === (1))){
var state_16597__$1 = state_16597;
var statearr_16606_18963 = state_16597__$1;
(statearr_16606_18963[(2)] = null);

(statearr_16606_18963[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16598 === (4))){
var inst_16576 = (state_16597[(7)]);
var inst_16576__$1 = (state_16597[(2)]);
var inst_16577 = (inst_16576__$1 == null);
var state_16597__$1 = (function (){var statearr_16610 = state_16597;
(statearr_16610[(7)] = inst_16576__$1);

return statearr_16610;
})();
if(cljs.core.truth_(inst_16577)){
var statearr_16611_18965 = state_16597__$1;
(statearr_16611_18965[(1)] = (5));

} else {
var statearr_16612_18966 = state_16597__$1;
(statearr_16612_18966[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16598 === (6))){
var inst_16582 = (state_16597[(8)]);
var inst_16576 = (state_16597[(7)]);
var inst_16582__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_16584 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_16585 = [inst_16576,inst_16582__$1];
var inst_16586 = (new cljs.core.PersistentVector(null,2,(5),inst_16584,inst_16585,null));
var state_16597__$1 = (function (){var statearr_16613 = state_16597;
(statearr_16613[(8)] = inst_16582__$1);

return statearr_16613;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16597__$1,(8),jobs,inst_16586);
} else {
if((state_val_16598 === (3))){
var inst_16595 = (state_16597[(2)]);
var state_16597__$1 = state_16597;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16597__$1,inst_16595);
} else {
if((state_val_16598 === (2))){
var state_16597__$1 = state_16597;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16597__$1,(4),from);
} else {
if((state_val_16598 === (9))){
var inst_16590 = (state_16597[(2)]);
var state_16597__$1 = (function (){var statearr_16614 = state_16597;
(statearr_16614[(9)] = inst_16590);

return statearr_16614;
})();
var statearr_16615_18971 = state_16597__$1;
(statearr_16615_18971[(2)] = null);

(statearr_16615_18971[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16598 === (5))){
var inst_16579 = cljs.core.async.close_BANG_(jobs);
var state_16597__$1 = state_16597;
var statearr_16616_18974 = state_16597__$1;
(statearr_16616_18974[(2)] = inst_16579);

(statearr_16616_18974[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16598 === (8))){
var inst_16582 = (state_16597[(8)]);
var inst_16588 = (state_16597[(2)]);
var state_16597__$1 = (function (){var statearr_16618 = state_16597;
(statearr_16618[(10)] = inst_16588);

return statearr_16618;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16597__$1,(9),results,inst_16582);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_16620 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16620[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__);

(statearr_16620[(1)] = (1));

return statearr_16620;
});
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1 = (function (state_16597){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16597);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16621){var ex__15956__auto__ = e16621;
var statearr_16622_18977 = state_16597;
(statearr_16622_18977[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16597[(4)]))){
var statearr_16623_18978 = state_16597;
(statearr_16623_18978[(1)] = cljs.core.first((state_16597[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18979 = state_16597;
state_16597 = G__18979;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = function(state_16597){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1.call(this,state_16597);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16626 = f__16076__auto__();
(statearr_16626[(6)] = c__16075__auto___18960);

return statearr_16626;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


var c__16075__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16670){
var state_val_16671 = (state_16670[(1)]);
if((state_val_16671 === (7))){
var inst_16666 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
var statearr_16673_18980 = state_16670__$1;
(statearr_16673_18980[(2)] = inst_16666);

(statearr_16673_18980[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (20))){
var state_16670__$1 = state_16670;
var statearr_16674_18981 = state_16670__$1;
(statearr_16674_18981[(2)] = null);

(statearr_16674_18981[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (1))){
var state_16670__$1 = state_16670;
var statearr_16675_18982 = state_16670__$1;
(statearr_16675_18982[(2)] = null);

(statearr_16675_18982[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (4))){
var inst_16629 = (state_16670[(7)]);
var inst_16629__$1 = (state_16670[(2)]);
var inst_16636 = (inst_16629__$1 == null);
var state_16670__$1 = (function (){var statearr_16676 = state_16670;
(statearr_16676[(7)] = inst_16629__$1);

return statearr_16676;
})();
if(cljs.core.truth_(inst_16636)){
var statearr_16677_18983 = state_16670__$1;
(statearr_16677_18983[(1)] = (5));

} else {
var statearr_16678_18984 = state_16670__$1;
(statearr_16678_18984[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (15))){
var inst_16648 = (state_16670[(8)]);
var state_16670__$1 = state_16670;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16670__$1,(18),to,inst_16648);
} else {
if((state_val_16671 === (21))){
var inst_16661 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
var statearr_16679_18985 = state_16670__$1;
(statearr_16679_18985[(2)] = inst_16661);

(statearr_16679_18985[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (13))){
var inst_16663 = (state_16670[(2)]);
var state_16670__$1 = (function (){var statearr_16685 = state_16670;
(statearr_16685[(9)] = inst_16663);

return statearr_16685;
})();
var statearr_16686_18986 = state_16670__$1;
(statearr_16686_18986[(2)] = null);

(statearr_16686_18986[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (6))){
var inst_16629 = (state_16670[(7)]);
var state_16670__$1 = state_16670;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16670__$1,(11),inst_16629);
} else {
if((state_val_16671 === (17))){
var inst_16656 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
if(cljs.core.truth_(inst_16656)){
var statearr_16687_18987 = state_16670__$1;
(statearr_16687_18987[(1)] = (19));

} else {
var statearr_16688_18988 = state_16670__$1;
(statearr_16688_18988[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (3))){
var inst_16668 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16670__$1,inst_16668);
} else {
if((state_val_16671 === (12))){
var inst_16645 = (state_16670[(10)]);
var state_16670__$1 = state_16670;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16670__$1,(14),inst_16645);
} else {
if((state_val_16671 === (2))){
var state_16670__$1 = state_16670;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16670__$1,(4),results);
} else {
if((state_val_16671 === (19))){
var state_16670__$1 = state_16670;
var statearr_16693_18989 = state_16670__$1;
(statearr_16693_18989[(2)] = null);

(statearr_16693_18989[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (11))){
var inst_16645 = (state_16670[(2)]);
var state_16670__$1 = (function (){var statearr_16695 = state_16670;
(statearr_16695[(10)] = inst_16645);

return statearr_16695;
})();
var statearr_16696_18990 = state_16670__$1;
(statearr_16696_18990[(2)] = null);

(statearr_16696_18990[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (9))){
var state_16670__$1 = state_16670;
var statearr_16697_18991 = state_16670__$1;
(statearr_16697_18991[(2)] = null);

(statearr_16697_18991[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (5))){
var state_16670__$1 = state_16670;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16699_18992 = state_16670__$1;
(statearr_16699_18992[(1)] = (8));

} else {
var statearr_16700_18993 = state_16670__$1;
(statearr_16700_18993[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (14))){
var inst_16648 = (state_16670[(8)]);
var inst_16650 = (state_16670[(11)]);
var inst_16648__$1 = (state_16670[(2)]);
var inst_16649 = (inst_16648__$1 == null);
var inst_16650__$1 = cljs.core.not(inst_16649);
var state_16670__$1 = (function (){var statearr_16704 = state_16670;
(statearr_16704[(8)] = inst_16648__$1);

(statearr_16704[(11)] = inst_16650__$1);

return statearr_16704;
})();
if(inst_16650__$1){
var statearr_16705_18994 = state_16670__$1;
(statearr_16705_18994[(1)] = (15));

} else {
var statearr_16706_18995 = state_16670__$1;
(statearr_16706_18995[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (16))){
var inst_16650 = (state_16670[(11)]);
var state_16670__$1 = state_16670;
var statearr_16707_18996 = state_16670__$1;
(statearr_16707_18996[(2)] = inst_16650);

(statearr_16707_18996[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (10))){
var inst_16642 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
var statearr_16709_18997 = state_16670__$1;
(statearr_16709_18997[(2)] = inst_16642);

(statearr_16709_18997[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (18))){
var inst_16653 = (state_16670[(2)]);
var state_16670__$1 = state_16670;
var statearr_16710_18998 = state_16670__$1;
(statearr_16710_18998[(2)] = inst_16653);

(statearr_16710_18998[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16671 === (8))){
var inst_16639 = cljs.core.async.close_BANG_(to);
var state_16670__$1 = state_16670;
var statearr_16715_18999 = state_16670__$1;
(statearr_16715_18999[(2)] = inst_16639);

(statearr_16715_18999[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_16717 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16717[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__);

(statearr_16717[(1)] = (1));

return statearr_16717;
});
var cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1 = (function (state_16670){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16670);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16718){var ex__15956__auto__ = e16718;
var statearr_16723_19001 = state_16670;
(statearr_16723_19001[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16670[(4)]))){
var statearr_16724_19003 = state_16670;
(statearr_16724_19003[(1)] = cljs.core.first((state_16670[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19004 = state_16670;
state_16670 = G__19004;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__ = function(state_16670){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1.call(this,state_16670);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16725 = f__16076__auto__();
(statearr_16725[(6)] = c__16075__auto__);

return statearr_16725;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

return c__16075__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__16750 = arguments.length;
switch (G__16750) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__16760 = arguments.length;
switch (G__16760) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__16783 = arguments.length;
switch (G__16783) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__16075__auto___19015 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16853){
var state_val_16854 = (state_16853[(1)]);
if((state_val_16854 === (7))){
var inst_16849 = (state_16853[(2)]);
var state_16853__$1 = state_16853;
var statearr_16855_19016 = state_16853__$1;
(statearr_16855_19016[(2)] = inst_16849);

(statearr_16855_19016[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (1))){
var state_16853__$1 = state_16853;
var statearr_16867_19017 = state_16853__$1;
(statearr_16867_19017[(2)] = null);

(statearr_16867_19017[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (4))){
var inst_16808 = (state_16853[(7)]);
var inst_16808__$1 = (state_16853[(2)]);
var inst_16809 = (inst_16808__$1 == null);
var state_16853__$1 = (function (){var statearr_16868 = state_16853;
(statearr_16868[(7)] = inst_16808__$1);

return statearr_16868;
})();
if(cljs.core.truth_(inst_16809)){
var statearr_16869_19018 = state_16853__$1;
(statearr_16869_19018[(1)] = (5));

} else {
var statearr_16870_19019 = state_16853__$1;
(statearr_16870_19019[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (13))){
var state_16853__$1 = state_16853;
var statearr_16871_19020 = state_16853__$1;
(statearr_16871_19020[(2)] = null);

(statearr_16871_19020[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (6))){
var inst_16808 = (state_16853[(7)]);
var inst_16814 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_16808) : p.call(null,inst_16808));
var state_16853__$1 = state_16853;
if(cljs.core.truth_(inst_16814)){
var statearr_16872_19021 = state_16853__$1;
(statearr_16872_19021[(1)] = (9));

} else {
var statearr_16873_19022 = state_16853__$1;
(statearr_16873_19022[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (3))){
var inst_16851 = (state_16853[(2)]);
var state_16853__$1 = state_16853;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16853__$1,inst_16851);
} else {
if((state_val_16854 === (12))){
var state_16853__$1 = state_16853;
var statearr_16886_19025 = state_16853__$1;
(statearr_16886_19025[(2)] = null);

(statearr_16886_19025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (2))){
var state_16853__$1 = state_16853;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16853__$1,(4),ch);
} else {
if((state_val_16854 === (11))){
var inst_16808 = (state_16853[(7)]);
var inst_16840 = (state_16853[(2)]);
var state_16853__$1 = state_16853;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16853__$1,(8),inst_16840,inst_16808);
} else {
if((state_val_16854 === (9))){
var state_16853__$1 = state_16853;
var statearr_16894_19027 = state_16853__$1;
(statearr_16894_19027[(2)] = tc);

(statearr_16894_19027[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (5))){
var inst_16811 = cljs.core.async.close_BANG_(tc);
var inst_16812 = cljs.core.async.close_BANG_(fc);
var state_16853__$1 = (function (){var statearr_16899 = state_16853;
(statearr_16899[(8)] = inst_16811);

return statearr_16899;
})();
var statearr_16900_19029 = state_16853__$1;
(statearr_16900_19029[(2)] = inst_16812);

(statearr_16900_19029[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (14))){
var inst_16847 = (state_16853[(2)]);
var state_16853__$1 = state_16853;
var statearr_16901_19030 = state_16853__$1;
(statearr_16901_19030[(2)] = inst_16847);

(statearr_16901_19030[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (10))){
var state_16853__$1 = state_16853;
var statearr_16902_19034 = state_16853__$1;
(statearr_16902_19034[(2)] = fc);

(statearr_16902_19034[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16854 === (8))){
var inst_16842 = (state_16853[(2)]);
var state_16853__$1 = state_16853;
if(cljs.core.truth_(inst_16842)){
var statearr_16903_19035 = state_16853__$1;
(statearr_16903_19035[(1)] = (12));

} else {
var statearr_16904_19036 = state_16853__$1;
(statearr_16904_19036[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_16905 = [null,null,null,null,null,null,null,null,null];
(statearr_16905[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_16905[(1)] = (1));

return statearr_16905;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_16853){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16853);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16906){var ex__15956__auto__ = e16906;
var statearr_16907_19038 = state_16853;
(statearr_16907_19038[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16853[(4)]))){
var statearr_16908_19041 = state_16853;
(statearr_16908_19041[(1)] = cljs.core.first((state_16853[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19043 = state_16853;
state_16853 = G__19043;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_16853){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_16853);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16909 = f__16076__auto__();
(statearr_16909[(6)] = c__16075__auto___19015);

return statearr_16909;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__16075__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16931){
var state_val_16932 = (state_16931[(1)]);
if((state_val_16932 === (7))){
var inst_16927 = (state_16931[(2)]);
var state_16931__$1 = state_16931;
var statearr_16942_19046 = state_16931__$1;
(statearr_16942_19046[(2)] = inst_16927);

(statearr_16942_19046[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (1))){
var inst_16910 = init;
var inst_16911 = inst_16910;
var state_16931__$1 = (function (){var statearr_16943 = state_16931;
(statearr_16943[(7)] = inst_16911);

return statearr_16943;
})();
var statearr_16944_19049 = state_16931__$1;
(statearr_16944_19049[(2)] = null);

(statearr_16944_19049[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (4))){
var inst_16914 = (state_16931[(8)]);
var inst_16914__$1 = (state_16931[(2)]);
var inst_16915 = (inst_16914__$1 == null);
var state_16931__$1 = (function (){var statearr_16949 = state_16931;
(statearr_16949[(8)] = inst_16914__$1);

return statearr_16949;
})();
if(cljs.core.truth_(inst_16915)){
var statearr_16950_19050 = state_16931__$1;
(statearr_16950_19050[(1)] = (5));

} else {
var statearr_16951_19051 = state_16931__$1;
(statearr_16951_19051[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (6))){
var inst_16911 = (state_16931[(7)]);
var inst_16918 = (state_16931[(9)]);
var inst_16914 = (state_16931[(8)]);
var inst_16918__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_16911,inst_16914) : f.call(null,inst_16911,inst_16914));
var inst_16919 = cljs.core.reduced_QMARK_(inst_16918__$1);
var state_16931__$1 = (function (){var statearr_16952 = state_16931;
(statearr_16952[(9)] = inst_16918__$1);

return statearr_16952;
})();
if(inst_16919){
var statearr_16953_19053 = state_16931__$1;
(statearr_16953_19053[(1)] = (8));

} else {
var statearr_16954_19054 = state_16931__$1;
(statearr_16954_19054[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (3))){
var inst_16929 = (state_16931[(2)]);
var state_16931__$1 = state_16931;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16931__$1,inst_16929);
} else {
if((state_val_16932 === (2))){
var state_16931__$1 = state_16931;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16931__$1,(4),ch);
} else {
if((state_val_16932 === (9))){
var inst_16918 = (state_16931[(9)]);
var inst_16911 = inst_16918;
var state_16931__$1 = (function (){var statearr_16955 = state_16931;
(statearr_16955[(7)] = inst_16911);

return statearr_16955;
})();
var statearr_16956_19058 = state_16931__$1;
(statearr_16956_19058[(2)] = null);

(statearr_16956_19058[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (5))){
var inst_16911 = (state_16931[(7)]);
var state_16931__$1 = state_16931;
var statearr_16957_19059 = state_16931__$1;
(statearr_16957_19059[(2)] = inst_16911);

(statearr_16957_19059[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (10))){
var inst_16925 = (state_16931[(2)]);
var state_16931__$1 = state_16931;
var statearr_16958_19060 = state_16931__$1;
(statearr_16958_19060[(2)] = inst_16925);

(statearr_16958_19060[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16932 === (8))){
var inst_16918 = (state_16931[(9)]);
var inst_16921 = cljs.core.deref(inst_16918);
var state_16931__$1 = state_16931;
var statearr_16959_19062 = state_16931__$1;
(statearr_16959_19062[(2)] = inst_16921);

(statearr_16959_19062[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__15953__auto__ = null;
var cljs$core$async$reduce_$_state_machine__15953__auto____0 = (function (){
var statearr_16960 = [null,null,null,null,null,null,null,null,null,null];
(statearr_16960[(0)] = cljs$core$async$reduce_$_state_machine__15953__auto__);

(statearr_16960[(1)] = (1));

return statearr_16960;
});
var cljs$core$async$reduce_$_state_machine__15953__auto____1 = (function (state_16931){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16931);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16961){var ex__15956__auto__ = e16961;
var statearr_16962_19065 = state_16931;
(statearr_16962_19065[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16931[(4)]))){
var statearr_16963_19067 = state_16931;
(statearr_16963_19067[(1)] = cljs.core.first((state_16931[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19068 = state_16931;
state_16931 = G__19068;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__15953__auto__ = function(state_16931){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__15953__auto____1.call(this,state_16931);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__15953__auto____0;
cljs$core$async$reduce_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__15953__auto____1;
return cljs$core$async$reduce_$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16964 = f__16076__auto__();
(statearr_16964[(6)] = c__16075__auto__);

return statearr_16964;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

return c__16075__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__16075__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_16970){
var state_val_16971 = (state_16970[(1)]);
if((state_val_16971 === (1))){
var inst_16965 = cljs.core.async.reduce(f__$1,init,ch);
var state_16970__$1 = state_16970;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16970__$1,(2),inst_16965);
} else {
if((state_val_16971 === (2))){
var inst_16967 = (state_16970[(2)]);
var inst_16968 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_16967) : f__$1.call(null,inst_16967));
var state_16970__$1 = state_16970;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16970__$1,inst_16968);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__15953__auto__ = null;
var cljs$core$async$transduce_$_state_machine__15953__auto____0 = (function (){
var statearr_16972 = [null,null,null,null,null,null,null];
(statearr_16972[(0)] = cljs$core$async$transduce_$_state_machine__15953__auto__);

(statearr_16972[(1)] = (1));

return statearr_16972;
});
var cljs$core$async$transduce_$_state_machine__15953__auto____1 = (function (state_16970){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_16970);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e16973){var ex__15956__auto__ = e16973;
var statearr_16974_19078 = state_16970;
(statearr_16974_19078[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_16970[(4)]))){
var statearr_16975_19079 = state_16970;
(statearr_16975_19079[(1)] = cljs.core.first((state_16970[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19082 = state_16970;
state_16970 = G__19082;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__15953__auto__ = function(state_16970){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__15953__auto____1.call(this,state_16970);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__15953__auto____0;
cljs$core$async$transduce_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__15953__auto____1;
return cljs$core$async$transduce_$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_16976 = f__16076__auto__();
(statearr_16976[(6)] = c__16075__auto__);

return statearr_16976;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

return c__16075__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__16978 = arguments.length;
switch (G__16978) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__16075__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_17016){
var state_val_17017 = (state_17016[(1)]);
if((state_val_17017 === (7))){
var inst_16998 = (state_17016[(2)]);
var state_17016__$1 = state_17016;
var statearr_17018_19088 = state_17016__$1;
(statearr_17018_19088[(2)] = inst_16998);

(statearr_17018_19088[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (1))){
var inst_16988 = cljs.core.seq(coll);
var inst_16993 = inst_16988;
var state_17016__$1 = (function (){var statearr_17019 = state_17016;
(statearr_17019[(7)] = inst_16993);

return statearr_17019;
})();
var statearr_17020_19090 = state_17016__$1;
(statearr_17020_19090[(2)] = null);

(statearr_17020_19090[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (4))){
var inst_16993 = (state_17016[(7)]);
var inst_16996 = cljs.core.first(inst_16993);
var state_17016__$1 = state_17016;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17016__$1,(7),ch,inst_16996);
} else {
if((state_val_17017 === (13))){
var inst_17010 = (state_17016[(2)]);
var state_17016__$1 = state_17016;
var statearr_17021_19092 = state_17016__$1;
(statearr_17021_19092[(2)] = inst_17010);

(statearr_17021_19092[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (6))){
var inst_17001 = (state_17016[(2)]);
var state_17016__$1 = state_17016;
if(cljs.core.truth_(inst_17001)){
var statearr_17022_19093 = state_17016__$1;
(statearr_17022_19093[(1)] = (8));

} else {
var statearr_17023_19094 = state_17016__$1;
(statearr_17023_19094[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (3))){
var inst_17014 = (state_17016[(2)]);
var state_17016__$1 = state_17016;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17016__$1,inst_17014);
} else {
if((state_val_17017 === (12))){
var state_17016__$1 = state_17016;
var statearr_17028_19098 = state_17016__$1;
(statearr_17028_19098[(2)] = null);

(statearr_17028_19098[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (2))){
var inst_16993 = (state_17016[(7)]);
var state_17016__$1 = state_17016;
if(cljs.core.truth_(inst_16993)){
var statearr_17030_19099 = state_17016__$1;
(statearr_17030_19099[(1)] = (4));

} else {
var statearr_17035_19100 = state_17016__$1;
(statearr_17035_19100[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (11))){
var inst_17007 = cljs.core.async.close_BANG_(ch);
var state_17016__$1 = state_17016;
var statearr_17044_19102 = state_17016__$1;
(statearr_17044_19102[(2)] = inst_17007);

(statearr_17044_19102[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (9))){
var state_17016__$1 = state_17016;
if(cljs.core.truth_(close_QMARK_)){
var statearr_17045_19103 = state_17016__$1;
(statearr_17045_19103[(1)] = (11));

} else {
var statearr_17046_19104 = state_17016__$1;
(statearr_17046_19104[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (5))){
var inst_16993 = (state_17016[(7)]);
var state_17016__$1 = state_17016;
var statearr_17047_19107 = state_17016__$1;
(statearr_17047_19107[(2)] = inst_16993);

(statearr_17047_19107[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (10))){
var inst_17012 = (state_17016[(2)]);
var state_17016__$1 = state_17016;
var statearr_17048_19109 = state_17016__$1;
(statearr_17048_19109[(2)] = inst_17012);

(statearr_17048_19109[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17017 === (8))){
var inst_16993 = (state_17016[(7)]);
var inst_17003 = cljs.core.next(inst_16993);
var inst_16993__$1 = inst_17003;
var state_17016__$1 = (function (){var statearr_17049 = state_17016;
(statearr_17049[(7)] = inst_16993__$1);

return statearr_17049;
})();
var statearr_17050_19110 = state_17016__$1;
(statearr_17050_19110[(2)] = null);

(statearr_17050_19110[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_17051 = [null,null,null,null,null,null,null,null];
(statearr_17051[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_17051[(1)] = (1));

return statearr_17051;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_17016){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_17016);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e17052){var ex__15956__auto__ = e17052;
var statearr_17053_19114 = state_17016;
(statearr_17053_19114[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_17016[(4)]))){
var statearr_17054_19116 = state_17016;
(statearr_17054_19116[(1)] = cljs.core.first((state_17016[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19117 = state_17016;
state_17016 = G__19117;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_17016){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_17016);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_17058 = f__16076__auto__();
(statearr_17058[(6)] = c__16075__auto__);

return statearr_17058;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

return c__16075__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__17062 = arguments.length;
switch (G__17062) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_19131 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_19131(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_19135 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_19135(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_19138 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_19138(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_19142 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_19142(m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async17080 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17080 = (function (ch,cs,meta17081){
this.ch = ch;
this.cs = cs;
this.meta17081 = meta17081;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17082,meta17081__$1){
var self__ = this;
var _17082__$1 = this;
return (new cljs.core.async.t_cljs$core$async17080(self__.ch,self__.cs,meta17081__$1));
}));

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17082){
var self__ = this;
var _17082__$1 = this;
return self__.meta17081;
}));

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async17080.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async17080.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta17081","meta17081",823180504,null)], null);
}));

(cljs.core.async.t_cljs$core$async17080.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17080.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17080");

(cljs.core.async.t_cljs$core$async17080.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async17080");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17080.
 */
cljs.core.async.__GT_t_cljs$core$async17080 = (function cljs$core$async$mult_$___GT_t_cljs$core$async17080(ch__$1,cs__$1,meta17081){
return (new cljs.core.async.t_cljs$core$async17080(ch__$1,cs__$1,meta17081));
});

}

return (new cljs.core.async.t_cljs$core$async17080(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__16075__auto___19173 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_17221){
var state_val_17222 = (state_17221[(1)]);
if((state_val_17222 === (7))){
var inst_17217 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17223_19176 = state_17221__$1;
(statearr_17223_19176[(2)] = inst_17217);

(statearr_17223_19176[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (20))){
var inst_17122 = (state_17221[(7)]);
var inst_17134 = cljs.core.first(inst_17122);
var inst_17135 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17134,(0),null);
var inst_17136 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17134,(1),null);
var state_17221__$1 = (function (){var statearr_17224 = state_17221;
(statearr_17224[(8)] = inst_17135);

return statearr_17224;
})();
if(cljs.core.truth_(inst_17136)){
var statearr_17225_19178 = state_17221__$1;
(statearr_17225_19178[(1)] = (22));

} else {
var statearr_17226_19179 = state_17221__$1;
(statearr_17226_19179[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (27))){
var inst_17171 = (state_17221[(9)]);
var inst_17166 = (state_17221[(10)]);
var inst_17164 = (state_17221[(11)]);
var inst_17090 = (state_17221[(12)]);
var inst_17171__$1 = cljs.core._nth(inst_17164,inst_17166);
var inst_17172 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17171__$1,inst_17090,done);
var state_17221__$1 = (function (){var statearr_17228 = state_17221;
(statearr_17228[(9)] = inst_17171__$1);

return statearr_17228;
})();
if(cljs.core.truth_(inst_17172)){
var statearr_17229_19181 = state_17221__$1;
(statearr_17229_19181[(1)] = (30));

} else {
var statearr_17233_19182 = state_17221__$1;
(statearr_17233_19182[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (1))){
var state_17221__$1 = state_17221;
var statearr_17234_19183 = state_17221__$1;
(statearr_17234_19183[(2)] = null);

(statearr_17234_19183[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (24))){
var inst_17122 = (state_17221[(7)]);
var inst_17141 = (state_17221[(2)]);
var inst_17142 = cljs.core.next(inst_17122);
var inst_17099 = inst_17142;
var inst_17100 = null;
var inst_17101 = (0);
var inst_17102 = (0);
var state_17221__$1 = (function (){var statearr_17235 = state_17221;
(statearr_17235[(13)] = inst_17101);

(statearr_17235[(14)] = inst_17100);

(statearr_17235[(15)] = inst_17099);

(statearr_17235[(16)] = inst_17102);

(statearr_17235[(17)] = inst_17141);

return statearr_17235;
})();
var statearr_17236_19184 = state_17221__$1;
(statearr_17236_19184[(2)] = null);

(statearr_17236_19184[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (39))){
var state_17221__$1 = state_17221;
var statearr_17240_19185 = state_17221__$1;
(statearr_17240_19185[(2)] = null);

(statearr_17240_19185[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (4))){
var inst_17090 = (state_17221[(12)]);
var inst_17090__$1 = (state_17221[(2)]);
var inst_17091 = (inst_17090__$1 == null);
var state_17221__$1 = (function (){var statearr_17241 = state_17221;
(statearr_17241[(12)] = inst_17090__$1);

return statearr_17241;
})();
if(cljs.core.truth_(inst_17091)){
var statearr_17242_19186 = state_17221__$1;
(statearr_17242_19186[(1)] = (5));

} else {
var statearr_17243_19187 = state_17221__$1;
(statearr_17243_19187[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (15))){
var inst_17101 = (state_17221[(13)]);
var inst_17100 = (state_17221[(14)]);
var inst_17099 = (state_17221[(15)]);
var inst_17102 = (state_17221[(16)]);
var inst_17117 = (state_17221[(2)]);
var inst_17118 = (inst_17102 + (1));
var tmp17237 = inst_17101;
var tmp17238 = inst_17100;
var tmp17239 = inst_17099;
var inst_17099__$1 = tmp17239;
var inst_17100__$1 = tmp17238;
var inst_17101__$1 = tmp17237;
var inst_17102__$1 = inst_17118;
var state_17221__$1 = (function (){var statearr_17244 = state_17221;
(statearr_17244[(13)] = inst_17101__$1);

(statearr_17244[(14)] = inst_17100__$1);

(statearr_17244[(18)] = inst_17117);

(statearr_17244[(15)] = inst_17099__$1);

(statearr_17244[(16)] = inst_17102__$1);

return statearr_17244;
})();
var statearr_17245_19188 = state_17221__$1;
(statearr_17245_19188[(2)] = null);

(statearr_17245_19188[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (21))){
var inst_17145 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17249_19189 = state_17221__$1;
(statearr_17249_19189[(2)] = inst_17145);

(statearr_17249_19189[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (31))){
var inst_17171 = (state_17221[(9)]);
var inst_17175 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17171);
var state_17221__$1 = state_17221;
var statearr_17250_19190 = state_17221__$1;
(statearr_17250_19190[(2)] = inst_17175);

(statearr_17250_19190[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (32))){
var inst_17165 = (state_17221[(19)]);
var inst_17163 = (state_17221[(20)]);
var inst_17166 = (state_17221[(10)]);
var inst_17164 = (state_17221[(11)]);
var inst_17177 = (state_17221[(2)]);
var inst_17178 = (inst_17166 + (1));
var tmp17246 = inst_17165;
var tmp17247 = inst_17163;
var tmp17248 = inst_17164;
var inst_17163__$1 = tmp17247;
var inst_17164__$1 = tmp17248;
var inst_17165__$1 = tmp17246;
var inst_17166__$1 = inst_17178;
var state_17221__$1 = (function (){var statearr_17251 = state_17221;
(statearr_17251[(19)] = inst_17165__$1);

(statearr_17251[(20)] = inst_17163__$1);

(statearr_17251[(10)] = inst_17166__$1);

(statearr_17251[(21)] = inst_17177);

(statearr_17251[(11)] = inst_17164__$1);

return statearr_17251;
})();
var statearr_17253_19191 = state_17221__$1;
(statearr_17253_19191[(2)] = null);

(statearr_17253_19191[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (40))){
var inst_17190 = (state_17221[(22)]);
var inst_17194 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_17190);
var state_17221__$1 = state_17221;
var statearr_17254_19192 = state_17221__$1;
(statearr_17254_19192[(2)] = inst_17194);

(statearr_17254_19192[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (33))){
var inst_17181 = (state_17221[(23)]);
var inst_17183 = cljs.core.chunked_seq_QMARK_(inst_17181);
var state_17221__$1 = state_17221;
if(inst_17183){
var statearr_17255_19193 = state_17221__$1;
(statearr_17255_19193[(1)] = (36));

} else {
var statearr_17256_19194 = state_17221__$1;
(statearr_17256_19194[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (13))){
var inst_17111 = (state_17221[(24)]);
var inst_17114 = cljs.core.async.close_BANG_(inst_17111);
var state_17221__$1 = state_17221;
var statearr_17257_19197 = state_17221__$1;
(statearr_17257_19197[(2)] = inst_17114);

(statearr_17257_19197[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (22))){
var inst_17135 = (state_17221[(8)]);
var inst_17138 = cljs.core.async.close_BANG_(inst_17135);
var state_17221__$1 = state_17221;
var statearr_17258_19198 = state_17221__$1;
(statearr_17258_19198[(2)] = inst_17138);

(statearr_17258_19198[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (36))){
var inst_17181 = (state_17221[(23)]);
var inst_17185 = cljs.core.chunk_first(inst_17181);
var inst_17186 = cljs.core.chunk_rest(inst_17181);
var inst_17187 = cljs.core.count(inst_17185);
var inst_17163 = inst_17186;
var inst_17164 = inst_17185;
var inst_17165 = inst_17187;
var inst_17166 = (0);
var state_17221__$1 = (function (){var statearr_17259 = state_17221;
(statearr_17259[(19)] = inst_17165);

(statearr_17259[(20)] = inst_17163);

(statearr_17259[(10)] = inst_17166);

(statearr_17259[(11)] = inst_17164);

return statearr_17259;
})();
var statearr_17262_19200 = state_17221__$1;
(statearr_17262_19200[(2)] = null);

(statearr_17262_19200[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (41))){
var inst_17181 = (state_17221[(23)]);
var inst_17196 = (state_17221[(2)]);
var inst_17197 = cljs.core.next(inst_17181);
var inst_17163 = inst_17197;
var inst_17164 = null;
var inst_17165 = (0);
var inst_17166 = (0);
var state_17221__$1 = (function (){var statearr_17265 = state_17221;
(statearr_17265[(19)] = inst_17165);

(statearr_17265[(25)] = inst_17196);

(statearr_17265[(20)] = inst_17163);

(statearr_17265[(10)] = inst_17166);

(statearr_17265[(11)] = inst_17164);

return statearr_17265;
})();
var statearr_17266_19201 = state_17221__$1;
(statearr_17266_19201[(2)] = null);

(statearr_17266_19201[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (43))){
var state_17221__$1 = state_17221;
var statearr_17268_19202 = state_17221__$1;
(statearr_17268_19202[(2)] = null);

(statearr_17268_19202[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (29))){
var inst_17205 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17269_19203 = state_17221__$1;
(statearr_17269_19203[(2)] = inst_17205);

(statearr_17269_19203[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (44))){
var inst_17214 = (state_17221[(2)]);
var state_17221__$1 = (function (){var statearr_17270 = state_17221;
(statearr_17270[(26)] = inst_17214);

return statearr_17270;
})();
var statearr_17271_19204 = state_17221__$1;
(statearr_17271_19204[(2)] = null);

(statearr_17271_19204[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (6))){
var inst_17155 = (state_17221[(27)]);
var inst_17154 = cljs.core.deref(cs);
var inst_17155__$1 = cljs.core.keys(inst_17154);
var inst_17156 = cljs.core.count(inst_17155__$1);
var inst_17157 = cljs.core.reset_BANG_(dctr,inst_17156);
var inst_17162 = cljs.core.seq(inst_17155__$1);
var inst_17163 = inst_17162;
var inst_17164 = null;
var inst_17165 = (0);
var inst_17166 = (0);
var state_17221__$1 = (function (){var statearr_17272 = state_17221;
(statearr_17272[(19)] = inst_17165);

(statearr_17272[(28)] = inst_17157);

(statearr_17272[(20)] = inst_17163);

(statearr_17272[(10)] = inst_17166);

(statearr_17272[(11)] = inst_17164);

(statearr_17272[(27)] = inst_17155__$1);

return statearr_17272;
})();
var statearr_17273_19208 = state_17221__$1;
(statearr_17273_19208[(2)] = null);

(statearr_17273_19208[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (28))){
var inst_17163 = (state_17221[(20)]);
var inst_17181 = (state_17221[(23)]);
var inst_17181__$1 = cljs.core.seq(inst_17163);
var state_17221__$1 = (function (){var statearr_17278 = state_17221;
(statearr_17278[(23)] = inst_17181__$1);

return statearr_17278;
})();
if(inst_17181__$1){
var statearr_17279_19209 = state_17221__$1;
(statearr_17279_19209[(1)] = (33));

} else {
var statearr_17280_19210 = state_17221__$1;
(statearr_17280_19210[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (25))){
var inst_17165 = (state_17221[(19)]);
var inst_17166 = (state_17221[(10)]);
var inst_17168 = (inst_17166 < inst_17165);
var inst_17169 = inst_17168;
var state_17221__$1 = state_17221;
if(cljs.core.truth_(inst_17169)){
var statearr_17281_19211 = state_17221__$1;
(statearr_17281_19211[(1)] = (27));

} else {
var statearr_17282_19212 = state_17221__$1;
(statearr_17282_19212[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (34))){
var state_17221__$1 = state_17221;
var statearr_17286_19213 = state_17221__$1;
(statearr_17286_19213[(2)] = null);

(statearr_17286_19213[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (17))){
var state_17221__$1 = state_17221;
var statearr_17290_19214 = state_17221__$1;
(statearr_17290_19214[(2)] = null);

(statearr_17290_19214[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (3))){
var inst_17219 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17221__$1,inst_17219);
} else {
if((state_val_17222 === (12))){
var inst_17150 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17295_19215 = state_17221__$1;
(statearr_17295_19215[(2)] = inst_17150);

(statearr_17295_19215[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (2))){
var state_17221__$1 = state_17221;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17221__$1,(4),ch);
} else {
if((state_val_17222 === (23))){
var state_17221__$1 = state_17221;
var statearr_17299_19216 = state_17221__$1;
(statearr_17299_19216[(2)] = null);

(statearr_17299_19216[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (35))){
var inst_17203 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17303_19217 = state_17221__$1;
(statearr_17303_19217[(2)] = inst_17203);

(statearr_17303_19217[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (19))){
var inst_17122 = (state_17221[(7)]);
var inst_17126 = cljs.core.chunk_first(inst_17122);
var inst_17127 = cljs.core.chunk_rest(inst_17122);
var inst_17128 = cljs.core.count(inst_17126);
var inst_17099 = inst_17127;
var inst_17100 = inst_17126;
var inst_17101 = inst_17128;
var inst_17102 = (0);
var state_17221__$1 = (function (){var statearr_17304 = state_17221;
(statearr_17304[(13)] = inst_17101);

(statearr_17304[(14)] = inst_17100);

(statearr_17304[(15)] = inst_17099);

(statearr_17304[(16)] = inst_17102);

return statearr_17304;
})();
var statearr_17305_19218 = state_17221__$1;
(statearr_17305_19218[(2)] = null);

(statearr_17305_19218[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (11))){
var inst_17099 = (state_17221[(15)]);
var inst_17122 = (state_17221[(7)]);
var inst_17122__$1 = cljs.core.seq(inst_17099);
var state_17221__$1 = (function (){var statearr_17310 = state_17221;
(statearr_17310[(7)] = inst_17122__$1);

return statearr_17310;
})();
if(inst_17122__$1){
var statearr_17311_19220 = state_17221__$1;
(statearr_17311_19220[(1)] = (16));

} else {
var statearr_17312_19221 = state_17221__$1;
(statearr_17312_19221[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (9))){
var inst_17152 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17313_19223 = state_17221__$1;
(statearr_17313_19223[(2)] = inst_17152);

(statearr_17313_19223[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (5))){
var inst_17097 = cljs.core.deref(cs);
var inst_17098 = cljs.core.seq(inst_17097);
var inst_17099 = inst_17098;
var inst_17100 = null;
var inst_17101 = (0);
var inst_17102 = (0);
var state_17221__$1 = (function (){var statearr_17314 = state_17221;
(statearr_17314[(13)] = inst_17101);

(statearr_17314[(14)] = inst_17100);

(statearr_17314[(15)] = inst_17099);

(statearr_17314[(16)] = inst_17102);

return statearr_17314;
})();
var statearr_17315_19227 = state_17221__$1;
(statearr_17315_19227[(2)] = null);

(statearr_17315_19227[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (14))){
var state_17221__$1 = state_17221;
var statearr_17316_19228 = state_17221__$1;
(statearr_17316_19228[(2)] = null);

(statearr_17316_19228[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (45))){
var inst_17211 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17317_19229 = state_17221__$1;
(statearr_17317_19229[(2)] = inst_17211);

(statearr_17317_19229[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (26))){
var inst_17155 = (state_17221[(27)]);
var inst_17207 = (state_17221[(2)]);
var inst_17208 = cljs.core.seq(inst_17155);
var state_17221__$1 = (function (){var statearr_17318 = state_17221;
(statearr_17318[(29)] = inst_17207);

return statearr_17318;
})();
if(inst_17208){
var statearr_17319_19230 = state_17221__$1;
(statearr_17319_19230[(1)] = (42));

} else {
var statearr_17320_19231 = state_17221__$1;
(statearr_17320_19231[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (16))){
var inst_17122 = (state_17221[(7)]);
var inst_17124 = cljs.core.chunked_seq_QMARK_(inst_17122);
var state_17221__$1 = state_17221;
if(inst_17124){
var statearr_17321_19232 = state_17221__$1;
(statearr_17321_19232[(1)] = (19));

} else {
var statearr_17322_19233 = state_17221__$1;
(statearr_17322_19233[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (38))){
var inst_17200 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17323_19234 = state_17221__$1;
(statearr_17323_19234[(2)] = inst_17200);

(statearr_17323_19234[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (30))){
var state_17221__$1 = state_17221;
var statearr_17324_19235 = state_17221__$1;
(statearr_17324_19235[(2)] = null);

(statearr_17324_19235[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (10))){
var inst_17100 = (state_17221[(14)]);
var inst_17102 = (state_17221[(16)]);
var inst_17110 = cljs.core._nth(inst_17100,inst_17102);
var inst_17111 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17110,(0),null);
var inst_17112 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17110,(1),null);
var state_17221__$1 = (function (){var statearr_17325 = state_17221;
(statearr_17325[(24)] = inst_17111);

return statearr_17325;
})();
if(cljs.core.truth_(inst_17112)){
var statearr_17326_19236 = state_17221__$1;
(statearr_17326_19236[(1)] = (13));

} else {
var statearr_17327_19237 = state_17221__$1;
(statearr_17327_19237[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (18))){
var inst_17148 = (state_17221[(2)]);
var state_17221__$1 = state_17221;
var statearr_17328_19238 = state_17221__$1;
(statearr_17328_19238[(2)] = inst_17148);

(statearr_17328_19238[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (42))){
var state_17221__$1 = state_17221;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17221__$1,(45),dchan);
} else {
if((state_val_17222 === (37))){
var inst_17181 = (state_17221[(23)]);
var inst_17190 = (state_17221[(22)]);
var inst_17090 = (state_17221[(12)]);
var inst_17190__$1 = cljs.core.first(inst_17181);
var inst_17191 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_17190__$1,inst_17090,done);
var state_17221__$1 = (function (){var statearr_17329 = state_17221;
(statearr_17329[(22)] = inst_17190__$1);

return statearr_17329;
})();
if(cljs.core.truth_(inst_17191)){
var statearr_17330_19239 = state_17221__$1;
(statearr_17330_19239[(1)] = (39));

} else {
var statearr_17331_19240 = state_17221__$1;
(statearr_17331_19240[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17222 === (8))){
var inst_17101 = (state_17221[(13)]);
var inst_17102 = (state_17221[(16)]);
var inst_17104 = (inst_17102 < inst_17101);
var inst_17105 = inst_17104;
var state_17221__$1 = state_17221;
if(cljs.core.truth_(inst_17105)){
var statearr_17332_19241 = state_17221__$1;
(statearr_17332_19241[(1)] = (10));

} else {
var statearr_17333_19242 = state_17221__$1;
(statearr_17333_19242[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__15953__auto__ = null;
var cljs$core$async$mult_$_state_machine__15953__auto____0 = (function (){
var statearr_17334 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17334[(0)] = cljs$core$async$mult_$_state_machine__15953__auto__);

(statearr_17334[(1)] = (1));

return statearr_17334;
});
var cljs$core$async$mult_$_state_machine__15953__auto____1 = (function (state_17221){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_17221);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e17336){var ex__15956__auto__ = e17336;
var statearr_17337_19243 = state_17221;
(statearr_17337_19243[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_17221[(4)]))){
var statearr_17338_19244 = state_17221;
(statearr_17338_19244[(1)] = cljs.core.first((state_17221[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19245 = state_17221;
state_17221 = G__19245;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__15953__auto__ = function(state_17221){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__15953__auto____1.call(this,state_17221);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__15953__auto____0;
cljs$core$async$mult_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__15953__auto____1;
return cljs$core$async$mult_$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_17339 = f__16076__auto__();
(statearr_17339[(6)] = c__16075__auto___19173);

return statearr_17339;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__17341 = arguments.length;
switch (G__17341) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_19249 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_19249(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_19250 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_19250(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_19251 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_19251(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_19254 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_19254(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_19255 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_19255(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19256 = arguments.length;
var i__5770__auto___19257 = (0);
while(true){
if((i__5770__auto___19257 < len__5769__auto___19256)){
args__5775__auto__.push((arguments[i__5770__auto___19257]));

var G__19258 = (i__5770__auto___19257 + (1));
i__5770__auto___19257 = G__19258;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__17375){
var map__17376 = p__17375;
var map__17376__$1 = cljs.core.__destructure_map(map__17376);
var opts = map__17376__$1;
var statearr_17377_19259 = state;
(statearr_17377_19259[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_17378_19262 = state;
(statearr_17378_19262[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_17379_19263 = state;
(statearr_17379_19263[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq17370){
var G__17371 = cljs.core.first(seq17370);
var seq17370__$1 = cljs.core.next(seq17370);
var G__17372 = cljs.core.first(seq17370__$1);
var seq17370__$2 = cljs.core.next(seq17370__$1);
var G__17373 = cljs.core.first(seq17370__$2);
var seq17370__$3 = cljs.core.next(seq17370__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17371,G__17372,G__17373,seq17370__$3);
}));

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async17394 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17394 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta17395){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta17395 = meta17395;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17396,meta17395__$1){
var self__ = this;
var _17396__$1 = this;
return (new cljs.core.async.t_cljs$core$async17394(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta17395__$1));
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17396){
var self__ = this;
var _17396__$1 = this;
return self__.meta17395;
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async17394.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async17394.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta17395","meta17395",1686512922,null)], null);
}));

(cljs.core.async.t_cljs$core$async17394.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17394.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17394");

(cljs.core.async.t_cljs$core$async17394.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async17394");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17394.
 */
cljs.core.async.__GT_t_cljs$core$async17394 = (function cljs$core$async$mix_$___GT_t_cljs$core$async17394(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17395){
return (new cljs.core.async.t_cljs$core$async17394(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta17395));
});

}

return (new cljs.core.async.t_cljs$core$async17394(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16075__auto___19266 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_17498){
var state_val_17507 = (state_17498[(1)]);
if((state_val_17507 === (7))){
var inst_17458 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
if(cljs.core.truth_(inst_17458)){
var statearr_17509_19267 = state_17498__$1;
(statearr_17509_19267[(1)] = (8));

} else {
var statearr_17510_19268 = state_17498__$1;
(statearr_17510_19268[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (20))){
var inst_17451 = (state_17498[(7)]);
var state_17498__$1 = state_17498;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17498__$1,(23),out,inst_17451);
} else {
if((state_val_17507 === (1))){
var inst_17434 = calc_state();
var inst_17435 = cljs.core.__destructure_map(inst_17434);
var inst_17436 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17435,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_17437 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17435,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_17438 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17435,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_17439 = inst_17434;
var state_17498__$1 = (function (){var statearr_17515 = state_17498;
(statearr_17515[(8)] = inst_17438);

(statearr_17515[(9)] = inst_17437);

(statearr_17515[(10)] = inst_17439);

(statearr_17515[(11)] = inst_17436);

return statearr_17515;
})();
var statearr_17516_19269 = state_17498__$1;
(statearr_17516_19269[(2)] = null);

(statearr_17516_19269[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (24))){
var inst_17442 = (state_17498[(12)]);
var inst_17439 = inst_17442;
var state_17498__$1 = (function (){var statearr_17517 = state_17498;
(statearr_17517[(10)] = inst_17439);

return statearr_17517;
})();
var statearr_17518_19270 = state_17498__$1;
(statearr_17518_19270[(2)] = null);

(statearr_17518_19270[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (4))){
var inst_17451 = (state_17498[(7)]);
var inst_17453 = (state_17498[(13)]);
var inst_17450 = (state_17498[(2)]);
var inst_17451__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17450,(0),null);
var inst_17452 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17450,(1),null);
var inst_17453__$1 = (inst_17451__$1 == null);
var state_17498__$1 = (function (){var statearr_17520 = state_17498;
(statearr_17520[(7)] = inst_17451__$1);

(statearr_17520[(13)] = inst_17453__$1);

(statearr_17520[(14)] = inst_17452);

return statearr_17520;
})();
if(cljs.core.truth_(inst_17453__$1)){
var statearr_17521_19272 = state_17498__$1;
(statearr_17521_19272[(1)] = (5));

} else {
var statearr_17522_19273 = state_17498__$1;
(statearr_17522_19273[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (15))){
var inst_17443 = (state_17498[(15)]);
var inst_17472 = (state_17498[(16)]);
var inst_17472__$1 = cljs.core.empty_QMARK_(inst_17443);
var state_17498__$1 = (function (){var statearr_17542 = state_17498;
(statearr_17542[(16)] = inst_17472__$1);

return statearr_17542;
})();
if(inst_17472__$1){
var statearr_17543_19275 = state_17498__$1;
(statearr_17543_19275[(1)] = (17));

} else {
var statearr_17544_19276 = state_17498__$1;
(statearr_17544_19276[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (21))){
var inst_17442 = (state_17498[(12)]);
var inst_17439 = inst_17442;
var state_17498__$1 = (function (){var statearr_17545 = state_17498;
(statearr_17545[(10)] = inst_17439);

return statearr_17545;
})();
var statearr_17546_19277 = state_17498__$1;
(statearr_17546_19277[(2)] = null);

(statearr_17546_19277[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (13))){
var inst_17465 = (state_17498[(2)]);
var inst_17466 = calc_state();
var inst_17439 = inst_17466;
var state_17498__$1 = (function (){var statearr_17547 = state_17498;
(statearr_17547[(17)] = inst_17465);

(statearr_17547[(10)] = inst_17439);

return statearr_17547;
})();
var statearr_17548_19278 = state_17498__$1;
(statearr_17548_19278[(2)] = null);

(statearr_17548_19278[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (22))){
var inst_17492 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
var statearr_17553_19279 = state_17498__$1;
(statearr_17553_19279[(2)] = inst_17492);

(statearr_17553_19279[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (6))){
var inst_17452 = (state_17498[(14)]);
var inst_17456 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_17452,change);
var state_17498__$1 = state_17498;
var statearr_17557_19280 = state_17498__$1;
(statearr_17557_19280[(2)] = inst_17456);

(statearr_17557_19280[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (25))){
var state_17498__$1 = state_17498;
var statearr_17562_19281 = state_17498__$1;
(statearr_17562_19281[(2)] = null);

(statearr_17562_19281[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (17))){
var inst_17452 = (state_17498[(14)]);
var inst_17444 = (state_17498[(18)]);
var inst_17474 = (inst_17444.cljs$core$IFn$_invoke$arity$1 ? inst_17444.cljs$core$IFn$_invoke$arity$1(inst_17452) : inst_17444.call(null,inst_17452));
var inst_17475 = cljs.core.not(inst_17474);
var state_17498__$1 = state_17498;
var statearr_17563_19282 = state_17498__$1;
(statearr_17563_19282[(2)] = inst_17475);

(statearr_17563_19282[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (3))){
var inst_17496 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17498__$1,inst_17496);
} else {
if((state_val_17507 === (12))){
var state_17498__$1 = state_17498;
var statearr_17564_19283 = state_17498__$1;
(statearr_17564_19283[(2)] = null);

(statearr_17564_19283[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (2))){
var inst_17439 = (state_17498[(10)]);
var inst_17442 = (state_17498[(12)]);
var inst_17442__$1 = cljs.core.__destructure_map(inst_17439);
var inst_17443 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17442__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_17444 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17442__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_17445 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17442__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_17498__$1 = (function (){var statearr_17565 = state_17498;
(statearr_17565[(15)] = inst_17443);

(statearr_17565[(18)] = inst_17444);

(statearr_17565[(12)] = inst_17442__$1);

return statearr_17565;
})();
return cljs.core.async.ioc_alts_BANG_(state_17498__$1,(4),inst_17445);
} else {
if((state_val_17507 === (23))){
var inst_17483 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
if(cljs.core.truth_(inst_17483)){
var statearr_17566_19284 = state_17498__$1;
(statearr_17566_19284[(1)] = (24));

} else {
var statearr_17567_19285 = state_17498__$1;
(statearr_17567_19285[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (19))){
var inst_17478 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
var statearr_17570_19286 = state_17498__$1;
(statearr_17570_19286[(2)] = inst_17478);

(statearr_17570_19286[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (11))){
var inst_17452 = (state_17498[(14)]);
var inst_17462 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_17452);
var state_17498__$1 = state_17498;
var statearr_17575_19287 = state_17498__$1;
(statearr_17575_19287[(2)] = inst_17462);

(statearr_17575_19287[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (9))){
var inst_17469 = (state_17498[(19)]);
var inst_17443 = (state_17498[(15)]);
var inst_17452 = (state_17498[(14)]);
var inst_17469__$1 = (inst_17443.cljs$core$IFn$_invoke$arity$1 ? inst_17443.cljs$core$IFn$_invoke$arity$1(inst_17452) : inst_17443.call(null,inst_17452));
var state_17498__$1 = (function (){var statearr_17576 = state_17498;
(statearr_17576[(19)] = inst_17469__$1);

return statearr_17576;
})();
if(cljs.core.truth_(inst_17469__$1)){
var statearr_17583_19288 = state_17498__$1;
(statearr_17583_19288[(1)] = (14));

} else {
var statearr_17585_19289 = state_17498__$1;
(statearr_17585_19289[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (5))){
var inst_17453 = (state_17498[(13)]);
var state_17498__$1 = state_17498;
var statearr_17588_19290 = state_17498__$1;
(statearr_17588_19290[(2)] = inst_17453);

(statearr_17588_19290[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (14))){
var inst_17469 = (state_17498[(19)]);
var state_17498__$1 = state_17498;
var statearr_17590_19291 = state_17498__$1;
(statearr_17590_19291[(2)] = inst_17469);

(statearr_17590_19291[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (26))){
var inst_17488 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
var statearr_17592_19292 = state_17498__$1;
(statearr_17592_19292[(2)] = inst_17488);

(statearr_17592_19292[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (16))){
var inst_17480 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
if(cljs.core.truth_(inst_17480)){
var statearr_17596_19293 = state_17498__$1;
(statearr_17596_19293[(1)] = (20));

} else {
var statearr_17598_19294 = state_17498__$1;
(statearr_17598_19294[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (10))){
var inst_17494 = (state_17498[(2)]);
var state_17498__$1 = state_17498;
var statearr_17601_19295 = state_17498__$1;
(statearr_17601_19295[(2)] = inst_17494);

(statearr_17601_19295[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (18))){
var inst_17472 = (state_17498[(16)]);
var state_17498__$1 = state_17498;
var statearr_17611_19296 = state_17498__$1;
(statearr_17611_19296[(2)] = inst_17472);

(statearr_17611_19296[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17507 === (8))){
var inst_17451 = (state_17498[(7)]);
var inst_17460 = (inst_17451 == null);
var state_17498__$1 = state_17498;
if(cljs.core.truth_(inst_17460)){
var statearr_17619_19297 = state_17498__$1;
(statearr_17619_19297[(1)] = (11));

} else {
var statearr_17620_19298 = state_17498__$1;
(statearr_17620_19298[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__15953__auto__ = null;
var cljs$core$async$mix_$_state_machine__15953__auto____0 = (function (){
var statearr_17624 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17624[(0)] = cljs$core$async$mix_$_state_machine__15953__auto__);

(statearr_17624[(1)] = (1));

return statearr_17624;
});
var cljs$core$async$mix_$_state_machine__15953__auto____1 = (function (state_17498){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_17498);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e17626){var ex__15956__auto__ = e17626;
var statearr_17628_19301 = state_17498;
(statearr_17628_19301[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_17498[(4)]))){
var statearr_17630_19302 = state_17498;
(statearr_17630_19302[(1)] = cljs.core.first((state_17498[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19303 = state_17498;
state_17498 = G__19303;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__15953__auto__ = function(state_17498){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__15953__auto____1.call(this,state_17498);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__15953__auto____0;
cljs$core$async$mix_$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__15953__auto____1;
return cljs$core$async$mix_$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_17632 = f__16076__auto__();
(statearr_17632[(6)] = c__16075__auto___19266);

return statearr_17632;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_19304 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_19304(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_19312 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_19312(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_19323 = (function() {
var G__19325 = null;
var G__19325__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__19325__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__19325 = function(p,v){
switch(arguments.length){
case 1:
return G__19325__1.call(this,p);
case 2:
return G__19325__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__19325.cljs$core$IFn$_invoke$arity$1 = G__19325__1;
G__19325.cljs$core$IFn$_invoke$arity$2 = G__19325__2;
return G__19325;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__17701 = arguments.length;
switch (G__17701) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_19323(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_19323(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__17710 = arguments.length;
switch (G__17710) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__17708_SHARP_){
if(cljs.core.truth_((p1__17708_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__17708_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__17708_SHARP_.call(null,topic)))){
return p1__17708_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__17708_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async17714 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17714 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta17715){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta17715 = meta17715;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17716,meta17715__$1){
var self__ = this;
var _17716__$1 = this;
return (new cljs.core.async.t_cljs$core$async17714(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta17715__$1));
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17716){
var self__ = this;
var _17716__$1 = this;
return self__.meta17715;
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async17714.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async17714.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta17715","meta17715",1269119124,null)], null);
}));

(cljs.core.async.t_cljs$core$async17714.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17714.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17714");

(cljs.core.async.t_cljs$core$async17714.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async17714");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17714.
 */
cljs.core.async.__GT_t_cljs$core$async17714 = (function cljs$core$async$__GT_t_cljs$core$async17714(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta17715){
return (new cljs.core.async.t_cljs$core$async17714(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta17715));
});

}

return (new cljs.core.async.t_cljs$core$async17714(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__16075__auto___19353 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_17804){
var state_val_17805 = (state_17804[(1)]);
if((state_val_17805 === (7))){
var inst_17798 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17806_19357 = state_17804__$1;
(statearr_17806_19357[(2)] = inst_17798);

(statearr_17806_19357[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (20))){
var state_17804__$1 = state_17804;
var statearr_17807_19359 = state_17804__$1;
(statearr_17807_19359[(2)] = null);

(statearr_17807_19359[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (1))){
var state_17804__$1 = state_17804;
var statearr_17820_19363 = state_17804__$1;
(statearr_17820_19363[(2)] = null);

(statearr_17820_19363[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (24))){
var inst_17780 = (state_17804[(7)]);
var inst_17790 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_17780);
var state_17804__$1 = state_17804;
var statearr_17829_19364 = state_17804__$1;
(statearr_17829_19364[(2)] = inst_17790);

(statearr_17829_19364[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (4))){
var inst_17732 = (state_17804[(8)]);
var inst_17732__$1 = (state_17804[(2)]);
var inst_17733 = (inst_17732__$1 == null);
var state_17804__$1 = (function (){var statearr_17830 = state_17804;
(statearr_17830[(8)] = inst_17732__$1);

return statearr_17830;
})();
if(cljs.core.truth_(inst_17733)){
var statearr_17831_19365 = state_17804__$1;
(statearr_17831_19365[(1)] = (5));

} else {
var statearr_17832_19366 = state_17804__$1;
(statearr_17832_19366[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (15))){
var inst_17774 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17833_19374 = state_17804__$1;
(statearr_17833_19374[(2)] = inst_17774);

(statearr_17833_19374[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (21))){
var inst_17795 = (state_17804[(2)]);
var state_17804__$1 = (function (){var statearr_17834 = state_17804;
(statearr_17834[(9)] = inst_17795);

return statearr_17834;
})();
var statearr_17835_19378 = state_17804__$1;
(statearr_17835_19378[(2)] = null);

(statearr_17835_19378[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (13))){
var inst_17756 = (state_17804[(10)]);
var inst_17758 = cljs.core.chunked_seq_QMARK_(inst_17756);
var state_17804__$1 = state_17804;
if(inst_17758){
var statearr_17836_19387 = state_17804__$1;
(statearr_17836_19387[(1)] = (16));

} else {
var statearr_17838_19388 = state_17804__$1;
(statearr_17838_19388[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (22))){
var inst_17787 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
if(cljs.core.truth_(inst_17787)){
var statearr_17839_19392 = state_17804__$1;
(statearr_17839_19392[(1)] = (23));

} else {
var statearr_17840_19393 = state_17804__$1;
(statearr_17840_19393[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (6))){
var inst_17732 = (state_17804[(8)]);
var inst_17782 = (state_17804[(11)]);
var inst_17780 = (state_17804[(7)]);
var inst_17780__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_17732) : topic_fn.call(null,inst_17732));
var inst_17781 = cljs.core.deref(mults);
var inst_17782__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17781,inst_17780__$1);
var state_17804__$1 = (function (){var statearr_17841 = state_17804;
(statearr_17841[(11)] = inst_17782__$1);

(statearr_17841[(7)] = inst_17780__$1);

return statearr_17841;
})();
if(cljs.core.truth_(inst_17782__$1)){
var statearr_17842_19398 = state_17804__$1;
(statearr_17842_19398[(1)] = (19));

} else {
var statearr_17843_19402 = state_17804__$1;
(statearr_17843_19402[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (25))){
var inst_17792 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17844_19403 = state_17804__$1;
(statearr_17844_19403[(2)] = inst_17792);

(statearr_17844_19403[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (17))){
var inst_17756 = (state_17804[(10)]);
var inst_17765 = cljs.core.first(inst_17756);
var inst_17766 = cljs.core.async.muxch_STAR_(inst_17765);
var inst_17767 = cljs.core.async.close_BANG_(inst_17766);
var inst_17768 = cljs.core.next(inst_17756);
var inst_17742 = inst_17768;
var inst_17743 = null;
var inst_17744 = (0);
var inst_17745 = (0);
var state_17804__$1 = (function (){var statearr_17849 = state_17804;
(statearr_17849[(12)] = inst_17743);

(statearr_17849[(13)] = inst_17767);

(statearr_17849[(14)] = inst_17745);

(statearr_17849[(15)] = inst_17744);

(statearr_17849[(16)] = inst_17742);

return statearr_17849;
})();
var statearr_17850_19406 = state_17804__$1;
(statearr_17850_19406[(2)] = null);

(statearr_17850_19406[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (3))){
var inst_17800 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17804__$1,inst_17800);
} else {
if((state_val_17805 === (12))){
var inst_17776 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17851_19407 = state_17804__$1;
(statearr_17851_19407[(2)] = inst_17776);

(statearr_17851_19407[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (2))){
var state_17804__$1 = state_17804;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17804__$1,(4),ch);
} else {
if((state_val_17805 === (23))){
var state_17804__$1 = state_17804;
var statearr_17852_19411 = state_17804__$1;
(statearr_17852_19411[(2)] = null);

(statearr_17852_19411[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (19))){
var inst_17732 = (state_17804[(8)]);
var inst_17782 = (state_17804[(11)]);
var inst_17785 = cljs.core.async.muxch_STAR_(inst_17782);
var state_17804__$1 = state_17804;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17804__$1,(22),inst_17785,inst_17732);
} else {
if((state_val_17805 === (11))){
var inst_17742 = (state_17804[(16)]);
var inst_17756 = (state_17804[(10)]);
var inst_17756__$1 = cljs.core.seq(inst_17742);
var state_17804__$1 = (function (){var statearr_17861 = state_17804;
(statearr_17861[(10)] = inst_17756__$1);

return statearr_17861;
})();
if(inst_17756__$1){
var statearr_17862_19413 = state_17804__$1;
(statearr_17862_19413[(1)] = (13));

} else {
var statearr_17863_19414 = state_17804__$1;
(statearr_17863_19414[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (9))){
var inst_17778 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17864_19415 = state_17804__$1;
(statearr_17864_19415[(2)] = inst_17778);

(statearr_17864_19415[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (5))){
var inst_17739 = cljs.core.deref(mults);
var inst_17740 = cljs.core.vals(inst_17739);
var inst_17741 = cljs.core.seq(inst_17740);
var inst_17742 = inst_17741;
var inst_17743 = null;
var inst_17744 = (0);
var inst_17745 = (0);
var state_17804__$1 = (function (){var statearr_17865 = state_17804;
(statearr_17865[(12)] = inst_17743);

(statearr_17865[(14)] = inst_17745);

(statearr_17865[(15)] = inst_17744);

(statearr_17865[(16)] = inst_17742);

return statearr_17865;
})();
var statearr_17866_19416 = state_17804__$1;
(statearr_17866_19416[(2)] = null);

(statearr_17866_19416[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (14))){
var state_17804__$1 = state_17804;
var statearr_17870_19420 = state_17804__$1;
(statearr_17870_19420[(2)] = null);

(statearr_17870_19420[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (16))){
var inst_17756 = (state_17804[(10)]);
var inst_17760 = cljs.core.chunk_first(inst_17756);
var inst_17761 = cljs.core.chunk_rest(inst_17756);
var inst_17762 = cljs.core.count(inst_17760);
var inst_17742 = inst_17761;
var inst_17743 = inst_17760;
var inst_17744 = inst_17762;
var inst_17745 = (0);
var state_17804__$1 = (function (){var statearr_17871 = state_17804;
(statearr_17871[(12)] = inst_17743);

(statearr_17871[(14)] = inst_17745);

(statearr_17871[(15)] = inst_17744);

(statearr_17871[(16)] = inst_17742);

return statearr_17871;
})();
var statearr_17873_19422 = state_17804__$1;
(statearr_17873_19422[(2)] = null);

(statearr_17873_19422[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (10))){
var inst_17743 = (state_17804[(12)]);
var inst_17745 = (state_17804[(14)]);
var inst_17744 = (state_17804[(15)]);
var inst_17742 = (state_17804[(16)]);
var inst_17750 = cljs.core._nth(inst_17743,inst_17745);
var inst_17751 = cljs.core.async.muxch_STAR_(inst_17750);
var inst_17752 = cljs.core.async.close_BANG_(inst_17751);
var inst_17753 = (inst_17745 + (1));
var tmp17867 = inst_17743;
var tmp17868 = inst_17744;
var tmp17869 = inst_17742;
var inst_17742__$1 = tmp17869;
var inst_17743__$1 = tmp17867;
var inst_17744__$1 = tmp17868;
var inst_17745__$1 = inst_17753;
var state_17804__$1 = (function (){var statearr_17874 = state_17804;
(statearr_17874[(12)] = inst_17743__$1);

(statearr_17874[(17)] = inst_17752);

(statearr_17874[(14)] = inst_17745__$1);

(statearr_17874[(15)] = inst_17744__$1);

(statearr_17874[(16)] = inst_17742__$1);

return statearr_17874;
})();
var statearr_17875_19427 = state_17804__$1;
(statearr_17875_19427[(2)] = null);

(statearr_17875_19427[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (18))){
var inst_17771 = (state_17804[(2)]);
var state_17804__$1 = state_17804;
var statearr_17876_19428 = state_17804__$1;
(statearr_17876_19428[(2)] = inst_17771);

(statearr_17876_19428[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17805 === (8))){
var inst_17745 = (state_17804[(14)]);
var inst_17744 = (state_17804[(15)]);
var inst_17747 = (inst_17745 < inst_17744);
var inst_17748 = inst_17747;
var state_17804__$1 = state_17804;
if(cljs.core.truth_(inst_17748)){
var statearr_17883_19430 = state_17804__$1;
(statearr_17883_19430[(1)] = (10));

} else {
var statearr_17884_19431 = state_17804__$1;
(statearr_17884_19431[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_17885 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17885[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_17885[(1)] = (1));

return statearr_17885;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_17804){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_17804);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e17886){var ex__15956__auto__ = e17886;
var statearr_17887_19432 = state_17804;
(statearr_17887_19432[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_17804[(4)]))){
var statearr_17888_19433 = state_17804;
(statearr_17888_19433[(1)] = cljs.core.first((state_17804[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19434 = state_17804;
state_17804 = G__19434;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_17804){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_17804);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_17889 = f__16076__auto__();
(statearr_17889[(6)] = c__16075__auto___19353);

return statearr_17889;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__17892 = arguments.length;
switch (G__17892) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__17895 = arguments.length;
switch (G__17895) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__17897 = arguments.length;
switch (G__17897) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__16075__auto___19453 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_17946){
var state_val_17947 = (state_17946[(1)]);
if((state_val_17947 === (7))){
var state_17946__$1 = state_17946;
var statearr_17952_19455 = state_17946__$1;
(statearr_17952_19455[(2)] = null);

(statearr_17952_19455[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (1))){
var state_17946__$1 = state_17946;
var statearr_17955_19458 = state_17946__$1;
(statearr_17955_19458[(2)] = null);

(statearr_17955_19458[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (4))){
var inst_17906 = (state_17946[(7)]);
var inst_17907 = (state_17946[(8)]);
var inst_17909 = (inst_17907 < inst_17906);
var state_17946__$1 = state_17946;
if(cljs.core.truth_(inst_17909)){
var statearr_17958_19459 = state_17946__$1;
(statearr_17958_19459[(1)] = (6));

} else {
var statearr_17959_19463 = state_17946__$1;
(statearr_17959_19463[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (15))){
var inst_17932 = (state_17946[(9)]);
var inst_17937 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_17932);
var state_17946__$1 = state_17946;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17946__$1,(17),out,inst_17937);
} else {
if((state_val_17947 === (13))){
var inst_17932 = (state_17946[(9)]);
var inst_17932__$1 = (state_17946[(2)]);
var inst_17933 = cljs.core.some(cljs.core.nil_QMARK_,inst_17932__$1);
var state_17946__$1 = (function (){var statearr_17965 = state_17946;
(statearr_17965[(9)] = inst_17932__$1);

return statearr_17965;
})();
if(cljs.core.truth_(inst_17933)){
var statearr_17969_19465 = state_17946__$1;
(statearr_17969_19465[(1)] = (14));

} else {
var statearr_17970_19466 = state_17946__$1;
(statearr_17970_19466[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (6))){
var state_17946__$1 = state_17946;
var statearr_17971_19470 = state_17946__$1;
(statearr_17971_19470[(2)] = null);

(statearr_17971_19470[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (17))){
var inst_17939 = (state_17946[(2)]);
var state_17946__$1 = (function (){var statearr_17981 = state_17946;
(statearr_17981[(10)] = inst_17939);

return statearr_17981;
})();
var statearr_17982_19472 = state_17946__$1;
(statearr_17982_19472[(2)] = null);

(statearr_17982_19472[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (3))){
var inst_17944 = (state_17946[(2)]);
var state_17946__$1 = state_17946;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17946__$1,inst_17944);
} else {
if((state_val_17947 === (12))){
var _ = (function (){var statearr_17983 = state_17946;
(statearr_17983[(4)] = cljs.core.rest((state_17946[(4)])));

return statearr_17983;
})();
var state_17946__$1 = state_17946;
var ex17980 = (state_17946__$1[(2)]);
var statearr_17986_19474 = state_17946__$1;
(statearr_17986_19474[(5)] = ex17980);


if((ex17980 instanceof Object)){
var statearr_17987_19475 = state_17946__$1;
(statearr_17987_19475[(1)] = (11));

(statearr_17987_19475[(5)] = null);

} else {
throw ex17980;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (2))){
var inst_17905 = cljs.core.reset_BANG_(dctr,cnt);
var inst_17906 = cnt;
var inst_17907 = (0);
var state_17946__$1 = (function (){var statearr_17991 = state_17946;
(statearr_17991[(7)] = inst_17906);

(statearr_17991[(11)] = inst_17905);

(statearr_17991[(8)] = inst_17907);

return statearr_17991;
})();
var statearr_17994_19477 = state_17946__$1;
(statearr_17994_19477[(2)] = null);

(statearr_17994_19477[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (11))){
var inst_17911 = (state_17946[(2)]);
var inst_17912 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_17946__$1 = (function (){var statearr_17997 = state_17946;
(statearr_17997[(12)] = inst_17911);

return statearr_17997;
})();
var statearr_18003_19478 = state_17946__$1;
(statearr_18003_19478[(2)] = inst_17912);

(statearr_18003_19478[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (9))){
var inst_17907 = (state_17946[(8)]);
var _ = (function (){var statearr_18005 = state_17946;
(statearr_18005[(4)] = cljs.core.cons((12),(state_17946[(4)])));

return statearr_18005;
})();
var inst_17918 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_17907) : chs__$1.call(null,inst_17907));
var inst_17919 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_17907) : done.call(null,inst_17907));
var inst_17920 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_17918,inst_17919);
var ___$1 = (function (){var statearr_18007 = state_17946;
(statearr_18007[(4)] = cljs.core.rest((state_17946[(4)])));

return statearr_18007;
})();
var state_17946__$1 = state_17946;
var statearr_18041_19480 = state_17946__$1;
(statearr_18041_19480[(2)] = inst_17920);

(statearr_18041_19480[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (5))){
var inst_17930 = (state_17946[(2)]);
var state_17946__$1 = (function (){var statearr_18046 = state_17946;
(statearr_18046[(13)] = inst_17930);

return statearr_18046;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17946__$1,(13),dchan);
} else {
if((state_val_17947 === (14))){
var inst_17935 = cljs.core.async.close_BANG_(out);
var state_17946__$1 = state_17946;
var statearr_18047_19485 = state_17946__$1;
(statearr_18047_19485[(2)] = inst_17935);

(statearr_18047_19485[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (16))){
var inst_17942 = (state_17946[(2)]);
var state_17946__$1 = state_17946;
var statearr_18049_19486 = state_17946__$1;
(statearr_18049_19486[(2)] = inst_17942);

(statearr_18049_19486[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (10))){
var inst_17907 = (state_17946[(8)]);
var inst_17923 = (state_17946[(2)]);
var inst_17924 = (inst_17907 + (1));
var inst_17907__$1 = inst_17924;
var state_17946__$1 = (function (){var statearr_18050 = state_17946;
(statearr_18050[(14)] = inst_17923);

(statearr_18050[(8)] = inst_17907__$1);

return statearr_18050;
})();
var statearr_18052_19491 = state_17946__$1;
(statearr_18052_19491[(2)] = null);

(statearr_18052_19491[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17947 === (8))){
var inst_17928 = (state_17946[(2)]);
var state_17946__$1 = state_17946;
var statearr_18056_19496 = state_17946__$1;
(statearr_18056_19496[(2)] = inst_17928);

(statearr_18056_19496[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18057 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18057[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18057[(1)] = (1));

return statearr_18057;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_17946){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_17946);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18058){var ex__15956__auto__ = e18058;
var statearr_18059_19499 = state_17946;
(statearr_18059_19499[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_17946[(4)]))){
var statearr_18060_19500 = state_17946;
(statearr_18060_19500[(1)] = cljs.core.first((state_17946[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19506 = state_17946;
state_17946 = G__19506;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_17946){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_17946);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18061 = f__16076__auto__();
(statearr_18061[(6)] = c__16075__auto___19453);

return statearr_18061;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__18064 = arguments.length;
switch (G__18064) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19516 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18101){
var state_val_18102 = (state_18101[(1)]);
if((state_val_18102 === (7))){
var inst_18076 = (state_18101[(7)]);
var inst_18075 = (state_18101[(8)]);
var inst_18075__$1 = (state_18101[(2)]);
var inst_18076__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18075__$1,(0),null);
var inst_18077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18075__$1,(1),null);
var inst_18078 = (inst_18076__$1 == null);
var state_18101__$1 = (function (){var statearr_18106 = state_18101;
(statearr_18106[(7)] = inst_18076__$1);

(statearr_18106[(8)] = inst_18075__$1);

(statearr_18106[(9)] = inst_18077);

return statearr_18106;
})();
if(cljs.core.truth_(inst_18078)){
var statearr_18107_19527 = state_18101__$1;
(statearr_18107_19527[(1)] = (8));

} else {
var statearr_18110_19528 = state_18101__$1;
(statearr_18110_19528[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (1))){
var inst_18065 = cljs.core.vec(chs);
var inst_18066 = inst_18065;
var state_18101__$1 = (function (){var statearr_18111 = state_18101;
(statearr_18111[(10)] = inst_18066);

return statearr_18111;
})();
var statearr_18112_19529 = state_18101__$1;
(statearr_18112_19529[(2)] = null);

(statearr_18112_19529[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (4))){
var inst_18066 = (state_18101[(10)]);
var state_18101__$1 = state_18101;
return cljs.core.async.ioc_alts_BANG_(state_18101__$1,(7),inst_18066);
} else {
if((state_val_18102 === (6))){
var inst_18092 = (state_18101[(2)]);
var state_18101__$1 = state_18101;
var statearr_18116_19530 = state_18101__$1;
(statearr_18116_19530[(2)] = inst_18092);

(statearr_18116_19530[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (3))){
var inst_18094 = (state_18101[(2)]);
var state_18101__$1 = state_18101;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18101__$1,inst_18094);
} else {
if((state_val_18102 === (2))){
var inst_18066 = (state_18101[(10)]);
var inst_18068 = cljs.core.count(inst_18066);
var inst_18069 = (inst_18068 > (0));
var state_18101__$1 = state_18101;
if(cljs.core.truth_(inst_18069)){
var statearr_18119_19535 = state_18101__$1;
(statearr_18119_19535[(1)] = (4));

} else {
var statearr_18120_19536 = state_18101__$1;
(statearr_18120_19536[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (11))){
var inst_18066 = (state_18101[(10)]);
var inst_18085 = (state_18101[(2)]);
var tmp18118 = inst_18066;
var inst_18066__$1 = tmp18118;
var state_18101__$1 = (function (){var statearr_18121 = state_18101;
(statearr_18121[(10)] = inst_18066__$1);

(statearr_18121[(11)] = inst_18085);

return statearr_18121;
})();
var statearr_18122_19537 = state_18101__$1;
(statearr_18122_19537[(2)] = null);

(statearr_18122_19537[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (9))){
var inst_18076 = (state_18101[(7)]);
var state_18101__$1 = state_18101;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18101__$1,(11),out,inst_18076);
} else {
if((state_val_18102 === (5))){
var inst_18090 = cljs.core.async.close_BANG_(out);
var state_18101__$1 = state_18101;
var statearr_18132_19538 = state_18101__$1;
(statearr_18132_19538[(2)] = inst_18090);

(statearr_18132_19538[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (10))){
var inst_18088 = (state_18101[(2)]);
var state_18101__$1 = state_18101;
var statearr_18133_19539 = state_18101__$1;
(statearr_18133_19539[(2)] = inst_18088);

(statearr_18133_19539[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18102 === (8))){
var inst_18066 = (state_18101[(10)]);
var inst_18076 = (state_18101[(7)]);
var inst_18075 = (state_18101[(8)]);
var inst_18077 = (state_18101[(9)]);
var inst_18080 = (function (){var cs = inst_18066;
var vec__18071 = inst_18075;
var v = inst_18076;
var c = inst_18077;
return (function (p1__18062_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__18062_SHARP_);
});
})();
var inst_18081 = cljs.core.filterv(inst_18080,inst_18066);
var inst_18066__$1 = inst_18081;
var state_18101__$1 = (function (){var statearr_18134 = state_18101;
(statearr_18134[(10)] = inst_18066__$1);

return statearr_18134;
})();
var statearr_18135_19540 = state_18101__$1;
(statearr_18135_19540[(2)] = null);

(statearr_18135_19540[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18136 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18136[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18136[(1)] = (1));

return statearr_18136;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18101){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18101);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18137){var ex__15956__auto__ = e18137;
var statearr_18138_19541 = state_18101;
(statearr_18138_19541[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18101[(4)]))){
var statearr_18139_19542 = state_18101;
(statearr_18139_19542[(1)] = cljs.core.first((state_18101[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19543 = state_18101;
state_18101 = G__19543;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18101){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18101);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18140 = f__16076__auto__();
(statearr_18140[(6)] = c__16075__auto___19516);

return statearr_18140;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__18142 = arguments.length;
switch (G__18142) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19549 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18166){
var state_val_18167 = (state_18166[(1)]);
if((state_val_18167 === (7))){
var inst_18148 = (state_18166[(7)]);
var inst_18148__$1 = (state_18166[(2)]);
var inst_18149 = (inst_18148__$1 == null);
var inst_18150 = cljs.core.not(inst_18149);
var state_18166__$1 = (function (){var statearr_18168 = state_18166;
(statearr_18168[(7)] = inst_18148__$1);

return statearr_18168;
})();
if(inst_18150){
var statearr_18173_19552 = state_18166__$1;
(statearr_18173_19552[(1)] = (8));

} else {
var statearr_18174_19558 = state_18166__$1;
(statearr_18174_19558[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (1))){
var inst_18143 = (0);
var state_18166__$1 = (function (){var statearr_18175 = state_18166;
(statearr_18175[(8)] = inst_18143);

return statearr_18175;
})();
var statearr_18181_19559 = state_18166__$1;
(statearr_18181_19559[(2)] = null);

(statearr_18181_19559[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (4))){
var state_18166__$1 = state_18166;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18166__$1,(7),ch);
} else {
if((state_val_18167 === (6))){
var inst_18161 = (state_18166[(2)]);
var state_18166__$1 = state_18166;
var statearr_18182_19560 = state_18166__$1;
(statearr_18182_19560[(2)] = inst_18161);

(statearr_18182_19560[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (3))){
var inst_18163 = (state_18166[(2)]);
var inst_18164 = cljs.core.async.close_BANG_(out);
var state_18166__$1 = (function (){var statearr_18188 = state_18166;
(statearr_18188[(9)] = inst_18163);

return statearr_18188;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18166__$1,inst_18164);
} else {
if((state_val_18167 === (2))){
var inst_18143 = (state_18166[(8)]);
var inst_18145 = (inst_18143 < n);
var state_18166__$1 = state_18166;
if(cljs.core.truth_(inst_18145)){
var statearr_18189_19561 = state_18166__$1;
(statearr_18189_19561[(1)] = (4));

} else {
var statearr_18190_19562 = state_18166__$1;
(statearr_18190_19562[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (11))){
var inst_18143 = (state_18166[(8)]);
var inst_18153 = (state_18166[(2)]);
var inst_18154 = (inst_18143 + (1));
var inst_18143__$1 = inst_18154;
var state_18166__$1 = (function (){var statearr_18191 = state_18166;
(statearr_18191[(8)] = inst_18143__$1);

(statearr_18191[(10)] = inst_18153);

return statearr_18191;
})();
var statearr_18192_19563 = state_18166__$1;
(statearr_18192_19563[(2)] = null);

(statearr_18192_19563[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (9))){
var state_18166__$1 = state_18166;
var statearr_18193_19564 = state_18166__$1;
(statearr_18193_19564[(2)] = null);

(statearr_18193_19564[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (5))){
var state_18166__$1 = state_18166;
var statearr_18194_19565 = state_18166__$1;
(statearr_18194_19565[(2)] = null);

(statearr_18194_19565[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (10))){
var inst_18158 = (state_18166[(2)]);
var state_18166__$1 = state_18166;
var statearr_18195_19566 = state_18166__$1;
(statearr_18195_19566[(2)] = inst_18158);

(statearr_18195_19566[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18167 === (8))){
var inst_18148 = (state_18166[(7)]);
var state_18166__$1 = state_18166;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18166__$1,(11),out,inst_18148);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18196 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18196[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18196[(1)] = (1));

return statearr_18196;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18166){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18166);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18197){var ex__15956__auto__ = e18197;
var statearr_18198_19567 = state_18166;
(statearr_18198_19567[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18166[(4)]))){
var statearr_18199_19568 = state_18166;
(statearr_18199_19568[(1)] = cljs.core.first((state_18166[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19569 = state_18166;
state_18166 = G__19569;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18166){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18166);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18201 = f__16076__auto__();
(statearr_18201[(6)] = c__16075__auto___19549);

return statearr_18201;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18204 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18204 = (function (f,ch,meta18205){
this.f = f;
this.ch = ch;
this.meta18205 = meta18205;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18206,meta18205__$1){
var self__ = this;
var _18206__$1 = this;
return (new cljs.core.async.t_cljs$core$async18204(self__.f,self__.ch,meta18205__$1));
}));

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18206){
var self__ = this;
var _18206__$1 = this;
return self__.meta18205;
}));

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18216 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18216 = (function (f,ch,meta18205,_,fn1,meta18217){
this.f = f;
this.ch = ch;
this.meta18205 = meta18205;
this._ = _;
this.fn1 = fn1;
this.meta18217 = meta18217;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18218,meta18217__$1){
var self__ = this;
var _18218__$1 = this;
return (new cljs.core.async.t_cljs$core$async18216(self__.f,self__.ch,self__.meta18205,self__._,self__.fn1,meta18217__$1));
}));

(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18218){
var self__ = this;
var _18218__$1 = this;
return self__.meta18217;
}));

(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18216.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__18203_SHARP_){
var G__18223 = (((p1__18203_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__18203_SHARP_) : self__.f.call(null,p1__18203_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__18223) : f1.call(null,G__18223));
});
}));

(cljs.core.async.t_cljs$core$async18216.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18205","meta18205",-1424604534,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async18204","cljs.core.async/t_cljs$core$async18204",-1461530554,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta18217","meta18217",-2134119582,null)], null);
}));

(cljs.core.async.t_cljs$core$async18216.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18216.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18216");

(cljs.core.async.t_cljs$core$async18216.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async18216");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18216.
 */
cljs.core.async.__GT_t_cljs$core$async18216 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18216(f__$1,ch__$1,meta18205__$1,___$2,fn1__$1,meta18217){
return (new cljs.core.async.t_cljs$core$async18216(f__$1,ch__$1,meta18205__$1,___$2,fn1__$1,meta18217));
});

}

return (new cljs.core.async.t_cljs$core$async18216(self__.f,self__.ch,self__.meta18205,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__18224 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__18224) : self__.f.call(null,G__18224));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18204.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async18204.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18205","meta18205",-1424604534,null)], null);
}));

(cljs.core.async.t_cljs$core$async18204.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18204.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18204");

(cljs.core.async.t_cljs$core$async18204.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async18204");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18204.
 */
cljs.core.async.__GT_t_cljs$core$async18204 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async18204(f__$1,ch__$1,meta18205){
return (new cljs.core.async.t_cljs$core$async18204(f__$1,ch__$1,meta18205));
});

}

return (new cljs.core.async.t_cljs$core$async18204(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18227 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18227 = (function (f,ch,meta18228){
this.f = f;
this.ch = ch;
this.meta18228 = meta18228;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18229,meta18228__$1){
var self__ = this;
var _18229__$1 = this;
return (new cljs.core.async.t_cljs$core$async18227(self__.f,self__.ch,meta18228__$1));
}));

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18229){
var self__ = this;
var _18229__$1 = this;
return self__.meta18228;
}));

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18227.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async18227.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18228","meta18228",-1826500724,null)], null);
}));

(cljs.core.async.t_cljs$core$async18227.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18227.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18227");

(cljs.core.async.t_cljs$core$async18227.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async18227");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18227.
 */
cljs.core.async.__GT_t_cljs$core$async18227 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async18227(f__$1,ch__$1,meta18228){
return (new cljs.core.async.t_cljs$core$async18227(f__$1,ch__$1,meta18228));
});

}

return (new cljs.core.async.t_cljs$core$async18227(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18232 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18232 = (function (p,ch,meta18233){
this.p = p;
this.ch = ch;
this.meta18233 = meta18233;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18234,meta18233__$1){
var self__ = this;
var _18234__$1 = this;
return (new cljs.core.async.t_cljs$core$async18232(self__.p,self__.ch,meta18233__$1));
}));

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18234){
var self__ = this;
var _18234__$1 = this;
return self__.meta18233;
}));

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18232.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async18232.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta18233","meta18233",-257544938,null)], null);
}));

(cljs.core.async.t_cljs$core$async18232.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18232.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18232");

(cljs.core.async.t_cljs$core$async18232.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async18232");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18232.
 */
cljs.core.async.__GT_t_cljs$core$async18232 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async18232(p__$1,ch__$1,meta18233){
return (new cljs.core.async.t_cljs$core$async18232(p__$1,ch__$1,meta18233));
});

}

return (new cljs.core.async.t_cljs$core$async18232(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__18239 = arguments.length;
switch (G__18239) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19585 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18261){
var state_val_18262 = (state_18261[(1)]);
if((state_val_18262 === (7))){
var inst_18257 = (state_18261[(2)]);
var state_18261__$1 = state_18261;
var statearr_18265_19586 = state_18261__$1;
(statearr_18265_19586[(2)] = inst_18257);

(statearr_18265_19586[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (1))){
var state_18261__$1 = state_18261;
var statearr_18266_19587 = state_18261__$1;
(statearr_18266_19587[(2)] = null);

(statearr_18266_19587[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (4))){
var inst_18243 = (state_18261[(7)]);
var inst_18243__$1 = (state_18261[(2)]);
var inst_18244 = (inst_18243__$1 == null);
var state_18261__$1 = (function (){var statearr_18268 = state_18261;
(statearr_18268[(7)] = inst_18243__$1);

return statearr_18268;
})();
if(cljs.core.truth_(inst_18244)){
var statearr_18269_19588 = state_18261__$1;
(statearr_18269_19588[(1)] = (5));

} else {
var statearr_18270_19589 = state_18261__$1;
(statearr_18270_19589[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (6))){
var inst_18243 = (state_18261[(7)]);
var inst_18248 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_18243) : p.call(null,inst_18243));
var state_18261__$1 = state_18261;
if(cljs.core.truth_(inst_18248)){
var statearr_18271_19590 = state_18261__$1;
(statearr_18271_19590[(1)] = (8));

} else {
var statearr_18272_19591 = state_18261__$1;
(statearr_18272_19591[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (3))){
var inst_18259 = (state_18261[(2)]);
var state_18261__$1 = state_18261;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18261__$1,inst_18259);
} else {
if((state_val_18262 === (2))){
var state_18261__$1 = state_18261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18261__$1,(4),ch);
} else {
if((state_val_18262 === (11))){
var inst_18251 = (state_18261[(2)]);
var state_18261__$1 = state_18261;
var statearr_18274_19592 = state_18261__$1;
(statearr_18274_19592[(2)] = inst_18251);

(statearr_18274_19592[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (9))){
var state_18261__$1 = state_18261;
var statearr_18275_19593 = state_18261__$1;
(statearr_18275_19593[(2)] = null);

(statearr_18275_19593[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (5))){
var inst_18246 = cljs.core.async.close_BANG_(out);
var state_18261__$1 = state_18261;
var statearr_18276_19594 = state_18261__$1;
(statearr_18276_19594[(2)] = inst_18246);

(statearr_18276_19594[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (10))){
var inst_18254 = (state_18261[(2)]);
var state_18261__$1 = (function (){var statearr_18277 = state_18261;
(statearr_18277[(8)] = inst_18254);

return statearr_18277;
})();
var statearr_18278_19595 = state_18261__$1;
(statearr_18278_19595[(2)] = null);

(statearr_18278_19595[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18262 === (8))){
var inst_18243 = (state_18261[(7)]);
var state_18261__$1 = state_18261;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18261__$1,(11),out,inst_18243);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18286 = [null,null,null,null,null,null,null,null,null];
(statearr_18286[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18286[(1)] = (1));

return statearr_18286;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18261){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18261);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18289){var ex__15956__auto__ = e18289;
var statearr_18290_19598 = state_18261;
(statearr_18290_19598[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18261[(4)]))){
var statearr_18291_19599 = state_18261;
(statearr_18291_19599[(1)] = cljs.core.first((state_18261[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19600 = state_18261;
state_18261 = G__19600;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18261){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18261);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18298 = f__16076__auto__();
(statearr_18298[(6)] = c__16075__auto___19585);

return statearr_18298;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__18310 = arguments.length;
switch (G__18310) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__16075__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18419){
var state_val_18420 = (state_18419[(1)]);
if((state_val_18420 === (7))){
var inst_18412 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
var statearr_18427_19603 = state_18419__$1;
(statearr_18427_19603[(2)] = inst_18412);

(statearr_18427_19603[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (20))){
var inst_18367 = (state_18419[(7)]);
var inst_18392 = (state_18419[(2)]);
var inst_18393 = cljs.core.next(inst_18367);
var inst_18343 = inst_18393;
var inst_18344 = null;
var inst_18345 = (0);
var inst_18346 = (0);
var state_18419__$1 = (function (){var statearr_18431 = state_18419;
(statearr_18431[(8)] = inst_18343);

(statearr_18431[(9)] = inst_18344);

(statearr_18431[(10)] = inst_18392);

(statearr_18431[(11)] = inst_18345);

(statearr_18431[(12)] = inst_18346);

return statearr_18431;
})();
var statearr_18433_19608 = state_18419__$1;
(statearr_18433_19608[(2)] = null);

(statearr_18433_19608[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (1))){
var state_18419__$1 = state_18419;
var statearr_18438_19609 = state_18419__$1;
(statearr_18438_19609[(2)] = null);

(statearr_18438_19609[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (4))){
var inst_18329 = (state_18419[(13)]);
var inst_18329__$1 = (state_18419[(2)]);
var inst_18330 = (inst_18329__$1 == null);
var state_18419__$1 = (function (){var statearr_18439 = state_18419;
(statearr_18439[(13)] = inst_18329__$1);

return statearr_18439;
})();
if(cljs.core.truth_(inst_18330)){
var statearr_18440_19611 = state_18419__$1;
(statearr_18440_19611[(1)] = (5));

} else {
var statearr_18445_19612 = state_18419__$1;
(statearr_18445_19612[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (15))){
var state_18419__$1 = state_18419;
var statearr_18452_19614 = state_18419__$1;
(statearr_18452_19614[(2)] = null);

(statearr_18452_19614[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (21))){
var state_18419__$1 = state_18419;
var statearr_18456_19615 = state_18419__$1;
(statearr_18456_19615[(2)] = null);

(statearr_18456_19615[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (13))){
var inst_18343 = (state_18419[(8)]);
var inst_18344 = (state_18419[(9)]);
var inst_18345 = (state_18419[(11)]);
var inst_18346 = (state_18419[(12)]);
var inst_18362 = (state_18419[(2)]);
var inst_18363 = (inst_18346 + (1));
var tmp18447 = inst_18343;
var tmp18449 = inst_18344;
var tmp18450 = inst_18345;
var inst_18343__$1 = tmp18447;
var inst_18344__$1 = tmp18449;
var inst_18345__$1 = tmp18450;
var inst_18346__$1 = inst_18363;
var state_18419__$1 = (function (){var statearr_18464 = state_18419;
(statearr_18464[(8)] = inst_18343__$1);

(statearr_18464[(9)] = inst_18344__$1);

(statearr_18464[(14)] = inst_18362);

(statearr_18464[(11)] = inst_18345__$1);

(statearr_18464[(12)] = inst_18346__$1);

return statearr_18464;
})();
var statearr_18469_19616 = state_18419__$1;
(statearr_18469_19616[(2)] = null);

(statearr_18469_19616[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (22))){
var state_18419__$1 = state_18419;
var statearr_18472_19617 = state_18419__$1;
(statearr_18472_19617[(2)] = null);

(statearr_18472_19617[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (6))){
var inst_18329 = (state_18419[(13)]);
var inst_18341 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18329) : f.call(null,inst_18329));
var inst_18342 = cljs.core.seq(inst_18341);
var inst_18343 = inst_18342;
var inst_18344 = null;
var inst_18345 = (0);
var inst_18346 = (0);
var state_18419__$1 = (function (){var statearr_18480 = state_18419;
(statearr_18480[(8)] = inst_18343);

(statearr_18480[(9)] = inst_18344);

(statearr_18480[(11)] = inst_18345);

(statearr_18480[(12)] = inst_18346);

return statearr_18480;
})();
var statearr_18481_19618 = state_18419__$1;
(statearr_18481_19618[(2)] = null);

(statearr_18481_19618[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (17))){
var inst_18367 = (state_18419[(7)]);
var inst_18377 = cljs.core.chunk_first(inst_18367);
var inst_18378 = cljs.core.chunk_rest(inst_18367);
var inst_18383 = cljs.core.count(inst_18377);
var inst_18343 = inst_18378;
var inst_18344 = inst_18377;
var inst_18345 = inst_18383;
var inst_18346 = (0);
var state_18419__$1 = (function (){var statearr_18485 = state_18419;
(statearr_18485[(8)] = inst_18343);

(statearr_18485[(9)] = inst_18344);

(statearr_18485[(11)] = inst_18345);

(statearr_18485[(12)] = inst_18346);

return statearr_18485;
})();
var statearr_18486_19620 = state_18419__$1;
(statearr_18486_19620[(2)] = null);

(statearr_18486_19620[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (3))){
var inst_18415 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18419__$1,inst_18415);
} else {
if((state_val_18420 === (12))){
var inst_18401 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
var statearr_18495_19623 = state_18419__$1;
(statearr_18495_19623[(2)] = inst_18401);

(statearr_18495_19623[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (2))){
var state_18419__$1 = state_18419;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18419__$1,(4),in$);
} else {
if((state_val_18420 === (23))){
var inst_18410 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
var statearr_18502_19625 = state_18419__$1;
(statearr_18502_19625[(2)] = inst_18410);

(statearr_18502_19625[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (19))){
var inst_18396 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
var statearr_18507_19626 = state_18419__$1;
(statearr_18507_19626[(2)] = inst_18396);

(statearr_18507_19626[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (11))){
var inst_18367 = (state_18419[(7)]);
var inst_18343 = (state_18419[(8)]);
var inst_18367__$1 = cljs.core.seq(inst_18343);
var state_18419__$1 = (function (){var statearr_18514 = state_18419;
(statearr_18514[(7)] = inst_18367__$1);

return statearr_18514;
})();
if(inst_18367__$1){
var statearr_18515_19627 = state_18419__$1;
(statearr_18515_19627[(1)] = (14));

} else {
var statearr_18516_19628 = state_18419__$1;
(statearr_18516_19628[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (9))){
var inst_18403 = (state_18419[(2)]);
var inst_18404 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_18419__$1 = (function (){var statearr_18520 = state_18419;
(statearr_18520[(15)] = inst_18403);

return statearr_18520;
})();
if(cljs.core.truth_(inst_18404)){
var statearr_18525_19629 = state_18419__$1;
(statearr_18525_19629[(1)] = (21));

} else {
var statearr_18526_19630 = state_18419__$1;
(statearr_18526_19630[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (5))){
var inst_18332 = cljs.core.async.close_BANG_(out);
var state_18419__$1 = state_18419;
var statearr_18530_19631 = state_18419__$1;
(statearr_18530_19631[(2)] = inst_18332);

(statearr_18530_19631[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (14))){
var inst_18367 = (state_18419[(7)]);
var inst_18372 = cljs.core.chunked_seq_QMARK_(inst_18367);
var state_18419__$1 = state_18419;
if(inst_18372){
var statearr_18534_19633 = state_18419__$1;
(statearr_18534_19633[(1)] = (17));

} else {
var statearr_18536_19634 = state_18419__$1;
(statearr_18536_19634[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (16))){
var inst_18399 = (state_18419[(2)]);
var state_18419__$1 = state_18419;
var statearr_18543_19635 = state_18419__$1;
(statearr_18543_19635[(2)] = inst_18399);

(statearr_18543_19635[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18420 === (10))){
var inst_18344 = (state_18419[(9)]);
var inst_18346 = (state_18419[(12)]);
var inst_18358 = cljs.core._nth(inst_18344,inst_18346);
var state_18419__$1 = state_18419;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18419__$1,(13),out,inst_18358);
} else {
if((state_val_18420 === (18))){
var inst_18367 = (state_18419[(7)]);
var inst_18386 = cljs.core.first(inst_18367);
var state_18419__$1 = state_18419;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18419__$1,(20),out,inst_18386);
} else {
if((state_val_18420 === (8))){
var inst_18345 = (state_18419[(11)]);
var inst_18346 = (state_18419[(12)]);
var inst_18348 = (inst_18346 < inst_18345);
var inst_18349 = inst_18348;
var state_18419__$1 = state_18419;
if(cljs.core.truth_(inst_18349)){
var statearr_18552_19637 = state_18419__$1;
(statearr_18552_19637[(1)] = (10));

} else {
var statearr_18554_19638 = state_18419__$1;
(statearr_18554_19638[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____0 = (function (){
var statearr_18567 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18567[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__);

(statearr_18567[(1)] = (1));

return statearr_18567;
});
var cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____1 = (function (state_18419){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18419);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18569){var ex__15956__auto__ = e18569;
var statearr_18570_19639 = state_18419;
(statearr_18570_19639[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18419[(4)]))){
var statearr_18573_19640 = state_18419;
(statearr_18573_19640[(1)] = cljs.core.first((state_18419[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19641 = state_18419;
state_18419 = G__19641;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__ = function(state_18419){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____1.call(this,state_18419);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__15953__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18574 = f__16076__auto__();
(statearr_18574[(6)] = c__16075__auto__);

return statearr_18574;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

return c__16075__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__18588 = arguments.length;
switch (G__18588) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__18592 = arguments.length;
switch (G__18592) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__18596 = arguments.length;
switch (G__18596) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19646 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18625){
var state_val_18626 = (state_18625[(1)]);
if((state_val_18626 === (7))){
var inst_18616 = (state_18625[(2)]);
var state_18625__$1 = state_18625;
var statearr_18636_19648 = state_18625__$1;
(statearr_18636_19648[(2)] = inst_18616);

(statearr_18636_19648[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (1))){
var inst_18598 = null;
var state_18625__$1 = (function (){var statearr_18637 = state_18625;
(statearr_18637[(7)] = inst_18598);

return statearr_18637;
})();
var statearr_18638_19649 = state_18625__$1;
(statearr_18638_19649[(2)] = null);

(statearr_18638_19649[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (4))){
var inst_18601 = (state_18625[(8)]);
var inst_18601__$1 = (state_18625[(2)]);
var inst_18602 = (inst_18601__$1 == null);
var inst_18603 = cljs.core.not(inst_18602);
var state_18625__$1 = (function (){var statearr_18639 = state_18625;
(statearr_18639[(8)] = inst_18601__$1);

return statearr_18639;
})();
if(inst_18603){
var statearr_18640_19650 = state_18625__$1;
(statearr_18640_19650[(1)] = (5));

} else {
var statearr_18641_19651 = state_18625__$1;
(statearr_18641_19651[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (6))){
var state_18625__$1 = state_18625;
var statearr_18642_19653 = state_18625__$1;
(statearr_18642_19653[(2)] = null);

(statearr_18642_19653[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (3))){
var inst_18618 = (state_18625[(2)]);
var inst_18619 = cljs.core.async.close_BANG_(out);
var state_18625__$1 = (function (){var statearr_18644 = state_18625;
(statearr_18644[(9)] = inst_18618);

return statearr_18644;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18625__$1,inst_18619);
} else {
if((state_val_18626 === (2))){
var state_18625__$1 = state_18625;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18625__$1,(4),ch);
} else {
if((state_val_18626 === (11))){
var inst_18601 = (state_18625[(8)]);
var inst_18610 = (state_18625[(2)]);
var inst_18598 = inst_18601;
var state_18625__$1 = (function (){var statearr_18645 = state_18625;
(statearr_18645[(7)] = inst_18598);

(statearr_18645[(10)] = inst_18610);

return statearr_18645;
})();
var statearr_18646_19655 = state_18625__$1;
(statearr_18646_19655[(2)] = null);

(statearr_18646_19655[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (9))){
var inst_18601 = (state_18625[(8)]);
var state_18625__$1 = state_18625;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18625__$1,(11),out,inst_18601);
} else {
if((state_val_18626 === (5))){
var inst_18598 = (state_18625[(7)]);
var inst_18601 = (state_18625[(8)]);
var inst_18605 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18601,inst_18598);
var state_18625__$1 = state_18625;
if(inst_18605){
var statearr_18648_19660 = state_18625__$1;
(statearr_18648_19660[(1)] = (8));

} else {
var statearr_18649_19661 = state_18625__$1;
(statearr_18649_19661[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (10))){
var inst_18613 = (state_18625[(2)]);
var state_18625__$1 = state_18625;
var statearr_18651_19662 = state_18625__$1;
(statearr_18651_19662[(2)] = inst_18613);

(statearr_18651_19662[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18626 === (8))){
var inst_18598 = (state_18625[(7)]);
var tmp18647 = inst_18598;
var inst_18598__$1 = tmp18647;
var state_18625__$1 = (function (){var statearr_18652 = state_18625;
(statearr_18652[(7)] = inst_18598__$1);

return statearr_18652;
})();
var statearr_18653_19663 = state_18625__$1;
(statearr_18653_19663[(2)] = null);

(statearr_18653_19663[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18654 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18654[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18654[(1)] = (1));

return statearr_18654;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18625){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18625);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18655){var ex__15956__auto__ = e18655;
var statearr_18656_19664 = state_18625;
(statearr_18656_19664[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18625[(4)]))){
var statearr_18657_19666 = state_18625;
(statearr_18657_19666[(1)] = cljs.core.first((state_18625[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19667 = state_18625;
state_18625 = G__19667;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18625){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18625);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18658 = f__16076__auto__();
(statearr_18658[(6)] = c__16075__auto___19646);

return statearr_18658;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__18661 = arguments.length;
switch (G__18661) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19671 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18701){
var state_val_18702 = (state_18701[(1)]);
if((state_val_18702 === (7))){
var inst_18697 = (state_18701[(2)]);
var state_18701__$1 = state_18701;
var statearr_18703_19672 = state_18701__$1;
(statearr_18703_19672[(2)] = inst_18697);

(statearr_18703_19672[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (1))){
var inst_18662 = (new Array(n));
var inst_18663 = inst_18662;
var inst_18664 = (0);
var state_18701__$1 = (function (){var statearr_18704 = state_18701;
(statearr_18704[(7)] = inst_18664);

(statearr_18704[(8)] = inst_18663);

return statearr_18704;
})();
var statearr_18705_19675 = state_18701__$1;
(statearr_18705_19675[(2)] = null);

(statearr_18705_19675[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (4))){
var inst_18667 = (state_18701[(9)]);
var inst_18667__$1 = (state_18701[(2)]);
var inst_18669 = (inst_18667__$1 == null);
var inst_18670 = cljs.core.not(inst_18669);
var state_18701__$1 = (function (){var statearr_18707 = state_18701;
(statearr_18707[(9)] = inst_18667__$1);

return statearr_18707;
})();
if(inst_18670){
var statearr_18708_19676 = state_18701__$1;
(statearr_18708_19676[(1)] = (5));

} else {
var statearr_18709_19677 = state_18701__$1;
(statearr_18709_19677[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (15))){
var inst_18690 = (state_18701[(2)]);
var state_18701__$1 = state_18701;
var statearr_18710_19678 = state_18701__$1;
(statearr_18710_19678[(2)] = inst_18690);

(statearr_18710_19678[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (13))){
var state_18701__$1 = state_18701;
var statearr_18711_19679 = state_18701__$1;
(statearr_18711_19679[(2)] = null);

(statearr_18711_19679[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (6))){
var inst_18664 = (state_18701[(7)]);
var inst_18686 = (inst_18664 > (0));
var state_18701__$1 = state_18701;
if(cljs.core.truth_(inst_18686)){
var statearr_18712_19680 = state_18701__$1;
(statearr_18712_19680[(1)] = (12));

} else {
var statearr_18713_19681 = state_18701__$1;
(statearr_18713_19681[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (3))){
var inst_18699 = (state_18701[(2)]);
var state_18701__$1 = state_18701;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18701__$1,inst_18699);
} else {
if((state_val_18702 === (12))){
var inst_18663 = (state_18701[(8)]);
var inst_18688 = cljs.core.vec(inst_18663);
var state_18701__$1 = state_18701;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18701__$1,(15),out,inst_18688);
} else {
if((state_val_18702 === (2))){
var state_18701__$1 = state_18701;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18701__$1,(4),ch);
} else {
if((state_val_18702 === (11))){
var inst_18680 = (state_18701[(2)]);
var inst_18681 = (new Array(n));
var inst_18663 = inst_18681;
var inst_18664 = (0);
var state_18701__$1 = (function (){var statearr_18715 = state_18701;
(statearr_18715[(7)] = inst_18664);

(statearr_18715[(10)] = inst_18680);

(statearr_18715[(8)] = inst_18663);

return statearr_18715;
})();
var statearr_18716_19685 = state_18701__$1;
(statearr_18716_19685[(2)] = null);

(statearr_18716_19685[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (9))){
var inst_18663 = (state_18701[(8)]);
var inst_18678 = cljs.core.vec(inst_18663);
var state_18701__$1 = state_18701;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18701__$1,(11),out,inst_18678);
} else {
if((state_val_18702 === (5))){
var inst_18664 = (state_18701[(7)]);
var inst_18667 = (state_18701[(9)]);
var inst_18673 = (state_18701[(11)]);
var inst_18663 = (state_18701[(8)]);
var inst_18672 = (inst_18663[inst_18664] = inst_18667);
var inst_18673__$1 = (inst_18664 + (1));
var inst_18674 = (inst_18673__$1 < n);
var state_18701__$1 = (function (){var statearr_18717 = state_18701;
(statearr_18717[(12)] = inst_18672);

(statearr_18717[(11)] = inst_18673__$1);

return statearr_18717;
})();
if(cljs.core.truth_(inst_18674)){
var statearr_18718_19686 = state_18701__$1;
(statearr_18718_19686[(1)] = (8));

} else {
var statearr_18719_19687 = state_18701__$1;
(statearr_18719_19687[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (14))){
var inst_18693 = (state_18701[(2)]);
var inst_18695 = cljs.core.async.close_BANG_(out);
var state_18701__$1 = (function (){var statearr_18722 = state_18701;
(statearr_18722[(13)] = inst_18693);

return statearr_18722;
})();
var statearr_18723_19688 = state_18701__$1;
(statearr_18723_19688[(2)] = inst_18695);

(statearr_18723_19688[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (10))){
var inst_18684 = (state_18701[(2)]);
var state_18701__$1 = state_18701;
var statearr_18724_19689 = state_18701__$1;
(statearr_18724_19689[(2)] = inst_18684);

(statearr_18724_19689[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18702 === (8))){
var inst_18673 = (state_18701[(11)]);
var inst_18663 = (state_18701[(8)]);
var tmp18720 = inst_18663;
var inst_18663__$1 = tmp18720;
var inst_18664 = inst_18673;
var state_18701__$1 = (function (){var statearr_18725 = state_18701;
(statearr_18725[(7)] = inst_18664);

(statearr_18725[(8)] = inst_18663__$1);

return statearr_18725;
})();
var statearr_18726_19690 = state_18701__$1;
(statearr_18726_19690[(2)] = null);

(statearr_18726_19690[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18727 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18727[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18727[(1)] = (1));

return statearr_18727;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18701){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18701);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18728){var ex__15956__auto__ = e18728;
var statearr_18729_19692 = state_18701;
(statearr_18729_19692[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18701[(4)]))){
var statearr_18731_19693 = state_18701;
(statearr_18731_19693[(1)] = cljs.core.first((state_18701[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19701 = state_18701;
state_18701 = G__19701;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18701){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18701);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18732 = f__16076__auto__();
(statearr_18732[(6)] = c__16075__auto___19671);

return statearr_18732;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__18735 = arguments.length;
switch (G__18735) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__16075__auto___19719 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_18781){
var state_val_18782 = (state_18781[(1)]);
if((state_val_18782 === (7))){
var inst_18777 = (state_18781[(2)]);
var state_18781__$1 = state_18781;
var statearr_18783_19720 = state_18781__$1;
(statearr_18783_19720[(2)] = inst_18777);

(statearr_18783_19720[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (1))){
var inst_18736 = [];
var inst_18737 = inst_18736;
var inst_18738 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_18781__$1 = (function (){var statearr_18785 = state_18781;
(statearr_18785[(7)] = inst_18738);

(statearr_18785[(8)] = inst_18737);

return statearr_18785;
})();
var statearr_18786_19721 = state_18781__$1;
(statearr_18786_19721[(2)] = null);

(statearr_18786_19721[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (4))){
var inst_18741 = (state_18781[(9)]);
var inst_18741__$1 = (state_18781[(2)]);
var inst_18742 = (inst_18741__$1 == null);
var inst_18743 = cljs.core.not(inst_18742);
var state_18781__$1 = (function (){var statearr_18787 = state_18781;
(statearr_18787[(9)] = inst_18741__$1);

return statearr_18787;
})();
if(inst_18743){
var statearr_18788_19722 = state_18781__$1;
(statearr_18788_19722[(1)] = (5));

} else {
var statearr_18789_19723 = state_18781__$1;
(statearr_18789_19723[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (15))){
var inst_18737 = (state_18781[(8)]);
var inst_18769 = cljs.core.vec(inst_18737);
var state_18781__$1 = state_18781;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18781__$1,(18),out,inst_18769);
} else {
if((state_val_18782 === (13))){
var inst_18764 = (state_18781[(2)]);
var state_18781__$1 = state_18781;
var statearr_18790_19724 = state_18781__$1;
(statearr_18790_19724[(2)] = inst_18764);

(statearr_18790_19724[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (6))){
var inst_18737 = (state_18781[(8)]);
var inst_18766 = inst_18737.length;
var inst_18767 = (inst_18766 > (0));
var state_18781__$1 = state_18781;
if(cljs.core.truth_(inst_18767)){
var statearr_18792_19729 = state_18781__$1;
(statearr_18792_19729[(1)] = (15));

} else {
var statearr_18793_19730 = state_18781__$1;
(statearr_18793_19730[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (17))){
var inst_18774 = (state_18781[(2)]);
var inst_18775 = cljs.core.async.close_BANG_(out);
var state_18781__$1 = (function (){var statearr_18794 = state_18781;
(statearr_18794[(10)] = inst_18774);

return statearr_18794;
})();
var statearr_18795_19734 = state_18781__$1;
(statearr_18795_19734[(2)] = inst_18775);

(statearr_18795_19734[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (3))){
var inst_18779 = (state_18781[(2)]);
var state_18781__$1 = state_18781;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18781__$1,inst_18779);
} else {
if((state_val_18782 === (12))){
var inst_18737 = (state_18781[(8)]);
var inst_18757 = cljs.core.vec(inst_18737);
var state_18781__$1 = state_18781;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18781__$1,(14),out,inst_18757);
} else {
if((state_val_18782 === (2))){
var state_18781__$1 = state_18781;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18781__$1,(4),ch);
} else {
if((state_val_18782 === (11))){
var inst_18746 = (state_18781[(11)]);
var inst_18741 = (state_18781[(9)]);
var inst_18737 = (state_18781[(8)]);
var inst_18754 = inst_18737.push(inst_18741);
var tmp18796 = inst_18737;
var inst_18737__$1 = tmp18796;
var inst_18738 = inst_18746;
var state_18781__$1 = (function (){var statearr_18798 = state_18781;
(statearr_18798[(7)] = inst_18738);

(statearr_18798[(12)] = inst_18754);

(statearr_18798[(8)] = inst_18737__$1);

return statearr_18798;
})();
var statearr_18799_19738 = state_18781__$1;
(statearr_18799_19738[(2)] = null);

(statearr_18799_19738[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (9))){
var inst_18738 = (state_18781[(7)]);
var inst_18750 = cljs.core.keyword_identical_QMARK_(inst_18738,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_18781__$1 = state_18781;
var statearr_18800_19739 = state_18781__$1;
(statearr_18800_19739[(2)] = inst_18750);

(statearr_18800_19739[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (5))){
var inst_18746 = (state_18781[(11)]);
var inst_18747 = (state_18781[(13)]);
var inst_18738 = (state_18781[(7)]);
var inst_18741 = (state_18781[(9)]);
var inst_18746__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18741) : f.call(null,inst_18741));
var inst_18747__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18746__$1,inst_18738);
var state_18781__$1 = (function (){var statearr_18801 = state_18781;
(statearr_18801[(11)] = inst_18746__$1);

(statearr_18801[(13)] = inst_18747__$1);

return statearr_18801;
})();
if(inst_18747__$1){
var statearr_18802_19743 = state_18781__$1;
(statearr_18802_19743[(1)] = (8));

} else {
var statearr_18803_19744 = state_18781__$1;
(statearr_18803_19744[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (14))){
var inst_18746 = (state_18781[(11)]);
var inst_18741 = (state_18781[(9)]);
var inst_18759 = (state_18781[(2)]);
var inst_18760 = [];
var inst_18761 = inst_18760.push(inst_18741);
var inst_18737 = inst_18760;
var inst_18738 = inst_18746;
var state_18781__$1 = (function (){var statearr_18804 = state_18781;
(statearr_18804[(14)] = inst_18761);

(statearr_18804[(15)] = inst_18759);

(statearr_18804[(7)] = inst_18738);

(statearr_18804[(8)] = inst_18737);

return statearr_18804;
})();
var statearr_18806_19745 = state_18781__$1;
(statearr_18806_19745[(2)] = null);

(statearr_18806_19745[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (16))){
var state_18781__$1 = state_18781;
var statearr_18807_19746 = state_18781__$1;
(statearr_18807_19746[(2)] = null);

(statearr_18807_19746[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (10))){
var inst_18752 = (state_18781[(2)]);
var state_18781__$1 = state_18781;
if(cljs.core.truth_(inst_18752)){
var statearr_18808_19747 = state_18781__$1;
(statearr_18808_19747[(1)] = (11));

} else {
var statearr_18809_19748 = state_18781__$1;
(statearr_18809_19748[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (18))){
var inst_18771 = (state_18781[(2)]);
var state_18781__$1 = state_18781;
var statearr_18810_19749 = state_18781__$1;
(statearr_18810_19749[(2)] = inst_18771);

(statearr_18810_19749[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18782 === (8))){
var inst_18747 = (state_18781[(13)]);
var state_18781__$1 = state_18781;
var statearr_18811_19754 = state_18781__$1;
(statearr_18811_19754[(2)] = inst_18747);

(statearr_18811_19754[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__15953__auto__ = null;
var cljs$core$async$state_machine__15953__auto____0 = (function (){
var statearr_18812 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18812[(0)] = cljs$core$async$state_machine__15953__auto__);

(statearr_18812[(1)] = (1));

return statearr_18812;
});
var cljs$core$async$state_machine__15953__auto____1 = (function (state_18781){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_18781);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e18814){var ex__15956__auto__ = e18814;
var statearr_18815_19758 = state_18781;
(statearr_18815_19758[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_18781[(4)]))){
var statearr_18816_19759 = state_18781;
(statearr_18816_19759[(1)] = cljs.core.first((state_18781[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19760 = state_18781;
state_18781 = G__19760;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
cljs$core$async$state_machine__15953__auto__ = function(state_18781){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__15953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__15953__auto____1.call(this,state_18781);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__15953__auto____0;
cljs$core$async$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__15953__auto____1;
return cljs$core$async$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_18817 = f__16076__auto__();
(statearr_18817[(6)] = c__16075__auto___19719);

return statearr_18817;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map

goog.provide('shadow.grove.ui.suspense');

/**
* @constructor
 * @implements {shadow.grove.protocols.IScheduleWork}
*/
shadow.grove.ui.suspense.SuspenseScheduler = (function (parent_scheduler,root,should_trigger_QMARK_,suspend_set){
this.parent_scheduler = parent_scheduler;
this.root = root;
this.should_trigger_QMARK_ = should_trigger_QMARK_;
this.suspend_set = suspend_set;
});
(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3 = (function (this$,target,trigger){
var self__ = this;
var this$__$1 = this;
return shadow.grove.protocols.schedule_work_BANG_(self__.parent_scheduler,target,trigger);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return shadow.grove.protocols.unschedule_BANG_(self__.parent_scheduler,target);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3 = (function (this$,action,trigger){
var self__ = this;
var this$__$1 = this;
return shadow.grove.protocols.run_now_BANG_(self__.parent_scheduler,action,trigger);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return (self__.suspend_set = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(self__.suspend_set,target));
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
(self__.suspend_set = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(self__.suspend_set,target));

if(cljs.core.truth_((function (){var and__5043__auto__ = self__.should_trigger_QMARK_;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.empty_QMARK_(self__.suspend_set);
} else {
return and__5043__auto__;
}
})())){
(self__.should_trigger_QMARK_ = false);

return self__.root.tree_did_finish_BANG_();
} else {
return null;
}
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.set_should_trigger_BANG_ = (function (){
var self__ = this;
var this$ = this;
return (self__.should_trigger_QMARK_ = true);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.cancel_BANG_ = (function (){
var self__ = this;
var this$ = this;
return (self__.should_trigger_QMARK_ = false);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.prototype.did_suspend_QMARK_ = (function (){
var self__ = this;
var this$ = this;
return (cljs.core.count(self__.suspend_set) > (0));
}));

(shadow.grove.ui.suspense.SuspenseScheduler.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"parent-scheduler","parent-scheduler",972182099,null),cljs.core.with_meta(new cljs.core.Symbol(null,"root","root",1191874074,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"SuspenseRoot","SuspenseRoot",963930347,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"should-trigger?","should-trigger?",1007002358,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"suspend-set","suspend-set",-1207643034,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.ui.suspense.SuspenseScheduler.cljs$lang$type = true);

(shadow.grove.ui.suspense.SuspenseScheduler.cljs$lang$ctorStr = "shadow.grove.ui.suspense/SuspenseScheduler");

(shadow.grove.ui.suspense.SuspenseScheduler.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.suspense/SuspenseScheduler");
}));

/**
 * Positional factory function for shadow.grove.ui.suspense/SuspenseScheduler.
 */
shadow.grove.ui.suspense.__GT_SuspenseScheduler = (function shadow$grove$ui$suspense$__GT_SuspenseScheduler(parent_scheduler,root,should_trigger_QMARK_,suspend_set){
return (new shadow.grove.ui.suspense.SuspenseScheduler(parent_scheduler,root,should_trigger_QMARK_,suspend_set));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IManaged}
*/
shadow.grove.ui.suspense.SuspenseRoot = (function (opts,vnode,marker,parent_env,parent_scheduler,display,offscreen,offscreen_scheduler,timeout,dom_entered_QMARK_){
this.opts = opts;
this.vnode = vnode;
this.marker = marker;
this.parent_env = parent_env;
this.parent_scheduler = parent_scheduler;
this.display = display;
this.offscreen = offscreen;
this.offscreen_scheduler = offscreen_scheduler;
this.timeout = timeout;
this.dom_entered_QMARK_ = dom_entered_QMARK_;
});
(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
return (next instanceof shadow.grove.ui.suspense.SuspenseInit);
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
(self__.vnode = next.vnode);

(self__.opts = next.opts);

if(cljs.core.truth_((function (){var and__5043__auto__ = self__.offscreen;
if(cljs.core.truth_(and__5043__auto__)){
return self__.offscreen.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,self__.vnode);
} else {
return and__5043__auto__;
}
})())){
return self__.offscreen.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,self__.vnode);
} else {
if(cljs.core.truth_(self__.offscreen)){
self__.offscreen.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

self__.offscreen_scheduler.cancel_BANG_();

var scheduler = (new shadow.grove.ui.suspense.SuspenseScheduler(self__.parent_scheduler,this$__$1,false,cljs.core.PersistentHashSet.EMPTY));
var offscreen_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.parent_env,new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247),scheduler);
var next_managed = shadow.arborist.protocols.as_managed(self__.vnode,offscreen_env);
if(cljs.core.not(scheduler.did_suspend_QMARK_())){
(self__.offscreen = next_managed);

return this$__$1.tree_did_finish_BANG_();
} else {
(self__.offscreen = next_managed);

(self__.offscreen_scheduler = scheduler);

scheduler.set_should_trigger_BANG_();

return this$__$1.start_offscreen_BANG_();
}
} else {
if(self__.display.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2(null,self__.vnode)){
return self__.display.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2(null,self__.vnode);
} else {
var scheduler = (new shadow.grove.ui.suspense.SuspenseScheduler(self__.parent_scheduler,this$__$1,false,cljs.core.PersistentHashSet.EMPTY));
var offscreen_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.parent_env,new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247),scheduler);
var next_managed = shadow.arborist.protocols.as_managed(self__.vnode,offscreen_env);
if(cljs.core.not(scheduler.did_suspend_QMARK_())){
shadow.arborist.common.fragment_replace(self__.display,next_managed);

(self__.display = next_managed);

if(self__.dom_entered_QMARK_){
return shadow.arborist.protocols.dom_entered_BANG_(next_managed);
} else {
return null;
}
} else {
(self__.offscreen = next_managed);

(self__.offscreen_scheduler = scheduler);

scheduler.set_should_trigger_BANG_();

this$__$1.schedule_timeout_BANG_();

return this$__$1.start_offscreen_BANG_();
}

}
}
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
parent.insertBefore(self__.marker,anchor);

return self__.display.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,parent,anchor);
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.marker;
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(self__.dom_entered_QMARK_ = true);

return self__.display.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.timeout)){
clearTimeout(self__.timeout);
} else {
}

if(dom_remove_QMARK_){
self__.marker.remove();
} else {
}

if(cljs.core.truth_(self__.display)){
self__.display.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,dom_remove_QMARK_);
} else {
}

if(cljs.core.truth_(self__.offscreen)){
self__.offscreen_scheduler.cancel_BANG_();

return self__.offscreen.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,false);
} else {
return null;
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.init_BANG_ = (function (){
var self__ = this;
var this$ = this;
var scheduler = (new shadow.grove.ui.suspense.SuspenseScheduler(self__.parent_scheduler,this$,false,cljs.core.PersistentHashSet.EMPTY));
var offscreen_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.parent_env,new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247),scheduler);
var next_managed = shadow.arborist.protocols.as_managed(self__.vnode,offscreen_env);
if(cljs.core.not(scheduler.did_suspend_QMARK_())){
return (self__.display = next_managed);
} else {
(self__.offscreen = next_managed);

(self__.offscreen_scheduler = scheduler);

(self__.display = shadow.arborist.protocols.as_managed(new cljs.core.Keyword(null,"fallback","fallback",761637929).cljs$core$IFn$_invoke$arity$1(self__.opts),self__.parent_env));

scheduler.set_should_trigger_BANG_();

return this$.start_offscreen_BANG_();
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.schedule_timeout_BANG_ = (function (){
var self__ = this;
var this$ = this;
if(cljs.core.truth_(self__.timeout)){
return null;
} else {
var timeout_ms = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$2(self__.opts,(500));
return (self__.timeout = setTimeout((function (){
return this$.did_timeout_BANG_();
}),timeout_ms));
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.start_offscreen_BANG_ = (function (){
var self__ = this;
var this$ = this;
var temp__5808__auto__ = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(self__.opts);
if((temp__5808__auto__ == null)){
return null;
} else {
var key = temp__5808__auto__;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("shadow.grove.ui.suspense","suspense-keys","shadow.grove.ui.suspense/suspense-keys",178486569).cljs$core$IFn$_invoke$arity$1(self__.parent_env),cljs.core.assoc,key,Date.now());
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.did_timeout_BANG_ = (function (){
var self__ = this;
var this$ = this;
(self__.timeout = null);

if(cljs.core.truth_(self__.offscreen)){
var fallback = shadow.arborist.protocols.as_managed(new cljs.core.Keyword(null,"fallback","fallback",761637929).cljs$core$IFn$_invoke$arity$1(self__.opts),self__.parent_env);
var old_display = self__.display;
(self__.display = shadow.arborist.common.fragment_replace(old_display,fallback));

if(self__.dom_entered_QMARK_){
return self__.display.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
return null;
}
} else {
return null;
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.prototype.tree_did_finish_BANG_ = (function (){
var self__ = this;
var this$ = this;
self__.offscreen.shadow$arborist$protocols$IManaged$dom_insert$arity$3(null,self__.marker.parentElement,self__.marker);

self__.display.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2(null,true);

(self__.display = self__.offscreen);

(self__.offscreen = null);

(self__.offscreen_scheduler = null);

if(self__.dom_entered_QMARK_){
self__.display.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1(null);
} else {
}

var temp__5808__auto___12540 = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(self__.opts);
if((temp__5808__auto___12540 == null)){
} else {
var key_12541 = temp__5808__auto___12540;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword("shadow.grove.ui.suspense","suspense-keys","shadow.grove.ui.suspense/suspense-keys",178486569).cljs$core$IFn$_invoke$arity$1(self__.parent_env),cljs.core.dissoc,key_12541);
}

if(cljs.core.truth_(self__.timeout)){
clearTimeout(self__.timeout);

return (self__.timeout = null);
} else {
return null;
}
}));

(shadow.grove.ui.suspense.SuspenseRoot.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"vnode","vnode",1841021244,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"marker","marker",-1789317456,null),new cljs.core.Symbol(null,"parent-env","parent-env",-1951867438,null),new cljs.core.Symbol(null,"parent-scheduler","parent-scheduler",972182099,null),cljs.core.with_meta(new cljs.core.Symbol(null,"display","display",1882596959,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"offscreen","offscreen",-507392400,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"offscreen-scheduler","offscreen-scheduler",-123447521,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"SuspenseScheduler","SuspenseScheduler",880226633,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"timeout","timeout",1321906209,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"dom-entered?","dom-entered?",962657078,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true,new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)], null))], null);
}));

(shadow.grove.ui.suspense.SuspenseRoot.cljs$lang$type = true);

(shadow.grove.ui.suspense.SuspenseRoot.cljs$lang$ctorStr = "shadow.grove.ui.suspense/SuspenseRoot");

(shadow.grove.ui.suspense.SuspenseRoot.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.suspense/SuspenseRoot");
}));

/**
 * Positional factory function for shadow.grove.ui.suspense/SuspenseRoot.
 */
shadow.grove.ui.suspense.__GT_SuspenseRoot = (function shadow$grove$ui$suspense$__GT_SuspenseRoot(opts,vnode,marker,parent_env,parent_scheduler,display,offscreen,offscreen_scheduler,timeout,dom_entered_QMARK_){
return (new shadow.grove.ui.suspense.SuspenseRoot(opts,vnode,marker,parent_env,parent_scheduler,display,offscreen,offscreen_scheduler,timeout,dom_entered_QMARK_));
});


/**
* @constructor
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.grove.ui.suspense.SuspenseInit = (function (opts,vnode){
this.opts = opts;
this.vnode = vnode;
});
(shadow.grove.ui.suspense.SuspenseInit.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.ui.suspense.SuspenseInit.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (this$,env){
var self__ = this;
var this$__$1 = this;
var G__12525 = (new shadow.grove.ui.suspense.SuspenseRoot(self__.opts,self__.vnode,shadow.arborist.common.dom_marker.cljs$core$IFn$_invoke$arity$1(env),env,new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247).cljs$core$IFn$_invoke$arity$1(env),null,null,null,null,false));
G__12525.init_BANG_();

return G__12525;
}));

(shadow.grove.ui.suspense.SuspenseInit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"vnode","vnode",1841021244,null)], null);
}));

(shadow.grove.ui.suspense.SuspenseInit.cljs$lang$type = true);

(shadow.grove.ui.suspense.SuspenseInit.cljs$lang$ctorStr = "shadow.grove.ui.suspense/SuspenseInit");

(shadow.grove.ui.suspense.SuspenseInit.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.ui.suspense/SuspenseInit");
}));

/**
 * Positional factory function for shadow.grove.ui.suspense/SuspenseInit.
 */
shadow.grove.ui.suspense.__GT_SuspenseInit = (function shadow$grove$ui$suspense$__GT_SuspenseInit(opts,vnode){
return (new shadow.grove.ui.suspense.SuspenseInit(opts,vnode));
});


//# sourceMappingURL=shadow.grove.ui.suspense.js.map

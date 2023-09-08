goog.provide('shadow.grove');
shadow.grove.dispatch_up_BANG_ = (function shadow$grove$dispatch_up_BANG_(p__12923,ev_map){
var map__12926 = p__12923;
var map__12926__$1 = cljs.core.__destructure_map(map__12926);
var env = map__12926__$1;
var parent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12926__$1,new cljs.core.Keyword("shadow.grove.components","parent","shadow.grove.components/parent",522357606));
if(cljs.core.map_QMARK_(env)){
} else {
throw (new Error("Assert failed: (map? env)"));
}

if(cljs.core.map_QMARK_(ev_map)){
} else {
throw (new Error("Assert failed: (map? ev-map)"));
}

if(cljs.core.qualified_keyword_QMARK_(new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(ev_map))){
} else {
throw (new Error("Assert failed: (qualified-keyword? (:e ev-map))"));
}

return parent.shadow$grove$protocols$IHandleEvents$handle_event_BANG_$arity$4(null,ev_map,null,env);
});
shadow.grove.query_ident = (function shadow$grove$query_ident(var_args){
var G__12935 = arguments.length;
switch (G__12935) {
case 1:
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$1 = (function (ident){
return shadow.grove.impl.hook_query(ident,null,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2 = (function (ident,query){
return shadow.grove.impl.hook_query(ident,query,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$3 = (function (ident,query,config){
return shadow.grove.impl.hook_query(ident,query,config);
}));

(shadow.grove.query_ident.cljs$lang$maxFixedArity = 3);

shadow.grove.query_root = (function shadow$grove$query_root(var_args){
var G__12951 = arguments.length;
switch (G__12951) {
case 1:
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1 = (function (query){
return shadow.grove.impl.hook_query(null,query,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.query_root.cljs$core$IFn$_invoke$arity$2 = (function (query,config){
return shadow.grove.impl.hook_query(null,query,config);
}));

(shadow.grove.query_root.cljs$lang$maxFixedArity = 2);

shadow.grove.run_tx = (function shadow$grove$run_tx(p__12965,tx){
var map__12966 = p__12965;
var map__12966__$1 = cljs.core.__destructure_map(map__12966);
var env = map__12966__$1;
var runtime_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12966__$1,new cljs.core.Keyword("shadow.grove.runtime","runtime-ref","shadow.grove.runtime/runtime-ref",252005090));
return shadow.grove.impl.process_event(runtime_ref,tx,env);
});
shadow.grove.run_tx_BANG_ = (function shadow$grove$run_tx_BANG_(runtime_ref,tx){
if(cljs.core.truth_(shadow.grove.runtime.ref_QMARK_(runtime_ref))){
} else {
throw (new Error(["Assert failed: ","expected runtime ref?","\n","(rt/ref? runtime-ref)"].join('')));
}

var map__12971 = cljs.core.deref(runtime_ref);
var map__12971__$1 = cljs.core.__destructure_map(map__12971);
var scheduler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12971__$1,new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009));
return shadow.grove.protocols.run_now_BANG_(scheduler,(function (){
return shadow.grove.impl.process_event(runtime_ref,tx,null);
}),new cljs.core.Keyword("shadow.grove","run-tx!","shadow.grove/run-tx!",554470270));
});
shadow.grove.unmount_root = (function shadow$grove$unmount_root(root_el){
var temp__5804__auto__ = root_el.sg$root;
if(cljs.core.truth_(temp__5804__auto__)){
var root = temp__5804__auto__;
root.destroy_BANG_(true);

delete root_el["sg$root"];

return delete root_el["sg$env"];
} else {
return null;
}
});
/**
 * hook that watches an atom and triggers an update on change
 * accepts an optional path-or-fn arg that can be used for quick diffs
 * 
 * (watch the-atom [:foo])
 * (watch the-atom (fn [old new] ...))
 */
shadow.grove.watch = (function shadow$grove$watch(var_args){
var G__12975 = arguments.length;
switch (G__12975) {
case 1:
return shadow.grove.watch.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.grove.watch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.watch.cljs$core$IFn$_invoke$arity$1 = (function (the_atom){
return shadow.grove.watch.cljs$core$IFn$_invoke$arity$2(the_atom,(function (old,new$){
return new$;
}));
}));

(shadow.grove.watch.cljs$core$IFn$_invoke$arity$2 = (function (the_atom,path_or_fn){
if(cljs.core.vector_QMARK_(path_or_fn)){
return (new shadow.grove.ui.atoms.AtomWatch(the_atom,(function (old,new$){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(new$,path_or_fn);
}),null,null));
} else {
return (new shadow.grove.ui.atoms.AtomWatch(the_atom,path_or_fn,null,null));
}
}));

(shadow.grove.watch.cljs$lang$maxFixedArity = 2);

shadow.grove.env_watch = (function shadow$grove$env_watch(var_args){
var G__12981 = arguments.length;
switch (G__12981) {
case 1:
return shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$1 = (function (key_to_atom){
return shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$3(key_to_atom,cljs.core.PersistentVector.EMPTY,null);
}));

(shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$2 = (function (key_to_atom,path){
return shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$3(key_to_atom,path,null);
}));

(shadow.grove.env_watch.cljs$core$IFn$_invoke$arity$3 = (function (key_to_atom,path,default$){
if((key_to_atom instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? key-to-atom)"));
}

if(cljs.core.vector_QMARK_(path)){
} else {
throw (new Error("Assert failed: (vector? path)"));
}

return (new shadow.grove.ui.atoms.EnvWatch(key_to_atom,path,default$,null,null,null));
}));

(shadow.grove.env_watch.cljs$lang$maxFixedArity = 3);

shadow.grove.suspense = (function shadow$grove$suspense(opts,vnode){
return (new shadow.grove.ui.suspense.SuspenseInit(opts,vnode));
});
shadow.grove.simple_seq = (function shadow$grove$simple_seq(coll,render_fn){
return shadow.arborist.collections.simple_seq(coll,render_fn);
});
shadow.grove.keyed_seq = (function shadow$grove$keyed_seq(coll,key_fn,render_fn){
return shadow.arborist.collections.keyed_seq(coll,key_fn,render_fn);
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.TrackChange = (function (val,trigger_fn,result,component_handle){
this.val = val;
this.trigger_fn = trigger_fn;
this.result = result;
this.component_handle = component_handle;
});
(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
(self__.component_handle = ch);

return (self__.result = (function (){var G__12992 = self__.component_handle.shadow$grove$protocols$IEnvSource$get_component_env$arity$1(null);
var G__12993 = null;
var G__12994 = self__.val;
return (self__.trigger_fn.cljs$core$IFn$_invoke$arity$3 ? self__.trigger_fn.cljs$core$IFn$_invoke$arity$3(G__12992,G__12993,G__12994) : self__.trigger_fn.call(null,G__12992,G__12993,G__12994));
})());
}));

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.result;
}));

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return false;
}));

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,new_track){
var self__ = this;
var this$__$1 = this;
var next_val = new_track.val;
var prev_result = self__.result;
(self__.trigger_fn = new_track.trigger_fn);

(self__.result = (function (){var G__13000 = self__.component_handle.shadow$grove$protocols$IEnvSource$get_component_env$arity$1(null);
var G__13001 = self__.val;
var G__13002 = next_val;
return (self__.trigger_fn.cljs$core$IFn$_invoke$arity$3 ? self__.trigger_fn.cljs$core$IFn$_invoke$arity$3(G__13000,G__13001,G__13002) : self__.trigger_fn.call(null,G__13000,G__13001,G__13002));
})());

(self__.val = next_val);

return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(self__.result,prev_result);
}));

(shadow.grove.TrackChange.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.TrackChange.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"val","val",1769233139,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"trigger-fn","trigger-fn",1400256141,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"result","result",-1239343558,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"component-handle","component-handle",-970224254,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.TrackChange.cljs$lang$type = true);

(shadow.grove.TrackChange.cljs$lang$ctorStr = "shadow.grove/TrackChange");

(shadow.grove.TrackChange.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove/TrackChange");
}));

/**
 * Positional factory function for shadow.grove/TrackChange.
 */
shadow.grove.__GT_TrackChange = (function shadow$grove$__GT_TrackChange(val,trigger_fn,result,component_handle){
return (new shadow.grove.TrackChange(val,trigger_fn,result,component_handle));
});

shadow.grove.track_change = (function shadow$grove$track_change(val,trigger_fn){
return (new shadow.grove.TrackChange(val,trigger_fn,null,null));
});
shadow.grove.ref = (function shadow$grove$ref(){
return cljs.core.volatile_BANG_(null);
});
/**
 * calls (callback env) after render when provided deps argument changes
 * callback can return a function which will be called if cleanup is required
 */
shadow.grove.effect = (function shadow$grove$effect(deps,callback){
return (new shadow.grove.components.EffectHook(deps,callback,null,true,null));
});
/**
 * call (callback env) after every render
 */
shadow.grove.render_effect = (function shadow$grove$render_effect(callback){
return (new shadow.grove.components.EffectHook(new cljs.core.Keyword(null,"render","render",-1408033454),callback,null,true,null));
});
/**
 * call (callback env) on mount once
 */
shadow.grove.mount_effect = (function shadow$grove$mount_effect(callback){
return (new shadow.grove.components.EffectHook(new cljs.core.Keyword(null,"mount","mount",-1560582470),callback,null,true,null));
});
shadow.grove.portal = (function shadow$grove$portal(var_args){
var G__13025 = arguments.length;
switch (G__13025) {
case 1:
return shadow.grove.portal.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.grove.portal.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.portal.cljs$core$IFn$_invoke$arity$1 = (function (body){
return shadow.grove.ui.portal.portal(document.body,body);
}));

(shadow.grove.portal.cljs$core$IFn$_invoke$arity$2 = (function (ref_node,body){
return shadow.grove.ui.portal.portal(ref_node,body);
}));

(shadow.grove.portal.cljs$lang$maxFixedArity = 2);

shadow.grove.default_error_handler = (function shadow$grove$default_error_handler(component,ex){
if(goog.DEBUG){
console.error(["An Error occurred in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(component.config.component_name),", it will not be rendered."].join(''),component);
} else {
console.error("An Error occurred in Component, it will not be rendered.",component);
}

return console.error(ex);
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IHandleEvents}
*/
shadow.grove.RootEventTarget = (function (rt_ref){
this.rt_ref = rt_ref;
});
(shadow.grove.RootEventTarget.prototype.shadow$grove$protocols$IHandleEvents$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.RootEventTarget.prototype.shadow$grove$protocols$IHandleEvents$handle_event_BANG_$arity$4 = (function (this$,ev_map,e,origin){
var self__ = this;
var this$__$1 = this;
return shadow.grove.impl.process_event(self__.rt_ref,ev_map,origin);
}));

(shadow.grove.RootEventTarget.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rt-ref","rt-ref",-878707630,null)], null);
}));

(shadow.grove.RootEventTarget.cljs$lang$type = true);

(shadow.grove.RootEventTarget.cljs$lang$ctorStr = "shadow.grove/RootEventTarget");

(shadow.grove.RootEventTarget.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove/RootEventTarget");
}));

/**
 * Positional factory function for shadow.grove/RootEventTarget.
 */
shadow.grove.__GT_RootEventTarget = (function shadow$grove$__GT_RootEventTarget(rt_ref){
return (new shadow.grove.RootEventTarget(rt_ref));
});

shadow.grove.make_root_env = (function shadow$grove$make_root_env(rt_ref,root_el){
var event_target = (new shadow.grove.RootEventTarget(rt_ref));
var env_init = new cljs.core.Keyword("shadow.grove.runtime","env-init","shadow.grove.runtime/env-init",2005185019).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(rt_ref));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (env,init_fn){
return (init_fn.cljs$core$IFn$_invoke$arity$1 ? init_fn.cljs$core$IFn$_invoke$arity$1(env) : init_fn.call(null,env));
}),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247),new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(rt_ref)),new cljs.core.Keyword("shadow.grove.components","event-target","shadow.grove.components/event-target",-649187734),event_target,new cljs.core.Keyword("shadow.grove","suspense-keys","shadow.grove/suspense-keys",-1050374121),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword("shadow.grove.runtime","root-el","shadow.grove.runtime/root-el",-221164066),root_el,new cljs.core.Keyword("shadow.grove.runtime","runtime-ref","shadow.grove.runtime/runtime-ref",252005090),rt_ref,new cljs.core.Keyword("shadow.grove.components","error-handler","shadow.grove.components/error-handler",-1078927315),shadow.grove.default_error_handler], null),env_init);
});
shadow.grove.render_STAR_ = (function shadow$grove$render_STAR_(rt_ref,root_el,root_node){
if(cljs.core.truth_(shadow.grove.runtime.ref_QMARK_(rt_ref))){
} else {
throw (new Error("Assert failed: (rt/ref? rt-ref)"));
}

var temp__5802__auto__ = root_el.sg$root;
if(cljs.core.truth_(temp__5802__auto__)){
var active_root = temp__5802__auto__;
if(goog.DEBUG){
shadow.grove.components.mark_all_dirty_BANG_();
} else {
}

shadow.arborist.update_BANG_(active_root,root_node);

return new cljs.core.Keyword("shadow.grove","updated","shadow.grove/updated",1086195901);
} else {
var new_env = shadow.grove.make_root_env(rt_ref,root_el);
var new_root = shadow.arborist.dom_root.cljs$core$IFn$_invoke$arity$2(root_el,new_env);
shadow.arborist.update_BANG_(new_root,root_node);

(root_el.sg$root = new_root);

(root_el.sg$env = new_env);

return new cljs.core.Keyword("shadow.grove","started","shadow.grove/started",-1053419007);
}
});
shadow.grove.render = (function shadow$grove$render(rt_ref,root_el,root_node){
if(cljs.core.truth_(shadow.grove.runtime.ref_QMARK_(rt_ref))){
} else {
throw (new Error("Assert failed: (rt/ref? rt-ref)"));
}

return new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(rt_ref)).shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3(null,(function (){
return shadow.grove.render_STAR_(rt_ref,root_el,root_node);
}),new cljs.core.Keyword("shadow.grove","render","shadow.grove/render",1304443147));
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IScheduleWork}
*/
shadow.grove.RootScheduler = (function (update_pending_QMARK_,work_set){
this.update_pending_QMARK_ = update_pending_QMARK_;
this.work_set = work_set;
});
(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3 = (function (this$,work_task,trigger){
var self__ = this;
var this$__$1 = this;
self__.work_set.add(work_task);

if(cljs.core.truth_(self__.update_pending_QMARK_)){
return null;
} else {
(self__.update_pending_QMARK_ = true);

return shadow.grove.runtime.next_tick((function (){
return this$__$1.process_work_BANG_();
}));
}
}));

(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2 = (function (this$,work_task){
var self__ = this;
var this$__$1 = this;
return self__.work_set.delete(work_task);
}));

(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.RootScheduler.prototype.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3 = (function (this$,action,trigger){
var self__ = this;
var this$__$1 = this;
(self__.update_pending_QMARK_ = true);

(action.cljs$core$IFn$_invoke$arity$0 ? action.cljs$core$IFn$_invoke$arity$0() : action.call(null));

return this$__$1.process_work_BANG_();
}));

(shadow.grove.RootScheduler.prototype.process_work_BANG_ = (function (){
var self__ = this;
var this$ = this;
try{var iter = self__.work_set.values();
while(true){
var current = iter.next();
if((!(current.done))){
current.value.shadow$grove$protocols$IWork$work_BANG_$arity$1(null);

continue;
} else {
return null;
}
break;
}
}finally {(self__.update_pending_QMARK_ = false);
}}));

(shadow.grove.RootScheduler.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"update-pending?","update-pending?",1522583236,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"work-set","work-set",1431323643,null)], null);
}));

(shadow.grove.RootScheduler.cljs$lang$type = true);

(shadow.grove.RootScheduler.cljs$lang$ctorStr = "shadow.grove/RootScheduler");

(shadow.grove.RootScheduler.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove/RootScheduler");
}));

/**
 * Positional factory function for shadow.grove/RootScheduler.
 */
shadow.grove.__GT_RootScheduler = (function shadow$grove$__GT_RootScheduler(update_pending_QMARK_,work_set){
return (new shadow.grove.RootScheduler(update_pending_QMARK_,work_set));
});


/**
* @constructor
 * @implements {shadow.grove.protocols.IScheduleWork}
*/
shadow.grove.TracingRootScheduler = (function (update_pending_QMARK_,work_set){
this.update_pending_QMARK_ = update_pending_QMARK_;
this.work_set = work_set;
});
(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3 = (function (this$,work_task,trigger){
var self__ = this;
var this$__$1 = this;
self__.work_set.add(work_task);

if(cljs.core.truth_(self__.update_pending_QMARK_)){
return null;
} else {
(self__.update_pending_QMARK_ = true);

return shadow.grove.runtime.next_tick((function (){
console.group(cljs.core.str.cljs$core$IFn$_invoke$arity$1(trigger));

try{return this$__$1.process_work_BANG_();
}finally {console.groupEnd();
}}));
}
}));

(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2 = (function (this$,work_task){
var self__ = this;
var this$__$1 = this;
return self__.work_set.delete(work_task);
}));

(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2 = (function (this$,target){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.TracingRootScheduler.prototype.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3 = (function (this$,action,trigger){
var self__ = this;
var this$__$1 = this;
console.group(cljs.core.str.cljs$core$IFn$_invoke$arity$1(trigger));

try{(self__.update_pending_QMARK_ = true);

(action.cljs$core$IFn$_invoke$arity$0 ? action.cljs$core$IFn$_invoke$arity$0() : action.call(null));

return this$__$1.process_work_BANG_();
}finally {console.groupEnd();
}}));

(shadow.grove.TracingRootScheduler.prototype.process_work_BANG_ = (function (){
var self__ = this;
var this$ = this;
try{var iter = self__.work_set.values();
while(true){
var current = iter.next();
if((!(current.done))){
current.value.shadow$grove$protocols$IWork$work_BANG_$arity$1(null);

continue;
} else {
return null;
}
break;
}
}finally {(self__.update_pending_QMARK_ = false);
}}));

(shadow.grove.TracingRootScheduler.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"update-pending?","update-pending?",1522583236,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"work-set","work-set",1431323643,null)], null);
}));

(shadow.grove.TracingRootScheduler.cljs$lang$type = true);

(shadow.grove.TracingRootScheduler.cljs$lang$ctorStr = "shadow.grove/TracingRootScheduler");

(shadow.grove.TracingRootScheduler.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove/TracingRootScheduler");
}));

/**
 * Positional factory function for shadow.grove/TracingRootScheduler.
 */
shadow.grove.__GT_TracingRootScheduler = (function shadow$grove$__GT_TracingRootScheduler(update_pending_QMARK_,work_set){
return (new shadow.grove.TracingRootScheduler(update_pending_QMARK_,work_set));
});

/**
 * @define {boolean}
 */
shadow.grove.TRACE = goog.define("shadow.grove.TRACE",false);
shadow.grove.prepare = (function shadow$grove$prepare(var_args){
var G__13100 = arguments.length;
switch (G__13100) {
case 2:
return shadow.grove.prepare.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.grove.prepare.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.prepare.cljs$core$IFn$_invoke$arity$2 = (function (data_ref,runtime_id){
return shadow.grove.prepare.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,data_ref,runtime_id);
}));

(shadow.grove.prepare.cljs$core$IFn$_invoke$arity$3 = (function (init,data_ref,runtime_id){
var root_scheduler = ((shadow.grove.TRACE)?(new shadow.grove.TracingRootScheduler(false,(new Set()))):(new shadow.grove.RootScheduler(false,(new Set()))));
var rt_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var active_queries_map = (new Map());
cljs.core.reset_BANG_(rt_ref,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(init,new cljs.core.Keyword("shadow.grove.runtime","rt","shadow.grove.runtime/rt",1216959489),true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009),root_scheduler,new cljs.core.Keyword("shadow.grove.runtime","runtime-id","shadow.grove.runtime/runtime-id",1330331054),runtime_id,new cljs.core.Keyword("shadow.grove.runtime","data-ref","shadow.grove.runtime/data-ref",-1688628375),data_ref,new cljs.core.Keyword("shadow.grove.runtime","event-config","shadow.grove.runtime/event-config",-570686649),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("shadow.grove.runtime","fx-config","shadow.grove.runtime/fx-config",-254676192),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771),active_queries_map,new cljs.core.Keyword("shadow.grove.runtime","key-index-seq","shadow.grove.runtime/key-index-seq",1103349112),cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)),new cljs.core.Keyword("shadow.grove.runtime","key-index-ref","shadow.grove.runtime/key-index-ref",-1341451448),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword("shadow.grove.runtime","query-index-map","shadow.grove.runtime/query-index-map",1244541445),(new Map()),new cljs.core.Keyword("shadow.grove.runtime","query-index-ref","shadow.grove.runtime/query-index-ref",1418908381),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword("shadow.grove.runtime","env-init","shadow.grove.runtime/env-init",2005185019),cljs.core.PersistentVector.EMPTY], 0)));

if(goog.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.grove.runtime.known_runtimes_ref,cljs.core.assoc,runtime_id,rt_ref);
} else {
}

return rt_ref;
}));

(shadow.grove.prepare.cljs$lang$maxFixedArity = 3);

shadow.grove.vec_conj = (function shadow$grove$vec_conj(x,y){
if((x == null)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [y], null);
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(x,y);
}
});
shadow.grove.queue_fx = (function shadow$grove$queue_fx(env,fx_id,fx_val){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(env,new cljs.core.Keyword("shadow.grove.runtime","fx","shadow.grove.runtime/fx",-472553621),shadow.grove.vec_conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fx_id,fx_val], null));
});
shadow.grove.reg_event = (function shadow$grove$reg_event(rt_ref,ev_id,handler_fn){
if((ev_id instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? ev-id)"));
}

if(cljs.core.ifn_QMARK_(handler_fn)){
} else {
throw (new Error("Assert failed: (ifn? handler-fn)"));
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rt_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.runtime","event-config","shadow.grove.runtime/event-config",-570686649),ev_id], null),handler_fn);

return rt_ref;
});
shadow.grove.reg_fx = (function shadow$grove$reg_fx(rt_ref,fx_id,handler_fn){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rt_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.runtime","fx-config","shadow.grove.runtime/fx-config",-254676192),fx_id], null),handler_fn);

return rt_ref;
});

//# sourceMappingURL=shadow.grove.js.map

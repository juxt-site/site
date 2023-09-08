goog.provide('shadow.grove.components');
goog.scope(function(){
  shadow.grove.components.goog$module$goog$object = goog.module.get('goog.object');
});
/**
 * @define {boolean}
 */
shadow.grove.components.DEBUG = goog.define("shadow.grove.components.DEBUG",goog.DEBUG);
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.components !== 'undefined') && (typeof shadow.grove.components.components_ref !== 'undefined')){
} else {
shadow.grove.components.components_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.components !== 'undefined') && (typeof shadow.grove.components.instances_ref !== 'undefined')){
} else {
shadow.grove.components.instances_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
}
shadow.grove.components.debug_find_roots = (function shadow$grove$components$debug_find_roots(){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (all,instance){
if(cljs.core.truth_(new cljs.core.Keyword("shadow.grove.components","parent","shadow.grove.components/parent",522357606).cljs$core$IFn$_invoke$arity$1(instance.component_env))){
return all;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(all,instance);
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.deref(shadow.grove.components.instances_ref));
});
shadow.grove.components.debug_component_seq = (function shadow$grove$components$debug_component_seq(var_args){
var G__12165 = arguments.length;
switch (G__12165) {
case 0:
return shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$0 = (function (){
return shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$1(cljs.core.first(shadow.grove.components.debug_find_roots()));
}));

(shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$1 = (function (root){
return cljs.core.tree_seq((function (component){
return true;
}),(function (component){
return component.child_components;
}),root);
}));

(shadow.grove.components.debug_component_seq.cljs$lang$maxFixedArity = 1);

shadow.grove.components.debug_find_suspended = (function shadow$grove$components$debug_find_suspended(){
return cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__12166_SHARP_){
return p1__12166_SHARP_.suspended_QMARK_;
}),shadow.grove.components.debug_component_seq.cljs$core$IFn$_invoke$arity$0()));
});
shadow.grove.components.get_component = (function shadow$grove$components$get_component(env){
return new cljs.core.Keyword("shadow.grove.components","component","shadow.grove.components/component",-1606419021).cljs$core$IFn$_invoke$arity$1(env);
});
shadow.grove.components.mark_all_dirty_BANG_ = (function shadow$grove$components$mark_all_dirty_BANG_(){
var seq__12179 = cljs.core.seq(cljs.core.deref(shadow.grove.components.instances_ref));
var chunk__12180 = null;
var count__12181 = (0);
var i__12182 = (0);
while(true){
if((i__12182 < count__12181)){
var comp = chunk__12180.cljs$core$IIndexed$_nth$arity$2(null,i__12182);
comp.set_render_required_BANG_();


var G__12447 = seq__12179;
var G__12448 = chunk__12180;
var G__12449 = count__12181;
var G__12450 = (i__12182 + (1));
seq__12179 = G__12447;
chunk__12180 = G__12448;
count__12181 = G__12449;
i__12182 = G__12450;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__12179);
if(temp__5804__auto__){
var seq__12179__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12179__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__12179__$1);
var G__12451 = cljs.core.chunk_rest(seq__12179__$1);
var G__12452 = c__5568__auto__;
var G__12453 = cljs.core.count(c__5568__auto__);
var G__12454 = (0);
seq__12179 = G__12451;
chunk__12180 = G__12452;
count__12181 = G__12453;
i__12182 = G__12454;
continue;
} else {
var comp = cljs.core.first(seq__12179__$1);
comp.set_render_required_BANG_();


var G__12455 = cljs.core.next(seq__12179__$1);
var G__12456 = null;
var G__12457 = (0);
var G__12458 = (0);
seq__12179 = G__12455;
chunk__12180 = G__12456;
count__12181 = G__12457;
i__12182 = G__12458;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.grove.components.make_component_init = (function shadow$grove$components$make_component_init(component,args){
if(cljs.core.vector_QMARK_(args)){
} else {
throw (new Error("Assert failed: (vector? args)"));
}

return (new shadow.grove.components.ComponentInit(component,args));
});
(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.protocols.ComponentConfig.prototype.call = (function() {
var G__12459 = null;
var G__12459__1 = (function (self__){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,cljs.core.PersistentVector.EMPTY);
});
var G__12459__2 = (function (self__,a1){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1], null));
});
var G__12459__3 = (function (self__,a1,a2){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2], null));
});
var G__12459__4 = (function (self__,a1,a2,a3){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3], null));
});
var G__12459__5 = (function (self__,a1,a2,a3,a4){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4], null));
});
var G__12459__6 = (function (self__,a1,a2,a3,a4,a5){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4,a5], null));
});
var G__12459__7 = (function (self__,a1,a2,a3,a4,a5,a6){
var self____$1 = this;
var this$ = self____$1;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4,a5,a6], null));
});
G__12459 = function(self__,a1,a2,a3,a4,a5,a6){
switch(arguments.length){
case 1:
return G__12459__1.call(this,self__);
case 2:
return G__12459__2.call(this,self__,a1);
case 3:
return G__12459__3.call(this,self__,a1,a2);
case 4:
return G__12459__4.call(this,self__,a1,a2,a3);
case 5:
return G__12459__5.call(this,self__,a1,a2,a3,a4);
case 6:
return G__12459__6.call(this,self__,a1,a2,a3,a4,a5);
case 7:
return G__12459__7.call(this,self__,a1,a2,a3,a4,a5,a6);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__12459.cljs$core$IFn$_invoke$arity$1 = G__12459__1;
G__12459.cljs$core$IFn$_invoke$arity$2 = G__12459__2;
G__12459.cljs$core$IFn$_invoke$arity$3 = G__12459__3;
G__12459.cljs$core$IFn$_invoke$arity$4 = G__12459__4;
G__12459.cljs$core$IFn$_invoke$arity$5 = G__12459__5;
G__12459.cljs$core$IFn$_invoke$arity$6 = G__12459__6;
G__12459.cljs$core$IFn$_invoke$arity$7 = G__12459__7;
return G__12459;
})()
);

(shadow.grove.protocols.ComponentConfig.prototype.apply = (function (self__,args12192){
var self____$1 = this;
var args__5260__auto__ = cljs.core.aclone(args12192);
return self____$1.call.apply(self____$1,[self____$1].concat((((args__5260__auto__.length > (20)))?(function (){var G__12193 = args__5260__auto__.slice((0),(20));
G__12193.push(args__5260__auto__.slice((20)));

return G__12193;
})():args__5260__auto__)));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$0 = (function (){
var this$ = this;
return shadow.grove.components.make_component_init(this$,cljs.core.PersistentVector.EMPTY);
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$1 = (function (a1){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1], null));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$2 = (function (a1,a2){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2], null));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$3 = (function (a1,a2,a3){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3], null));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$4 = (function (a1,a2,a3,a4){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4], null));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$5 = (function (a1,a2,a3,a4,a5){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4,a5], null));
}));

(shadow.grove.protocols.ComponentConfig.prototype.cljs$core$IFn$_invoke$arity$6 = (function (a1,a2,a3,a4,a5,a6){
var this$ = this;
return shadow.grove.components.make_component_init(this$,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [a1,a2,a3,a4,a5,a6], null));
}));
shadow.grove.components.component_config_QMARK_ = (function shadow$grove$components$component_config_QMARK_(x){
return (x instanceof shadow.grove.protocols.ComponentConfig);
});
shadow.grove.components.safe_inc = (function shadow$grove$components$safe_inc(x){
if((x == null)){
return (0);
} else {
return (x + (1));
}
});
shadow.grove.components.sort_fn = (function shadow$grove$components$sort_fn(a,b){
return cljs.core.compare(new cljs.core.Keyword("shadow.grove.components","depth","shadow.grove.components/depth",-20661449).cljs$core$IFn$_invoke$arity$1(a.component_env),new cljs.core.Keyword("shadow.grove.components","depth","shadow.grove.components/depth",-20661449).cljs$core$IFn$_invoke$arity$1(b.component_env));
});
shadow.grove.components.find_first_set_bit_idx = (function shadow$grove$components$find_first_set_bit_idx(search){
if((!((search === (0))))){
} else {
throw (new Error("Assert failed: (not (zero? search))"));
}

var search__$1 = search;
var idx = (0);
while(true){
if(((1) === (search__$1 & (1)))){
return idx;
} else {
var G__12511 = (search__$1 >> (1));
var G__12512 = (idx + (1));
search__$1 = G__12511;
idx = G__12512;
continue;
}
break;
}
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IHookDomEffect}
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.components.EffectHook = (function (deps,callback,callback_result,should_call_QMARK_,component_handle){
this.deps = deps;
this.callback = callback;
this.callback_result = callback_result;
this.should_call_QMARK_ = should_call_QMARK_;
this.component_handle = component_handle;
});
(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
return (self__.component_handle = ch);
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.Keyword("shadow.grove.components","effect-hook","shadow.grove.components/effect-hook",301527919);
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return false;
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,new$){
var self__ = this;
var this$__$1 = this;
(self__.callback = new$.callback);

var new_deps_12513 = new$.deps;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new_deps_12513,new cljs.core.Keyword(null,"render","render",-1408033454))){
(self__.should_call_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(self__.deps,new_deps_12513));

(self__.deps = new_deps_12513);
} else {
}

return false;
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core.fn_QMARK_(self__.callback_result)){
return (self__.callback_result.cljs$core$IFn$_invoke$arity$0 ? self__.callback_result.cljs$core$IFn$_invoke$arity$0() : self__.callback_result.call(null));
} else {
return null;
}
}));

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHookDomEffect$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.EffectHook.prototype.shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$arity$2 = (function (this$,did_render_QMARK_){
var self__ = this;
var this$__$1 = this;
if(((did_render_QMARK_) && (self__.should_call_QMARK_))){
if(cljs.core.fn_QMARK_(self__.callback_result)){
(self__.callback_result.cljs$core$IFn$_invoke$arity$0 ? self__.callback_result.cljs$core$IFn$_invoke$arity$0() : self__.callback_result.call(null));
} else {
}

(self__.callback_result = self__.callback(self__.component_handle.shadow$grove$protocols$IEnvSource$get_component_env$arity$1(null)));

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(self__.deps,new cljs.core.Keyword(null,"render","render",-1408033454))){
return (self__.should_call_QMARK_ = false);
} else {
return null;
}
} else {
return null;
}
}));

(shadow.grove.components.EffectHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"deps","deps",-771075450,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"callback","callback",935395299,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"function","function",-486723946,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"callback-result","callback-result",1306298612,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"should-call?","should-call?",1103428156,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"component-handle","component-handle",-970224254,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.components.EffectHook.cljs$lang$type = true);

(shadow.grove.components.EffectHook.cljs$lang$ctorStr = "shadow.grove.components/EffectHook");

(shadow.grove.components.EffectHook.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.components/EffectHook");
}));

/**
 * Positional factory function for shadow.grove.components/EffectHook.
 */
shadow.grove.components.__GT_EffectHook = (function shadow$grove$components$__GT_EffectHook(deps,callback,callback_result,should_call_QMARK_,component_handle){
return (new shadow.grove.components.EffectHook(deps,callback,callback_result,should_call_QMARK_,component_handle));
});


/**
* @constructor
 * @implements {shadow.grove.protocols.IComponentHookHandle}
 * @implements {shadow.grove.protocols.ISchedulerSource}
 * @implements {shadow.grove.protocols.IEnvSource}
*/
shadow.grove.components.ComponentHookHandle = (function (component,idx){
this.component = component;
this.idx = idx;
});
(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$IEnvSource$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$IEnvSource$get_component_env$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.component.component_env;
}));

(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$ISchedulerSource$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$ISchedulerSource$get_scheduler$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.component.scheduler;
}));

(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$IComponentHookHandle$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ComponentHookHandle.prototype.shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.component.invalidate_hook_BANG_(self__.idx);
}));

(shadow.grove.components.ComponentHookHandle.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"component","component",-1098498987,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),new cljs.core.Symbol(null,"idx","idx",-1600747296,null)], null);
}));

(shadow.grove.components.ComponentHookHandle.cljs$lang$type = true);

(shadow.grove.components.ComponentHookHandle.cljs$lang$ctorStr = "shadow.grove.components/ComponentHookHandle");

(shadow.grove.components.ComponentHookHandle.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.components/ComponentHookHandle");
}));

/**
 * Positional factory function for shadow.grove.components/ComponentHookHandle.
 */
shadow.grove.components.__GT_ComponentHookHandle = (function shadow$grove$components$__GT_ComponentHookHandle(component,idx){
return (new shadow.grove.components.ComponentHookHandle(component,idx));
});


/**
* @constructor
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.components.SimpleVal = (function (val){
this.val = val;
});
(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return true;
}));

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.val;
}));

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var new_val = next.val;
var updated_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new_val,self__.val);
(self__.val = new_val);

return updated_QMARK_;
}));

(shadow.grove.components.SimpleVal.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
}));

(shadow.grove.components.SimpleVal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"val","val",1769233139,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.components.SimpleVal.cljs$lang$type = true);

(shadow.grove.components.SimpleVal.cljs$lang$ctorStr = "shadow.grove.components/SimpleVal");

(shadow.grove.components.SimpleVal.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.components/SimpleVal");
}));

/**
 * Positional factory function for shadow.grove.components/SimpleVal.
 */
shadow.grove.components.__GT_SimpleVal = (function shadow$grove$components$__GT_SimpleVal(val){
return (new shadow.grove.components.SimpleVal(val));
});

shadow.grove.components.maybe_wrap_val = (function shadow$grove$components$maybe_wrap_val(val){
if((((!((val == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === val.shadow$grove$protocols$IHook$))))?true:false):false)){
return val;
} else {
return (new shadow.grove.components.SimpleVal(val));
}
});
shadow.grove.components.ManagedComponent = class shadow$grove$components$ManagedComponent {
  constructor(G__12291,G__12292,G__12293) {
var e_12521 = G__12291;
var c_12522 = G__12292;
var a_12523 = G__12293;
var self__ = this;
(self__.current_idx = ((0) | (0)));

(self__.hooks_with_effects = []);

(self__.dirty_from_args = ((0) | (0)));

(self__.dirty_hooks = ((0) | (0)));

(self__.updated_hooks = ((0) | (0)));

(self__.needs_render_QMARK_ = true);

(self__.work_set = (new Set()));

(self__.parent_env = e_12521);

(self__.config = c_12522);

(self__.args = a_12523);

(self__.scheduler = new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247).cljs$core$IFn$_invoke$arity$1(self__.parent_env));

if(shadow.grove.components.DEBUG){
(self__.child_components = (new Set()));

var temp__5808__auto___12527 = new cljs.core.Keyword("shadow.grove.components","component","shadow.grove.components/component",-1606419021).cljs$core$IFn$_invoke$arity$1(self__.parent_env);
if((temp__5808__auto___12527 == null)){
} else {
var parent_12528 = temp__5808__auto___12527;
parent_12528.child_components.add(self__);
}
} else {
}

(self__.component_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.update.cljs$core$IFn$_invoke$arity$3(self__.parent_env,new cljs.core.Keyword("shadow.grove.components","depth","shadow.grove.components/depth",-20661449),shadow.grove.components.safe_inc),new cljs.core.Keyword("shadow.grove.components","parent","shadow.grove.components/parent",522357606),new cljs.core.Keyword("shadow.grove.components","component","shadow.grove.components/component",-1606419021).cljs$core$IFn$_invoke$arity$1(self__.parent_env),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.arborist.protocols","dom-event-handler","shadow.arborist.protocols/dom-event-handler",-755471285),self__,new cljs.core.Keyword("shadow.grove.components","component","shadow.grove.components/component",-1606419021),self__,new cljs.core.Keyword("shadow.grove.components","event-target","shadow.grove.components/event-target",-649187734),self__,new cljs.core.Keyword("shadow.grove.components","scheduler","shadow.grove.components/scheduler",189849247),self__], 0)));

if(shadow.grove.components.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(shadow.grove.components.instances_ref,cljs.core.conj,self__);

(self__.marker_before = (function (){var G__12299 = document.createComment(["component: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.config.component_name)].join(''));
(G__12299.shadow$instance = self__);

return G__12299;
})());

(self__.marker_after = (function (){var G__12301 = document.createComment(["/component: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.config.component_name)].join(''));
(G__12301.shadow$instance = self__);

return G__12301;
})());
} else {
}

(self__.root = shadow.arborist.common.managed_root(self__.component_env));

(self__.hooks = (new Array(self__.config.hooks.length)));
  }
};
(shadow.grove.components.ManagedComponent.prototype.cljs$core$IHash$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$dom_first$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(shadow.grove.components.DEBUG){
return this$__$1.marker_before;
} else {
return shadow.arborist.protocols.dom_first(self__.root);
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$dom_insert$arity$3 = (function (this$,parent,anchor){
var self__ = this;
var this$__$1 = this;
if(shadow.grove.components.DEBUG){
parent.insertBefore(this$__$1.marker_before,anchor);
} else {
}

shadow.arborist.protocols.dom_insert(self__.root,parent,anchor);

if(shadow.grove.components.DEBUG){
return parent.insertBefore(this$__$1.marker_after,anchor);
} else {
return null;
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$dom_entered_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(self__.dom_entered_QMARK_ = true);

if(self__.error_QMARK_){
return null;
} else {
shadow.arborist.protocols.dom_entered_BANG_(self__.root);

return this$__$1.did_update_BANG_(true);
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$supports_QMARK_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
var and__5043__auto__ = shadow.grove.components.component_init_QMARK_(next);
if(cljs.core.truth_(and__5043__auto__)){
var and__5043__auto____$1 = (function (){var other = next.component;
return (self__.config === other);
})();
if(and__5043__auto____$1){
var and__5043__auto____$2 = (function (){var stable_args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.config.opts,new cljs.core.Keyword("shadow.grove.components","stable-args","shadow.grove.components/stable-args",691139503));
var or__5045__auto__ = (stable_args == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var old_args = self__.args;
var new_args = next.args;
return cljs.core.every_QMARK_((function (p1__12281_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(old_args,p1__12281_SHARP_),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new_args,p1__12281_SHARP_));
}),stable_args);
}
})();
if(and__5043__auto____$2){
var custom_check = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.config.opts,new cljs.core.Keyword(null,"supports?","supports?",1642448130));
var or__5045__auto__ = (custom_check == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var G__12317 = self__.args;
var G__12318 = next.args;
return (custom_check.cljs$core$IFn$_invoke$arity$2 ? custom_check.cljs$core$IFn$_invoke$arity$2(G__12317,G__12318) : custom_check.call(null,G__12317,G__12318));
}
} else {
return and__5043__auto____$2;
}
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$dom_sync_BANG_$arity$2 = (function (this$,next){
var self__ = this;
var this$__$1 = this;
self__.config.check_args_fn(this$__$1,self__.args,next.args);

(self__.args = next.args);

if(cljs.core.truth_(this$__$1.work_pending_QMARK_())){
return this$__$1.schedule_BANG_(new cljs.core.Keyword("shadow.grove.components","dom-sync!","shadow.grove.components/dom-sync!",1006774752));
} else {
return null;
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IManaged$destroy_BANG_$arity$2 = (function (this$,dom_remove_QMARK_){
var self__ = this;
var this$__$1 = this;
this$__$1.unschedule_BANG_();

if(shadow.grove.components.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(shadow.grove.components.instances_ref,cljs.core.disj,this$__$1);

var temp__5808__auto___12533 = new cljs.core.Keyword("shadow.grove.components","parent","shadow.grove.components/parent",522357606).cljs$core$IFn$_invoke$arity$1(self__.component_env);
if((temp__5808__auto___12533 == null)){
} else {
var parent_12534 = temp__5808__auto___12533;
parent_12534.child_components.delete(this$__$1);
}

if(dom_remove_QMARK_){
this$__$1.marker_before.remove();

this$__$1.marker_after.remove();
} else {
}
} else {
}

(self__.destroyed_QMARK_ = true);

self__.hooks.forEach((function (hook){
if(cljs.core.truth_(hook)){
return hook.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1(null);
} else {
return null;
}
}));

return shadow.arborist.protocols.destroy_BANG_(self__.root,dom_remove_QMARK_);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IHandleEvents$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IHandleEvents$handle_event_BANG_$arity$4 = (function (this$,p__12330,e,origin){
var self__ = this;
var map__12331 = p__12330;
var map__12331__$1 = cljs.core.__destructure_map(map__12331);
var ev_map = map__12331__$1;
var ev_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12331__$1,new cljs.core.Keyword(null,"e","e",1381269198));
var this$__$1 = this;
var handler = ((cljs.core.qualified_keyword_QMARK_(ev_id))?(function (){var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.config.events,ev_id);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.config.opts,ev_id);
}
})():(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unknown event",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"event","event",301435442),ev_map], null))})()
);
if(cljs.core.truth_(handler)){
return (handler.cljs$core$IFn$_invoke$arity$4 ? handler.cljs$core$IFn$_invoke$arity$4(self__.component_env,ev_map,e,origin) : handler.call(null,self__.component_env,ev_map,e,origin));
} else {
var temp__5806__auto__ = new cljs.core.Keyword("shadow.grove.components","event-target","shadow.grove.components/event-target",-649187734).cljs$core$IFn$_invoke$arity$1(self__.parent_env);
if((temp__5806__auto__ == null)){
return console.warn("event not handled",ev_id,ev_map);
} else {
var parent = temp__5806__auto__;
return shadow.grove.protocols.handle_event_BANG_(parent,ev_map,e,origin);
}
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2 = (function (this$,work_task){
var self__ = this;
var this$__$1 = this;
return self__.scheduler.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2(null,work_task);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2 = (function (this$,work_task){
var self__ = this;
var this$__$1 = this;
return self__.scheduler.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2(null,work_task);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3 = (function (this$,work_task,trigger){
var self__ = this;
var this$__$1 = this;
if((self__.work_set.size === (0))){
self__.scheduler.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3(null,this$__$1,trigger);
} else {
}

return self__.work_set.add(work_task);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2 = (function (this$,work_task){
var self__ = this;
var this$__$1 = this;
self__.work_set.delete(work_task);

if((self__.work_set.size === (0))){
return self__.scheduler.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2(null,this$__$1);
} else {
return null;
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3 = (function (this$,callback,trigger){
var self__ = this;
var this$__$1 = this;
return self__.scheduler.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3(null,callback,trigger);
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IWork$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.shadow$grove$protocols$IWork$work_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(self__.error_QMARK_){
return null;
} else {
try{while(true){
if(this$__$1.work_pending_QMARK_()){
this$__$1.run_next_BANG_();

continue;
} else {
}
break;
}

var iter = self__.work_set.values();
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
}catch (e12336){var ex = e12336;
return this$__$1.handle_error_BANG_(ex);
}}
}));

(shadow.grove.components.ManagedComponent.prototype.handle_error_BANG_ = (function (ex){
var self__ = this;
var this$ = this;
(self__.error_QMARK_ = true);

this$.unschedule_BANG_();

var err_fn = new cljs.core.Keyword("shadow.grove.components","error-handler","shadow.grove.components/error-handler",-1078927315).cljs$core$IFn$_invoke$arity$1(self__.parent_env);
return (err_fn.cljs$core$IFn$_invoke$arity$2 ? err_fn.cljs$core$IFn$_invoke$arity$2(this$,ex) : err_fn.call(null,this$,ex));
}));

(shadow.grove.components.ManagedComponent.prototype.get_hook_value = (function (idx){
var self__ = this;
var this$ = this;
return shadow.grove.protocols.hook_value((self__.hooks[idx]));
}));

(shadow.grove.components.ManagedComponent.prototype.invalidate_hook_BANG_ = (function (idx){
var self__ = this;
var this$ = this;
(self__.dirty_hooks = (self__.dirty_hooks | (1 << idx)));

(self__.current_idx = Math.min(idx,self__.current_idx));

(self__.suspended_QMARK_ = false);

return this$.schedule_BANG_(new cljs.core.Keyword("shadow.grove.components","hook-invalidate!","shadow.grove.components/hook-invalidate!",1205709960));
}));

(shadow.grove.components.ManagedComponent.prototype.mark_hooks_dirty_BANG_ = (function (dirty_bits){
var self__ = this;
var this$ = this;
(self__.dirty_hooks = (self__.dirty_hooks | dirty_bits));

return (self__.current_idx = shadow.grove.components.find_first_set_bit_idx(self__.dirty_hooks));
}));

(shadow.grove.components.ManagedComponent.prototype.mark_dirty_from_args_BANG_ = (function (dirty_bits){
var self__ = this;
var this$ = this;
(self__.dirty_from_args = (self__.dirty_from_args | dirty_bits));

return this$.mark_hooks_dirty_BANG_(dirty_bits);
}));

(shadow.grove.components.ManagedComponent.prototype.set_render_required_BANG_ = (function (){
var self__ = this;
var this$ = this;
(self__.needs_render_QMARK_ = true);

return (self__.current_idx = Math.min(self__.current_idx,self__.config.hooks.length));
}));

(shadow.grove.components.ManagedComponent.prototype.run_next_BANG_ = (function (){
var self__ = this;
var this$ = this;
if((self__.current_idx === self__.config.hooks.length)){
return this$.component_render_BANG_();
} else {
var hook = (self__.hooks[self__.current_idx]);
if(cljs.core.not(hook)){
var run_fn = (self__.config.hooks[self__.current_idx]).run;
var handle = (new shadow.grove.components.ComponentHookHandle(this$,self__.current_idx));
var val = run_fn(this$);
var hook__$1 = shadow.grove.components.maybe_wrap_val(val);
(self__.hooks[self__.current_idx] = hook__$1);

shadow.grove.protocols.hook_init_BANG_(hook__$1,handle);

(self__.dirty_hooks = (self__.dirty_hooks & ~(1 << self__.current_idx)));

(self__.updated_hooks = (self__.updated_hooks | (1 << self__.current_idx)));

if(((self__.config.render_deps & (1 << self__.current_idx)) != 0)){
(self__.needs_render_QMARK_ = true);
} else {
}

if((((!((hook__$1 == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === hook__$1.shadow$grove$protocols$IHookDomEffect$))))?true:(((!hook__$1.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.grove.protocols.IHookDomEffect,hook__$1):false)):cljs.core.native_satisfies_QMARK_(shadow.grove.protocols.IHookDomEffect,hook__$1))){
self__.hooks_with_effects.push(hook__$1);
} else {
}

if(cljs.core.truth_(shadow.grove.protocols.hook_ready_QMARK_(hook__$1))){
return (self__.current_idx = (self__.current_idx + (1)));
} else {
return this$.suspend_BANG_(self__.current_idx);
}
} else {
if(((self__.dirty_hooks & (1 << self__.current_idx)) != 0)){
var hook_config = (self__.config.hooks[self__.current_idx]);
var deps_updated_QMARK_ = ((((hook_config.depends_on & self__.updated_hooks) > (0))) || (((self__.dirty_from_args & (1 << self__.current_idx)) != 0)));
var run = hook_config.run;
var next_hook = shadow.grove.components.maybe_wrap_val(run(this$));
var _ = (((cljs.core.type(hook) === cljs.core.type(next_hook)))?null:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("illegal hook value, type cannot change",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"old","old",-1825222690),hook,new cljs.core.Keyword(null,"new","new",-2085437848),next_hook], null))})());
var did_update_QMARK_ = ((deps_updated_QMARK_)?shadow.grove.protocols.hook_deps_update_BANG_(hook,next_hook):shadow.grove.protocols.hook_update_BANG_(hook));
(self__.dirty_hooks = (self__.dirty_hooks & ~(1 << self__.current_idx)));

if(cljs.core.truth_(did_update_QMARK_)){
(self__.updated_hooks = (self__.updated_hooks | (1 << self__.current_idx)));

(self__.dirty_hooks = (self__.dirty_hooks | hook_config.affects));

if(((self__.config.render_deps & (1 << self__.current_idx)) != 0)){
(self__.needs_render_QMARK_ = true);
} else {
}
} else {
}

if(cljs.core.truth_(shadow.grove.protocols.hook_ready_QMARK_(hook))){
return (self__.current_idx = (self__.current_idx + (1)));
} else {
return this$.suspend_BANG_(self__.current_idx);
}
} else {
return (self__.current_idx = (self__.current_idx + (1)));

}
}
}
}));

(shadow.grove.components.ManagedComponent.prototype.work_pending_QMARK_ = (function (){
var self__ = this;
var this$ = this;
return (((!(self__.destroyed_QMARK_))) && ((((!(self__.suspended_QMARK_))) && ((((!(self__.error_QMARK_))) && ((((self__.dirty_hooks > (0))) || (((self__.needs_render_QMARK_) || ((self__.config.hooks.length >= self__.current_idx)))))))))));
}));

(shadow.grove.components.ManagedComponent.prototype.suspend_BANG_ = (function (hook_causing_suspend){
var self__ = this;
var this$ = this;
this$.unschedule_BANG_();

self__.scheduler.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2(null,this$);

return (self__.suspended_QMARK_ = true);
}));

(shadow.grove.components.ManagedComponent.prototype.schedule_BANG_ = (function (trigger){
var self__ = this;
var this$ = this;
if(self__.destroyed_QMARK_){
return null;
} else {
return self__.scheduler.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3(null,this$,trigger);
}
}));

(shadow.grove.components.ManagedComponent.prototype.unschedule_BANG_ = (function (){
var self__ = this;
var this$ = this;
return self__.scheduler.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2(null,this$);
}));

(shadow.grove.components.ManagedComponent.prototype.component_render_BANG_ = (function (){
var self__ = this;
var this$ = this;
if((self__.dirty_hooks === (0))){
} else {
throw (new Error(["Assert failed: ","Got to render while hooks are dirty","\n","(zero? dirty-hooks)"].join('')));
}

(self__.updated_hooks = ((0) | (0)));

(self__.dirty_from_args = ((0) | (0)));

var did_render_QMARK__12592 = self__.needs_render_QMARK_;
if(self__.needs_render_QMARK_){
var frag_12593 = self__.config.render_fn(this$);
(self__.rendered_args = self__.args);

(self__.needs_render_QMARK_ = false);

shadow.arborist.protocols.update_BANG_(self__.root,frag_12593);
} else {
}

if(self__.dom_entered_QMARK_){
this$.did_update_BANG_(did_render_QMARK__12592);
} else {
}

(self__.current_idx = (self__.current_idx + (1)));

self__.scheduler.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2(null,this$);

return this$.unschedule_BANG_();
}));

(shadow.grove.components.ManagedComponent.prototype.did_update_BANG_ = (function (did_render_QMARK_){
var self__ = this;
var this$ = this;
return self__.hooks_with_effects.forEach((function (item){
return item.shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$arity$2(null,did_render_QMARK_);
}));
}));
(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IHandleDOMEvents$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IHandleDOMEvents$validate_dom_event_value_BANG_$arity$4 = (function (this$,env,event,ev_value){
var this$__$1 = this;
if((((ev_value instanceof cljs.core.Keyword)) || (cljs.core.map_QMARK_(ev_value)))){
return null;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["event: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(event)," expects a map or keyword value"].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"event","event",301435442),event,new cljs.core.Keyword(null,"value","value",305978217),ev_value], null));
}
}));

(shadow.grove.components.ManagedComponent.prototype.shadow$arborist$protocols$IHandleDOMEvents$handle_dom_event_BANG_$arity$5 = (function (this$,event_env,event,ev_value,dom_event){
var this$__$1 = this;
var ev_map = ((cljs.core.map_QMARK_(ev_value))?ev_value:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),ev_value], null));
return shadow.grove.protocols.run_now_BANG_(this$__$1.scheduler,(function (){
return shadow.grove.protocols.handle_event_BANG_(this$__$1,ev_map,dom_event,event_env);
}),new cljs.core.Keyword("shadow.grove.components","handle-dom-event!","shadow.grove.components/handle-dom-event!",476157374));
}));
shadow.grove.components.component_create = (function shadow$grove$components$component_create(env,config,args){
if(goog.DEBUG){
if((config instanceof shadow.grove.protocols.ComponentConfig)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("not a component definition",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"config","config",994861415),config,new cljs.core.Keyword(null,"props","props",453281727),args], null));
}
} else {
}

var G__12397 = (new shadow.grove.components.ManagedComponent(env,config,args));
shadow.grove.protocols.work_BANG_(G__12397);

return G__12397;
});

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {shadow.arborist.protocols.IConstruct}
*/
shadow.grove.components.ComponentInit = (function (component,args){
this.component = component;
this.args = args;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.grove.components.ComponentInit.prototype.shadow$arborist$protocols$IConstruct$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ComponentInit.prototype.shadow$arborist$protocols$IConstruct$as_managed$arity$2 = (function (this$,env){
var self__ = this;
var this$__$1 = this;
return shadow.grove.components.component_create(env,self__.component,self__.args);
}));

(shadow.grove.components.ComponentInit.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof shadow.grove.components.ComponentInit)) && ((((self__.component === other.component)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.args,other.args)))));
}));

(shadow.grove.components.ComponentInit.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"component","component",-1098498987,null),new cljs.core.Symbol(null,"args","args",-1338879193,null)], null);
}));

(shadow.grove.components.ComponentInit.cljs$lang$type = true);

(shadow.grove.components.ComponentInit.cljs$lang$ctorStr = "shadow.grove.components/ComponentInit");

(shadow.grove.components.ComponentInit.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.components/ComponentInit");
}));

/**
 * Positional factory function for shadow.grove.components/ComponentInit.
 */
shadow.grove.components.__GT_ComponentInit = (function shadow$grove$components$__GT_ComponentInit(component,args){
return (new shadow.grove.components.ComponentInit(component,args));
});

shadow.grove.components.component_init_QMARK_ = (function shadow$grove$components$component_init_QMARK_(x){
return (x instanceof shadow.grove.components.ComponentInit);
});

/**
* @constructor
*/
shadow.grove.components.HookConfig = (function (depends_on,affects,run){
this.depends_on = depends_on;
this.affects = affects;
this.run = run;
});

(shadow.grove.components.HookConfig.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"depends-on","depends-on",192089505,null),new cljs.core.Symbol(null,"affects","affects",-118795949,null),new cljs.core.Symbol(null,"run","run",-180635126,null)], null);
}));

(shadow.grove.components.HookConfig.cljs$lang$type = true);

(shadow.grove.components.HookConfig.cljs$lang$ctorStr = "shadow.grove.components/HookConfig");

(shadow.grove.components.HookConfig.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.components/HookConfig");
}));

/**
 * Positional factory function for shadow.grove.components/HookConfig.
 */
shadow.grove.components.__GT_HookConfig = (function shadow$grove$components$__GT_HookConfig(depends_on,affects,run){
return (new shadow.grove.components.HookConfig(depends_on,affects,run));
});

/**
 * used by defc macro, do not use directly
 */
shadow.grove.components.make_hook_config = (function shadow$grove$components$make_hook_config(depends_on,affects,run){
if(cljs.core.nat_int_QMARK_(depends_on)){
} else {
throw (new Error("Assert failed: (nat-int? depends-on)"));
}

if(cljs.core.nat_int_QMARK_(affects)){
} else {
throw (new Error("Assert failed: (nat-int? affects)"));
}

if(cljs.core.fn_QMARK_(run)){
} else {
throw (new Error("Assert failed: (fn? run)"));
}

return (new shadow.grove.components.HookConfig(depends_on,affects,run));
});
/**
 * used by defc macro, do not use directly
 */
shadow.grove.components.make_component_config = (function shadow$grove$components$make_component_config(component_name,hooks,opts,check_args_fn,render_deps,render_fn,events){
if(typeof component_name === 'string'){
} else {
throw (new Error("Assert failed: (string? component-name)"));
}

if(cljs.core.array_QMARK_(hooks)){
} else {
throw (new Error("Assert failed: (array? hooks)"));
}

if(cljs.core.every_QMARK_((function (p1__12417_SHARP_){
return (p1__12417_SHARP_ instanceof shadow.grove.components.HookConfig);
}),hooks)){
} else {
throw (new Error("Assert failed: (every? (fn* [p1__12417#] (instance? HookConfig p1__12417#)) hooks)"));
}

if(cljs.core.map_QMARK_(opts)){
} else {
throw (new Error("Assert failed: (map? opts)"));
}

if(cljs.core.fn_QMARK_(check_args_fn)){
} else {
throw (new Error("Assert failed: (fn? check-args-fn)"));
}

if(cljs.core.nat_int_QMARK_(render_deps)){
} else {
throw (new Error("Assert failed: (nat-int? render-deps)"));
}

if(cljs.core.fn_QMARK_(render_fn)){
} else {
throw (new Error("Assert failed: (fn? render-fn)"));
}

if(cljs.core.map_QMARK_(events)){
} else {
throw (new Error("Assert failed: (map? events)"));
}

var cfg = (new shadow.grove.protocols.ComponentConfig(component_name,hooks,opts,check_args_fn,render_deps,render_fn,events));
if(goog.DEBUG){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.grove.components.components_ref,cljs.core.assoc,component_name,cfg);
} else {
}

return cfg;
});
shadow.grove.components.get_arg = (function shadow$grove$components$get_arg(comp,idx){
return comp.args.cljs$core$IIndexed$_nth$arity$2(null,idx);
});
shadow.grove.components.check_args_BANG_ = (function shadow$grove$components$check_args_BANG_(comp,new_args,expected){
if((cljs.core.count(new_args) >= expected)){
return null;
} else {
throw (new Error(["Assert failed: ",["component ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(comp.config.component_name)," expected at least ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(expected)," arguments"].join(''),"\n","(>= (count new-args) expected)"].join('')));
}
});
shadow.grove.components.arg_triggers_hooks_BANG_ = (function shadow$grove$components$arg_triggers_hooks_BANG_(comp,idx,dirty_bits){
return comp.mark_dirty_from_args_BANG_(dirty_bits);
});
shadow.grove.components.arg_triggers_render_BANG_ = (function shadow$grove$components$arg_triggers_render_BANG_(comp,idx){
return comp.set_render_required_BANG_();
});
shadow.grove.components.get_hook_value = (function shadow$grove$components$get_hook_value(comp,idx){
return comp.get_hook_value(idx);
});
shadow.grove.components.get_events = (function shadow$grove$components$get_events(comp){
return comp.config.events;
});
shadow.grove.components.get_parent = (function shadow$grove$components$get_parent(comp){
return shadow.grove.components.get_component(comp.parent_env);
});
shadow.grove.components.get_component_name = (function shadow$grove$components$get_component_name(comp){
return comp.config.component_name;
});

//# sourceMappingURL=shadow.grove.components.js.map

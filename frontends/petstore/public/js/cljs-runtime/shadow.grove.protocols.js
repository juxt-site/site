goog.provide('shadow.grove.protocols');

/**
 * @interface
 */
shadow.grove.protocols.IWork = function(){};

var shadow$grove$protocols$IWork$work_BANG_$dyn_11789 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.work_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.work_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IWork.work!",this$);
}
}
});
shadow.grove.protocols.work_BANG_ = (function shadow$grove$protocols$work_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IWork$work_BANG_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IWork$work_BANG_$arity$1(this$);
} else {
return shadow$grove$protocols$IWork$work_BANG_$dyn_11789(this$);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IScheduleWork = function(){};

var shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$dyn_11791 = (function (this$,task,trigger){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.schedule_work_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(this$,task,trigger) : m__5394__auto__.call(null,this$,task,trigger));
} else {
var m__5392__auto__ = (shadow.grove.protocols.schedule_work_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(this$,task,trigger) : m__5392__auto__.call(null,this$,task,trigger));
} else {
throw cljs.core.missing_protocol("IScheduleWork.schedule-work!",this$);
}
}
});
shadow.grove.protocols.schedule_work_BANG_ = (function shadow$grove$protocols$schedule_work_BANG_(this$,task,trigger){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3 == null)))))){
return this$.shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$arity$3(this$,task,trigger);
} else {
return shadow$grove$protocols$IScheduleWork$schedule_work_BANG_$dyn_11791(this$,task,trigger);
}
});

var shadow$grove$protocols$IScheduleWork$unschedule_BANG_$dyn_11808 = (function (this$,task){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.unschedule_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,task) : m__5394__auto__.call(null,this$,task));
} else {
var m__5392__auto__ = (shadow.grove.protocols.unschedule_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,task) : m__5392__auto__.call(null,this$,task));
} else {
throw cljs.core.missing_protocol("IScheduleWork.unschedule!",this$);
}
}
});
shadow.grove.protocols.unschedule_BANG_ = (function shadow$grove$protocols$unschedule_BANG_(this$,task){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IScheduleWork$unschedule_BANG_$arity$2(this$,task);
} else {
return shadow$grove$protocols$IScheduleWork$unschedule_BANG_$dyn_11808(this$,task);
}
});

var shadow$grove$protocols$IScheduleWork$run_now_BANG_$dyn_11810 = (function (this$,action,trigger){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.run_now_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(this$,action,trigger) : m__5394__auto__.call(null,this$,action,trigger));
} else {
var m__5392__auto__ = (shadow.grove.protocols.run_now_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(this$,action,trigger) : m__5392__auto__.call(null,this$,action,trigger));
} else {
throw cljs.core.missing_protocol("IScheduleWork.run-now!",this$);
}
}
});
shadow.grove.protocols.run_now_BANG_ = (function shadow$grove$protocols$run_now_BANG_(this$,action,trigger){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3 == null)))))){
return this$.shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3(this$,action,trigger);
} else {
return shadow$grove$protocols$IScheduleWork$run_now_BANG_$dyn_11810(this$,action,trigger);
}
});

var shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$dyn_11812 = (function (this$,target){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.did_suspend_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,target) : m__5394__auto__.call(null,this$,target));
} else {
var m__5392__auto__ = (shadow.grove.protocols.did_suspend_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,target) : m__5392__auto__.call(null,this$,target));
} else {
throw cljs.core.missing_protocol("IScheduleWork.did-suspend!",this$);
}
}
});
shadow.grove.protocols.did_suspend_BANG_ = (function shadow$grove$protocols$did_suspend_BANG_(this$,target){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$arity$2(this$,target);
} else {
return shadow$grove$protocols$IScheduleWork$did_suspend_BANG_$dyn_11812(this$,target);
}
});

var shadow$grove$protocols$IScheduleWork$did_finish_BANG_$dyn_11815 = (function (this$,target){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.did_finish_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,target) : m__5394__auto__.call(null,this$,target));
} else {
var m__5392__auto__ = (shadow.grove.protocols.did_finish_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,target) : m__5392__auto__.call(null,this$,target));
} else {
throw cljs.core.missing_protocol("IScheduleWork.did-finish!",this$);
}
}
});
shadow.grove.protocols.did_finish_BANG_ = (function shadow$grove$protocols$did_finish_BANG_(this$,target){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IScheduleWork$did_finish_BANG_$arity$2(this$,target);
} else {
return shadow$grove$protocols$IScheduleWork$did_finish_BANG_$dyn_11815(this$,target);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IHandleEvents = function(){};

var shadow$grove$protocols$IHandleEvents$handle_event_BANG_$dyn_11818 = (function (this$,ev_map,e,origin){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.handle_event_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(this$,ev_map,e,origin) : m__5394__auto__.call(null,this$,ev_map,e,origin));
} else {
var m__5392__auto__ = (shadow.grove.protocols.handle_event_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(this$,ev_map,e,origin) : m__5392__auto__.call(null,this$,ev_map,e,origin));
} else {
throw cljs.core.missing_protocol("IHandleEvents.handle-event!",this$);
}
}
});
shadow.grove.protocols.handle_event_BANG_ = (function shadow$grove$protocols$handle_event_BANG_(this$,ev_map,e,origin){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHandleEvents$handle_event_BANG_$arity$4 == null)))))){
return this$.shadow$grove$protocols$IHandleEvents$handle_event_BANG_$arity$4(this$,ev_map,e,origin);
} else {
return shadow$grove$protocols$IHandleEvents$handle_event_BANG_$dyn_11818(this$,ev_map,e,origin);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IHook = function(){};

var shadow$grove$protocols$IHook$hook_init_BANG_$dyn_11824 = (function (this$,component_handle){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_init_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,component_handle) : m__5394__auto__.call(null,this$,component_handle));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_init_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,component_handle) : m__5392__auto__.call(null,this$,component_handle));
} else {
throw cljs.core.missing_protocol("IHook.hook-init!",this$);
}
}
});
shadow.grove.protocols.hook_init_BANG_ = (function shadow$grove$protocols$hook_init_BANG_(this$,component_handle){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2(this$,component_handle);
} else {
return shadow$grove$protocols$IHook$hook_init_BANG_$dyn_11824(this$,component_handle);
}
});

var shadow$grove$protocols$IHook$hook_ready_QMARK_$dyn_11831 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_ready_QMARK_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_ready_QMARK_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IHook.hook-ready?",this$);
}
}
});
shadow.grove.protocols.hook_ready_QMARK_ = (function shadow$grove$protocols$hook_ready_QMARK_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1(this$);
} else {
return shadow$grove$protocols$IHook$hook_ready_QMARK_$dyn_11831(this$);
}
});

var shadow$grove$protocols$IHook$hook_value$dyn_11833 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_value[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_value["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IHook.hook-value",this$);
}
}
});
shadow.grove.protocols.hook_value = (function shadow$grove$protocols$hook_value(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_value$arity$1 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_value$arity$1(this$);
} else {
return shadow$grove$protocols$IHook$hook_value$dyn_11833(this$);
}
});

var shadow$grove$protocols$IHook$hook_deps_update_BANG_$dyn_11839 = (function (this$,val){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_deps_update_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,val) : m__5394__auto__.call(null,this$,val));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_deps_update_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,val) : m__5392__auto__.call(null,this$,val));
} else {
throw cljs.core.missing_protocol("IHook.hook-deps-update!",this$);
}
}
});
shadow.grove.protocols.hook_deps_update_BANG_ = (function shadow$grove$protocols$hook_deps_update_BANG_(this$,val){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2(this$,val);
} else {
return shadow$grove$protocols$IHook$hook_deps_update_BANG_$dyn_11839(this$,val);
}
});

var shadow$grove$protocols$IHook$hook_update_BANG_$dyn_11842 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_update_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_update_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IHook.hook-update!",this$);
}
}
});
shadow.grove.protocols.hook_update_BANG_ = (function shadow$grove$protocols$hook_update_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1(this$);
} else {
return shadow$grove$protocols$IHook$hook_update_BANG_$dyn_11842(this$);
}
});

var shadow$grove$protocols$IHook$hook_destroy_BANG_$dyn_11844 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_destroy_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_destroy_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IHook.hook-destroy!",this$);
}
}
});
shadow.grove.protocols.hook_destroy_BANG_ = (function shadow$grove$protocols$hook_destroy_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1(this$);
} else {
return shadow$grove$protocols$IHook$hook_destroy_BANG_$dyn_11844(this$);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IHookDomEffect = function(){};

var shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$dyn_11846 = (function (this$,did_render_QMARK_){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_did_update_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,did_render_QMARK_) : m__5394__auto__.call(null,this$,did_render_QMARK_));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_did_update_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,did_render_QMARK_) : m__5392__auto__.call(null,this$,did_render_QMARK_));
} else {
throw cljs.core.missing_protocol("IHookDomEffect.hook-did-update!",this$);
}
}
});
shadow.grove.protocols.hook_did_update_BANG_ = (function shadow$grove$protocols$hook_did_update_BANG_(this$,did_render_QMARK_){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$arity$2 == null)))))){
return this$.shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$arity$2(this$,did_render_QMARK_);
} else {
return shadow$grove$protocols$IHookDomEffect$hook_did_update_BANG_$dyn_11846(this$,did_render_QMARK_);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IComponentHookHandle = function(){};

var shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$dyn_11852 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.hook_invalidate_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.hook_invalidate_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IComponentHookHandle.hook-invalidate!",this$);
}
}
});
/**
 * called when a hook wants the component to refresh
 */
shadow.grove.protocols.hook_invalidate_BANG_ = (function shadow$grove$protocols$hook_invalidate_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$arity$1(this$);
} else {
return shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$dyn_11852(this$);
}
});


/**
 * @interface
 */
shadow.grove.protocols.IEnvSource = function(){};

var shadow$grove$protocols$IEnvSource$get_component_env$dyn_11857 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.get_component_env[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.get_component_env["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IEnvSource.get-component-env",this$);
}
}
});
shadow.grove.protocols.get_component_env = (function shadow$grove$protocols$get_component_env(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IEnvSource$get_component_env$arity$1 == null)))))){
return this$.shadow$grove$protocols$IEnvSource$get_component_env$arity$1(this$);
} else {
return shadow$grove$protocols$IEnvSource$get_component_env$dyn_11857(this$);
}
});


/**
 * @interface
 */
shadow.grove.protocols.ISchedulerSource = function(){};

var shadow$grove$protocols$ISchedulerSource$get_scheduler$dyn_11861 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.get_scheduler[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.get_scheduler["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("ISchedulerSource.get-scheduler",this$);
}
}
});
shadow.grove.protocols.get_scheduler = (function shadow$grove$protocols$get_scheduler(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$ISchedulerSource$get_scheduler$arity$1 == null)))))){
return this$.shadow$grove$protocols$ISchedulerSource$get_scheduler$arity$1(this$);
} else {
return shadow$grove$protocols$ISchedulerSource$get_scheduler$dyn_11861(this$);
}
});


/**
* @constructor
*/
shadow.grove.protocols.ComponentConfig = (function (component_name,hooks,opts,check_args_fn,render_deps,render_fn,events){
this.component_name = component_name;
this.hooks = hooks;
this.opts = opts;
this.check_args_fn = check_args_fn;
this.render_deps = render_deps;
this.render_fn = render_fn;
this.events = events;
});

(shadow.grove.protocols.ComponentConfig.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"component-name","component-name",321855471,null),new cljs.core.Symbol(null,"hooks","hooks",1226941424,null),new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"check-args-fn","check-args-fn",-1217445005,null),new cljs.core.Symbol(null,"render-deps","render-deps",481702797,null),new cljs.core.Symbol(null,"render-fn","render-fn",2039328045,null),new cljs.core.Symbol(null,"events","events",-861883568,null)], null);
}));

(shadow.grove.protocols.ComponentConfig.cljs$lang$type = true);

(shadow.grove.protocols.ComponentConfig.cljs$lang$ctorStr = "shadow.grove.protocols/ComponentConfig");

(shadow.grove.protocols.ComponentConfig.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.protocols/ComponentConfig");
}));

/**
 * Positional factory function for shadow.grove.protocols/ComponentConfig.
 */
shadow.grove.protocols.__GT_ComponentConfig = (function shadow$grove$protocols$__GT_ComponentConfig(component_name,hooks,opts,check_args_fn,render_deps,render_fn,events){
return (new shadow.grove.protocols.ComponentConfig(component_name,hooks,opts,check_args_fn,render_deps,render_fn,events));
});


/**
 * @interface
 */
shadow.grove.protocols.IQuery = function(){};

var shadow$grove$protocols$IQuery$query_refresh_BANG_$dyn_11864 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.protocols.query_refresh_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.protocols.query_refresh_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IQuery.query-refresh!",this$);
}
}
});
shadow.grove.protocols.query_refresh_BANG_ = (function shadow$grove$protocols$query_refresh_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$protocols$IQuery$query_refresh_BANG_$arity$1 == null)))))){
return this$.shadow$grove$protocols$IQuery$query_refresh_BANG_$arity$1(this$);
} else {
return shadow$grove$protocols$IQuery$query_refresh_BANG_$dyn_11864(this$);
}
});


//# sourceMappingURL=shadow.grove.protocols.js.map

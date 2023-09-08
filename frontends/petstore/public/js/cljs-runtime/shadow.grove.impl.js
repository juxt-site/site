goog.provide('shadow.grove.impl');
shadow.grove.impl.js_set_union = (function shadow$grove$impl$js_set_union(a,b){
return b.forEach((function (x){
return a.add(x);
}));
});
shadow.grove.impl.work_queue_task_BANG_ = (cljs.core.truth_(window.requestIdleCallback)?(function (work_task){
return window.requestIdleCallback(work_task);
}):(function (work_task){
return setTimeout((function (){
var start = Date.now();
var fake_deadline = ({"timeRemaining": (function (){
return ((16) < (Date.now() - start));
})});
return work_task(fake_deadline);
}),(0));
}));
shadow.grove.impl.work_queue_cancel_BANG_ = (cljs.core.truth_(window.cancelIdleCallback)?(function (id){
return window.cancelIdleCallback(id);
}):(function (id){
return clearTimeout(id);
}));
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.impl !== 'undefined') && (typeof shadow.grove.impl.index_queue !== 'undefined')){
} else {
shadow.grove.impl.index_queue = (new Array());
}
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.impl !== 'undefined') && (typeof shadow.grove.impl.work_queued_QMARK_ !== 'undefined')){
} else {
shadow.grove.impl.work_queued_QMARK_ = false;
}
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.impl !== 'undefined') && (typeof shadow.grove.impl.work_timeout !== 'undefined')){
} else {
shadow.grove.impl.work_timeout = null;
}
shadow.grove.impl.index_work_all_BANG_ = (function shadow$grove$impl$index_work_all_BANG_(){
if(shadow.grove.impl.work_queued_QMARK_){
if(cljs.core.truth_(shadow.grove.impl.work_timeout)){
shadow.grove.impl.work_queue_cancel_BANG_(shadow.grove.impl.work_timeout);

(shadow.grove.impl.work_timeout = null);
} else {
}

while(true){
var task_12780 = shadow.grove.impl.index_queue.shift();
if(task_12780){
task_12780();

continue;
} else {
}
break;
}

return (shadow.grove.impl.work_queued_QMARK_ = false);
} else {
return null;
}
});
shadow.grove.impl.index_work_some_BANG_ = (function shadow$grove$impl$index_work_some_BANG_(deadline){
while(true){
if((deadline.timeRemaining() > (0))){
var task_12781 = shadow.grove.impl.index_queue.shift();
if(task_12781){
task_12781();

continue;
} else {
}
} else {
}
break;
}

if((shadow.grove.impl.index_queue.length > (0))){
(shadow.grove.impl.work_timeout = shadow.grove.impl.work_queue_task_BANG_(shadow.grove.impl.index_work_some_BANG_));

return (shadow.grove.impl.work_queued_QMARK_ = true);
} else {
(shadow.grove.impl.work_timeout = null);

return (shadow.grove.impl.work_queued_QMARK_ = false);
}
});
shadow.grove.impl.index_queue_some_BANG_ = (function shadow$grove$impl$index_queue_some_BANG_(){
if(shadow.grove.impl.work_queued_QMARK_){
return null;
} else {
(shadow.grove.impl.work_timeout = shadow.grove.impl.work_queue_task_BANG_(shadow.grove.impl.index_work_some_BANG_));

return (shadow.grove.impl.work_queued_QMARK_ = true);
}
});
shadow.grove.impl.index_query_STAR_ = (function shadow$grove$impl$index_query_STAR_(p__12602,query_id,prev_keys,next_keys){
var map__12603 = p__12602;
var map__12603__$1 = cljs.core.__destructure_map(map__12603);
var active_queries_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12603__$1,new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771));
var key_index_seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12603__$1,new cljs.core.Keyword("shadow.grove.runtime","key-index-seq","shadow.grove.runtime/key-index-seq",1103349112));
var key_index_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12603__$1,new cljs.core.Keyword("shadow.grove.runtime","key-index-ref","shadow.grove.runtime/key-index-ref",-1341451448));
var query_index_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12603__$1,new cljs.core.Keyword("shadow.grove.runtime","query-index-map","shadow.grove.runtime/query-index-map",1244541445));
if(cljs.core.truth_(active_queries_map.has(query_id))){
var key_index = cljs.core.deref(key_index_ref);
cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,key){
if(cljs.core.contains_QMARK_(prev_keys,key)){
} else {
var key_idx_12782 = (function (){var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(key_index,key);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var idx = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(key_index_seq,cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(key_index_ref,cljs.core.assoc,key,idx);

return idx;
}
})();
var query_set_12783 = (function (){var or__5045__auto__ = query_index_map.get(key_idx_12782);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var query_set_12783 = (new Set());
query_index_map.set(key_idx_12782,query_set_12783);

return query_set_12783;
}
})();
query_set_12783.add(query_id);
}

return null;
}),null,next_keys);

if(cljs.core.truth_(prev_keys)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,key){
if(cljs.core.contains_QMARK_(next_keys,key)){
return null;
} else {
var key_idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(key_index,key);
var query_set = query_index_map.get(key_idx);
if(query_set){
return query_set.delete(query_id);
} else {
return null;
}
}
}),null,prev_keys);
} else {
return null;
}
} else {
return null;
}
});
shadow.grove.impl.index_query = (function shadow$grove$impl$index_query(env,query_id,prev_keys,next_keys){
shadow.grove.impl.index_queue.push((function (){
return shadow.grove.impl.index_query_STAR_(env,query_id,prev_keys,next_keys);
}));

return shadow.grove.impl.index_queue_some_BANG_();
});
shadow.grove.impl.unindex_query_STAR_ = (function shadow$grove$impl$unindex_query_STAR_(p__12605,query_id,keys){
var map__12606 = p__12605;
var map__12606__$1 = cljs.core.__destructure_map(map__12606);
var key_index_seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12606__$1,new cljs.core.Keyword("shadow.grove.runtime","key-index-seq","shadow.grove.runtime/key-index-seq",1103349112));
var key_index_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12606__$1,new cljs.core.Keyword("shadow.grove.runtime","key-index-ref","shadow.grove.runtime/key-index-ref",-1341451448));
var query_index_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12606__$1,new cljs.core.Keyword("shadow.grove.runtime","query-index-map","shadow.grove.runtime/query-index-map",1244541445));
var key_index = cljs.core.deref(key_index_ref);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,key){
var key_idx = (function (){var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(key_index,key);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var idx = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(key_index_seq,cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(key_index_ref,cljs.core.assoc,key,idx);

return idx;
}
})();
var temp__5808__auto__ = query_index_map.get(key_idx);
if((temp__5808__auto__ == null)){
return null;
} else {
var query_set = temp__5808__auto__;
return query_set.delete(query_id);
}
}),null,keys);
});
shadow.grove.impl.unindex_query = (function shadow$grove$impl$unindex_query(env,query_id,keys){
shadow.grove.impl.index_queue.push((function (){
return shadow.grove.impl.unindex_query_STAR_(env,query_id,keys);
}));

return shadow.grove.impl.index_queue_some_BANG_();
});
shadow.grove.impl.invalidate_keys_BANG_ = (function shadow$grove$impl$invalidate_keys_BANG_(p__12608,keys_new,keys_removed,keys_updated){
var map__12609 = p__12608;
var map__12609__$1 = cljs.core.__destructure_map(map__12609);
var env = map__12609__$1;
var active_queries_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12609__$1,new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771));
var query_index_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12609__$1,new cljs.core.Keyword("shadow.grove.runtime","query-index-map","shadow.grove.runtime/query-index-map",1244541445));
var key_index_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12609__$1,new cljs.core.Keyword("shadow.grove.runtime","key-index-ref","shadow.grove.runtime/key-index-ref",-1341451448));
shadow.grove.impl.index_work_all_BANG_();

var keys_to_invalidate = clojure.set.union.cljs$core$IFn$_invoke$arity$variadic(keys_new,keys_updated,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([keys_removed], 0));
var key_index = cljs.core.deref(key_index_ref);
var query_ids = (new Set());
cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (_,key){
var temp__5808__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(key_index,key);
if((temp__5808__auto__ == null)){
return null;
} else {
var key_id = temp__5808__auto__;
var temp__5808__auto____$1 = query_index_map.get(key_id);
if((temp__5808__auto____$1 == null)){
return null;
} else {
var query_set = temp__5808__auto____$1;
return shadow.grove.impl.js_set_union(query_ids,query_set);
}
}
}),null,keys_to_invalidate);

return query_ids.forEach((function (query_id){
var temp__5808__auto__ = active_queries_map.get(query_id);
if((temp__5808__auto__ == null)){
return null;
} else {
var query = temp__5808__auto__;
return shadow.grove.protocols.query_refresh_BANG_(query);
}
}));
});
shadow.grove.impl.merge_result = (function shadow$grove$impl$merge_result(tx_env,ev,result){
if((result == null)){
return tx_env;
} else {
if((!(cljs.core.map_QMARK_(result)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["tx handler returned invalid result for event ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(ev))].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"event","event",301435442),ev,new cljs.core.Keyword(null,"env","env",-1815813235),tx_env,new cljs.core.Keyword(null,"result","result",1415092211),result], null));
} else {
if((new cljs.core.Keyword("shadow.grove.impl","tx-guard","shadow.grove.impl/tx-guard",1063602673).cljs$core$IFn$_invoke$arity$1(tx_env) === new cljs.core.Keyword("shadow.grove.impl","tx-guard","shadow.grove.impl/tx-guard",1063602673).cljs$core$IFn$_invoke$arity$1(result))){
return result;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["tx handler returned invalid result for event",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"e","e",1381269198).cljs$core$IFn$_invoke$arity$1(ev)),", expected a modified env"].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"event","event",301435442),ev,new cljs.core.Keyword(null,"env","env",-1815813235),tx_env,new cljs.core.Keyword(null,"result","result",1415092211),result], null));

}
}
}
});
shadow.grove.impl.unhandled_event_ex_BANG_ = (function shadow$grove$impl$unhandled_event_ex_BANG_(ev_id,tx,origin){
if(cljs.core.truth_((function (){var and__5043__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.map_QMARK_(origin);
} else {
return and__5043__auto__;
}
})())){
var comp = shadow.grove.components.get_component(origin);
var err_msg = ["Unhandled Event ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev_id),"\n    Component Trace:"].join('');
while(true){
if(cljs.core.not(comp)){
console.error(err_msg);

throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Unhandled Event ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev_id)].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ev-id","ev-id",1383435917),ev_id,new cljs.core.Keyword(null,"tx","tx",466630418),tx,new cljs.core.Keyword(null,"origin","origin",1037372088),origin], null));
} else {
var G__12785 = shadow.grove.components.get_parent(comp);
var G__12786 = [err_msg,"\n    ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(shadow.grove.components.get_component_name(comp))].join('');
comp = G__12785;
err_msg = G__12786;
continue;
}
break;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Unhandled Event ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev_id)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ev-id","ev-id",1383435917),ev_id,new cljs.core.Keyword(null,"tx","tx",466630418),tx], null));
}
});
shadow.grove.impl.process_event = (function shadow$grove$impl$process_event(rt_ref,p__12631,origin){
var map__12632 = p__12631;
var map__12632__$1 = cljs.core.__destructure_map(map__12632);
var ev = map__12632__$1;
var ev_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12632__$1,new cljs.core.Keyword(null,"e","e",1381269198));
if(cljs.core.map_QMARK_(ev)){
} else {
throw (new Error("Assert failed: (map? ev)"));
}

if((ev_id instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? ev-id)"));
}

var map__12661 = cljs.core.deref(rt_ref);
var map__12661__$1 = cljs.core.__destructure_map(map__12661);
var env = map__12661__$1;
var data_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12661__$1,new cljs.core.Keyword("shadow.grove.runtime","data-ref","shadow.grove.runtime/data-ref",-1688628375));
var event_config = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12661__$1,new cljs.core.Keyword("shadow.grove.runtime","event-config","shadow.grove.runtime/event-config",-570686649));
var fx_config = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12661__$1,new cljs.core.Keyword("shadow.grove.runtime","fx-config","shadow.grove.runtime/fx-config",-254676192));
var handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(event_config,ev_id);
if(cljs.core.not(handler)){
return shadow.grove.impl.unhandled_event_ex_BANG_(ev_id,ev,origin);
} else {
var before = cljs.core.deref(data_ref);
var tx_db = shadow.grove.db.transacted(before);
var tx_guard = (new Object());
var tx_done_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var tx_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(env,new cljs.core.Keyword("shadow.grove.impl","tx-guard","shadow.grove.impl/tx-guard",1063602673),tx_guard,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.grove.impl","fx","shadow.grove.impl/fx",1762490997),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"db","db",993250759),tx_db,new cljs.core.Keyword(null,"transact!","transact!",-822725810),(function (next_tx){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("transact! only allowed from fx env",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tx","tx",466630418),next_tx], null));
})], 0));
var result = shadow.grove.impl.merge_result(tx_env,ev,(handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(tx_env,ev) : handler.call(null,tx_env,ev)));
var map__12663 = shadow.grove.db.commit_BANG_(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(result));
var map__12663__$1 = cljs.core.__destructure_map(map__12663);
var tx_result = map__12663__$1;
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12663__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var keys_new = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12663__$1,new cljs.core.Keyword(null,"keys-new","keys-new",546185618));
var keys_removed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12663__$1,new cljs.core.Keyword(null,"keys-removed","keys-removed",-110314827));
var keys_updated = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12663__$1,new cljs.core.Keyword(null,"keys-updated","keys-updated",1209111301));
if((cljs.core.deref(data_ref) === before)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("someone messed with app-state while in tx",cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.reset_BANG_(data_ref,data);

if((before === data)){
} else {
shadow.grove.impl.invalidate_keys_BANG_(env,keys_new,keys_removed,keys_updated);
}

shadow.grove.runtime.next_tick((function (){
var seq__12667 = cljs.core.seq(new cljs.core.Keyword("shadow.grove.runtime","fx","shadow.grove.runtime/fx",-472553621).cljs$core$IFn$_invoke$arity$1(result));
var chunk__12668 = null;
var count__12669 = (0);
var i__12670 = (0);
while(true){
if((i__12670 < count__12669)){
var vec__12712 = chunk__12668.cljs$core$IIndexed$_nth$arity$2(null,i__12670);
var fx_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12712,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12712,(1),null);
var fx_fn_12793 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fx_config,fx_key);
var fx_env_12794 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"transact!","transact!",-822725810),((function (seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12793,vec__12712,fx_key,value,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id){
return (function (fx_tx){
if(cljs.core.truth_(cljs.core.deref(tx_done_ref))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot start another tx yet, current one is still running. transact! is meant for async events",cljs.core.PersistentArrayMap.EMPTY);
}

return new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009).cljs$core$IFn$_invoke$arity$1(env).shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3(null,((function (seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12793,vec__12712,fx_key,value,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id){
return (function (){
return (shadow.grove.impl.process_event.cljs$core$IFn$_invoke$arity$3 ? shadow.grove.impl.process_event.cljs$core$IFn$_invoke$arity$3(rt_ref,fx_tx,origin) : shadow.grove.impl.process_event.call(null,rt_ref,fx_tx,origin));
});})(seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12793,vec__12712,fx_key,value,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.impl","fx-transact!","shadow.grove.impl/fx-transact!",-1363650860),fx_key], null));
});})(seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12793,vec__12712,fx_key,value,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id))
);
if(cljs.core.not(fx_fn_12793)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["unknown fx ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fx_key)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fx-key","fx-key",-516894324),fx_key,new cljs.core.Keyword(null,"fx-value","fx-value",-522086181),value], null));
} else {
(fx_fn_12793.cljs$core$IFn$_invoke$arity$2 ? fx_fn_12793.cljs$core$IFn$_invoke$arity$2(fx_env_12794,value) : fx_fn_12793.call(null,fx_env_12794,value));
}


var G__12798 = seq__12667;
var G__12799 = chunk__12668;
var G__12800 = count__12669;
var G__12801 = (i__12670 + (1));
seq__12667 = G__12798;
chunk__12668 = G__12799;
count__12669 = G__12800;
i__12670 = G__12801;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__12667);
if(temp__5804__auto__){
var seq__12667__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12667__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__12667__$1);
var G__12803 = cljs.core.chunk_rest(seq__12667__$1);
var G__12804 = c__5568__auto__;
var G__12805 = cljs.core.count(c__5568__auto__);
var G__12806 = (0);
seq__12667 = G__12803;
chunk__12668 = G__12804;
count__12669 = G__12805;
i__12670 = G__12806;
continue;
} else {
var vec__12720 = cljs.core.first(seq__12667__$1);
var fx_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12720,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12720,(1),null);
var fx_fn_12812 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fx_config,fx_key);
var fx_env_12813 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"transact!","transact!",-822725810),((function (seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12812,vec__12720,fx_key,value,seq__12667__$1,temp__5804__auto__,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id){
return (function (fx_tx){
if(cljs.core.truth_(cljs.core.deref(tx_done_ref))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot start another tx yet, current one is still running. transact! is meant for async events",cljs.core.PersistentArrayMap.EMPTY);
}

return new cljs.core.Keyword("shadow.grove.runtime","scheduler","shadow.grove.runtime/scheduler",-1004241009).cljs$core$IFn$_invoke$arity$1(env).shadow$grove$protocols$IScheduleWork$run_now_BANG_$arity$3(null,((function (seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12812,vec__12720,fx_key,value,seq__12667__$1,temp__5804__auto__,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id){
return (function (){
return (shadow.grove.impl.process_event.cljs$core$IFn$_invoke$arity$3 ? shadow.grove.impl.process_event.cljs$core$IFn$_invoke$arity$3(rt_ref,fx_tx,origin) : shadow.grove.impl.process_event.call(null,rt_ref,fx_tx,origin));
});})(seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12812,vec__12720,fx_key,value,seq__12667__$1,temp__5804__auto__,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.impl","fx-transact!","shadow.grove.impl/fx-transact!",-1363650860),fx_key], null));
});})(seq__12667,chunk__12668,count__12669,i__12670,fx_fn_12812,vec__12720,fx_key,value,seq__12667__$1,temp__5804__auto__,map__12663,map__12663__$1,tx_result,data,keys_new,keys_removed,keys_updated,before,tx_db,tx_guard,tx_done_ref,tx_env,result,map__12661,map__12661__$1,env,data_ref,event_config,fx_config,handler,map__12632,map__12632__$1,ev,ev_id))
);
if(cljs.core.not(fx_fn_12812)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["unknown fx ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fx_key)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fx-key","fx-key",-516894324),fx_key,new cljs.core.Keyword(null,"fx-value","fx-value",-522086181),value], null));
} else {
(fx_fn_12812.cljs$core$IFn$_invoke$arity$2 ? fx_fn_12812.cljs$core$IFn$_invoke$arity$2(fx_env_12813,value) : fx_fn_12812.call(null,fx_env_12813,value));
}


var G__12827 = cljs.core.next(seq__12667__$1);
var G__12828 = null;
var G__12829 = (0);
var G__12830 = (0);
seq__12667 = G__12827;
chunk__12668 = G__12828;
count__12669 = G__12829;
i__12670 = G__12830;
continue;
}
} else {
return null;
}
}
break;
}
}));

var temp__5808__auto___12831 = new cljs.core.Keyword("shadow.grove.runtime","tx-reporter","shadow.grove.runtime/tx-reporter",-1162168653).cljs$core$IFn$_invoke$arity$1(env);
if((temp__5808__auto___12831 == null)){
} else {
var tx_reporter_12834 = temp__5808__auto___12831;
shadow.grove.runtime.next_tick((function (){
var report = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"keys-updated","keys-updated",1209111301),new cljs.core.Keyword(null,"db-after","db-after",-571884666),new cljs.core.Keyword(null,"env","env",-1815813235),new cljs.core.Keyword(null,"db-before","db-before",-553691536),new cljs.core.Keyword(null,"keys-new","keys-new",546185618),new cljs.core.Keyword(null,"event","event",301435442),new cljs.core.Keyword(null,"env-changes","env-changes",-1574460812),new cljs.core.Keyword(null,"keys-removed","keys-removed",-110314827),new cljs.core.Keyword(null,"origin","origin",1037372088),new cljs.core.Keyword(null,"fx","fx",-1237829572)],[keys_updated,data,env,before,keys_new,ev,cljs.core.reduce_kv((function (report,rkey,rval){
if((rval === cljs.core.get.cljs$core$IFn$_invoke$arity$2(env,rkey))){
return report;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(report,rkey,rval);
}
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(result,new cljs.core.Keyword(null,"db","db",993250759),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.grove.runtime","fx","shadow.grove.runtime/fx",-472553621),new cljs.core.Keyword("shadow.grove.impl","tx-guard","shadow.grove.impl/tx-guard",1063602673),new cljs.core.Keyword(null,"transact!","transact!",-822725810)], 0))),keys_removed,origin,new cljs.core.Keyword("shadow.grove.runtime","fx","shadow.grove.runtime/fx",-472553621).cljs$core$IFn$_invoke$arity$1(result)]);
return (tx_reporter_12834.cljs$core$IFn$_invoke$arity$1 ? tx_reporter_12834.cljs$core$IFn$_invoke$arity$1(report) : tx_reporter_12834.call(null,report));
}));
}

cljs.core.reset_BANG_(tx_done_ref,true);

return new cljs.core.Keyword(null,"return","return",-1891502105).cljs$core$IFn$_invoke$arity$1(result);
}
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IQuery}
 * @implements {shadow.grove.protocols.IHook}
*/
shadow.grove.impl.HookQuery = (function (ident,query,config,component_handle,rt_ref,active_queries_map,query_id,ready_QMARK_,read_count,read_keys,read_result){
this.ident = ident;
this.query = query;
this.config = config;
this.component_handle = component_handle;
this.rt_ref = rt_ref;
this.active_queries_map = active_queries_map;
this.query_id = query_id;
this.ready_QMARK_ = ready_QMARK_;
this.read_count = read_count;
this.read_keys = read_keys;
this.read_result = read_result;
});
(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_init_BANG_$arity$2 = (function (this$,ch){
var self__ = this;
var this$__$1 = this;
(self__.component_handle = ch);

var env_12839 = shadow.grove.protocols.get_component_env(ch);
(self__.rt_ref = new cljs.core.Keyword("shadow.grove.runtime","runtime-ref","shadow.grove.runtime/runtime-ref",252005090).cljs$core$IFn$_invoke$arity$1(env_12839));

(self__.active_queries_map = new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.rt_ref)));

(self__.query_id = shadow.grove.runtime.next_id());

self__.active_queries_map.set(self__.query_id,this$__$1);

return this$__$1.do_read_BANG_();
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = self__.ready_QMARK_;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"suspend","suspend",849690959).cljs$core$IFn$_invoke$arity$1(self__.config) === false;
}
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.read_result;
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_deps_update_BANG_$arity$2 = (function (this$,val){
var self__ = this;
var this$__$1 = this;
var new_ident = val.ident;
var ident_equal_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.ident,new_ident);
if(((ident_equal_QMARK_) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.query,val.query)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.config,val.config)))))){
return false;
} else {
if(ident_equal_QMARK_){
} else {
(self__.read_count = (0));
}

(self__.ident = new_ident);

(self__.query = val.query);

(self__.config = val.config);

var old_result = self__.read_result;
this$__$1.do_read_BANG_();

return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_result,self__.read_result);
}
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_update_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var old_result = self__.read_result;
this$__$1.do_read_BANG_();

return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_result,self__.read_result);
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IHook$hook_destroy_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
shadow.grove.impl.unindex_query(cljs.core.deref(self__.rt_ref),self__.query_id,self__.read_keys);

return self__.active_queries_map.delete(self__.query_id);
}));

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IQuery$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.impl.HookQuery.prototype.shadow$grove$protocols$IQuery$query_refresh_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.component_handle.shadow$grove$protocols$IComponentHookHandle$hook_invalidate_BANG_$arity$1(null);
}));

(shadow.grove.impl.HookQuery.prototype.do_read_BANG_ = (function (){
var self__ = this;
var this$ = this;
var query_env_12891 = cljs.core.deref(self__.rt_ref);
var db_12892 = cljs.core.deref(new cljs.core.Keyword("shadow.grove.runtime","data-ref","shadow.grove.runtime/data-ref",-1688628375).cljs$core$IFn$_invoke$arity$1(query_env_12891));
if(cljs.core.truth_((function (){var and__5043__auto__ = self__.ident;
if(cljs.core.truth_(and__5043__auto__)){
return (self__.query == null);
} else {
return and__5043__auto__;
}
})())){
var result_12896 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db_12892,self__.ident);
var new_keys_12897 = cljs.core.PersistentHashSet.createAsIfByAssoc([self__.ident]);
if((self__.read_count === (0))){
shadow.grove.impl.index_query(query_env_12891,self__.query_id,self__.read_keys,new_keys_12897);
} else {
}

(self__.read_keys = new_keys_12897);

if(cljs.core.keyword_identical_QMARK_(result_12896,new cljs.core.Keyword("db","loading","db/loading",-737049547))){
(self__.read_result = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$2(self__.config,cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword("shadow.grove","loading-state","shadow.grove/loading-state",1580027943),new cljs.core.Keyword(null,"loading","loading",-737050189)));
} else {
(self__.read_result = result_12896);

(self__.ready_QMARK_ = true);
}
} else {
var observed_data_12899 = shadow.grove.db.observed(db_12892);
var db_query_12900 = (cljs.core.truth_(self__.ident)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.ident,self__.query])], null):self__.query);
var result_12901 = shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$3(query_env_12891,observed_data_12899,db_query_12900);
var new_keys_12902 = observed_data_12899.shadow$grove$db$IObserved$observed_keys$arity$1(null);
shadow.grove.impl.index_query(query_env_12891,self__.query_id,self__.read_keys,new_keys_12902);

(self__.read_keys = new_keys_12902);

if(cljs.core.keyword_identical_QMARK_(result_12901,new cljs.core.Keyword("db","loading","db/loading",-737049547))){
(self__.read_result = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$2(self__.config,cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword("shadow.grove","loading-state","shadow.grove/loading-state",1580027943),new cljs.core.Keyword(null,"loading","loading",-737050189)));
} else {
(self__.read_result = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((cljs.core.truth_(self__.ident)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(result_12901,self__.ident):result_12901),new cljs.core.Keyword("shadow.grove","loading-state","shadow.grove/loading-state",1580027943),new cljs.core.Keyword(null,"ready","ready",1086465795)));

(self__.ready_QMARK_ = true);
}
}

return (self__.read_count = (self__.read_count + (1)));
}));

(shadow.grove.impl.HookQuery.getBasis = (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"ident","ident",1639789181,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"query","query",352022017,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"config","config",-1659574354,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"component-handle","component-handle",-970224254,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"rt-ref","rt-ref",-878707630,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"active-queries-map","active-queries-map",328438843,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"query-id","query-id",-1180306927,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"ready?","ready?",1534765830,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"read-count","read-count",-1677349293,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"read-keys","read-keys",1110378906,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"read-result","read-result",-1424981661,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.impl.HookQuery.cljs$lang$type = true);

(shadow.grove.impl.HookQuery.cljs$lang$ctorStr = "shadow.grove.impl/HookQuery");

(shadow.grove.impl.HookQuery.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.impl/HookQuery");
}));

/**
 * Positional factory function for shadow.grove.impl/HookQuery.
 */
shadow.grove.impl.__GT_HookQuery = (function shadow$grove$impl$__GT_HookQuery(ident,query,config,component_handle,rt_ref,active_queries_map,query_id,ready_QMARK_,read_count,read_keys,read_result){
return (new shadow.grove.impl.HookQuery(ident,query,config,component_handle,rt_ref,active_queries_map,query_id,ready_QMARK_,read_count,read_keys,read_result));
});

shadow.grove.impl.hook_query = (function shadow$grove$impl$hook_query(ident,query,config){
if((((ident == null)) || (shadow.grove.db.ident_QMARK_(ident)))){
} else {
throw (new Error("Assert failed: (or (nil? ident) (db/ident? ident))"));
}

if((((query == null)) || (cljs.core.vector_QMARK_(query)))){
} else {
throw (new Error("Assert failed: (or (nil? query) (vector? query))"));
}

if(cljs.core.map_QMARK_(config)){
} else {
throw (new Error("Assert failed: (map? config)"));
}

return (new shadow.grove.impl.HookQuery(ident,query,config,null,null,null,null,false,(0),null,null));
});

/**
* @constructor
 * @implements {shadow.grove.protocols.IQuery}
*/
shadow.grove.impl.DirectQuery = (function (rt_ref,query_id,query,callback,read_keys,read_result,destroyed_QMARK_){
this.rt_ref = rt_ref;
this.query_id = query_id;
this.query = query;
this.callback = callback;
this.read_keys = read_keys;
this.read_result = read_result;
this.destroyed_QMARK_ = destroyed_QMARK_;
});
(shadow.grove.impl.DirectQuery.prototype.shadow$grove$protocols$IQuery$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.impl.DirectQuery.prototype.shadow$grove$protocols$IQuery$query_refresh_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.destroyed_QMARK_)){
return null;
} else {
return this$__$1.do_read_BANG_();
}
}));

(shadow.grove.impl.DirectQuery.prototype.do_read_BANG_ = (function (){
var self__ = this;
var this$ = this;
var query_env = cljs.core.deref(self__.rt_ref);
var observed_data = shadow.grove.db.observed(cljs.core.deref(new cljs.core.Keyword("shadow.grove.runtime","data-ref","shadow.grove.runtime/data-ref",-1688628375).cljs$core$IFn$_invoke$arity$1(query_env)));
var result = shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$3(query_env,observed_data,self__.query);
var new_keys = observed_data.shadow$grove$db$IObserved$observed_keys$arity$1(null);
shadow.grove.impl.index_query(query_env,self__.query_id,self__.read_keys,new_keys);

(self__.read_keys = new_keys);

if((((!(cljs.core.keyword_identical_QMARK_(result,new cljs.core.Keyword("db","loading","db/loading",-737049547))))) && ((((!((result == null)))) && ((((!(cljs.core.empty_QMARK_(result)))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(result,self__.read_result)))))))){
(self__.read_result = result);

return (self__.callback.cljs$core$IFn$_invoke$arity$1 ? self__.callback.cljs$core$IFn$_invoke$arity$1(result) : self__.callback.call(null,result));
} else {
return null;
}
}));

(shadow.grove.impl.DirectQuery.prototype.destroy_BANG_ = (function (){
var self__ = this;
var this$ = this;
(self__.destroyed_QMARK_ = true);

return shadow.grove.impl.unindex_query(cljs.core.deref(self__.rt_ref),self__.query_id,self__.read_keys);
}));

(shadow.grove.impl.DirectQuery.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rt-ref","rt-ref",-878707630,null),new cljs.core.Symbol(null,"query-id","query-id",-1180306927,null),new cljs.core.Symbol(null,"query","query",352022017,null),new cljs.core.Symbol(null,"callback","callback",935395299,null),cljs.core.with_meta(new cljs.core.Symbol(null,"read-keys","read-keys",1110378906,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"read-result","read-result",-1424981661,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"destroyed?","destroyed?",-1604801705,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.impl.DirectQuery.cljs$lang$type = true);

(shadow.grove.impl.DirectQuery.cljs$lang$ctorStr = "shadow.grove.impl/DirectQuery");

(shadow.grove.impl.DirectQuery.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.impl/DirectQuery");
}));

/**
 * Positional factory function for shadow.grove.impl/DirectQuery.
 */
shadow.grove.impl.__GT_DirectQuery = (function shadow$grove$impl$__GT_DirectQuery(rt_ref,query_id,query,callback,read_keys,read_result,destroyed_QMARK_){
return (new shadow.grove.impl.DirectQuery(rt_ref,query_id,query,callback,read_keys,read_result,destroyed_QMARK_));
});

shadow.grove.impl.query_init = (function shadow$grove$impl$query_init(rt_ref,query_id,query,config,callback){
var map__12765 = cljs.core.deref(rt_ref);
var map__12765__$1 = cljs.core.__destructure_map(map__12765);
var active_queries_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12765__$1,new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771));
var q = (new shadow.grove.impl.DirectQuery(rt_ref,query_id,query,callback,null,null,false));
active_queries_map.set(query_id,q);

return q.do_read_BANG_();
});
shadow.grove.impl.query_destroy = (function shadow$grove$impl$query_destroy(rt_ref,query_id){
var map__12771 = cljs.core.deref(rt_ref);
var map__12771__$1 = cljs.core.__destructure_map(map__12771);
var active_queries_map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12771__$1,new cljs.core.Keyword("shadow.grove.runtime","active-queries-map","shadow.grove.runtime/active-queries-map",-592199771));
var temp__5808__auto__ = active_queries_map.get(query_id);
if((temp__5808__auto__ == null)){
return null;
} else {
var q = temp__5808__auto__;
active_queries_map.delete(query_id);

return q.destroy_BANG_();
}
});

//# sourceMappingURL=shadow.grove.impl.js.map

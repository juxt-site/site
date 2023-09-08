goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
return shadow.remote.runtime.api.relay_msg(runtime,msg);
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__17380,res){
var map__17381 = p__17380;
var map__17381__$1 = cljs.core.__destructure_map(map__17381);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17381__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17381__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__17382 = res;
var G__17382__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17382,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__17382);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17382__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__17382__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__17384 = arguments.length;
switch (G__17384) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__17387,msg,handlers,timeout_after_ms){
var map__17388 = p__17387;
var map__17388__$1 = cljs.core.__destructure_map(map__17388);
var runtime = map__17388__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17388__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___17673 = arguments.length;
var i__5770__auto___17674 = (0);
while(true){
if((i__5770__auto___17674 < len__5769__auto___17673)){
args__5775__auto__.push((arguments[i__5770__auto___17674]));

var G__17675 = (i__5770__auto___17674 + (1));
i__5770__auto___17674 = G__17675;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__17392,ev,args){
var map__17393 = p__17392;
var map__17393__$1 = cljs.core.__destructure_map(map__17393);
var runtime = map__17393__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17393__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__17397 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__17400 = null;
var count__17401 = (0);
var i__17402 = (0);
while(true){
if((i__17402 < count__17401)){
var ext = chunk__17400.cljs$core$IIndexed$_nth$arity$2(null,i__17402);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__17679 = seq__17397;
var G__17680 = chunk__17400;
var G__17681 = count__17401;
var G__17682 = (i__17402 + (1));
seq__17397 = G__17679;
chunk__17400 = G__17680;
count__17401 = G__17681;
i__17402 = G__17682;
continue;
} else {
var G__17683 = seq__17397;
var G__17684 = chunk__17400;
var G__17685 = count__17401;
var G__17686 = (i__17402 + (1));
seq__17397 = G__17683;
chunk__17400 = G__17684;
count__17401 = G__17685;
i__17402 = G__17686;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17397);
if(temp__5804__auto__){
var seq__17397__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17397__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17397__$1);
var G__17688 = cljs.core.chunk_rest(seq__17397__$1);
var G__17689 = c__5568__auto__;
var G__17690 = cljs.core.count(c__5568__auto__);
var G__17691 = (0);
seq__17397 = G__17688;
chunk__17400 = G__17689;
count__17401 = G__17690;
i__17402 = G__17691;
continue;
} else {
var ext = cljs.core.first(seq__17397__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__17692 = cljs.core.next(seq__17397__$1);
var G__17693 = null;
var G__17694 = (0);
var G__17695 = (0);
seq__17397 = G__17692;
chunk__17400 = G__17693;
count__17401 = G__17694;
i__17402 = G__17695;
continue;
} else {
var G__17696 = cljs.core.next(seq__17397__$1);
var G__17697 = null;
var G__17698 = (0);
var G__17699 = (0);
seq__17397 = G__17696;
chunk__17400 = G__17697;
count__17401 = G__17698;
i__17402 = G__17699;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq17389){
var G__17390 = cljs.core.first(seq17389);
var seq17389__$1 = cljs.core.next(seq17389);
var G__17391 = cljs.core.first(seq17389__$1);
var seq17389__$2 = cljs.core.next(seq17389__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17390,G__17391,seq17389__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__17407,p__17408){
var map__17409 = p__17407;
var map__17409__$1 = cljs.core.__destructure_map(map__17409);
var runtime = map__17409__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17409__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__17410 = p__17408;
var map__17410__$1 = cljs.core.__destructure_map(map__17410);
var msg = map__17410__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17410__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__17411 = cljs.core.deref(state_ref);
var map__17411__$1 = cljs.core.__destructure_map(map__17411);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17411__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17411__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__17412){
var map__17414 = p__17412;
var map__17414__$1 = cljs.core.__destructure_map(map__17414);
var runtime = map__17414__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17414__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5045__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__17415,msg){
var map__17416 = p__17415;
var map__17416__$1 = cljs.core.__destructure_map(map__17416);
var runtime = map__17416__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17416__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__17427,key,p__17428){
var map__17430 = p__17427;
var map__17430__$1 = cljs.core.__destructure_map(map__17430);
var state = map__17430__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17430__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__17431 = p__17428;
var map__17431__$1 = cljs.core.__destructure_map(map__17431);
var spec = map__17431__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17431__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__17499,key,spec){
var map__17500 = p__17499;
var map__17500__$1 = cljs.core.__destructure_map(map__17500);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17500__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__17502_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__17502_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__17503_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__17503_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__17504_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__17504_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__17505_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__17505_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__17506_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__17506_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__17530,key){
var map__17531 = p__17530;
var map__17531__$1 = cljs.core.__destructure_map(map__17531);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17531__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__17535,msg){
var map__17537 = p__17535;
var map__17537__$1 = cljs.core.__destructure_map(map__17537);
var runtime = map__17537__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17537__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__17551,p__17552){
var map__17555 = p__17551;
var map__17555__$1 = cljs.core.__destructure_map(map__17555);
var runtime = map__17555__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17555__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__17556 = p__17552;
var map__17556__$1 = cljs.core.__destructure_map(map__17556);
var msg = map__17556__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17556__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17556__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__17577 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__17579 = null;
var count__17580 = (0);
var i__17581 = (0);
while(true){
if((i__17581 < count__17580)){
var map__17606 = chunk__17579.cljs$core$IIndexed$_nth$arity$2(null,i__17581);
var map__17606__$1 = cljs.core.__destructure_map(map__17606);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17606__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__17808 = seq__17577;
var G__17809 = chunk__17579;
var G__17810 = count__17580;
var G__17811 = (i__17581 + (1));
seq__17577 = G__17808;
chunk__17579 = G__17809;
count__17580 = G__17810;
i__17581 = G__17811;
continue;
} else {
var G__17812 = seq__17577;
var G__17813 = chunk__17579;
var G__17814 = count__17580;
var G__17815 = (i__17581 + (1));
seq__17577 = G__17812;
chunk__17579 = G__17813;
count__17580 = G__17814;
i__17581 = G__17815;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17577);
if(temp__5804__auto__){
var seq__17577__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17577__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17577__$1);
var G__17816 = cljs.core.chunk_rest(seq__17577__$1);
var G__17817 = c__5568__auto__;
var G__17818 = cljs.core.count(c__5568__auto__);
var G__17819 = (0);
seq__17577 = G__17816;
chunk__17579 = G__17817;
count__17580 = G__17818;
i__17581 = G__17819;
continue;
} else {
var map__17623 = cljs.core.first(seq__17577__$1);
var map__17623__$1 = cljs.core.__destructure_map(map__17623);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17623__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__17821 = cljs.core.next(seq__17577__$1);
var G__17822 = null;
var G__17823 = (0);
var G__17824 = (0);
seq__17577 = G__17821;
chunk__17579 = G__17822;
count__17580 = G__17823;
i__17581 = G__17824;
continue;
} else {
var G__17825 = cljs.core.next(seq__17577__$1);
var G__17826 = null;
var G__17827 = (0);
var G__17828 = (0);
seq__17577 = G__17825;
chunk__17579 = G__17826;
count__17580 = G__17827;
i__17581 = G__17828;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map

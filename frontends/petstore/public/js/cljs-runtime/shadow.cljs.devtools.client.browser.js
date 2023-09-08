goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___22726 = arguments.length;
var i__5770__auto___22727 = (0);
while(true){
if((i__5770__auto___22727 < len__5769__auto___22726)){
args__5775__auto__.push((arguments[i__5770__auto___22727]));

var G__22728 = (i__5770__auto___22727 + (1));
i__5770__auto___22727 = G__22728;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq22195){
var G__22196 = cljs.core.first(seq22195);
var seq22195__$1 = cljs.core.next(seq22195);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__22196,seq22195__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__22199 = cljs.core.seq(sources);
var chunk__22200 = null;
var count__22201 = (0);
var i__22202 = (0);
while(true){
if((i__22202 < count__22201)){
var map__22209 = chunk__22200.cljs$core$IIndexed$_nth$arity$2(null,i__22202);
var map__22209__$1 = cljs.core.__destructure_map(map__22209);
var src = map__22209__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22209__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22209__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22209__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22209__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22214){var e_22735 = e22214;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_22735);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_22735.message)].join('')));
}

var G__22736 = seq__22199;
var G__22737 = chunk__22200;
var G__22738 = count__22201;
var G__22739 = (i__22202 + (1));
seq__22199 = G__22736;
chunk__22200 = G__22737;
count__22201 = G__22738;
i__22202 = G__22739;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22199);
if(temp__5804__auto__){
var seq__22199__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22199__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__22199__$1);
var G__22740 = cljs.core.chunk_rest(seq__22199__$1);
var G__22741 = c__5568__auto__;
var G__22742 = cljs.core.count(c__5568__auto__);
var G__22743 = (0);
seq__22199 = G__22740;
chunk__22200 = G__22741;
count__22201 = G__22742;
i__22202 = G__22743;
continue;
} else {
var map__22215 = cljs.core.first(seq__22199__$1);
var map__22215__$1 = cljs.core.__destructure_map(map__22215);
var src = map__22215__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22215__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22215__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22215__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22215__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22216){var e_22746 = e22216;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_22746);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_22746.message)].join('')));
}

var G__22748 = cljs.core.next(seq__22199__$1);
var G__22749 = null;
var G__22750 = (0);
var G__22751 = (0);
seq__22199 = G__22748;
chunk__22200 = G__22749;
count__22201 = G__22750;
i__22202 = G__22751;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__22217 = cljs.core.seq(js_requires);
var chunk__22218 = null;
var count__22219 = (0);
var i__22220 = (0);
while(true){
if((i__22220 < count__22219)){
var js_ns = chunk__22218.cljs$core$IIndexed$_nth$arity$2(null,i__22220);
var require_str_22755 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_22755);


var G__22756 = seq__22217;
var G__22757 = chunk__22218;
var G__22758 = count__22219;
var G__22759 = (i__22220 + (1));
seq__22217 = G__22756;
chunk__22218 = G__22757;
count__22219 = G__22758;
i__22220 = G__22759;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22217);
if(temp__5804__auto__){
var seq__22217__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22217__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__22217__$1);
var G__22760 = cljs.core.chunk_rest(seq__22217__$1);
var G__22761 = c__5568__auto__;
var G__22762 = cljs.core.count(c__5568__auto__);
var G__22763 = (0);
seq__22217 = G__22760;
chunk__22218 = G__22761;
count__22219 = G__22762;
i__22220 = G__22763;
continue;
} else {
var js_ns = cljs.core.first(seq__22217__$1);
var require_str_22764 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_22764);


var G__22765 = cljs.core.next(seq__22217__$1);
var G__22766 = null;
var G__22767 = (0);
var G__22768 = (0);
seq__22217 = G__22765;
chunk__22218 = G__22766;
count__22219 = G__22767;
i__22220 = G__22768;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__22222){
var map__22223 = p__22222;
var map__22223__$1 = cljs.core.__destructure_map(map__22223);
var msg = map__22223__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22223__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22223__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22224(s__22225){
return (new cljs.core.LazySeq(null,(function (){
var s__22225__$1 = s__22225;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22225__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__22231 = cljs.core.first(xs__6360__auto__);
var map__22231__$1 = cljs.core.__destructure_map(map__22231);
var src = map__22231__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22231__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22231__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__22225__$1,map__22231,map__22231__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22223,map__22223__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22224_$_iter__22226(s__22227){
return (new cljs.core.LazySeq(null,((function (s__22225__$1,map__22231,map__22231__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22223,map__22223__$1,msg,info,reload_info){
return (function (){
var s__22227__$1 = s__22227;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__22227__$1);
if(temp__5804__auto____$1){
var s__22227__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__22227__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22227__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22229 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22228 = (0);
while(true){
if((i__22228 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__22228);
cljs.core.chunk_append(b__22229,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__22772 = (i__22228 + (1));
i__22228 = G__22772;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22229),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22224_$_iter__22226(cljs.core.chunk_rest(s__22227__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22229),null);
}
} else {
var warning = cljs.core.first(s__22227__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22224_$_iter__22226(cljs.core.rest(s__22227__$2)));
}
} else {
return null;
}
break;
}
});})(s__22225__$1,map__22231,map__22231__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22223,map__22223__$1,msg,info,reload_info))
,null,null));
});})(s__22225__$1,map__22231,map__22231__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22223,map__22223__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22224(cljs.core.rest(s__22225__$1)));
} else {
var G__22773 = cljs.core.rest(s__22225__$1);
s__22225__$1 = G__22773;
continue;
}
} else {
var G__22774 = cljs.core.rest(s__22225__$1);
s__22225__$1 = G__22774;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__22234_22775 = cljs.core.seq(warnings);
var chunk__22235_22776 = null;
var count__22236_22777 = (0);
var i__22237_22778 = (0);
while(true){
if((i__22237_22778 < count__22236_22777)){
var map__22244_22779 = chunk__22235_22776.cljs$core$IIndexed$_nth$arity$2(null,i__22237_22778);
var map__22244_22780__$1 = cljs.core.__destructure_map(map__22244_22779);
var w_22781 = map__22244_22780__$1;
var msg_22782__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22244_22780__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_22783 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22244_22780__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_22784 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22244_22780__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_22785 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22244_22780__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_22785)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_22783),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_22784),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_22782__$1)].join(''));


var G__22786 = seq__22234_22775;
var G__22787 = chunk__22235_22776;
var G__22788 = count__22236_22777;
var G__22789 = (i__22237_22778 + (1));
seq__22234_22775 = G__22786;
chunk__22235_22776 = G__22787;
count__22236_22777 = G__22788;
i__22237_22778 = G__22789;
continue;
} else {
var temp__5804__auto___22790 = cljs.core.seq(seq__22234_22775);
if(temp__5804__auto___22790){
var seq__22234_22791__$1 = temp__5804__auto___22790;
if(cljs.core.chunked_seq_QMARK_(seq__22234_22791__$1)){
var c__5568__auto___22792 = cljs.core.chunk_first(seq__22234_22791__$1);
var G__22793 = cljs.core.chunk_rest(seq__22234_22791__$1);
var G__22794 = c__5568__auto___22792;
var G__22795 = cljs.core.count(c__5568__auto___22792);
var G__22796 = (0);
seq__22234_22775 = G__22793;
chunk__22235_22776 = G__22794;
count__22236_22777 = G__22795;
i__22237_22778 = G__22796;
continue;
} else {
var map__22245_22797 = cljs.core.first(seq__22234_22791__$1);
var map__22245_22798__$1 = cljs.core.__destructure_map(map__22245_22797);
var w_22799 = map__22245_22798__$1;
var msg_22800__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22245_22798__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_22801 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22245_22798__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_22802 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22245_22798__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_22803 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22245_22798__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_22803)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_22801),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_22802),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_22800__$1)].join(''));


var G__22804 = cljs.core.next(seq__22234_22791__$1);
var G__22805 = null;
var G__22806 = (0);
var G__22807 = (0);
seq__22234_22775 = G__22804;
chunk__22235_22776 = G__22805;
count__22236_22777 = G__22806;
i__22237_22778 = G__22807;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__22221_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__22221_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__22253){
var map__22254 = p__22253;
var map__22254__$1 = cljs.core.__destructure_map(map__22254);
var msg = map__22254__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22254__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22254__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__22255 = cljs.core.seq(updates);
var chunk__22257 = null;
var count__22258 = (0);
var i__22259 = (0);
while(true){
if((i__22259 < count__22258)){
var path = chunk__22257.cljs$core$IIndexed$_nth$arity$2(null,i__22259);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22454_22808 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22458_22809 = null;
var count__22459_22810 = (0);
var i__22460_22811 = (0);
while(true){
if((i__22460_22811 < count__22459_22810)){
var node_22812 = chunk__22458_22809.cljs$core$IIndexed$_nth$arity$2(null,i__22460_22811);
if(cljs.core.not(node_22812.shadow$old)){
var path_match_22813 = shadow.cljs.devtools.client.browser.match_paths(node_22812.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22813)){
var new_link_22814 = (function (){var G__22585 = node_22812.cloneNode(true);
G__22585.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22813),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22585;
})();
(node_22812.shadow$old = true);

(new_link_22814.onload = ((function (seq__22454_22808,chunk__22458_22809,count__22459_22810,i__22460_22811,seq__22255,chunk__22257,count__22258,i__22259,new_link_22814,path_match_22813,node_22812,path,map__22254,map__22254__$1,msg,updates,reload_info){
return (function (e){
var seq__22586_22815 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22588_22816 = null;
var count__22589_22817 = (0);
var i__22590_22818 = (0);
while(true){
if((i__22590_22818 < count__22589_22817)){
var map__22596_22819 = chunk__22588_22816.cljs$core$IIndexed$_nth$arity$2(null,i__22590_22818);
var map__22596_22820__$1 = cljs.core.__destructure_map(map__22596_22819);
var task_22821 = map__22596_22820__$1;
var fn_str_22822 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22596_22820__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22823 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22596_22820__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22824 = goog.getObjectByName(fn_str_22822,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22823)].join(''));

(fn_obj_22824.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22824.cljs$core$IFn$_invoke$arity$2(path,new_link_22814) : fn_obj_22824.call(null,path,new_link_22814));


var G__22825 = seq__22586_22815;
var G__22826 = chunk__22588_22816;
var G__22827 = count__22589_22817;
var G__22828 = (i__22590_22818 + (1));
seq__22586_22815 = G__22825;
chunk__22588_22816 = G__22826;
count__22589_22817 = G__22827;
i__22590_22818 = G__22828;
continue;
} else {
var temp__5804__auto___22829 = cljs.core.seq(seq__22586_22815);
if(temp__5804__auto___22829){
var seq__22586_22830__$1 = temp__5804__auto___22829;
if(cljs.core.chunked_seq_QMARK_(seq__22586_22830__$1)){
var c__5568__auto___22831 = cljs.core.chunk_first(seq__22586_22830__$1);
var G__22832 = cljs.core.chunk_rest(seq__22586_22830__$1);
var G__22833 = c__5568__auto___22831;
var G__22834 = cljs.core.count(c__5568__auto___22831);
var G__22835 = (0);
seq__22586_22815 = G__22832;
chunk__22588_22816 = G__22833;
count__22589_22817 = G__22834;
i__22590_22818 = G__22835;
continue;
} else {
var map__22597_22836 = cljs.core.first(seq__22586_22830__$1);
var map__22597_22837__$1 = cljs.core.__destructure_map(map__22597_22836);
var task_22838 = map__22597_22837__$1;
var fn_str_22839 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22597_22837__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22840 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22597_22837__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22841 = goog.getObjectByName(fn_str_22839,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22840)].join(''));

(fn_obj_22841.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22841.cljs$core$IFn$_invoke$arity$2(path,new_link_22814) : fn_obj_22841.call(null,path,new_link_22814));


var G__22842 = cljs.core.next(seq__22586_22830__$1);
var G__22843 = null;
var G__22844 = (0);
var G__22845 = (0);
seq__22586_22815 = G__22842;
chunk__22588_22816 = G__22843;
count__22589_22817 = G__22844;
i__22590_22818 = G__22845;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22812);
});})(seq__22454_22808,chunk__22458_22809,count__22459_22810,i__22460_22811,seq__22255,chunk__22257,count__22258,i__22259,new_link_22814,path_match_22813,node_22812,path,map__22254,map__22254__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22813], 0));

goog.dom.insertSiblingAfter(new_link_22814,node_22812);


var G__22846 = seq__22454_22808;
var G__22847 = chunk__22458_22809;
var G__22848 = count__22459_22810;
var G__22849 = (i__22460_22811 + (1));
seq__22454_22808 = G__22846;
chunk__22458_22809 = G__22847;
count__22459_22810 = G__22848;
i__22460_22811 = G__22849;
continue;
} else {
var G__22850 = seq__22454_22808;
var G__22851 = chunk__22458_22809;
var G__22852 = count__22459_22810;
var G__22853 = (i__22460_22811 + (1));
seq__22454_22808 = G__22850;
chunk__22458_22809 = G__22851;
count__22459_22810 = G__22852;
i__22460_22811 = G__22853;
continue;
}
} else {
var G__22854 = seq__22454_22808;
var G__22855 = chunk__22458_22809;
var G__22856 = count__22459_22810;
var G__22857 = (i__22460_22811 + (1));
seq__22454_22808 = G__22854;
chunk__22458_22809 = G__22855;
count__22459_22810 = G__22856;
i__22460_22811 = G__22857;
continue;
}
} else {
var temp__5804__auto___22858 = cljs.core.seq(seq__22454_22808);
if(temp__5804__auto___22858){
var seq__22454_22859__$1 = temp__5804__auto___22858;
if(cljs.core.chunked_seq_QMARK_(seq__22454_22859__$1)){
var c__5568__auto___22860 = cljs.core.chunk_first(seq__22454_22859__$1);
var G__22861 = cljs.core.chunk_rest(seq__22454_22859__$1);
var G__22862 = c__5568__auto___22860;
var G__22863 = cljs.core.count(c__5568__auto___22860);
var G__22864 = (0);
seq__22454_22808 = G__22861;
chunk__22458_22809 = G__22862;
count__22459_22810 = G__22863;
i__22460_22811 = G__22864;
continue;
} else {
var node_22865 = cljs.core.first(seq__22454_22859__$1);
if(cljs.core.not(node_22865.shadow$old)){
var path_match_22866 = shadow.cljs.devtools.client.browser.match_paths(node_22865.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22866)){
var new_link_22867 = (function (){var G__22598 = node_22865.cloneNode(true);
G__22598.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22866),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22598;
})();
(node_22865.shadow$old = true);

(new_link_22867.onload = ((function (seq__22454_22808,chunk__22458_22809,count__22459_22810,i__22460_22811,seq__22255,chunk__22257,count__22258,i__22259,new_link_22867,path_match_22866,node_22865,seq__22454_22859__$1,temp__5804__auto___22858,path,map__22254,map__22254__$1,msg,updates,reload_info){
return (function (e){
var seq__22599_22868 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22601_22869 = null;
var count__22602_22870 = (0);
var i__22603_22871 = (0);
while(true){
if((i__22603_22871 < count__22602_22870)){
var map__22616_22872 = chunk__22601_22869.cljs$core$IIndexed$_nth$arity$2(null,i__22603_22871);
var map__22616_22873__$1 = cljs.core.__destructure_map(map__22616_22872);
var task_22874 = map__22616_22873__$1;
var fn_str_22875 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22616_22873__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22876 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22616_22873__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22877 = goog.getObjectByName(fn_str_22875,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22876)].join(''));

(fn_obj_22877.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22877.cljs$core$IFn$_invoke$arity$2(path,new_link_22867) : fn_obj_22877.call(null,path,new_link_22867));


var G__22878 = seq__22599_22868;
var G__22879 = chunk__22601_22869;
var G__22880 = count__22602_22870;
var G__22881 = (i__22603_22871 + (1));
seq__22599_22868 = G__22878;
chunk__22601_22869 = G__22879;
count__22602_22870 = G__22880;
i__22603_22871 = G__22881;
continue;
} else {
var temp__5804__auto___22882__$1 = cljs.core.seq(seq__22599_22868);
if(temp__5804__auto___22882__$1){
var seq__22599_22883__$1 = temp__5804__auto___22882__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22599_22883__$1)){
var c__5568__auto___22884 = cljs.core.chunk_first(seq__22599_22883__$1);
var G__22885 = cljs.core.chunk_rest(seq__22599_22883__$1);
var G__22886 = c__5568__auto___22884;
var G__22887 = cljs.core.count(c__5568__auto___22884);
var G__22888 = (0);
seq__22599_22868 = G__22885;
chunk__22601_22869 = G__22886;
count__22602_22870 = G__22887;
i__22603_22871 = G__22888;
continue;
} else {
var map__22617_22889 = cljs.core.first(seq__22599_22883__$1);
var map__22617_22890__$1 = cljs.core.__destructure_map(map__22617_22889);
var task_22891 = map__22617_22890__$1;
var fn_str_22892 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22617_22890__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22893 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22617_22890__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22894 = goog.getObjectByName(fn_str_22892,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22893)].join(''));

(fn_obj_22894.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22894.cljs$core$IFn$_invoke$arity$2(path,new_link_22867) : fn_obj_22894.call(null,path,new_link_22867));


var G__22895 = cljs.core.next(seq__22599_22883__$1);
var G__22896 = null;
var G__22897 = (0);
var G__22898 = (0);
seq__22599_22868 = G__22895;
chunk__22601_22869 = G__22896;
count__22602_22870 = G__22897;
i__22603_22871 = G__22898;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22865);
});})(seq__22454_22808,chunk__22458_22809,count__22459_22810,i__22460_22811,seq__22255,chunk__22257,count__22258,i__22259,new_link_22867,path_match_22866,node_22865,seq__22454_22859__$1,temp__5804__auto___22858,path,map__22254,map__22254__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22866], 0));

goog.dom.insertSiblingAfter(new_link_22867,node_22865);


var G__22899 = cljs.core.next(seq__22454_22859__$1);
var G__22900 = null;
var G__22901 = (0);
var G__22902 = (0);
seq__22454_22808 = G__22899;
chunk__22458_22809 = G__22900;
count__22459_22810 = G__22901;
i__22460_22811 = G__22902;
continue;
} else {
var G__22903 = cljs.core.next(seq__22454_22859__$1);
var G__22904 = null;
var G__22905 = (0);
var G__22906 = (0);
seq__22454_22808 = G__22903;
chunk__22458_22809 = G__22904;
count__22459_22810 = G__22905;
i__22460_22811 = G__22906;
continue;
}
} else {
var G__22907 = cljs.core.next(seq__22454_22859__$1);
var G__22908 = null;
var G__22909 = (0);
var G__22910 = (0);
seq__22454_22808 = G__22907;
chunk__22458_22809 = G__22908;
count__22459_22810 = G__22909;
i__22460_22811 = G__22910;
continue;
}
}
} else {
}
}
break;
}


var G__22911 = seq__22255;
var G__22912 = chunk__22257;
var G__22913 = count__22258;
var G__22914 = (i__22259 + (1));
seq__22255 = G__22911;
chunk__22257 = G__22912;
count__22258 = G__22913;
i__22259 = G__22914;
continue;
} else {
var G__22915 = seq__22255;
var G__22916 = chunk__22257;
var G__22917 = count__22258;
var G__22918 = (i__22259 + (1));
seq__22255 = G__22915;
chunk__22257 = G__22916;
count__22258 = G__22917;
i__22259 = G__22918;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22255);
if(temp__5804__auto__){
var seq__22255__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22255__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__22255__$1);
var G__22919 = cljs.core.chunk_rest(seq__22255__$1);
var G__22920 = c__5568__auto__;
var G__22921 = cljs.core.count(c__5568__auto__);
var G__22922 = (0);
seq__22255 = G__22919;
chunk__22257 = G__22920;
count__22258 = G__22921;
i__22259 = G__22922;
continue;
} else {
var path = cljs.core.first(seq__22255__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22620_22923 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22624_22924 = null;
var count__22625_22925 = (0);
var i__22626_22926 = (0);
while(true){
if((i__22626_22926 < count__22625_22925)){
var node_22927 = chunk__22624_22924.cljs$core$IIndexed$_nth$arity$2(null,i__22626_22926);
if(cljs.core.not(node_22927.shadow$old)){
var path_match_22928 = shadow.cljs.devtools.client.browser.match_paths(node_22927.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22928)){
var new_link_22929 = (function (){var G__22654 = node_22927.cloneNode(true);
G__22654.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22928),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22654;
})();
(node_22927.shadow$old = true);

(new_link_22929.onload = ((function (seq__22620_22923,chunk__22624_22924,count__22625_22925,i__22626_22926,seq__22255,chunk__22257,count__22258,i__22259,new_link_22929,path_match_22928,node_22927,path,seq__22255__$1,temp__5804__auto__,map__22254,map__22254__$1,msg,updates,reload_info){
return (function (e){
var seq__22655_22932 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22657_22933 = null;
var count__22658_22934 = (0);
var i__22659_22935 = (0);
while(true){
if((i__22659_22935 < count__22658_22934)){
var map__22665_22936 = chunk__22657_22933.cljs$core$IIndexed$_nth$arity$2(null,i__22659_22935);
var map__22665_22937__$1 = cljs.core.__destructure_map(map__22665_22936);
var task_22938 = map__22665_22937__$1;
var fn_str_22939 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22665_22937__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22940 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22665_22937__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22941 = goog.getObjectByName(fn_str_22939,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22940)].join(''));

(fn_obj_22941.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22941.cljs$core$IFn$_invoke$arity$2(path,new_link_22929) : fn_obj_22941.call(null,path,new_link_22929));


var G__22942 = seq__22655_22932;
var G__22943 = chunk__22657_22933;
var G__22944 = count__22658_22934;
var G__22945 = (i__22659_22935 + (1));
seq__22655_22932 = G__22942;
chunk__22657_22933 = G__22943;
count__22658_22934 = G__22944;
i__22659_22935 = G__22945;
continue;
} else {
var temp__5804__auto___22946__$1 = cljs.core.seq(seq__22655_22932);
if(temp__5804__auto___22946__$1){
var seq__22655_22947__$1 = temp__5804__auto___22946__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22655_22947__$1)){
var c__5568__auto___22948 = cljs.core.chunk_first(seq__22655_22947__$1);
var G__22949 = cljs.core.chunk_rest(seq__22655_22947__$1);
var G__22950 = c__5568__auto___22948;
var G__22951 = cljs.core.count(c__5568__auto___22948);
var G__22952 = (0);
seq__22655_22932 = G__22949;
chunk__22657_22933 = G__22950;
count__22658_22934 = G__22951;
i__22659_22935 = G__22952;
continue;
} else {
var map__22666_22953 = cljs.core.first(seq__22655_22947__$1);
var map__22666_22954__$1 = cljs.core.__destructure_map(map__22666_22953);
var task_22955 = map__22666_22954__$1;
var fn_str_22956 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22666_22954__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22957 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22666_22954__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22958 = goog.getObjectByName(fn_str_22956,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22957)].join(''));

(fn_obj_22958.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22958.cljs$core$IFn$_invoke$arity$2(path,new_link_22929) : fn_obj_22958.call(null,path,new_link_22929));


var G__22959 = cljs.core.next(seq__22655_22947__$1);
var G__22960 = null;
var G__22961 = (0);
var G__22962 = (0);
seq__22655_22932 = G__22959;
chunk__22657_22933 = G__22960;
count__22658_22934 = G__22961;
i__22659_22935 = G__22962;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22927);
});})(seq__22620_22923,chunk__22624_22924,count__22625_22925,i__22626_22926,seq__22255,chunk__22257,count__22258,i__22259,new_link_22929,path_match_22928,node_22927,path,seq__22255__$1,temp__5804__auto__,map__22254,map__22254__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22928], 0));

goog.dom.insertSiblingAfter(new_link_22929,node_22927);


var G__22964 = seq__22620_22923;
var G__22965 = chunk__22624_22924;
var G__22966 = count__22625_22925;
var G__22967 = (i__22626_22926 + (1));
seq__22620_22923 = G__22964;
chunk__22624_22924 = G__22965;
count__22625_22925 = G__22966;
i__22626_22926 = G__22967;
continue;
} else {
var G__22969 = seq__22620_22923;
var G__22970 = chunk__22624_22924;
var G__22971 = count__22625_22925;
var G__22972 = (i__22626_22926 + (1));
seq__22620_22923 = G__22969;
chunk__22624_22924 = G__22970;
count__22625_22925 = G__22971;
i__22626_22926 = G__22972;
continue;
}
} else {
var G__22973 = seq__22620_22923;
var G__22974 = chunk__22624_22924;
var G__22975 = count__22625_22925;
var G__22976 = (i__22626_22926 + (1));
seq__22620_22923 = G__22973;
chunk__22624_22924 = G__22974;
count__22625_22925 = G__22975;
i__22626_22926 = G__22976;
continue;
}
} else {
var temp__5804__auto___22978__$1 = cljs.core.seq(seq__22620_22923);
if(temp__5804__auto___22978__$1){
var seq__22620_22979__$1 = temp__5804__auto___22978__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22620_22979__$1)){
var c__5568__auto___22980 = cljs.core.chunk_first(seq__22620_22979__$1);
var G__22981 = cljs.core.chunk_rest(seq__22620_22979__$1);
var G__22982 = c__5568__auto___22980;
var G__22983 = cljs.core.count(c__5568__auto___22980);
var G__22984 = (0);
seq__22620_22923 = G__22981;
chunk__22624_22924 = G__22982;
count__22625_22925 = G__22983;
i__22626_22926 = G__22984;
continue;
} else {
var node_22985 = cljs.core.first(seq__22620_22979__$1);
if(cljs.core.not(node_22985.shadow$old)){
var path_match_22986 = shadow.cljs.devtools.client.browser.match_paths(node_22985.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22986)){
var new_link_22987 = (function (){var G__22669 = node_22985.cloneNode(true);
G__22669.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22986),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22669;
})();
(node_22985.shadow$old = true);

(new_link_22987.onload = ((function (seq__22620_22923,chunk__22624_22924,count__22625_22925,i__22626_22926,seq__22255,chunk__22257,count__22258,i__22259,new_link_22987,path_match_22986,node_22985,seq__22620_22979__$1,temp__5804__auto___22978__$1,path,seq__22255__$1,temp__5804__auto__,map__22254,map__22254__$1,msg,updates,reload_info){
return (function (e){
var seq__22670_22990 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22672_22991 = null;
var count__22673_22992 = (0);
var i__22674_22993 = (0);
while(true){
if((i__22674_22993 < count__22673_22992)){
var map__22680_22994 = chunk__22672_22991.cljs$core$IIndexed$_nth$arity$2(null,i__22674_22993);
var map__22680_22995__$1 = cljs.core.__destructure_map(map__22680_22994);
var task_22996 = map__22680_22995__$1;
var fn_str_22997 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22680_22995__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22998 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22680_22995__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23000 = goog.getObjectByName(fn_str_22997,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22998)].join(''));

(fn_obj_23000.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23000.cljs$core$IFn$_invoke$arity$2(path,new_link_22987) : fn_obj_23000.call(null,path,new_link_22987));


var G__23001 = seq__22670_22990;
var G__23002 = chunk__22672_22991;
var G__23003 = count__22673_22992;
var G__23004 = (i__22674_22993 + (1));
seq__22670_22990 = G__23001;
chunk__22672_22991 = G__23002;
count__22673_22992 = G__23003;
i__22674_22993 = G__23004;
continue;
} else {
var temp__5804__auto___23005__$2 = cljs.core.seq(seq__22670_22990);
if(temp__5804__auto___23005__$2){
var seq__22670_23006__$1 = temp__5804__auto___23005__$2;
if(cljs.core.chunked_seq_QMARK_(seq__22670_23006__$1)){
var c__5568__auto___23007 = cljs.core.chunk_first(seq__22670_23006__$1);
var G__23008 = cljs.core.chunk_rest(seq__22670_23006__$1);
var G__23009 = c__5568__auto___23007;
var G__23010 = cljs.core.count(c__5568__auto___23007);
var G__23011 = (0);
seq__22670_22990 = G__23008;
chunk__22672_22991 = G__23009;
count__22673_22992 = G__23010;
i__22674_22993 = G__23011;
continue;
} else {
var map__22683_23012 = cljs.core.first(seq__22670_23006__$1);
var map__22683_23013__$1 = cljs.core.__destructure_map(map__22683_23012);
var task_23014 = map__22683_23013__$1;
var fn_str_23015 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22683_23013__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23016 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22683_23013__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23017 = goog.getObjectByName(fn_str_23015,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23016)].join(''));

(fn_obj_23017.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23017.cljs$core$IFn$_invoke$arity$2(path,new_link_22987) : fn_obj_23017.call(null,path,new_link_22987));


var G__23019 = cljs.core.next(seq__22670_23006__$1);
var G__23020 = null;
var G__23021 = (0);
var G__23022 = (0);
seq__22670_22990 = G__23019;
chunk__22672_22991 = G__23020;
count__22673_22992 = G__23021;
i__22674_22993 = G__23022;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22985);
});})(seq__22620_22923,chunk__22624_22924,count__22625_22925,i__22626_22926,seq__22255,chunk__22257,count__22258,i__22259,new_link_22987,path_match_22986,node_22985,seq__22620_22979__$1,temp__5804__auto___22978__$1,path,seq__22255__$1,temp__5804__auto__,map__22254,map__22254__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22986], 0));

goog.dom.insertSiblingAfter(new_link_22987,node_22985);


var G__23024 = cljs.core.next(seq__22620_22979__$1);
var G__23025 = null;
var G__23026 = (0);
var G__23027 = (0);
seq__22620_22923 = G__23024;
chunk__22624_22924 = G__23025;
count__22625_22925 = G__23026;
i__22626_22926 = G__23027;
continue;
} else {
var G__23028 = cljs.core.next(seq__22620_22979__$1);
var G__23029 = null;
var G__23030 = (0);
var G__23031 = (0);
seq__22620_22923 = G__23028;
chunk__22624_22924 = G__23029;
count__22625_22925 = G__23030;
i__22626_22926 = G__23031;
continue;
}
} else {
var G__23032 = cljs.core.next(seq__22620_22979__$1);
var G__23033 = null;
var G__23034 = (0);
var G__23035 = (0);
seq__22620_22923 = G__23032;
chunk__22624_22924 = G__23033;
count__22625_22925 = G__23034;
i__22626_22926 = G__23035;
continue;
}
}
} else {
}
}
break;
}


var G__23036 = cljs.core.next(seq__22255__$1);
var G__23037 = null;
var G__23038 = (0);
var G__23039 = (0);
seq__22255 = G__23036;
chunk__22257 = G__23037;
count__22258 = G__23038;
i__22259 = G__23039;
continue;
} else {
var G__23040 = cljs.core.next(seq__22255__$1);
var G__23041 = null;
var G__23042 = (0);
var G__23043 = (0);
seq__22255 = G__23040;
chunk__22257 = G__23041;
count__22258 = G__23042;
i__22259 = G__23043;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__22686){
var map__22687 = p__22686;
var map__22687__$1 = cljs.core.__destructure_map(map__22687);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22687__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__22694){
var map__22695 = p__22694;
var map__22695__$1 = cljs.core.__destructure_map(map__22695);
var _ = map__22695__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22695__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__22696,done,error){
var map__22697 = p__22696;
var map__22697__$1 = cljs.core.__destructure_map(map__22697);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22697__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__22698,done,error){
var map__22699 = p__22698;
var map__22699__$1 = cljs.core.__destructure_map(map__22699);
var msg = map__22699__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22699__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22699__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22699__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__22702){
var map__22703 = p__22702;
var map__22703__$1 = cljs.core.__destructure_map(map__22703);
var src = map__22703__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22703__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__22704 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__22704) : done.call(null,G__22704));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__22705){
var map__22706 = p__22705;
var map__22706__$1 = cljs.core.__destructure_map(map__22706);
var msg__$1 = map__22706__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22706__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e22707){var ex = e22707;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__22708){
var map__22709 = p__22708;
var map__22709__$1 = cljs.core.__destructure_map(map__22709);
var env = map__22709__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22709__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__22713){
var map__22714 = p__22713;
var map__22714__$1 = cljs.core.__destructure_map(map__22714);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22714__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22714__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__22717){
var map__22719 = p__22717;
var map__22719__$1 = cljs.core.__destructure_map(map__22719);
var svc = map__22719__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22719__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map

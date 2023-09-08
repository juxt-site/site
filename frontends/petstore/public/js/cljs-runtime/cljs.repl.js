goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__20726){
var map__20727 = p__20726;
var map__20727__$1 = cljs.core.__destructure_map(map__20727);
var m = map__20727__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20727__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20727__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__20733_21062 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__20734_21063 = null;
var count__20735_21064 = (0);
var i__20736_21065 = (0);
while(true){
if((i__20736_21065 < count__20735_21064)){
var f_21066 = chunk__20734_21063.cljs$core$IIndexed$_nth$arity$2(null,i__20736_21065);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_21066], 0));


var G__21067 = seq__20733_21062;
var G__21068 = chunk__20734_21063;
var G__21069 = count__20735_21064;
var G__21070 = (i__20736_21065 + (1));
seq__20733_21062 = G__21067;
chunk__20734_21063 = G__21068;
count__20735_21064 = G__21069;
i__20736_21065 = G__21070;
continue;
} else {
var temp__5804__auto___21071 = cljs.core.seq(seq__20733_21062);
if(temp__5804__auto___21071){
var seq__20733_21072__$1 = temp__5804__auto___21071;
if(cljs.core.chunked_seq_QMARK_(seq__20733_21072__$1)){
var c__5568__auto___21073 = cljs.core.chunk_first(seq__20733_21072__$1);
var G__21074 = cljs.core.chunk_rest(seq__20733_21072__$1);
var G__21075 = c__5568__auto___21073;
var G__21076 = cljs.core.count(c__5568__auto___21073);
var G__21077 = (0);
seq__20733_21062 = G__21074;
chunk__20734_21063 = G__21075;
count__20735_21064 = G__21076;
i__20736_21065 = G__21077;
continue;
} else {
var f_21078 = cljs.core.first(seq__20733_21072__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_21078], 0));


var G__21079 = cljs.core.next(seq__20733_21072__$1);
var G__21080 = null;
var G__21081 = (0);
var G__21082 = (0);
seq__20733_21062 = G__21079;
chunk__20734_21063 = G__21080;
count__20735_21064 = G__21081;
i__20736_21065 = G__21082;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_21083 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_21083], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_21083)))?cljs.core.second(arglists_21083):arglists_21083)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__20842_21087 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__20843_21088 = null;
var count__20844_21089 = (0);
var i__20845_21090 = (0);
while(true){
if((i__20845_21090 < count__20844_21089)){
var vec__20859_21094 = chunk__20843_21088.cljs$core$IIndexed$_nth$arity$2(null,i__20845_21090);
var name_21095 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20859_21094,(0),null);
var map__20862_21096 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20859_21094,(1),null);
var map__20862_21097__$1 = cljs.core.__destructure_map(map__20862_21096);
var doc_21098 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20862_21097__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21099 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20862_21097__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21095], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21099], 0));

if(cljs.core.truth_(doc_21098)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21098], 0));
} else {
}


var G__21100 = seq__20842_21087;
var G__21101 = chunk__20843_21088;
var G__21102 = count__20844_21089;
var G__21103 = (i__20845_21090 + (1));
seq__20842_21087 = G__21100;
chunk__20843_21088 = G__21101;
count__20844_21089 = G__21102;
i__20845_21090 = G__21103;
continue;
} else {
var temp__5804__auto___21104 = cljs.core.seq(seq__20842_21087);
if(temp__5804__auto___21104){
var seq__20842_21105__$1 = temp__5804__auto___21104;
if(cljs.core.chunked_seq_QMARK_(seq__20842_21105__$1)){
var c__5568__auto___21106 = cljs.core.chunk_first(seq__20842_21105__$1);
var G__21107 = cljs.core.chunk_rest(seq__20842_21105__$1);
var G__21108 = c__5568__auto___21106;
var G__21109 = cljs.core.count(c__5568__auto___21106);
var G__21110 = (0);
seq__20842_21087 = G__21107;
chunk__20843_21088 = G__21108;
count__20844_21089 = G__21109;
i__20845_21090 = G__21110;
continue;
} else {
var vec__20868_21111 = cljs.core.first(seq__20842_21105__$1);
var name_21112 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20868_21111,(0),null);
var map__20871_21113 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20868_21111,(1),null);
var map__20871_21114__$1 = cljs.core.__destructure_map(map__20871_21113);
var doc_21115 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20871_21114__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21116 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20871_21114__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21112], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21116], 0));

if(cljs.core.truth_(doc_21115)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21115], 0));
} else {
}


var G__21120 = cljs.core.next(seq__20842_21105__$1);
var G__21121 = null;
var G__21122 = (0);
var G__21123 = (0);
seq__20842_21087 = G__21120;
chunk__20843_21088 = G__21121;
count__20844_21089 = G__21122;
i__20845_21090 = G__21123;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__20885 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__20886 = null;
var count__20887 = (0);
var i__20888 = (0);
while(true){
if((i__20888 < count__20887)){
var role = chunk__20886.cljs$core$IIndexed$_nth$arity$2(null,i__20888);
var temp__5804__auto___21126__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21126__$1)){
var spec_21127 = temp__5804__auto___21126__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21127)], 0));
} else {
}


var G__21128 = seq__20885;
var G__21129 = chunk__20886;
var G__21130 = count__20887;
var G__21131 = (i__20888 + (1));
seq__20885 = G__21128;
chunk__20886 = G__21129;
count__20887 = G__21130;
i__20888 = G__21131;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__20885);
if(temp__5804__auto____$1){
var seq__20885__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__20885__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20885__$1);
var G__21132 = cljs.core.chunk_rest(seq__20885__$1);
var G__21133 = c__5568__auto__;
var G__21134 = cljs.core.count(c__5568__auto__);
var G__21135 = (0);
seq__20885 = G__21132;
chunk__20886 = G__21133;
count__20887 = G__21134;
i__20888 = G__21135;
continue;
} else {
var role = cljs.core.first(seq__20885__$1);
var temp__5804__auto___21136__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21136__$2)){
var spec_21137 = temp__5804__auto___21136__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21137)], 0));
} else {
}


var G__21138 = cljs.core.next(seq__20885__$1);
var G__21139 = null;
var G__21140 = (0);
var G__21141 = (0);
seq__20885 = G__21138;
chunk__20886 = G__21139;
count__20887 = G__21140;
i__20888 = G__21141;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__21145 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__21146 = cljs.core.ex_cause(t);
via = G__21145;
t = G__21146;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__20925 = datafied_throwable;
var map__20925__$1 = cljs.core.__destructure_map(map__20925);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20925__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20925__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20925__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__20926 = cljs.core.last(via);
var map__20926__$1 = cljs.core.__destructure_map(map__20926);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20926__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20926__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20926__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__20927 = data;
var map__20927__$1 = cljs.core.__destructure_map(map__20927);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20927__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20927__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20927__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__20928 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__20928__$1 = cljs.core.__destructure_map(map__20928);
var top_data = map__20928__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20928__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__20932 = phase;
var G__20932__$1 = (((G__20932 instanceof cljs.core.Keyword))?G__20932.fqn:null);
switch (G__20932__$1) {
case "read-source":
var map__20933 = data;
var map__20933__$1 = cljs.core.__destructure_map(map__20933);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20933__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20933__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__20935 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__20935__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20935,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20935);
var G__20935__$2 = (cljs.core.truth_((function (){var fexpr__20936 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20936.cljs$core$IFn$_invoke$arity$1 ? fexpr__20936.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20936.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20935__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20935__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20935__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20935__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__20937 = top_data;
var G__20937__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20937,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20937);
var G__20937__$2 = (cljs.core.truth_((function (){var fexpr__20938 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20938.cljs$core$IFn$_invoke$arity$1 ? fexpr__20938.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20938.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20937__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20937__$1);
var G__20937__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20937__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20937__$2);
var G__20937__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20937__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20937__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20937__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20937__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__20939 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20939,(3),null);
var G__20943 = top_data;
var G__20943__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20943,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__20943);
var G__20943__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20943__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__20943__$1);
var G__20943__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20943__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__20943__$2);
var G__20943__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20943__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20943__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20943__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20943__$4;
}

break;
case "execution":
var vec__20946 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20946,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20946,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20946,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20946,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__20923_SHARP_){
var or__5045__auto__ = (p1__20923_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var fexpr__20949 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20949.cljs$core$IFn$_invoke$arity$1 ? fexpr__20949.cljs$core$IFn$_invoke$arity$1(p1__20923_SHARP_) : fexpr__20949.call(null,p1__20923_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__20950 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__20950__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20950,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__20950);
var G__20950__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20950__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20950__$1);
var G__20950__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20950__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__20950__$2);
var G__20950__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20950__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__20950__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20950__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20950__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20932__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__20958){
var map__20959 = p__20958;
var map__20959__$1 = cljs.core.__destructure_map(map__20959);
var triage_data = map__20959__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20959__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__20995 = phase;
var G__20995__$1 = (((G__20995 instanceof cljs.core.Keyword))?G__20995.fqn:null);
switch (G__20995__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__20998 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__20999 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21000 = loc;
var G__21001 = (cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__21004_21176 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__21005_21177 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__21006_21178 = true;
var _STAR_print_fn_STAR__temp_val__21007_21179 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__21006_21178);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__21007_21179);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20952_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20952_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__21005_21177);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__21004_21176);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__20998,G__20999,G__21000,G__21001) : format.call(null,G__20998,G__20999,G__21000,G__21001));

break;
case "macroexpansion":
var G__21017 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__21018 = cause_type;
var G__21019 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21020 = loc;
var G__21021 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21017,G__21018,G__21019,G__21020,G__21021) : format.call(null,G__21017,G__21018,G__21019,G__21020,G__21021));

break;
case "compile-syntax-check":
var G__21022 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__21023 = cause_type;
var G__21024 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21025 = loc;
var G__21026 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21022,G__21023,G__21024,G__21025,G__21026) : format.call(null,G__21022,G__21023,G__21024,G__21025,G__21026));

break;
case "compilation":
var G__21027 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__21028 = cause_type;
var G__21029 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21030 = loc;
var G__21031 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21027,G__21028,G__21029,G__21030,G__21031) : format.call(null,G__21027,G__21028,G__21029,G__21030,G__21031));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__21032 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__21033 = symbol;
var G__21034 = loc;
var G__21035 = (function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__21036_21203 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__21037_21204 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__21038_21205 = true;
var _STAR_print_fn_STAR__temp_val__21039_21206 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__21038_21205);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__21039_21206);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20954_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20954_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__21037_21204);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__21036_21203);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__21032,G__21033,G__21034,G__21035) : format.call(null,G__21032,G__21033,G__21034,G__21035));
} else {
var G__21047 = "Execution error%s at %s(%s).\n%s\n";
var G__21048 = cause_type;
var G__21049 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21050 = loc;
var G__21051 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21047,G__21048,G__21049,G__21050,G__21051) : format.call(null,G__21047,G__21048,G__21049,G__21050,G__21051));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20995__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map

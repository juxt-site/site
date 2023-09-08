goog.provide('shadow.grove.runtime');
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.runtime !== 'undefined') && (typeof shadow.grove.runtime.known_runtimes_ref !== 'undefined')){
} else {
shadow.grove.runtime.known_runtimes_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
shadow.grove.runtime.ref_QMARK_ = (function shadow$grove$runtime$ref_QMARK_(x){
var and__5043__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(x);
if(cljs.core.truth_(and__5043__auto__)){
return new cljs.core.Keyword("shadow.grove.runtime","rt","shadow.grove.runtime/rt",1216959489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(x));
} else {
return and__5043__auto__;
}
});
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.runtime !== 'undefined') && (typeof shadow.grove.runtime.id_seq !== 'undefined')){
} else {
shadow.grove.runtime.id_seq = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
shadow.grove.runtime.next_id = (function shadow$grove$runtime$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(shadow.grove.runtime.id_seq,cljs.core.inc);
});
shadow.grove.runtime.next_tick = (function shadow$grove$runtime$next_tick(callback){
return goog.async.nextTick(callback);
});

//# sourceMappingURL=shadow.grove.runtime.js.map

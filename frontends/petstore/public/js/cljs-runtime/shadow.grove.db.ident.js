goog.provide('shadow.grove.db.ident');

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IComparable}
 * @implements {cljs.core.ILookup}
*/
shadow.grove.db.ident.Ident = (function (entity_type,id,_hash){
this.entity_type = entity_type;
this.id = id;
this._hash = _hash;
this.cljs$lang$protocol_mask$partition0$ = 2153775360;
this.cljs$lang$protocol_mask$partition1$ = 2048;
});
(shadow.grove.db.ident.Ident.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
var G__9890 = key;
var G__9890__$1 = (((G__9890 instanceof cljs.core.Keyword))?G__9890.fqn:null);
switch (G__9890__$1) {
case "entity-type":
return self__.entity_type;

break;
case "id":
return self__.id;

break;
default:
return null;

}
}));

(shadow.grove.db.ident.Ident.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((!((self__._hash == null)))){
return self__._hash;
} else {
var x = (((123) | cljs.core.hash(self__.id)) | cljs.core.hash(self__.id));
(self__._hash = x);

return x;
}
}));

(shadow.grove.db.ident.Ident.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof shadow.grove.db.ident.Ident)) && (((cljs.core.keyword_identical_QMARK_(self__.entity_type,other.entity_type)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.id,other.id)))));
}));

(shadow.grove.db.ident.Ident.prototype.cljs$core$IComparable$_compare$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
if((other instanceof shadow.grove.db.ident.Ident)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["cannot compare db/ident to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(other))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"this","this",-611633625),this$__$1,new cljs.core.Keyword(null,"other","other",995793544),other], null));
}

var tc = cljs.core.compare(self__.entity_type,other.entity_type);
if((!((tc === (0))))){
return tc;
} else {
return cljs.core.compare(self__.id,other.id);
}
}));

(shadow.grove.db.ident.Ident.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
var this$__$1 = this;
cljs.core._write(writer,"#gdb/ident [");

cljs.core._write(writer,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([self__.entity_type], 0)));

cljs.core._write(writer," ");

cljs.core._write(writer,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([self__.id], 0)));

return cljs.core._write(writer,"]");
}));

(shadow.grove.db.ident.Ident.prototype.toString = (function (){
var self__ = this;
var this$ = this;
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$], 0));
}));

(shadow.grove.db.ident.Ident.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"entity-type","entity-type",-316768598,null),new cljs.core.Symbol(null,"id","id",252129435,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_hash","_hash",-2130838312,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(shadow.grove.db.ident.Ident.cljs$lang$type = true);

(shadow.grove.db.ident.Ident.cljs$lang$ctorStr = "shadow.grove.db.ident/Ident");

(shadow.grove.db.ident.Ident.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.db.ident/Ident");
}));

/**
 * Positional factory function for shadow.grove.db.ident/Ident.
 */
shadow.grove.db.ident.__GT_Ident = (function shadow$grove$db$ident$__GT_Ident(entity_type,id,_hash){
return (new shadow.grove.db.ident.Ident(entity_type,id,_hash));
});

shadow.grove.db.ident.ident_QMARK_ = (function shadow$grove$db$ident$ident_QMARK_(thing){
return (thing instanceof shadow.grove.db.ident.Ident);
});

//# sourceMappingURL=shadow.grove.db.ident.js.map

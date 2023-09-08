goog.provide('pet.ui.env');
pet.ui.env.schema = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Keyword(null,"primary-key","primary-key",1422512605),new cljs.core.Keyword("pet.model","pet-id","pet.model/pet-id",1316629041),new cljs.core.Keyword(null,"attrs","attrs",-2090668713),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.PersistentArrayMap.EMPTY], null)], null);
pet.ui.env.init_user = cljs.core.PersistentArrayMap.EMPTY;
pet.ui.env.route = "/";
if((typeof pet !== 'undefined') && (typeof pet.ui !== 'undefined') && (typeof pet.ui.env !== 'undefined') && (typeof pet.ui.env.data_ref !== 'undefined')){
} else {
pet.ui.env.data_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(shadow.grove.db.configure(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("pet.model","id-seq","pet.model/id-seq",1793673300),(0),new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725),null,new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977),false,new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991),pet.ui.env.init_user,new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937),pet.ui.env.route], null),pet.ui.env.schema));
}
if((typeof pet !== 'undefined') && (typeof pet.ui !== 'undefined') && (typeof pet.ui.env !== 'undefined') && (typeof pet.ui.env.rt_ref !== 'undefined')){
} else {
pet.ui.env.rt_ref = shadow.grove.prepare.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,pet.ui.env.data_ref,new cljs.core.Keyword("pet.ui.env","db","pet.ui.env/db",-87639931));
}

//# sourceMappingURL=pet.ui.env.js.map

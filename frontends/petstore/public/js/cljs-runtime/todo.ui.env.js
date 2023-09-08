goog.provide('todo.ui.env');
todo.ui.env.schema = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("todo.model","pet","todo.model/pet",2110415980),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Keyword(null,"primary-key","primary-key",1422512605),new cljs.core.Keyword("todo.model","pet-id","todo.model/pet-id",22849568),new cljs.core.Keyword(null,"attrs","attrs",-2090668713),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.PersistentArrayMap.EMPTY], null)], null);
if((typeof todo !== 'undefined') && (typeof todo.ui !== 'undefined') && (typeof todo.ui.env !== 'undefined') && (typeof todo.ui.env.data_ref !== 'undefined')){
} else {
todo.ui.env.data_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(shadow.grove.db.configure(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("todo.model","id-seq","todo.model/id-seq",1330562601),(0),new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578),null], null),todo.ui.env.schema));
}
if((typeof todo !== 'undefined') && (typeof todo.ui !== 'undefined') && (typeof todo.ui.env !== 'undefined') && (typeof todo.ui.env.rt_ref !== 'undefined')){
} else {
todo.ui.env.rt_ref = shadow.grove.prepare.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,todo.ui.env.data_ref,new cljs.core.Keyword("todo.ui.env","db","todo.ui.env/db",-764315762));
}

//# sourceMappingURL=todo.ui.env.js.map

goog.provide('pet.config');
pet.config.config = new cljs.core.PersistentArrayMap(null, 4, ["frontend-server","http://localhost:3000","resource-server","http://localhost:4444","authorization-server","http://localhost:4440","client-id","petstore"], null);
pet.config.authorize_payload = (function pet$config$authorize_payload(scopes){
return new cljs.core.PersistentArrayMap(null, 5, ["origin",cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"resource-server"),"client_id",cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"client-id"),"authorization_endpoint",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"authorization-server")),"/oauth/authorize"].join(''),"token_endpoint",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"authorization-server")),"/oauth/token"].join(''),"redirect_uri",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"frontend-server")),"/oauth-redirect.html"].join('')], null);
});

//# sourceMappingURL=pet.config.js.map

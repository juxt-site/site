
shadow.cljs.devtools.client.env.module_loaded('main');

try { pet.ui.init(); } catch (e) { console.error("An error occurred when calling (pet.ui/init)"); throw(e); }
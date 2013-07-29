App.importScript('${EXT}/jwsItemStoragePlugIn');
App.importScript('${EXT}/jwsItemStoragePlugInEE_min');

logger = App.getLogger();
server = App.getServerClient();
server.addListener({
	processWelcome: function(){
		server.subscribeCollection('Contacts', 'secret');
		server.setItemStorageCallbacks({
			OnItemSaved: function(aEvent){
				logger.debug(aEvent.name);
			}
		});
	}
})
server.open();

App.setModule('clock', {
	getTime: function(){
		return new Date().getTime();
	}
});

lClock = App.getModule('clock');

App.publish('Main', {
	time: function(){
		return lClock.getTime();
	},
	list: function(aConnector){
		server.listItems('Contacts', {
			OnSuccess: function(aResponse){
				App.sendToken(aConnector, aResponse);
			}
		});
	}
});


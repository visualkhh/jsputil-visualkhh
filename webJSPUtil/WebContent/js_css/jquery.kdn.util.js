jQuery.extend({
	xml: function(d) {
		var browserName = navigator.appName;
		var doc;
		if (browserName == 'Microsoft Internet Explorer')
		{
		doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.async = 'false';
		doc.loadXML(d);
		} else {
		doc = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return $(doc);
	}
	,json: function(d) {
		var data = eval(d);
		return $(data);
	}

	,ajaxloop:function(d){
		if (typeof d == "string") {
				return this;
		}
		var param = {
				url : '',
				type :'POST',
				data : {},
				datacall:null,
				dataType:"xml",
				async:true,
				autoStart:true,
				loop:true,
				success:function(data,textStatus){},
				error:function(xhr,textStatus,errorThrown){	},
				callback: function(){}
			};
		
		
		this.setParam = function(d){
				param = $.extend({}, param, d);
		};
		this.setParam(d);
		this.setLoop = function(d){
			param.loop=d;
		};
		

		
		this.start=function(){
			var sendparam=null;
			if(param.datacall){
				sendparam = param.datacall();
			}else{
				sendparam = param.data;
			}
			
//			////ajax
			$.ajax({
				type:param.type,
				url:param.url,
				data:sendparam,
				dataType:param.dataType,
				async:param.async,
				success:function(data,textStatus){
					param.success(data,textStatus);   //
					param.callback(data,textStatus);
					if (param.loop) {
						$.ajaxloop(param);
					}
					},
				error:function(xhr,textStatus,errorThrown){
					if(xhr.readyState==4 && xhr.status==0){
					}else{
						param.error(xhr,textStatus,errorThrown);
						param.callback(xhr,textStatus,errorThrown);
						if (param.loop) {
							$.ajaxloop(param);
						}
					}
				}
			});
		}
	
		if(param.autoStart){
			this.start();
		}
	return this;
	}
	
	
	
});







///////////////////////////////fn
/*
jQuery.fn.extend({
	uiflow: function(d) {
		var context = this;
		
		if (typeof d != "object") {
			alert("no parameter");
			return this;
		}
		
		var defaultParam = {
				onBeforeProcess : function(){
					//alert("d  onBeforeProcess");
				},
				onViewSetting : function(){
					//alert("d  onViewSetting");
				},
				onDataSetting : function(){
					//alert("d  onDataSetting");
				},
				onAddListener : function(){
					//alert("d  onAddListener");
				},
				onAction : function(gb){
					//alert("d  onAction");
				},
				onAfterProcess : function(){
					//alert("d  onAfterProcess");
				},
				dispose : function(){
					//alert("d  dispose");
				},
				autoStart : false
		};
		var param = $.extend({}, defaultParam, d);
		context.onBeforeProcess	=	param.onBeforeProcess;
		context.onViewSetting		=	param.onViewSetting;
		context.onDataSetting		=	param.onDataSetting;
		context.onAddListener		=	param.onAddListener;
		context.onAction			=	param.onAction;
		context.onAfterProcess		=	param.onAfterProcess;
		context.dispose				=	param.dispose;
		context.autoStart			=	param.autoStart;
		
		$(window).unload( function () {
			context.dispose();
		});
		
		this.flow=function(){
			this.onBeforeProcess();
			this.onViewSetting();
			this.onDataSetting();
			this.onAddListener();
			this.onAfterProcess();
		};
		if(this.autoStart){
			this.flow();
		}
        return this;
    }
});
*/




jQuery.fn.extend({
	uiflow: function(d) {
		var context = this;
		
		if (typeof d != "object") {
			alert("no parameter");
			return this;
		}
		
		var defaultParam = {
				onBeforeProcess : function(){
					//alert("d  onBeforeProcess");
				},
				onViewSetting : function(){
					//alert("d  onViewSetting");
				},
				onDataSetting : function(){
					//alert("d  onDataSetting");
				},
				onAddListener : function(){
					//alert("d  onAddListener");
				},
				onAction : function(gb){
					//alert("d  onAction");
				},
				onAfterProcess : function(){
					//alert("d  onAfterProcess");
				},
				dispose : function(){
					//alert("d  dispose");
				},
				autoStart : false
		};
		context = $.extend({}, defaultParam, d);
		$(window).unload( function () {
			context.dispose();
		});
		
		context.flow=function(){
			context.onBeforeProcess();
			context.onViewSetting();
			context.onDataSetting();
			context.onAddListener();
			context.onAfterProcess();
		};
		if(context.autoStart){
			context.flow();
		}
        return context;
    }
});












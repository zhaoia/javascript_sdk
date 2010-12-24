function Zhaoia(options) {
   this.app_key = options['app_key'];
   this.secret_code= options['secret_code'];
}
Zhaoia.service_url = 'http://www.zhaoia.com/service';
Zhaoia.prototype.get_sign=function(params){
   var keys= [];
   for( var k in params ){
      keys.push(k);
   }
   keys = keys.sort();
   var fields=[];
   for( var i= 0 ; i< keys.length; i++ ){
      fields.push(keys[i]+"="+params[keys[i]]);
   }
   fields.push("secretcode="+this.secret_code);
   query = fields.join("&");
   sign = hex_md5(query).toUpperCase();
   fields.pop();
   fields.push("sign="+sign);
   query = fields.join("&");
   return {sign:sign,query:query};
}
Zhaoia.prototype.get_query=function(params) {
   var keys= [];
   for( var k in params ){
      keys.push(k);
   }
   keys = keys.sort();
   var fields=[];
   for( var i= 0 ; i< keys.length; i++ ){
      fields.push(keys[i]+"="+this.escape_text(params[keys[i]]));
   }
   return fields.join("&");
}
Zhaoia.prototype.escape_text=function(text){
   return encodeURIComponent(text);
}
Zhaoia.prototype.get_results=function(name,params){
   var ret = this.get_sign(params);
   params['sign'] = ret['sign'];
   var query = this.get_query(params);
   var sendUrl =Zhaoia.service_url+"/"+name+"?"+query;
   var req = new XMLHttpRequest();
   req.open('GET', sendUrl, true);
   req.onreadystatechange = function() {
      if (this.readyState == 4) {
         alert(req.responseText); 
      }else{
      }
   }
   req.send(null);
}
Zhaoia.prototype.get_context_product_lists=function(keyword,lurl,lsize){
   params = {
      'appkey':this.app_key,
      'keyword':keyword,
      'url':lurl,
      'lsize':8
   };
   this.get_results('get_context_product_lists',params);
}

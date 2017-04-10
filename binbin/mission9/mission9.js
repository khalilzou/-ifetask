var root = document.getElementById("root");
var nodes = [];
document.getElementById("preorder").onclick = function() {preOrder(root)};
document.getElementById("bft").onclick = function() {bfTraversal(root)};
document.getElementById("postorder").onclick = function() {postOrder(root)};
document.getElementById("presearch").onclick = function() {preSrh()};
document.getElementById("bftsearch").onclick = function() {bftSrh()};
document.getElementById("postsearch").onclick = function() {postSrh()};
document.getElementById("delbtn").onclick = function() {delFunc()};
document.getElementById("addbtn").onclick = function() {addEle()};

function preOrder(x) {
    preorder(x);//按照先序遍历的顺序将元素存入数组
    changeColor();//将数组中的元素，按照顺序每隔一秒改变背景颜色
}

function bfTraversal(x) {
    bftraversal(x);
    changeColor();	
}

function postOrder(x) {
    postorder(x)
    changeColor();
}

function preorder(x) {
    if(x != null) {
        nodes.push(x);
        var n = x.childNodes.length;
        for(var i = 0;i < n;i++) {
        	  if (x.childNodes[i].nodeType == "1")
            preorder(x.childNodes[i]);	
        }	
    }
}      //按照先序遍历的顺序把节点放入数组

function postorder(x) {
    if(x != null) {
        var n = x.childNodes.length;
        for(var i = 0;i < n;i++) {
        	  if (x.childNodes[i].nodeType == "1")
            postorder(x.childNodes[i]);	
        }	
        nodes.push(x);        
    }  	
}      //按照后序遍历的顺序把节点放入数组

function bftraversal(x) {
	  nodes.push(x);
	  var arr = [];
	  arr.push(x);   
	  while(arr.length != 0) {
	  	  var temp = arr.shift();
	  	  var n = temp.childNodes.length;
	  	  for(var i = 0;i < n;i++) {
            if (temp.childNodes[i].nodeType == "1") {
                nodes.push(temp.childNodes[i]);
                arr.push(temp.childNodes[i]);
            }
        }
	  }  
}//按照层序遍历的顺序把节点放入数组
	  
function changeColor() {
	  nodes[0].style.backgroundColor = "blue";
	  var gone = nodes.shift();
    var s = setInterval(function() {
    var t = nodes.length;        
    gone.style.backgroundColor = "white";
    nodes[0].style.backgroundColor = "blue";
    gone = nodes.shift();
    if(t == 1) {
    	  clearInterval(s);	
    	  setTimeout(function() {gone.style.backgroundColor = "white";},500)}
    	  //把最后一个遍历元素的样式恢复
    },500);
} // 按照数组nodes中的顺序，每隔1s改变当前遍历元素的背景颜色

function getTxt() {
  	var txt = document.getElementById("txt").value;
  	return txt;
}//获取输入内容

function seek() {
	  var divlist = document.getElementsByTagName("div");
	  for( var i = 0;i < divlist.length;i++) {
	      divlist[i].style.backgroundColor = "white";
	  }//清除背景颜色样式
	  var txt = getTxt();//获取输入框输入的内容
	  var tag = 0;
    nodes[0].style.backgroundColor = "blue";
    if(nodes[0].firstChild.nodeValue.indexOf(txt) != -1) { 
        nodes[0].style.backgroundColor = "red";
        tag = 1;
    } //如果内容相同，则把相同的元素标红
    var gone = nodes.shift();
    var s = setInterval(function() {
    var t = nodes.length;  //debugger; 
    if(gone.style.backgroundColor != "red") {   
    gone.style.backgroundColor = "white";
    }//如果不是所找的元素，背景颜色恢复为白色
    nodes[0].style.backgroundColor = "blue";
    if(nodes[0].firstChild.nodeValue.indexOf(txt) != -1) { 
        nodes[0].style.backgroundColor = "red";
        tag = 1;
    } //如果内容相同，则把相同的元素标红
    gone = nodes.shift();
    if(t == 1) {
    	  clearInterval(s);	
    	  setTimeout(function() {
    	  	  if(gone.style.backgroundColor != "red") {
    	  	  gone.style.backgroundColor = "white";
    	  	  }
    	  	  if(tag == 0) {
    	  	  alert("没有找到匹配内容");
    	  	  }
    	  },500);
    }
    	  //把最后一个遍历元素的样式恢复
    },500);	
}  //找出输入框输入的内容，并将元素标红，如果没有，则弹出提示


function preSrh() {
	  
    preorder(root);	//按照先序遍历的顺序将元素放入数组
    seek();
}

function postSrh() {
    postorder(root);	//按照层序遍历的顺序将元素放入数组
    seek();//在数组中查找是否有内容匹配的元素	
}

function bftSrh() {
    bftraversal(root);	//按照层序遍历的顺序将元素放入数组
    seek();//在数组中查找是否有内容匹配的元素	
}

function choosed() {
    preorder(root);
    for(var i = 0;i < nodes.length;i++) {
        nodes[i].onclick = function() {
        	  stopBubble(this);//阻止冒泡
            this.style.backgroundColor = "#808080";	
            this.style.boxShadow = "2px 2px 2px #a0a0a0 inset";
        };	
    }
} //将选中元素呈现特殊样式
choosed();

function stopBubble(e){
　　if(e&&e.stopPropagation){//非IE
　　e.stopPropagation();
　　}
　　else{//IE
　　window.event.cancelBubble=true;
　　}
} //阻止冒泡，防止选中一个元素后，其父元素也被选中

function delFunc() {
	  nodes = [];//清空数组，防止二次调用的时候发生数据错误
    preorder(root);
    for(var i = 0;i < nodes.length;i++) {
        if(nodes[i].style.boxShadow == "rgb(160, 160, 160) 2px 2px 2px inset") {     	
            nodes[i].parentNode.removeChild(nodes[i]);
            return;
        }//如果元素被选中，则点删除后删除
    }
}//删除选中元素

function getEle() {
    var txt = document.getElementById("inputtxt").value;
    return txt;	
}//获取输入框的内容

function addEle() {
	  nodes = [];//清空数组，防止二次调用的时候发生数据错误
    preorder(root);
    var	txt = getEle();
    var newNode = document.createElement("div");
    var contNode = document.createTextNode(txt);
    newNode.appendChild(contNode);//根据输入内容创建新节点
    for(var i = 0;i < nodes.length;i++) {
        if(nodes[i].style.boxShadow == "rgb(160, 160, 160) 2px 2px 2px inset") {     	
            nodes[i].appendChild(newNode);
            choosed();//为新增加的节点添加点击删除的功能
            return;
        }//向选中元素子节点列表末尾添加子节点
    }
}
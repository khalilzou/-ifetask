var root = document.getElementById("root");
var nodes = [];
document.getElementById("preorder").onclick = function() {preOrder(root)};
document.getElementById("bft").onclick = function() {bfTraversal(root)};
document.getElementById("postorder").onclick = function() {postOrder(root)};
document.getElementById("presearch").onclick = function() {preSrh()};
document.getElementById("bftsearch").onclick = function() {bftSrh()};
document.getElementById("postsearch").onclick = function() {postSrh()};

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
        tag = 1;//表示有找到内容相符的元素,	且将符合的元素标红
    }
    var gone = nodes.shift();
    var s = setInterval(function() {
    var t = nodes.length;   
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
    	  },500)}
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

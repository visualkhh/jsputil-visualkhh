window.onload = function() {
		loadCommentList();
	}
	function loadCommentList() {
		new ajax.xhr.Request("commentlist.jsp", "", loadCommentResult, 'GET');
	}
	function loadCommentResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
					var commentList = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					for (var i = 0 ; i < commentList.length ; i++) {
						var commentDiv = makeCommentView(commentList[i]);
						listDiv.insertBefore(commentDiv, listDiv.firstChild);
					}
				} else if (code == 'error') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("댓글 목록 로딩 실패:"+req.status);
			}
		}
	}
	function makeCommentView(comment) {
		var commentDiv = document.createElement('div');
		commentDiv.setAttribute('id', 'c'+comment.id);
		var html = '<strong>'+comment.name+'</strong><br/>'+
			comment.content.replace(/\n/g, '\n<br/>')+'<br/>'+
			'<input type="button" value="수정" '+
			'onclick="viewUpdateForm('+comment.id+')"/>'+
			'<input type="button" value="삭제" '+
			'onclick="confirmDeletion('+comment.id+')"/>' ;
		
		commentDiv.innerHTML = html;
		commentDiv.comment = comment;
		commentDiv.className = "comment";
		return commentDiv;
	}
	function addComment() {
		var name = document.addForm.name.value;
		var content = document.addForm.content.value;
		var params = "name="+encodeURIComponent(name)+"&"+
		             "content="+encodeURIComponent(content);
		
		new ajax.xhr.Request('commentadd.jsp', params, addResult, 'POST');
	}
	function addResult(req) {		
		if (req.readyState == 4) {
			if (req.status == 200) {
				
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
				
					var comment = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					var commentDiv = makeCommentView(comment);
					
					listDiv.insertBefore(commentDiv, listDiv.firstChild);
					//listDiv.appendChild(commentDiv);
					
					document.addForm.name.value = '';
					document.addForm.content.value = '';
					
				//	alert("등록했습니다!["+comment.id+"]");
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
	function viewUpdateForm(commentId) {
		var commentDiv = document.getElementById('c'+commentId);
		var updateFormDiv = document.getElementById('commentUpdate');
		if (updateFormDiv.parentNode != commentDiv) {
			updateFormDiv.parentNode.removeChild(updateFormDiv);
			commentDiv.appendChild(updateFormDiv);
		}
		var comment = commentDiv.comment;
		document.updateForm.id.value = comment.id;
		document.updateForm.name.value = comment.name;
		document.updateForm.content.value = comment.content;
		updateFormDiv.style.display = '';
	}
	function cancelUpdate() {
		hideUpdateForm();
	}
	function hideUpdateForm() {
		var updateFormDiv = document.getElementById('commentUpdate');
		updateFormDiv.style.display = 'none';
		updateFormDiv.parentNode.removeChild(updateFormDiv);
		document.documentElement.appendChild(updateFormDiv);
	}
	function updateComment() {
		var id = document.updateForm.id.value;
		var name = document.updateForm.name.value;
		var content = document.updateForm.content.value;
		var params = "id="+encodeURIComponent(id)+"&"+
		             "name="+encodeURIComponent(name)+"&"+
		             "content="+encodeURIComponent(content);
		new ajax.xhr.Request('commentupdate.jsp', params, updateResult, 'POST');
	}
	function updateResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code')
				                 .item(0).firstChild.nodeValue;
				if (code == 'success') {
					hideUpdateForm();
					var comment = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					var newCommentDiv = makeCommentView(comment);
					var oldCommentDiv = 
					        document.getElementById('c'+comment.id);
					listDiv.replaceChild(newCommentDiv, oldCommentDiv);
					alert("수정했습니다!");
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
	function confirmDeletion(commentId) {
		if (confirm("삭제하시겠습니까?")) {
			var params = "id="+commentId;
			new ajax.xhr.Request(
				'commentdelete.jsp', params, removeResult, 'POST');
		}
	}
	function removeResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
					var deletedId = 
						xmlDoc.getElementsByTagName('id').item(0)
						      .firstChild.nodeValue;
					var commentDiv = document.getElementById("c"+deletedId);
					commentDiv.parentNode.removeChild(commentDiv);
					
					alert("삭제했습니다");
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
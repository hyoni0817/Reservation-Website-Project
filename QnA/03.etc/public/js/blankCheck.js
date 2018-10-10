//비밀번호를 4~8자 이내로 적었는지 체크하는 소스코드
var pwdOk = false;
var alertPwd = document.getElementsByClassName("alertPwd")[0];

String.prototype.bytes = function() {
 var msg = this;
 var cnt = 0;

 for( var i=0; i< msg.length; i++) 
  cnt ++;
  return cnt;
}

$("#pwd").keyup(function( e ){
   msg_length = $(this).val().bytes();
 if( msg_length < 4 || msg_length > 8 ) {
   pwdOk = false;
   alertContent = '<p id="alert-content" style="color:red;">4~8자를 충족시키지 못합니다.</p>'
   alertPwd.innerHTML = alertContent;
}else {

  pwdOk = true;
  alertContent = ''
  alertPwd.innerHTML = alertContent;
}
});

//빈칸체크하는 생성자 함수
function qnaSubmit(urlnm) {
  var pwdVal = document.getElementById("pwd").value;
  var userName = $('#userName').val();
  var contents = $('#contents').val();
  var pwd = $('#pwd').val();
  var title = $('#title').val();
  var alertEle = document.getElementsByClassName("alert-view");
  var alertHTML;
  var alertContent;

  var msg_length = 0;

  if(title.replace(/\s/g,"").length == 0) {
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 제목을 입력해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else if(userName.replace(/\s/g,"").length == 0) {
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 이름을 입력해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else if(urlnm == 'qna' && (pwdOk === false || pwd.replace(/\s/g,"").length == 0)) {
    //urlnm이 qna라면 다음 조건식을 실행해서 true일 때 아래 코드를 실행한다.
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 비밀번호를 글자수를 확인해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else if(pwdOk === false && urlnm == 'editQuestion' && pwd.replace(/\s/g,"").length > 0) {
    //urlnm이 editQuestion이라면 length가 0일 필요가 없기 때문에 0이상일 떄 아래의 코드가 실행되게 한다.
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 비밀번호를 글자수를 확인해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else if(contents.replace(/\s/g,"").length == 0) {
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 내용을 입력해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else {
    alertHTML = '<div></div>';
    alertEle[0].innerHTML = alertHTML;
    let frm = document.getElementById("qna-wri-form");
    frm.action="/"+urlnm;
    frm.method="post";
    frm.submit();
  }
}

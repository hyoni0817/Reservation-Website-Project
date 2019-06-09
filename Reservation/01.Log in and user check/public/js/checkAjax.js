function sendAjax(url, userName, reserNum){

  // 입력값을 변수에 담고 문자열 형태로 변환
  var alertEle = document.getElementsByClassName("alert-view");
  var data = {'userName':userName,'reserNum':reserNum};
  data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function(){
    // 문자열 형식으로 변환
    var result = JSON.parse(xhr.responseText);
    // 데이터가 없으면 return 반환

    if(result.result !== 'ok') return;

    if(result.enable == 'N') {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 예약 정보를 찾을 수 없습니다.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else {
      var frm = document.getElementById("check-info");
      frm.action="/";
      frm.method="post";
      frm.submit();
    }
    // 데이터가 있으면 결과값 표시
  });
}

function submitUserCheck() {
  var userName = $('#inputUserName').val();
  var reserNum = $('#inputReserNo').val();
  var alertEle = document.getElementsByClassName("alert-view");
  var alertHTML;

  if(reserNum.replace(/\s/g,"").length == 0) {
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 예약 번호를 입력해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else if(userName.replace(/\s/g,"").length == 0) {
    alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 이름을 입력해주세요.</div>';
    alertEle[0].innerHTML = alertHTML;
  } else {
    //예약 번호와 이름을 작성하는 곳이 빈칸이 아닐 때, sendAjax로 값을 전달
    alertHTML = '<div></div>';
    alertEle[0].innerHTML = alertHTML;
    sendAjax('/ajaxUserCheck', userName, reserNum);
  }
}

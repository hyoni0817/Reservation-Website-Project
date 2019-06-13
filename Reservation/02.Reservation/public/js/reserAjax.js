function sendAjax(url, selDateVal, selTimeVal, selSeatsVal){

    // 입력값을 변수에 담고 문자열 형태로 변환
    var alertEle = document.getElementsByClassName("alert-view");
    var data = {'selDateVal':selDateVal,'selTimeVal':selTimeVal,'selSeatsVal':selSeatsVal, 'page':'reser'};

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

      //날짜, 시간, 좌석이 같을 경우 예약이 안되게 함.
      if(result.overlap == 'Y') {
        alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 선택해주세요.</strong> 이미 다른 고객님께서 선택하신 내역이 있습니다.</div>';
        alertEle[0].innerHTML = alertHTML;
      }
      else {
        var frm = document.getElementById("reser-info");

        frm.action="/reser/step2";
        frm.method="post";
        frm.submit();
      }
    });
  }

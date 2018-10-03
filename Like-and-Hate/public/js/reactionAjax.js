function sendAjax(url, wriNo, stat, spanIdNum, ip){

    // 입력값을 변수에 담고 문자열 형태로 변환
    if(stat == 'like'){
      var data = {'wriNo':wriNo,'reactionST':stat, 'ipAddr':ip};
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

        //좋아요 혹은 싫어요를 누른 사용자 중 ip가 중복된 내역이 있을 때
        if(result.enable == 'N') {
          alert('이미 '+((result.reactionST == 'like') ? "공감" : "비공감")+'을 누르셨습니다.')
        } else {
          document.querySelector("#likeNum"+spanIdNum).innerHTML = result.likeNum;
        }
        // 데이터가 있으면 결과값 표시

      });
    }else if(stat == 'hate') {
      var data = {'wriNo':wriNo,'reactionST':stat, 'ipAddr':ip};
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
        // 데이터가 있으면 결과값 표시
        if(result.enable == 'N') {
          alert('이미 '+((result.reactionST == 'like') ? "공감" : "비공감")+'을 누르셨습니다.')
        } else {
          document.querySelector("#hateNum"+spanIdNum).innerHTML = result.hateNum;
        }
      });
    }

  }

  function LikeClick(likeWriNo, spanIdNum) {

    // sendAjax 함수를 만들고 URL과 data를 전달
    sendAjax('http://localhost:3000/ajaxSendReaction', likeWriNo, 'like', spanIdNum, ip())

  }

  function HateClick(hateWriNo, spanIdNum) {

    // sendAjax 함수를 만들고 URL과 data를 전달
    sendAjax('http://localhost:3000/ajaxSendReaction', hateWriNo, 'hate', spanIdNum, ip())

  }

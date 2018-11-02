var btnStat = true;
// btnStat은 페이지 벗어나기 알림 표시 여부를 나타낸다.
// true는 경고창을 띄워서 페이지를 떠날 여부를 확인하고
// false는 페이지 떠날때 경고창 띄우지 않고 다음으로 진행할 수 있게 한다.
// false인 경우에는 경고창이 뜨지 않게 하기 위해 btnStat을 false으로 저장했다.
var submitBtn = document.getElementById("nextBtn");

//최소버튼 눌렀을 때
function cancelBtn() {
  var cancelBox = confirm("작성을 취소하겠습니까?")
  if ( cancelBox == true) {
    btnStat = false;
    window.location.href="/";
  } else {
    btnStat = false;
  }
}

submitBtn.addEventListener('click', function() {
  btnStat = false;
});

// 이벤트가 발생한 경우에 btnStat 값 비교 후 경고창을 띄운다.
// 사용자가 페이지를 벗어날려고 할 때 경고나 저장을 권유한다.
window.addEventListener("beforeunload", function(event) {
  // 아래코드를 밖에 위치시키면 submit 버튼을 누를 때
  // '페이지 나가기' 알림창이 뜨고 제출된다.
  if(btnStat == true) {
    event.returnValue = "Write something clever here..";
  }
});

//이미지 파일만 업로드 시키기
function fileCheck(el) {
    if(!/\.(jpeg|jpg|png|gif|bmp)$/i.test(el.value)){
        alert('이미지 파일만 업로드 가능합니다.');
        el.value = '';
        el.focus();
    }
}


function step1BlankCheck() {
  var userName = $('#userName').val();
  var phoneNum = $('#phoneNum').val();
  var email = $('#emailText').val();
  var regex = /^(\s|\d)+$/;
  var emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  var termsCheck = document.getElementById("termsCheck");

  //알림 메시지
  var alertEle = document.getElementsByClassName("alert-view");
  var alertHTML;


    if(userName.replace(/\s/g,"").length == 0) {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 이름을 입력해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else if(phoneNum.replace(/\s/g,"").length == 0) {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 전화번호를 입력해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else if(!(regex.test(phoneNum))){
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 전화번호에 숫자만 입력해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else if(email.replace(/\s/g,"").length == 0) {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 이메일을 입력해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else if(!(emailRegex.test(email))) {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 이메일을 다시 확인해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else if(termsCheck.checked == false) {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong> 약관을 확인하시고 체크해주세요.</div>';
      alertEle[0].innerHTML = alertHTML;
    } else {
      let frm = document.getElementById("person-info");
      frm.action="/reser/step1";
      frm.method="post";
      frm.submit();
    }
}

function step2BlankCheck() {

  var selDateVal;
  if(document.getElementsByClassName("selDate")[0] === undefined){
    selDateVal = 0;
  }else {
    selDateVal = document.getElementsByClassName("selDate")[0].value;
  }
  var selTime = document.getElementsByClassName("selTime");
  var selTimeVal = selTime[0].options[selTime[0].selectedIndex].value;
  var selPeoNum = document.getElementsByClassName("selPeople");
  var selPeoNumVal = selPeoNum[0].options[selPeoNum[0].selectedIndex].value;
  var selSeats = document.getElementsByClassName("selSeats");
  var selSeatsVal = selSeats[0].options[selSeats[0].selectedIndex].value;
  
  var alertEle = document.getElementsByClassName("alert-view");
  var alertHTML;
  var stat = 0;

  // var arrDtLen = parseInt(allDt.length);

  if(selDateVal == 0){
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong>날짜를 선택하지 않으셨습니다.</div>';
      alertEle[0].innerHTML = alertHTML;
  } else if(selTimeVal == 'hide') {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong>시간을 선택하지 않으셨습니다.</div>';
      alertEle[0].innerHTML = alertHTML;
  } else if(selSeats == 'hide') {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong>좌석을 선택하지 않으셨습니다.</div>';
      alertEle[0].innerHTML = alertHTML;
  } else if(selPeoNumVal == 'hide') {
      alertHTML = '<div class="alert alert-danger" role="alert"><strong>다시 확인해주세요!</strong>인원을 선택하지 않으셨습니다.</div>';
      alertEle[0].innerHTML = alertHTML;
  } else {
      sendAjax('/ajaxOverlapCheck', 'reser', selDateVal, selTimeVal, selPeoNumVal, selSeatsVal) //이름과 번호는 session에 저장되어 있으니 날짜만 보내면 된다.

   }
}

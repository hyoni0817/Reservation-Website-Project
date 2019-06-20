//QnA 글 목록에서 카테고리 선택하는 탭
function inquiryNavTab(inquiryNum, contents, ansNum, condiNum) {
  var element = document.getElementsByClassName("nav-inquiry");

  var navHTML = '<ul class="nav nav-pills">';

  for(var i = 0; i < 5; i++) {
    navHTML += '<li class="nav-item"><a class="nav-link '+(inquiryNum == i ? 'active' : '')+'" href="/qna?inquiry=' +
    i +'&searchContent='+contents+'&answer='+ansNum+'&condition='+condiNum+ '">';
    if(i===0){
      navHTML += '전체'
    } else if(i===1) {
      navHTML += '예약 문의'
    } else if(i===2) {
      navHTML += '운영 문의'
    } else if(i===3) {
      navHTML += '기타 문의'
    } else if(i===4) {
      navHTML += '건의 사항'
    }
    navHTML += '</a></li>';
  }
 element[0].innerHTML = navHTML;
}

//질문전체 답변 완료 선택하는 부분
function answerSel(inquiryNum, contents, ansNum, condiNum) {
  var ansEle = document.getElementById("answer");

  location.href='/qna?inquiry='+inquiryNum+'&answer='+ansEle.value+'&searchContent='+contents+'&condition='+condiNum;
}

function ansSelect(ansNum){
  var ansEle = document.getElementById("answer");
  for(var i=0; i < ansEle.options.length; i++) {
    if(ansEle.options[i].value == ansNum) {
      ansEle.options[i].selected = true;
    }
  }
}

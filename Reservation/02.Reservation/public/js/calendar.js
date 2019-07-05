function Calendar(impDate) {

  var element = document.getElementsByClassName("calendar");
  var pElement = document.getElementById("wantMonth");//날짜를 선택하려고하는 달
  var spanElem = document.getElementById("date-text");//선택한 날짜
  var prevMonthBtn = document.getElementById("prevMonthBtn");//이전 달
  var afterMonthBtn = document.getElementById("afterMonthBtn");//다음 달

  var viewBtnStat = false;
  // 이전 달 버튼을 누르면 다음 달 버튼이 안보이게,
  // 다음 달 버튼을 누르면 이전 달 버튼이 안보이게 하는 역할을 한다.

  var preVal = 0; //이전에 누른 date의 초기값

  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();
  var prevM=m, afterM=m, prevY = y, afterY = y, prevD = d, afterD = d;
  var currentM = m, currentD = 0, currentY = y, today=d;
  var selectY=0,selectM=0,selectD=0;
  var arrNum = 0; //impDate를 비교하는 배열의 원소 번호
  var removeNum=0;//이전에 선택한 값 저장

  var tempArrNum = 0;
  //다음달에 이어서 이미 예약된 내역 안내를 위해
  //이전달에서 다음달로 넘어가는 첫주의 첫번째 예약 내역의 배열 원소번호 저장

  var AfterBtnClick = false;//afterBtn 누른지 체크


  var last = [31,28,31,30,31,30,31,31,30,31,30,31];
  var day = ['일','월','화','수','목','금','토'];

  //선택 불가능한 날짜 "-" 기준으로 잘라서 배열에 저장하기
  var splitImpDate = [];
  var temp = 0;

  if(impDate.length > 0) {
  	for(var i = 0; i < impDate.length; i++) {
  		temp = impDate[i].split("-");
  		splitImpDate.push(temp);
  	}
  }

  //이전 달, 다음 달 이동하는 버튼 나타내기
  this.ViewMonthBtn =  function(statNum){
    if(statNum == 0 || viewBtnStat == false){
        afterMonthBtn.style.display = 'inline-block';
        prevMonthBtn.style.display = 'none';
      } else if(viewBtnStat == true){
        afterMonthBtn.style.display = 'none';
        prevMonthBtn.style.display = 'inline-block';

      }
  }

  //선택한 날짜
  this.viewDateText = function(year,month,date) {
    if(date > last[month]){
      date -= last[month];
      if(month==11){
        month = 0;
      } else {
        month = month+1;
      }
    }
    var dt = new Date(year,month,date);
    var dayOfWeek = dt.getDay();
    var valM;
    var valD = date;

    //month가 0부터 시작하므로 9 미만의 month를 받아서 0을 앞에 붙임.
    if(month < 9){
      valM = '0'+(month+1);
    } else {
      valM = month+1;
    }

    //10일 이하는 앞에 0을 붙임.
    if(date < 10){
      valD = '0'+ date;
    }

    var inputHTML = '<input type="hidden" class="selDate" name="selectDate" value='+year+'-'+valM+'-'+valD+'></input>';

    inputHTML += year + '년 ' + (month+1) + '월 ' + date + '일 ' + day[dayOfWeek] +'요일';
    spanElem.innerHTML = inputHTML;
  }

  //이전달, 다음달 버튼을 통해 원하는 달을 보여줌
  this.wantYearMonthText = function(year,month) {
    pElement.innerHTML = year+'년'+(month+1)+'월';
  }

  this.prevMonth = function() {
    arrNum = 0;
    tempArrNum = 0;
    AfterBtnClick = false;
    if(currentD!==0) {
      prevD = currentD;
    }
    prevD -= 1;

    if(currentM!==0) {
      prevM = currentM;
      prevY = currentY;
    }
    if(currentM === 0) {
        prevM = 12;
        prevY = currentY - 1;
      }
    prevM -= 1;
    viewBtnStat = false;
    currentD = prevD;
    currentM = prevM;
    currentY = prevY;

    this.ViewMonthBtn(viewBtnStat);
    this.wantYearMonthText(prevY,prevM);
    this.viewCalendar(prevY,prevM,prevD);
  }

  this.afterMonth = function() {
    AfterBtnClick = true;
    if(currentD!==0) {
      afterD = currentD;
    }
    afterD += 1;

    if(currentM!==0) {
      afterM = currentM;
      afterY = currentY;
    }
    afterM += 1;
    if(afterM == 12) {
        afterM = 0;
        afterY = afterY + 1;
      }

    viewBtnStat = true;

    currentD = afterD;
    currentM = afterM;
    currentY = afterY;

    this.ViewMonthBtn(viewBtnStat);
    this.wantYearMonthText(afterY,afterM);
    this.viewCalendar(afterY,afterM,afterD);

  }

  this.sendData = function(year,month,dateNum){
    var changeBtn = document.getElementById("selectDate"+dateNum);
    var prevSelectDt = document.getElementById("selectDate"+preVal);
    //wantYearMonthText부분과 preval에 저장할 값으 다르게 둔다.

    var lastM;

    if(currentM == 0){
      lastM = 11;
    } else {
      lastM = currentM - 1;
    }
    if(dateNum>=last[month]){//32
      lastM = currentM;
    }
    var theDate = new Date(year,month,1);
    var theDay = theDate.getDay(); //요일(0부터 시작)
    if(preVal !== 0 && preVal !== dateNum && currentM == selectM && preVal != last[lastM] + dateNum){
      //이전에 등록된 값이 있다는 얘기
      //같은 달 안에서 선택할 경우 이전에 선택한 값은 취소시킨 것을 표시할 수 있다

      if(preVal >= last[month] && preVal - last[lastM] == dateNum){ //32
        let delPreVal = preVal - last[lastM];
        var removeBtn = document.getElementById("selectDate"+delPreVal);
        removeBtn.style.backgroundColor = "rgba(0,0,0,0)";
        removeBtn.onmouseover = function() {removeBtn.style.backgroundColor = "#ebebe0";};
        removeBtn.onmouseout = function() { removeBtn.style.backgroundColor = "rgba(0,0,0,0)";};
      } else {
        //date값이 last[month]넘지 않을 때
        prevSelectDt.style.backgroundColor = "rgba(0,0,0,0)";
        prevSelectDt.onmouseover = function() {prevSelectDt.style.backgroundColor = "#ebebe0";};
        prevSelectDt.onmouseout = function() { prevSelectDt.style.backgroundColor = "rgba(0,0,0,0)";};

      }
      changeBtn.style.backgroundColor = "#E9967A";//green
      changeBtn.onmouseover = function() {changeBtn.style.backgroundColor = "#E9967A";};//green
      changeBtn.onmouseout = function() { changeBtn.style.backgroundColor = "#E9967A";};//green

      selectY = year;
      selectM = month;
      selectD = dateNum;
      d = dateNum;
      currentD = dateNum;
      preVal = dateNum;

      this.viewDateText(year,month,preVal)
      return preVal;

    } else if(preVal !== 0 && preVal !== dateNum && currentM != selectM && preVal != dateNum - last[currentM]  && (dateNum != preVal - last[lastM])){ //이전에 등록된 값이 있다는 얘기
      //다른 달 안에서 선택할 경우 이전에 선택한 값은 취소시키는 부분은 없앤다.

      removeNum = preVal;
      var removeBtn = document.getElementById("selectDate"+removeNum);

      changeBtn.style.backgroundColor = "#E9967A";
      changeBtn.onmouseover = function() {changeBtn.style.backgroundColor = "#E9967A";};
      changeBtn.onmouseout = function() { changeBtn.style.backgroundColor = "#E9967A";};
      if((preVal < 7 && dateNum - last[currentM] != preVal) || preVal > last[lastM]  || removeNum >= (last[lastM]-theDay+1)) {
        let delPreVal = preVal;
        if(delPreVal < 7){
          //(preVal < 7 && dateNum - last[currentM] != preVal)
          delPreVal = last[currentM] + delPreVal;
        } else if(delPreVal > last[lastM]){
          delPreVal = delPreVal - last[lastM];
        }
        var removeBtn = document.getElementById("selectDate"+delPreVal);
        if(removeBtn == null){
          delPreVal = last[currentM];
          removeBtn = document.getElementById("selectDate"+delPreVal);
        }
        removeBtn.style.backgroundColor = "rgba(0,0,0,0)";
        removeBtn.onmouseover = function() {removeBtn.style.backgroundColor = "#ebebe0";};
        removeBtn.onmouseout = function() { removeBtn.style.backgroundColor = "rgba(0,0,0,0)";};

      } else if(removeBtn == null){
        //ex)6월 13일을 체크하고 5월 30일을 누르면 다른 달에서 누른 내역이 취소가 되지않았음.
        //이 문제를 해결
      }
      else {
        //다음 달로 넘어가서 이전달의 마지막 주(29,30,31 같은)를 선택할 때 이전에 선택했던 값 흔적 지우기

        removeBtn.style.backgroundColor = "rgba(0,0,0,0)";
        removeBtn.onmouseover = function() {removeBtn.style.backgroundColor = "#ebebe0";};
        removeBtn.onmouseout = function() { removeBtn.style.backgroundColor = "rgba(0,0,0,0)";};
      }

      selectY = year;
      selectM = month;
      selectD = dateNum;
      d = dateNum;
      currentD = dateNum;
      preVal = dateNum;

      this.viewDateText(year,month,dateNum)
      return dateNum;

    } else if(preVal==dateNum || (preVal == dateNum - last[currentM] && preVal != 0) || preVal == last[lastM] + dateNum || dateNum == preVal - last[lastM]){ //날짜
      // || (preVal >= 32 && dateNum == preVal - last[lastM])
      let delPreVal = preVal;
      if(preVal == dateNum - last[currentM] && dateNum > last[currentM])
      {
        delPreVal = dateNum;
      }else if(preVal == last[lastM] + dateNum && preVal > last[lastM]){
        delPreVal = dateNum;
      }
      var removeBtn = document.getElementById("selectDate"+delPreVal);
      removeBtn.onmouseover = function() {removeBtn.style.backgroundColor = "#ebebe0";};
      removeBtn.onmouseout = function() { removeBtn.style.backgroundColor = "rgba(0,0,0,0)";};
      preVal = 0;
      selectY = 'N';
      selectM = 'N';
      selectD = 'N';
      spanElem.innerHTML = '날짜를 선택해주세요.'
      return preVal;
    }else if(preVal === 0 && preVal !== dateNum){
      changeBtn.style.backgroundColor = '#E9967A';//green
      changeBtn.onmouseover = function() {changeBtn.style.backgroundColor = "#E9967A";};//green
      changeBtn.onmouseout = function() { changeBtn.style.backgroundColor = "#E9967A";};//green

      selectY = year;
      selectM = month;
      selectD = dateNum;
      d = dateNum;
      currentD = dateNum;
      preVal = dateNum;
      this.viewDateText(year,month,preVal)
      return preVal;

    }
  }

  this.viewCalendar = function(inputY,inputM, inputD) {
    var lastDate = last[inputM];
    var theDate = new Date(inputY,inputM,1);
    var theDay = theDate.getDay(); //요일(0부터 시작)
    var calendarHTML = '<table class="table" style="text-align:center">';

    //윤달 계산
    if((inputY%4===0 && inputY%100!==0 && inputM==1) || (inputY%400 === 0 && inputM==1)) {
      lastDate = last[1] = 29;
    }

    var row = Math.ceil((theDay+lastDate)/7);

    var dateNum = 1;
    calendarHTML += '<tr>';

    for(var i=0; i<=6; i++) { //열
      calendarHTML += '<th class="th-day">'+ day[i] + '</th>';
    }
    calendarHTML += '</tr>';

    for(var i=1; i<=row; i++){
      calendarHTML += '<tr>';
      var addAfterDay = 0;
      var addPrevDay = 1;
      for(var k=1; k<=7; k++) {
        if(i===1 && k<=theDay || dateNum>lastDate) {
          if(i===1 && k<=theDay) {
            var lastM = inputM - 1;
            var lastY = inputY;
            if(inputM == 0){
              lastM = 11;
              lastY = inputY - 1;
            }
            if(m != currentM){
              calendarHTML += '<td><input id="selectDate'+(last[lastM]-theDay+addPrevDay)+'" type="button" onClick="Calendar.sendData('+lastY+','+lastM+','+(last[lastM]-theDay+addPrevDay)+')" value=' + (last[lastM]-theDay+addPrevDay) + '></td>';
            } else {
              calendarHTML += '<td class="not-this-month">'+ (last[lastM]-theDay+addPrevDay)+'</td>';
            }
            addPrevDay++;
          }else if(dateNum>=lastDate) {
            if(inputM == m){
              addAfterDay++; // 마지막 달이 목요일에서 끝나고 금,토가 다음달로 넘어가면 넘어가는 요일 수만큼 2번 반복
              if(inputM == 11){
                if(last[inputM]+today < last[inputM]+addAfterDay && dateNum >= 32) {
                  calendarHTML += '<td class="not-this-month">'+addAfterDay+'</td>';
                }else {

                  calendarHTML += '<td><input id="selectDate'+(last[inputM]+addAfterDay)+'" type="button" onClick="Calendar.sendData('+(inputY+1)+','+0+','+(last[inputM]+addAfterDay)+')" value=' + addAfterDay + '></td>';
                }
              } else if(last[inputM]+today < last[inputM]+addAfterDay && dateNum >= 32) { //32
                calendarHTML += '<td class="not-this-month">'+addAfterDay+'</td>';
              } else {
                //1~11월인 경우
                //해당 else문은 예를들어 5월 달력에서 6월을 나타낼 때의 소스코드

                //마지막주에서 다음달로 넘어가는 부분의 날짜 나타내기
                if(impDate.length > 0 && splitImpDate[arrNum][0] == inputY && (splitImpDate[arrNum][1]-1) == inputM+1 && (splitImpDate[arrNum][2] == addAfterDay)) {
                  //다음달 첫주의 예약 내역을 이전달 마지막 주에서 나타내는 다음달 날짜에서도 예약이 안되게 하기.
                  calendarHTML += '<td><input class="aleady-date" type="button" value=' +addAfterDay + ' disabled>';
                  calendarHTML +='<div class="aleady-text">이미 예약하신 내역이 있습니다.</div></td>'
                  if(arrNum < impDate.length-1) {
                    arrNum++;
                    if(tempArrNum==0) { //tempArrNum 값이 0일 때만 저장.
                      tempArrNum = arrNum-1; 
                      //이전달에서 다음달로 넘어간 주(마지막 주 기준으로 31,1,2,3으로 시작하는)에서
                      //처음 시작하는 예약 내역의 배열 원소 번호값을 저장.

                    }
                  } else if(arrNum < 2) {
                    //이미 선택한 날짜가 2개일 때(즉, impDate.length 가 2일 때)
                    tempArrNum = arrNum;
                  }

                } else {
                  calendarHTML += '<td><input id="selectDate'+parseInt(last[inputM]+addAfterDay)+'" type="button" onClick="Calendar.sendData('+inputY+','+inputM+','+(last[inputM]+addAfterDay)+')" value=' + addAfterDay + '></td>';
                }
              }
            } else {
              //다음달로 선택했을 때

              addAfterDay++;

              calendarHTML += '<td class="not-this-month">'+addAfterDay+'</td>';
            }
          }
        } else {
          var tempM =0;
          if(m==11 && inputM==0) tempM = -1;

          //다음달 버튼으로 눌러서 넘어왔을 떄 tempArrNum을 저장하고, 처음 현재 달을 보여 줄 때는 원래 값이 arrNum을 저장.
          arrNum = (AfterBtnClick == true ? tempArrNum : arrNum);

          if(impDate.length > 0 && splitImpDate[arrNum][0] == inputY && (splitImpDate[arrNum][1]-1) == inputM && splitImpDate[arrNum][2] == dateNum){

            calendarHTML += '<td><input class="aleady-date" type="button" value=' + dateNum + ' disabled>';
            calendarHTML +='<div class="aleady-text">이미 예약하신 내역이 있습니다.</div></td>'

            if(arrNum < impDate.length-1) {
              arrNum++;
              AfterBtnClick = false
            }

          }

          else if((inputM==m && dateNum<=today) || (inputM==(m+1) && dateNum>today) || (inputM == (tempM+1) && dateNum>today)) {
            calendarHTML += '<td class="not-this-month">'+dateNum+'</td>';
          }
           else {
            calendarHTML += '<td><input id="selectDate'+dateNum+'" type="button" onClick="Calendar.sendData('+inputY+','+inputM+','+dateNum+')" value=' + dateNum + '></td>';
          }
          dateNum++; //1~3월 마지막 날짜 제대로 나오게 수정하기
        }
      }
      calendarHTML += '</tr>';
    }
    calendarHTML += '</table>';
    element[0].innerHTML = calendarHTML;
    //inputD는 다음달로 넘어와서는 32가 숫자1로 바뀌어야함. wantMonth의 '월'로 구별하기
    if(inputD == selectD && inputY == selectY && inputM == selectM){
      var currentBtn = document.getElementById("selectDate"+inputD);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }else if(selectD == inputD && selectD >= 32){
      var currentBtn = document.getElementById("selectDate"+inputD);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d;
    }
    if(selectD >=32 && inputD == selectD+1 && inputM == selectM+1 && inputY == selectY){
      var val = inputD - last[selectM] -1;
      var currentBtn = document.getElementById("selectDate"+val);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }
    if(selectD < 8 && inputM != selectM && inputD != selectD && selectD != 0 && selectM != 0){
      //ex.6월달력에 1일을 선택하고 5월 달력에 6월의 1일을 나타내는 것
      var val = selectD + last[selectM-1];
      var currentBtn = document.getElementById("selectDate"+val);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }
    if(inputM == selectM-1 && currentD == selectD){
      var val = selectD + last[lastM];
      var currentBtn = document.getElementById("selectDate"+val);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }

    if(inputM==11 && selectM ==0){
      tempInputM = -1;
    }
    if(selectY == inputY+1 && (tempInputM+1) == selectM && selectD < 7){
      var val = last[inputM] + selectD;
      var currentBtn = document.getElementById("selectDate"+val);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }
    if(removeNum!=0 && currentM == selectM){ //이전에 등록된 값이 있다는 얘기
      //같은 달 안에서 선택할 경우 이전에 선택한 값은 취소시킨 것을 표시할 수 있다
      var removeBtn = document.getElementById("selectDate"+removeNum);
      removeBtn.style.backgroundColor = "rgba(0,0,0,0)";
      removeBtn.onmouseover = function() {removeBtn.style.backgroundColor = "#ebebe0";};
      removeBtn.onmouseout = function() { removeBtn.style.backgroundColor = "rgba(0,0,0,0)";};
    }
    if(selectD==d){
      var currentBtn = document.getElementById("selectDate"+selectD);
      currentBtn.style.backgroundColor = "#E9967A";
      preVal = d; //이와 같이 설정하면 이전에 선택한 것은 하얀색이 됨.
    }
  }

  this.wantYearMonthText(y,m);
  this.viewCalendar(y,m,d);
  }

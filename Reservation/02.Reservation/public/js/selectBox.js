//시간 선택
$('.selTime').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
    var $listItems = $list.children('li');



  $styledSelect.click(function(e) {
     if($('.select-options').is(':visible')) {
        e.stopPropagation(); //이벤트 전파 막음
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel')); //18번쨰 줄

        $list.hide();

     } else {
        e.stopPropagation();
        $('div.select-styled.active').each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
     }//end if
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

//인원수 선택
$('.selPeople').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled "></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val(),
            'class' : 'selPeople',
            'value' : i
        }).appendTo($list);
    }
    var $listItems = $list.children('li');



  $styledSelect.click(function(e) {
     if($('.select-options').is(':visible')) {
        e.stopPropagation(); //이벤트 전파 막음
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel')); //18번쨰 줄

        $list.hide();

     } else {
        e.stopPropagation();
        $('div.select-styled.active').each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
     }//end if
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

// 좌석수 선택
$('.selSeats').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled select-styled-seat"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options seat-list'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val(),
        }).appendTo($list);
    }
});



//인원수를 누르기 전까지는 좌석선택을 숨긴다.
$(".seat-select").hide();
var seatNum = 0;
var prevSeat = 0;
var $this = $(".selSeats");
var $styledSelect = $this.next('div.select-styled-seat');

//인원수를 선택하면 해당 인원수에 맞는 좌석 번호를 나타내게 한다.
$(".selPeople").on("click",function() {
  var seatsNum = {}
  var $list;
  var $listItems;
  seatsNum['1'] = ['1','2','3','4','5','6','8','9','10','11','12','13','14','15'];
  seatsNum['2'] = ['1','2','3','4','5','6','8','9','10','11','12','13','14','15'];
  seatsNum['3'] = ['1','2','3','4','5','6','8','9','14','15'];
  seatsNum['4'] = ['1','2','3','4','5','6','7','16'];
  seatsNum['5'] = ['7','16'];
  seatsNum['6'] = ['7','16'];

  var peopleList = document.getElementsByClassName("selPeople")[0];
  var seatsList = document.getElementsByClassName("selSeats")[0];
  var selPeople = $(this).val();
  while (seatsList.options.length) {
      seatsList.remove(0);
  }
  var seats  = seatsNum[selPeople];
  if (seats) {
      var i;

      //이전에 좌석번호를 나타낸 적이 있을 경우 이전에 나타냈던 좌석번호들을 지운다.
      //이 작업을 거치지 않으면 인원수를 누를 때마나 다르게 나타나는 좌석번호들이
      //계속 쌓여서 나타남.
      if(seatNum>0){
        for(var j = 0; j < seatNum;j++){
          $(".want-seat"+prevSeat[j]).remove();
        }
      }

      for (i = 0; i < seats.length; i++) {
          var seat = new Option(seats[i], seats[i]);
          seatsList.options.add(seat);
          $('div.select-styled-seat').text($(".selSeats").children('option').eq(0).text());

          $('<li />', {
              text: $(".selSeats").children('option').eq(i).text(),
              rel: $(".selSeats").children('option').eq(i).val(),
              'class' : 'want-seat'+seats[i]
          }).appendTo(".seat-list");
      }
      $list = $(".seat-list");
      $listItems = $list.children('li');
      styleSelclick($list,$listItems)
  }

  //좌석 선택란을 보여준다.
  $(".seat-select").show();

  //이전에 나타났던 좌석번호를 제거하고 새로 누른 좌석번호를 나타내기 위해서
  //prevSeat에 현재 누른 좌석번호와 배열의 길이를 저장한다
  prevSeat = seats;
  seatNum = prevSeat.length;

}); //on

function styleSelclick($list,$listItems) {
  $styledSelect.off("click"); //중복 클릭 방지
  $styledSelect.on("click",function(e) {

   if($('.select-options').is(':visible')) {
      e.stopPropagation(); //이벤트 전파 막음
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel')); //18번쨰 줄

      $list.hide();

   } else {
      e.stopPropagation();
      $('div.select-styled.active').each(function(){
          $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
   }//end if
  });

  $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
  });
  $(document).off("click"); //중복 클릭 방지
  $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
  });
}

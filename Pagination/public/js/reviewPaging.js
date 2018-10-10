function pager(maxPage, currentPage) {
  var element = document.getElementsByClassName("inputPagination");
  //startPageNum은 1,6,11로 페이지네이션의 시작하는 페이지 번호를 의미한다.
  let startPageNum = (Math.ceil(currentPage / 5) - 1) * 5 + 1;
  let endPageNum = startPageNum + 4;
  let addPageNum = 0;
  let targetPage;

  var pagerHTML = '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">';

  //표현할 수 있는 페이지 수(maxPage)보다 endPageNum 값이 더 클 때 endPageNum과 maxPage값을 같게 한다.
  if(endPageNum > maxPage ) {
    endPageNum = maxPage;
  }

  //startPageNum이 1 이상 즉,6이면 이전 페이지로 돌아갈 수 있는 버튼이 생성된다.
  if(startPageNum > 1) {
    targetPage = startPageNum;
    //시작 페이지에서 바로 그 앞의 번호 페이지로 가는 버튼
    //예를 들면 6페이지에서 5페이지로 이동
    pagerHTML += '<li class="page-item"><a class="page-link" href="/?page=1" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    //가장 첫페이지로 이동하는 버튼
    pagerHTML += '<li class="page-item"><a class="page-link" href="/?page=' +(targetPage-1)+
    '" aria-label="Previous"><span style="font-size:7pt;" aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li>';
  }

  //현재 선택한 페이지를 표시하기 위한 소스코드
  for(var i = startPageNum; i <= endPageNum; i++) {
    pagerHTML += '<li class="page-item '+(currentPage == i ? 'active' : '')+'"><a class="page-link" href="/?page='+ i +'">'+i+'</a></li>';
  }

  //ex) 1~5페이지 다음에 6로 넘어가기 위한 소스코드
  if(maxPage > endPageNum) {
    //ex)5페이지 다음 6페이지로 넘어가기 위한 버튼
    targetPage = endPageNum + 1;
    pagerHTML += '<li class="page-item"><a class="page-link" href="/?page='+targetPage+'" aria-label="Next"><span style="font-size:7pt;" aria-hidden="true">&gt;</span></a></li>';
    //제일 끝 페이지로 가는 버튼
    pagerHTML += '<li class="page-item"><a class="page-link" href="/?page='+maxPage+'" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li></ul></nav>'
  }


  element[0].innerHTML = pagerHTML;
}

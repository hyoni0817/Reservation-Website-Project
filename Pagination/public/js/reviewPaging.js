function pager(maxPage, currentPage) {
  var element = document.getElementsByClassName("inputPagination");
  let startPageNum = (Math.ceil(currentPage / 5) - 1) * 5 + 1;
  let endPageNum = startPageNum + 4;
  let addPageNum = 0;
  let targetPage;

  var pagerHTML = '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center"><li class="page-item">';

  if(endPageNum > maxPage ) {
    endPageNum = maxPage;
  }

  if(startPageNum > 1) {
    targetPage = startPageNum;
    pagerHTML += '<a class="page-link" href="/?page=1" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    pagerHTML += '<li class="page-item"><a href="/?page=' +(targetPage-1)+
    '" aria-label="Previous"><span style="font-size:7pt;" aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li>';
  }

  for(var i = startPageNum; i <= endPageNum; i++) {
    pagerHTML += '<li class="page-item '+(currentPage == i ? 'active' : '')+'"><a class="page-link" href="/?page='+ i +'">'+i+'</a></li>';
  }

  if(maxPage > endPageNum) {
      targetPage = endPageNum + 1;
    pagerHTML += '<li class="page-item"><a href="/?page='+targetPage+'" aria-label="Next"><span style="font-size:7pt;" aria-hidden="true">&gt;</span></a></li>';
    pagerHTML += '<li class="page-item"><a class="page-link" href="/?page='+maxPage+'" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li></ul></nav>'
  }


  element[0].innerHTML = pagerHTML;
}

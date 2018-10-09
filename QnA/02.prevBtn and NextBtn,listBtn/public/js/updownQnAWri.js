function pager(page, prevPage, nextPage, prevTitle, nextTitle) {
  var element = document.getElementsByClassName("updownWri");

  var pagerHTML = '<table class="table table-bordered" style="text-align:left">';

  if(prevPage === 0) {
    //나타낼 이전글이 없을 때
  }
  else {
    pagerHTML += '<tr><th>';
    pagerHTML += '<i class="fas fa-angle-up"></i> 이전글 <a href="/qnaView?page=' +page+'&wriNo='+prevPage+'">'+prevTitle+'</a>';
    pagerHTML += '</th></tr>';
  }

  if(nextPage === 0) {
    //나타낼 다음글이 없을 때
  }
  else {
    pagerHTML += '<tr><th>';
    pagerHTML += '<i class="fas fa-angle-down"></i> 다음글 <a href="/qnaView?page=' +page+'&wriNo='+nextPage+'">'+nextTitle+'</a>';
    pagerHTML += '</th></tr>';
  }
  pagerHTML += '</table>';
  element[0].innerHTML = pagerHTML;
}

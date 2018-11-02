//최신순, 좋아요순, 별점순 정렬 버튼 나타내기 위한 소스 코드
function arrSelect(arr) {
  var element = document.getElementsByClassName("arr-select");

  var navHTML = '<a style="text-decoration:none" href="/?arr=newest&page=1">';
  navHTML += (arr == 'newest' ? '<img src="img/selected.png" style="width:24px;height:auto;"></img>':'<img src="img/preselect.png" style="width:24px;height:auto;"></img>')
  navHTML += (arr == 'newest' ? '<span style="color:rgb(255,39,35);font-weight: bold;">최근 방문순</span>':'<span style="color:black;">최근 방문순</span>') + '</a>'
  navHTML += '<a style="text-decoration:none" href="/?arr=like&page=1">'
  navHTML += (arr == 'like' ? '<img src="img/selected.png" style="width:24px;height:auto;"></img>':'<img src="img/preselect.png" style="width:24px;height:auto;"></img>')
  navHTML += (arr == 'like' ? '<span style="color:rgb(255,39,35);font-weight: bold;">호감순</span>':'<span style="color:black;">호감순</span>') + '</a>'
  navHTML += '<a style="text-decoration:none" href="/?arr=score&page=1">'
  navHTML += (arr == 'score' ? '<img src="img/selected.png" style="width:24px;height:auto;"></img>':'<img src="img/preselect.png" style="width:24px;height:auto;"></img>')
  navHTML += (arr == 'score' ? '<span style="color:rgb(255,39,35);font-weight: bold;">별점순</span>':'<span style="color:black;">별점순</span>') + '</a>'

  element[0].innerHTML = navHTML;
}

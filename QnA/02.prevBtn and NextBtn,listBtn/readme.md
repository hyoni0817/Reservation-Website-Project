>DB가 연동되어 있으므로 QnA 폴더 내의 qnaSQL을 통해 테이블 생성 및 데이터 삽입 후 app.js 파일을 실행시켜주세요.
## 02.prevBtn and NextBtn,listBtn 에서 구현한 것
1. app.js를 실행하고 난 뒤에 아래의 URL을 통해서 글 목록과 작성글 보기를 할 수 있습니다,
- 글 목록보기 : http://localhost:3000/qna
- 글 보기 : http://localhost:3000/qnaView?page=1&wriNo=6&auth=queWri
2. 작성글 내에서 목록 버튼을 누르면 현재 보고있는 글이 위치한 목록의 페이지을 볼 수 있습니다.
![Alt Text](https://devdata2018.s3.ap-northeast-2.amazonaws.com/markdown/qna02/list2.jpg)
3. 작성글 내에서 이전글, 다음글 보기를 할 수 있습니다. 
<p align="center"><img src="https://devdata2018.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewAll4.png" height="auto" width="800"></p>

4. 가장 마지막글과 가장 처음글은 이전글 보기와 다음글 보기 각각 하나씩만 나타납니다.
<p align="center">
<img src="https://devdata2018.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewPrev4.png" height="auto" width="800">
<img src="https://devdata2018.s3.ap-northeast-2.amazonaws.com/markdown/qna02/viewNext4.png" height="auto" width="800">
</p>

* output : https://moon-sangho.github.io/Minesweeper/

* 1st commit
  게임판 생성하는 코드 작성

* 2nd commit
  지뢰의 위치를 랜덤으로 20개 뽑은 뒤 해당 위치에 지뢰를 심는 코드 작성

* 3rd commit
  우클릭 했을 때 깃발(!로 표현) 꼽는 기능 추가하고 화면과 dataset 일치시킴,
  스코프 문제 때문에 상수 tbody, dataset 최상단으로 이동시킴.

* 4th commit
  실행버튼 재클릭시 테이블 초기화
  테이블 우클릭시 각 칸의 text content가 !, ?, ''로 바뀌도록 설정,

* 5th commit
  테이블 좌클릭 시 지뢰 표시 및 주변 지뢰 개수 표시하도록 설정

* 6th commit
  테이블 css 추가, 
  테이블 좌클릭 시 칸 흰색으로 바꾸도록 설정,
  테이블 좌클릭 시 지뢰 개수가 0일 경우, 0 주변칸 동시 오픈되도록 설정

* 7th commit
  재귀 코드 효율 개선(이미 열렸던 칸이 중복으로 열려 반응속도가 느려졌던 현상 개선)
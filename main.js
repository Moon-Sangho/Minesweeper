const tbody = document.querySelector('#table tbody');
let dataset = [];

document.querySelector('#exec').addEventListener('click', function() {
    tbody.innerHTML = ''; // 실행 버튼 클릭 시 지뢰 테이블 초기화
    dataset = []; // 실행 버튼 클릭 시 dataset 초기화
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);

    // 지뢰 위치 뽑기
    let candidate = Array(hor * ver).fill().map(function(element, index) {
        return index;
    });
    
    let shuffle = [];
    while (candidate.length > 80) {
        let value = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(value);
    }
    console.log(shuffle); // 피셔예이츠 셔플

    // 지뢰 테이블 만들기
    for (let i = 0; i < ver; i++) {
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(0);
            const td = document.createElement('td');
            // 테이블 우클릭 시 !, ?, '' 변환
            td.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const indexTd = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const indexTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                } else if (e.currentTarget.textContent === '?') {
                    if (dataset[indexTr][indexTd] === 1) {
                        e.currentTarget.textContent = '';
                    } else if (dataset[indexTr][indexTd] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            // 테이블 좌클릭 시 지뢰 표시, 주변 지뢰 개수 표시, 칸 흰색으로 바꾸기,
            // 좌클릭 시 지뢰 개수가 0일 경우, 0 주변칸 동시 오픈
            td.addEventListener('click', function(e) {
                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const indexTd = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const indexTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                
                e.currentTarget.classList.add('opened');
                if (dataset[indexTr][indexTd] === 'X') {
                    e.currentTarget.textContent = '💣';

                // 주변 지뢰 개수 표시    
                } else {
                    let near = [
                        dataset[indexTr][indexTd-1], dataset[indexTr][indexTd+1]    
                    ];

                    if (dataset[indexTr-1]) {
                        near = near.concat(dataset[indexTr-1][indexTd-1], dataset[indexTr-1][indexTd], dataset[indexTr-1][indexTd+1]);
                    }

                    if (dataset[indexTr+1]) {
                        near = near.concat(dataset[indexTr+1][indexTd-1], dataset[indexTr+1][indexTd], dataset[indexTr+1][indexTd+1]);
                    }

                    let nearBombNumber = near.filter(function(v) {
                        return v === 'X';
                    }).length;
                    e.currentTarget.textContent = nearBombNumber;

                    //주변 8칸 동시 오픈(재귀 함수)
                    if (nearBombNumber === 0) {
                        let nearTd = [];

                        if (tbody.children[indexTr - 1]) {
                            nearTd = nearTd.concat([
                                tbody.children[indexTr - 1].children[indexTd - 1],
                                tbody.children[indexTr - 1].children[indexTd],
                                tbody.children[indexTr - 1].children[indexTd + 1]
                            ]);
                        }

                        nearTd = nearTd.concat([
                            tbody.children[indexTr].children[indexTd - 1],
                            tbody.children[indexTr].children[indexTd + 1]
                        ]);

                        if (tbody.children[indexTr + 1]) {
                            nearTd = nearTd.concat([
                                tbody.children[indexTr + 1].children[indexTd - 1],
                                tbody.children[indexTr + 1].children[indexTd],
                                tbody.children[indexTr + 1].children[indexTd + 1]
                            ]);
                        }
                        
                        dataset[indexTr][indexTd] = 1;
                        nearTd.filter(function(v) {
                            return !!v;
                        }).forEach(function(nextTd) {
                            const parentTr = nextTd.parentNode;
                            const parentTbody = nextTd.parentNode.parentNode;
                            const nextTdTd = Array.prototype.indexOf.call(parentTr.children, nextTd);
                            const nextTdTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if (dataset[nextTdTr][nextTdTd] !== 1) {
                                nextTd.click();
                            }
                        });
                    }
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) { // ex 49
        const col = Math.floor(shuffle[k] / 10); // ex 4
        const row = shuffle[k] % 10; // ex 9
        tbody.children[col].children[row].textContent = 'X'; // ex 화면상 4행 9열에 'X' 표시
        dataset[col][row] = 'X';
    }

    console.log(dataset);
});
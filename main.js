const tbody = document.querySelector('#table tbody');
const dataset = [];

document.querySelector('#exec').addEventListener('click', function() {
    tbody.innerHTML = ''; // 실행 버튼 클릭 시 지뢰 테이블 초기화
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
            arr.push(1);
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
            // 테이블 좌클릭 시 지뢰 표시 및 주변 지뢰 개수 표시
            td.addEventListener('click', function(e) {
                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const indexTd = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const indexTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if (dataset[indexTr][indexTd] === 'X') {
                    e.currentTarget.textContent = '💣';
                } else {
                    const near = [
                        dataset[indexTr][indexTd-1], dataset[indexTr][indexTd+1]    
                    ];
                    if (dataset[indexTr-1]) {
                        near = near.concat(dataset[indexTr-1][indexTd-1], dataset[indexTr-1][indexTd], dataset[indexTr-1][indexTd+1]);
                    } 
                    if (dataset[indexTr+1]) {
                        near = near.concat(dataset[indexTr+1][indexTd-1], dataset[indexTr+1][indexTd], dataset[indexTr+1][indexTd+1]);
                    }
                    e.currentTarget.textContent = near.filter(function(v) {
                        return v === 'X';
                    }).length;
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
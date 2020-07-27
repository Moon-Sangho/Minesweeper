document.querySelector('#exec').addEventListener('click', function() {
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    // 지뢰 위치 뽑기
    let candidate = Array(hor * ver).fill().map(function(element, index) {
        return index;
    });
    console.log(candidate);
    
    let shuffle = [];
    while (candidate.length > 80) {
        let value = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(value);
    }
    console.log(shuffle); // 피셔예이츠 셔플

    // 지뢰 테이블 만들기
    const dataset = [];
    const tbody = document.querySelector('#table tbody');
    for (let i = 0; i < ver; i++) {
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(1);
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);

    // 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) { // ex 49
        const col = Math.floor(shuffle[k] / 10); // ex 4
        const row = shuffle[k] % 10; // ex 9
        console.log(col, row);
        tbody.children[col].children[row].textContent = 'X'; // ex 화면상 4행 9열에 'X' 표시
        dataset[col][row] = 'X';
    }
});
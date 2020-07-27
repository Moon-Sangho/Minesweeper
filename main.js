document.querySelector('#exec').addEventListener('click', function() {
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

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
            td.textContent = 1;
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);
});
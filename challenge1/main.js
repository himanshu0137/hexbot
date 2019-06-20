setInterval(() => {
    colorApi(10).then((colors) => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                document.body.style.backgroundColor = colors[i].value;
            }, (i + 1) * 1000);
        }
    });
}, 10000)

function colorApi(count = 5) {
    return fetch(`https://api.noopschallenge.com/hexbot?count=${count}`)
        .then(function (response) {
            return response.json().colors;
        });
}

function randomNumberGenerator(max, min = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

const width = randomNumberGenerator(30, 10);
const height = randomNumberGenerator(20, 5);
const containerElement = document.getElementById('container');

colorApi({
    width: width,
    height: height,
    count: width * height
}).then((colors) => {
    while (containerElement.hasChildNodes()) {
        containerElement.removeChild(containerElement.firstChild);
    }
    containerElement.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    containerElement.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    const elements = [];
    for (let i = 0; i < width * height; i++) {
        const divElement = document.createElement('div');
        divElement.classList.add('cell');
        elements.push(divElement);
        containerElement.appendChild(divElement);
    }
    const unassignedColors = [];
    colors.forEach((color) => {
        const place = width * color.coordinates.y + color.coordinates.x;
        if (!elements[place].style.backgroundColor) {
            elements[place].style.backgroundColor = color.value;
        } else {
            unassignedColors.push(color);
        }
    });
    elements.forEach((e) => {
        if (!e.style.backgroundColor) {
            let colorIndex = randomNumberGenerator(unassignedColors.length - 1);
            e.style.backgroundColor = unassignedColors.splice(colorIndex, 1)[0].value;
        }
    });
});

function colorApi(options = {
    width: null,
    height: null,
    count: null,
    seed: null
}) {
    let baseURL = 'https://api.noopschallenge.com/hexbot';
    const optionKeys = Object.getOwnPropertyNames(options).filter(v => !!options[v]);
    if (optionKeys.length > 0) {
        baseURL += '?';
    }
    optionKeys.forEach((key, index) => {
        baseURL += (key + '=' + options[key]);
        if (index < optionKeys.length - 1) {
            baseURL += '&';
        }
    });
    return fetch(baseURL)
        .then(function (response) {
            return response.json().then(r => r.colors);
        });
}

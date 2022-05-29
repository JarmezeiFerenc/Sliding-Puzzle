function main() {
    createTable();
    addEvents();
    restart();
}

function createTable() {
    const mainContainer = document.getElementById("main-container");
    const images = createImagesList();
    let indexCounter = 0;
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 4; j++) {
            let col = document.createElement("div");
            col.classList.add("col-md-auto");
            col.classList.add("col");
            col.setAttribute("id", `coordinate-${i}-${j}`);

            if (indexCounter === images.length - 1) {
                col.classList.add("empty");
            }

            col.innerHTML = `<img src=${images[indexCounter]} alt="">`;
            col.style.padding = "0 0 0 0"
            row.appendChild(col);
            indexCounter++;
        }
        mainContainer.appendChild(row);
    }
}

function createImagesList() {
    let images = [];
    for (let i = 1; i < 17; i++) {
        images.push("Pic/img(" + i + ").png");
    }
    images.pop();
    images = images.sort(() => Math.random() - 0.5);
    images.push("Pic/nothing.jpg");
    return images;
}

let startTimer = false;

function addEvents() {
    const elements = document.querySelectorAll(".col");
    for (let element of elements) {
        element.addEventListener("click", () => {
            const coordinates = getCoordinates(element.id);
            move(coordinates, element, elements);
            if (startTimer === false) {
                timer();
                startTimer = true;
            }
        })
    }
}

function getCoordinates(element) {
    const split = element.split("-");
    const row = split[1];
    const col = split[2];
    return [row, col];
}

function move(coordinates, actualElement, elements) {
    const directions = getDirection(coordinates);
    for (let element of directions) {
        if (element != null) {
            if (element.classList.contains("empty")) {
                switchContent(element, actualElement);
                clickCounter();
                checkTable(elements);
            }
        }
    }
}

function getDirection(coordinates) {
    const row = parseInt(coordinates[0]);
    const col = parseInt(coordinates[1]);

    const aboveElement = document.getElementById(`coordinate-${row - 1}-${col}`);
    const underElement = document.getElementById(`coordinate-${row + 1}-${col}`);
    const rightElement = document.getElementById(`coordinate-${row}-${col - 1}`);
    const leftElement = document.getElementById(`coordinate-${row}-${col + 1}`);
    return [aboveElement, underElement, rightElement, leftElement];
}

function switchContent(element, actualElement) {
    const actualElementContent = actualElement.innerHTML;
    actualElement.innerHTML = element.innerHTML;
    element.innerHTML = actualElementContent;
    actualElement.classList.add("empty");
    element.classList.remove("empty");
}

function checkTable(elements) {
    let counter = 1;
    for (let element of elements) {
        const currentPicture = `<img src="Pic/img(${counter}).png" alt="">`;
        if (element.innerHTML !== currentPicture) {
            break;
        } else {
            counter++;
        }
    }
    if (counter === 17) {
        console.log("You won!");
    }
}

//this is not my timer
function timer() {
    const minutesLabel = document.getElementById("minutes");
    const secondsLabel = document.getElementById("seconds");
    let totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        let valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}

function restart() {
    const button = document.getElementById("restart");
    button.addEventListener("click", () => {
        location.reload();
    })
}

let numberOfClicks = 0;

function clickCounter() {
    numberOfClicks++;
    const clickDisplay = document.getElementById("clickDisplay")
    clickDisplay.innerHTML = "" + numberOfClicks;
}

main()

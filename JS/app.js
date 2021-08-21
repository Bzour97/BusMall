'use strict';

let attemptsE1 = document.getElementById('attempts');
let container = document.getElementById('image-container')

let imgOne = document.getElementById('firstImg')
let imgTwo = document.getElementById('secondImg')
let imgThree = document.getElementById('thirdImg')

let result = document.getElementById('results');

let Img = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let showImg = [];
let voteImg = [];
let viewImg = [];
let product = [];
let busImg = [];

for (let i = 0; i < Img.length; i++) {
    new ImgProduct(Img[i])
}


// for save in local storage
function forSaveLocalStorage()
{
    let data1 = JSON.stringify(product);
    localStorage.setItem('product',data1);
}


function forReadLocalStorage()
{
    let stringObj = localStorage.getItem('product');
    // let stringObj2 = localStorage.getItem('Views');
    
    let normalObj = JSON.parse(stringObj);
    // let normalObj2 = JSON.parse(stringObj2);

    if(normalObj)
    {  
        product = normalObj;
    }
}
// read storage
forReadLocalStorage();

function ImgProduct(productName) {
    this.pName = productName.split('.')[0];
    this.imgPath = `Img/${productName}`;
    this.Votes = 0;
    this.Views = 0;
    product.push(this);
    busImg.push(this.pName);

}


function randImg() {
    return Math.floor(Math.random() * Img.length)
}

let indexOne;
let indexTwo;
let indexThree;

function rendImg() {
    indexOne = randImg();
    indexTwo = randImg();
    indexThree = randImg();

    while (indexOne === indexTwo || indexTwo == indexThree || indexOne === indexThree || showImg.includes(indexOne) || showImg.includes(indexTwo) || showImg.includes(indexThree)) {
        indexOne = randImg();
        indexTwo = randImg();
        indexThree = randImg();
    }
    imgOne.setAttribute('src', product[indexOne].imgPath);
    imgTwo.setAttribute('src', product[indexTwo].imgPath);
    imgThree.setAttribute('src', product[indexThree].imgPath);
    product[indexOne].Views++;
    product[indexTwo].Views++;
    product[indexThree].Views++;
    showImg[0]=indexOne;
    showImg[1]=indexTwo;
    showImg[2]=indexThree;
}

rendImg();

imgOne.addEventListener('click', clickHandle);
imgTwo.addEventListener('click', clickHandle)
imgThree.addEventListener('click', clickHandle);

function clickHandle(event) 
{
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'firstImg') {
            product[indexOne].Votes++;
        } else if (clickedImage === 'secondImg') {
            product[indexTwo].Votes++
        } else if (clickedImage === 'thirdImg') {
            product[indexThree].Votes++
        }
        rendImg();
        attempt++;
        attemptsE1.textContent = `attemps : ${attempt}`
    }
    else
    {
    
    imgOne.removeEventListener('click', clickHandle)
    imgTwo.removeEventListener('click', clickHandle)
    imgThree.removeEventListener('click', clickHandle)
    }

}

let btnEl = document.getElementById('btn');
btnEl.addEventListener('click', showResult)

function showResult(event) 
{
    let liEl;
    
        for (let i = 0; i < product.length; i++) 
    {
        liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
        voteImg.push(product[i].Votes);
        viewImg.push(product[i].Views);
    }
    btnEl.removeEventListener('click', showResult)
    forSaveLocalStorage();
    chartRender()
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busImg,
            datasets: [{
                label: '# of Votes',
                data: voteImg,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: viewImg,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
}
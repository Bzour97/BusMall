'use strict';

let attemptsE1 = document.getElementById('attempts');
let container = document.getElementById('image-container')

let imgOne = document.getElementById('imgOne')
let imgTwo = document.getElementById('imgTwo')
let imgThree = document.getElementById('imgThree')

let result = document.getElementById('results');

let imgOfproduct = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let showImg = [];
let voteImage = [];
let viewImage = [];
let product = [];
let busNameImage = [];

for (let i = 0; i < imgOfproduct.length; i++) {
    new ImagesOfProduct(imgOfproduct[i])
}

function localStorageSave()
{
    let dataA = JSON.stringify(product);
    localStorage.setItem('product',dataA);
}

function localStorageRead()
{
    let objString = localStorage.getItem('product');
    
    let objNormal = JSON.parse(objString);

    if(objNormal)
    {  
        product = objNormal;
    }

}

localStorageRead();

function ImagesOfProduct(productName) {
    this.pName = productName.split('.')[0];
    this.imgPath = `Img/${productName}`;
    this.Votes = 0;
    this.Views = 0;
    product.push(this);
    busNameImage.push(this.pName);

}

function randImage() {
    return Math.floor(Math.random() * imgOfproduct.length)
}

let indexOne;
let indexTwo;
let indexThree;

function render() {
    indexOne = randImage();
    indexTwo = randImage();
    indexThree = randImage();

    while (indexOne === indexTwo || indexTwo == indexThree || indexOne === indexThree || showImg.includes(indexOne) || showImg.includes(indexTwo) || showImg.includes(indexThree)) {
        indexOne = randImage();
        indexTwo = randImage();
        indexThree = randImage();
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
render();

imgOne.addEventListener('click', clickHandle);
imgTwo.addEventListener('click', clickHandle)
imgThree.addEventListener('click', clickHandle);

function clickHandle(event) 
{
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'imgOne') {
            product[indexOne].Votes++;
        } else if (clickedImage === 'imgTwo') {
            product[indexTwo].Votes++
        } else if (clickedImage === 'imgThree') {
            product[indexThree].Votes++
        }
        render();
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
btnEl.addEventListener('click', displayResult)

function displayResult(event) 
{
    let liEl;
    
        for (let i = 0; i < product.length; i++) 
    {
        liEl = document.createElement('li');
        result.appendChild(liEl);

        liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
        voteImage.push(product[i].Votes);
        viewImage.push(product[i].Views);

        liEl.textContent = `${productArr[i].productImageName} has ${productArr[i].votes} votes and  ${productArr[i].views} views.`;

    }
    btnEl.removeEventListener('click', displayResult)
    localStorageSave();
    chartRender()
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busNameImage,
            datasets: [{
                label: '# of Votes',
                data: voteImage,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: viewImage,
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
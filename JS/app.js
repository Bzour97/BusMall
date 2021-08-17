"use strict";

let attemptEl = document.getElementById('attempts');

let container = document.getElementById('image-container');

let imgOne = document.getElementById('imgOne');

let imgTwo = document.getElementById('imgTwo');

let imgThree = document.getElementById('imgThree');

let result = document.getElementById('results');



let product = ['bag.jpg', 'banana.jpg', 'breakfast.jpg', 'bathroom.jpg', 'boots.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg ', 'unicorn.jpg', 'water-can.jpg ', 'wine-glass.jpg'];



let attempt = 1;

let maxAttempt = 25;

let productArr = [];



function ImagesOfProduct(productImageName) {

    this.productImageName = productImageName.split('.')[0];

    this.ImagesOfProduct = `Images/${productImageName}`;

    this.votes = 0;

    this.views = 0;

    productArr.push(this);

}

for (let i = 0; i < product.length; i++) {

    new ImagesOfProduct(product[i]);

}


function imgProductByRand() {

    return Math.floor(Math.random() * productArr.length);

}



let imgOneIndex;

let imgTwoIndex;

let imgThreeIndex;



function imgProductRender() {

    imgOneIndex = imgProductByRand();

    imgTwoIndex = imgProductByRand();

    imgThreeIndex = imgProductByRand();



    while (imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgThreeIndex === imgOneIndex) {

        imgOneIndex = imgProductByRand();

        imgThreeIndex = imgProductByRand();

    }



    imgOne.setAttribute('src', productArr[imgOneIndex].ImagesOfProduct)

    imgTwo.setAttribute('src', productArr[imgTwoIndex].ImagesOfProduct);

    imgThree.setAttribute('src', productArr[imgThreeIndex].ImagesOfProduct);



    productArr[imgOneIndex].views++;

    productArr[imgTwoIndex].views++;

    productArr[imgThreeIndex].views++;

}
imgProductRender();

imgOne.addEventListener('click', clickHandler);

imgTwo.addEventListener('click', clickHandler);

imgThree.addEventListener('click', clickHandler);



function clickHandler(event) {

    if (attempt <= maxAttempt) {



        let imgProductClicked = event.target.id;

        if (imgProductClicked === 'imgOne') {

            productArr[imgOneIndex].votes++;

        }



        else if (imgProductClicked === 'imgTwo') {

            productArr[imgTwoIndex].votes++

        }



        else if (imgProductClicked === 'imgThree') {

            productArr[imgThreeIndex].votes++

        }



        imgProductRender();

        attempt++;



    }

}



let ourButton = document.getElementById('button');

ourButton.addEventListener('click', displayScore);



function displayScore() {

    for (let i = 0; i < productArr.length; i++) {

        let liEl = document.createElement('li');

        result.appendChild(liEl);

        liEl.textContent = `${productArr[i].productImageName} has ${productArr[i].votes} votes and  ${productArr[i].views} views.`;



    }

}
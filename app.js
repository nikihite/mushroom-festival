// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Tyrone',
        satisfaction: 2,
    },
    {
        name: 'Austin',
        satisfaction: 3,
    },
    {
        name: 'Tasha',
        satisfaction: 1,
    },
    {
        name: 'Niki',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found one🍄🍄🍄!!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!😟');
    }
});



addFriendButton.addEventListener('click', () => {
    // get the name from the input
    let friendName = friendInputEl.value;

    if (friendName === '') {
        friendName = `Friend ${Math.ceil(Math.random() * 100)}`;
    }
    // create a new friend object
    const newFriend = { name: friendName, satisfaction: 1 };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.textContent = '';
    // display all the friends (use a function here)
    displayFriends();
    console.log(friendData);
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendElList = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        friendElList.addEventListener('click', () => {
            if (mushroomCount === 0) {
                alert('You are all out of mushrooms, go find more!!');
            } else if (mushroomCount > 0 && friend.satisfaction < 3) {
                friend.satisfaction++;
                mushroomCount--;

                displayFriends();
                displayMushrooms();
            }
        });
        friendsEl.append(friendElList);
        // append the friendEl to the friends list in DOM
    }}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        const mushroom = renderMushroom(i);
        mushroomsEl.append(mushroom);
        // for each mushroom in your mushroom state, render and append a mushroom
    }
}

displayFriends();
displayMushrooms();

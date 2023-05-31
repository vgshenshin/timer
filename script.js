"use strict";

let countdown;
const timerDisplay = document.querySelector('.timer_display-left');
const timerDisplayEnd = document.querySelector('.timer_display-end');
const buttons = document.querySelectorAll('.timer__button');


function timer(seconds) {
	
	clearInterval(countdown);

	const currentTime = Date.now();
	const endTime = currentTime + seconds * 1000;

	setDisplayTimer(seconds);
	setDisplayEndTime(endTime);

	countdown = setInterval(() => {

	    const secondsLeft = Math.round((endTime - Date.now()) / 1000);

		if(secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}

		setDisplayTimer(secondsLeft);

	}, 1000);
}


function setDisplayTimer(seconds) {
	
	let minutes = Math.floor(seconds / 60);
	let remainderSeconds = Math.floor(seconds % 60 )

	minutes < 10 ? minutes = `0${minutes}` : '';
	remainderSeconds < 10 ? remainderSeconds = `0${remainderSeconds}` : '';

	const display = `${minutes}:${remainderSeconds}`;

	timerDisplay.textContent = display;
	document.title = display;
}

function setDisplayEndTime(endTime) {

	const displayEndTime = new Date(endTime);
	let hours = displayEndTime.getHours();
	let minutes = displayEndTime.getMinutes();

	hours < 10 ? hours = `0${hours}` : '';
	minutes < 10 ? minutes = `0${minutes}` : '';

	timerDisplayEnd.textContent = `Вернуться в  ${hours}:${minutes}`;
}


function setTime() {
	const time = this.dataset.time;
	countdown ? confirm('Сбросить таймер?') ? timer(time) : null : timer(time);
}

buttons.forEach(btn => btn.addEventListener('click', setTime));

document.timerForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const time = this.minutes.value * 60;
	countdown ? confirm('Сбросить таймер?') ? timer(time) : null : timer(time);
	
	this.reset();
});
import AOS from 'aos';
import 'aos/dist/aos.css'; 

document.addEventListener('DOMContentLoaded', function() {
	AOS.init({
		once: true
	});
})


var bmiCalculator, uiController, controller;

// Calculates BMI
bmiCalculator = function() {

	// var formula, result;

	// formula = weight / (height/100*height/100);

	// result = Math.round(formula * 100) / 100;

	return {
		calculation: function(weight, height) {
			var formula = weight / (height/100*height/100);
			var result = Math.round(formula * 100) / 100;;
			return result;	
		}
	}

}();

uiController = function() {

	var domItems = {
		height: '#height',
		weight: '#weight',
		age: '#age',
		handler: '#calculate',
		message: '#message'
	};

	return {
		domItems: function () {
			return domItems;
		}
	}

}();


controller = function(formula, uiController) {
	
	var eventListener = function () {
		var DOM = uiController.domItems();

		document.querySelector(DOM.handler).addEventListener('click', function() {
			var height, weight, message;
			height = document.querySelector(DOM.height).value;
			weight = document.querySelector(DOM.weight).value;
			message = document.querySelector(DOM.message);

			message.classList.remove();


			if(height  == '' || weight == '') {
				message.innerHTML = 'Please enter weight and height';
				message.style.display = 'block';
			} else {
				var result = formula.calculation(weight, height);
				document.querySelector(DOM.message).innerHTML = result;
				document.querySelector(DOM.message).style.display = 'block';
			}

			if(result <= 18) {
				message.classList.add('underweight');
			} else if(result > 18 && result < 24) {
				message.classList.add('healthy');
			} else if(result > 24 && result < 29) {
				message.classList.add('overweight');
			}

			
		});
	}

	return {
		init: function() {
			eventListener();
		}
	}
}(bmiCalculator, uiController);

controller.init();


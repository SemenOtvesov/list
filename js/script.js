
const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

if(isMobile.any()){
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if(menuArrows.length > 0){
		for (let index = 0; index < menuArrows.length; index++) {
			const menu__arrow = menuArrows[index];
			menu__arrow.addEventListener('click', function(e){
				menu__arrow.parentElement.classList.toggle('active');
			})
		}
	}
}else{
	document.body.classList.add('_pc');
}

//бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
	iconMenu.addEventListener('click', function(e){
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
		document.body.classList.toggle('lock');
	})
}

//
let ADburger = document.querySelectorAll('.menu__link')
if(window.screen.width <=767 ){
	for(key of ADburger){
		key.classList.remove('button');
	}
}
let coverage = document.querySelectorAll('.work__box');
for(key of coverage){
	key.addEventListener('mouseover',function(event){
	if(event.target.closest('.work__item-coverage')){
		event.target.previousElementSibling.classList.add('active');
		event.target.nextElementSibling.classList.add('active')
	}
	})
	key.addEventListener('mouseout',function(event){
		if(event.target.closest('.work__item-coverage')){
			event.target.previousElementSibling.classList.remove('active');
			event.target.nextElementSibling.classList.remove('active')
		}
	})
};
let sizeBox = document.querySelectorAll('.work__item-text');
let sizeBoxParent = document.querySelectorAll('.work__item');
let width = 0;
let maxWidth = 0;
for(key of sizeBoxParent){
	maxWidth = key.offsetHeight;
}
for(key of sizeBox){
	if(width<key.offsetWidth){
		width=key.offsetWidth
	}
}

if(width>=maxWidth){
	width=maxWidth
}

let scrollWidth = Math.max(
document.body.scrollWidth, document.documentElement.scrollWidth,
document.body.offsetWidth, document.documentElement.offsetWidth,
document.body.clientWidth, document.documentElement.clientWidth
);
let heightBox = 0;
for(key of sizeBox){
	key.style.height=width + 'px';
	key.style.width=width + 'px';
	if(scrollWidth<768){
		key.style.width='100%';
		key.style.height = 'fit-content';
	}
}
if(scrollWidth<768){
	for(key of sizeBox){
	if(heightBox<key.offsetHeight){
		heightBox=key.offsetHeight;
	}
	}
	for(key of sizeBox){
		key.style.height = heightBox + 'px';
	}
}


//==============================================================================================================================
const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 1;

			let animItemPoint = window.innerHeight - animItemHeight/animStart;
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight/animStart;
			}

			if((window.scrollY > animItemOffset - animItemPoint)&& window.scrollY < (animItemOffset + animItemHeight)){
				animItem.classList.add('active');
			}else{
				if(!animItem.classList.contains('anim-no-hide')){
					animItem.classList.remove('active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.scrollX || document.documentElement.scrollLeft,
			scrollTop = window.scrollY || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
}
//==================================================================================

//прокрутка

const menuLinks = document.querySelectorAll('.scroll__button[data-goto]');
if(menuLinks.length > 0){
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target.closest("[data-goto]");
		if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

			if(iconMenu.classList.contains('active')){
				iconMenu.classList.remove('active');
				menuBody.classList.remove('active');
				document.body.classList.remove('lock');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			});
			e.preventDefault();
		}
	}
}

//закончилась прокрутка

let lenghtInfo = document.querySelectorAll('.info__box-text');
let lenghtInfoOne = lenghtInfo[0].offsetWidth;
for(key of lenghtInfo){
	key.style.width = lenghtInfoOne + 10 + 'px';
}

let titleWidth = document.querySelector('.aboutMe__title');
let itemWidth = document.querySelectorAll('.aboutMe__midle-item');
let checkTitleWidth = document.querySelector('.aboutMe__midle-box').offsetWidth;
let widthElem = 0;
if(window.screen.width>768){
for(key of itemWidth){
	widthElem = widthElem + key.offsetWidth
}
titleWidth.style.marginLeft= (checkTitleWidth - widthElem)/4 + 'px';
}
//
let contactBox = document.querySelector('.contact');
let list = document.querySelector('.menu__list')
document.addEventListener('click', function(event){
	if(event.target.closest('.contact__button')){
		contactBox.classList.toggle('active');
	}
	else{if(!event.target.closest('.contact')){
		contactBox.classList.remove('active');
	}}
	if(contactBox.matches('[class$="active"]')){document.body.classList.add('lock');}else{document.body.classList.remove('lock');}
})

const observer = new IntersectionObserver((entries)=>{
	entries.forEach((entry)=> {
		if(entry.isIntersecting){
		document.querySelectorAll('.scroll__button').forEach((link)=>{
			if(link.getAttribute('href').replace('#', '')===entry.target.id){
				link.classList.add('active');
			}else{
				if(contactBox.matches('[class$="active"]')){}else{link.classList.remove('active');}
			}
		});
		}
	});
},{
	threshold: 0.3,
});

document.querySelectorAll('.section').forEach(
	(section)=>observer.observe(section),
);
//====================================================
let logoHeight = document.querySelector('.header__logo').offsetHeight;
let logoWidthImg = document.querySelector('.header__logo img').style;
logoWidthImg.width = logoHeight;
logoWidthImg.height = 100 +'%';

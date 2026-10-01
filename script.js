// Mobile Navbar Toggle
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

const iconAssignments = [
	['#navbar > div > div > a:first-child > div:first-child i', 'fa-solid fa-cookie-bite'],
	['#navbar > div > div > div:nth-of-type(2) a i', 'fa-brands fa-whatsapp'],
	['#navbar > div > div > div:nth-of-type(3) a i', 'fa-brands fa-whatsapp'],
	['#menu-icon', 'fa-solid fa-bars'],
	['#mobile-menu > div a i', 'fa-brands fa-whatsapp'],
	['#beranda > div > div > div:first-child > div:nth-of-type(2) > a:first-child i', 'fa-solid fa-utensils'],
	['#beranda > div > div > div:first-child > div:nth-of-type(2) > a:last-child i', 'fa-brands fa-whatsapp'],
	['#beranda > div > div > div:first-child > div:nth-of-type(3) > div:nth-child(1) i', 'fa-solid fa-certificate'],
	['#beranda > div > div > div:first-child > div:nth-of-type(3) > div:nth-child(2) i', 'fa-solid fa-wheat-awn'],
	['#beranda > div > div > div:first-child > div:nth-of-type(3) > div:nth-child(3) i', 'fa-solid fa-motorcycle'],
	['#beranda > div > div > div:last-child > div > div:last-child i', 'fa-solid fa-fire'],
	['#keunggulan > div > div:last-child > div:nth-child(1) i', 'fa-solid fa-droplet'],
	['#keunggulan > div > div:last-child > div:nth-child(2) i', 'fa-solid fa-cheese'],
	['#keunggulan > div > div:last-child > div:nth-child(3) i', 'fa-solid fa-fire'],
	['#keunggulan > div > div:last-child > div:nth-child(4) i', 'fa-solid fa-wallet'],
	['#menu-items-grid > div button i', 'fa-solid fa-plus'],
	['#testimoni > div > div:last-child > div > div i', 'fa-solid fa-star'],
	['#lokasi > div > div > div:first-child > div > div:nth-child(1) > i', 'fa-solid fa-location-dot'],
	['#lokasi > div > div > div:first-child > div > div:nth-child(2) > i', 'fa-solid fa-clock'],
	['#lokasi a[href*="maps.google"] i', 'fa-solid fa-map-location-dot'],
	['#order-form .modal-footer > button[type="submit"] i', 'fa-brands fa-whatsapp'],
	['#mobile-sticky-bar > div:first-child > div:first-child i', 'fa-solid fa-bag-shopping'],
	['#mobile-sticky-bar > a i', 'fa-brands fa-whatsapp'],
	['footer > div > div:first-child > div:first-child > div i', 'fa-solid fa-cookie-bite'],
	['footer > div > div:first-child > div:last-child a:nth-child(1) i', 'fa-brands fa-instagram'],
	['footer > div > div:first-child > div:last-child a:nth-child(2) i', 'fa-brands fa-tiktok'],
	['footer > div > div:first-child > div:last-child a:nth-child(3) i', 'fa-brands fa-whatsapp']
];

iconAssignments.forEach(([selector, classNames]) => {
	document.querySelectorAll(selector).forEach(icon => icon.classList.add(...classNames.split(' ')));
});

mobileMenu.addEventListener('shown.bs.collapse', () => {
	menuIcon.classList.replace('fa-bars', 'fa-xmark');
});

mobileMenu.addEventListener('hidden.bs.collapse', () => {
	menuIcon.classList.replace('fa-xmark', 'fa-bars');
});

document.querySelectorAll('#mobile-menu > a').forEach(link => {
	link.addEventListener('click', () => {
		bootstrap.Collapse.getOrCreateInstance(mobileMenu).hide();
	});
});

// Menu Filter Buttons Interaction
const filterBtns = document.querySelectorAll('#menu-filter-container button');
const menuCards = document.querySelectorAll('#menu-items-grid > div');

filterBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		filterBtns.forEach(filterButton => {
			filterButton.classList.remove('active');
		});

		btn.classList.add('active');

		const filter = btn.getAttribute('data-category');

		menuCards.forEach(card => {
			const categories = card.getAttribute('data-category') || '';
			card.classList.toggle('d-none', filter !== 'all' && !categories.split(/\s+/).includes(filter));
		});
	});
});

// Interactive Order Modal Logic
let currentPrice = 0;
let qty = 1;
const orderModal = document.getElementById('order-modal');

function openOrderModal(itemName, itemPrice) {
	document.getElementById('modal-item-title').innerText = 'Pesan ' + itemName;
	document.getElementById('modal-item-name').value = itemName;
	document.getElementById('modal-item-price').value = itemPrice;
	currentPrice = itemPrice;
	qty = 1;
	document.getElementById('order-qty').innerText = qty;
	document.getElementById('order-extra').selectedIndex = 0;
	document.getElementById('order-notes').value = '';
	document.getElementById('order-name').value = '';

	calculateTotal();
	bootstrap.Modal.getOrCreateInstance(orderModal).show();
}

function closeOrderModal() {
	bootstrap.Modal.getOrCreateInstance(orderModal).hide();
}

function adjustQty(amount) {
	if (qty + amount >= 1) {
		qty += amount;
		document.getElementById('order-qty').innerText = qty;
		calculateTotal();
	}
}

function calculateTotal() {
	const extraSelect = document.getElementById('order-extra');
	let extraPrice = 0;
	if (extraSelect.value.includes('(+3rb)')) {
		extraPrice = 3000;
	}

	const total = (currentPrice + extraPrice) * qty;
	document.getElementById('order-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function handleOrderSubmit(event) {
	event.preventDefault();

	const itemName = document.getElementById('modal-item-name').value;
	const cookLevel = document.getElementById('order-cook').value;
	const extraTopping = document.getElementById('order-extra').value;
	const customerName = document.getElementById('order-name').value;
	const notes = document.getElementById('order-notes').value;
	const totalPrice = document.getElementById('order-total-price').innerText;

	let message = `Halo Kue Pancong Lumer Sagara Cimahi, saya mau pesan:\n\n`;
	message += `👤 *Nama*: ${customerName}\n`;
	message += `📌 *Menu*: ${itemName}\n`;
	message += `🔢 *Jumlah*: ${qty} Porsi\n`;
	message += `🔥 *Kematangan*: ${cookLevel}\n`;
	message += `🧀 *Extra Topping*: ${extraTopping}\n`;
	if (notes.trim() !== '') {
		message += `📝 *Catatan/Alamat*: ${notes}\n`;
	}
	message += `\n💰 *Total Estimasi*: ${totalPrice}\n\nMohon diproses ya, terima kasih!`;

	const encodedMessage = encodeURIComponent(message);
	const waUrl = `https://wa.me/6289527207774?text=${encodedMessage}`;

	window.open(waUrl, '_blank');
	closeOrderModal();
}

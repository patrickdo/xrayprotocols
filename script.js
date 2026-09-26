// ==========================================
// 1. LIST.JS INITIALIZATION
// ==========================================

const options = {
	valueNames: [
		'bodyregionTD',
		'procedureTD',
		'reasonTD'
	],
	page: 2000
};

const protocolList = new List('protocolDIV', options);

// Dynamic search term highlighting
protocolList.on('searchComplete', function (list) {
	const searchInput = document.querySelector('#protocolDIV .search');
	const query = searchInput ? searchInput.value.trim() : '';

	// Clear existing highlights
	document.querySelectorAll('table tbody mark.highlight').forEach(mark => {
		const parent = mark.parentNode;
		parent.replaceChild(document.createTextNode(mark.textContent), mark);
		parent.normalize();
	});

	if (!query) return;

	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regex = new RegExp(`(${escapedQuery})`, 'gi');

	list.matchingItems.forEach(item => {
		const targetCells = item.elm.querySelectorAll('.bodyregionTD, .procedureTD, .reasonTD');
		targetCells.forEach(cell => {
			if (cell.children.length === 0) {
				const originalText = cell.textContent;
				if (regex.test(originalText)) {
					cell.innerHTML = originalText.replace(regex, '<mark class="highlight">$1</mark>');
				}
			}
		});
	});
});

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// Parse CSV text into a 2D array
const CSVtoArray = (data, delimiter = ';', omitFirstRow = false) =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter));

// Bulk-add items into List.js
function addProtocols(csvData) {
	const itemsToAdd = csvData
		.filter(row => row.length >= 3 && row[0].trim() !== '')
		.map(row => ({
			bodyregionTD: row[0].trim(),
			procedureTD:  row[1].trim(),
			reasonTD:     row[2].trim()
		}));

	protocolList.add(itemsToAdd);
}

// ==========================================
// 3. MAIN DATA LOADER & EXECUTION
// ==========================================

async function loadProtocols() {
	try {
		const response = await fetch('xrayprotocols.csv');
		if (!response.ok) {
			throw new Error(`Failed to fetch CSV. Status: ${response.status}`);
		}

		const rawCSVText = await response.text();
		const csvData = CSVtoArray(rawCSVText);

		// Remove the two header rows
		csvData.splice(0, 2);

		// Populate table
		addProtocols(csvData);

		// Remove placeholder "Loading..." row using matching class name
		protocolList.remove('bodyregionTD', '');

	} catch (error) {
		console.error("Error loading X-ray protocol list:", error);
	}
}

// Run the loader
loadProtocols();
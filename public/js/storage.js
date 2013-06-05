function saveItem() {
	try {
		localStorage.setItem('key', 'value');
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('The local store is crowded');
		}
	}
}
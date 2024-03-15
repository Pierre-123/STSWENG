function showMessageLogs(contactId) {
    // Make AJAX request to fetch message logs for the selected contact
    fetch(`/api/messages/${contactId}`)
        .then(response => response.json())
        .then(data => {
            // Update the selectedContactMessages array with the fetched message logs
            selectedContactMessages = data.messages; // Assuming data.messages contains an array of message logs
            // Update the selectedContactName
            selectedContactName = data.contactName; // Assuming data.contactName contains the name of the selected contact
            // Refresh the UI to reflect the changes
            refreshUI();
        })
        .catch(error => {
            console.error('Error fetching message logs:', error);
        });
}

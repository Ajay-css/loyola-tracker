export function formatDate(date) {
    // Handle invalid/null date input
    if (!date) {
        return '';
    }

    try {
        // Convert string date to Date object if needed
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        return dateObj.toLocaleDateString('en-US', {
            month: "short",
            day: 'numeric',
            year: 'numeric',
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}
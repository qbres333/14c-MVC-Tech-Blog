// format dateCreated
module.exports = {
    format_date: (date) => {
        // format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },

    // helper to convert TEXT to string for blogpost.content
    format_content: (content) => {
        return content.toString();
    }
    

}
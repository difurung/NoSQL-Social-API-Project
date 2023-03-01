module.exports = (timestamp) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        ];
    const dateObj = new Date(timestamp);
    const month = months[dateObj.getMonth()];
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    let period = "AM";

    if (hour > 12) {
      hour = hour - 12;
      period = "PM";
    }
    if (hour === 0) {
      hour = 12;
      period = "AM";
    }

    const formattedDate = `${month} ${dayOfMonth}, ${year} - ${hour}:${minute} ${period}`;
    return formattedDate;

}
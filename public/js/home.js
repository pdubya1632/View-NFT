//logout if inactive
var inactivityTiime = function () {
    var time;
    window.onload = resetTimer;
    //DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logoutMeOut() {
        logoutMeOut();
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logoutMeOut, 600000);

    }
};

window.onload = function () {
    inactivityTiime();
};
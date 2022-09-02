setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio+currentDate.getMinutes()) / 60;
    var hoursRatio; 
    var hoursRatio = (minutesRatio+currentDate.getHours()) / 12;
    let hour = currentDate.getHours()

    //to take account of hours greater than 12 and make ratio for hour hand accurate
    if (hour == 0){
        hoursRatio = (12 + minutesRatio)/12;
    } else if (hour > 12) {
        hoursRatio = ((hour - 12)+minutesRatio)/12;
    }

    setRotation (secondHand, secondsRatio);
    setRotation (minuteHand, minutesRatio);
    setRotation (hourHand, hoursRatio);
}

function setRotation (element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function updateDigitalClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if (hou == 0){
                    hou = 12;
                } else if (hou > 12){
                    hou -= 12;
                    pe = "PM";
                }
        
        // to stricly implement only 2 digit values for daynum, hours, minutes, and seconds
        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length < digits; n = 0 + n);
            return n;
        }
        
        var months = ["January", "February", "March", "April", "May", "June", "July", "August","September","October", "November", "December"];
        var week = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
        var ids = ["dayname", "month", "daynum", "year", "hour", "minutes" ,"seconds" ,"period"]
        var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];

        // Loop through lists of ids then assign corresponding values. This will integrate the vaues to the right HTML element
        for (let i = 0; i < ids.length; i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }
}

function initDigitalClock(){
    updateDigitalClock();
    window.setInterval("updateDigitalClock()", 1);

}

setClock()
var sign = "Scorpio";
var birthMonth = "November";
var birthDay = 20;
var luckyNum = 44.0;
var horoscopeDesc = "A water sign, a scorpion, loyal.";
var believeInAstro = true;

var scorpMood1 = 0.4;
var cancMood1 = 0.3;
var scorpMood2 = 0.2;
var scorpAvgMood = (scorpMood1 + scorpMood2)/2.0;
var groupAvgMood = (scorpMood1 + scorpMood2 + cancMood1)/3.0;
var scorpMoodPrint = "Today's mood rating for Scorpio is: "+scorpAvgMood+"\n";
var cancMoodPrint = "Today's mood rating for Scorpio is: "+cancMood1+"\n";
var allMoodPrint = "Today's mood average for Cancer and Scorpio is: "+groupAvgMood+"\n";

var signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
var scorpioSign = signs[10];
var cancerSign = signs[6];
var zodiacMessage = "Curtis and I are both "+scorpioSign+"s. "+" \n  Mathew is a "+cancerSign+".\n";
var messages = [
    "Today is a day for new beginnings. Embrace change and seize opportunities.",
    "Your determination will lead to success today. Stay focused on your goals.",
    "Communication is key today. Express yourself clearly and listen to others.",
    "Trust your intuition. It will guide you in making the right decisions.",
    "Your creativity shines today. Use it to inspire and lead others.",
    "Pay attention to the details. Your meticulous work will pay off.",
    "Balance is essential. Find harmony in all aspects of your life.",
    "Embrace transformation. Let go of what no longer serves you.",
    "Adventure awaits. Explore new horizons and expand your horizons.",
    "Hard work leads to success. Keep pushing toward your goals.",
    "Your unique perspective is an asset. Share your ideas with others.",
    "Trust your emotions. They will guide you in making the right choices.",
]
var matMsg = "Mathew ("+cancerSign+") chose the message: "+ messages[4];
var keeMsg = "Keely ("+scorpioSign+") chose the message: "+ messages[6];
var curtisMsg = "Curtis ("+scorpioSign+") chose the message: "+ messages[5];




document.getElementById("sign").textContent = sign;
document.querySelector("h3.birthday").innerHTML += birthMonth + " " + birthDay;
document.querySelector("h4.luckyNum").innerHTML += luckyNum;
document.getElementsByTagName('p')[0].textContent = horoscopeDesc;
document.getElementsByTagName('p')[1].innerHTML = "<strong>"+believeInAstro+"</strong>";
document.getElementsByTagName('p')[2].innerHTML = scorpMoodPrint + cancMoodPrint + allMoodPrint;
document.getElementsByTagName('p')[3].innerHTML = zodiacMessage;
document.getElementsByTagName('p')[4].innerHTML = keeMsg;
document.getElementsByTagName('p')[5].innerHTML = matMsg;
document.getElementsByTagName('p')[6].innerHTML = curtisMsg;

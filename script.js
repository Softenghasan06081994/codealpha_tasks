function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value) - 1;
    const year = parseInt(document.getElementById('year').value);
    
    const birthDate = new Date(year, month, day);
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) {
        document.getElementById('result').innerText = "Please enter a valid date of birth.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('result').innerText = `You are ${years} years, ${months} months, and ${days} days old.`;

    checkBirthday(today, birthDate);
    showNextBirthday(today, birthDate);
    showZodiacSign(month, day);
    showWeekDay(birthDate);
    showLifeProgress(today, birthDate);
}

function checkBirthday(today, birthDate) {
    if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        document.getElementById('birthdayMessage').innerText = "🎉 Happy Birthday! 🎂";
    } else {
        document.getElementById('birthdayMessage').innerText = "";
    }
}

function showNextBirthday(today, birthDate) {
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysLeft = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    document.getElementById('nextBirthday').innerText = `🎈 Next birthday in ${daysLeft} days.`;
}

function showZodiacSign(month, day) {
    const zodiacSigns = [
        { sign: "Capricorn", start: [12, 22], end: [1, 19] },
        { sign: "Aquarius", start: [1, 20], end: [2, 18] },
        { sign: "Pisces", start: [2, 19], end: [3, 20] },
        { sign: "Aries", start: [3, 21], end: [4, 19] },
        { sign: "Taurus", start: [4, 20], end: [5, 20] },
        { sign: "Gemini", start: [5, 21], end: [6, 20] },
        { sign: "Cancer", start: [6, 21], end: [7, 22] },
        { sign: "Leo", start: [7, 23], end: [8, 22] },
        { sign: "Virgo", start: [8, 23], end: [9, 22] },
        { sign: "Libra", start: [9, 23], end: [10, 22] },
        { sign: "Scorpio", start: [10, 23], end: [11, 21] },
        { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    const sign = zodiacSigns.find(z => 
        (month + 1 === z.start[0] && day >= z.start[1]) || 
        (month + 1 === z.end[0] && day <= z.end[1]) ||
        (month + 1 > z.start[0] && month + 1 < z.end[0])
    );

    document.getElementById('zodiacSign').innerText = `♈ Your zodiac sign is ${sign ? sign.sign : "Unknown"}.`;
}

function showWeekDay(birthDate) {
    const options = { weekday: 'long' };
    document.getElementById('weekDay').innerText = `📅 You were born on a ${birthDate.toLocaleDateString('en-US', options)}.`;
}

function showLifeProgress(today, birthDate) {
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const daysInYear = (new Date(today.getFullYear(), 11, 31) - yearStart) / (1000 * 60 * 60 * 24);
    const daysPassed = (today - yearStart) / (1000 * 60 * 60 * 24);
    const progress = ((daysPassed / daysInYear) * 100).toFixed(2);
    document.getElementById('lifeProgress').innerText = `🚀 Year progress: ${progress}% complete.`;
}

function resetForm() {
    document.getElementById('ageForm').reset();
    document.querySelectorAll('.result-section h4').forEach(el => el.innerText = "");
}

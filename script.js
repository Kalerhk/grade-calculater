function calculateGrade() {
    let test1 = parseFloat(document.getElementById('test1').value);
    let test2 = parseFloat(document.getElementById('test2').value);
    let test3 = parseFloat(document.getElementById('test3').value);
    let test4 = parseFloat(document.getElementById('test4').value);

    if (isNaN(test1) || isNaN(test2) || isNaN(test3) || isNaN(test4)) {
        alert('Please fill all test scores');
        return;
    }

    let average = (test1 + test2 + test3 + test4) / 4;

    let gradeLetter;
    if (average >= 90)      gradeLetter = 'A';
    else if (average >= 80) gradeLetter = 'B';
    else if (average >= 70) gradeLetter = 'C';
    else if (average >= 60) gradeLetter = 'D';
    else                    gradeLetter = 'F';

    let isPassing = average >= 60;
    let teacher = document.getElementById('teacher');
    let teacherEmoji = document.getElementById('teacherEmoji');
    let resultDiv = document.getElementById('result');

    // Reset teacher first
    teacher.classList.remove('happy', 'angry');

    setTimeout(() => {
        if (isPassing) {
            teacherEmoji.textContent = '🥳'; // party face when pass
            teacher.classList.add('happy');
        } else {
            teacherEmoji.textContent = '😡'; // angry face when fail
            teacher.classList.add('angry');
        }

        // Go back to normal teacher after 2 seconds
        setTimeout(() => {
            teacher.classList.remove('happy', 'angry');
            teacherEmoji.textContent = '👨‍🏫';
        }, 2000);
    }, 50);

    // Show result box
    resultDiv.classList.remove('show', 'pass', 'fail');

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="result-message">${isPassing ? '🎉 Congratulations!' : '😤 Study Harder!'}</div>
            <div>Your Average: <span id="counter">0</span>%</div>
            <div>Grade: ${gradeLetter}</div>
        `;
        resultDiv.classList.add('show', isPassing ? 'pass' : 'fail');

        // Count up number animation
        let current = 0;
        let target = average;
        let step = target / 60;

        let counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            document.getElementById('counter').textContent = current.toFixed(2);
        }, 1000 / 60);
    }, 50);
}

function calculateGrade() {
    // Get the values from the input boxes
    let test1 = parseFloat(document.getElementById('test1').value);
    let test2 = parseFloat(document.getElementById('test2').value);
    let test3 = parseFloat(document.getElementById('test3').value);
    let test4 = parseFloat(document.getElementById('test4').value);
    
    // Check if all fields are filled
    if (isNaN(test1) || isNaN(test2) || isNaN(test3) || isNaN(test4)) {
        alert('Please fill all test scores');
        return;
    }
    
    //check if scores are between 0-100
    if (test1 <0 || test1 > 100 || test2 < 0 || test2 > 100 || 
        test3 < 0  || test3 > 100 || test4 < 0 || test4 > 100) {
        alert('scores must be between 0 and 100');
        return;
    }
    
    // Calculate average
    let average = (test1 + test2 + test3 + test4) / 4;
    
    // Determine grade letter
    let gradeLetter;
    if (average >= 90) {
        gradeLetter = 'A';
    } else if (average >= 80) {
        gradeLetter = 'B';
    } else if (average >= 70) {
        gradeLetter = 'C';
    } else if (average >= 60) {
        gradeLetter = 'D';
    } else {
        gradeLetter = 'F';
    }
    
    // Show result
    let resultDiv = document.getElementById('result');
    let isPassing = average >= 60;
    
    resultDiv.innerHTML = `
        <div>Your Average: ${average.toFixed(2)}%</div>
        <div>Grade: ${gradeLetter}</div>
    `;
    
    resultDiv.classList.add('show');
    resultDiv.classList.remove('pass','fail');
    resultDiv.classList.add(isPassing ? 'pass' : 'fail');
}

window.addEventListener('DOMContentLoaded', function() {
  const profileImg = document.getElementById('profile-img');
  const userPic = document.getElementById('user-pic');

  // Show username in the header
  const userNameElem = document.getElementById('user-name');
  const username = localStorage.getItem('currentUser') || 'User';
  if (userNameElem) {
    userNameElem.textContent = username;
  }

  // Load saved image if it exists
  const savedImg = localStorage.getItem('profileImg');
  if (savedImg) {
    profileImg.src = savedImg;
  }

  // Click image to open file picker
  profileImg.addEventListener('click', function() {
    userPic.click();
  });

  // When user selects a new image, update and save to localStorage
  userPic.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImg.src = e.target.result;
        localStorage.setItem('profileImg', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
});

function checkAnswer(qNum, correctAnswer) {
  const input = document.getElementById('answer' + qNum).value;
  const result = document.getElementById('result' + qNum);

  if (parseInt(input) === correctAnswer) {
    result.innerHTML = '✅ Correct!';
    result.className = 'correct';
  } else {
    result.innerHTML = '❌ Try again';
    result.className = 'wrong';
  }
}

const tapCircle = document.querySelector('.tap-circle');
const balanceElem = document.querySelector('.amount');

// Get the current username
const username = localStorage.getItem('currentUser') || 'User';

// Load balance for this user or start at 0
let balance = parseFloat(localStorage.getItem(username + '_balance')) || 0;

// Function to update the balance display
function updateBalance() {
  balanceElem.textContent = `₦${balance.toFixed(2)}`;
}

// On tap, add ₦0.02 and update
if (tapCircle) {
  tapCircle.addEventListener('click', function() {
    balance = Math.round((balance + 0.02) * 100) / 100;
    updateBalance();
    localStorage.setItem(username + '_balance', balance);
  });
}

// Show the balance on page load
updateBalance();





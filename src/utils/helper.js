const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
let getUserInfo = {};
if (localStorage.getItem('user')) {
  getUserInfo = JSON.parse(localStorage.getItem('user'));
}
const currentDate = new Date();

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const formattedDate = currentDate.toLocaleString('en-US', options);

export { API_URL, getUserInfo, formattedDate };

export default function authHeader() {
  if (localStorage.getItem('userData')) {
    const user = JSON.parse(localStorage.getItem('userData')!);

    if (user && user.Token) {
      // for Node.js Express back-end
      return { 'x-access-token': user.Token };
    } else {
      return {};
    }
  } else {
    return {};
  }
}
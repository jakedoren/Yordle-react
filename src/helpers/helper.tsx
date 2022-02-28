import axios from "axios";

const getCookie = (name: string): string | null => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const setCookie = (name: string, value: string): void => {
  document.cookie = name + "=" + ("Bearer " + value || "") + "; path=/";
}

interface ICreateScore {
  username: string,
  attempts: number
}

const createScore = (req: ICreateScore): void => {
  axios.post('http://localhost:8080/leaderboard/create/score', req)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

export {getCookie, setCookie, createScore}
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/bardapi";

const GlobalApi = () => {
  const response = axios
    .post(BASE_URL, postDataQuestions)
    .then((response) => {
      console.log("Post request successfull", response.data);
    })
    .catch((error) => {
      console.error("Paid Google Bard API has been terminated/finished", error);
    });
  return <div></div>;
};
export default GlobalApi;

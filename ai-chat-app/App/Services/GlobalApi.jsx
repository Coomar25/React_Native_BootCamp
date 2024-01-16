import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/auth/bardapi";

export const getBardApi = async (questions) => {
  const encodedQuestions = encodeURIComponent(questions);
  console.log(
    "From a chatscrees in Global api",
    `${BASE_URL}/${encodedQuestions}`
  );

  try {
    const response = await fetch(`${BASE_URL}/${encodedQuestions}`, {
      mode: "no-cors",
    });
    console.log("Post request successful", await response.json());
    // return response.data;
  } catch (error) {
    console.error("Paid Google Bard API has been terminated/finished", error);
    throw error;
  }
};

// export const getBardApi = async (questions) => {
//   console.log("From a chatscrees in Global api", questions);
//   try {
//     const response = await axios.post(BASE_URL, questions, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Post request successful", response);
//     // return response.data.res;
//   } catch (error) {
//     console.error("Paid Google Bard API has been terminated/finished", error);
//     throw error;
//   }
// };

// const GlobalApi = () => {
//   const response = axios
//     .post(BASE_URL, postDataQuestions)
//     .then((response) => {
//       console.log("Post request successfull", response.data);
//     })
//     .catch((error) => {
//       console.error("Paid Google Bard API has been terminated/finished", error);
//     });
//   return response;
// };
// export default GlobalApi;

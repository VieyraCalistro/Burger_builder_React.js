import axios from "axios";

const instance = axios.create({
	baseURL: "https://burger-builder-74d13.firebaseio.com/"
});

export default instance;

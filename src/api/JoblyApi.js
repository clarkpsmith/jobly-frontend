import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJob(handle) {
    let res = await this.request(`jobs/${handle}`);
    return res.job;
  }

  static async getCompaniesJobs(companyHandle) {
    let res = await this.request(`companies/${companyHandle}`);
    return res;
  }
  static async getAllCompanies() {
    let res = await this.request("companies");

    return res.companies;
  }
  static async searchCompanyByName(searchVal) {
    let res = await this.request(`companies?name=${searchVal}`);
    return res.companies;
  }

  static async getAllJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  static async searchJobByTitle(searchVal) {
    let res = await this.request(`jobs?title=${searchVal}`);
    return res.jobs;
  }

  static async getToken(username, password) {
    let res = await this.request(`auth/token`, { username, password }, "post");

    JoblyApi.token = res.token;

    return res.token;
  }

  static async registerUser(formData) {
    let res = await this.request(`auth/register`, { ...formData }, "post");
    JoblyApi.token = res.token;
    return res.token;
  }

  static async getCurrentUserData(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async clearToken() {
    JoblyApi.token = "";
  }

  static async apply(username, id) {
    const res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res;
  }

  static async updateProfile(formData) {
    // check if pasword matches, if not throws error
    const authenticate = await this.getToken(
      formData.username,
      formData.password
    );

    const userData = await this.getCurrentUserData(formData.username);

    const res = await this.request(
      `users/${formData.username}`,
      {
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      "patch"
    );
    return res;
  }
}

export default JoblyApi;

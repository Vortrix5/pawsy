import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (credentials) => api.post("/users/login", credentials);
export const register = (userData) => api.post("/users/register", userData);
export const getUserProfile = () => api.get("/users/profile");
export const updateUserProfile = (userData) =>
  api.put("/users/profile", userData);

// Pets API
export const getPets = (params) => api.get("/pets", { params });
export const getPetById = (id) => api.get(`/pets/${id}`);
export const createPet = (petData) => {
  const formData = new FormData();

  const { details, image, ...restData } = petData;

  Object.entries(restData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  Object.entries(details).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(`details.${key}[]`, item);
      });
    } else if (typeof value === "boolean") {
      formData.append(`details.${key}`, value.toString());
    } else {
      formData.append(`details.${key}`, value);
    }
  });

  if (image) {
    formData.append("image", image);
  }

  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  return api.post("/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData);
export const deletePet = (id) => api.delete(`/pets/${id}`);
export const updatePetStatus = (id, status) =>
  api.patch(`/pets/${id}/status`, { status });

// Applications API
export const getApplications = () => api.get("/applications");
export const getUserApplications = () => api.get("/applications/me");
export const getApplicationById = (id) => api.get(`/applications/${id}`);
export const createApplication = (applicationData) =>
  api.post("/applications", applicationData);
export const updateApplicationStatus = (id, status) =>
  api.patch(`/applications/${id}/status`, { status });

export default api;

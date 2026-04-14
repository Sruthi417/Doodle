import API from "./axios";

//get profile
export const getProfile = async() => {
 return await API.get("/user/profile");
};

export const updateProfile = (formData) =>
  API.put("/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const logout = async() => {
  return await API.get("/auth/logout");
};

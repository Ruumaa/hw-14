import BASE_URL from "../lib/baseUrl";

export const login = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!response.ok) {
        // Menangani kesalahan HTTP, jika respons tidak berhasil
        throw new Error(`HTTP Error: ${response.status}`);
      }
    const data = await response.json();
    return data
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

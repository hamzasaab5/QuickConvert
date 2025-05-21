
export async function removeBackgroundFromImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://pixian-api-proxy.onrender.com/removebg", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to remove background. Please try again.");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Background removal error:", error);
    throw error;
  }
}

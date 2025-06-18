// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const approved = async ({ name, email, clientId }: any) => {
  try {
    const res = await fetch(
      "https://survey-vonway-express-712e61af48e6.herokuapp.com/email/approved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, clientId }),
      }
    );    

    const response = await res.json();
    if (!res.ok) {
      console.log("failed");
      return { message: "Cannot send" };
    }
    return {
      ...response,
      status: res.status,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export default approved;

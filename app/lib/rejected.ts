// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rejected = async ({ name, email, clientId }: any) => {
  try {
    const res = await fetch(
      "https://survey-vonway-express-712e61af48e6.herokuapp.com/email/rejected",
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
      console.log("error");
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

export default rejected;

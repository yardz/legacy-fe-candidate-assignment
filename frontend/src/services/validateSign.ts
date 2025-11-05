const BaseUrl = import.meta.env.VITE_API_URL;

export const validateSign = async ({
	message,
	signature,
}: {
	message: string;
	signature: string;
}): Promise<{ isValid: boolean; signer: string; originalMessage: string }> => {
	const response = await fetch(`${BaseUrl}/verify-signature`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message, signature }),
	});
	const data = await response.json();
	return data;
};

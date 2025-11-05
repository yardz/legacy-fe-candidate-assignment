import { toast } from "react-toastify";

/**
 * Copies text to clipboard and shows a toast notification
 * @param text - The text to copy to clipboard
 * @param successMessage - Optional custom success message (default: "Copied to clipboard!")
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export async function copyToClipboard(
	text: string,
	successMessage: string = "Copied to clipboard!"
): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		toast.success(successMessage);
		return true;
	} catch {
		toast.error("Failed to copy to clipboard");
		return false;
	}
}

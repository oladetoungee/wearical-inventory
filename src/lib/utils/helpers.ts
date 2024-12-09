import { Dispatch, SetStateAction } from "react";

export const formatDate = (isoDate: string) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(new Date(isoDate));



/**
 * Handles file input change event, sets the preview URL and file.
 * 
 * @param event - The file input change event.
 * @param setImagePreview - Function to update the image preview URL state.
 * @param setImageFile - Function to update the image file state.
 */
export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: Dispatch<SetStateAction<string | null>>,
  setImageFile: Dispatch<SetStateAction<File | null>>
) => {
  const file = event.target.files ? event.target.files[0] : null;
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); // Update the preview
    };
    reader.readAsDataURL(file);

    // Store the image file in state for later use
    setImageFile(file);
  }
};

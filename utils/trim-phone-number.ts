export const TrimPhoneNumber = (phone: string): string => {
    if (!phone) return '';

  return phone.trim().replaceAll(" ", "");
};

export const jwtDecode = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  };
  
  export const truncateText = (text: string, maxChars: number) => {
    if (!text) return "";
    return text.length > maxChars ? text.slice(0, maxChars - 3) + "..." : text;
  };
  
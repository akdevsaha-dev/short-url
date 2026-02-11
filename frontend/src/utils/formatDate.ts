export const formatDate = (payload: string) => {
    const d = new Date(payload)
    const formatted = d.toISOString().split("T")[0];
    return formatted;
}
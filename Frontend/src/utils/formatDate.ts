export const formatDate = (date: string): string => {
    const dateString = date.split("-");

    return `${dateString[2]}/${dateString[1]}/${dateString[0]}`;
}
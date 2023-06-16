export const getAuthRole = (token) => { 
    const extractedToken = token.split('.')[1]
    const atobData = window.atob(extractedToken);
    const finalData = JSON.parse(atobData);
    return finalData.role;
}
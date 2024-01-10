export const createNewUser = (user) => ({
    id: user.sub,
    avatar: user.picture,
    email: user.email,
    name: 'New User',
    accountType: 'user',
    createdAt: new Date()
});
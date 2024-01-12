export const createNewUserObject = (user) => ({
    id: user.sub,
    avatar: user.picture,
    email: user.email,
    isEmailVerified: false,
    firstname: "",
    lastname: "",
    company: "",
    phone: "",
    isPhoneVerified: false,
    accountType: 'user',
    conversationThreadId: null,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    streakDates: [],
    billing: {}
});
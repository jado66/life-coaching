export const createNewUserObject = (user) => ({
    _id: user.email,
    avatar: user.avatar,
    email: user.email,
    isEmailVerified: false,
    accountType: 'user',
    firstname: "",
    lastname: "",
    phone: "",
    isPhoneVerified: false,
    conversationThreadId: null,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    streakDates: [],
    billing: {}
});
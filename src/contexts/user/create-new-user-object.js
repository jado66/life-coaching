export const createNewUserObject = (user) => {
    
    console.log("Creating new user object for user:", user)

    return ({
        _id: user.email,
        auth0Id: user.id,
        auth0Connection: 'Database',
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
    })
}
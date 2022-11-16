type UserType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export function userReducer(user: UserType, action: ActionType):UserType {

    const copyUser = {...user}

    switch (action.type) {
        case 'INCREMENT-AGE':
            copyUser.age = user.age + 1
            return copyUser
        case 'INCREMENT-CHILDREN-COUNT':
            copyUser.childrenCount = user.childrenCount + 1
            return copyUser
        case 'CHANGE-NAME':
            copyUser.name = action.newName
            return copyUser
        default:
            throw new Error("I don't understand this type")
    }
}

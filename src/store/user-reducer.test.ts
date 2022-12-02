import { userReducer } from './user-reducer'

test('user reducer should increment only age', () => {

    const startUser = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endUser = userReducer(startUser, {type: 'INCREMENT-AGE'})

    expect(endUser.age).toBe(21)
    expect(endUser.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {

    const startUser = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endUser = userReducer(startUser, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endUser.age).toBe(20)
    expect(endUser.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {

    const startUser = {age: 20, childrenCount: 2, name: 'Dimych'}

    const newName = 'Viktor'

    const endUser = userReducer(startUser, {type: 'CHANGE-NAME', newName: newName})

    expect(endUser.age).toBe(20)
    expect(endUser.childrenCount).toBe(2)
    expect(endUser.name).toBe(newName)
})

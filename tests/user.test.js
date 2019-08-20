const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { setupDatabase, userOneId, userOne } = require('./fixtures/db')



beforeEach(setupDatabase)

test('User SignUp', async () => {
    const response = await request(app).post('/users').send({
        name: 'Mahmoud',
        email: 'mymafm0405@gmail.com',
        password: 'MyPass777!'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Mahmoud',
            email: 'mymafm0405@gmail.com'
        },
        token: user.tokens[0].token
    })
})

test('User login', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOne._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('User login faild', async () => {
    await request(app).post('/users/login').send({
        email: 'mymafm0405@example.com',
        password: 'mym123456'
    }).expect(400)
})

test('Get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// test('Get user profile faild', async () => {
//     await request(app)
//         .get('/users/me')
//         .send()
//         .expect(401)
// })

test('Deleteing user', async () => {
     await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

// test('Deleteing user faild', async () => {
//     await request(app)
//         .delete('/users/me')
//         .send()
//         .expect(401)
// })

test('Upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Asmaa'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Asmaa')
})

test('Update user failed', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Alex'
        })
        .expect(400)
})
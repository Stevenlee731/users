const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach

  beforeEach((done) => {
    alex = new User({ name: 'Alex'})
    maria = new User({ name: 'Maria'})
    zach = new User({ name: 'Zach'})
    joe = new User({ name: 'Joe'})

    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
      .then(() => done())
  })

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe'})
      .then(users => {
        assert(users[0]._id.toString() === joe.id.toString())
        done()
      })
  })

  it('find user with specific id', (done) => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.name === 'Joe')
        done()
      })
  })

  it('can skip and limit the result set', done => {
    // skips Alex, includes joe and maria
    User.find({})
      .sort({ name: 1 }) // 1 sorts by ascending fashion, -1 sorts by descending
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
        done()
      })
  })
})

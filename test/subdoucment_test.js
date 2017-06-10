const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('can create a Subdocuments', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'One',
        content: 'content'
      }]
    })
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'One')
        done()
      })
  })
})

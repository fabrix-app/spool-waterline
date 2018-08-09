'use strict'

const assert = require('assert')

describe('Spool', () => {
  let spool
  before(() => {
    spool = global.app.spools.waterline
  })
  describe('#validate', () => {
    it.skip('TODO test')
  })
  describe('#configure', () => {
    it('should load collections', () => {
      assert(spool.wl)
      assert.equal(spool.wl['_collections'].length, 3)
    })
    it('should load and transform models', () => {
      assert(spool.models)
      assert(spool.models.User)
      assert(spool.models.Role)
    })
    it('should load and transform connections', () => {
      assert(spool.connections)
      assert(spool.connections.teststore)
      assert(spool.connections.storeoverride)
    })
  })
  describe('#initialize', () => {

    it('should expose the "orm" property on the fabrixpool', () => {
      assert(spool.orm)
      assert(spool.orm.collections.user)
      assert(spool.orm.collections.role)
    })

    it('should expose the globalId-indexed "orm" property on "app"', () => {
      assert(spool.app.orm)
      assert(spool.app.orm.User)
      assert(spool.app.orm.Role)
      assert(spool.app.orm.Role.create)
      assert(spool.app.orm.Role.find)
    })

    it('should be able to query things', () => {
      const Role = spool.orm.collections.role
      return Role.find({ name: 'xyz' }).then(results => {
        assert(results)
        assert.equal(results.length, 0)
      })
    })
    it('should be able to insert things', () => {
      const Role = spool.orm.collections.role
      return Role.create({ name: 'foo' })
        .then(role => {
          assert(role)
          assert.equal(role.name, 'foo')

          return Role.find({ name: 'foo' })
        })
        .then(roles => {
          assert.equal(roles.length, 1)
        })
    })
  })
})

describe('GET /users', () => {

  it('Deve retornar a lista de usuários', () => {
    cy.request('GET', '/users').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')
      expect(body).to.have.length.of.at.least(1)
    })
  })

  it('Deve retornar um usuário específico', () => {
    cy.request('GET', '/users/1').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('id', 1)
      expect(body).to.have.property('name')
      expect(body).to.have.property('email')
      expect(body).to.have.property('username')
    })
  })

  it('Deve buscar posts de um usuário', () => {
    cy.request('GET', '/users/1/posts').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')

      // Verificar que todos os posts são do usuário 1
      body.forEach((post) => {
        expect(post.userId).to.eq(1)
      })
    })
  })
})
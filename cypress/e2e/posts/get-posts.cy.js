describe('GET /posts', () => {

  it('Deve retornar a lista de posts', () => {
    cy.request('GET', '/posts').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')
      expect(body).to.have.length.of.at.least(1)
    })
  })

  it('Deve retornar um post específico', () => {
    cy.request('GET', '/posts/1').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('object')
      expect(body).to.have.property('id', 1)
      expect(body).to.have.property('title')
      expect(body).to.have.property('body')
    })
  })

  it('Deve retornar erro 404 para post inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/posts/999',
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(404)
    })
  })

  it('Deve buscar posts de um usuário específico', () => {
    cy.request('GET', '/posts?userId=1').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')

      // Verificar que todos os posts são do usuário 1
      body.forEach((post) => {
        expect(post.userId).to.eq(1)
      })
    })
  })
})
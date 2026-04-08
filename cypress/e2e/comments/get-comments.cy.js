describe('GET /comments', () => {

  it('Deve retornar a lista de comentários', () => {
    cy.request('GET', '/comments').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')
      expect(body).to.have.length.of.at.least(1)
    })
  })

  it('Deve retornar um comentário específico', () => {
    cy.request('GET', '/comments/1').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('id', 1)
      expect(body).to.have.property('postId')
      expect(body).to.have.property('name')
      expect(body).to.have.property('email')
      expect(body).to.have.property('body')
    })
  })

  it('Deve retornar erro para comentário inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/comments/999999',
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(404)
    })
  })

  it('Deve buscar comentários de um post específico', () => {
    cy.request('GET', '/comments?postId=1').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')

      // Verificar que todos os comentários são do post 1
      body.forEach((comment) => {
        expect(comment.postId).to.eq(1)
      })
    })
  })

  it('Deve buscar comentários usando nested resource', () => {
    cy.request('GET', '/posts/1/comments').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array')

      // Todos os comentários devem ser do post 1
      body.forEach((comment) => {
        expect(comment.postId).to.eq(1)
      })
    })
  })
})
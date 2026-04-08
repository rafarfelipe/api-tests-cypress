describe('DELETE /posts/:id', () => {

  it('Deve deletar um post', () => {
    cy.request('DELETE', '/posts/1').then(({ status }) => {
      expect(status).to.eq(200)
    })
  })

  it('Deve retornar sucesso ao deletar', () => {
    cy.request({
      method: 'DELETE',
      url: '/posts/1'
    }).then(({ status }) => {
      expect(status).to.be.oneOf([200, 204])
    })
  })

  it('Workflow completo: criar e deletar', () => {
    // Criar post
    cy.request('POST', '/posts', {
      title: 'Post para deletar',
      body: 'Será removido',
      userId: 1
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      const postId = body.id

      // Deletar o post criado
      cy.request('DELETE', `/posts/${postId}`).then(({ status }) => {
        expect(status).to.be.oneOf([200, 204])
      })
    })
  })
})
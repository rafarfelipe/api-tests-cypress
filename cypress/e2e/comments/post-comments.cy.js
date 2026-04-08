describe('POST /comments', () => {
  it('Deve criar um novo comment', () => {
    const newComment = {
      postId: 1,
      name: 'Primeiro Comentário',
      email: 'teste@email.com',
      body: 'Conteúdo do comentário',
    }

    cy.request({
      method: 'POST',
      url: '/comments',
      body: newComment,
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body).to.have.property('id')
      expect(body).to.include(newComment)
    })
  })
})

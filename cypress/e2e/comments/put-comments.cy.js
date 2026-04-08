describe('PUT /comments', () => {
  it('Edita um Comment existente', () => {
    const editedComment = {
      postId: 1,
      name: 'Comentário Editado',
      email: 'editado@email.com',
      body: 'Conteúdo editado',
    }

    cy.request({
      method: 'PUT',
      url: '/comments/1',
      body: editedComment,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.include(editedComment)
    })
  })
})

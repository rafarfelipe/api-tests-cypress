describe('POST /posts', () => {

  it('Deve criar um novo post', () => {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        title: 'Meu novo post',
        body: 'Conteúdo do post',
        userId: 1
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body).to.have.property('id')
      expect(body.title).to.eq('Meu novo post')
    })
  })

  it('Deve criar post com diferentes dados', () => {
    const novoPost = {
      title: 'Outro post',
      body: 'Outro conteúdo',
      userId: 2
    }

    cy.request('POST', '/posts', novoPost).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body.title).to.eq(novoPost.title)
    })
  })

  it('Deve retornar o post criado com todos os campos', () => {
    const post = {
      title: 'Post completo',
      body: 'Descrição completa',
      userId: 1
    }

    cy.request('POST', '/posts', post).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body).to.have.property('id')
      expect(body).to.have.property('title', post.title)
      expect(body).to.have.property('body', post.body)
      expect(body).to.have.property('userId', post.userId)
    })
  })
})
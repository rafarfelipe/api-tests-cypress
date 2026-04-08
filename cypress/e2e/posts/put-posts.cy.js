describe('PUT /posts/:id', () => {

  it('Deve atualizar um post completamente', () => {
    cy.request({
      method: 'PUT',
      url: '/posts/1',
      body: {
        id: 1,
        title: 'Título atualizado',
        body: 'Conteúdo atualizado',
        userId: 1
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.title).to.eq('Título atualizado')
      expect(body.body).to.eq('Conteúdo atualizado')
    })
  })

  it('Deve manter o ID ao atualizar', () => {
    const dadosAtualizados = {
      id: 1,
      title: 'Post modificado',
      body: 'Conteúdo modificado',
      userId: 1
    }

    cy.request('PUT', '/posts/1', dadosAtualizados).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.id).to.eq(1)
    })
  })
})

describe('PATCH /posts/:id', () => {

  it('Deve atualizar apenas o título', () => {
    cy.request({
      method: 'PATCH',
      url: '/posts/1',
      body: {
        title: 'Apenas título mudou'
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.title).to.eq('Apenas título mudou')
      expect(body).to.have.property('body')
      expect(body).to.have.property('userId')
    })
  })

  it('Deve atualizar múltiplos campos', () => {
    const atualizacaoParcial = {
      title: 'Título modificado',
      body: 'Body modificado'
    }

    cy.request('PATCH', '/posts/1', atualizacaoParcial).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.title).to.eq(atualizacaoParcial.title)
    })
  })
})